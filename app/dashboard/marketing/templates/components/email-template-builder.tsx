'use client';

import { useState } from 'react';
import { Check, ChevronLeft, Monitor, MoreHorizontal, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SamplesPanel } from './samples-panel';
import { CanvasPanel } from './canvas-panel';
import { InspectorPanel } from './inspector-panel';

export type PreviewWidth = 'desktop' | 'tablet' | 'mobile';
export function EmailTemplateBuilder() {
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>('desktop');
  const [name, setName] = useState('Untitled template');
  return <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(15,23,42,.04)]">
    <div className="flex min-h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Back to templates"><ChevronLeft className="h-4 w-4" /></Button><div><Input value={name} onChange={(event) => setName(event.target.value)} aria-label="Template name" className="h-7 w-64 border-0 px-1 text-sm font-semibold shadow-none focus-visible:ring-1" /><p className="flex items-center gap-1 px-1 text-xs text-muted-foreground"><Check className="h-3 w-3 text-emerald-600" />Changes saved locally</p></div></div>
      <div className="flex rounded-lg bg-slate-100 p-1"><WidthButton active={previewWidth === 'desktop'} label="Desktop" onClick={() => setPreviewWidth('desktop')}><Monitor className="h-4 w-4" /></WidthButton><WidthButton active={previewWidth === 'tablet'} label="Tablet" onClick={() => setPreviewWidth('tablet')}><Tablet className="h-4 w-4" /></WidthButton><WidthButton active={previewWidth === 'mobile'} label="Mobile" onClick={() => setPreviewWidth('mobile')}><Smartphone className="h-4 w-4" /></WidthButton></div>
      <Button variant="ghost" size="icon" aria-label="More template actions"><MoreHorizontal className="h-4 w-4" /></Button>
    </div>
    <div className="flex h-[calc(100vh-14rem)] min-h-[620px] overflow-hidden"><SamplesPanel /><CanvasPanel previewWidth={previewWidth} /><InspectorPanel /></div>
  </div>;
}
function WidthButton({ active, label, onClick, children }: { active: boolean; label: string; onClick: () => void; children: React.ReactNode }) { return <button onClick={onClick} aria-label={`${label} preview`} aria-pressed={active} className={`rounded-md p-2 transition-colors ${active ? 'bg-white text-co-blue shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{children}</button>; }
