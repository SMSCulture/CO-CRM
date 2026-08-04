import { Button } from '@/components/ui/button';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { SAMPLE_TEMPLATES } from '../lib/sample-templates';

export function SamplesPanel() {
  const resetDocument = useEmailTemplateBuilderStore((s) => s.resetDocument);

  return (
    <div className="flex h-full w-56 shrink-0 flex-col gap-1 border-r border-border bg-muted/30 p-3">
      <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Samples</p>
      {SAMPLE_TEMPLATES.map((sample) => (
        <Button
          key={sample.id}
          variant="ghost"
          className="justify-start"
          onClick={() => resetDocument(sample.document)}
        >
          {sample.label}
        </Button>
      ))}
    </div>
  );
}
