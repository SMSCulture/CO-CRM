"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TagPill } from "./tag-pill";
import type { Contact } from "../hooks/use-contacts-data";

interface ContactsTableProps {
  contacts: Contact[];
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  if (contacts.length === 0) {
    return (
      <div className="rounded-xl border border-border p-10 text-center text-sm text-muted-foreground">
        No contacts match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox />
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Lifetime Spend</TableHead>
            <TableHead className="text-right">Events Purchased</TableHead>
            <TableHead className="text-right">Events Attended</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <p className="font-medium text-foreground">
                  {c.firstName} {c.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{c.email}</p>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.length > 0 ? (
                    c.tags.map((tag) => <TagPill key={tag} tag={tag} />)
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {c.city}, {c.zip}
              </TableCell>
              <TableCell className="text-right text-sm font-medium text-foreground">
                ${c.totalSpend.toLocaleString()}
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">{c.eventsPurchased}</TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">{c.eventsAttended}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{c.lastActivity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
