// Minimal inline SVG approximations for pixel-provider marks — not exact
// brand logos, just enough visual distinction to tell the six types apart
// at a glance in this internal tool.

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 3c.3 1.9 1.6 3.4 3.5 3.7v2.6c-1.3 0-2.5-.4-3.5-1.1v6.4a5.4 5.4 0 1 1-4.6-5.3v2.7a2.7 2.7 0 1 0 2 2.6V3h2.6Z" />
    </svg>
  );
}

export function GoogleAdsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M9 3 3 15h4l6-12H9Z" fill="#4285F4" />
      <path d="M15 3 21 15h-4L11 3h4Z" fill="#FBBC04" />
      <circle cx="7" cy="19" r="2.5" fill="#34A853" />
    </svg>
  );
}

export function GoogleAnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="4" y="14" width="4" height="7" rx="1" fill="#F9AB00" />
      <rect x="10" y="9" width="4" height="12" rx="1" fill="#E37400" />
      <rect x="16" y="3" width="4" height="18" rx="1" fill="#FBBC04" />
    </svg>
  );
}
