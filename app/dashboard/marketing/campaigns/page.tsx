"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CampaignBuilder } from "./components/campaign-builder";

function CampaignsPageContent() {
  const searchParams = useSearchParams();
  // Segment→campaign handoff: a segment's "Create Campaign" button
  // (app/dashboard/crm/segments/[id]/page.tsx) links here with ?segment=<id>,
  // so the builder opens straight into Step 1 with that audience preselected.
  const segmentFromQuery = searchParams.get("segment") ?? undefined;
  const [showBuilder, setShowBuilder] = useState(Boolean(segmentFromQuery));

  if (showBuilder) {
    return <CampaignBuilder onCancel={() => setShowBuilder(false)} initialSegmentId={segmentFromQuery} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Campaigns</h2>
          <p className="mt-1 text-muted-foreground">Sends directly to your own contacts.</p>
        </div>
        <Button className="gap-2" onClick={() => setShowBuilder(true)}>
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="flex flex-col items-center gap-2 p-10 text-center text-sm text-muted-foreground">
          <Mail className="h-8 w-8 text-muted-foreground/50" />
          No campaigns yet. Click &quot;New Campaign&quot; to build one.
        </CardContent>
      </Card>
    </div>
  );
}

export default function CampaignsPage() {
  return (
    <Suspense fallback={null}>
      <CampaignsPageContent />
    </Suspense>
  );
}
