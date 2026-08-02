const TAG_COLORS: Record<string, string> = {
  VIP: "#3d98d3",
  Donor: "#773ea9",
  Member: "#f47d30",
  Volunteer: "#22c55e",
  Board: "#111111",
  New: "#e74e3d",
};

export function TagPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] ?? "#373939";
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border"
      style={{ borderColor: color, color, backgroundColor: `${color}15` }}
    >
      {tag}
    </span>
  );
}
