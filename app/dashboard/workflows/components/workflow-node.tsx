import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Bell, Check, CircleStop, Clock3, Facebook, Flag, GitBranch, Instagram, Mail, Megaphone, Play, Tags, UserRoundCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WorkflowNode } from '@/store/workflow-builder-store';

const nodeStyles = {
  trigger: 'border-amber-300',
  action: 'border-slate-200',
  condition: 'border-violet-300',
  wait: 'border-slate-200',
  goal: 'border-emerald-300',
  exit: 'border-slate-300',
} as const;

const subtypeIcons: Record<string, typeof Play> = {
  send_email: Mail,
  send_sms: Bell,
  add_tag: Tags,
  remove_tag: Tags,
  update_field: UserRoundCog,
  notify_staff: Bell,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Megaphone,
  instagram_post: Instagram,
  facebook_post: Facebook,
  tiktok_post: Megaphone,
};

export function WorkflowCanvasNode({ data, selected }: NodeProps) {
  const workflowNode = data.workflowNode as WorkflowNode;
  const Icon = workflowNode.type === 'trigger' ? Play : workflowNode.type === 'condition' ? GitBranch : workflowNode.type === 'wait' ? Clock3 : workflowNode.type === 'goal' ? Flag : workflowNode.type === 'exit' ? CircleStop : (subtypeIcons[workflowNode.subtype] ?? Bell);

  return (
    <div className={cn('min-w-64 rounded-lg border bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,.08)] transition-all', nodeStyles[workflowNode.type], selected && 'ring-2 ring-[#503eb5] ring-offset-2')}>
      {workflowNode.type !== 'trigger' && <Handle type="target" position={Position.Top} className="!h-2.5 !w-2.5 !border-2 !border-white !bg-slate-400" />}
      <div className="flex items-center gap-3">
        <span className={cn('grid h-9 w-9 place-items-center rounded-md text-white', workflowNode.type === 'trigger' ? 'bg-[#ff4f00]' : workflowNode.type === 'condition' ? 'bg-[#503eb5]' : 'bg-slate-700')}><Icon className="h-4 w-4" /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{workflowNode.type === 'trigger' ? 'When this happens' : 'Then do this'}</p>
          <p className="truncate text-sm font-semibold text-slate-950">{workflowNode.label}</p>
        </div>
        <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3" /></span>
      </div>
      {workflowNode.type === 'condition' ? (
        <>
          <Handle id="yes" type="source" position={Position.Bottom} style={{ left: '30%' }} className="!bg-[#503eb5]" />
          <Handle id="no" type="source" position={Position.Bottom} style={{ left: '70%' }} className="!bg-[#503eb5]" />
          <div className="mt-3 flex justify-between text-[10px] font-bold uppercase"><span>Yes</span><span>No</span></div>
        </>
      ) : workflowNode.type !== 'exit' ? <Handle type="source" position={Position.Bottom} /> : null}
    </div>
  );
}
