"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TagPill } from "./tag-pill";

const SUGGESTED_TAGS = ["VIP", "Donor", "Member", "Volunteer", "Board", "New"];

interface TagManagerProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagManager({ tags, onChange }: TagManagerProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  const available = SUGGESTED_TAGS.filter((t) => !tags.includes(t));

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1">
          <TagPill tag={tag} />
          <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-destructive" aria-label={`Remove ${tag}`}>
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-6 gap-1 rounded-full px-2 text-xs">
            <Plus className="h-3 w-3" />
            Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 space-y-2 p-3" align="start">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag(input)}
            placeholder="New tag…"
            className="h-8"
          />
          {available.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {available.map((tag) => (
                <button key={tag} onClick={() => addTag(tag)}>
                  <TagPill tag={tag} />
                </button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
