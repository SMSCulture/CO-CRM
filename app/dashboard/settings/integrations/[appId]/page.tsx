"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INTEGRATION_APPS, INTEGRATION_CATEGORY_LABELS } from "@/lib/data/integrations";
import { AppIcon } from "../components/app-icon";

const LOGO_COLORS: Record<string, string> = {
  "meta-ads": "1877F2",
  youtube: "FF0000",
  "spotify-ads": "1DB954",
  hubspot: "FF7A59",
  salesforce: "00A1E0",
  mailchimp: "FFE01B",
  klaviyo: "000000",
  "event-calendar": "8B5CF6",
};

function galleryImages(appId: string) {
  const color = LOGO_COLORS[appId] ?? "6366F1";
  return [
    `https://placehold.co/800x450/${color}/ffffff?text=Dashboard`,
    `https://placehold.co/800x450/${color}/ffffff?text=Analytics`,
    `https://placehold.co/800x450/${color}/ffffff?text=Settings`,
    `https://placehold.co/800x450/${color}/ffffff?text=Integration`,
  ];
}

export default function IntegrationDetailPage() {
  const params = useParams<{ appId: string }>();
  const router = useRouter();
  const [imageIndex, setImageIndex] = useState(0);

  const app = INTEGRATION_APPS.find((a) => a.id === params.appId);

  if (!app) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" className="gap-2" onClick={() => router.push("/dashboard/settings/integrations")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Integrations
        </Button>
        <p className="text-sm text-muted-foreground">App not found.</p>
      </div>
    );
  }

  const images = galleryImages(app.id);
  const next = () => setImageIndex((i) => (i + 1) % images.length);
  const prev = () => setImageIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => router.push("/dashboard/settings/integrations")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Integrations
      </Button>

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="p-6">
          <div className="flex items-start gap-5">
            <AppIcon logo={app.logo} size="xl" />
            <div className="flex-1">
              <span className="text-sm font-medium text-co-blue">{INTEGRATION_CATEGORY_LABELS[app.category]}</span>
              <h1 className="font-display text-3xl font-bold text-foreground">{app.name}</h1>
              <p className="mb-4 mt-1 text-foreground">{app.description}</p>
              <Button>Get app info</Button>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[imageIndex]} alt={`${app.name} screenshot ${imageIndex + 1}`} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button onClick={prev} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-muted-foreground">
              {imageIndex + 1}/{images.length}
            </span>
            <button onClick={next} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Features</h2>
        <p className="mb-6 leading-relaxed text-foreground">{app.longDescription}</p>

        <div className="space-y-6">
          {app.features.map((feature) => (
            <div key={feature.title}>
              <h3 className="mb-1 font-semibold text-foreground">{feature.title}</h3>
              <p className="text-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-2">
          {app.featuresList.map((item) => (
            <li key={item} className="text-foreground">
              • {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
