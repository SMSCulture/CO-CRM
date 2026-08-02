"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard/marketing/campaigns", label: "Campaigns" },
  { href: "/dashboard/marketing/escoops", label: "Email & eScoops" },
  { href: "/dashboard/marketing/social", label: "Social" },
  { href: "/dashboard/marketing/banners", label: "Banners & Featured" },
  { href: "/dashboard/marketing/cultural-stories", label: "Cultural Stories" },
  { href: "/dashboard/marketing/links-tracking", label: "Links & Tracking" },
  { href: "/dashboard/marketing/templates", label: "Templates" },
] as const;

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marketing</h1>
        <p className="mt-1 text-muted-foreground">Create and manage promotion across CultureOwl and your own channels.</p>
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Campaigns</span> and{" "}
          <span className="font-semibold text-foreground">Templates</span> send directly to your own contact list.
          Everything else here is a CultureOwl-managed channel — your audience is used as a targeting brief, not a
          direct send list.
        </p>
      </div>

      <div className="border-b border-border">
        <nav className="flex flex-wrap gap-1 -mb-px">
          {TABS.map((tab) => {
            const isActive = pathname?.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-co-blue text-co-blue"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </div>
  );
}
