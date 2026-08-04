import type { TReaderDocument } from '@usewaypoint/email-builder';

// Client -> BFF only, matching the app's BFF pattern (never call a backend
// directly from the client). The BFF route currently stubs the response —
// swap its implementation for a real backend call once one exists, without
// needing to change this function's signature or any caller.
export async function saveEmailTemplate(document: TReaderDocument): Promise<{ id: string }> {
  const res = await fetch('/api/marketing/templates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ document }),
  });

  if (!res.ok) {
    throw new Error(`Failed to save template: ${res.status}`);
  }

  return res.json();
}
