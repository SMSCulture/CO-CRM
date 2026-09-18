'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, FlaskConical, Plus, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const [reviewOpen, setReviewOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
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
        <div className="hidden items-center gap-1 rounded-lg bg-slate-100 p-1 lg:flex" aria-label="Automation build stages">
          {['1 Build', '2 Settings', '3 Test', '4 Review'].map((step, index) => <span key={step} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${index === 0 ? 'bg-white text-co-blue shadow-sm' : 'text-muted-foreground'}`}>{step}</span>)}
        </div>
        <Button variant="outline" className="order-3 gap-2 sm:order-none" onClick={()=>window.dispatchEvent(new Event('cultureowl:add-workflow-node'))}><Plus className="h-4 w-4"/>Add action</Button>
        <Button variant="outline" className="gap-2" onClick={()=>setTestOpen(true)}><FlaskConical className="h-4 w-4"/>Test</Button>
        <Button className="gap-2" onClick={()=>setReviewOpen(true)}><CheckCircle2 className="h-4 w-4"/>Review & publish</Button>
        <Button variant="ghost" size="icon" onClick={handleSave} disabled={saving} title={saving ? 'Saving' : 'Save draft'}><Save className="h-4 w-4" /></Button>
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
      <Dialog open={testOpen} onOpenChange={setTestOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Test this automation</DialogTitle><DialogDescription>Choose a real contact or event to preview its path without sending messages or changing records.</DialogDescription></DialogHeader>
          <div className="rounded-xl border bg-slate-50 p-4 text-sm"><p className="font-semibold">Test mode is waiting on the workflow runtime.</p><p className="mt-1 text-muted-foreground">The production test will show enrollment eligibility, every branch taken, calculated waits and action previews before anything can publish.</p></div>
        </DialogContent>
      </Dialog>
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Review & publish</DialogTitle><DialogDescription>Confirm enrollment, actions and safeguards before turning this automation on.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            {[['Enrollment', workflow.nodes.filter(node=>node.type==='trigger').length ? 'Trigger configured' : 'Missing trigger'], ['Actions', `${workflow.nodes.filter(node=>node.type==='action').length} configured`], ['Branches & waits', issues.length ? `${issues.length} item${issues.length===1?'':'s'} to fix` : 'Ready'], ['Re-enrollment', 'First match only (default)'], ['Suppression', 'Server consent preflight required']].map(([label,value])=><div key={label} className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm font-medium">{label}</span><span className="text-sm text-muted-foreground">{value}</span></div>)}
          </div>
          <div className="flex justify-end gap-2"><Button variant="outline" onClick={()=>setReviewOpen(false)}>Back to editor</Button><Button disabled={issues.length>0} onClick={()=>{handleToggle();setReviewOpen(false)}}>{workflow.isActive?'Pause automation':'Publish automation'}</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );}
