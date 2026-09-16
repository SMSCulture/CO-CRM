import Link from 'next/link';
import { ArrowRight, BarChart3, HeartHandshake, MessageCircle, RefreshCcw, UserRoundSearch, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const reports = [
 { title:'Retention', description:'First-time, repeat, superfan and churn-risk movement.', icon:RefreshCcw, href:'/dashboard/crm/retention', status:'Prototype' },
 { title:'Constituent profile', description:'Lifecycle, interests, consent and relationship context.', icon:UserRoundSearch, href:'/dashboard/crm/contacts', status:'Prototype' },
 { title:'Campaign response', description:'Audience delivery, engagement and follow-up segments.', icon:MessageCircle, href:'/dashboard/marketing/campaigns', status:'Backend pending' },
 { title:'Customer service', description:'Open access needs, cases and resolution trends.', icon:HeartHandshake, href:'/dashboard/crm/tasks', status:'Prototype' },
 { title:'Audience growth', description:'Acquisition sources, consent health and list movement.', icon:UsersRound, href:'/dashboard/crm/segments', status:'Backend pending' },
 { title:'Board report', description:'A concise pack of retention, growth and promotion use.', icon:BarChart3, href:'/dashboard/crm/retention', status:'Print ready' },
] as const;
export default function AnalyticsPage(){return <div className="space-y-6"><div><Badge className="mb-2 bg-co-blue/10 text-co-blue hover:bg-co-blue/10">Curated reports</Badge><h1 className="text-3xl font-bold">Insights</h1><p className="mt-1 text-muted-foreground">Start with common arts workflows, then open the people behind every signal.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{reports.map(report=><Card key={report.title} className="rounded-2xl"><CardHeader><div className="flex items-start justify-between"><span className="rounded-xl bg-co-blue/10 p-3 text-co-blue"><report.icon className="h-5 w-5"/></span><Badge variant="outline">{report.status}</Badge></div><CardTitle className="pt-3 text-lg">{report.title}</CardTitle></CardHeader><CardContent><p className="min-h-10 text-sm text-muted-foreground">{report.description}</p><div className="mt-5 flex gap-2"><Button asChild variant="outline" size="sm"><Link href={report.href}>View report</Link></Button><Button asChild variant="ghost" size="sm" className="text-co-blue"><Link href="/dashboard/crm/segments">View contacts<ArrowRight className="ml-1 h-3.5 w-3.5"/></Link></Button></div></CardContent></Card>)}</div><p className="text-xs text-muted-foreground">Scheduled delivery and a general BI designer remain later work. Data freshness is shown inside each connected report.</p></div>}
