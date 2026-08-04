import Link from "next/link";
import { Check } from "lucide-react";

interface MarketingIntroItem {
  label: string;
  /** When present, the item is a real link into a built page instead of decorative text. */
  href?: string;
}

interface MarketingIntroPanelProps {
  title: string;
  description: string;
  items: (string | MarketingIntroItem)[];
  accent?: "blue" | "purple";
}

export function MarketingIntroPanel({ title, description, items, accent = "blue" }: MarketingIntroPanelProps) {
  const accentClass = accent === "blue" ? "bg-co-blue/10 text-co-blue" : "bg-co-purple/10 text-co-purple";

  return (
    <div className="rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((raw) => {
          const item: MarketingIntroItem = typeof raw === "string" ? { label: raw } : raw;
          const icon = (
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accentClass}`}>
              <Check className="h-3 w-3" />
            </span>
          );
          if (item.href) {
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-start gap-2.5 text-sm font-medium text-foreground hover:text-co-blue"
                >
                  {icon}
                  {item.label}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.label} className="flex items-start gap-2.5 text-sm text-foreground">
              {icon}
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
