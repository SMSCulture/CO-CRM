'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Activity, Filter, MoreHorizontal, Plus, Search, UsersRound, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useWorkflowBuilderStore } from '@/store/workflow-builder-store';

export default function WorkflowsPage() {
  const workflows = useWorkflowBuilderStore((s) => s.workflows);
  const createWorkflow = useWorkflowBuilderStore((s) => s.createWorkflow);
  const [search, setSearch] = useState('');
  const visible = useMemo(() => workflows.filter((workflow) => `${workflow.name} ${workflow.description}`.toLowerCase().includes(search.toLowerCase())), [workflows, search]);
  function handleCreate() { const id = createWorkflow(); window.location.assign(`/dashboard/workflows/${id}`); }
  return <div className="space-y-4">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold">Workflows</h1><p className="text-sm text-muted-foreground">Build, monitor and find every patron journey.</p></div><Button className="gap-2" onClick={handleCreate}><Plus className="h-4 w-4"/>New workflow</Button></div>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{([{label:'Total',value:workflows.length,Icon:Zap},{label:'Active',value:workflows.filter(w=>w.isActive).length,Icon:Activity},{label:'Enrolled',value:'2,148',Icon:UsersRound},{label:'Needs review',value:workflows.filter(w=>!w.isActive).length,Icon:Filter}]).map(({label,value,Icon})=><div key={String(label)} className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3"><Icon className="h-4 w-4 text-co-blue"/><div><p className="text-xs text-muted-foreground">{String(label)}</p><p className="font-bold">{String(value)}</p></div></div>)}</div>
    <div className="flex items-center gap-2"><div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><Input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search workflows" className="pl-9"/></div><Button variant="outline" className="gap-2"><Filter className="h-4 w-4"/>Filter</Button></div>
    <div className="overflow-hidden rounded-xl border bg-white"><Table><TableHeader><TableRow><TableHead>Workflow</TableHead><TableHead>Status</TableHead><TableHead>Trigger</TableHead><TableHead className="text-right">Enrolled</TableHead><TableHead>Last activity</TableHead><TableHead className="w-12"/></TableRow></TableHeader><TableBody>{visible.map((workflow,index)=><TableRow key={workflow.id} className="h-14"><TableCell><Link href={`/dashboard/workflows/${workflow.id}`} prefetch className="font-semibold hover:text-co-blue">{workflow.name}</Link><p className="max-w-lg truncate text-xs text-muted-foreground">{workflow.description||'No description'}</p></TableCell><TableCell><Badge variant={workflow.isActive?'default':'secondary'}>{workflow.isActive?'Active':'Draft'}</Badge></TableCell><TableCell className="text-sm">{workflow.nodes.find(node=>node.type==='trigger')?.label??'Manual'}</TableCell><TableCell className="text-right tabular-nums">{index ? '834' : '1,314'}</TableCell><TableCell className="text-sm text-muted-foreground">{index?'Yesterday, 4:12 PM':'12 min ago'}</TableCell><TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button></TableCell></TableRow>)}</TableBody></Table><div className="border-t px-4 py-2 text-xs text-muted-foreground">Showing {visible.length} workflows · Run history and enrollment counts are prototype data until the workflow runtime lands.</div></div>
  </div>;
}
