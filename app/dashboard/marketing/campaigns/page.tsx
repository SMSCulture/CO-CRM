import { Card, CardContent } from "@/components/ui/card";

// TODO: real segment→campaign handoff. When a segment's "Create Campaign"
// button (app/dashboard/crm/segments/[id]/page.tsx) links here, it should
// carry the segment id (query param or a shared store slice) so this page
// opens with that audience pre-selected instead of starting from scratch.
// Not wired up yet — deferred per the CRM/Marketing IA plan.
export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Campaigns</h2>
        <p className="mt-1 text-muted-foreground">
          Sends directly to your own contacts. Not built yet — should reuse cultureowl_front&apos;s existing
          Novel/Tiptap escoop and dedicated-email builder components rather than a new rich-text implementation.
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
