import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';

interface TextLikeData {
  props?: { text?: string | null };
  style?: { color?: string | null; fontSize?: number | null } | null;
}

// Shared by Text and Heading — both share the same {props.text, style.color, style.fontSize} shape.
export function TextInputPanel({ blockId }: { blockId: string }) {
  const block = useEmailTemplateBuilderStore((s) => s.document[blockId]);
  const setDocument = useEmailTemplateBuilderStore((s) => s.setDocument);
  const document = useEmailTemplateBuilderStore((s) => s.document);
  if (!block) return null;
  const data = block.data as TextLikeData;

  function updateData(patch: Partial<TextLikeData>) {
    setDocument({
      ...document,
      [blockId]: { ...block, data: { ...data, ...patch } },
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="text-content">Text</Label>
        <Textarea
          id="text-content"
          rows={4}
          value={data.props?.text ?? ''}
          onChange={(e) => updateData({ props: { ...data.props, text: e.target.value } })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="text-color">Color</Label>
        <div className="flex gap-2">
          <input
            id="text-color"
            type="color"
            value={data.style?.color ?? '#242424'}
            onChange={(e) => updateData({ style: { ...data.style, color: e.target.value } })}
            className="h-9 w-10 shrink-0 rounded border border-input"
          />
          <Input
            value={data.style?.color ?? ''}
            placeholder="#242424"
            onChange={(e) => updateData({ style: { ...data.style, color: e.target.value } })}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="text-font-size">Font size</Label>
        <Input
          id="text-font-size"
          type="number"
          value={data.style?.fontSize ?? ''}
          onChange={(e) => updateData({ style: { ...data.style, fontSize: e.target.value ? Number(e.target.value) : null } })}
        />
      </div>
    </div>
  );
}
