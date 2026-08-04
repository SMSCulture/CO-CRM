'use client';

import type { TReaderDocument } from '@usewaypoint/email-builder';
import { Avatar } from '@usewaypoint/block-avatar';
import { Button } from '@usewaypoint/block-button';
import { ColumnsContainer } from '@usewaypoint/block-columns-container';
import { Container } from '@usewaypoint/block-container';
import { Divider } from '@usewaypoint/block-divider';
import { Heading } from '@usewaypoint/block-heading';
import { Html } from '@usewaypoint/block-html';
import { Image } from '@usewaypoint/block-image';
import { Spacer } from '@usewaypoint/block-spacer';
import { Text } from '@usewaypoint/block-text';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { cn } from '@/lib/utils';

interface StoredColumn {
  childrenIds: string[];
}

// Leaf block types render directly. Container-like types (Container, ColumnsContainer,
// EmailLayout) render their childrenIds recursively via <SelectableBlock>. This mirrors
// usewaypoint's own documents/editor/core.tsx dispatcher, rebuilt locally so each block
// can be wrapped in a click-to-select handler instead of using Reader's fixed renderer
// (Reader stays reserved for the read-only Preview tab).
export function DocumentBlock({ id }: { id: string }) {
  const block = useEmailTemplateBuilderStore((s) => s.document[id]);
  if (!block) return null;

  switch (block.type) {
    case 'EmailLayout': {
      const data = block.data as { childrenIds?: string[]; backdropColor?: string; canvasColor?: string; textColor?: string };
      return (
        <div style={{ backgroundColor: data.backdropColor ?? '#F5F5F5' }} className="min-h-full py-8">
          <div
            style={{ backgroundColor: data.canvasColor ?? '#FFFFFF', color: data.textColor ?? '#242424' }}
            className="mx-auto max-w-[600px]"
          >
            {(data.childrenIds ?? []).map((childId) => (
              <SelectableBlock key={childId} id={childId} />
            ))}
          </div>
        </div>
      );
    }
    case 'Container': {
      const data = block.data as { style?: Record<string, unknown>; props?: { childrenIds?: string[] } };
      return (
        <Container style={data.style as never}>
          {(data.props?.childrenIds ?? []).map((childId) => (
            <SelectableBlock key={childId} id={childId} />
          ))}
        </Container>
      );
    }
    case 'ColumnsContainer': {
      const data = block.data as { style?: Record<string, unknown>; props?: { columns?: StoredColumn[] } & Record<string, unknown> };
      const columns = (data.props?.columns ?? []).map((column, columnIndex) => (
        <div key={columnIndex}>
          {column.childrenIds.map((childId) => (
            <SelectableBlock key={childId} id={childId} />
          ))}
        </div>
      ));
      return <ColumnsContainer style={data.style as never} props={data.props as never} columns={columns} />;
    }
    case 'Avatar':
      return <Avatar {...(block.data as Record<string, unknown>)} />;
    case 'Button':
      return <Button {...(block.data as Record<string, unknown>)} />;
    case 'Divider':
      return <Divider {...(block.data as Record<string, unknown>)} />;
    case 'Heading':
      return <Heading {...(block.data as Record<string, unknown>)} />;
    case 'Html':
      return <Html {...(block.data as Record<string, unknown>)} />;
    case 'Image':
      return <Image {...(block.data as Record<string, unknown>)} />;
    case 'Spacer':
      return <Spacer {...(block.data as Record<string, unknown>)} />;
    case 'Text':
      return <Text {...(block.data as Record<string, unknown>)} />;
    default:
      return null;
  }
}

function SelectableBlock({ id }: { id: string }) {
  const selectedBlockId = useEmailTemplateBuilderStore((s) => s.selectedBlockId);
  const setSelectedBlockId = useEmailTemplateBuilderStore((s) => s.setSelectedBlockId);
  const isSelected = selectedBlockId === id;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedBlockId(id);
      }}
      className={cn(
        'relative cursor-pointer outline outline-1 outline-transparent transition-colors hover:outline-primary/40',
        isSelected && 'outline-2 outline-primary'
      )}
    >
      <DocumentBlock id={id} />
    </div>
  );
}

export function documentToArray(document: TReaderDocument): Array<{ id: string; type: string }> {
  return Object.entries(document).map(([id, block]) => ({ id, type: block.type }));
}
