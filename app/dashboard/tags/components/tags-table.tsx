"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CrmTag } from "../hooks/use-tags-data";

interface TagsTableProps {
  tags: CrmTag[];
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function TagsTable({ tags, onRename, onDelete }: TagsTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");

  function startEdit(tag: CrmTag) {
    setEditingId(tag.id);
    setDraftName(tag.name);
  }

  function commitEdit(id: string) {
    if (draftName.trim()) onRename(id, draftName.trim());
    setEditingId(null);
  }

  if (tags.length === 0) {
    return (
      <div className="rounded-xl border border-border p-10 text-center text-sm text-muted-foreground">
        No tags found.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tag</TableHead>
            <TableHead>Contacts</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>
                {editingId === tag.id ? (
                  <Input
                    autoFocus
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    onBlur={() => commitEdit(tag.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit(tag.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="h-8 max-w-[200px]"
                  />
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-xs font-medium border" style={{ borderColor: tag.color, color: tag.color, backgroundColor: `${tag.color}15` }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
                    {tag.name}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{tag.contactCount.toLocaleString()}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{tag.createdAt}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => startEdit(tag)}>
                      <Pencil className="mr-2 h-3.5 w-3.5" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(tag.id)} className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
