/**
 * Server-side Cloudflare Turnstile verification.
 * Call this in any BFF route that needs bot protection.
 */
export async function verifyTurnstileToken(token: string | undefined | null): Promise<boolean> {
  // Allow bypass in dev/test via env flag — checked BEFORE the token guard so
  // OTP/registration flows can be exercised locally without a real token.
  if (process.env.SKIP_BOT_PROTECTION === 'true') return true;

  if (!token) return false;

  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('CLOUDFLARE_TURNSTILE_SECRET_KEY is not configured');
    return false;
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    return result.success === true;
  } catch {
    return false;
  }
}
