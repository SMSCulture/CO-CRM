import Link from "next/link";
import type { IntegrationApp } from "@/lib/data/integrations";
import { AppIcon } from "./app-icon";

export function AppCard({ app }: { app: IntegrationApp }) {
  return (
    <Link
      href={`/dashboard/settings/integrations/${app.id}`}
      className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-co-blue/40 hover:shadow-sm"
    >
      <AppIcon logo={app.logo} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold leading-tight text-foreground">{app.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{app.description}</p>
      </div>
    </Link>
  );
}
