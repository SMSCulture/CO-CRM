import { create } from 'zustand';
import type { TReaderDocument } from '@usewaypoint/email-builder';
import { BLANK_TEMPLATE } from '@/app/dashboard/marketing/templates/lib/sample-templates';

export type SidebarTab = 'block-configuration' | 'styles';
export type MainTab = 'editor' | 'preview' | 'json' | 'html';

interface EmailTemplateBuilderState {
  document: TReaderDocument;
  selectedBlockId: string | null;
  selectedSidebarTab: SidebarTab;
  selectedMainTab: MainTab;
  setDocument: (patch: TReaderDocument) => void;
  resetDocument: (document: TReaderDocument) => void;
  setSelectedBlockId: (blockId: string | null) => void;
  setSelectedSidebarTab: (tab: SidebarTab) => void;
  setSelectedMainTab: (tab: MainTab) => void;
}

// Ported from usewaypoint/email-builder-js's demo EditorContext.tsx (Zustand
// store, same as this repo already mandates) — selecting a block always
// jumps the inspector to the block-configuration tab, deselecting falls
// back to the global styles tab.
export const useEmailTemplateBuilderStore = create<EmailTemplateBuilderState>()((set, get) => ({
  document: BLANK_TEMPLATE,
  selectedBlockId: null,
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',

  setDocument: (patch) => {
    set({ document: { ...get().document, ...patch } });
  },
  resetDocument: (document) => {
    set({ document, selectedBlockId: null, selectedSidebarTab: 'styles' });
  },
  setSelectedBlockId: (blockId) => {
    set({
      selectedBlockId: blockId,
      selectedSidebarTab: blockId === null ? 'styles' : 'block-configuration',
    });
  },
  setSelectedSidebarTab: (tab) => set({ selectedSidebarTab: tab }),
  setSelectedMainTab: (tab) => set({ selectedMainTab: tab }),
}));
