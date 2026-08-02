"use client";

import { cn } from "@/lib/utils";
import { ACTIVITY_FILTERS } from "../hooks/use-contacts-data";

interface ContactActivityFiltersProps {
  active: string;
  onChange: (filter: string) => void;
}

export function ContactActivityFilters({ active, onChange }: ContactActivityFiltersProps) {
  const options = ["All", ...ACTIVITY_FILTERS];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
            active === filter
              ? "bg-co-blue text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/70"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
