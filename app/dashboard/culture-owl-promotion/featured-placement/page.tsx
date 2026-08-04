import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedPlacementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Featured Placement</h2>
        <p className="mt-1 text-muted-foreground">
          CultureOwl-managed — secure priority visibility on discovery pages and curated collections.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">Not built yet.</CardContent>
      </Card>
    </div>
  );
}
