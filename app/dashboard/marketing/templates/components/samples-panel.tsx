import { FileText, LayoutTemplate } from 'lucide-react';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { SAMPLE_TEMPLATES } from '../lib/sample-templates';

export function SamplesPanel() {
  const resetDocument = useEmailTemplateBuilderStore((s) => s.resetDocument);
  return <div className="flex h-full w-56 shrink-0 flex-col border-r bg-slate-50/80 p-3"><div className="mb-4 px-2"><p className="text-xs font-bold uppercase tracking-[.14em] text-co-blue">Starting points</p><p className="mt-1 text-xs text-muted-foreground">Replace the canvas with a sample.</p></div><div className="space-y-2">{SAMPLE_TEMPLATES.map((sample, index) => <button key={sample.id} onClick={() => resetDocument(sample.document)} className="group w-full rounded-xl border bg-white p-3 text-left transition-all hover:border-co-blue/40 hover:shadow-sm"><span className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-slate-100"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-co-blue shadow-sm">{index === 0 ? <FileText className="h-5 w-5" /> : <LayoutTemplate className="h-5 w-5" />}</span></span><span className="mt-2 block text-sm font-semibold group-hover:text-co-blue">{sample.label}</span><span className="text-[11px] text-muted-foreground">Email template</span></button>)}</div><p className="mt-auto rounded-lg bg-blue-50 p-2 text-[11px] leading-4 text-blue-900">Template persistence is still a BFF stub. Exported HTML is real; backend save is not.</p></div>;
}
