'use client';

import Link from 'next/link';
import { Bell, ChevronDown, Command, HelpCircle, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

export function DashboardTopbar() {
  const user = useAuthStore((state) => state.user);
  const company = user?.companyMemberships?.[0]?.company;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-5 backdrop-blur lg:px-8">
      <button className="hidden items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold sm:flex" aria-label="Choose organization">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-co-blue text-[10px] font-bold text-white">CO</span>
        <span className="max-w-40 truncate">{company?.name ?? 'CultureOwl'}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      <button className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-left text-sm text-muted-foreground sm:max-w-md" aria-label="Search">
        <Search className="h-4 w-4" /><span className="truncate">Search people, audiences, campaigns…</span><span className="ml-auto hidden items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] md:flex"><Command className="h-3 w-3" />K</span>
      </button>
      <Button size="sm" className="gap-2" asChild><Link href="/dashboard/marketing/campaigns"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Create</span></Link></Button>
      <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent" aria-label="Help"><HelpCircle className="h-4 w-4" /></button>
      <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent" aria-label="Notifications"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-co-orange" /></button>
    </header>
  );
}
