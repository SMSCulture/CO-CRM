"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard/crm/contacts", label: "Contacts" },
  { href: "/dashboard/crm/segments", label: "Segments" },
  { href: "/dashboard/crm/tags", label: "Tags" },
  { href: "/dashboard/crm/data-properties", label: "Data & Properties" },
] as const;

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">CRM</h1>
        <p className="mt-1 text-muted-foreground">Manage contacts, audience segments, and relationships.</p>
      </div>

      <div className="border-b border-border">
        <nav className="flex gap-1 -mb-px">
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
