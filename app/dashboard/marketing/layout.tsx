"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard/marketing", label: "Dashboard", exact: true },
  { href: "/dashboard/marketing/campaigns", label: "Email campaigns" },
  { href: "/dashboard/marketing/templates", label: "Templates" },
  { href: "/dashboard/marketing/social", label: "Social media" },
  { href: "/dashboard/marketing/paid-ads", label: "Paid ads" },
  { href: "/dashboard/culture-owl-promotion", label: "Promotions" },
  { href: "/dashboard/settings/integrations", label: "Integrations" },
] as const;

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="space-y-4"><nav className="-mx-1 flex gap-0 overflow-x-auto border-b px-1" aria-label="Marketing tools"><span className="mr-2 self-center whitespace-nowrap text-xs font-bold uppercase tracking-wider text-muted-foreground">Marketing</span>{TABS.map((tab) => { const active = "exact" in tab && tab.exact ? pathname === tab.href : pathname?.startsWith(tab.href); return <Link key={tab.href} href={tab.href} className={cn("whitespace-nowrap border-b-2 px-2.5 py-2.5 text-xs font-medium", active ? "border-co-blue text-co-blue" : "border-transparent text-muted-foreground hover:text-foreground")}>{tab.label}</Link>; })}</nav>{children}</div>;
}
