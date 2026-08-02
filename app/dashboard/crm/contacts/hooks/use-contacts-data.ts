"use client";

import { useMemo, useState } from "react";

// Mock dataset — same 8-contact roster as the original prototype's
// mockData.ts, reshaped around activity status (not donor/member labels)
// per the CultureOwl V1 spec. Swap this hook's internals for real Apollo
// queries once the CRM contact schema is confirmed on the backend.

export const ACTIVITY_FILTERS = [
  "Buyers",
  "Attendees",
  "Followers",
  "Subscribers",
  "New",
  "Returning",
  "Inactive",
] as const;

export type ActivityStatus = (typeof ACTIVITY_FILTERS)[number];

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  tags: string[];
  activityStatus: ActivityStatus;
  totalSpend: number;
  eventsPurchased: number;
  eventsAttended: number;
  lastActivity: string;
  memberSince: string;
}

const MOCK_CONTACTS: Contact[] = [
  { id: "1", firstName: "Elena", lastName: "Rodriguez", email: "elena.r@email.com", phone: "(512) 555-0142", city: "Austin", zip: "78701", tags: ["VIP", "Donor"], activityStatus: "Buyers", totalSpend: 4850, eventsPurchased: 22, eventsAttended: 34, lastActivity: "2026-03-28", memberSince: "2022-06-15" },
  { id: "2", firstName: "Marcus", lastName: "Chen", email: "marcus.chen@email.com", phone: "(512) 555-0198", city: "Austin", zip: "78704", tags: ["Volunteer"], activityStatus: "Returning", totalSpend: 2200, eventsPurchased: 15, eventsAttended: 22, lastActivity: "2026-03-25", memberSince: "2023-01-10" },
  { id: "3", firstName: "Sarah", lastName: "Thompson", email: "s.thompson@email.com", phone: "(512) 555-0267", city: "Round Rock", zip: "78664", tags: ["Donor"], activityStatus: "Attendees", totalSpend: 1100, eventsPurchased: 6, eventsAttended: 12, lastActivity: "2026-03-20", memberSince: "2023-09-22" },
  { id: "4", firstName: "David", lastName: "Okafor", email: "d.okafor@email.com", phone: "(512) 555-0334", city: "Austin", zip: "78745", tags: ["VIP", "Board"], activityStatus: "Buyers", totalSpend: 8900, eventsPurchased: 38, eventsAttended: 56, lastActivity: "2026-03-29", memberSince: "2021-03-01" },
  { id: "5", firstName: "Mei", lastName: "Nakamura", email: "mei.n@email.com", phone: "(512) 555-0401", city: "Cedar Park", zip: "78613", tags: [], activityStatus: "New", totalSpend: 680, eventsPurchased: 3, eventsAttended: 8, lastActivity: "2026-03-15", memberSince: "2024-11-05" },
  { id: "6", firstName: "James", lastName: "Whitfield", email: "j.whitfield@email.com", phone: "(512) 555-0478", city: "Austin", zip: "78702", tags: ["Donor", "Volunteer"], activityStatus: "Returning", totalSpend: 3400, eventsPurchased: 19, eventsAttended: 28, lastActivity: "2026-03-27", memberSince: "2022-08-20" },
  { id: "7", firstName: "Aisha", lastName: "Patel", email: "aisha.p@email.com", phone: "(512) 555-0545", city: "Pflugerville", zip: "78660", tags: [], activityStatus: "New", totalSpend: 150, eventsPurchased: 1, eventsAttended: 2, lastActivity: "2026-03-22", memberSince: "2026-02-14" },
  { id: "8", firstName: "Roberto", lastName: "Gonzales", email: "r.gonzales@email.com", phone: "(512) 555-0612", city: "Austin", zip: "78741", tags: ["VIP", "Donor"], activityStatus: "Inactive", totalSpend: 5600, eventsPurchased: 29, eventsAttended: 41, lastActivity: "2025-11-02", memberSince: "2021-11-30" },
];

export function useContactsData() {
  const [contacts] = useState<Contact[]>(MOCK_CONTACTS);
  return { contacts, isLoading: false };
}

export function useFilteredContacts(contacts: Contact[], search: string, activeFilter: string) {
  return useMemo(() => {
    let result = contacts;
    if (activeFilter !== "All") {
      result = result.filter((c) => c.activityStatus === activeFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [contacts, search, activeFilter]);
}
