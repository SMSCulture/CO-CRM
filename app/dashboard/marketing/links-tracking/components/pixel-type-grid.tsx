"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PIXEL_TYPES, type PixelType } from "../hooks/use-tracking-pixels";

interface PixelTypeGridProps {
  onSelect: (pixelType: PixelType) => void;
}

export function PixelTypeGrid({ onSelect }: PixelTypeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {PIXEL_TYPES.map((pixelType) => (
        <div key={pixelType.id} className="flex items-center gap-4 rounded-xl border border-border p-5">
          <pixelType.icon className={cn("h-7 w-7 shrink-0", pixelType.iconClassName)} />
          <div>
            <p className="font-semibold text-foreground">{pixelType.name}</p>
            <button
              onClick={() => onSelect(pixelType)}
              className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground hover:text-co-blue"
            >
              <Plus className="h-3.5 w-3.5" />
              Add new pixel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
