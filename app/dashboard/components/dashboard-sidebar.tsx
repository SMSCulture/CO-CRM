"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Users,
  Megaphone,
  Workflow,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/events", label: "Events", icon: CalendarDays },
  { href: "/dashboard/ticketing", label: "Ticketing", icon: Ticket },
  { href: "/dashboard/crm", label: "CRM", icon: Users },
  { href: "/dashboard/workflows", label: "Workflows", icon: Workflow },
  { href: "/dashboard/marketing", label: "Your Marketing", icon: Megaphone },
  { href: "/dashboard/culture-owl-promotion", label: "CultureOwl Promotion", icon: Sparkles },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-co-blue text-sm font-bold text-white">
          CO
        </div>
        <span className="font-display text-base font-bold text-sidebar-foreground">CO CRM</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-co-blue/15 text-xs font-bold text-co-blue">
            {user?.email?.slice(0, 2).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-sidebar-foreground">{user?.email ?? "—"}</p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">
              {user?.role?.displayName ?? user?.role?.name ?? ""}
            </p>
          </div>
          <button
            onClick={() => logout()}
            className="rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
