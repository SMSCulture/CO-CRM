"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SWATCHES = ["#3d98d3", "#773ea9", "#f47d30", "#ea3a7a", "#e74e3d", "#22c55e", "#111111"];

interface CreateTagDialogProps {
  onCreate: (name: string, color: string) => void;
}

export function CreateTagDialog({ onCreate }: CreateTagDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(SWATCHES[0]);

  function handleSubmit() {
    if (!name.trim()) return;
    onCreate(name.trim(), color);
    setName("");
    setColor(SWATCHES[0]);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create Tag</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="tag-name">Name</Label>
            <Input
              id="tag-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Season Ticket Holder"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {SWATCHES.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => setColor(swatch)}
                  className="h-7 w-7 rounded-full ring-offset-2 transition-all"
                  style={{ backgroundColor: swatch, boxShadow: color === swatch ? `0 0 0 2px ${swatch}` : undefined }}
                  aria-label={`Choose ${swatch}`}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Create Tag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
