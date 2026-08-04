"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ExternalLink,
  Type,
  FileText as TextIcon,
  Image as ImageIcon,
  MousePointer,
  Minus,
  GripVertical,
  Send,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useContactsData } from "../../../crm/contacts/hooks/use-contacts-data";
import { useSegmentsData } from "../../../crm/segments/hooks/use-segments-data";
import { SAMPLE_TEMPLATES } from "../../templates/lib/sample-templates";

interface CampaignBuilderProps {
  onCancel: () => void;
  /** Segment pre-selected via the CRM segment "Create Campaign" handoff, if any. */
  initialSegmentId?: string;
}

const EMAIL_TYPES = [
  { value: "promotional", label: "Promotional", description: "Marketing & engagement" },
  { value: "practical", label: "Practical", description: "Transactional & updates" },
] as const;

type BlockType = "heading" | "text" | "image" | "button" | "divider";

interface EmailBlock {
  id: string;
  type: BlockType;
  content: string;
}

const BLOCK_DEFAULTS: Record<BlockType, string> = {
  heading: "New heading",
  text: "New text block...",
  button: "Click Here",
  image: "https://placehold.co/600x200",
  divider: "",
};

function StepNumber({ n, complete }: { n: number; complete: boolean }) {
  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
        complete ? "bg-co-blue text-white" : "bg-muted text-foreground"
      )}
    >
      {complete ? <Check className="h-3.5 w-3.5" /> : n}
    </span>
  );
}

function SortableBlock({
  block,
  onUpdate,
  onRemove,
}: {
  block: EmailBlock;
  onUpdate: (content: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative flex items-start gap-2">
      <div className="flex flex-col items-center gap-0.5 pt-1">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <button type="button" onClick={onRemove} className="text-destructive hover:text-destructive/80" aria-label="Remove block">
          <Minus className="h-3 w-3" />
        </button>
      </div>
      <div className="flex-1">
        {block.type === "heading" && (
          <input
            className="w-full rounded px-1 text-lg font-bold text-foreground outline-none focus:ring-1 focus:ring-co-blue/30"
            value={block.content}
            onChange={(e) => onUpdate(e.target.value)}
          />
        )}
        {block.type === "text" && (
          <textarea
            className="min-h-[60px] w-full resize-none rounded px-1 text-sm text-foreground outline-none focus:ring-1 focus:ring-co-blue/30"
            value={block.content}
            onChange={(e) => onUpdate(e.target.value)}
          />
        )}
        {block.type === "button" && (
          <div className="inline-block rounded-md bg-co-blue px-4 py-2 text-sm font-medium text-white">
            <input
              className="w-24 bg-transparent text-white outline-none"
              value={block.content}
              onChange={(e) => onUpdate(e.target.value)}
            />
          </div>
        )}
        {block.type === "image" && (
          <div className="flex h-32 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
            <ImageIcon className="mr-1 h-5 w-5" /> Image placeholder
          </div>
        )}
        {block.type === "divider" && <hr className="my-2 border-border" />}
      </div>
    </div>
  );
}

export function CampaignBuilder({ onCancel, initialSegmentId }: CampaignBuilderProps) {
  const { contacts } = useContactsData();
  const { segments } = useSegmentsData();

  const [campaignName, setCampaignName] = useState("");
  const [emailType, setEmailType] = useState<(typeof EMAIL_TYPES)[number]["value"]>("promotional");
  const [sendTo, setSendTo] = useState<"all" | "segment">(initialSegmentId ? "segment" : "all");
  const [segmentId, setSegmentId] = useState<string | undefined>(initialSegmentId);

  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [fromName, setFromName] = useState("CultureOwl");
  const [fromEmail, setFromEmail] = useState("hello@cultureowl.com");

  const [templateMode, setTemplateMode] = useState<"choose" | "create" | null>(null);
  const [templateId, setTemplateId] = useState<string | undefined>(undefined);
  const [blocks, setBlocks] = useState<EmailBlock[]>([
    { id: "1", type: "heading", content: "Your heading here" },
    { id: "2", type: "text", content: "Write your email content here..." },
    { id: "3", type: "button", content: "Learn More" },
  ]);

  const [sendOption, setSendOption] = useState<"now" | "schedule">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function addBlock(type: BlockType) {
    setBlocks((prev) => [...prev, { id: crypto.randomUUID(), type, content: BLOCK_DEFAULTS[type] }]);
  }

  function updateBlock(id: string, content: string) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content } : b)));
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setBlocks((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === active.id);
      const newIndex = prev.findIndex((b) => b.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  const audienceLabel = sendTo === "all" ? "All contacts" : segments.find((s) => s.id === segmentId)?.name ?? "";
  const audienceCount = sendTo === "all" ? contacts.length : segments.find((s) => s.id === segmentId)?.contactCount ?? 0;

  const stepComplete = {
    audience: !!(campaignName.trim() && (sendTo === "all" || segmentId)),
    subject: !!(subject.trim() && fromName.trim()),
    content: templateMode !== null && (templateMode === "create" || !!templateId),
    scheduling: sendOption === "now" || (!!scheduleDate && !!scheduleTime),
  };
  const allComplete = stepComplete.audience && stepComplete.subject && stepComplete.content && stepComplete.scheduling;

  const templateName =
    templateMode === "choose" ? SAMPLE_TEMPLATES.find((t) => t.id === templateId)?.label ?? "—" : templateMode === "create" ? "Custom template" : "—";

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
              <StepNumber n={1} complete={stepComplete.audience} />
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
                      {sendTo === "segment" && segmentId ? segments.find((s) => s.id === segmentId)?.name : "Choose a saved segment"}
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
              <StepNumber n={2} complete={stepComplete.subject} />
              Subject &amp; Sender
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject line</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Don't miss our upcoming events!"
                maxLength={150}
              />
              <p className="text-xs text-muted-foreground">{subject.length}/150 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preview-text">Preview text</Label>
              <Input
                id="preview-text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Brief summary shown in inbox preview"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="from-name">From name</Label>
                <Input id="from-name" value={fromName} onChange={(e) => setFromName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">From email</Label>
                <Input id="from-email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="content" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={3} complete={stepComplete.content} />
              Email Content
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6 pt-2">
            {!templateMode && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setTemplateMode("choose")}
                  className="rounded-lg border border-border p-5 text-left transition-colors hover:border-co-blue/30"
                >
                  <TextIcon className="mb-2 h-6 w-6 text-co-blue" />
                  <p className="text-sm font-medium text-foreground">Choose a template</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Pick from existing templates</p>
                </button>
                <button
                  onClick={() => setTemplateMode("create")}
                  className="rounded-lg border border-border p-5 text-left transition-colors hover:border-co-blue/30"
                >
                  <Type className="mb-2 h-6 w-6 text-co-blue" />
                  <p className="text-sm font-medium text-foreground">Create new template</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Build with drag &amp; drop blocks</p>
                </button>
              </div>
            )}

            {templateMode === "choose" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Select a template</p>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => { setTemplateMode(null); setTemplateId(undefined); }}>
                    ← Back
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SAMPLE_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setTemplateId(template.id)}
                      className={cn(
                        "flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                        templateId === template.id ? "border-co-blue bg-co-blue/5" : "border-border hover:bg-muted/40"
                      )}
                    >
                      <p className="font-medium text-foreground">{template.label}</p>
                      {templateId === template.id && <Check className="h-5 w-5 text-co-blue" />}
                    </button>
                  ))}
                </div>
                <Link
                  href="/dashboard/marketing/templates"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-co-blue hover:underline"
                >
                  Open the template editor
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {templateMode === "create" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Build your email</p>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setTemplateMode(null)}>
                    ← Back
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-muted p-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => addBlock("heading")}>
                    <Type className="mr-1 h-3.5 w-3.5" />
                    Heading
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => addBlock("text")}>
                    <TextIcon className="mr-1 h-3.5 w-3.5" />
                    Text
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => addBlock("image")}>
                    <ImageIcon className="mr-1 h-3.5 w-3.5" />
                    Image
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => addBlock("button")}>
                    <MousePointer className="mr-1 h-3.5 w-3.5" />
                    Button
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => addBlock("divider")}>
                    <Minus className="mr-1 h-3.5 w-3.5" />
                    Divider
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg border border-border bg-background">
                  <div className="border-b border-border bg-muted/30 px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Email Preview</p>
                  </div>
                  <div className="min-h-[200px] space-y-3 p-4">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                        {blocks.map((block) => (
                          <SortableBlock
                            key={block.id}
                            block={block}
                            onUpdate={(content) => updateBlock(block.id, content)}
                            onRemove={() => removeBlock(block.id)}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scheduling" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={4} complete={stepComplete.scheduling} />
              Scheduling
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6 pt-2">
            <div className="space-y-2">
              {(["now", "schedule"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSendOption(opt)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-colors",
                    sendOption === opt ? "border-co-blue bg-co-blue/5" : "border-border hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{opt === "now" ? "Send immediately" : "Schedule for later"}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {opt === "now" ? "Campaign will be sent right away" : "Choose a specific date and time"}
                      </p>
                    </div>
                    {sendOption === opt && <Check className="h-4 w-4 text-co-blue" />}
                  </div>
                </button>
              ))}
            </div>
            {sendOption === "schedule" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule-date">Date</Label>
                  <Input id="schedule-date" type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-time">Time</Label>
                  <Input id="schedule-time" type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="review" className="rounded-xl border border-border px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <StepNumber n={5} complete={false} />
              Review &amp; Send
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6 pt-2">
            <div className="rounded-lg border border-border divide-y divide-border">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">Campaign</span>
                <span className="text-sm font-medium text-foreground">{campaignName || "—"}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">Audience</span>
                <span className="text-sm font-medium text-foreground">
                  {audienceLabel || "—"} · {audienceCount} contacts
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">Subject</span>
                <span className="text-sm font-medium text-foreground">{subject || "—"}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-sm font-medium text-foreground">
                  {fromName} &lt;{fromEmail}&gt;
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">Template</span>
                <span className="text-sm font-medium text-foreground">{templateName}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">Schedule</span>
                <span className="text-sm font-medium text-foreground">
                  {sendOption === "now" ? "Send immediately" : `${scheduleDate || "—"} at ${scheduleTime || "—"}`}
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Templates aren&apos;t saved/reusable by name yet (no backend) — sending here still uses a stubbed API call.
              Once persistence exists, this becomes a real send.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={onCancel}>
                Save as Draft
              </Button>
              <Button disabled={!allComplete}>
                <Send className="mr-1.5 h-4 w-4" />
                {sendOption === "now" ? "Send Campaign" : "Schedule Campaign"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
