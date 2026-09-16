import Link from 'next/link';
import { ArrowRight, Download, RefreshCw, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cohorts = [
  { name: 'First-time', count: 684, rate: '28%', change: '+4.2%', tone: 'text-emerald-700' },
  { name: 'Multi-buyer', count: 391, rate: '52%', change: '+1.8%', tone: 'text-emerald-700' },
  { name: 'Superfans', count: 124, rate: '78%', change: '+6.1%', tone: 'text-emerald-700' },
  { name: 'Churn risk', count: 207, rate: '19%', change: '-3.5%', tone: 'text-rose-700' },
];

export default function RetentionPage() {
  return <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-bold">Retention</h2><p className="mt-1 text-sm text-muted-foreground">Prototype cohorts until the company contact and order APIs are available.</p></div><Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Board print</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cohorts.map((cohort) => <Card key={cohort.name} className="rounded-2xl"><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-sm font-medium text-muted-foreground">{cohort.name}</p>{cohort.name === 'Churn risk' ? <TrendingDown className="h-4 w-4 text-rose-600" /> : <TrendingUp className="h-4 w-4 text-emerald-600" />}</div><p className="mt-3 text-3xl font-bold">{cohort.count}</p><p className="mt-1 text-sm"><span className="font-semibold">{cohort.rate}</span> repeat rate <span className={cohort.tone}>{cohort.change}</span></p><Link href="/dashboard/crm/segments" className="mt-4 flex items-center gap-1 text-sm font-semibold text-co-blue">View audience <ArrowRight className="h-3.5 w-3.5" /></Link></CardContent></Card>)}</div>
    <div className="grid gap-4 lg:grid-cols-2"><Card className="rounded-2xl"><CardHeader><CardTitle className="text-base">First visit to repeat visit</CardTitle></CardHeader><CardContent><div className="space-y-4">{[['Within 30 days', 44], ['Within 90 days', 63], ['Within 12 months', 78]].map(([label, value]) => <div key={String(label)}><div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-co-blue" style={{ width: `${value}%` }} /></div></div>)}</div></CardContent></Card><Card className="rounded-2xl"><CardHeader><CardTitle className="text-base">How the model works</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground"><p><Users className="mr-2 inline h-4 w-4" />Lifecycle groups use purchase, attendance and recency signals.</p><p><RefreshCw className="mr-2 inline h-4 w-4" />Live refresh needs company-scoped contacts and ticketing data. Ticketing connections remain on hold.</p><Button asChild variant="outline"><Link href="/dashboard/crm/segments">Refine in Segments</Link></Button></CardContent></Card></div>
  </div>;
}
