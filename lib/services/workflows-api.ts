import type { Workflow } from '@/store/workflow-builder-store';

// Client -> BFF only, same pattern as email-templates-api.ts. The BFF route
// currently stubs the response — swap for a real backend call once one
// exists without changing this function's signature or any caller.
export async function saveWorkflow(workflow: Workflow): Promise<{ id: string }> {
  const res = await fetch('/api/marketing/workflows', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workflow }),
  });

  if (!res.ok) {
    throw new Error(`Failed to save workflow: ${res.status}`);
  }

  return res.json();
}