# CO CRM

Patron Intelligence / CRM for CultureOwl arts and culture organizations — contacts, segments, tags, campaigns, and analytics.

Built on the exact same stack as [`cultureowl_front`](https://github.com/SMSCulture/cultureowl_front): Next.js 15 App Router, TypeScript, Tailwind + shadcn/ui, Zustand, Apollo Client through a BFF proxy, Plus Jakarta Sans, and CultureOwl's brand color tokens. See `/Users/sean/.claude/plans/golden-strolling-cloud.md` (or ask for a copy) for the full dev plan this was built from.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev                  # http://localhost:3000 (or next available port)
```

## Navigation / IA

Flat top-level sidebar: **Dashboard, Events, Ticketing, CRM, Marketing, Analytics, Settings.** CRM and Marketing are each a single sidebar item that opens onto a page with its own top tab bar (same pattern the original Lovable prototype used for its "Marketing" hub, just split into two hubs instead of one):

- **CRM** (`/dashboard/crm/*`) — tabs: Contacts | Segments | Tags | Data & Properties. The audience database and relationship layer.
- **Marketing** (`/dashboard/marketing/*`) — tabs: Campaigns | Email & eScoops | Social | Banners & Featured | Cultural Stories | Links & Tracking | Templates. A note under the page header spells out which tabs send directly to your own contact list (**Campaigns**, **Templates**) vs. which are CultureOwl-managed channels that use your audience as a *targeting brief* rather than a direct send list (everything else).

**Note on auth right now:** `app/dashboard/layout.tsx` has auth temporarily bypassed for local visual preview — the real `<ProtectedPage>` wrapper still lives in `components/protected-page.tsx` and just needs to go back around `{children}` (see the TODO comment in `app/dashboard/layout.tsx`) before testing real role gating.

## What's real vs. stubbed

**Fully working:**
- Auth — OTP request/verify, JWT httpOnly cookie session, `/api/graphql` BFF proxy, role-based `<ProtectedPage>` gating. Ported directly from `cultureowl_front`, not rebuilt (currently bypassed in the dashboard layout for local preview — see note above).
- Design system — same color tokens, same Plus Jakarta Sans font, same shadcn/ui primitives, same look & feel as `cultureowl_front`'s dashboard theme.
- Dashboard shell — sidebar nav, protected `/dashboard/*` routes.
- **Tags** (`app/dashboard/crm/tags/`) — full CRUD UI (create/rename/delete, search, color swatches). The reference pattern every other module follows.
- **Contacts** (`app/dashboard/crm/contacts/`) — list UI on mock data (same 8-contact roster as the original prototype): search, activity-based filters (Buyers/Attendees/Followers/Subscribers/New/Returning/Inactive), table (Contact, Tags, Location, Lifetime Spend, Events Purchased, Events Attended, Last Active).
- **Segments** (`app/dashboard/crm/segments/`) — list + detail on mock data, plus a working **2-step segment builder drawer** ("New Segment" → right-side Sheet): Step 1 groups filters (Engagement, Interests, Orders, Demographics, Marketing, Tags, History) with a live (mock) match count; Step 2 names/describes the segment and reviews before creating. The mock match-count math is illustrative only — there's no real filter evaluation against real contact data yet.
- **Campaigns** (`app/dashboard/marketing/campaigns/`) — "New Campaign" opens a real 5-step accordion builder (Target Audience, Subject & Sender, Email Content, Scheduling, Review & Send). Step 1 (Target Audience) is fully functional: campaign name, email type (Promotional/Practical), send to all contacts or a saved segment. Steps 2–5 are placeholder panels.
- **Real segment→campaign handoff.** A segment's "Create Campaign" button links to `/dashboard/marketing/campaigns?segment=<id>`, which opens the builder directly with that segment preselected in Step 1. (Reverse direction — starting in Marketing and picking a segment — works too, since Step 1's segment picker is always available.)

**Stubbed (placeholder pages only):** Data & Properties, Email & eScoops, Social, Banners & Featured, Cultural Stories, Links & Tracking, Templates, Analytics, Events, Ticketing, Settings.

## Deferred — product direction, not yet built

1. **Real filter evaluation.** The segment builder's match count and the Contacts activity filters are illustrative mock logic, not real evaluation against contact data — there's no real contact schema yet (see below).
2. **Org-owned vs. CultureOwl-managed privacy model, enforced.** The Marketing page's header note makes the distinction visible to the user; the actual mechanics (CultureOwl extending a campaign to its broader network without exposing non-connected users' identities) aren't implemented anywhere.
3. **Marketing Services tab.** A browsable upsell catalog of CultureOwl promotional services (article inclusion, push notifications, etc.), loosely inspired by [Fever Partners' services catalog](https://feverpartners.zendesk.com/hc/en-us/articles/24437837517714-Services). Explicitly a work-in-progress idea, not spec'd enough to build yet.

## The one open problem: no confirmed CRM schema yet

`cultureowl_front` already has a `tags` GraphQL type — but it's for **event/genre content tags** (type, mainGenre, color, used to categorize events/venues), not CRM contact labels like "VIP" or "Donor." Every mock-data hook in this repo (`use-tags-data.ts`, `use-contacts-data.ts`, `use-segments-data.ts`) uses local component state as a stand-in, with schema shapes that are reasonable guesses, not confirmed ones.

**Before wiring any of this to real data**, the backend team needs to confirm:
1. Do CRM "Contacts" map onto the existing `CULTURAL_MEMBER` cultural-users concept, or are they a new entity?
2. Are contacts scoped per-company (each arts org sees only their own), or CultureOwl-wide?
3. What (if anything) already exists for segments/campaigns/CRM-tags vs. what needs new schema/resolvers?

Once that's answered, swap each `use-*-data.ts` hook's local-state functions for real `useQuery`/`useMutation` calls (see `cultureowl_front`'s `app/dashboard/tags/hooks/use-tags-data.ts` and `lib/graphql/tags.ts` for the exact pattern to follow, even though the underlying entity differs) — the UI layer doesn't need to change, only the data layer.

## Reference

For the full functional spec (what Contacts/Segments/Campaigns/Analytics should do), see the original Lovable prototype docs the product spec was translated from — ask for `PROJECT_SOURCE_OF_TRUTH.md` / `PROJECT_OVERVIEW.md` if you don't have them.
