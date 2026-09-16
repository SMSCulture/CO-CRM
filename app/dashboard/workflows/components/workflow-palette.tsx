import { Bell, CircleStop, Clock3, Flag, GitBranch, Mail, Tags, UserRoundCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WorkflowNodeType } from '@/store/workflow-builder-store';

export interface PaletteItem { type: WorkflowNodeType; subtype: string; label: string }
const ITEMS: Array<PaletteItem & { icon: typeof Mail }> = [
  { type: 'action', subtype: 'send_email', label: 'Send email', icon: Mail },
  { type: 'action', subtype: 'add_tag', label: 'Add tag', icon: Tags },
  { type: 'action', subtype: 'update_field', label: 'Update field', icon: UserRoundCog },
  { type: 'action', subtype: 'notify_staff', label: 'Notify staff', icon: Bell },
  { type: 'condition', subtype: 'contact_filter', label: 'Condition', icon: GitBranch },
  { type: 'wait', subtype: 'fixed_delay', label: 'Wait', icon: Clock3 },
  { type: 'goal', subtype: 'conversion', label: 'Goal', icon: Flag },
  { type: 'exit', subtype: 'complete', label: 'Exit', icon: CircleStop },
];

export function WorkflowPalette({ onAdd }: { onAdd: (item: PaletteItem) => void }) {
  return <aside className="w-52 shrink-0 border-r border-border bg-white p-3"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Add a node</p><div className="space-y-1">{ITEMS.map((item) => { const Icon = item.icon; return <Button key={`${item.type}-${item.subtype}`} variant="ghost" className="w-full justify-start gap-2" onClick={() => onAdd(item)}><Icon className="h-4 w-4" />{item.label}</Button>; })}</div><p className="mt-4 text-xs leading-5 text-muted-foreground">Click a node to add it, then connect its handles on the canvas.</p></aside>;
}
