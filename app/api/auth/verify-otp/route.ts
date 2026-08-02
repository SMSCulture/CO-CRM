import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, createRateLimitResponse } from '@/lib/rate-limiter';
import { validateAndSanitize, isInputSafe } from '@/lib/sanitizer';
import { bffBackendHeaders } from '@/lib/graphql/backend';

const verifyOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email format'),
  otp: z.string().length(6, 'Code must be 6 digits').regex(/^\d{6}$/, 'Code must contain only digits'),
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting: 5 OTP verification attempts per 15 minutes
    const rateLimitResult = rateLimit(request, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    });

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    const body = await request.json();

    // Security check for malicious input
    const emailInput = body.email || '';
    const otpInput = body.otp || '';

    if (!isInputSafe(emailInput) || !isInputSafe(otpInput)) {
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validatedData = validateAndSanitize(verifyOtpSchema, body);

    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('OTP Verification for:', validatedData.email);
    }

    // Forward request to GraphQL backend
    const graphqlResponse = await fetch(process.env.GRAPHQL_BACKEND_URL || 'http://localhost:3001/graphql', {
      method: 'POST',
      headers: bffBackendHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        query: `
          mutation VerifyOtp($input: VerifyOtpInput!) {
            verifyOtp(input: $input) {
              access_token
              isFirstLogin
              user {
                id
                email
                firstName
                lastName
                username
                avatar
                bio
                phone
                isActive
                roleId
                createdAt
                updatedAt
                lastLogin
                emailVerified
                profilePhotoUrl
                role {
                  id
                  name
                }
                companyMemberships {
                  legacyRole
                  company {
                    id
                    name
                    status
                    plan {
                      planSlug
                      allowances {
                        events
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            email: validatedData.email,
            code: validatedData.otp
          }
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
      console.error('GraphQL OTP Verify Error:', graphqlResult.errors);
      const errorMessage = graphqlResult.errors[0]?.message || 'Invalid verification code';

      // Determine appropriate status code based on error
      let statusCode = 401;
      if (errorMessage.toLowerCase().includes('expired')) {
        statusCode = 410; // Gone - OTP expired
      } else if (errorMessage.toLowerCase().includes('attempts') || errorMessage.toLowerCase().includes('limit')) {
        statusCode = 429; // Too many attempts
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: statusCode }
      );
    }

    const { access_token, isFirstLogin, user } = graphqlResult.data.verifyOtp;

    // Create response with user data
    const response = NextResponse.json({
      user,
      isFirstLogin
    });

    // Set secure httpOnly cookie with access token
    response.cookies.set('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    if (isFirstLogin) {
      response.cookies.set('onboarding_required', '1', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });
    } else {
      response.cookies.delete('onboarding_required');
    }

    return response;

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }

    console.error('OTP verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
