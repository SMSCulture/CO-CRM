import { Card, CardContent } from "@/components/ui/card";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
        <p className="mt-1 text-muted-foreground">
          Not built yet — see the Tags module for the working end-to-end pattern this will follow.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">
          This module needs the real GraphQL schema (contact/patron entity) confirmed before it can be wired up.
        </CardContent>
      </Card>
    </div>
  );
}
