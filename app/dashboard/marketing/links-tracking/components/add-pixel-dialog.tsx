"use client";

import { useState } from "react";
import { Plus, ChevronDown, X as XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { PixelType, EventScope } from "../hooks/use-tracking-pixels";

const STANDARD_EVENTS = ["Purchase", "Add to Cart", "View Content", "Lead", "Complete Registration"];

interface AddPixelDialogProps {
  pixelType: PixelType | null;
  onClose: () => void;
  onSave: (input: { pixelId: string; eventScope: EventScope; conversionEvents: string[]; serverSideEnabled: boolean }) => void;
}

export function AddPixelDialog({ pixelType, onClose, onSave }: AddPixelDialogProps) {
  const [eventScope, setEventScope] = useState<EventScope>("this");
  const [pixelId, setPixelId] = useState("");
  const [conversionEvents, setConversionEvents] = useState<string[]>([]);
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [serverSideOpen, setServerSideOpen] = useState(false);

  function reset() {
    setEventScope("this");
    setPixelId("");
    setConversionEvents([]);
    setShowEventPicker(false);
    setServerSideOpen(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSave() {
    if (!pixelId.trim()) return;
    onSave({ pixelId: pixelId.trim(), eventScope, conversionEvents, serverSideEnabled: serverSideOpen });
    reset();
  }

  function addEvent(event: string) {
    if (!conversionEvents.includes(event)) {
      setConversionEvents((prev) => [...prev, event]);
    }
    setShowEventPicker(false);
  }

  function removeEvent(event: string) {
    setConversionEvents((prev) => prev.filter((e) => e !== event));
  }

  return (
    <Dialog open={Boolean(pixelType)} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-center font-display uppercase">Add Pixel</DialogTitle>
        </DialogHeader>

        {pixelType && (
          <>
            <div className="-mx-6 flex items-center gap-3 border-y border-border bg-muted/30 px-6 py-4">
              <pixelType.icon className={cn("h-6 w-6", pixelType.iconClassName)} />
              <p className="font-semibold text-foreground">{pixelType.name}</p>
            </div>

            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label>Events</Label>
                <RadioGroup value={eventScope} onValueChange={(v) => setEventScope(v as EventScope)} className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <RadioGroupItem value="this" id="scope-this" />
                    This Event
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <RadioGroupItem value="all" id="scope-all" />
                    All Events
                  </label>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pixel-id">Pixel ID</Label>
                <Input
                  id="pixel-id"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  placeholder="e.g. abc123"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label>Conversion Event</Label>
                {conversionEvents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {conversionEvents.map((event) => (
                      <span
                        key={event}
                        className="inline-flex items-center gap-1 rounded-full bg-co-blue/10 px-2.5 py-1 text-xs font-medium text-co-blue"
                      >
                        {event}
                        <button onClick={() => removeEvent(event)} aria-label={`Remove ${event}`}>
                          <XIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {showEventPicker ? (
                  <div className="rounded-md border border-border">
                    {STANDARD_EVENTS.filter((e) => !conversionEvents.includes(e)).map((event) => (
                      <button
                        key={event}
                        onClick={() => addEvent(event)}
                        className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted/50"
                      >
                        {event}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowEventPicker(true)}
                    className="flex items-center gap-1.5 text-sm font-medium text-co-blue hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Standard Event
                  </button>
                )}
              </div>

              <button
                onClick={() => setServerSideOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">Server-side Tracking (optional)</p>
                  <p className="text-xs text-muted-foreground">Advanced feature for better accuracy</p>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", serverSideOpen && "rotate-180")} />
              </button>
              {serverSideOpen && (
                <p className="rounded-lg bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                  Not built yet — will let you forward this pixel&apos;s events through a server-side endpoint
                  instead of (or in addition to) the browser pixel.
                </p>
              )}
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!pixelId.trim()}>
                Save
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
