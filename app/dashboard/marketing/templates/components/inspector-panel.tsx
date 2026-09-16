import { Palette, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { StylePanel } from './style-panel';
import { BlockConfigurationPanel } from './block-configuration-panel';

export function InspectorPanel() {
  const selectedSidebarTab = useEmailTemplateBuilderStore((s) => s.selectedSidebarTab);
  const setSelectedSidebarTab = useEmailTemplateBuilderStore((s) => s.setSelectedSidebarTab);
  const selectedBlockId = useEmailTemplateBuilderStore((s) => s.selectedBlockId);
  return <aside className="hidden h-full w-80 shrink-0 overflow-y-auto border-l bg-white xl:block"><div className="border-b px-4 py-4"><p className="flex items-center gap-2 text-sm font-semibold">{selectedBlockId ? <SlidersHorizontal className="h-4 w-4 text-co-blue" /> : <Palette className="h-4 w-4 text-co-blue" />}{selectedBlockId ? 'Content properties' : 'Email styles'}</p><p className="mt-1 text-xs text-muted-foreground">{selectedBlockId ? 'Edit the selected block.' : 'Set defaults across the whole email.'}</p></div><div className="p-4"><Tabs value={selectedSidebarTab} onValueChange={(value) => setSelectedSidebarTab(value as never)}><TabsList className="w-full"><TabsTrigger value="block-configuration" className="flex-1">Content</TabsTrigger><TabsTrigger value="styles" className="flex-1">Design</TabsTrigger></TabsList><TabsContent value="styles" className="mt-5"><StylePanel /></TabsContent><TabsContent value="block-configuration" className="mt-5">{selectedBlockId ? <BlockConfigurationPanel /> : <div className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">Select content on the canvas to edit it.</div>}</TabsContent></Tabs></div></aside>;
}
