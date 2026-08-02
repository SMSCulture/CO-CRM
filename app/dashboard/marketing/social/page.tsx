import { Card, CardContent } from "@/components/ui/card";

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Social</h2>
        <p className="mt-1 text-muted-foreground">
          CultureOwl-managed social promotion — a CRM segment is used as a targeting brief, not a direct send list.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">Not built yet.</CardContent>
      </Card>
    </div>
  );
}
