import { Card, CardContent } from "@/components/ui/card";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
        <p className="mt-1 text-muted-foreground">
          Not built yet — should reuse cultureowl_front&apos;s existing Novel/Tiptap escoop and dedicated-email builder
          components rather than a new rich-text implementation.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">
          Reference: cultureowl_front&apos;s <code className="rounded bg-muted px-1 py-0.5">components/ui/novel-editor/</code>
          and the escoop/dedicated builder stores.
        </CardContent>
      </Card>
    </div>
  );
}
