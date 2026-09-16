import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: { cpus: 1 },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cultureowl.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }]
            : []),
          {
            key: "Permissions-Policy",
            value: ["camera=()", "microphone=()", "geolocation=(self)", "interest-cohort=()"].join(", "),
          },
        ],
      },
    ];
  },
  serverExternalPackages: ["jose"],
};

const configuredNext = process.env.NEXT_PUBLIC_DEMO_MODE === "true"
  ? nextConfig
  : withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
  });

export default configuredNext;
