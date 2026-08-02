# CO CRM

Patron Intelligence / CRM for CultureOwl arts and culture organizations — contacts, segments, tags, campaigns, and analytics.

Built on the exact same stack as [`cultureowl_front`](https://github.com/SMSCulture/cultureowl_front): Next.js 15 App Router, TypeScript, Tailwind + shadcn/ui, Zustand, Apollo Client through a BFF proxy, Plus Jakarta Sans, and CultureOwl's brand color tokens. See `/Users/sean/.claude/plans/golden-strolling-cloud.md` (or ask for a copy) for the full dev plan this was built from.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev                  # http://localhost:3000 (or next available port)
```

## What's real vs. stubbed

**Fully working:**
- Auth — OTP request/verify, JWT httpOnly cookie session, `/api/graphql` BFF proxy, role-based `<ProtectedPage>` gating. Ported directly from `cultureowl_front`, not rebuilt. Points at the same backend — set `JWT_SECRET`/`JWT_REFRESH_SECRET` to the same values as `cultureowl_front` if you want a session created in one app to be valid in the other.
- Design system — same color tokens, same Plus Jakarta Sans font, same shadcn/ui primitives, same look & feel (rounded cards, soft shadows) as `cultureowl_front`'s dashboard theme.
- Dashboard shell — sidebar nav, protected `/dashboard/*` routes.
- **Tags module** (`app/dashboard/tags/`) — fully functional CRUD UI (create/rename/delete, search, color swatches), built as the reference implementation for every other module's pattern.

**Stubbed (placeholder pages only):** Contacts, Segments, Campaigns, Analytics. Each stub page explains what it needs before it can be built for real.

## The one open problem: no confirmed CRM schema yet

`cultureowl_front` already has a `tags` GraphQL type — but it's for **event/genre content tags** (type, mainGenre, color, used to categorize events/venues), not CRM contact labels like "VIP" or "Donor." The Tags module here uses local component state as a stand-in (`app/dashboard/tags/hooks/use-tags-data.ts`) with a schema shape that's a reasonable guess, not a confirmed one.

**Before building Contacts/Segments/Campaigns/Analytics for real**, the backend team needs to confirm:
1. Do CRM "Contacts" map onto the existing `CULTURAL_MEMBER` cultural-users concept, or are they a new entity?
2. Are contacts scoped per-company (each arts org sees only their own), or CultureOwl-wide?
3. What (if anything) already exists for segments/campaigns/CRM-tags vs. what needs new schema/resolvers?

Once that's answered, swap `use-tags-data.ts`'s local-state functions for real `useQuery`/`useMutation` calls (see `cultureowl_front`'s `app/dashboard/tags/hooks/use-tags-data.ts` and `lib/graphql/tags.ts` for the exact pattern to follow, even though the underlying entity is different) — the UI layer doesn't need to change, only the data layer.

## Reference

For the full functional spec (what Contacts/Segments/Campaigns/Analytics should do), see the original Lovable prototype docs the product spec was translated from — ask for `PROJECT_SOURCE_OF_TRUTH.md` / `PROJECT_OVERVIEW.md` if you don't have them.
