"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { INTEGRATION_APPS, INTEGRATION_CATEGORY_LABELS, INTEGRATION_CATEGORY_ORDER } from "@/lib/data/integrations";
import { AppCard } from "./components/app-card";

export default function IntegrationsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return INTEGRATION_APPS.filter(
      (app) => q === "" || app.name.toLowerCase().includes(q) || app.description.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof INTEGRATION_APPS> = {};
    for (const category of INTEGRATION_CATEGORY_ORDER) {
      groups[category] = filtered.filter((app) => app.category === category);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Integrations</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Connect apps to extend your marketing and CRM reach.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search apps" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="space-y-8">
        {INTEGRATION_CATEGORY_ORDER.map((category) => {
          const apps = grouped[category];
          if (!apps || apps.length === 0) return null;
          return (
            <section key={category}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{INTEGRATION_CATEGORY_LABELS[category]}</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {apps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          );
        })}
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No apps found matching your search.</p>}
      </div>
    </div>
  );
}
