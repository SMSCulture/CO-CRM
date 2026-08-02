/**
 * Shared config + headers for SERVER-SIDE calls to the NestJS GraphQL backend.
 *
 * Used by the BFF route handlers (`app/api/**`) and the RSC prefetch helper
 * (`lib/graphql/server-fetch.ts`) — anywhere trusted server code talks DIRECTLY
 * to the backend GraphQL endpoint (NOT through the browser).
 *
 * The backend locks `/graphql` to the BFF via a shared secret header. We send
 * that secret here so the backend can reject anonymous bots hitting `/graphql`
 * directly. The secret is a SERVER-ONLY env var — NEVER prefix it with
 * `NEXT_PUBLIC_`, or it would leak into the browser bundle and defeat the point.
 */

/** Same backend target the BFF and RSC prefetch forward to. */
export const BACKEND_GRAPHQL_URL =
  process.env.GRAPHQL_BACKEND_URL || 'http://localhost:3001/graphql';

/**
 * Build headers for a server-side request to the backend GraphQL endpoint,
 * including the BFF shared secret when configured. Spread your own headers
 * (Content-Type, Authorization, Cookie, …) via `extra`.
 *
 *   headers: bffBackendHeaders({ 'Content-Type': 'application/json' })
 */
export function bffBackendHeaders(
  extra?: Record<string, string>,
): Record<string, string> {
  const headers: Record<string, string> = { ...extra };
  const secret = process.env.BFF_BACKEND_SECRET;
  if (secret) {
    headers['x-bff-secret'] = secret;
  }
  return headers;
}
