'use client';

import { SamplesPanel } from './samples-panel';
import { CanvasPanel } from './canvas-panel';
import { InspectorPanel } from './inspector-panel';

export function EmailTemplateBuilder() {
  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-lg border border-border">
      <SamplesPanel />
      <CanvasPanel />
      <InspectorPanel />
    </div>
  );
}
