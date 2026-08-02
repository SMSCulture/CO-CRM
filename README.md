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

The sidebar is split into three top-level areas, deliberately not one flat "Marketing" bucket like the original Lovable prototype:

- **CRM** — Contacts, Segments, Tags. The audience database and relationship layer.
- **Your Marketing** — Email Campaigns, Templates. **Org-owned channels** — sends directly to the org's own CRM contacts.
- **CultureOwl Promotion** — eScoops, Social, Banners, Cultural Stories. **CultureOwl-managed distribution mechanisms** — these use a CRM segment as a *targeting brief*, not a direct send list; CultureOwl may extend reach to its broader matching network without exposing non-connected users' identities to the org. This is a fundamentally different mechanism from Your Marketing, which is why it's a separate nav section rather than a channel option inside one campaign builder.

**Note on auth right now:** `app/dashboard/layout.tsx` has auth temporarily bypassed for local visual preview — the real `<ProtectedPage>` wrapper still lives in `components/protected-page.tsx` and just needs to go back around `{children}` (see the TODO comment in `app/dashboard/layout.tsx`) before testing real role gating.

## What's real vs. stubbed

**Fully working:**
- Auth — OTP request/verify, JWT httpOnly cookie session, `/api/graphql` BFF proxy, role-based `<ProtectedPage>` gating. Ported directly from `cultureowl_front`, not rebuilt (currently bypassed in the dashboard layout for local preview — see note above). Points at the same backend — set `JWT_SECRET`/`JWT_REFRESH_SECRET` to the same values as `cultureowl_front` if you want a session created in one app to be valid in the other.
- Design system — same color tokens, same Plus Jakarta Sans font, same shadcn/ui primitives, same look & feel (rounded cards, soft shadows) as `cultureowl_front`'s dashboard theme.
- Dashboard shell — sidebar nav, protected `/dashboard/*` routes.
- **Tags module** (`app/dashboard/tags/`) — fully functional CRUD UI (create/rename/delete, search, color swatches), built as the reference implementation for every other module's pattern.
- **Contacts module** (`app/dashboard/contacts/`) — full list UI (search, tag-pill filters, table) running on mock data (`hooks/use-contacts-data.ts`), same 8-patron dataset as the original prototype.
- **Segments module** (`app/dashboard/segments/`) — list + detail view running on mock data (`hooks/use-segments-data.ts`). Detail page matches the specified layout (name/count/filters, Create Campaign/Export/Edit Segment buttons, audience summary, geography, interests). "Create Campaign" is a real link to Email Campaigns — it does not yet carry the segment selection as state (see Deferred below).

**Stubbed (placeholder pages only):** Email Campaigns, Templates, eScoops, Social, Banners, Cultural Stories, Analytics.

## Deferred — product direction, not yet built

1. **Real segment→campaign handoff.** Clicking "Create Campaign" on a segment should open Email Campaigns with that audience pre-selected (and the reverse: starting in Your Marketing and picking a CRM segment). Currently just navigates there with no state carried — see the TODO in `app/dashboard/campaigns/page.tsx`.
2. **Org-owned vs. CultureOwl-managed privacy model, enforced.** The nav split (Your Marketing vs. CultureOwl Promotion) makes the distinction visible; the actual mechanics aren't implemented anywhere yet.
3. **Marketing Services tab.** A browsable upsell catalog of CultureOwl promotional services (article inclusion, push notifications, etc.), loosely inspired by [Fever Partners' services catalog](https://feverpartners.zendesk.com/hc/en-us/articles/24437837517714-Services). Explicitly a work-in-progress idea, not spec'd enough to build yet.

## The one open problem: no confirmed CRM schema yet

`cultureowl_front` already has a `tags` GraphQL type — but it's for **event/genre content tags** (type, mainGenre, color, used to categorize events/venues), not CRM contact labels like "VIP" or "Donor." The Tags module here uses local component state as a stand-in (`app/dashboard/tags/hooks/use-tags-data.ts`) with a schema shape that's a reasonable guess, not a confirmed one.

**Before building Contacts/Segments/Campaigns/Analytics for real**, the backend team needs to confirm:
1. Do CRM "Contacts" map onto the existing `CULTURAL_MEMBER` cultural-users concept, or are they a new entity?
2. Are contacts scoped per-company (each arts org sees only their own), or CultureOwl-wide?
3. What (if anything) already exists for segments/campaigns/CRM-tags vs. what needs new schema/resolvers?

Once that's answered, swap `use-tags-data.ts`'s local-state functions for real `useQuery`/`useMutation` calls (see `cultureowl_front`'s `app/dashboard/tags/hooks/use-tags-data.ts` and `lib/graphql/tags.ts` for the exact pattern to follow, even though the underlying entity is different) — the UI layer doesn't need to change, only the data layer.

## Reference

For the full functional spec (what Contacts/Segments/Campaigns/Analytics should do), see the original Lovable prototype docs the product spec was translated from — ask for `PROJECT_SOURCE_OF_TRUTH.md` / `PROJECT_OVERVIEW.md` if you don't have them.
