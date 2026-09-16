"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard/marketing", label: "Marketing", exact: true },
  { href: "/dashboard/marketing/campaigns", label: "Campaigns" },
  { href: "/dashboard/marketing/templates", label: "Email builder" },
  { href: "/dashboard/marketing/sms", label: "SMS" },
  { href: "/dashboard/marketing/links-tracking", label: "Tracking" },
] as const;

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="space-y-5">
    <nav className="-mx-1 flex gap-1 overflow-x-auto border-b px-1" aria-label="Marketing"><span className="mr-3 self-center whitespace-nowrap text-sm font-bold">Engagement</span>{TABS.map((tab) => { const active = "exact" in tab && tab.exact ? pathname === tab.href : pathname?.startsWith(tab.href); return <Link key={tab.href} href={tab.href} className={cn("whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium", active ? "border-co-blue text-co-blue" : "border-transparent text-muted-foreground hover:text-foreground")}>{tab.label}</Link>; })}</nav>
    {children}
  </div>;
}
