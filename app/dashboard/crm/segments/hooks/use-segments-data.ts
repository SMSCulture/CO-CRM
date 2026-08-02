"use client";

import { useState } from "react";

export interface Segment {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  lastRecalculated: string;
  filters: string[];
  interests: { label: string; pct: number }[];
  topCities: { label: string; pct: number }[];
  avgSpend: number;
  avgAge: number;
}

const MOCK_SEGMENTS: Segment[] = [
  {
    id: "s1",
    name: "VIP Patrons",
    description: "Top-tier donors and highest lifetime spend across all events.",
    contactCount: 142,
    lastRecalculated: "Today",
    filters: ["Tag: VIP", "Total donations > $5,000"],
    interests: [{ label: "Theater", pct: 62 }, { label: "Classical Music", pct: 41 }, { label: "Dance", pct: 28 }],
    topCities: [{ label: "Austin", pct: 71 }, { label: "Round Rock", pct: 14 }, { label: "Cedar Park", pct: 9 }],
    avgSpend: 4820,
    avgAge: 52,
  },
  {
    id: "s2",
    name: "Returning Theater Attendees",
    description: "Attended a theater event within the last 24 months and haven't purchased the current one.",
    contactCount: 1842,
    lastRecalculated: "Today",
    filters: ["Attended a theater event", "Within the last 24 months", "Within 40 miles", "Has not purchased the selected event"],
    interests: [{ label: "Theater", pct: 100 }, { label: "Musicals", pct: 38 }, { label: "Comedy", pct: 19 }],
    topCities: [{ label: "Austin", pct: 58 }, { label: "Pflugerville", pct: 12 }, { label: "Round Rock", pct: 11 }],
    avgSpend: 210,
    avgAge: 45,
  },
  {
    id: "s3",
    name: "Active Donors",
    description: "Made at least one donation in the last 12 months.",
    contactCount: 389,
    lastRecalculated: "Yesterday",
    filters: ["Total donations > $0", "Last donation within 12 months"],
    interests: [{ label: "Fundraising Events", pct: 54 }, { label: "Classical Music", pct: 33 }, { label: "Visual Arts", pct: 22 }],
    topCities: [{ label: "Austin", pct: 66 }, { label: "Cedar Park", pct: 15 }, { label: "Round Rock", pct: 10 }],
    avgSpend: 1650,
    avgAge: 49,
  },
  {
    id: "s4",
    name: "Lapsed (90+ days)",
    description: "No activity — no purchase, donation, or event view — in the last 90 days.",
    contactCount: 234,
    lastRecalculated: "3 days ago",
    filters: ["No activity in 90+ days", "Previously attended at least 1 event"],
    interests: [{ label: "Theater", pct: 40 }, { label: "Dance", pct: 25 }, { label: "Comedy", pct: 20 }],
    topCities: [{ label: "Austin", pct: 55 }, { label: "Round Rock", pct: 18 }, { label: "Pflugerville", pct: 12 }],
    avgSpend: 340,
    avgAge: 41,
  },
  {
    id: "s5",
    name: "New (Last 30 Days)",
    description: "Joined or made their first purchase within the last 30 days.",
    contactCount: 89,
    lastRecalculated: "Today",
    filters: ["Tag: New", "Member since within 30 days"],
    interests: [{ label: "Comedy", pct: 35 }, { label: "Live Music", pct: 30 }, { label: "Theater", pct: 22 }],
    topCities: [{ label: "Austin", pct: 62 }, { label: "Cedar Park", pct: 20 }, { label: "Round Rock", pct: 8 }],
    avgSpend: 95,
    avgAge: 31,
  },
];

export function useSegmentsData() {
  const [segments] = useState<Segment[]>(MOCK_SEGMENTS);
  return { segments, isLoading: false };
}

export function useSegment(id: string) {
  const { segments } = useSegmentsData();
  return segments.find((s) => s.id === id) ?? null;
}
