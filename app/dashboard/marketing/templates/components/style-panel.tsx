import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';

const FONT_FAMILIES = [
  'MODERN_SANS',
  'BOOK_SANS',
  'ORGANIC_SANS',
  'GEOMETRIC_SANS',
  'HEAVY_SANS',
  'ROUNDED_SANS',
  'MODERN_SERIF',
  'BOOK_SERIF',
  'MONOSPACE',
];

interface RootData {
  backdropColor?: string;
  canvasColor?: string;
  textColor?: string;
  fontFamily?: string;
}

function ColorField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-10 shrink-0 rounded border border-input"
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

// Global document-level styles — the root "EmailLayout" block's data. Same
// fields the demo's StylesPanel.tsx exposes.
export function StylePanel() {
  const document = useEmailTemplateBuilderStore((s) => s.document);
  const setDocument = useEmailTemplateBuilderStore((s) => s.setDocument);
  const root = document.root?.data as RootData | undefined;
  if (!document.root || !root) return null;

  function updateRoot(patch: Partial<RootData>) {
    setDocument({ ...document, root: { ...document.root, data: { ...root, ...patch } } });
  }

  return (
    <div className="space-y-4">
      <ColorField id="backdrop-color" label="Backdrop color" value={root.backdropColor ?? '#F5F5F5'} onChange={(v) => updateRoot({ backdropColor: v })} />
      <ColorField id="canvas-color" label="Canvas color" value={root.canvasColor ?? '#FFFFFF'} onChange={(v) => updateRoot({ canvasColor: v })} />
      <ColorField id="text-color" label="Text color" value={root.textColor ?? '#242424'} onChange={(v) => updateRoot({ textColor: v })} />
      <div className="space-y-1.5">
        <Label htmlFor="font-family">Font family</Label>
        <Select value={root.fontFamily ?? 'MODERN_SANS'} onValueChange={(v) => updateRoot({ fontFamily: v })}>
          <SelectTrigger id="font-family">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((font) => (
              <SelectItem key={font} value={font}>
                {font.replaceAll('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
