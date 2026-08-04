import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEmailTemplateBuilderStore } from '@/store/email-template-builder-store';
import { StylePanel } from './style-panel';
import { BlockConfigurationPanel } from './block-configuration-panel';

export function InspectorPanel() {
  const selectedSidebarTab = useEmailTemplateBuilderStore((s) => s.selectedSidebarTab);
  const setSelectedSidebarTab = useEmailTemplateBuilderStore((s) => s.setSelectedSidebarTab);

  return (
    <div className="h-full w-80 shrink-0 overflow-y-auto border-l border-border bg-background p-4">
      <Tabs value={selectedSidebarTab} onValueChange={(v) => setSelectedSidebarTab(v as never)}>
        <TabsList className="w-full">
          <TabsTrigger value="styles" className="flex-1">
            Styles
          </TabsTrigger>
          <TabsTrigger value="block-configuration" className="flex-1">
            Block
          </TabsTrigger>
        </TabsList>
        <TabsContent value="styles" className="mt-4">
          <StylePanel />
        </TabsContent>
        <TabsContent value="block-configuration" className="mt-4">
          <BlockConfigurationPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
