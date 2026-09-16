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
            <div className="space-y-4">
              <div className="space-y-2"><Label>CRM object</Label><Select value={String(node.config.object ?? 'Contact')} onValueChange={(value)=>setConfig('object',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Contact">Contact / patron</SelectItem><SelectItem value="Segment">Segment membership</SelectItem><SelectItem value="Event">Event</SelectItem><SelectItem value="Order">Order / ticket purchase</SelectItem><SelectItem value="Donation">Donation</SelectItem><SelectItem value="Task">Task</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Trigger</Label><Select value={node.subtype} onValueChange={(subtype) => onChange({ subtype, config: { ...node.config } })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="record_created">Record created</SelectItem><SelectItem value="record_updated">Record updated</SelectItem><SelectItem value="event_published">Event published</SelectItem><SelectItem value="scheduled">On a schedule</SelectItem><SelectItem value="manual">Manual</SelectItem></SelectContent></Select></div>
              <p className="text-xs text-muted-foreground">Choose the CRM event first. Filters and segment rules narrow who enters without changing the saved segment builder.</p>
            </div>
          )}
          {node.type === 'action' && node.subtype === 'send_email' && (
            <div className="space-y-2"><Label>Email template</Label><Select value={String(node.config.templateId ?? '')} onValueChange={(value) => setConfig('templateId', value)}><SelectTrigger><SelectValue placeholder="Choose a template" /></SelectTrigger><SelectContent>{SAMPLE_TEMPLATES.map((template) => <SelectItem key={template.id} value={template.id}>{template.label}</SelectItem>)}</SelectContent></Select></div>
          )}
          {node.type === 'action' && ['instagram','facebook','tiktok','instagram_post','facebook_post','tiktok_post'].includes(node.subtype) && (
            <div className="space-y-4 rounded-lg border bg-slate-50 p-4">
              <div className="space-y-2"><Label>What should {node.subtype.startsWith('instagram') ? 'Instagram' : node.subtype.startsWith('facebook') ? 'Facebook' : 'TikTok'} do?</Label><Select value={String(node.config.operation ?? '')} onValueChange={value=>setConfig('operation',value)}><SelectTrigger><SelectValue placeholder="Choose an operation"/></SelectTrigger><SelectContent>
                <SelectItem value="organic_post">Publish organic post</SelectItem>
                {node.subtype.startsWith('instagram') && <SelectItem value="reel">Publish Reel</SelectItem>}
                {node.subtype.startsWith('facebook') && <SelectItem value="video">Publish photo or video</SelectItem>}
                {node.subtype.startsWith('tiktok') && <SelectItem value="spark_ad">Create Spark Ad</SelectItem>}
                <SelectItem value="promote_post">Promote an existing post</SelectItem><SelectItem value="ad_campaign">Create ad campaign</SelectItem>
              </SelectContent></Select></div>
              <div className="space-y-2"><Label>Organization account</Label><Select disabled><SelectTrigger><SelectValue placeholder="Connection required"/></SelectTrigger><SelectContent><SelectItem value="pending">Connection required</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Content source</Label><Select value={String(node.config.eventSource??'current')} onValueChange={value=>setConfig('eventSource',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="current">Workflow event</SelectItem><SelectItem value="existing">Existing social post</SelectItem><SelectItem value="choose">Choose event or campaign</SelectItem></SelectContent></Select></div>
              {['promote_post','ad_campaign','spark_ad'].includes(String(node.config.operation ?? '')) && <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">Ad setup will use the full ads wizard for objective, segment, creative, budget, schedule and approval. This demo does not launch or spend.</div>}
              <p className="text-xs text-muted-foreground">This node is a draft. Publishing stays off until OAuth, asset selection, provider eligibility and the execution backend are live.</p>
            </div>
          )}
          {node.type === 'action' && node.subtype === 'promo_code' && (
            <div className="space-y-4 rounded-lg border bg-slate-50 p-4">
              <div className="space-y-2"><Label htmlFor="promo-code">Promo code</Label><Input id="promo-code" placeholder="e.g. MEMBER20" value={String(node.config.code ?? '')} onChange={(event)=>setConfig('code',event.target.value.toUpperCase())}/></div>
              <div className="grid grid-cols-2 gap-3"><div className="space-y-2"><Label>Discount type</Label><Select value={String(node.config.discountType ?? 'percent')} onValueChange={(value)=>setConfig('discountType',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="percent">Percent off</SelectItem><SelectItem value="fixed">Fixed amount</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="promo-value">Value</Label><Input id="promo-value" min={1} type="number" placeholder="20" value={String(node.config.value ?? '')} onChange={(event)=>setConfig('value',Number(event.target.value))}/></div></div>
              <div className="space-y-2"><Label>Applies to</Label><Select value={String(node.config.eventScope ?? 'workflow_event')} onValueChange={(value)=>setConfig('eventScope',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="workflow_event">Workflow event</SelectItem><SelectItem value="selected_event">Choose an event</SelectItem></SelectContent></Select></div>
              <p className="text-xs text-muted-foreground">Draft configuration only. Production needs ticketing-provider support, redemption limits, start/end dates, conflict checks and audit history before codes are created.</p>
            </div>
          )}
          {node.type === 'action' && node.subtype === 'add_to_segment' && (
            <div className="space-y-2"><Label>Segment</Label><Select value={String(node.config.segmentId ?? '')} onValueChange={(value)=>setConfig('segmentId',value)}><SelectTrigger><SelectValue placeholder="Choose an existing segment"/></SelectTrigger><SelectContent><SelectItem value="recent-buyers">Recent ticket buyers</SelectItem><SelectItem value="members">Members</SelectItem><SelectItem value="lapsed">Lapsed attendees</SelectItem></SelectContent></Select><p className="text-xs text-muted-foreground">This references an existing segment. Segment rules stay in the CRM segment builder.</p></div>
          )}
          {node.type === 'action' && node.subtype === 'remove_from_segment' && (<div className="space-y-2"><Label>Segment</Label><Select value={String(node.config.segmentId??'')} onValueChange={value=>setConfig('segmentId',value)}><SelectTrigger><SelectValue placeholder="Choose a segment"/></SelectTrigger><SelectContent><SelectItem value="recent-buyers">Recent ticket buyers</SelectItem><SelectItem value="members">Members</SelectItem><SelectItem value="lapsed">Lapsed attendees</SelectItem></SelectContent></Select></div>)}
          {node.type === 'action' && node.subtype === 'add_tag' && (<div className="space-y-2"><Label>Tag</Label><Input placeholder="VIP, donor, volunteer…" value={String(node.config.tag??'')} onChange={event=>setConfig('tag',event.target.value)}/></div>)}
          {node.type === 'action' && node.subtype === 'update_field' && (<div className="space-y-3"><div className="space-y-2"><Label>Contact field</Label><Select value={String(node.config.field??'')} onValueChange={value=>setConfig('field',value)}><SelectTrigger><SelectValue placeholder="Choose a field"/></SelectTrigger><SelectContent><SelectItem value="source">Source</SelectItem><SelectItem value="lifecycle">Lifecycle stage</SelectItem><SelectItem value="preferredGenre">Preferred genre</SelectItem><SelectItem value="consent">Consent state</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>New value</Label><Input value={String(node.config.value??'')} onChange={event=>setConfig('value',event.target.value)}/></div></div>)}
          {node.type === 'action' && node.subtype === 'notify_staff' && (<div className="space-y-3"><div className="space-y-2"><Label>Team recipient</Label><Input placeholder="Role or team member" value={String(node.config.recipient??'')} onChange={event=>setConfig('recipient',event.target.value)}/></div><div className="space-y-2"><Label>Message</Label><Input placeholder="What should they know?" value={String(node.config.message??'')} onChange={event=>setConfig('message',event.target.value)}/></div></div>)}
          {node.type === 'action' && node.subtype === 'create_task' && (<div className="space-y-3"><div className="space-y-2"><Label>Task title</Label><Input value={String(node.config.title??'')} onChange={event=>setConfig('title',event.target.value)}/></div><div className="grid grid-cols-2 gap-2"><div className="space-y-2"><Label>Assign to</Label><Input placeholder="Team or person" value={String(node.config.assignee??'')} onChange={event=>setConfig('assignee',event.target.value)}/></div><div className="space-y-2"><Label>Due in days</Label><Input type="number" min={0} value={String(node.config.dueDays??1)} onChange={event=>setConfig('dueDays',Number(event.target.value))}/></div></div></div>)}
          {node.type === 'action' && node.subtype === 'webhook' && (<div className="space-y-3"><div className="space-y-2"><Label>HTTPS endpoint</Label><Input type="url" placeholder="https://…" value={String(node.config.url??'')} onChange={event=>setConfig('url',event.target.value)}/></div><div className="space-y-2"><Label>Payload</Label><Select value={String(node.config.payload??'contact')} onValueChange={value=>setConfig('payload',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="contact">Contact + trigger</SelectItem><SelectItem value="event">Event + contact</SelectItem><SelectItem value="order">Order + contact</SelectItem></SelectContent></Select></div><p className="text-xs text-muted-foreground">Production execution requires endpoint allowlisting, signed requests, retry policy and secret storage.</p></div>)}
          {node.type === 'action' && ['create_email_draft','create_social_post','schedule_social'].includes(node.subtype) && (<div className="space-y-3"><div className="space-y-2"><Label>Event source</Label><Select value={String(node.config.eventSource??'workflow')} onValueChange={value=>setConfig('eventSource',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="workflow">Workflow event</SelectItem><SelectItem value="selected">Choose event</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>{node.subtype==='create_email_draft'?'Subject / brief':'Caption / brief'}</Label><Input value={String(node.config.brief??'')} onChange={event=>setConfig('brief',event.target.value)}/></div>{node.subtype==='schedule_social'&&<div className="space-y-2"><Label>Publish time</Label><Input type="datetime-local" value={String(node.config.publishAt??'')} onChange={event=>setConfig('publishAt',event.target.value)}/></div>}<p className="text-xs text-muted-foreground">Creates a reviewable draft. It does not publish or send automatically in this prototype.</p></div>)}
          {node.type === 'action' && ['create_meta_ad','add_meta_audience','remove_meta_audience','pause_campaign'].includes(node.subtype) && (<div className="space-y-3"><div className="space-y-2"><Label>Meta account</Label><Select disabled><SelectTrigger><SelectValue placeholder="Connection required"/></SelectTrigger><SelectContent><SelectItem value="pending">Connection required</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>{node.subtype.includes('audience')?'CultureOwl segment':'Campaign'}</Label><Select value={String(node.config.target??'')} onValueChange={value=>setConfig('target',value)}><SelectTrigger><SelectValue placeholder="Choose target"/></SelectTrigger><SelectContent><SelectItem value="workflow">Use workflow audience / campaign</SelectItem><SelectItem value="selected">Choose existing</SelectItem></SelectContent></Select></div><p className="text-xs text-muted-foreground">Draft configuration only. Provider connection, approval and execution are required before any audience or campaign change.</p></div>)}
          {node.type === 'action' && node.subtype === 'remove_tag' && (<div className="space-y-2"><Label>Tag to remove</Label><Input value={String(node.config.tag??'')} onChange={event=>setConfig('tag',event.target.value)}/></div>)}
          {node.type === 'action' && node.subtype === 'update_event' && (<div className="space-y-3"><div className="space-y-2"><Label>Event</Label><Select value={String(node.config.event??'workflow')} onValueChange={value=>setConfig('event',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="workflow">Workflow event</SelectItem><SelectItem value="selected">Choose event</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Field</Label><Select value={String(node.config.field??'')} onValueChange={value=>setConfig('field',value)}><SelectTrigger><SelectValue placeholder="Choose field"/></SelectTrigger><SelectContent><SelectItem value="status">Status</SelectItem><SelectItem value="capacity">Capacity</SelectItem><SelectItem value="salesGoal">Sales goal</SelectItem><SelectItem value="marketingStatus">Marketing status</SelectItem></SelectContent></Select></div><Input placeholder="New value" value={String(node.config.value??'')} onChange={event=>setConfig('value',event.target.value)}/></div>)}
          {node.type === 'action' && ['send_hubspot','add_mailchimp','update_constant_contact'].includes(node.subtype) && (<div className="space-y-3"><div className="space-y-2"><Label>Connected account</Label><Select disabled><SelectTrigger><SelectValue placeholder="Connection required"/></SelectTrigger><SelectContent><SelectItem value="pending">Connection required</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Destination list / audience</Label><Input value={String(node.config.destination??'')} onChange={event=>setConfig('destination',event.target.value)}/></div><div className="space-y-2"><Label>Sync mode</Label><Select value={String(node.config.mode??'upsert')} onValueChange={value=>setConfig('mode',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="upsert">Add or update</SelectItem><SelectItem value="add">Add only</SelectItem><SelectItem value="remove">Remove</SelectItem></SelectContent></Select></div></div>)}
          {node.type === 'condition' && (
            <div className="space-y-4"><p className="rounded-lg bg-violet-50 p-3 text-xs text-violet-900">This is a visible flow control on the board. Its Yes and No paths stay readable on the canvas.</p><div className="space-y-2"><Label>Evaluate</Label><Select value={String(node.config.source ?? 'contact')} onValueChange={(value)=>setConfig('source',value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="contact">Contact fields</SelectItem><SelectItem value="segment">Segment membership</SelectItem><SelectItem value="event">Event or attendance</SelectItem><SelectItem value="order">Order or ticket</SelectItem><SelectItem value="engagement">Email engagement</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="rule-summary">Rule</Label><Input id="rule-summary" placeholder="e.g. is in Members segment" value={String(node.config.rule ?? '')} onChange={(event)=>setConfig('rule',event.target.value)}/></div><p className="text-xs text-muted-foreground">Yes and No paths appear on the canvas.</p></div>
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
