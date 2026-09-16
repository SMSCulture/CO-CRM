'use client';

import { useQuery } from '@apollo/client';
import { AlertTriangle, BarChart3, PackageCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GET_MY_PROMOTION_COMPANIES, GET_PROMOTION_ASSET_USAGE } from '@/lib/graphql/company-promotion';

interface Company { id: string; name: string }
interface AssetCounter {
  assetType: string;
  totalAvailable: number;
  totalConsumed: number;
  totalRemaining: number;
  usagePercentage: number;
  isLowStock: boolean;
  isOutOfStock: boolean;
}
interface UsageReport {
  companyName: string;
  reportPeriod: string;
  totalAssetsAvailable: number;
  totalAssetsConsumed: number;
  overallUsagePercentage: number;
  assetCounters: AssetCounter[];
}

const PROMOTION_TYPES = new Set([
  'banners', 'lbhBanners', 'lbvBanners', 'escoopBanners', 'marquee',
  'genreBlue', 'genreBlue6', 'genreBlue12', 'genreGreen', 'genreGreen6',
  'genreGreen12', 'genreRed', 'escoops', 'escoopFeature', 'dedicated',
  'fbSocialBoost', 'fbSocialAd', 'fbCarousels', 'fbCovers', 'socialCarousel',
]);

const LABELS: Record<string, string> = {
  banners: 'Banners', lbhBanners: 'ROS banners', lbvBanners: 'Leaderboard banners',
  escoopBanners: 'eScoop banners', marquee: 'Marquee', genreBlue: 'Blue genre placement',
  genreBlue6: 'Blue genre - 6 months', genreBlue12: 'Blue genre - 12 months',
  genreGreen: 'Green genre placement', genreGreen6: 'Green genre - 6 months',
  genreGreen12: 'Green genre - 12 months', genreRed: 'Red genre placement',
  escoops: 'eScoop inclusions', escoopFeature: 'eScoop features', dedicated: 'Dedicated email',
  fbSocialBoost: 'Social inclusion', fbSocialAd: 'Social event boost',
  fbCarousels: 'Social ad/reel', fbCovers: 'Social story', socialCarousel: 'Social carousel',
};

export function PromotionCreditDashboard() {
  const companies = useQuery<{ myCompanies: Company[] }>(GET_MY_PROMOTION_COMPANIES);
  const company = companies.data?.myCompanies?.[0];
  const usage = useQuery<{ getAssetUsageReport: UsageReport }>(GET_PROMOTION_ASSET_USAGE, {
    variables: { companyId: company?.id ?? '' },
    skip: !company?.id,
  });

  if (companies.loading || usage.loading) return <div className="grid gap-3 sm:grid-cols-3"><Skeleton className="h-28" /><Skeleton className="h-28" /><Skeleton className="h-28" /></div>;
  if (companies.error || usage.error) return <Card className="border-amber-300 bg-amber-50"><CardContent className="flex gap-3 p-5 text-sm text-amber-950"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /><div><p className="font-semibold">Promotion credits are temporarily unavailable.</p><p className="mt-1">The catalog below is still available. No credit will be used until a request is reviewed.</p></div></CardContent></Card>;
  if (!company) return <Card><CardContent className="p-5 text-sm text-muted-foreground">No company is linked to this account, so promotion credits cannot be shown.</CardContent></Card>;

  const report = usage.data?.getAssetUsageReport;
  if (!report) return null;
  const counters = report.assetCounters.filter((counter) => PROMOTION_TYPES.has(counter.assetType));
  const available = counters.reduce((sum, counter) => sum + counter.totalAvailable, 0);
  const consumed = counters.reduce((sum, counter) => sum + counter.totalConsumed, 0);
  const remaining = counters.reduce((sum, counter) => sum + counter.totalRemaining, 0);

  return <section className="space-y-4" aria-labelledby="credit-heading">
    <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-co-purple">Live from your plan</p><h3 id="credit-heading" className="mt-1 text-xl font-bold">Promotion credits</h3><p className="text-sm text-muted-foreground">{report.companyName} · {report.reportPeriod}</p></div><p className="text-xs text-muted-foreground">Requests do not spend a credit until approved.</p></div>
    <div className="grid gap-3 sm:grid-cols-3">
      <Metric icon={PackageCheck} label="Available" value={available} />
      <Metric icon={BarChart3} label="Used" value={consumed} />
      <Metric icon={PackageCheck} label="Remaining" value={remaining} />
    </div>
    {counters.length > 0 && <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">{counters.map((counter) => <div key={counter.assetType} className="rounded-xl border border-border bg-white p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{LABELS[counter.assetType] ?? counter.assetType}</p><p className="text-xs text-muted-foreground">{counter.totalConsumed} used of {counter.totalAvailable}</p></div><span className={counter.isOutOfStock ? 'text-xs font-semibold text-destructive' : counter.isLowStock ? 'text-xs font-semibold text-amber-700' : 'text-xs font-semibold text-emerald-700'}>{counter.totalRemaining} left</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-co-purple" style={{ width: `${Math.min(100, counter.usagePercentage)}%` }} /></div></div>)}</div>}
  </section>;
}

function Metric({ icon: Icon, label, value }: { icon: typeof PackageCheck; label: string; value: number }) {
  return <Card><CardContent className="flex items-center gap-4 p-5"><span className="rounded-xl bg-co-purple/10 p-3 text-co-purple"><Icon className="h-5 w-5" /></span><div><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div></CardContent></Card>;
}
