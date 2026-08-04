import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';

// Fallback for block types that don't have a dedicated field-by-field panel yet
// (Avatar, Divider, Html, Image, Spacer, Container, ColumnsContainer, EmailLayout).
// Edits the block's raw `data` as JSON — still fully functional, just not as
// friendly as the dedicated panels for Text/Heading/Button.
export function GenericJsonInputPanel({ blockId }: { blockId: string }) {
  const block = useEmailTemplateBuilderStore((s) => s.document[blockId]);
  const setDocument = useEmailTemplateBuilderStore((s) => s.setDocument);
  const document = useEmailTemplateBuilderStore((s) => s.document);
  const [draft, setDraft] = useState(() => JSON.stringify(block?.data ?? {}, null, 2));
  const [error, setError] = useState<string | null>(null);

  if (!block) return null;

  function apply() {
    try {
      const parsed = JSON.parse(draft);
      setDocument({ ...document, [blockId]: { ...block, data: parsed } });
      setError(null);
    } catch {
      setError('Invalid JSON — changes not applied.');
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="generic-json">{block.type} data (JSON)</Label>
        <Textarea
          id="generic-json"
          rows={12}
          className="font-mono text-xs"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </div>
      <Button size="sm" onClick={apply}>
        Apply
      </Button>
    </div>
  );
}
