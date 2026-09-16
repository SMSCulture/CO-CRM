import Link from 'next/link';
import { ChevronRight, PlugZap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function SettingsPage() {
  return <div className="space-y-6"><div><h2 className="text-3xl font-bold">Settings</h2><p className="mt-1 text-muted-foreground">Company configuration and connected services.</p></div><Link href="/dashboard/settings/integrations"><Card className="transition-colors hover:border-co-blue/40"><CardContent className="flex items-center gap-4 p-5"><span className="rounded-xl bg-co-blue/10 p-3 text-co-blue"><PlugZap className="h-5 w-5" /></span><div className="flex-1"><p className="font-semibold">Integrations</p><p className="text-sm text-muted-foreground">Check Brevo, Stripe, HubSpot and ad-platform availability.</p></div><ChevronRight className="h-4 w-4 text-muted-foreground" /></CardContent></Card></Link></div>;
}
