"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Pencil, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSegment } from "../hooks/use-segments-data";

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function BarRow({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-co-blue" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function SegmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const segment = useSegment(params.id);

  if (!segment) {
    return (
      <div className="space-y-4">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <p className="text-sm text-muted-foreground">Segment not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Segments
      </button>

      <div>
        <h1 className="text-3xl font-bold text-foreground">{segment.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {segment.contactCount.toLocaleString()} contacts · Updated automatically · Last recalculated: {segment.lastRecalculated}
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Filters</p>
        <div className="flex flex-wrap gap-2">
          {segment.filters.map((filter) => (
            <span key={filter} className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs text-foreground">
              {filter}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/marketing/campaigns">
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Segment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-xl border-border lg:col-span-2">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm font-semibold text-foreground">Audience Summary</p>
            <div className="grid grid-cols-3 gap-4">
              <StatBlock label="Contacts" value={segment.contactCount.toLocaleString()} />
              <StatBlock label="Avg. Spend" value={`$${segment.avgSpend.toLocaleString()}`} />
              <StatBlock label="Avg. Age" value={String(segment.avgAge)} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border">
          <CardContent className="p-6">
            <p className="mb-3 text-sm font-semibold text-foreground">Geography</p>
            <div className="space-y-3">
              {segment.topCities.map((city) => (
                <BarRow key={city.label} label={city.label} pct={city.pct} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border lg:col-span-2">
          <CardContent className="p-6">
            <p className="mb-3 text-sm font-semibold text-foreground">Interests</p>
            <div className="space-y-3">
              {segment.interests.map((interest) => (
                <BarRow key={interest.label} label={interest.label} pct={interest.pct} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border border-dashed">
          <CardContent className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
            Purchase history, engagement, campaigns using this segment, and performance over time will populate once
            this segment is wired to real contact data.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
