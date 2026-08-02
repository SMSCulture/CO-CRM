import { Card, CardContent } from "@/components/ui/card";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Events</h1>
        <p className="mt-1 text-muted-foreground">Your event listings and programming calendar.</p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">Not built yet.</CardContent>
      </Card>
    </div>
  );
}
