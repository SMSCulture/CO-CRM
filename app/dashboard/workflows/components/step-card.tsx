import { ArrowUp, ArrowDown, Trash2, Mail, Database, Clock, Filter as FilterIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ActionType, WorkflowStep } from '@/store/workflow-builder-store';
import { SAMPLE_TEMPLATES } from '@/app/dashboard/marketing/templates/lib/sample-templates';

const ACTION_ICONS: Record<ActionType, typeof Mail> = {
  send_email: Mail,
  create_record: Database,
  update_record: Database,
  delay: Clock,
  filter: FilterIcon,
};

interface StepCardProps {
  step: WorkflowStep;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onLabelChange: (label: string) => void;
  onConfigChange: (config: Record<string, string>) => void;
}

export function StepCard({ step, index, total, onMoveUp, onMoveDown, onRemove, onLabelChange, onConfigChange }: StepCardProps) {
  const Icon = ACTION_ICONS[step.type];

  return (
    <Card className="rounded-xl border-border">
      <CardContent className="flex items-center gap-3 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-co-blue/10 text-co-blue">
          <Icon className="h-4 w-4" />
        </span>
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Step {index + 1} · {step.type.replaceAll('_', ' ')}
          </p>
          <Input value={step.label} onChange={(e) => onLabelChange(e.target.value)} className="h-8" />
          {step.type === 'send_email' ? (
            <Select value={step.config.templateId ?? ''} onValueChange={(v) => onConfigChange({ ...step.config, templateId: v })}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {SAMPLE_TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" disabled={index === 0} onClick={onMoveUp}>
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" disabled={index === total - 1} onClick={onMoveDown}>
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
