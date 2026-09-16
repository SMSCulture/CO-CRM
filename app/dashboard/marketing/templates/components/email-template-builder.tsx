'use client';

import { useState } from 'react';
import { ArrowLeft, Check, Eye, LayoutPanelLeft, LayoutTemplate, Mail, MoreHorizontal, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SamplesPanel } from './samples-panel';
import { CanvasPanel } from './canvas-panel';
import { StylePanel } from './style-panel';
import { BlockConfigurationPanel } from './block-configuration-panel';
import { SAMPLE_TEMPLATES } from '../lib/sample-templates';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { cn } from '@/lib/utils';

export type PreviewWidth = 'desktop' | 'mobile';

export function EmailTemplateBuilder() {
  const [editing, setEditing] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>('desktop');
  const [railOpen, setRailOpen] = useState(true);
  const [name, setName] = useState('Season announcement');
  const resetDocument = useEmailTemplateBuilderStore((state) => state.resetDocument);
  const selectedBlockId = useEmailTemplateBuilderStore((state) => state.selectedBlockId);

  function openTemplate(index: number) {
    resetDocument(SAMPLE_TEMPLATES[index].document);
    setName(index ? 'Welcome campaign' : 'Untitled campaign');
    setEditing(true);
  }

  if (!editing) return <TemplateLibrary onOpen={openTemplate} />;

  return <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
    <div className="flex min-h-16 items-center justify-between gap-4 border-b px-4">
      <div className="flex min-w-0 items-center gap-3"><Button variant="ghost" size="icon" aria-label="Back to campaign library" onClick={() => setEditing(false)}><ArrowLeft className="h-4 w-4" /></Button><div><p className="text-xs text-muted-foreground">Email campaigns <span className="px-1">›</span> Design</p><p className="flex items-center gap-1 text-xs text-muted-foreground"><Check className="h-3 w-3 text-emerald-600" />Saved locally · Prototype</p></div></div>
      <div className="flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Toggle settings panel" onClick={() => setRailOpen((open) => !open)}><LayoutPanelLeft className="h-4 w-4"/></Button><Button variant="outline" size="sm" className="hidden gap-1.5 lg:flex"><Eye className="h-4 w-4"/>Send test email</Button><Button size="sm" className="gap-1.5"><Send className="h-4 w-4"/>Continue</Button><Button variant="ghost" size="icon" aria-label="More campaign actions"><MoreHorizontal className="h-4 w-4" /></Button></div>
    </div>
    <div className="flex h-[calc(100vh-12rem)] min-h-[660px] overflow-hidden">
      <aside className={cn("shrink-0 overflow-y-auto border-r bg-white transition-[width]", railOpen ? "w-[340px]" : "w-0 border-r-0")}>
        <Tabs defaultValue="info" className="h-full">
          <TabsList className="grid h-14 w-full grid-cols-3 rounded-none border-b bg-white p-0"><TabsTrigger value="info" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-co-blue data-[state=active]:shadow-none">Basic info</TabsTrigger><TabsTrigger value="content" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-co-blue data-[state=active]:shadow-none">Content</TabsTrigger><TabsTrigger value="style" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-co-blue data-[state=active]:shadow-none">Style</TabsTrigger></TabsList>
          <TabsContent value="info" className="m-0 space-y-6 p-6"><section className="space-y-4"><h2 className="text-xl font-bold">Campaign information</h2><Field label="Campaign name" value={name} onChange={setName}/><Field label="From" value="CultureOwl Arts"/><Field label="Reply-to email address" value="hello@cultureowl.com" type="email"/></section><section className="space-y-4"><h2 className="text-xl font-bold">Footer</h2><p className="text-sm text-muted-foreground">Add accurate organizer details to improve delivery and meet email requirements.</p><Field label="Organizer name" value="CultureOwl Arts"/><Field label="Address" value="123 Arts Avenue"/></section></TabsContent>
          <TabsContent value="content" className="m-0">{selectedBlockId ? <div className="p-5"><Button variant="ghost" size="sm" className="mb-3" onClick={() => useEmailTemplateBuilderStore.getState().setSelectedBlockId(null)}><ArrowLeft className="mr-1 h-4 w-4"/>All content</Button><BlockConfigurationPanel /></div> : <SamplesPanel embedded />}</TabsContent>
          <TabsContent value="style" className="m-0 p-6"><StylePanel /></TabsContent>
        </Tabs>
      </aside>
      <div className="min-w-0 flex-1 bg-slate-100"><div className="px-8 pt-6"><Input value={name} onChange={(event) => setName(event.target.value)} aria-label="Campaign name" className="w-72 border-0 bg-transparent px-0 text-sm font-semibold shadow-none" /></div><CanvasPanel previewWidth={previewWidth} onPreviewWidthChange={setPreviewWidth} /></div>
    </div>
  </div>;
}

function TemplateLibrary({ onOpen }: { onOpen: (index: number) => void }) {
  return <div className="space-y-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-bold">Email campaigns</h2><p className="mt-1 text-sm text-muted-foreground">Choose a starting point before opening the builder.</p></div><Button onClick={() => onOpen(0)}><Plus className="mr-2 h-4 w-4"/>Start blank</Button></div><div className="flex gap-1 border-b"><button className="border-b-2 border-co-blue px-4 py-3 text-sm font-semibold text-co-blue">Templates</button><button className="px-4 py-3 text-sm font-medium text-muted-foreground">Recent campaigns</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><TemplateCard title="Blank campaign" description="Build from a clean canvas" icon={<Plus className="h-7 w-7"/>} onClick={() => onOpen(0)}/><TemplateCard title="Welcome email" description="Introduce patrons to your organization" icon={<Mail className="h-7 w-7"/>} onClick={() => onOpen(1)}/><TemplateCard title="Event announcement" description="Share an event and registration CTA" icon={<LayoutTemplate className="h-7 w-7"/>} onClick={() => onOpen(1)}/></div><p className="text-xs text-muted-foreground">Starter designs are prototype templates. Campaign sending remains disabled until provider preflight and consent checks are connected.</p></div>;
}
function TemplateCard({ title, description, icon, onClick }: { title: string; description: string; icon: React.ReactNode; onClick: () => void }) { return <button onClick={onClick} className="group overflow-hidden rounded-xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-co-blue hover:shadow-md"><div className="grid h-44 place-items-center bg-slate-100 text-co-blue"><div className="grid h-20 w-28 place-items-center rounded-md border bg-white shadow-sm">{icon}</div></div><div className="p-4"><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-muted-foreground">{description}</p></div></button>; }
function Field({ label, value, onChange, type='text' }: { label: string; value: string; onChange?: (value: string) => void; type?: string }) { return <div className="space-y-1.5"><Label>{label}<span className="text-red-500"> *</span></Label><Input type={type} value={value} onChange={(event) => onChange?.(event.target.value)} readOnly={!onChange && false}/></div>; }
