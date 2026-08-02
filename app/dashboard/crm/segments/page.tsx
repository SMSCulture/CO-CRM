"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSegmentsData } from "./hooks/use-segments-data";
import { SegmentCard } from "./components/segment-card";
import { SegmentBuilderDrawer } from "./components/segment-builder-drawer";

export default function SegmentsPage() {
  const { segments, addSegment } = useSegmentsData();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Segments</h2>
          <p className="mt-1 text-muted-foreground">Saved, reusable filters over your contacts.</p>
        </div>
        <Button className="gap-2" onClick={() => setDrawerOpen(true)}>
          <Plus className="h-4 w-4" />
          New Segment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {segments.map((segment) => (
          <SegmentCard key={segment.id} segment={segment} />
        ))}
      </div>

      <SegmentBuilderDrawer open={drawerOpen} onOpenChange={setDrawerOpen} onCreate={addSegment} />
    </div>
  );
}
