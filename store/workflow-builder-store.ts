import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TriggerType = 'record_created' | 'record_updated' | 'scheduled' | 'manual';
export type WorkflowNodeType = 'trigger' | 'action' | 'condition' | 'wait' | 'goal' | 'exit';
export type WorkflowBranch = 'yes' | 'no';

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  subtype: string;
  label: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  from: string;
  to: string;
  branch?: WorkflowBranch;
}

export type AutomationKind = 'event' | 'audience';

export interface Workflow {
  id: string;
  kind?: AutomationKind;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  isActive: boolean;
}

export interface WorkflowValidationIssue {
  nodeId?: string;
  message: string;
}

const triggerNode = (id: string, subtype: TriggerType, label: string): WorkflowNode => ({
  id,
  type: 'trigger',
  subtype,
  label,
  config: {},
  position: { x: 320, y: 40 },
});

const STARTER_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-1',
    name: 'First Ticket Purchase',
    description: 'Confirmation, pre-event reminder, and a post-event follow-up for first-time buyers.',
    nodes: [
      { ...triggerNode('wf-1-trigger', 'record_created', 'First ticket purchase'), config: { object: 'Order' } },
      { id: 'wf-1-email-1', type: 'action', subtype: 'send_email', label: 'Send confirmation', config: { templateId: 'welcome-email' }, position: { x: 320, y: 180 } },
      { id: 'wf-1-wait', type: 'wait', subtype: 'event_relative', label: 'Wait until 1 day before event', config: { duration: 1, unit: 'days', relation: 'before_event' }, position: { x: 320, y: 320 } },
      { id: 'wf-1-email-2', type: 'action', subtype: 'send_email', label: 'Send event reminder', config: { templateId: '' }, position: { x: 320, y: 460 } },
      { id: 'wf-1-exit', type: 'exit', subtype: 'complete', label: 'Journey complete', config: {}, position: { x: 320, y: 600 } },
    ],
    edges: [
      { id: 'wf-1-e1', from: 'wf-1-trigger', to: 'wf-1-email-1' },
      { id: 'wf-1-e2', from: 'wf-1-email-1', to: 'wf-1-wait' },
      { id: 'wf-1-e3', from: 'wf-1-wait', to: 'wf-1-email-2' },
      { id: 'wf-1-e4', from: 'wf-1-email-2', to: 'wf-1-exit' },
    ],
    isActive: false,
  },
  {
    id: 'wf-2',
    name: 'Lapsed Attendee Win-Back',
    description: 'Re-engage contacts with no activity in 180 days using their preferred categories.',
    nodes: [
      { ...triggerNode('wf-2-trigger', 'scheduled', 'Weekly audience check'), config: { frequency: 'weekly' } },
      { id: 'wf-2-condition', type: 'condition', subtype: 'contact_filter', label: 'No activity in 180+ days?', config: { field: 'lastActivity', operator: 'older_than', value: 180 }, position: { x: 320, y: 190 } },
      { id: 'wf-2-email', type: 'action', subtype: 'send_email', label: 'Send re-engagement email', config: { templateId: '' }, position: { x: 150, y: 360 } },
      { id: 'wf-2-exit-yes', type: 'exit', subtype: 'complete', label: 'Journey complete', config: {}, position: { x: 150, y: 520 } },
      { id: 'wf-2-exit-no', type: 'exit', subtype: 'no_match', label: 'No action', config: {}, position: { x: 500, y: 360 } },
    ],
    edges: [
      { id: 'wf-2-e1', from: 'wf-2-trigger', to: 'wf-2-condition' },
      { id: 'wf-2-e2', from: 'wf-2-condition', to: 'wf-2-email', branch: 'yes' },
      { id: 'wf-2-e3', from: 'wf-2-condition', to: 'wf-2-exit-no', branch: 'no' },
      { id: 'wf-2-e4', from: 'wf-2-email', to: 'wf-2-exit-yes' },
    ],
    isActive: false,
  },
];

export function validateWorkflow(workflow: Workflow): WorkflowValidationIssue[] {
  const issues: WorkflowValidationIssue[] = [];
  const nodeIds = new Set(workflow.nodes.map((node) => node.id));
  const incoming = new Map<string, number>();
  const outgoing = new Map<string, WorkflowEdge[]>();

  workflow.edges.forEach((edge) => {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      issues.push({ message: 'A connection points to a node that no longer exists.' });
      return;
    }
    incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);
    outgoing.set(edge.from, [...(outgoing.get(edge.from) ?? []), edge]);
  });

  const triggers = workflow.nodes.filter((node) => node.type === 'trigger');
  if (triggers.length !== 1) issues.push({ message: 'A workflow needs exactly one trigger.' });

  workflow.nodes.forEach((node) => {
    if (node.type !== 'trigger' && !incoming.get(node.id)) {
      issues.push({ nodeId: node.id, message: `${node.label} is disconnected.` });
    }
    if (node.type !== 'exit' && !(outgoing.get(node.id)?.length)) {
      issues.push({ nodeId: node.id, message: `${node.label} has no next step.` });
    }
    if (node.type === 'condition') {
      const branches = new Set((outgoing.get(node.id) ?? []).map((edge) => edge.branch));
      if (!branches.has('yes') || !branches.has('no')) {
        issues.push({ nodeId: node.id, message: `${node.label} needs both Yes and No branches.` });
      }
    }
    if (node.type === 'action' && node.subtype === 'send_email' && !node.config.templateId) {
      issues.push({ nodeId: node.id, message: `${node.label} needs an email template.` });
    }
    if (node.type === 'wait' && (!node.config.duration || !node.config.unit)) {
      issues.push({ nodeId: node.id, message: `${node.label} needs a duration and unit.` });
    }
  });

  return issues;
}

interface WorkflowBuilderState {
  workflows: Workflow[];
  activeWorkflowId: string | null;
  setActiveWorkflowId: (id: string | null) => void;
  createWorkflow: (kind?: AutomationKind, template?: string) => string;
  updateWorkflow: (id: string, patch: Partial<Omit<Workflow, 'id'>>) => void;
  addNode: (workflowId: string, node: Omit<WorkflowNode, 'id'>) => string;
  updateNode: (workflowId: string, nodeId: string, patch: Partial<Omit<WorkflowNode, 'id' | 'type'>>) => void;
  removeNode: (workflowId: string, nodeId: string) => void;
  connectNodes: (workflowId: string, edge: Omit<WorkflowEdge, 'id'>) => void;
  removeEdge: (workflowId: string, edgeId: string) => void;
  toggleActive: (id: string) => boolean;
}

const newId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const useWorkflowBuilderStore = create<WorkflowBuilderState>()(
  persist(
    (set, get) => ({
      workflows: STARTER_WORKFLOWS,
      activeWorkflowId: null,
      setActiveWorkflowId: (id) => set({ activeWorkflowId: id }),
      createWorkflow: (kind = 'event', template) => {
        const id = newId('wf');
        const workflow: Workflow = {
          id,
          name: template || (kind === 'event' ? 'Untitled Event Automation' : 'Untitled Audience Journey'),
          description: kind === 'event' ? 'Promote and support an event across channels.' : 'Engage people as their relationship changes.',
          kind,
          nodes: [triggerNode(newId('node'), 'manual', 'Manual trigger')],
          edges: [],
          isActive: false,
        };
        set({ workflows: [workflow, ...get().workflows], activeWorkflowId: id });
        return id;
      },
      updateWorkflow: (id, patch) => set({ workflows: get().workflows.map((workflow) => workflow.id === id ? { ...workflow, ...patch } : workflow) }),
      addNode: (workflowId, node) => {
        const id = newId('node');
        set({ workflows: get().workflows.map((workflow) => workflow.id === workflowId ? { ...workflow, nodes: [...workflow.nodes, { ...node, id }] } : workflow) });
        return id;
      },
      updateNode: (workflowId, nodeId, patch) => set({ workflows: get().workflows.map((workflow) => workflow.id === workflowId ? { ...workflow, nodes: workflow.nodes.map((node) => node.id === nodeId ? { ...node, ...patch } : node) } : workflow) }),
      removeNode: (workflowId, nodeId) => set({ workflows: get().workflows.map((workflow) => workflow.id === workflowId ? { ...workflow, nodes: workflow.nodes.filter((node) => node.id !== nodeId), edges: workflow.edges.filter((edge) => edge.from !== nodeId && edge.to !== nodeId) } : workflow) }),
      connectNodes: (workflowId, edge) => set({ workflows: get().workflows.map((workflow) => {
        if (workflow.id !== workflowId || edge.from === edge.to) return workflow;
        const duplicate = workflow.edges.some((item) => item.from === edge.from && item.to === edge.to && item.branch === edge.branch);
        return duplicate ? workflow : { ...workflow, edges: [...workflow.edges, { ...edge, id: newId('edge') }] };
      }) }),
      removeEdge: (workflowId, edgeId) => set({ workflows: get().workflows.map((workflow) => workflow.id === workflowId ? { ...workflow, edges: workflow.edges.filter((edge) => edge.id !== edgeId) } : workflow) }),
      toggleActive: (id) => {
        const workflow = get().workflows.find((item) => item.id === id);
        if (!workflow || (!workflow.isActive && validateWorkflow(workflow).length > 0)) return false;
        set({ workflows: get().workflows.map((item) => item.id === id ? { ...item, isActive: !item.isActive } : item) });
        return true;
      },
    }),
    { name: 'cultureowl-workflows-v2' },
  ),
);
