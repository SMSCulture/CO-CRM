import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Segment } from "../hooks/use-segments-data";

export function SegmentCard({ segment }: { segment: Segment }) {
  return (
    <Link href={`/dashboard/segments/${segment.id}`}>
      <Card className="rounded-xl border-border transition-colors hover:border-co-blue/40">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="font-semibold text-foreground">{segment.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{segment.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {segment.contactCount.toLocaleString()} contacts · Updated {segment.lastRecalculated}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}
