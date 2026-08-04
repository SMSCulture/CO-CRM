'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkflowBuilderStore } from '@/store/workflow-builder-store';
import { WorkflowCard } from './components/workflow-card';

export default function WorkflowsPage() {
  const workflows = useWorkflowBuilderStore((s) => s.workflows);
  const createWorkflow = useWorkflowBuilderStore((s) => s.createWorkflow);
  const router = useRouter();

  function handleCreate() {
    const id = createWorkflow();
    router.push(`/dashboard/workflows/${id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Workflows</h2>
          <p className="mt-1 text-muted-foreground">
            Trigger + step automations for your own contacts — confirmations, reminders, and re-engagement.
          </p>
        </div>
        <Button className="gap-2" onClick={handleCreate}>
          <Plus className="h-4 w-4" />
          New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {workflows.map((workflow) => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>
    </div>
  );
}