import { Plus } from 'lucide-react';
import { TextPropsDefaults } from '@usewaypoint/block-text';
import { HeadingPropsDefaults } from '@usewaypoint/block-heading';
import { ButtonPropsDefaults } from '@usewaypoint/block-button';
import { DividerPropsDefaults } from '@usewaypoint/block-divider';
import { SpacerPropsDefaults } from '@usewaypoint/block-spacer';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';

const NEW_BLOCK_OPTIONS = [
  { type: 'Heading', label: 'Heading', data: { props: HeadingPropsDefaults } },
  { type: 'Text', label: 'Text', data: { props: TextPropsDefaults } },
  { type: 'Button', label: 'Button', data: { props: ButtonPropsDefaults } },
  { type: 'Divider', label: 'Divider', data: { props: DividerPropsDefaults } },
  { type: 'Spacer', label: 'Spacer', data: { props: SpacerPropsDefaults } },
] as const;

// Click-based block insertion, matching the original's non-drag-and-drop
// approach — appends a new block to the end of the root EmailLayout.
export function BlockPickerMenu() {
  const document = useEmailTemplateBuilderStore((s) => s.document);
  const setDocument = useEmailTemplateBuilderStore((s) => s.setDocument);
  const setSelectedBlockId = useEmailTemplateBuilderStore((s) => s.setSelectedBlockId);

  function addBlock(option: (typeof NEW_BLOCK_OPTIONS)[number]) {
    const root = document.root as { data?: { childrenIds?: string[] } } | undefined;
    if (!root?.data) return;
    const id = `block-${option.type.toLowerCase()}-${Date.now()}`;
    setDocument({
      ...document,
      [id]: { type: option.type, data: option.data },
      root: { ...root, data: { ...root.data, childrenIds: [...(root.data.childrenIds ?? []), id] } },
    } as never);
    setSelectedBlockId(id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Block
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {NEW_BLOCK_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.type} onClick={() => addBlock(option)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
