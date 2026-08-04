import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  trend?: { direction: "up" | "down"; label: string };
}

export function MetricCard({ label, value, trend }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      {trend && (
        <p className={cn("mt-1 text-xs font-medium", trend.direction === "up" ? "text-success" : "text-destructive")}>
          {trend.direction === "up" ? "↑" : "↓"} {trend.label}
        </p>
      )}
    </div>
  );
}
