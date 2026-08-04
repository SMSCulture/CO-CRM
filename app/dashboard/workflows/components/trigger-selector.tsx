import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TriggerType } from '@/store/workflow-builder-store';

const TRIGGER_OPTIONS: { value: TriggerType; label: string; description: string }[] = [
  { value: 'record_created', label: 'Record created', description: 'A new record (e.g. Order, Contact) is created.' },
  { value: 'record_updated', label: 'Record updated', description: 'An existing record is changed.' },
  { value: 'scheduled', label: 'Scheduled', description: 'Runs on a recurring schedule.' },
  { value: 'manual', label: 'Manual', description: 'Run on demand, not automatically triggered.' },
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