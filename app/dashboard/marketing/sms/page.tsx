'use client';
import { useMemo, useState } from 'react';
import { AlertTriangle, MessageSquareText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function SmsPage() {
 const [body,setBody]=useState('');
 const encoding=/[^\x00-\x7F]/.test(body)?'Unicode':'GSM-7';
 const limit=encoding==='Unicode'?70:160;
 const units=Math.max(1,Math.ceil(body.length/limit));
 const estimate=useMemo(()=>`Provider quote required for ${units} message unit${units===1?'':'s'} per recipient.`,[units]);
 return <div className="space-y-6"><div><h2 className="text-2xl font-bold">SMS drafts</h2><p className="mt-1 text-sm text-muted-foreground">Brevo-ready planning with consent and cost gates. Live sending is disabled.</p></div><div className="grid gap-4 lg:grid-cols-[1fr_340px]"><Card className="rounded-2xl"><CardHeader><CardTitle className="text-base">Message</CardTitle></CardHeader><CardContent className="space-y-4"><Textarea rows={8} value={body} onChange={e=>setBody(e.target.value)} placeholder="Write a short, useful message…"/><div className="flex justify-between text-xs text-muted-foreground"><span>{body.length} characters · {encoding}</span><span>{units} unit{units===1?'':'s'} / recipient</span></div><Button disabled className="w-full">Send disabled until backend and provider preflight are live</Button></CardContent></Card><div className="space-y-4"><Card className="rounded-2xl"><CardContent className="space-y-3 p-5 text-sm"><p className="flex gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-emerald-600"/>Required before send</p><ul className="list-disc space-y-1 pl-5 text-muted-foreground"><li>SMS consent and suppression</li><li>Quiet hours by recipient timezone</li><li>Brevo balance and current country rate</li><li>Exact eligible and excluded counts</li></ul></CardContent></Card><Card className="rounded-2xl border-amber-300 bg-amber-50"><CardContent className="p-5 text-sm text-amber-950"><p className="flex gap-2 font-semibold"><AlertTriangle className="h-4 w-4"/>Cost status</p><p className="mt-2">{estimate}</p></CardContent></Card><Card className="rounded-2xl"><CardContent className="flex items-center gap-3 p-5 text-sm"><MessageSquareText className="h-5 w-5 text-co-blue"/><span>Drafts stay local in this frontend proof.</span></CardContent></Card></div></div></div>;
}
