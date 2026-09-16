'use client';

import { useQuery } from '@apollo/client';
import { BadgeDollarSign, DatabaseZap, Mail, Megaphone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { GET_INTEGRATION_STATUS } from '@/lib/graphql/integration-status';
import { ConnectionCard } from './components/connection-card';

interface CompanyIntegrationState { id: string; name: string; stripeId?: string | null; hubspotId?: string | null }

export default function IntegrationsPage() {
  const { data, loading, error } = useQuery<{ myCompanies: CompanyIntegrationState[] }>(GET_INTEGRATION_STATUS);
  const company = data?.myCompanies?.[0];

  return <div className="space-y-6">
    <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-co-blue">Settings</p><h2 className="mt-1 text-3xl font-bold">Integrations</h2><p className="mt-1 text-muted-foreground">Current connection state from the company account. Nothing here connects or spends without a reviewed setup flow.</p></div>

    {loading && <div className="grid gap-3 lg:grid-cols-2"><Skeleton className="h-44" /><Skeleton className="h-44" /><Skeleton className="h-44" /><Skeleton className="h-44" /></div>}
    {error && <Alert variant="destructive"><AlertTitle>Connection state is unavailable</AlertTitle><AlertDescription>The backend did not return the company integration fields. No connection was changed.</AlertDescription></Alert>}
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
  </div>;
}
