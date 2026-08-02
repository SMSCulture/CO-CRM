"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Filter,
  Tag,
  Mail,
  FileText,
  Newspaper,
  Share2,
  Image as ImageIcon,
  BookOpen,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const STANDALONE_ITEMS = [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] as const;

const NAV_GROUPS = [
  {
    label: "CRM",
    items: [
      { href: "/dashboard/contacts", label: "Contacts", icon: Users },
      { href: "/dashboard/segments", label: "Segments", icon: Filter },
      { href: "/dashboard/tags", label: "Tags", icon: Tag },
    ],
  },
  {
    label: "Your Marketing",
    items: [
      { href: "/dashboard/campaigns", label: "Email Campaigns", icon: Mail },
      { href: "/dashboard/templates", label: "Templates", icon: FileText },
    ],
  },
  {
    label: "CultureOwl Promotion",
    items: [
      { href: "/dashboard/escoops", label: "eScoops", icon: Newspaper },
      { href: "/dashboard/social", label: "Social", icon: Share2 },
      { href: "/dashboard/banners", label: "Banners", icon: ImageIcon },
      { href: "/dashboard/cultural-stories", label: "Cultural Stories", icon: BookOpen },
    ],
  },
] as const;

const TRAILING_ITEMS = [{ href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 }] as const;

function NavLink({ href, label, icon: Icon, pathname }: { href: string; label: string; icon: typeof LayoutDashboard; pathname: string | null }) {
  const isActive = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

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

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-2">
        <div className="space-y-1">
          {STANDALONE_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} />
          ))}
        </div>

        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/40">
              {group.label}
            </p>
            {group.items.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}
          </div>
        ))}

        <div className="space-y-1">
          {TRAILING_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} />
          ))}
        </div>
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
