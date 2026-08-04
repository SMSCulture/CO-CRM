interface AppIconProps {
  logo: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZE_CLASSES = { sm: "h-10 w-10", md: "h-12 w-12", lg: "h-16 w-16", xl: "h-24 w-24" };

/**
 * No real brand-logo assets are wired up yet — falls back to a 2-letter
 * placeholder per app until real assets are sourced.
 */
export function AppIcon({ logo, size = "md" }: AppIconProps) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-xl bg-muted ${SIZE_CLASSES[size]}`}>
      <span className="text-xs font-semibold uppercase text-muted-foreground">{logo.slice(0, 2)}</span>
    </div>
  );
}
