import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { ActionType } from '@/store/workflow-builder-store';

const ACTION_OPTIONS: { type: ActionType; label: string }[] = [
  { type: 'send_email', label: 'Send Email' },
  { type: 'delay', label: 'Delay' },
  { type: 'filter', label: 'Filter' },
  { type: 'create_record', label: 'Create Record' },
  { type: 'update_record', label: 'Update Record' },
];

export function AddStepMenu({ onAdd }: { onAdd: (type: ActionType, label: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {ACTION_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.type} onClick={() => onAdd(option.type, option.label)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}