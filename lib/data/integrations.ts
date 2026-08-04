export interface AppFeature {
  title: string;
  description: string;
}

export interface IntegrationApp {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: "marketing" | "crm" | "email" | "website";
  isFeatured: boolean;
  logo: string;
  features: AppFeature[];
  featuresList: string[];
}

export const INTEGRATION_APPS: IntegrationApp[] = [
  {
    id: "meta-ads",
    name: "Meta Ads",
    description: "Promote your events across Facebook & Instagram",
    longDescription:
      "Connect your events to Meta Ads and reach billions of potential attendees on Facebook and Instagram. Create targeted campaigns, retarget website visitors, and track conversions with ease.",
    category: "marketing",
    isFeatured: true,
    logo: "meta",
    features: [
      { title: "Audience Targeting", description: "Reach the right people with advanced demographic and interest targeting" },
      { title: "Conversion Tracking", description: "Track ticket sales and measure campaign ROI automatically" },
      { title: "Retargeting", description: "Re-engage visitors who viewed but didn't purchase tickets" },
    ],
    featuresList: ["Automatic event sync", "Custom audience creation", "Real-time analytics", "A/B testing support"],
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Promote your shows on YouTube",
    longDescription:
      "Leverage YouTube's massive audience to promote your events through video ads, channel integrations, and live streaming capabilities.",
    category: "marketing",
    isFeatured: false,
    logo: "youtube",
    features: [
      { title: "Video Ads", description: "Create compelling video ads that play before, during, or after content" },
      { title: "Channel Integration", description: "Sync your events with your YouTube channel automatically" },
      { title: "Live Streaming", description: "Stream your events live to reach global audiences" },
    ],
    featuresList: ["TrueView ad formats", "Audience targeting", "Performance analytics", "Brand awareness campaigns"],
  },
  {
    id: "spotify-ads",
    name: "Spotify Advertising",
    description: "Reach listeners with audio ads",
    longDescription:
      "Connect with your target audience through audio ads on Spotify. Perfect for promoting concerts, festivals, and music events to engaged listeners.",
    category: "marketing",
    isFeatured: false,
    logo: "spotify",
    features: [
      { title: "Audio Ads", description: "Deliver your message through immersive audio experiences" },
      { title: "Playlist Targeting", description: "Target users based on their listening preferences and moods" },
      { title: "Cross-Device Reach", description: "Reach listeners on mobile, desktop, and connected devices" },
    ],
    featuresList: ["Genre-based targeting", "Demographic filters", "Real-time reporting", "Brand lift studies"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Track leads and manage outreach",
    longDescription:
      "Sync your event attendees with HubSpot CRM to nurture leads, track engagement, and automate follow-up campaigns for better conversion rates.",
    category: "crm",
    isFeatured: false,
    logo: "hubspot",
    features: [
      { title: "Contact Sync", description: "Automatically sync attendee data to your HubSpot contacts" },
      { title: "Lead Scoring", description: "Score leads based on event engagement and ticket purchases" },
      { title: "Workflow Automation", description: "Trigger automated workflows based on event actions" },
    ],
    featuresList: ["Two-way sync", "Custom field mapping", "Engagement tracking", "Pipeline integration"],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Sync contacts and opportunities",
    longDescription:
      "Integrate your events with Salesforce to track opportunities, manage customer relationships, and drive revenue through seamless data synchronization.",
    category: "crm",
    isFeatured: false,
    logo: "salesforce",
    features: [
      { title: "Opportunity Tracking", description: "Create and track opportunities from event registrations" },
      { title: "Campaign Integration", description: "Link events to Salesforce campaigns for ROI tracking" },
      { title: "Custom Objects", description: "Sync event data to custom Salesforce objects" },
    ],
    featuresList: ["Real-time sync", "Custom mapping", "Report integration", "Mobile access"],
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email campaigns for your audience",
    longDescription:
      "Create beautiful email campaigns to promote your events. Sync attendee lists, send automated reminders, and track engagement with Mailchimp integration.",
    category: "email",
    isFeatured: true,
    logo: "mailchimp",
    features: [
      { title: "List Sync", description: "Automatically add attendees to your Mailchimp audience" },
      { title: "Email Templates", description: "Use event-specific templates for consistent branding" },
      { title: "Automation", description: "Set up automated email sequences for event reminders" },
    ],
    featuresList: ["Audience segmentation", "A/B testing", "Analytics dashboard", "Drag-and-drop editor"],
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    description: "Targeted email and SMS flows",
    longDescription:
      "Power your event marketing with Klaviyo's advanced email and SMS automation. Create personalized flows, segment your audience, and drive ticket sales.",
    category: "email",
    isFeatured: false,
    logo: "klaviyo",
    features: [
      { title: "Email Flows", description: "Build automated email sequences triggered by event actions" },
      { title: "SMS Marketing", description: "Send targeted SMS messages for time-sensitive announcements" },
      { title: "Segmentation", description: "Create dynamic segments based on purchase behavior" },
    ],
    featuresList: ["Predictive analytics", "Dynamic content", "Multi-channel flows", "Revenue attribution"],
  },
  {
    id: "event-calendar",
    name: "Events Calendar",
    description: "Add an events calendar to your website",
    longDescription:
      "Embed a beautiful, customizable events calendar on your website. Display upcoming events, let visitors browse by date or category, and drive ticket sales directly from your site.",
    category: "website",
    isFeatured: true,
    logo: "calendar",
    features: [
      { title: "Embeddable Widget", description: "Add the calendar to any website with a simple code snippet" },
      { title: "Customizable Design", description: "Match your brand with customizable colors and styles" },
      { title: "Real-Time Updates", description: "Calendar updates automatically when you add or change events" },
    ],
    featuresList: ["Month and list views", "Category filtering", "Mobile responsive", "Direct ticket links"],
  },
];

export const INTEGRATION_CATEGORY_LABELS: Record<IntegrationApp["category"], string> = {
  marketing: "Marketing & Promotion",
  crm: "CRM",
  email: "Email",
  website: "Website",
};

export const INTEGRATION_CATEGORY_ORDER: IntegrationApp["category"][] = ["marketing", "crm", "email", "website"];
