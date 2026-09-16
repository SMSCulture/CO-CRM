# CultureOwl CRM UI/UX direction

Date: 2026-09-16

## Recommendation

Build CultureOwl as an arts-operations command center, not a generic CRM menu and not a copy of Tessitura's dense enterprise screens. Take Tessitura's role-ready dashboards and widget-to-list action, Spektrix's consent-first list builder, AudienceView's complete patron record, and Artelize's insight-to-recommended-action framing. Keep the blue, light-first system already proposed. The product's unique loop is: **see an audience signal -> open the people behind it -> save/refine a segment -> act through email/SMS/workflow/CultureOwl Promotion -> read attributed and retention results.**

## Proposed information architecture

### Primary left navigation

1. **Home** - role-specific command center and work queue.
2. **Audience** - Contacts, Households & Organizations, Segments, Retention, Imports, Tags & Fields.
3. **Engagement** - Campaigns, Templates, SMS, Workflows, Forms & Surveys.
4. **CultureOwl Promotion** - owned inventory, allowances, requests and delivery results.
5. **Insights** - Audience, Campaigns, Retention, Event Health, Board Reports, Saved Reports.
6. **Tasks** - stewardship, service cases, follow-ups and assignments.
7. **Settings** - team/roles, consent, sources, integrations, data health.

Do not show Ticketing or ticketing connectors as active navigation until its backend exists. Keep ticket-derived concepts visibly disabled/on hold in setup documentation, not mixed with working CRM actions.

### Global frame

- Left rail: stable product areas, collapsed option, active blue indicator.
- Top bar: company switcher, global search/command menu, create button, alerts/help, user.
- Page header: breadcrumb/eyebrow, title, as-of/data freshness, one primary action.
- View bar: saved view tabs, search, quick filters, advanced filter, columns, sort, density.
- Main canvas: table/dashboard/workflow.
- Right sheet: edit/create/configuration without losing list context.
- Selection bar: appears only after rows are selected; shows exact audience and permitted actions.

## Role home pages

A first sign-in asks the user's primary job, and admins can assign a default dashboard. Every dashboard includes 4-6 metrics, a work queue and one-click drill-down to a saved audience.

| Role | Default blocks | Primary action |
|---|---|---|
| Executive/board | retention, active patrons, campaign reach, CultureOwl allowance, data freshness | Open board report |
| Marketing | audience growth, first-time-to-repeat, upcoming sends, consent health, campaign response | Build campaign |
| Development/stewardship | superfans/prospects, tasks due, recent interactions, lapsed high-value patrons | Open task queue |
| Customer service | open cases, access needs, recent complaints, response time | Resolve case |
| Artistic/programming | event health, audience overlap, genre/market signals | Explore audience |

Unlike an unrestricted BI builder, start with curated dashboards. Later, allow rearranging blocks and saving views. A full query/ETL builder stays a separate hard decision.

## Core page hierarchy

### Audience list

Top: saved views such as All, First-time, Multi-buyer, Superfans, Churn Risk, SMS Eligible. Quick filters sit below; Advanced opens the segment builder. Table defaults to identity, lifecycle, last activity, spend, attendance, consent and owner. The first click opens a right-side quick view; name opens the full profile. Selected rows reveal Tag, Add to segment, Assign task, Email, SMS and Export, with unavailable actions explaining the missing consent/backend state.

### Patron profile

1. Sticky identity header: name, household/organization, lifecycle, engagement score, owner and contact actions.
2. Alert strip only for suppression, access needs, open service case or overdue task.
3. Summary cards: retention, attendance/purchase, communication consent, relationships.
4. Tabs: Timeline, Audience & Interests, Relationships, Tasks & Cases, Campaigns, Data & Consent.
5. Timeline filter by marketing, attendance, service, survey, note and system event.

This keeps AudienceView's completeness but avoids one giant configuration form.

### Segment builder

Use a three-stage rail based on Spektrix:

1. **Eligible base** - company scope and channel consent/suppression pre-filter. It cannot be accidentally removed from a send-bound segment.
2. **Audience rules** - nested AND/OR/NOT, grouped by lifecycle, engagement, events, geography, interests, tags, consent and relationships. Show live count, exclusions and sample contacts.
3. **Use it** - name/save, columns, refresh mode, then Email, SMS, Workflow, Report, CultureOwl Promotion or Export.

A plain research segment may include suppressed contacts; a marketing action applies and displays its channel pre-filter again. This preserves analysis without risking a send.

### Campaign/SMS flow

Use one campaign shell rather than separate competing builders:

1. Goal and channel.
2. Audience with eligible/excluded counts.
3. Content/template.
4. Sender, schedule and test.
5. Compliance and cost preflight.
6. Review. Send stays gated until backend, consent and provider state are live.

SMS must show characters, encoding, units per recipient, country/rate quote, total cost, balance and quote time. Email/SMS results return to the same campaign report and patron timeline.

### Insights and reports

Landing starts with curated cards: Retention, Cause & Effect, Constituent Profile, Customer Service, Campaign Response, Board Pack. Each report has filters across the top, a 2x2 or 3x2 chart grid, an as-of/provenance footer, and two actions: **View contacts** and **Save as segment**. Board Report opens a review screen for period, included blocks, definitions and notes before generating PDF. Scheduled delivery and custom widgets come later.

### Tasks and service

One shared work queue with tabs My Tasks, Team, Service Cases and Stewardship. Rows show contact, stage/type, due date, owner and last interaction. Opening a row shows contact context in a side panel so staff can act without navigating away. Gifts, pledges and financial benefits stay absent until that backend/project is approved.

### Setup

A six-step readiness checklist:

1. Organization/profile.
2. Team and roles.
3. Import contacts with review/deduplication.
4. Consent and suppression rules.
5. Email/SMS sender state and provider estimate availability.
6. First saved audience and dashboard.

Existing CultureOwl event/venue ingestion appears under Data Sources with its real PENDING moderation state. Ticketing integrations are labeled "On hold - ticketing backend required," with no Connect buttons.

## Daily workflows

### Marketing manager: turn churn into a campaign

Home Churn Risk card -> audience drawer with definition and freshness -> Save/refine segment -> SMS or Email -> consent/cost preflight -> review -> schedule/send when backend-enabled -> campaign report -> Save responders/non-responders as follow-up segments.

### Patron services: resolve an access request

Service queue -> open case side panel -> see contact preferences and event context -> add note/change status/assign follow-up -> resolved event lands on patron timeline and service dashboard.

### Executive: prepare a board meeting

Home Board Report -> choose period/compare-to -> review definitions and freshness -> include retention, audience growth, campaign response and CultureOwl Promotion -> preview -> PDF. Clicking any figure before export opens the underlying audience.

### Development: steward a superfan

Tasks -> due stewardship item -> patron quick view -> history/relationships/access preferences -> log interaction and next step. No donation amount or receipt flow until fundraising scope exists.

### Data manager: import a messy file

Audience > Imports -> upload/paste -> proposed structured mapping -> review confidence/warnings -> dry run -> duplicate/error resolution -> approve commit. AI never commits records itself.

## What to build before user testing

1. Navigation rename/grouping and role dashboard preset selector.
2. Saved audience views and the quick-view sheet.
3. Segment builder's Eligible Base / Rules / Use It structure, including NOT.
4. Unified Insights landing with View contacts / Save as segment on every report.
5. Shared Tasks/Service queue.
6. Setup/readiness checklist with truthful backend/source states.

Do not build the custom BI designer, ticketing connectors, live sends, payments, memberships, donor finance or predictive models before their backend/decision gates.

## Visual direction

- Light-first cool canvas, white data surfaces and CultureOwl blue for focus/selection/primary action.
- Dense but calm 56px table rows; 12-16px panel radii; minimal shadows.
- Charts use blue as the anchor and at most four semantic accents. Never use a rainbow dashboard by default.
- Tables and dashboards share the same saved-view/filter bar.
- Use short 120-220ms opacity/transform transitions and reduced-motion support.
- Keep configuration in right sheets; reserve full pages for deep profiles, dashboards and builders.
- Dark mode remains later, after every semantic token/chart/editor is verified. Do not ship partial inversion.

## Caveats

Public pages expose product patterns and selected screenshots, not every authenticated interaction. PatronManager has limited public UI evidence. AudienceView documentation demonstrates depth but also an older, section-heavy UI; it is a data-model reference more than a visual reference. Tessitura's BI designer is powerful, but CultureOwl should not make users design analytics before curated reports solve the common arts workflows.

## Sources

See `sources.md` in this research folder for the 11-source ledger and URLs.
