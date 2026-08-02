"use client";

import { useState, type ComponentType } from "react";
import { X, Facebook, Target } from "lucide-react";
import { TikTokIcon, GoogleAdsIcon, GoogleAnalyticsIcon } from "../components/pixel-icons";

export type PixelTypeId = "x" | "meta" | "google-ads" | "google-analytics" | "simple-image" | "tiktok";

export interface PixelType {
  id: PixelTypeId;
  name: string;
  icon: ComponentType<{ className?: string }>;
  iconClassName: string;
}

export const PIXEL_TYPES: PixelType[] = [
  { id: "x", name: "X Pixel", icon: X, iconClassName: "text-foreground" },
  { id: "meta", name: "Meta Pixel", icon: Facebook, iconClassName: "text-[#1877F2] fill-[#1877F2]" },
  { id: "google-ads", name: "Google Ads", icon: GoogleAdsIcon, iconClassName: "" },
  { id: "google-analytics", name: "Google Analytics", icon: GoogleAnalyticsIcon, iconClassName: "" },
  { id: "simple-image", name: "Simple Image Pixel", icon: Target, iconClassName: "text-foreground" },
  { id: "tiktok", name: "TikTok Pixel", icon: TikTokIcon, iconClassName: "text-foreground" },
];

export type EventScope = "this" | "all";

export interface ConfiguredPixel {
  id: string;
  pixelTypeId: PixelTypeId;
  pixelId: string;
  eventScope: EventScope;
  conversionEvents: string[];
  serverSideEnabled: boolean;
}

export function useTrackingPixels() {
  const [pixels, setPixels] = useState<ConfiguredPixel[]>([]);

  function addPixel(input: Omit<ConfiguredPixel, "id">) {
    setPixels((prev) => [...prev, { ...input, id: crypto.randomUUID() }]);
  }

  function removePixel(id: string) {
    setPixels((prev) => prev.filter((p) => p.id !== id));
  }

  return { pixels, addPixel, removePixel };
}
