"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useContactsData } from "../../../crm/contacts/hooks/use-contacts-data";
import { useSegmentsData } from "../../../crm/segments/hooks/use-segments-data";

interface CampaignBuilderProps {
  onCancel: () => void;
  /** Segment pre-selected via the CRM segment "Create Campaign" handoff, if any. */
  initialSegmentId?: string;
}

const EMAIL_TYPES = [
  { value: "promotional", label: "Promotional", description: "Marketing & engagement" },
  { value: "practical", label: "Practical", description: "Transactional & updates" },
] as const;

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
      {n}
    </span>
  );
}

export function CampaignBuilder({ onCancel, initialSegmentId }: CampaignBuilderProps) {
  const { contacts } = useContactsData();
  const { segments } = useSegmentsData();

  const [campaignName, setCampaignName] = useState("");
  const [emailType, setEmailType] = useState<(typeof EMAIL_TYPES)[number]["value"]>("promotional");
  const [sendTo, setSendTo] = useState<"all" | "segment">(initialSegmentId ? "segment" : "all");
  const [segmentId, setSegmentId] = useState<string | undefined>(initialSegmentId);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-foreground">Create Email Campaign</h2>
          <p className="mt-1 text-muted-foreground">Follow each step to build and send your email</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="audience" className="space-y-4">
        <AccordionItem value="audience" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={1} />
              Target Audience
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pb-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign name</Label>
              <Input
                id="campaign-name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. April Newsletter"
              />
            </div>

            <div className="space-y-2">
              <Label>Email type</Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {EMAIL_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setEmailType(type.value)}
                    className={cn(
                      "rounded-lg border px-4 py-3 text-left transition-colors",
                      emailType === type.value ? "border-co-blue bg-co-blue/5" : "border-border hover:bg-muted/40"
                    )}
                  >
                    <p className="font-medium text-foreground">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Send to</Label>
              <div className="space-y-2">
                <button
                  onClick={() => setSendTo("all")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                    sendTo === "all" ? "border-co-blue bg-co-blue/5" : "border-border hover:bg-muted/40"
                  )}
                >
                  <div>
                    <p className="font-medium text-foreground">All contacts</p>
                    <p className="text-sm text-muted-foreground">{contacts.length} contacts</p>
                  </div>
                  {sendTo === "all" && <Check className="h-5 w-5 text-co-blue" />}
                </button>

                <button
                  onClick={() => setSendTo("segment")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                    sendTo === "segment" ? "border-co-blue bg-co-blue/5" : "border-border hover:bg-muted/40"
                  )}
                >
                  <div>
                    <p className="font-medium text-foreground">From a segment</p>
                    <p className="text-sm text-muted-foreground">
                      {sendTo === "segment" && segmentId
                        ? segments.find((s) => s.id === segmentId)?.name
                        : "Choose a saved segment"}
                    </p>
                  </div>
                  {sendTo === "segment" && <Check className="h-5 w-5 text-co-blue" />}
                </button>

                {sendTo === "segment" && (
                  <div className="ml-4 flex flex-wrap gap-2 pt-1">
                    {segments.map((segment) => (
                      <button
                        key={segment.id}
                        onClick={() => setSegmentId(segment.id)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                          segmentId === segment.id
                            ? "border-co-blue bg-co-blue/10 text-co-blue"
                            : "border-border bg-muted/40 text-foreground hover:bg-muted/70"
                        )}
                      >
                        {segment.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="subject" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={2} />
              Subject &amp; Sender
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-2 text-sm text-muted-foreground">Not built yet.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="content" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={3} />
              Email Content
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-2 text-sm text-muted-foreground">
            Not built yet — should reuse cultureowl_front&apos;s Novel/Tiptap editor components.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scheduling" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={4} />
              Scheduling
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-2 text-sm text-muted-foreground">Not built yet.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="review" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={5} />
              Review &amp; Send
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-2 text-sm text-muted-foreground">Not built yet.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
