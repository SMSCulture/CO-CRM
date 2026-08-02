/**
 * OTP challenge cookie — server-issued proof that a browser already passed
 * Cloudflare Turnstile for a given email.
 *
 * Why this exists: the OTP request route must let resends and post-registration
 * auto-triggers skip the Turnstile widget (it's only mounted on the initial
 * email step). Gating that skip on a client-supplied `resend`/`autoTrigger`
 * flag is forgeable — a bot just sets the flag and bypasses bot protection
 * entirely. Instead, the server issues a short-lived signed cookie ONLY after a
 * real Turnstile pass (initial OTP request or registration). Subsequent OTP
 * requests skip Turnstile only when they present a valid cookie bound to the
 * SAME email. A bot cannot mint this cookie without solving Turnstile first.
 *
 * The cookie binds the email, so a single solved Turnstile only authorizes
 * resends to that one address — useless for spraying OTPs at victim inboxes.
 */
import { SignJWT, jwtVerify } from 'jose';
import type { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(
  process.env.OTP_CHALLENGE_SECRET || process.env.JWT_SECRET || '',
);

export const OTP_CHALLENGE_COOKIE = 'otp_challenge';
export const OTP_CHALLENGE_TTL = 15 * 60; // seconds — matches OTP lifetime

/** Mint the signed proof that this browser passed Turnstile for `email`. */
export async function issueOtpChallenge(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${OTP_CHALLENGE_TTL}s`)
    .sign(secret);
}

/** True only if the cookie is validly signed, unexpired, and bound to `email`. */
export async function hasValidOtpChallenge(
  token: string | undefined | null,
  email: string,
): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.email === email;
  } catch {
    // Bad signature / expired / tampered → fail closed (Turnstile required).
    return false;
  }
}

/** Attach a fresh challenge cookie to a response after a verified Turnstile pass. */
export async function setOtpChallengeCookie(
  response: NextResponse,
  email: string,
): Promise<void> {
  response.cookies.set(OTP_CHALLENGE_COOKIE, await issueOtpChallenge(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: OTP_CHALLENGE_TTL,
  });
}
