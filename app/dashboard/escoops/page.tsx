import { Card, CardContent } from "@/components/ui/card";

export default function EscoopsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">eScoops</h1>
        <p className="mt-1 text-muted-foreground">
          CultureOwl-managed email blasts — a CRM segment is used as a targeting brief, not a direct send list.
          CultureOwl may extend reach to its broader matching network.
        </p>
      </div>
      <Card className="rounded-xl border-border border-dashed">
        <CardContent className="p-10 text-center text-sm text-muted-foreground">
          Not built yet — reuse cultureowl_front&apos;s existing escoop-entries data once wired to real GraphQL.
        </CardContent>
      </Card>
    </div>
  );
}
