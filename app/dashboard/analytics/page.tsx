import { Card, CardContent } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Not built yet. Banners and eScoops analytics likely reuse cultureowl_front&apos;s existing
          <code className="mx-1 rounded bg-muted px-1 py-0.5">lib/graphql/*</code>
          queries almost directly since those modules already exist there — start with those two.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">
          Recharts is already installed and configured to match cultureowl_front&apos;s chart styling.
        </CardContent>
      </Card>
    </div>
  );
}
