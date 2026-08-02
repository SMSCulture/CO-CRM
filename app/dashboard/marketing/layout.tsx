"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard/marketing", label: "Dashboard", exact: true },
  { href: "/dashboard/marketing/campaigns", label: "Campaigns" },
  { href: "/dashboard/marketing/templates", label: "Templates" },
  { href: "/dashboard/marketing/links-tracking", label: "Links & Tracking" },
  { href: "/dashboard/marketing/culture-owl-promotion", label: "CultureOwl Promotion" },
] as const;

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marketing</h1>
        <p className="mt-1 text-muted-foreground">Create and manage promotion across CultureOwl and your own channels.</p>
      </div>

      <div className="border-b border-border">
        <nav className="flex flex-wrap gap-1 -mb-px">
          {TABS.map((tab) => {
            const isActive = "exact" in tab && tab.exact ? pathname === tab.href : pathname?.startsWith(tab.href);
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
