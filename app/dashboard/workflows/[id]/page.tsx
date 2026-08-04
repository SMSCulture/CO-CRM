'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useWorkflowBuilderStore } from '@/store/workflow-builder-store';
import { saveWorkflow } from '@/lib/services/workflows-api';
import { TriggerSelector } from '../components/trigger-selector';
import { StepCard } from '../components/step-card';
import { AddStepMenu } from '../components/add-step-menu';

export default function WorkflowBuilderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const workflow = useWorkflowBuilderStore((s) => s.workflows.find((w) => w.id === params.id));
  const updateWorkflow = useWorkflowBuilderStore((s) => s.updateWorkflow);
  const addStep = useWorkflowBuilderStore((s) => s.addStep);
  const updateStep = useWorkflowBuilderStore((s) => s.updateStep);
  const removeStep = useWorkflowBuilderStore((s) => s.removeStep);
  const moveStep = useWorkflowBuilderStore((s) => s.moveStep);
  const toggleActive = useWorkflowBuilderStore((s) => s.toggleActive);
  const [saving, setSaving] = useState(false);

  if (!workflow) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" className="gap-2" onClick={() => router.push('/dashboard/workflows')}>
          <ArrowLeft className="h-4 w-4" />
          Back to Workflows
        </Button>
        <p className="text-sm text-muted-foreground">Workflow not found.</p>
      </div>
    );
  }

  async function handleSave() {
    if (!workflow) return;
    setSaving(true);
    try {
      await saveWorkflow(workflow);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" onClick={() => router.push('/dashboard/workflows')}>
          <ArrowLeft className="h-4 w-4" />
          Back to Workflows
        </Button>
        <Button className="gap-2" onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>

      <div className="space-y-4 rounded-xl border border-border p-5">
        <div className="space-y-1.5">
          <Label htmlFor="workflow-name">Name</Label>
          <Input
            id="workflow-name"
            value={workflow.name}
            onChange={(e) => updateWorkflow(workflow.id, { name: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="workflow-description">Description</Label>
          <Textarea
            id="workflow-description"
            rows={2}
            value={workflow.description}
            onChange={(e) => updateWorkflow(workflow.id, { description: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={workflow.isActive} onCheckedChange={() => toggleActive(workflow.id)} id="workflow-active" />
          <Label htmlFor="workflow-active">{workflow.isActive ? 'Active' : 'Draft'}</Label>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-border p-5">
        <TriggerSelector
          value={workflow.trigger.type}
          onChange={(type) => updateWorkflow(workflow.id, { trigger: { type, config: {} } })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Steps</p>
          <AddStepMenu onAdd={(type, label) => addStep(workflow.id, { type, label, config: {} })} />
        </div>

        {workflow.steps.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No steps yet — add one above.
          </p>
        ) : (
          <div className="space-y-2">
            {workflow.steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                total={workflow.steps.length}
                onMoveUp={() => moveStep(workflow.id, step.id, 'up')}
                onMoveDown={() => moveStep(workflow.id, step.id, 'down')}
                onRemove={() => removeStep(workflow.id, step.id)}
                onLabelChange={(label) => updateStep(workflow.id, step.id, { label })}
                onConfigChange={(config) => updateStep(workflow.id, step.id, { config })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}