"use client";

import { useMemo, useState } from "react";

// Mock dataset — same shape as the original Lovable prototype's mockData.ts
// (PROJECT_SOURCE_OF_TRUTH.md §9.1). Swap this hook's internals for real
// Apollo queries once the CRM contact schema is confirmed on the backend.

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  tags: string[];
  totalSpend: number;
  totalDonations: number;
  eventsAttended: number;
  lastActivity: string;
  memberSince: string;
}

export const CONTACT_TAGS = ["VIP", "Donor", "Member", "Volunteer", "Board", "New"] as const;

const MOCK_CONTACTS: Contact[] = [
  { id: "1", firstName: "Elena", lastName: "Rodriguez", email: "elena.r@email.com", phone: "(512) 555-0142", city: "Austin", zip: "78701", tags: ["VIP", "Donor", "Member"], totalSpend: 4850, totalDonations: 12000, eventsAttended: 34, lastActivity: "2026-03-28", memberSince: "2022-06-15" },
  { id: "2", firstName: "Marcus", lastName: "Chen", email: "marcus.chen@email.com", phone: "(512) 555-0198", city: "Austin", zip: "78704", tags: ["Member", "Volunteer"], totalSpend: 2200, totalDonations: 500, eventsAttended: 22, lastActivity: "2026-03-25", memberSince: "2023-01-10" },
  { id: "3", firstName: "Sarah", lastName: "Thompson", email: "s.thompson@email.com", phone: "(512) 555-0267", city: "Round Rock", zip: "78664", tags: ["Donor"], totalSpend: 1100, totalDonations: 5000, eventsAttended: 12, lastActivity: "2026-03-20", memberSince: "2023-09-22" },
  { id: "4", firstName: "David", lastName: "Okafor", email: "d.okafor@email.com", phone: "(512) 555-0334", city: "Austin", zip: "78745", tags: ["VIP", "Donor", "Board"], totalSpend: 8900, totalDonations: 25000, eventsAttended: 56, lastActivity: "2026-03-29", memberSince: "2021-03-01" },
  { id: "5", firstName: "Mei", lastName: "Nakamura", email: "mei.n@email.com", phone: "(512) 555-0401", city: "Cedar Park", zip: "78613", tags: ["Member"], totalSpend: 680, totalDonations: 0, eventsAttended: 8, lastActivity: "2026-03-15", memberSince: "2024-11-05" },
  { id: "6", firstName: "James", lastName: "Whitfield", email: "j.whitfield@email.com", phone: "(512) 555-0478", city: "Austin", zip: "78702", tags: ["Donor", "Member", "Volunteer"], totalSpend: 3400, totalDonations: 8000, eventsAttended: 28, lastActivity: "2026-03-27", memberSince: "2022-08-20" },
  { id: "7", firstName: "Aisha", lastName: "Patel", email: "aisha.p@email.com", phone: "(512) 555-0545", city: "Pflugerville", zip: "78660", tags: ["New"], totalSpend: 150, totalDonations: 0, eventsAttended: 2, lastActivity: "2026-03-22", memberSince: "2026-02-14" },
  { id: "8", firstName: "Roberto", lastName: "Gonzales", email: "r.gonzales@email.com", phone: "(512) 555-0612", city: "Austin", zip: "78741", tags: ["VIP", "Donor"], totalSpend: 5600, totalDonations: 15000, eventsAttended: 41, lastActivity: "2026-03-26", memberSince: "2021-11-30" },
];

export function useContactsData() {
  const [contacts] = useState<Contact[]>(MOCK_CONTACTS);
  return { contacts, isLoading: false };
}

export function useFilteredContacts(contacts: Contact[], search: string, activeTag: string) {
  return useMemo(() => {
    let result = contacts;
    if (activeTag !== "All") {
      result = result.filter((c) => c.tags.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [contacts, search, activeTag]);
}
