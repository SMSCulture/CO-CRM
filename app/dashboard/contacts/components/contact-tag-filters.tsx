"use client";

import { cn } from "@/lib/utils";
import { CONTACT_TAGS } from "../hooks/use-contacts-data";

interface ContactTagFiltersProps {
  active: string;
  onChange: (tag: string) => void;
}

export function ContactTagFilters({ active, onChange }: ContactTagFiltersProps) {
  const options = ["All", ...CONTACT_TAGS];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
            active === tag
              ? "bg-co-blue text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/70"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
