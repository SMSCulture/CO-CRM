"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useContactsData } from "../hooks/use-contacts-data";
import { useContactActivities } from "../hooks/use-contact-activities";
import { useCustomProperties } from "../hooks/use-custom-properties";
import { useSegmentsData } from "../../segments/hooks/use-segments-data";
import { TagManager } from "../components/tag-manager";
import { ActivityTimeline } from "../components/activity-timeline";
import { CustomPropertyValues } from "../components/custom-property-values";
import { MetricCard } from "../components/metric-card";
import { EventTypeDistribution } from "../components/event-type-distribution";

export default function ContactProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { contacts } = useContactsData();
  const { segments } = useSegmentsData();
  const [notes, setNotes] = useState("");

  const contact = contacts.find((c) => c.id === params.id);
  const { activities } = useContactActivities(params.id);
  const { definitions, values } = useCustomProperties(params.id);
  const [tags, setTags] = useState<string[]>(contact?.tags ?? []);

  // Approximate membership: a contact matches a segment when any of the
  // segment's filter labels case-insensitively reference one of the
  // contact's tags or activity status. No real filter-evaluation engine
  // exists yet (segments are mock data), so this is a best-effort signal,
  // not authoritative — replace once segment evaluation is real.
  const matchingSegments = useMemo(() => {
    if (!contact) return [];
    const signals = [...tags, contact.activityStatus].map((s) => s.toLowerCase());
    return segments.filter((segment) =>
      segment.filters.some((filter) => signals.some((signal) => filter.toLowerCase().includes(signal)))
    );
  }, [contact, segments, tags]);

  if (!contact) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" className="gap-2" onClick={() => router.push("/dashboard/crm/contacts")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Contacts
        </Button>
        <p className="text-sm text-muted-foreground">Contact not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => router.push("/dashboard/crm/contacts")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Contacts
      </Button>

      <div className="rounded-xl border border-border p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-co-blue/15 text-lg font-bold text-co-blue">
              {contact.firstName[0]}
              {contact.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {contact.firstName} {contact.lastName}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {contact.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {contact.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {contact.city}, {contact.zip}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Member since {contact.memberSince}
                </span>
              </div>
              <div className="mt-3">
                <TagManager tags={tags} onChange={setTags} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Transactions &amp; Marketing</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 text-sm">
          <span className="text-muted-foreground">
            Lifetime spend <span className="font-semibold text-foreground">${contact.totalSpend.toLocaleString()}</span>
          </span>
          <span className="text-muted-foreground">
            Total donations <span className="font-semibold text-foreground">${contact.totalDonations.toLocaleString()}</span>
          </span>
          <span className="text-muted-foreground">
            Last purchased <span className="font-semibold text-foreground">{contact.lastPurchased ?? "—"}</span>
          </span>
          <span className="text-muted-foreground">
            Email subscribed{" "}
            <span className={contact.subscribedEmail ? "font-semibold text-success" : "font-semibold text-destructive"}>
              {contact.subscribedEmail ? "Yes" : "No"}
            </span>
          </span>
          <span className="text-muted-foreground">
            Text subscribed{" "}
            <span className={contact.subscribedText ? "font-semibold text-success" : "font-semibold text-destructive"}>
              {contact.subscribedText ? "Yes" : "No"}
            </span>
          </span>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Lifetime Spend" value={`$${contact.totalSpend.toLocaleString()}`} />
        <MetricCard label="Events Purchased" value={String(contact.eventsPurchased)} />
        <MetricCard label="Events Attended" value={String(contact.eventsAttended)} />
        <MetricCard label="Last Activity" value={contact.lastActivity} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="rounded-xl border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline activities={activities} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-xl border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Event Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <EventTypeDistribution activities={activities} />
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Custom Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomPropertyValues definitions={definitions} values={values} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Segments</CardTitle>
        </CardHeader>
        <CardContent>
          {matchingSegments.length === 0 ? (
            <p className="text-sm text-muted-foreground">This contact doesn&apos;t currently match any saved segment.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {matchingSegments.map((segment) => (
                <Link
                  key={segment.id}
                  href={`/dashboard/crm/segments/${segment.id}`}
                  className="rounded-full border border-co-blue/30 bg-co-blue/5 px-3 py-1.5 text-sm font-medium text-co-blue hover:bg-co-blue/10"
                >
                  {segment.name}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquareText className="h-4 w-4" />
            Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add a note about this contact…"
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );
}
