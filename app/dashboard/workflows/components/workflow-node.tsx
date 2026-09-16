import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Bell, CircleStop, Clock3, Flag, GitBranch, Mail, Play, Tags, UserRoundCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WorkflowNode } from '@/store/workflow-builder-store';

const nodeStyles = {
  trigger: 'border-co-blue bg-blue-50 text-blue-950',
  action: 'border-co-purple bg-purple-50 text-purple-950',
  condition: 'border-co-orange bg-orange-50 text-orange-950',
  wait: 'border-amber-500 bg-amber-50 text-amber-950',
  goal: 'border-emerald-600 bg-emerald-50 text-emerald-950',
  exit: 'border-slate-500 bg-slate-50 text-slate-950',
} as const;

const subtypeIcons: Record<string, typeof Play> = {
  send_email: Mail,
  send_sms: Bell,
  add_tag: Tags,
  remove_tag: Tags,
  update_field: UserRoundCog,
  notify_staff: Bell,
};

export function WorkflowCanvasNode({ data, selected }: NodeProps) {
  const workflowNode = data.workflowNode as WorkflowNode;
  const Icon = workflowNode.type === 'trigger' ? Play : workflowNode.type === 'condition' ? GitBranch : workflowNode.type === 'wait' ? Clock3 : workflowNode.type === 'goal' ? Flag : workflowNode.type === 'exit' ? CircleStop : (subtypeIcons[workflowNode.subtype] ?? Bell);

  return (
    <div className={cn('min-w-52 rounded-xl border-2 px-4 py-3 shadow-sm transition-shadow', nodeStyles[workflowNode.type], selected && 'ring-2 ring-co-blue ring-offset-2')}>
      {workflowNode.type !== 'trigger' && <Handle type="target" position={Position.Top} />}
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-lg bg-white/75 p-2"><Icon className="h-4 w-4" /></span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">{workflowNode.type}</p>
          <p className="max-w-44 text-sm font-semibold leading-5">{workflowNode.label}</p>
        </div>
      </div>
      {workflowNode.type === 'condition' ? (
        <>
          <Handle id="yes" type="source" position={Position.Bottom} style={{ left: '30%' }} />
          <Handle id="no" type="source" position={Position.Bottom} style={{ left: '70%' }} />
          <div className="mt-3 flex justify-between text-[10px] font-bold uppercase"><span>Yes</span><span>No</span></div>
        </>
      ) : workflowNode.type !== 'exit' ? <Handle type="source" position={Position.Bottom} /> : null}
    </div>
  );
}
