"use client";

import { useState } from "react";
import { Search, Upload, Download, ListPlus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContactsData, useFilteredContacts } from "./hooks/use-contacts-data";
import { ContactActivityFilters } from "./components/contact-tag-filters";
import { ContactsTable } from "./components/contacts-table";

export default function ContactsPage() {
  const { contacts } = useContactsData();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = useFilteredContacts(contacts, search, activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Contacts</h2>
          <p className="mt-1 text-muted-foreground">{contacts.length} total contacts</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <ListPlus className="h-4 w-4" />
            Custom Properties
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="pl-9"
          />
        </div>
        <ContactActivityFilters active={activeFilter} onChange={setActiveFilter} />
      </div>

      <ContactsTable contacts={filtered} />
    </div>
  );
}
