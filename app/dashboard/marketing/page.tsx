import { MarketingIntroPanel } from "./components/marketing-intro-panel";

export default function MarketingDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MarketingIntroPanel
          title="Reach Your Audience"
          description="Use CultureOwl's marketing tools to communicate with the contacts connected to your organization."
          items={[
            "Send email campaigns",
            "Select CRM segments",
            "Build templates",
            "Create tracked links",
            "Schedule campaigns",
            "View opens, clicks, purchases and revenue",
            "Add automations later",
          ]}
          accent="blue"
        />
        <MarketingIntroPanel
          title="Reach CultureOwl Audiences"
          description="Extend your visibility beyond your existing list through CultureOwl's network of local, high-intent culture lovers."
          items={[
            "Book an eScoop",
            "Request social promotion",
            "Add banner advertising",
            "Secure featured placement",
            "Request a cultural story",
            "Build a managed promotional campaign",
          ]}
          accent="purple"
        />
      </div>

      <p className="rounded-xl bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Your Marketing</span> helps you reach the audience you
        already have. <span className="font-semibold text-foreground">CultureOwl Promotion</span> helps you reach
        more people through our network.
      </p>
    </div>
  );
}
