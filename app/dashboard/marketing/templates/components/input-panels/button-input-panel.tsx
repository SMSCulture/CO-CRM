import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';

interface ButtonData {
  props?: { text?: string | null; url?: string | null; buttonBackgroundColor?: string | null };
}

export function ButtonInputPanel({ blockId }: { blockId: string }) {
  const block = useEmailTemplateBuilderStore((s) => s.document[blockId]);
  const setDocument = useEmailTemplateBuilderStore((s) => s.setDocument);
  const document = useEmailTemplateBuilderStore((s) => s.document);
  if (!block) return null;
  const data = block.data as ButtonData;

  function updateProps(patch: Partial<NonNullable<ButtonData['props']>>) {
    setDocument({
      ...document,
      [blockId]: { ...block, data: { ...data, props: { ...data.props, ...patch } } },
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="button-text">Button label</Label>
        <Input id="button-text" value={data.props?.text ?? ''} onChange={(e) => updateProps({ text: e.target.value })} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="button-url">Link URL</Label>
        <Input id="button-url" value={data.props?.url ?? ''} onChange={(e) => updateProps({ url: e.target.value })} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="button-bg">Background color</Label>
        <div className="flex gap-2">
          <input
            id="button-bg"
            type="color"
            value={data.props?.buttonBackgroundColor ?? '#2563EB'}
            onChange={(e) => updateProps({ buttonBackgroundColor: e.target.value })}
            className="h-9 w-10 shrink-0 rounded border border-input"
          />
          <Input
            value={data.props?.buttonBackgroundColor ?? ''}
            placeholder="#2563EB"
            onChange={(e) => updateProps({ buttonBackgroundColor: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
