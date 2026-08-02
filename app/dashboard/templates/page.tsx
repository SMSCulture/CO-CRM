import { Card, CardContent } from "@/components/ui/card";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Templates</h1>
        <p className="mt-1 text-muted-foreground">
          Reusable email templates for Your Marketing campaigns — sent to your own contacts.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">Not built yet.</CardContent>
      </Card>
    </div>
  );
}
