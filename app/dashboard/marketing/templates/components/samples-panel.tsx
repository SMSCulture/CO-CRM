'use client';

import { Heading, Image, LayoutGrid, Minus, MousePointerClick, Rows3, Space, Type } from 'lucide-react';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { SAMPLE_TEMPLATES } from '../lib/sample-templates';
import { BlockPickerMenu } from './block-picker-menu';

const CONTENT = [
  { label: 'Text', icon: Type }, { label: 'Heading', icon: Heading }, { label: 'Image', icon: Image },
  { label: 'Button', icon: MousePointerClick }, { label: 'Divider', icon: Minus }, { label: 'Spacer', icon: Space },
];

export function SamplesPanel({ embedded = false }: { embedded?: boolean }) {
  const resetDocument = useEmailTemplateBuilderStore((s) => s.resetDocument);
  return <aside className={embedded ? "flex min-h-full flex-col bg-white" : "flex h-full w-64 shrink-0 flex-col border-r bg-white"}>
    <div className="border-b px-4 py-4"><p className="text-sm font-semibold">Build your email</p><p className="mt-1 text-xs text-muted-foreground">Add content or switch layout.</p></div>
    <div className="flex-1 space-y-6 overflow-y-auto p-4">
      <section><div className="mb-3 flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Content</p><BlockPickerMenu compact /></div><div className="grid grid-cols-2 gap-2">{CONTENT.map(({ label, icon: Icon }) => <div key={label} className="flex flex-col items-center gap-2 rounded-lg border bg-slate-50 px-2 py-3 text-xs font-medium text-slate-700"><Icon className="h-4 w-4 text-co-blue" />{label}</div>)}</div></section>
      <section><p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Layouts</p><div className="grid grid-cols-3 gap-2">{[1,2,3].map((columns) => <div key={columns} className="flex h-12 items-center gap-1 rounded-lg border bg-slate-50 p-2">{Array.from({ length: columns }).map((_, i) => <span key={i} className="h-full flex-1 rounded-sm bg-slate-300" />)}</div>)}</div></section>
      <section><p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Templates</p><div className="space-y-2">{SAMPLE_TEMPLATES.map((sample, index) => <button key={sample.id} onClick={() => resetDocument(sample.document)} className="flex w-full items-center gap-3 rounded-lg border p-3 text-left hover:border-co-blue/50 hover:bg-blue-50/30"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-co-blue">{index ? <LayoutGrid className="h-4 w-4"/> : <Rows3 className="h-4 w-4"/>}</span><span><span className="block text-sm font-semibold">{sample.label}</span><span className="text-[11px] text-muted-foreground">Use this design</span></span></button>)}</div></section>
    </div>
    <p className="border-t bg-amber-50 px-4 py-3 text-[11px] leading-4 text-amber-900">Prototype editor. HTML preview is real; backend save is not connected.</p>
  </aside>;
}
