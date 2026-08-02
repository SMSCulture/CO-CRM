import { Card, CardContent } from "@/components/ui/card";

export default function DataPropertiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Data & Properties</h2>
        <p className="mt-1 text-muted-foreground">
          Custom contact fields, import/export sources, duplicate detection, and consent/suppression lists.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">
          Not built yet. Custom Properties, Import, and Export already live as buttons on the Contacts tab —
          this page will bring duplicate detection, consent tracking, and suppression lists in later.
        </CardContent>
      </Card>
    </div>
  );
}
