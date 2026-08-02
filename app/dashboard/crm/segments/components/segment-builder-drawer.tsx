"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Star, UserCheck } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FILTER_GROUPS } from "./filter-groups";
import { useContactsData } from "../../contacts/hooks/use-contacts-data";

interface SegmentBuilderDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (segment: { name: string; description: string; filters: string[] }) => void;
}

export function SegmentBuilderDrawer({ open, onOpenChange, onCreate }: SegmentBuilderDrawerProps) {
  const { contacts } = useContactsData();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Rough mock match count — decreases with each filter added, floor of 0.
  // Not real filter evaluation; there's no real contact schema to evaluate
  // against yet (see README). Purely illustrative for the drawer UI.
  const matchCount = Math.max(0, contacts.length - selectedFilters.length * Math.ceil(contacts.length / 6));

  function toggleFilter(option: string) {
    setSelectedFilters((prev) => (prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]));
  }

  function reset() {
    setStep(1);
    setSelectedFilters([]);
    setName("");
    setDescription("");
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  function handleCreate() {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: description.trim(), filters: selectedFilters });
    handleOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-[480px]">
        {step === 1 ? (
          <div className="space-y-6 pb-8 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-foreground">Select Filters — Step 1/2</h2>
              </div>
              <Button onClick={() => setStep(2)}>Continue</Button>
            </div>

            <div className="space-y-6">
              {FILTER_GROUPS.map((group) => (
                <div key={group.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <group.icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground">{group.label}</p>
                    <span className="text-xs italic text-muted-foreground">{group.subtitle}</span>
                  </div>

                  {group.asChips ? (
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleFilter(option)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                            selectedFilters.includes(option)
                              ? "border-co-blue bg-co-blue/10 text-co-blue"
                              : "border-border bg-muted/40 text-foreground hover:bg-muted/70"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {group.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleFilter(option)}
                          className={cn(
                            "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                            selectedFilters.includes(option)
                              ? "border-co-blue bg-co-blue/5 text-foreground"
                              : "border-border bg-muted/30 text-foreground hover:bg-muted/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 -mx-6 mt-4 border-t border-border bg-background px-6 py-3">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserCheck className="h-4 w-4" />
                {matchCount.toLocaleString()} contacts match
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pb-8 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase text-foreground">Name &amp; Review — Step 2/2</h2>
              <Button onClick={handleCreate} disabled={!name.trim()}>
                Create
              </Button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to filters
            </button>

            <div className="space-y-2">
              <Label htmlFor="segment-name">Segment name</Label>
              <Input
                id="segment-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. VIP Contacts in Austin"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="segment-description">Description</Label>
              <Textarea
                id="segment-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this segment targets..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Filters</p>
              {selectedFilters.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter) => (
                    <span key={filter} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {filter}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No filters selected.</p>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <p className="mb-3 text-sm font-medium text-foreground">Contact Information</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/40 py-4 text-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">All</p>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/40 py-4 text-center">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Scores</p>
                  <p className="text-sm font-semibold text-foreground">Any</p>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/40 py-4 text-center">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Follower</p>
                  <p className="text-sm font-semibold text-foreground">Any</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserCheck className="h-4 w-4" />
                {matchCount.toLocaleString()} contacts match
              </p>
              <Button onClick={handleCreate} disabled={!name.trim()}>
                Create Segment
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
