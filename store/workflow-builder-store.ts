import { create } from 'zustand';

export type TriggerType = 'record_created' | 'record_updated' | 'scheduled' | 'manual';
export type ActionType = 'send_email' | 'create_record' | 'update_record' | 'delay' | 'filter';

export interface WorkflowStep {
  id: string;
  type: ActionType;
  label: string;
  /** Free-form config per action type — e.g. { templateId } for send_email, { days } for delay. */
  config: Record<string, string>;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: { type: TriggerType; config: Record<string, string> };
  steps: WorkflowStep[];
  isActive: boolean;
}

const STARTER_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-1',
    name: 'First Ticket Purchase',
    description: 'Confirmation, pre-event reminder, and a post-event follow-up for first-time buyers.',
    trigger: { type: 'record_created', config: { object: 'Order' } },
    steps: [
      { id: 'step-1', type: 'send_email', label: 'Send confirmation', config: { templateId: 'welcome-email' } },
      { id: 'step-2', type: 'delay', label: 'Wait until 1 day before the event', config: { unit: 'event_relative' } },
      { id: 'step-3', type: 'send_email', label: 'Send event reminder', config: { templateId: '' } },
    ],
    isActive: true,
  },
  {
    id: 'wf-2',
    name: 'Lapsed Attendee Win-Back',
    description: 'Re-engage contacts with no activity in 180 days using their preferred categories.',
    trigger: { type: 'scheduled', config: { frequency: 'weekly' } },
    steps: [
      { id: 'step-1', type: 'filter', label: 'No activity in 180+ days', config: {} },
      { id: 'step-2', type: 'send_email', label: 'Send personalized re-engagement email', config: { templateId: '' } },
    ],
    isActive: false,
  },
];

interface WorkflowBuilderState {
  workflows: Workflow[];
  activeWorkflowId: string | null;
  setActiveWorkflowId: (id: string | null) => void;
  createWorkflow: () => string;
  updateWorkflow: (id: string, patch: Partial<Omit<Workflow, 'id'>>) => void;
  addStep: (workflowId: string, step: Omit<WorkflowStep, 'id'>) => void;
  updateStep: (workflowId: string, stepId: string, patch: Partial<Omit<WorkflowStep, 'id'>>) => void;
  removeStep: (workflowId: string, stepId: string) => void;
  moveStep: (workflowId: string, stepId: string, direction: 'up' | 'down') => void;
  toggleActive: (id: string) => void;
}

export const useWorkflowBuilderStore = create<WorkflowBuilderState>()((set, get) => ({
  workflows: STARTER_WORKFLOWS,
  activeWorkflowId: null,

  setActiveWorkflowId: (id) => set({ activeWorkflowId: id }),

  createWorkflow: () => {
    const id = `wf-${Date.now()}`;
    const workflow: Workflow = {
      id,
      name: 'Untitled Workflow',
      description: '',
      trigger: { type: 'manual', config: {} },
      steps: [],
      isActive: false,
    };
    set({ workflows: [workflow, ...get().workflows], activeWorkflowId: id });
    return id;
  },

  updateWorkflow: (id, patch) => {
    set({ workflows: get().workflows.map((w) => (w.id === id ? { ...w, ...patch } : w)) });
  },

  addStep: (workflowId, step) => {
    const newStep: WorkflowStep = { ...step, id: `step-${Date.now()}` };
    set({
      workflows: get().workflows.map((w) =>
        w.id === workflowId ? { ...w, steps: [...w.steps, newStep] } : w
      ),
    });
  },

  updateStep: (workflowId, stepId, patch) => {
    set({
      workflows: get().workflows.map((w) =>
        w.id === workflowId
          ? { ...w, steps: w.steps.map((s) => (s.id === stepId ? { ...s, ...patch } : s)) }
          : w
      ),
    });
  },

  removeStep: (workflowId, stepId) => {
    set({
      workflows: get().workflows.map((w) =>
        w.id === workflowId ? { ...w, steps: w.steps.filter((s) => s.id !== stepId) } : w
      ),
    });
  },

  moveStep: (workflowId, stepId, direction) => {
    set({
      workflows: get().workflows.map((w) => {
        if (w.id !== workflowId) return w;
        const index = w.steps.findIndex((s) => s.id === stepId);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (index === -1 || targetIndex < 0 || targetIndex >= w.steps.length) return w;
        const steps = [...w.steps];
        [steps[index], steps[targetIndex]] = [steps[targetIndex], steps[index]];
        return { ...w, steps };
      }),
    });
  },

  toggleActive: (id) => {
    set({ workflows: get().workflows.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w)) });
  },
}));