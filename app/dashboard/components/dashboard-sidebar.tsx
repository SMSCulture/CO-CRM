'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, GitBranch, Home, LogOut, Megaphone, Settings, Sparkles, UsersRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: Home, exact: true },
  { href: '/dashboard/crm', label: 'Audience', icon: UsersRound },
  { href: '/dashboard/marketing', label: 'Engagement', icon: Megaphone },
  { href: '/dashboard/culture-owl-promotion', label: 'Promotion', icon: Sparkles },
  { href: '/dashboard/analytics', label: 'Insights', icon: BarChart3 },
  { href: '/dashboard/workflows', label: 'Automations', icon: GitBranch },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <Link href="/dashboard" className="flex h-16 items-center gap-2 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-co-blue text-sm font-bold text-white">CO</span>
        <span className="font-display text-base font-bold text-sidebar-foreground">CultureOwl</span>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const active = item.href === '/dashboard/crm'
            ? pathname?.startsWith(item.href)
            : 'exact' in item && item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          return <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors', active ? 'bg-co-blue/10 text-co-blue' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground')}><item.icon className="h-4 w-4" />{item.label}</Link>;
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3"><div className="flex items-center gap-2 rounded-lg px-2 py-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-co-blue/15 text-xs font-bold text-co-blue">{user?.email?.slice(0,2).toUpperCase() ?? '?'}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{user?.email ?? '—'}</p><p className="truncate text-[11px] text-muted-foreground">{user?.role?.displayName ?? user?.role?.name ?? ''}</p></div><button onClick={() => logout()} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent" aria-label="Log out"><LogOut className="h-4 w-4" /></button></div></div>
    </aside>
  );
}
