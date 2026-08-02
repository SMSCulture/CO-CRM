"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTagsData, useTagsFiltered } from "./hooks/use-tags-data";
import { TagsTable } from "./components/tags-table";
import { CreateTagDialog } from "./components/create-tag-dialog";

export default function TagsPage() {
  const { tags, createTag, renameTag, deleteTag } = useTagsData();
  const [search, setSearch] = useState("");
  const filteredTags = useTagsFiltered(tags, search);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Tags</h2>
          <p className="mt-1 text-muted-foreground">
            Labels attached to contacts — used for filtering, segments, and quick identification.
          </p>
        </div>
        <CreateTagDialog onCreate={createTag} />
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tags..."
          className="pl-9"
        />
      </div>

      <TagsTable tags={filteredTags} onRename={renameTag} onDelete={deleteTag} />
    </div>
  );
}
