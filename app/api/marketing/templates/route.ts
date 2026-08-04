import { NextRequest, NextResponse } from 'next/server';

// BFF stub — no backend endpoint for templates exists yet. Once the real
// backend is available, replace the body below with a forward to
// `${process.env.GRAPHQL_BACKEND_URL}` (see app/api/auth/me/route.ts for the
// forwarding pattern already used elsewhere in this app), keeping this
// route's request/response shape the same so lib/services/email-templates-api.ts
// doesn't need to change.
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body?.document) {
    return NextResponse.json({ error: 'Missing document' }, { status: 400 });
  }

  // TODO: forward to the real backend once GRAPHQL_BACKEND_URL has a
  // templates mutation to call. For now, just echo back a fake id so the
  // frontend flow (save button -> BFF -> "persisted") is fully wired and
  // testable end to end.
  return NextResponse.json({ id: `stub-${Date.now()}` });
}
