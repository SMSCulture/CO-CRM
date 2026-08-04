"use client";

import { useMemo } from "react";

export type ActivityType =
  | "ticket_purchase"
  | "donation"
  | "event_view"
  | "registration"
  | "email_open"
  | "attendance"
  | "favorite";

export interface Activity {
  id: string;
  contactId: string;
  type: ActivityType;
  title: string;
  description: string;
  venue?: string;
  amount?: number;
  date: string;
}

// Mock now — the explicit swap point for real audience-behavior data.
// Once wired up, this hook should read from (a) Dittofeed's tracked
// event stream and (b) cultureowl_front's already-real GraphQL operations
// (lib/graphql/favorites.ts's ADD_FAVORITE/TOGGLE_FAVORITE, and
// lib/graphql/event-tracking.ts's TRACK_EVENT_INTERACTION) — the shape
// below is designed so that swap only changes the data source, not
// any component that consumes it.
const MOCK_ACTIVITIES: Activity[] = [
  { id: "a1", contactId: "1", type: "ticket_purchase", title: "Purchased 2 tickets", description: "Spring Chamber Series", venue: "Long Center", amount: 140, date: "2026-03-28" },
  { id: "a2", contactId: "1", type: "attendance", title: "Attended event", description: "Winter Gala", venue: "AT&T Center", date: "2026-02-14" },
  { id: "a3", contactId: "1", type: "donation", title: "Made a donation", description: "Annual Fund", amount: 500, date: "2026-01-20" },
  { id: "a4", contactId: "1", type: "email_open", title: "Opened email", description: "March Newsletter", date: "2026-03-15" },
  { id: "a5", contactId: "1", type: "favorite", title: "Favorited an event", description: "Contemporary Dance Showcase", date: "2026-03-10" },
  { id: "a6", contactId: "1", type: "event_view", title: "Viewed event page", description: "Jazz Night at the Continental", date: "2026-03-05" },
  { id: "a7", contactId: "2", type: "ticket_purchase", title: "Purchased 1 ticket", description: "Comedy Night", venue: "Cap City Comedy", amount: 35, date: "2026-03-20" },
  { id: "a8", contactId: "2", type: "registration", title: "Registered for event", description: "Volunteer Orientation", date: "2026-03-01" },
];

export function useContactActivities(contactId: string) {
  const activities = useMemo(
    () => MOCK_ACTIVITIES.filter((a) => a.contactId === contactId).sort((a, b) => (a.date < b.date ? 1 : -1)),
    [contactId]
  );
  return { activities, isLoading: false };
}
