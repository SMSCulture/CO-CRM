'use client';

import { Reader, renderToStaticMarkup } from '@usewaypoint/email-builder';
import { Code2, Eye, Undo2, Redo2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { DocumentBlock } from '../lib/blocks';
import type { PreviewWidth } from './email-template-builder';
import { cn } from '@/lib/utils';

export function CanvasPanel({ previewWidth }: { previewWidth: PreviewWidth }) {
  const document = useEmailTemplateBuilderStore((s) => s.document);
  const selectedMainTab = useEmailTemplateBuilderStore((s) => s.selectedMainTab);
  const setSelectedMainTab = useEmailTemplateBuilderStore((s) => s.setSelectedMainTab);
  const setSelectedBlockId = useEmailTemplateBuilderStore((s) => s.setSelectedBlockId);
  const width = previewWidth === 'mobile' ? 'max-w-[390px]' : 'max-w-[680px]';

  return <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden" onClick={() => setSelectedBlockId(null)}>
    <div className="flex items-center justify-between gap-4 border-b bg-white px-4 py-2" onClick={(event) => event.stopPropagation()}>
      <Tabs value={selectedMainTab} onValueChange={(value) => setSelectedMainTab(value as never)}><TabsList><TabsTrigger value="editor">Design</TabsTrigger><TabsTrigger value="preview" className="gap-1.5"><Eye className="h-3.5 w-3.5" />Preview</TabsTrigger><TabsTrigger value="html" className="gap-1.5"><Code2 className="h-3.5 w-3.5" />HTML</TabsTrigger></TabsList></Tabs>
      <div className="flex items-center gap-1"><Button variant="ghost" size="icon" disabled aria-label="Undo"><Undo2 className="h-4 w-4"/></Button><Button variant="ghost" size="icon" disabled aria-label="Redo"><Redo2 className="h-4 w-4"/></Button></div>
    </div>
    <div className="flex-1 overflow-y-auto bg-slate-100 p-8" onClick={(event) => event.stopPropagation()}>
      <div className={cn('mx-auto transition-[max-width] duration-200', width)}>
        {selectedMainTab === 'editor' && <DocumentBlock id="root" />}
        {selectedMainTab === 'preview' && <div className="overflow-hidden bg-white shadow-[0_12px_40px_rgba(15,23,42,.12)]"><Reader document={document as never} rootBlockId="root" /></div>}
        {selectedMainTab === 'html' && <pre className="overflow-x-auto rounded-xl border bg-slate-950 p-5 text-xs leading-6 text-slate-100">{renderToStaticMarkup(document, { rootBlockId: 'root' })}</pre>}
      </div>
    </div>
  </div>;
}
