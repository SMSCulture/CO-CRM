"use client";

import { Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PIXEL_TYPES, type ConfiguredPixel } from "../hooks/use-tracking-pixels";

interface TrackingPixelsTableProps {
  pixels: ConfiguredPixel[];
  onRemove: (id: string) => void;
}

export function TrackingPixelsTable({ pixels, onRemove }: TrackingPixelsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pixel Type</TableHead>
            <TableHead>Trigger</TableHead>
            <TableHead>Events</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {pixels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                No existing tracking pixels configured
              </TableCell>
            </TableRow>
          ) : (
            pixels.map((pixel) => {
              const pixelType = PIXEL_TYPES.find((t) => t.id === pixel.pixelTypeId);
              if (!pixelType) return null;
              return (
                <TableRow key={pixel.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <pixelType.icon className={cn("h-4 w-4", pixelType.iconClassName)} />
                      <div>
                        <p className="font-medium text-foreground">{pixelType.name}</p>
                        <p className="text-xs text-muted-foreground">{pixel.pixelId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {pixel.eventScope === "all" ? "All Events" : "This Event"}
                  </TableCell>
                  <TableCell>
                    {pixel.conversionEvents.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {pixel.conversionEvents.map((event) => (
                          <span key={event} className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                            {event}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => onRemove(pixel.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove pixel"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
