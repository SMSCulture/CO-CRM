'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Plus, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const seed = [
  { id: 1, contact: 'Maya Rodriguez', title: 'Follow up after first visit', due: 'Today', type: 'Stewardship', done: false },
  { id: 2, contact: 'Jordan Lee', title: 'Confirm accessibility preference', due: 'Today', type: 'Service', done: false },
  { id: 3, contact: 'Alex Morgan', title: 'Invite to member preview', due: 'Tomorrow', type: 'Stewardship', done: false },
];
export default function TasksPage() {
 const [tasks,setTasks]=useState(seed);
 return <div className="space-y-6"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold">Tasks & service</h2><p className="mt-1 text-sm text-muted-foreground">Shared follow-ups without pretending a fundraising backend exists.</p></div><Button className="gap-2"><Plus className="h-4 w-4" />New task</Button></div><div className="space-y-3">{tasks.map(task=><Card key={task.id} className="rounded-xl"><CardContent className="flex items-center gap-4 p-4"><button onClick={()=>setTasks(items=>items.map(item=>item.id===task.id?{...item,done:!item.done}:item))} aria-label={task.done?'Reopen task':'Complete task'}>{task.done?<CheckCircle2 className="h-5 w-5 text-emerald-600"/>:<Circle className="h-5 w-5 text-slate-400"/>}</button><div className="min-w-0 flex-1"><p className={task.done?'text-sm line-through text-muted-foreground':'text-sm font-semibold'}>{task.title}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><UserRound className="h-3 w-3"/>{task.contact}</p></div><Badge variant="outline">{task.type}</Badge><span className="w-20 text-right text-sm text-muted-foreground">{task.due}</span></CardContent></Card>)}</div></div>;
}
