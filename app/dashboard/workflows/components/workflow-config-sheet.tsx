import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SAMPLE_TEMPLATES } from '@/app/dashboard/marketing/templates/lib/sample-templates';
import type { WorkflowNode } from '@/store/workflow-builder-store';

interface Props {
  node: WorkflowNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (patch: Partial<Omit<WorkflowNode, 'id' | 'type'>>) => void;
  onDelete: () => void;
}

export function WorkflowConfigSheet({ node, open, onOpenChange, onChange, onDelete }: Props) {
  if (!node) return null;
  const setConfig = (key: string, value: unknown) => onChange({ config: { ...node.config, [key]: value } });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Configure {node.type}</SheetTitle>
          <SheetDescription>Changes are saved to this workflow as you work.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="node-label">Label</Label>
            <Input id="node-label" value={node.label} onChange={(event) => onChange({ label: event.target.value })} />
          </div>
          {node.type === 'trigger' && (
            <div className="space-y-2"><Label>Trigger</Label><Select value={node.subtype} onValueChange={(subtype) => onChange({ subtype, config: {} })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="record_created">Record created</SelectItem><SelectItem value="record_updated">Record updated</SelectItem><SelectItem value="scheduled">Scheduled</SelectItem><SelectItem value="manual">Manual</SelectItem></SelectContent></Select></div>
          )}
          {node.type === 'action' && node.subtype === 'send_email' && (
            <div className="space-y-2"><Label>Email template</Label><Select value={String(node.config.templateId ?? '')} onValueChange={(value) => setConfig('templateId', value)}><SelectTrigger><SelectValue placeholder="Choose a template" /></SelectTrigger><SelectContent>{SAMPLE_TEMPLATES.map((template) => <SelectItem key={template.id} value={template.id}>{template.label}</SelectItem>)}</SelectContent></Select></div>
          )}
          {node.type === 'action' && ['instagram_post','facebook_post','tiktok_post'].includes(node.subtype) && (
            <div className="space-y-4 rounded-lg border bg-slate-50 p-4"><div className="space-y-2"><Label>Organization account</Label><Select disabled><SelectTrigger><SelectValue placeholder="Connect and select an account"/></SelectTrigger><SelectContent><SelectItem value="pending">Connection required</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Event source</Label><Select value={String(node.config.eventSource??'current')} onValueChange={value=>setConfig('eventSource',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="current">Workflow event</SelectItem><SelectItem value="choose">Choose event</SelectItem></SelectContent></Select></div><p className="text-xs text-muted-foreground">The organization owns the account. Publishing stays off until OAuth, asset selection and provider approval are live.</p></div>
          )}
          {node.type === 'wait' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label htmlFor="wait-duration">Duration</Label><Input id="wait-duration" min={1} type="number" value={String(node.config.duration ?? '')} onChange={(event) => setConfig('duration', Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Unit</Label><Select value={String(node.config.unit ?? '')} onValueChange={(value) => setConfig('unit', value)}><SelectTrigger><SelectValue placeholder="Unit" /></SelectTrigger><SelectContent><SelectItem value="minutes">Minutes</SelectItem><SelectItem value="hours">Hours</SelectItem><SelectItem value="days">Days</SelectItem><SelectItem value="event_relative">Relative to event</SelectItem></SelectContent></Select></div>
            </div>
          )}
          {node.type !== 'trigger' && <Button variant="outline" className="w-full gap-2 text-destructive" onClick={onDelete}><Trash2 className="h-4 w-4" />Delete node</Button>}
        </div>
      </SheetContent>
    </Sheet>
  );
}
