"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { Activity } from "../hooks/use-contact-activities";

const LABELS: Record<string, string> = {
  ticket_purchase: "Purchases",
  donation: "Donations",
  event_view: "Views",
  registration: "Registrations",
  email_open: "Email Opens",
  attendance: "Attendance",
  favorite: "Favorites",
};

export function EventTypeDistribution({ activities }: { activities: Activity[] }) {
  const data = useMemo(() => {
    const counts = new Map<string, number>();
    for (const activity of activities) {
      counts.set(activity.type, (counts.get(activity.type) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([type, count]) => ({ name: LABELS[type] ?? type, count }));
  }, [activities]);

  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">Not enough activity to chart yet.</p>;
  }

  return (
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Bar dataKey="count" fill="hsl(var(--co-blue))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
