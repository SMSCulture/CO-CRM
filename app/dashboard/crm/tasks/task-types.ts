export type WorkKind = 'stewardship' | 'service' | 'survey';
export const WORK_TYPES = {
 stewardship: ['Follow-up','Personal invitation','Relationship note'],
 service: ['Accessibility','Complaint','Information request'],
 survey: ['Post-event feedback','Audience interests','Service follow-up'],
} as const;
export const WORK_TYPE_META: Record<WorkKind,{label:string;description:string}> = {
 stewardship:{label:'Stewardship',description:'Relationship and follow-up work.'},
 service:{label:'Service case',description:'A patron request that needs an owner and outcome.'},
 survey:{label:'Survey follow-up',description:'A reviewed response or feedback request. No automatic send.'},
};
