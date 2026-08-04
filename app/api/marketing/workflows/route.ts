import { NextRequest, NextResponse } from 'next/server';

// BFF stub — no backend endpoint for workflows exists yet. See
// app/api/marketing/templates/route.ts for the same pattern and the
// forwarding note once a real backend is available.
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body?.workflow) {
    return NextResponse.json({ error: 'Missing workflow' }, { status: 400 });
  }

  return NextResponse.json({ id: `stub-${Date.now()}` });
}