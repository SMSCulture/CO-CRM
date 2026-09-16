'use client';

import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { BadgeDollarSign, DatabaseZap, Mail, Megaphone, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { INTEGRATION_APPS, INTEGRATION_CATEGORY_LABELS } from '@/lib/data/integrations';
import { AppCard } from './components/app-card';
import { GET_INTEGRATION_STATUS } from '@/lib/graphql/integration-status';
import { ConnectionCard } from './components/connection-card';

interface CompanyIntegrationState { id: string; name: string; stripeId?: string | null; hubspotId?: string | null }

export default function IntegrationsPage() {
  const { data, loading, error } = useQuery<{ myCompanies: CompanyIntegrationState[] }>(GET_INTEGRATION_STATUS);
  const company = data?.myCompanies?.[0];
  const [query, setQuery] = useState('');
  const apps = useMemo(() => INTEGRATION_APPS.filter((app) => `${app.name} ${app.description}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return <div className="space-y-6">
    <div><h2 className="text-2xl font-bold">Connect your tools</h2><p className="text-sm text-muted-foreground">Connect once here. Use them every day in Marketing.</p></div>

    {loading && <div className="grid gap-3 lg:grid-cols-2"><Skeleton className="h-44" /><Skeleton className="h-44" /><Skeleton className="h-44" /><Skeleton className="h-44" /></div>}

    {!loading && !error && !company && <Alert><AlertTitle>No company account found</AlertTitle><AlertDescription>Link this user to a company before checking organization integrations.</AlertDescription></Alert>}

    {company && <>
      <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3"><div><p className="text-sm font-semibold">{company.name}</p><p className="text-xs text-muted-foreground">Primary company returned by the current account</p></div><span className="text-xs text-muted-foreground">Live account state</span></div>
      <div className="grid gap-3 lg:grid-cols-2">
        <ConnectionCard name="Stripe" icon={BadgeDollarSign} status={company.stripeId ? 'connected' : 'unavailable'} description="Company billing and payment customer." detail={company.stripeId ? 'A Stripe customer ID is stored for this company. Payout and tax onboarding are a separate ticketing project.' : 'No Stripe customer ID is stored for this company. This page does not create an account.'} />
        <ConnectionCard name="HubSpot" icon={DatabaseZap} status={company.hubspotId ? 'connected' : 'unavailable'} description="Legacy external CRM link." detail={company.hubspotId ? 'A HubSpot company ID is stored. The backend bundle exposes a HubSpot sync service, but not user-facing connection controls.' : 'No HubSpot company ID is stored. CultureOwl CRM remains the target system of record.'} />
        <ConnectionCard name="Brevo" icon={Mail} status="platform" description="CultureOwl email transport." detail="The backend includes Brevo campaign and contact services. Its provider account status is server-managed and is not exposed to company users by the current API." />
        <ConnectionCard name="Ad platforms" icon={Megaphone} status="unavailable" description="Meta, Google and TikTok audience activation." detail="No company connection-state API is present in the supplied backend contract. These cannot be shown as connected or enabled yet." />
      </div>
      <Alert><AlertTitle>Connection controls still need backend contracts</AlertTitle><AlertDescription>OAuth setup, token health, last sync, field mapping, disconnect and error recovery are not exposed by the current API. The statuses above only use verified company fields and module availability.</AlertDescription></Alert>
    </>}
    <section className="space-y-4"><div className="flex flex-wrap items-end justify-between gap-3"><div><h3 className="text-lg font-bold">Integrations</h3></div><div className="relative w-full sm:w-72"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search integrations" className="pl-9"/></div></div>{Object.entries(INTEGRATION_CATEGORY_LABELS).map(([category,label]) => { const matches=apps.filter((app)=>app.category===category); return matches.length ? <div key={category}><p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p><div className="grid gap-3 md:grid-cols-2">{matches.map((app)=><AppCard key={app.id} app={app}/>)}</div></div> : null; })}</section>
  </div>;
}
