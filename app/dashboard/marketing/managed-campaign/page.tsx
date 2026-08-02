import { Card, CardContent } from "@/components/ui/card";

export default function ManagedCampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Managed Promotional Campaign</h2>
        <p className="mt-1 text-muted-foreground">
          CultureOwl-managed — a bundled campaign across eScoops, social, banners, and featured placement,
          coordinated by CultureOwl on your behalf.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">Not built yet.</CardContent>
      </Card>
    </div>
  );
}
