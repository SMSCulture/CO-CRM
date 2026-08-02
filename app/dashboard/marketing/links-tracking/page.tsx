"use client";

import { useState } from "react";
import { useTrackingPixels, type PixelType } from "./hooks/use-tracking-pixels";
import { PixelTypeGrid } from "./components/pixel-type-grid";
import { AddPixelDialog } from "./components/add-pixel-dialog";
import { TrackingPixelsTable } from "./components/tracking-pixels-table";

export default function LinksTrackingPage() {
  const { pixels, addPixel, removePixel } = useTrackingPixels();
  const [activePixelType, setActivePixelType] = useState<PixelType | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Tracking Pixels</h2>
        <p className="mt-1 text-muted-foreground">
          Tracking pixels can help you measure the impact of your marketing, advertising, and analytics.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Supported Tracking Pixels</h3>
        <PixelTypeGrid onSelect={setActivePixelType} />
      </div>

      <TrackingPixelsTable pixels={pixels} onRemove={removePixel} />

      <AddPixelDialog
        pixelType={activePixelType}
        onClose={() => setActivePixelType(null)}
        onSave={(input) => {
          if (!activePixelType) return;
          addPixel({ pixelTypeId: activePixelType.id, ...input });
          setActivePixelType(null);
        }}
      />
    </div>
  );
}
