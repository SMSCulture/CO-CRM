"use client";

import { useMemo, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// NOTE: no `tags` GraphQL type exists yet for CRM contact tags (VIP, Donor,
// Member, etc). cultureowl_front DOES have a `tags` GraphQL query, but it's
// a different entity — event/genre content tags (type, mainGenre, color),
// not patron labels. This hook uses local state as a stand-in so the module
// is fully functional end-to-end; swap the body of each function for a real
// Apollo `useQuery`/`useMutation` against the CRM's actual tag schema once
// the backend team adds it. The shape below (id/name/color/count) is a
// reasonable guess at what that schema should look like, not a confirmed one.
// ─────────────────────────────────────────────────────────────────────────

export interface CrmTag {
  id: string;
  name: string;
  color: string;
  contactCount: number;
  createdAt: string;
}

const SEED_TAGS: CrmTag[] = [
  { id: "t1", name: "VIP", color: "#3d98d3", contactCount: 142, createdAt: "2025-06-15" },
  { id: "t2", name: "Donor", color: "#773ea9", contactCount: 389, createdAt: "2025-06-15" },
  { id: "t3", name: "Member", color: "#f47d30", contactCount: 567, createdAt: "2025-06-15" },
  { id: "t4", name: "Volunteer", color: "#22c55e", contactCount: 41, createdAt: "2025-07-02" },
  { id: "t5", name: "Board", color: "#111111", contactCount: 12, createdAt: "2025-07-02" },
  { id: "t6", name: "New", color: "#e74e3d", contactCount: 89, createdAt: "2026-01-10" },
];

export function useTagsData() {
  const [tags, setTags] = useState<CrmTag[]>(SEED_TAGS);
  const [isLoading] = useState(false);

  const createTag = (name: string, color: string) => {
    setTags((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, color, contactCount: 0, createdAt: new Date().toISOString().slice(0, 10) },
    ]);
  };

  const renameTag = (id: string, name: string) => {
    setTags((prev) => prev.map((tag) => (tag.id === id ? { ...tag, name } : tag)));
  };

  const deleteTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  return { tags, isLoading, createTag, renameTag, deleteTag };
}

export function useTagsFiltered(tags: CrmTag[], search: string) {
  return useMemo(() => {
    if (!search.trim()) return tags;
    const q = search.trim().toLowerCase();
    return tags.filter((tag) => tag.name.toLowerCase().includes(q));
  }, [tags, search]);
}
