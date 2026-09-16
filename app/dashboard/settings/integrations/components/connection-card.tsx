import { CheckCircle2, CircleDashed, LockKeyhole, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export type ConnectionStatus = 'connected' | 'platform' | 'unavailable';

const STATUS = {
  connected: { label: 'Connected', icon: CheckCircle2, className: 'bg-emerald-100 text-emerald-800' },
  platform: { label: 'Platform managed', icon: LockKeyhole, className: 'bg-blue-100 text-blue-800' },
  unavailable: { label: 'Setup unavailable', icon: CircleDashed, className: 'bg-slate-100 text-slate-700' },
} as const;

export function ConnectionCard({ name, description, status, icon: Icon, detail }: { name: string; description: string; status: ConnectionStatus; icon: LucideIcon; detail: string }) {
  const statusView = STATUS[status];
  const StatusIcon = statusView.icon;
  return <Card className="rounded-xl"><CardContent className="p-5"><div className="flex items-start gap-4"><span className="rounded-xl bg-muted p-3"><Icon className="h-5 w-5" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">{name}</h3><Badge className={statusView.className}><StatusIcon className="mr-1 h-3 w-3" />{statusView.label}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{description}</p><p className="mt-3 rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">{detail}</p></div></div></CardContent></Card>;
}
