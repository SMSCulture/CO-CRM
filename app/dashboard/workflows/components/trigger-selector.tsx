import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TriggerType } from '@/store/workflow-builder-store';

const TRIGGER_OPTIONS: { value: TriggerType; label: string; description: string }[] = [
  { value: 'record_created', label: 'When an event occurs', description: 'Enroll after a purchase, form submission, attendance update or another supported event.' },
  { value: 'record_updated', label: 'When filter criteria is met', description: 'Enroll when a contact, audience or event matches saved conditions.' },
  { value: 'scheduled', label: 'Based on a schedule', description: 'Enroll eligible records on a recurring date or time.' },
  { value: 'manual', label: 'Trigger manually', description: 'Choose the records yourself; no automatic enrollment.' },
];

export function TriggerSelector({ value, onChange }: { value: TriggerType; onChange: (v: TriggerType) => void }) {
  const selected = TRIGGER_OPTIONS.find((o) => o.value === value);
  return (
    <div className="space-y-1.5">
      <Label htmlFor="trigger-type">Trigger</Label>
      <Select value={value} onValueChange={(v) => onChange(v as TriggerType)}>
        <SelectTrigger id="trigger-type">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TRIGGER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selected ? <p className="text-xs text-muted-foreground">{selected.description}</p> : null}
    </div>
  );
}