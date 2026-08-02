import { Card, CardContent } from "@/components/ui/card";

export default function CulturalStoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cultural Stories</h1>
        <p className="mt-1 text-muted-foreground">
          CultureOwl-managed editorial coverage — a CRM segment can inform pitch relevance, not a direct send list.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">Not built yet.</CardContent>
      </Card>
    </div>
  );
}
