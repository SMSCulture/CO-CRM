import { Check } from "lucide-react";

interface MarketingIntroPanelProps {
  title: string;
  description: string;
  items: string[];
  accent?: "blue" | "purple";
}

export function MarketingIntroPanel({ title, description, items, accent = "blue" }: MarketingIntroPanelProps) {
  const accentClass = accent === "blue" ? "bg-co-blue/10 text-co-blue" : "bg-co-purple/10 text-co-purple";

  return (
    <div className="rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accentClass}`}>
              <Check className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
