'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ArrowUpDown, MailCheck, MessageSquareOff, UsersRound } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TagPill } from './tag-pill';
import type { Contact } from '../hooks/use-contacts-data';
import { cn } from '@/lib/utils';

interface ContactsTableProps { contacts: Contact[] }
type SortKey = 'totalSpend' | 'lastActivity';
type SortDirection = 'asc' | 'desc';

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'lastActivity', direction: 'desc' });
  const sorted = useMemo(() => [...contacts].sort((a, b) => {
    const left = a[sort.key];
    const right = b[sort.key];
    const result = typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right));
    return sort.direction === 'asc' ? result : -result;
  }), [contacts, sort]);
  const allSelected = sorted.length > 0 && sorted.every((contact) => selected.has(contact.id));

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(sorted.map((contact) => contact.id)));
  }
  function toggleOne(id: string) {
    setSelected((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }
  function toggleSort(key: SortKey) {
    setSort((current) => ({ key, direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc' }));
  }

  if (contacts.length === 0) return <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center"><UsersRound className="mx-auto h-6 w-6 text-muted-foreground" /><p className="mt-3 font-medium">No contacts match this view</p><p className="mt-1 text-sm text-muted-foreground">Change the search or remove a filter.</p></div>;

  return <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
    <div className={cn('flex min-h-12 items-center justify-between border-b px-4 transition-colors duration-150', selected.size > 0 ? 'bg-co-blue/10' : 'bg-card')}>
      <div><p className="text-sm font-semibold">{selected.size > 0 ? `${selected.size} selected` : 'All contacts'}</p><p className="text-xs text-muted-foreground">{contacts.length} records in this view</p></div>
      {selected.size > 0 && <div className="flex items-center gap-2"><Button size="sm" variant="outline">Add tag</Button><Button size="sm" variant="outline">Add to segment</Button></div>}
    </div>
    <div className="max-w-full overflow-x-auto">
      <Table className="min-w-[1060px]">
        <TableHeader className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur dark:bg-slate-950/95">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12 pl-4"><Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all contacts" /></TableHead>
            <TableHead className="w-[260px]">Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Location</TableHead>
            <TableHead><SortButton label="Lifetime spend" active={sort.key === 'totalSpend'} direction={sort.direction} onClick={() => toggleSort('totalSpend')} /></TableHead>
            <TableHead className="text-right">Purchased</TableHead>
            <TableHead className="text-right">Attended</TableHead>
            <TableHead><SortButton label="Last active" active={sort.key === 'lastActivity'} direction={sort.direction} onClick={() => toggleSort('lastActivity')} /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{sorted.map((contact) => {
          const isSelected = selected.has(contact.id);
          return <TableRow key={contact.id} data-state={isSelected ? 'selected' : undefined} className="group h-16 border-border/70 transition-colors duration-150 data-[state=selected]:bg-co-blue/10 hover:bg-co-blue/[0.045]">
            <TableCell className={cn('relative pl-4', isSelected && 'before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-co-blue')}><Checkbox checked={isSelected} onCheckedChange={() => toggleOne(contact.id)} aria-label={`Select ${contact.firstName} ${contact.lastName}`} /></TableCell>
            <TableCell><Link href={`/dashboard/crm/contacts/${contact.id}`} className="flex items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-co-blue"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-co-blue/20 to-co-blue/5 text-xs font-bold text-co-blue-hover">{contact.firstName[0]}{contact.lastName[0]}</span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-foreground group-hover:text-co-blue-hover">{contact.firstName} {contact.lastName}</span><span className="block truncate text-xs text-muted-foreground">{contact.email}</span></span></Link></TableCell>
            <TableCell><Badge variant="secondary" className="whitespace-nowrap font-medium">{contact.activityStatus}</Badge></TableCell>
            <TableCell><div className="flex max-w-44 items-center gap-1.5">{contact.tags.slice(0, 2).map((tag) => <TagPill key={tag} tag={tag} />)}{contact.tags.length > 2 && <span className="text-xs text-muted-foreground">+{contact.tags.length - 2}</span>}{contact.tags.length === 0 && <span className="text-xs text-muted-foreground">No tags</span>}</div></TableCell>
            <TableCell><span className="text-sm text-foreground">{contact.city}</span><span className="block text-xs text-muted-foreground">{contact.zip}</span></TableCell>
            <TableCell className="text-right font-semibold tabular-nums">${contact.totalSpend.toLocaleString()}</TableCell>
            <TableCell className="text-right tabular-nums text-muted-foreground">{contact.eventsPurchased}</TableCell>
            <TableCell className="text-right tabular-nums text-muted-foreground">{contact.eventsAttended}</TableCell>
            <TableCell><span className="text-sm tabular-nums">{contact.lastActivity}</span><span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">{contact.subscribedEmail ? <><MailCheck className="h-3 w-3 text-emerald-600" />Email</> : <><MessageSquareOff className="h-3 w-3" />No email</>}</span></TableCell>
          </TableRow>;
        })}</TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-between border-t bg-slate-50/70 px-4 py-3 text-xs text-muted-foreground"><span>Showing {contacts.length} contacts</span><span>{selected.size} selected · Prototype data until company contact scoping lands</span></div>
  </div>;
}

function SortButton({ label, active, direction, onClick }: { label: string; active: boolean; direction: SortDirection; onClick: () => void }) {
  const Icon = !active ? ArrowUpDown : direction === 'asc' ? ArrowUp : ArrowDown;
  return <button onClick={onClick} className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium hover:bg-muted hover:text-foreground" aria-label={`Sort by ${label}`}>{label}<Icon className="h-3.5 w-3.5" /></button>;
}
