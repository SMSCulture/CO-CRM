import { Card, CardContent } from "@/components/ui/card";

export default function SegmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Segments</h1>
        <p className="mt-1 text-muted-foreground">
          Not built yet — depends on the Contacts module existing first (segments are saved filters over contacts).
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">
          Build Contacts before Segments — the filter builder needs real contact fields to filter on.
        </CardContent>
      </Card>
    </div>
  );
}
