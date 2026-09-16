'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, Braces, Plus, Trash2, UserCheck } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FILTER_FIELDS, OPERATOR_LABELS } from './filter-groups';
import type { Conjunction, FilterField, FilterOperator, SegmentCondition, SegmentConditionGroup, SegmentDefinition } from './segment-types';
import { useContactsData, type Contact } from '../../contacts/hooks/use-contacts-data';

interface SegmentBuilderDrawerProps { open: boolean; onOpenChange: (open: boolean) => void; onCreate: (segment: { name: string; description: string; filters: string[] }) => void }
const newCondition = (): SegmentCondition => ({ id: crypto.randomUUID(), field: 'activityStatus', operator: 'is', value: '' });
const newGroup = (): SegmentConditionGroup => ({ id: crypto.randomUUID(), conjunction: 'AND', conditions: [newCondition()] });
const emptyDefinition = (): SegmentDefinition => ({ conjunction: 'OR', groups: [newGroup()] });

export function SegmentBuilderDrawer({ open, onOpenChange, onCreate }: SegmentBuilderDrawerProps) {
  const { contacts } = useContactsData();
  const [step, setStep] = useState<1 | 2>(1);
  const [definition, setDefinition] = useState<SegmentDefinition>(() => emptyDefinition());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const matchCount = useMemo(() => contacts.filter((contact) => evaluateDefinition(contact, definition)).length, [contacts, definition]);
  const complete = definition.groups.every((group) => group.conditions.every((condition) => condition.value !== ''));

  function updateGroup(groupId: string, update: (group: SegmentConditionGroup) => SegmentConditionGroup) { setDefinition((current) => ({ ...current, groups: current.groups.map((group) => group.id === groupId ? update(group) : group) })); }
  function updateCondition(groupId: string, conditionId: string, patch: Partial<SegmentCondition>) { updateGroup(groupId, (group) => ({ ...group, conditions: group.conditions.map((condition) => condition.id === conditionId ? { ...condition, ...patch } : condition) })); }
  function changeField(groupId: string, conditionId: string, field: FilterField) { const config = FILTER_FIELDS.find((item) => item.value === field)!; updateCondition(groupId, conditionId, { field, operator: config.operators[0], value: '' }); }
  function reset() { setStep(1); setDefinition(emptyDefinition()); setName(''); setDescription(''); }
  function handleOpenChange(next: boolean) { if (!next) reset(); onOpenChange(next); }
  function handleCreate() { if (!name.trim() || !complete) return; onCreate({ name: name.trim(), description: description.trim(), filters: describeDefinition(definition) }); handleOpenChange(false); }

  return <Sheet open={open} onOpenChange={handleOpenChange}><SheetContent className="w-full overflow-y-auto bg-slate-50 sm:max-w-[760px]">
    {step === 1 ? <div className="space-y-5 pb-24">
      <SheetHeader><div className="flex items-start justify-between gap-6 pr-8"><div><SheetTitle>Build a segment</SheetTitle><SheetDescription className="mt-1">Combine precise contact, activity and purchase rules.</SheetDescription></div><Button onClick={() => setStep(2)} disabled={!complete}>Review segment</Button></div></SheetHeader>
      <div className="rounded-xl border bg-white p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold">Match groups when</p><p className="text-xs text-muted-foreground">Use OR for alternate audiences, AND when every group must match.</p></div><ConjunctionToggle value={definition.conjunction} onChange={(conjunction) => setDefinition((current) => ({ ...current, conjunction }))} /></div></div>
      <div className="space-y-3">{definition.groups.map((group, groupIndex) => <div key={group.id}>
        {groupIndex > 0 && <div className="mx-auto my-2 w-fit rounded-full border bg-white px-3 py-1 text-xs font-bold text-co-blue">{definition.conjunction}</div>}
        <div className="rounded-2xl border bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,.03)]">
          <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><Braces className="h-4 w-4 text-co-blue" /><p className="text-sm font-semibold">Rule group {groupIndex + 1}</p></div><div className="flex items-center gap-2"><ConjunctionToggle value={group.conjunction} onChange={(conjunction) => updateGroup(group.id, (value) => ({ ...value, conjunction }))} />{definition.groups.length > 1 && <Button variant="ghost" size="icon" aria-label="Remove rule group" onClick={() => setDefinition((current) => ({ ...current, groups: current.groups.filter((item) => item.id !== group.id) }))}><Trash2 className="h-4 w-4" /></Button>}</div></div>
          <div className="space-y-2">{group.conditions.map((condition, conditionIndex) => <div key={condition.id}>
            {conditionIndex > 0 && <div className="my-1.5 text-center text-[11px] font-bold text-muted-foreground">{group.conjunction}</div>}
            <ConditionRow condition={condition} onField={(field) => changeField(group.id, condition.id, field)} onOperator={(operator) => updateCondition(group.id, condition.id, { operator })} onValue={(value) => updateCondition(group.id, condition.id, { value })} onRemove={() => updateGroup(group.id, (value) => ({ ...value, conditions: value.conditions.filter((item) => item.id !== condition.id) }))} canRemove={group.conditions.length > 1} />
          </div>)}</div>
          <Button variant="ghost" size="sm" className="mt-3 gap-2 text-co-blue" onClick={() => updateGroup(group.id, (value) => ({ ...value, conditions: [...value.conditions, newCondition()] }))}><Plus className="h-3.5 w-3.5" />Add condition</Button>
        </div>
      </div>)}</div>
      <Button variant="outline" className="gap-2 border-dashed" onClick={() => setDefinition((current) => ({ ...current, groups: [...current.groups, newGroup()] }))}><Plus className="h-4 w-4" />Add rule group</Button>
      <PreviewBar matchCount={matchCount} total={contacts.length} />
    </div> : <div className="space-y-6 pb-24">
      <SheetHeader><SheetTitle>Name and review</SheetTitle><SheetDescription>Save this rule set as a reusable, dynamic segment.</SheetDescription></SheetHeader>
      <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Back to rules</button>
      <div className="space-y-2"><Label htmlFor="segment-name">Segment name</Label><Input id="segment-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Returning theater attendees" autoFocus /></div>
      <div className="space-y-2"><Label htmlFor="segment-description">Description</Label><Textarea id="segment-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Who this segment is for and how it will be used" rows={3} /></div>
      <div className="rounded-2xl border bg-white p-4"><p className="mb-3 text-sm font-semibold">Rules</p><div className="space-y-2">{describeDefinition(definition).map((filter, index) => <div key={`${filter}-${index}`} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">{filter}</div>)}</div></div>
      <PreviewBar matchCount={matchCount} total={contacts.length} />
      <Button className="w-full" onClick={handleCreate} disabled={!name.trim() || !complete}>Create dynamic segment</Button>
    </div>}
  </SheetContent></Sheet>;
}

function ConditionRow({ condition, onField, onOperator, onValue, onRemove, canRemove }: { condition: SegmentCondition; onField: (value: FilterField) => void; onOperator: (value: FilterOperator) => void; onValue: (value: string) => void; onRemove: () => void; canRemove: boolean }) {
  const config = FILTER_FIELDS.find((field) => field.value === condition.field)!;
  return <div className="grid grid-cols-[1.2fr_1fr_1.2fr_32px] gap-2 rounded-xl border bg-slate-50 p-2">
    <Select value={condition.field} onValueChange={(value) => onField(value as FilterField)}><SelectTrigger aria-label="Filter field"><SelectValue /></SelectTrigger><SelectContent>{FILTER_FIELDS.map((field) => <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>)}</SelectContent></Select>
    <Select value={condition.operator} onValueChange={(value) => onOperator(value as FilterOperator)}><SelectTrigger aria-label="Filter operator"><SelectValue /></SelectTrigger><SelectContent>{config.operators.map((operator) => <SelectItem key={operator} value={operator}>{OPERATOR_LABELS[operator]}</SelectItem>)}</SelectContent></Select>
    {config.valueType === 'boolean' ? <Select value={condition.value} onValueChange={onValue}><SelectTrigger aria-label="Filter value"><SelectValue placeholder="Choose" /></SelectTrigger><SelectContent><SelectItem value="true">Subscribed</SelectItem><SelectItem value="false">Not subscribed</SelectItem></SelectContent></Select> : config.valueType === 'activity' ? <Select value={condition.value} onValueChange={onValue}><SelectTrigger aria-label="Filter value"><SelectValue placeholder="Choose status" /></SelectTrigger><SelectContent>{['Buyers','Attendees','Followers','Subscribers','New','Returning','Inactive'].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select> : <Input aria-label="Filter value" type={config.valueType} value={condition.value} onChange={(event) => onValue(event.target.value)} placeholder={config.valueType === 'number' ? '0' : 'Enter value'} />}
    <Button variant="ghost" size="icon" onClick={onRemove} disabled={!canRemove} aria-label="Remove condition"><Trash2 className="h-4 w-4" /></Button>
  </div>;
}
function ConjunctionToggle({ value, onChange }: { value: Conjunction; onChange: (value: Conjunction) => void }) { return <div className="flex rounded-lg bg-slate-100 p-0.5">{(['AND','OR'] as const).map((item) => <button key={item} onClick={() => onChange(item)} className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-colors ${value === item ? 'bg-white text-co-blue shadow-sm' : 'text-muted-foreground'}`}>{item}</button>)}</div>; }
function PreviewBar({ matchCount, total }: { matchCount: number; total: number }) { return <div className="sticky bottom-0 z-10 flex items-center justify-between rounded-xl border border-co-blue/20 bg-blue-50/95 px-4 py-3 shadow-lg backdrop-blur"><p className="flex items-center gap-2 text-sm font-semibold"><UserCheck className="h-4 w-4 text-co-blue" />{matchCount} of {total} prototype contacts match</p><span className="text-xs text-muted-foreground">Live counts require the company contact API</span></div>; }
function evaluateDefinition(contact: Contact, definition: SegmentDefinition) { const groupResults = definition.groups.map((group) => { const results = group.conditions.map((condition) => evaluateCondition(contact, condition)); return group.conjunction === 'AND' ? results.every(Boolean) : results.some(Boolean); }); return definition.conjunction === 'AND' ? groupResults.every(Boolean) : groupResults.some(Boolean); }
function evaluateCondition(contact: Contact, condition: SegmentCondition) { const raw = contact[condition.field]; const expected = condition.value; if (Array.isArray(raw)) { const has = raw.some((value) => value.toLowerCase() === expected.toLowerCase()); return condition.operator === 'is_not' ? !has : has; } if (typeof raw === 'number') { const target = Number(expected); return condition.operator === 'greater_than' ? raw > target : condition.operator === 'less_than' ? raw < target : raw === target; } if (typeof raw === 'boolean') return raw === (expected === 'true'); const actual = String(raw).toLowerCase(); const target = expected.toLowerCase(); if (condition.operator === 'is_not') return actual !== target; if (condition.operator === 'contains') return actual.includes(target); if (condition.operator === 'before') return actual < target; if (condition.operator === 'after') return actual > target; return actual === target; }
function describeDefinition(definition: SegmentDefinition) { const descriptions: string[] = []; definition.groups.forEach((group, groupIndex) => { if (groupIndex > 0) descriptions.push(definition.conjunction); group.conditions.forEach((condition, conditionIndex) => { if (conditionIndex > 0) descriptions.push(group.conjunction); const field = FILTER_FIELDS.find((item) => item.value === condition.field)?.label ?? condition.field; descriptions.push(`${field} ${OPERATOR_LABELS[condition.operator]} ${condition.value}`); }); }); return descriptions; }
