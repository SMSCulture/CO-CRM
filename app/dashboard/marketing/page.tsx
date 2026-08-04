import { MarketingIntroPanel } from "./components/marketing-intro-panel";

export default function MarketingDashboardPage() {
  return (
    <div className="space-y-6">
      <MarketingIntroPanel
        title="Reach Your Audience"
        description="Use CultureOwl's marketing tools to communicate with the contacts connected to your organization."
        items={[
          { label: "Send email campaigns", href: "/dashboard/marketing/campaigns" },
          { label: "Select CRM segments", href: "/dashboard/crm/segments" },
          { label: "Build templates", href: "/dashboard/marketing/templates" },
          { label: "Create tracked links", href: "/dashboard/marketing/links-tracking" },
          "Schedule campaigns",
          "View opens, clicks, purchases and revenue",
          { label: "Automate with Workflows", href: "/dashboard/workflows" },
        ]}
        accent="blue"
      />

      <p className="rounded-xl bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Your Marketing</span> helps you reach the audience you
        already have. Looking to extend your reach through CultureOwl&apos;s own network? See{" "}
        <span className="font-semibold text-foreground">CultureOwl Promotion</span> in the sidebar.
      </p>
    </div>
  );
}
