import { Card, CardContent } from "@/components/ui/card";
import { Users, Filter, Mail, Tag } from "lucide-react";

const PLACEHOLDER_METRICS = [
  { label: "Total Contacts", value: "—", icon: Users },
  { label: "Active Segments", value: "—", icon: Filter },
  { label: "Campaigns Sent", value: "—", icon: Mail },
  { label: "Tags in Use", value: "—", icon: Tag },
] as const;

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Overview of your contacts, segments, and campaign performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_METRICS.map((metric) => (
          <Card key={metric.label} className="rounded-xl border-border">
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-co-blue/10 text-co-blue">
                  <metric.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl border-border">
        <CardContent className="p-6 text-sm text-muted-foreground">
          These KPIs will populate once the Contacts, Segments, and Campaigns modules are wired to real
          GraphQL queries against the CultureOwl backend — see the{" "}
          <a href="/dashboard/crm/tags" className="font-medium text-co-blue hover:underline">
            Tags module
          </a>{" "}
          for a fully working example of the pattern.
        </CardContent>
      </Card>
    </div>
  );
}
