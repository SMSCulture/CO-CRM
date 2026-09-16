'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const issues = useMemo(() => workflow ? validateWorkflow(workflow) : [], [workflow]);

  useEffect(() => {
    document.body.classList.add('automation-editor-fullscreen');
    return () => document.body.classList.remove('automation-editor-fullscreen');
  }, []);

  if (!workflow) return <div className="space-y-4"><Button variant="ghost" className="gap-2" onClick={() => router.push('/dashboard/workflows')}><ArrowLeft className="h-4 w-4" />Back to Automations</Button><p className="text-sm text-muted-foreground">Automation not found.</p></div>;

  async function handleSave() {
    setSaving(true);
    try {
      await saveWorkflow(workflow!);
      toast.success('Automation saved');
    } catch {
      toast.error('Automation could not be saved');
    } finally {
      setSaving(false);
    }
  }

  function handleToggle() {
    if (toggleActive(workflow!.id)) return;
    toast.dismiss();
    toast.error(`${issues.length} item${issues.length === 1 ? '' : 's'} to fix before activation`, {
      description: 'Open each issue to finish the automation.',
      duration: 6000,
    });
    issues.forEach((issue) => toast.warning(issue.message, {
      duration: 10000,
      action: issue.nodeId ? {
        label: 'Open node',
        onClick: () => setFocusNodeId(issue.nodeId ?? null),
      } : undefined,
    }));
  }

  return (
    <div className="flex h-screen min-h-0 flex-col bg-slate-50">
      <nav className="flex shrink-0 flex-wrap items-center gap-3 border-b bg-white px-4 py-3">
        <Button variant="ghost" className="gap-2" onClick={() => router.push('/dashboard/workflows')}><ArrowLeft className="h-4 w-4" />Exit</Button>
        <div className="h-6 w-px bg-border" />
        <div className="min-w-[180px] flex-1"><Label htmlFor="workflow-name" className="sr-only">Automation title</Label><Input id="workflow-name" title="Click to edit title" className="h-9 border-0 bg-transparent px-2 text-base font-semibold shadow-none hover:bg-slate-50 focus-visible:bg-white focus-visible:ring-1" value={workflow.name} onChange={(event) => updateWorkflow(workflow.id, { name: event.target.value })} /></div>
        <Button variant="outline" className="order-3 gap-2 sm:order-none" onClick={()=>window.dispatchEvent(new Event('cultureowl:add-workflow-node'))}><Plus className="h-4 w-4"/>Add node</Button>
        <div className="flex items-center gap-2"><Switch checked={workflow.isActive} onCheckedChange={handleToggle} id="workflow-active" /><Label htmlFor="workflow-active">{workflow.isActive ? 'Active' : 'Draft'}</Label></div>
        <Button className="gap-2" onClick={handleSave} disabled={saving}><Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save'}</Button>
      </nav>
      <div className="min-h-0 flex-1 p-3">
        <WorkflowCanvas
          workflow={workflow}
          focusNodeId={focusNodeId}
          onFocusHandled={() => setFocusNodeId(null)}
          onUpdateNode={(nodeId, patch) => updateNode(workflow.id, nodeId, patch)}
          onAddNode={(node) => addNode(workflow.id, node)}
          onRemoveNode={(nodeId) => removeNode(workflow.id, nodeId)}
          onConnect={(edge) => connectNodes(workflow.id, edge)}
          onRemoveEdge={(edgeId) => removeEdge(workflow.id, edgeId)}
        />
      </div>
    </div>
  );}
