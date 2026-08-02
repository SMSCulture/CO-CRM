import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, createRateLimitResponse } from '@/lib/rate-limiter';
import { validateAndSanitize, isInputSafe } from '@/lib/sanitizer';
import { verifyTurnstileToken } from '@/lib/verify-turnstile';
import { isDisposableEmail } from '@/lib/disposable-email-domains';
import { hasValidOtpChallenge, setOtpChallengeCookie, OTP_CHALLENGE_COOKIE } from '@/lib/otp-challenge';
import { bffBackendHeaders } from '@/lib/graphql/backend';

const requestOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email format'),
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting: 3 OTP requests per 15 minutes
    const rateLimitResult = rateLimit(request, {
      maxRequests: 3,
      windowMs: 15 * 60 * 1000, // 15 minutes
    });

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    const body = await request.json();

    const emailInput = (body.email || '').toString().trim().toLowerCase();

    // ── Bot protection: Turnstile required unless a valid challenge proves it ──
    // A server-issued challenge cookie proves THIS browser already passed
    // Turnstile for THIS email (initial OTP request or registration). Only then
    // is Turnstile skipped — we never trust a client-supplied resend/autoTrigger
    // flag, which a bot can set freely to bypass the check entirely.
    const challengeToken = request.cookies.get(OTP_CHALLENGE_COOKIE)?.value;
    const challengePassed = await hasValidOtpChallenge(challengeToken, emailInput);
    if (!challengePassed) {
      const turnstileToken = body['cf-turnstile-response'] || body.turnstileToken;
      const turnstileValid = await verifyTurnstileToken(turnstileToken);
      if (!turnstileValid) {
        // Silent fake-success — don't reveal the block to bots
        return NextResponse.json({ success: true, message: 'Verification code sent.' });
      }
    }

    // ── Disposable email block ────────────────────────────────────────────────
    if (isDisposableEmail(emailInput)) {
      // Silent fake-success — bot thinks it worked
      return NextResponse.json({ success: true, message: 'Verification code sent.' });
    }

    if (!isInputSafe(emailInput)) {
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validatedData = validateAndSanitize(requestOtpSchema, body);

    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('OTP Request for:', validatedData.email);
    }

    // Forward request to GraphQL backend
    const graphqlResponse = await fetch(process.env.GRAPHQL_BACKEND_URL || 'http://localhost:3001/graphql', {
      method: 'POST',
      headers: bffBackendHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        query: `
          mutation RequestOtp($input: RequestOtpInput!) {
            requestOtp(input: $input) {
              success
              message
              userCreated
            }
          }
        `,
        variables: {
          input: { email: validatedData.email }
        },
      }),
    });

    // Check if response is actually JSON
    const responseText = await graphqlResponse.text();
    let graphqlResult;

    try {
      graphqlResult = JSON.parse(responseText);
    } catch {
      console.error('GraphQL Response is not valid JSON. Status:', graphqlResponse.status);

      return NextResponse.json(
        {
          error: 'Backend connection failed',
          debug: process.env.NODE_ENV === 'development' ? {
            status: graphqlResponse.status,
            responsePreview: responseText.substring(0, 200)
          } : undefined
        },
        { status: 502 }
      );
    }

    if (graphqlResult.errors) {
      console.error('GraphQL OTP Request Error:', graphqlResult.errors);
      const errorMessage = graphqlResult.errors[0]?.message || 'Failed to send verification code';

      // Check for rate limit error from backend
      if (errorMessage.toLowerCase().includes('rate') || errorMessage.toLowerCase().includes('limit')) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const { success, message, userCreated } = graphqlResult.data.requestOtp;

    // Backend uses {success: false} to signal a soft block (e.g. a public
    // company signup is in flight for this email and the webhook hasn't
    // created the User yet). Surface as 409 so the UI shows the message
    // instead of advancing to the OTP entry step.
    if (success === false) {
      return NextResponse.json(
        { error: message || 'Cannot send verification code right now.' },
        { status: 409 },
      );
    }

    // OTP was actually sent — (re)issue the challenge cookie so subsequent
    // resends for this email skip Turnstile without trusting a client flag.
    const response = NextResponse.json({
      success,
      message,
      userCreated
    });
    await setOtpChallengeCookie(response, emailInput);
    return response;

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email format', details: error.issues },
        { status: 400 }
      );
    }

    console.error('OTP request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
