import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { TextInputPanel } from './input-panels/text-input-panel';
import { ButtonInputPanel } from './input-panels/button-input-panel';
import { GenericJsonInputPanel } from './input-panels/generic-json-input-panel';

// Dispatches to a dedicated field-by-field panel for the block types that have
// one (Text, Heading, Button), falling back to a generic JSON editor for the
// rest (Avatar, Divider, Html, Image, Spacer, Container, ColumnsContainer,
// EmailLayout) — every block type is still editable, just not all with
// dedicated fields yet.
export function BlockConfigurationPanel() {
  const selectedBlockId = useEmailTemplateBuilderStore((s) => s.selectedBlockId);
  const block = useEmailTemplateBuilderStore((s) => (selectedBlockId ? s.document[selectedBlockId] : null));

  if (!selectedBlockId || !block) {
    return <p className="text-sm text-muted-foreground">Select a block on the canvas to edit it.</p>;
  }

  switch (block.type) {
    case 'Text':
    case 'Heading':
      return <TextInputPanel blockId={selectedBlockId} />;
    case 'Button':
      return <ButtonInputPanel blockId={selectedBlockId} />;
    default:
      return <GenericJsonInputPanel blockId={selectedBlockId} />;
  }
}
