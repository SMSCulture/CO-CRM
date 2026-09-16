'use client';

import { useState } from 'react';
import { Check, ChevronLeft, Eye, Monitor, MoreHorizontal, Send, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SamplesPanel } from './samples-panel';
import { CanvasPanel } from './canvas-panel';
import { InspectorPanel } from './inspector-panel';

export type PreviewWidth = 'desktop' | 'mobile';
export function EmailTemplateBuilder() {
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>('desktop');
  const [name, setName] = useState('Season announcement');
  return <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
    <div className="flex min-h-16 items-center justify-between gap-4 border-b px-4">
      <div className="flex min-w-0 items-center gap-3"><Button variant="ghost" size="icon" aria-label="Back to templates"><ChevronLeft className="h-4 w-4" /></Button><div className="min-w-0"><Input value={name} onChange={(event) => setName(event.target.value)} aria-label="Template name" className="h-7 w-64 max-w-full border-0 px-1 text-sm font-semibold shadow-none focus-visible:ring-1" /><p className="flex items-center gap-1 px-1 text-xs text-muted-foreground"><Check className="h-3 w-3 text-emerald-600" />Saved locally · Prototype</p></div></div>
      <div className="hidden rounded-lg border bg-slate-50 p-1 sm:flex"><WidthButton active={previewWidth === 'desktop'} label="Desktop" onClick={() => setPreviewWidth('desktop')}><Monitor className="h-4 w-4" /></WidthButton><WidthButton active={previewWidth === 'mobile'} label="Mobile" onClick={() => setPreviewWidth('mobile')}><Smartphone className="h-4 w-4" /></WidthButton></div>
      <div className="flex items-center gap-2"><Button variant="outline" size="sm" className="hidden gap-1.5 lg:flex"><Eye className="h-4 w-4"/>Preview & test</Button><Button size="sm" className="gap-1.5"><Send className="h-4 w-4"/>Use template</Button><Button variant="ghost" size="icon" aria-label="More template actions"><MoreHorizontal className="h-4 w-4" /></Button></div>
    </div>
    <div className="flex h-[calc(100vh-12rem)] min-h-[660px] overflow-hidden"><SamplesPanel /><CanvasPanel previewWidth={previewWidth} /><InspectorPanel /></div>
  </div>;
}
function WidthButton({ active, label, onClick, children }: { active: boolean; label: string; onClick: () => void; children: React.ReactNode }) { return <button onClick={onClick} aria-label={`${label} preview`} aria-pressed={active} className={`rounded-md px-3 py-1.5 transition-colors ${active ? 'bg-white text-co-blue shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{children}</button>; }
