"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MoreVertical, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CampaignBuilder } from "./components/campaign-builder";

const SAMPLE_DRAFTS = [
  { name: "Season announcement", updated: "Today, 11:42 AM" },
  { name: "Member presale", updated: "Yesterday, 4:08 PM" },
  { name: "Lapsed patron win-back", updated: "Sep 12, 2026" },
];

function CampaignsPageContent() {
  const segmentFromQuery = useSearchParams().get("segment") ?? undefined;
  const [showBuilder, setShowBuilder] = useState(Boolean(segmentFromQuery));
  const [query, setQuery] = useState("");
  const rows = useMemo(() => SAMPLE_DRAFTS.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [query]);
  if (showBuilder) return <CampaignBuilder onCancel={() => setShowBuilder(false)} initialSegmentId={segmentFromQuery} />;

  return <div className="space-y-5"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Campaigns</h2><p className="mt-1 text-sm text-muted-foreground">Find drafts and performance in one compact list.</p></div><Button onClick={() => setShowBuilder(true)}><Plus className="mr-2 h-4 w-4"/>New campaign</Button></div><div className="flex flex-wrap gap-3"><div className="relative min-w-64 flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search campaigns" className="pl-9"/></div><Select defaultValue="all"><SelectTrigger className="w-48"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="sent">Sent</SelectItem></SelectContent></Select></div><div className="overflow-hidden rounded-xl border bg-white"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Campaign</th><th className="px-4 py-3 font-medium">Opened</th><th className="px-4 py-3 font-medium">Clicks</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Updated</th><th className="w-12"/></tr></thead><tbody className="divide-y">{rows.map((item) => <tr key={item.name} className="hover:bg-slate-50"><td className="px-4 py-3"><button onClick={() => setShowBuilder(true)} className="flex items-center gap-3 text-left font-semibold"><span className="h-10 w-14 rounded border bg-gradient-to-br from-slate-50 to-slate-200"/>{item.name}</button></td><td className="px-4 py-3 text-muted-foreground">--</td><td className="px-4 py-3 text-muted-foreground">--</td><td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">Prototype draft</span></td><td className="px-4 py-3 text-muted-foreground">{item.updated}</td><td><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button></td></tr>)}</tbody></table><p className="border-t bg-slate-50 px-4 py-2 text-xs text-muted-foreground">Sample drafts for layout testing. Opens and clicks appear only after a real campaign provider is connected.</p></div></div>;
}
export default function CampaignsPage() { return <Suspense fallback={null}><CampaignsPageContent/></Suspense>; }
