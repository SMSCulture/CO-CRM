'use client';

import { useState } from 'react';
import { Reader, renderToStaticMarkup } from '@usewaypoint/email-builder';
import { Save } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { saveEmailTemplate } from '@/lib/services/email-templates-api';
import { DocumentBlock } from '../lib/blocks';
import { BlockPickerMenu } from './block-picker-menu';

export function CanvasPanel() {
  const document = useEmailTemplateBuilderStore((s) => s.document);
  const selectedMainTab = useEmailTemplateBuilderStore((s) => s.selectedMainTab);
  const setSelectedMainTab = useEmailTemplateBuilderStore((s) => s.setSelectedMainTab);
  const setSelectedBlockId = useEmailTemplateBuilderStore((s) => s.setSelectedBlockId);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await saveEmailTemplate(document);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden" onClick={() => setSelectedBlockId(null)}>
      <div
        className="flex items-center justify-between gap-4 border-b border-border px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Tabs value={selectedMainTab} onValueChange={(v) => setSelectedMainTab(v as never)}>
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <BlockPickerMenu />
          <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
            <Save className="h-4 w-4" />
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-muted/20 p-6" onClick={(e) => e.stopPropagation()}>
        {selectedMainTab === 'editor' ? <DocumentBlock id="root" /> : null}
        {selectedMainTab === 'preview' ? (
          <div className="mx-auto max-w-[600px] bg-white shadow-sm">
            <Reader document={document as never} rootBlockId="root" />
          </div>
        ) : null}
        {selectedMainTab === 'json' ? (
          <pre className="overflow-x-auto rounded-md bg-background p-4 text-xs">{JSON.stringify(document, null, 2)}</pre>
        ) : null}
        {selectedMainTab === 'html' ? (
          <pre className="overflow-x-auto rounded-md bg-background p-4 text-xs">
            {renderToStaticMarkup(document, { rootBlockId: 'root' })}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
