'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertTriangle, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { validateWorkflow, useWorkflowBuilderStore } from '@/store/workflow-builder-store';
import { saveWorkflow } from '@/lib/services/workflows-api';
import { WorkflowCanvas } from '../components/workflow-canvas';

export default function WorkflowBuilderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const workflow = useWorkflowBuilderStore((state) => state.workflows.find((item) => item.id === params.id));
  const updateWorkflow = useWorkflowBuilderStore((state) => state.updateWorkflow);
  const addNode = useWorkflowBuilderStore((state) => state.addNode);
  const updateNode = useWorkflowBuilderStore((state) => state.updateNode);
  const removeNode = useWorkflowBuilderStore((state) => state.removeNode);
  const connectNodes = useWorkflowBuilderStore((state) => state.connectNodes);
  const removeEdge = useWorkflowBuilderStore((state) => state.removeEdge);
  const toggleActive = useWorkflowBuilderStore((state) => state.toggleActive);
  const [saving, setSaving] = useState(false);
  const issues = useMemo(() => workflow ? validateWorkflow(workflow) : [], [workflow]);

  if (!workflow) return <div className="space-y-4"><Button variant="ghost" className="gap-2" onClick={() => router.push('/dashboard/workflows')}><ArrowLeft className="h-4 w-4" />Back to Workflows</Button><p className="text-sm text-muted-foreground">Workflow not found.</p></div>;

  async function handleSave() {
    setSaving(true);
    try {
      await saveWorkflow(workflow!);
      toast.success('Workflow saved');
    } catch {
      toast.error('Workflow could not be saved');
    } finally {
      setSaving(false);
    }
  }

  function handleToggle() {
    if (!toggleActive(workflow!.id)) toast.error('Fix the canvas validation issues before activating.');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" className="gap-2" onClick={() => router.push('/dashboard/workflows')}><ArrowLeft className="h-4 w-4" />Back to Workflows</Button>
        <Button className="gap-2" onClick={handleSave} disabled={saving}><Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save workflow'}</Button>
      </div>

      <div className="grid gap-4 rounded-2xl border border-border bg-white p-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <div className="space-y-1.5"><Label htmlFor="workflow-name">Name</Label><Input id="workflow-name" value={workflow.name} onChange={(event) => updateWorkflow(workflow.id, { name: event.target.value })} /></div>
        <div className="space-y-1.5"><Label htmlFor="workflow-description">Description</Label><Textarea id="workflow-description" rows={1} value={workflow.description} onChange={(event) => updateWorkflow(workflow.id, { description: event.target.value })} /></div>
        <div className="flex h-10 items-center gap-2"><Switch checked={workflow.isActive} onCheckedChange={handleToggle} id="workflow-active" /><Label htmlFor="workflow-active">{workflow.isActive ? 'Active' : 'Draft'}</Label></div>
      </div>

      {issues.length > 0 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950">
          <div className="mb-2 flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" />{issues.length} item{issues.length === 1 ? '' : 's'} to fix before activation</div>
          <ul className="list-disc space-y-1 pl-5 text-sm">{issues.map((issue, index) => <li key={`${issue.nodeId ?? 'workflow'}-${index}`}>{issue.message}</li>)}</ul>
        </div>
      )}

      <WorkflowCanvas
        workflow={workflow}
        onUpdateNode={(nodeId, patch) => updateNode(workflow.id, nodeId, patch)}
        onAddNode={(node) => addNode(workflow.id, node)}
        onRemoveNode={(nodeId) => removeNode(workflow.id, nodeId)}
        onConnect={(edge) => connectNodes(workflow.id, edge)}
        onRemoveEdge={(edgeId) => removeEdge(workflow.id, edgeId)}
      />
    </div>
  );
}
