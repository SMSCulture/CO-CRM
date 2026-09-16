# Audience Republic, Artelize and Ludus: honest CO-CRM parity audit

Date: 2026-09-16
Scope: current official public product pages/docs versus the actual CO-CRM stacked branch and exported co_api source.

## Verdict

Sean is right: CultureOwl does **not** currently have full Audience Republic, Artelize or Ludus parity, and it does not yet have a production CRM backend. It has a strong reviewable frontend direction, one real promotion-report integration, some existing platform services, and useful backend specifications. Most CRM records, segments, campaigns, workflow execution, analytics and task data are still prototype/local or absent.

The largest functional gaps are:

1. A company-scoped contact/household/activity backend and real consent history.
2. Ticket/order/contact ingestion, sync jobs and provider connection management.
3. Campaign delivery, workflow execution and ticket-revenue attribution.
4. Forms, presales, competitions, referrals and waitlists.
5. Ludus operational depth: ticketing/box office, memberships/passes, fundraising, classes, volunteers and transactions.
6. Artelize intelligence: benchmarks, demand/retention forecasting, repertoire/artist fit, donor intelligence, pricing optimization and generated execution assets.

Ticketing remains intentionally on hold because CultureOwl has no selected ticketing backend. That is correct product discipline, but it means Ludus parity cannot be claimed.

## Status key

- **REAL**: production code and current backend contract exist.
- **PROTOTYPE/SPEC**: UI, local state, BFF echo, dormant adapter or written backend design exists, but it is not a working production capability.
- **MISSING**: neither a working capability nor a sufficient implemented proof exists.

## What CultureOwl really has today

### REAL

- Dashboard authentication/BFF, dynamic permission utilities and existing company/team role infrastructure.
- Existing global CultureOwl users, user details, login events, favorites and global content/audience tags in co_api. These are **not** a company CRM.
- Existing global `subscribersPaginated` query with nine basic filters. It is not safely company-scoped.
- Existing company records, owner, company users/roles, Stripe and HubSpot identifiers, Brevo backend modules/services, S3/report infrastructure and AuditLog.
- Existing CultureOwl Promotion asset counters/history and `getAssetUsageReport`, shown in CO-CRM.
- A protected frontend shell and visually verified global IA, role Home, Insights and Tasks screens.

### PROTOTYPE/SPEC

- Eight mock contacts and local contact profiles/timelines/properties/tags.
- Local nested segment builder and preview evaluator. Counts and saved segments are not server-calculated.
- Email template UI; its save route returns a fake `stub-*` ID.
- Campaign builder with audience/content/schedule UX; no delivery backend.
- SMS composer with units/consent/cost requirements; live sending is deliberately disabled.
- Workflow graph authoring persisted locally; its BFF save route echoes a fake ID and no engine executes it.
- Retention, role dashboards, report presets, tasks/service/survey types and patron relationship/preferences are prototype data.
- Server-only AI import-map/copy-draft adapters with schemas; dormant until a provider is configured and still review-only.
- Detailed backend specs for Contact, Activity, Deal, CRM tags, segments, workflow graph, attribution, consent/import/capture and integration registry.
- Integrations screen showing verified company fields/module availability, but no connect/sync/reconnect controls.

### MISSING entirely

- Production company contacts, households, duplicate merge, contact owners, activity/correspondence history and custom CRM properties.
- Durable channel consent/suppression history and company-safe export.
- Production segment storage/evaluation/refresh/member pagination.
- Email/SMS campaign persistence, tests, scheduling, delivery, suppression, metrics and replies.
- Workflow runtime, enrollment, deduplication, timers, conditional execution, goals and node analytics.
- Ticket/order sync, ticket attribution, carts, purchases and refunds.
- Integration connections, secret references, cursors, webhooks, sync runs, mapping/reject queues and provider capability matrix.
- Data capture forms, presales, competitions, referral points/rewards and waitlists.
- Ad-audience sync and lookalikes.
- Predictive arts intelligence and external peer benchmarking.
- Donation/fundraising, memberships/passes, classes/guardians, volunteering, box office/seating/scanning, gift cards/add-ons, invoices and payout/tax operations.

## Audience Republic inventory and gap analysis

Official pages describe an event-marketing system built around synchronized ticket data, dynamic audiences and measurable execution.

| Audience Republic capability | Frontend/UX pattern | Backend needed | CO-CRM status |
|---|---|---|---|
| Unified audience CRM | One database for ticket buyers plus email/SMS subscribers; fan profiles | Contacts, identities, source/provenance, preferences | **PROTOTYPE/SPEC**. Mock contacts only; global subscribers are not an org CRM. |
| Ticket data model | Events, order quantity/time/type/amount, contact/opt-in/tags | Canonical events/orders/contacts, idempotent ingest | **MISSING**. Ticket backend explicitly on hold. |
| 20+ ticket integrations | Provider catalog and setup/status | OAuth/tokens, backfill, cursor/webhook sync, errors | **MISSING**. Static/verified-status screen is not connector infrastructure. |
| CSV contacts/events/sales import | Auto-map, clean, one-click correction, saved columns | Import jobs, mapping, dry run, errors, merge/provenance | **PROTOTYPE/SPEC**. AI mapping adapter and backend spec only. |
| Dynamic segments | Filters based on purchase, demographics, engagement; automatic membership updates | Versioned rules and server evaluator | **PROTOTYPE/SPEC**. Nested local evaluator; no persistence or refresh. |
| Email campaigns | Targeting, personalization, scheduling, performance and ticket sales | Campaign/delivery/template/metrics services | **PROTOTYPE/SPEC**. Builder exists, save route is stub, no send. |
| SMS/MMS | Sender ID, personalization, scheduling, opt-in, usage pricing | Brevo/provider delivery, rates/balance, quiet hours, receipts | **PROTOTYPE/SPEC**. Safe composer only; no live send or pricing. |
| Automation | Purchase/signup/form/tag/date/email/custom-field triggers; email/SMS, tag/field/list/score actions; waits, splits, goals, unique enrollment | Durable graph, scheduler/runtime, event bus, enrollment log | **PROTOTYPE/SPEC**. Graph editor only; engine decision still gated. |
| Ticket-sale attribution | Tickets sold by campaign/automation, not clicks alone | Message-event/order identity, conversion windows, refunds | **MISSING**, except written spec. |
| Suggested journeys | Welcome, abandoned purchase, post/pre-event, birthday, win-back, loyalty | Templates plus runtime | **MISSING** as runnable templates. Two local sample graphs do not execute. |
| Data capture | Signup forms, presale, competition, waitlist, embeddable custom fields, branded tours | Forms, submissions, campaign objects, consent | **MISSING**. |
| Referral/gamification | Referrals, sharing, follows, points/rewards | Referral identity, points/anti-abuse/rewards | **MISSING**. |
| Waitlist activation | Capture intent, notify eligible fans, link to ticket purchase | Waitlist state and ticket connection | **MISSING**. |
| Meta/Google/TikTok audiences | Auto-sync dynamic segments and lookalikes | Hashed destinations, consent, external IDs, sync health | **MISSING**. |
| Export/ownership/privacy | CSV export; GDPR/CCPA/Australian Privacy Act framing | Authorized export, retention/deletion/audit | **MISSING** for company CRM. Existing AuditLog/RBAC are foundation only. |

**Bottom line:** CultureOwl currently demonstrates perhaps the interaction skeleton of Audience Republic, but not its core production loop. The ticket integration -> canonical customer/order data -> dynamic segment -> delivery -> attributed ticket sale chain is absent.

## Artelize inventory and gap analysis

Artelize is less a conventional CRM and more an arts-specific intelligence/advisory layer. Its public venue offering says it connects ticketing data, combines an organization's data with performing-arts benchmarks, produces role-specific reports/recommendations quickly, presents them in workshops, exposes dashboard metrics and supplies timelines/social/email execution assets.

| Artelize capability | Product/UX pattern | CO-CRM status |
|---|---|---|
| Role-specific insight packs | Executive, Development, Artistic Leadership, Marketing & Sales | **PROTOTYPE/SPEC**. Role Home and six report cards exist, but metrics are prototype. |
| Board KPI/organizational health | Curated board pack | **PROTOTYPE/SPEC**. Board report route/retention print framing, no real pack pipeline. |
| Market demand/growth map | External market intelligence and growth opportunity mapping | **MISSING**. |
| Financial assessment/cash runway | Strategic finance model | **MISSING** and intentionally separate from CRM/ticketing finance. |
| Operational efficiency/cost tracker | Operational benchmark | **MISSING**. |
| Peer benchmarks/performance gaps | Compare to a large performing-arts dataset | **MISSING**. CultureOwl has no verified benchmark dataset/model. |
| Acquisition/retention map | Audience journeys and retention prioritization | **PROTOTYPE/SPEC**. Static cohorts only; no real source or journey data. |
| Pricing optimization | Demand/revenue recommendations | **MISSING**; pricing is a gated decision. |
| Campaign ROI / attribution tracker | Role dashboard to campaign outcome | **MISSING** beyond UI/report cards. |
| Donor portfolio health | Donor prioritization and engagement tracker | **MISSING**. Mock donation fields must not be called fundraising intelligence. |
| Grant/funding strategy | Impact alignment and grant focus | **MISSING**. |
| Donor appreciation pages | Generated individual assets | **MISSING**. |
| Repertoire demand forecast/season planning | Artistic demand forecast | **MISSING**. |
| Talent momentum/artist discovery | Artist intelligence and availability | **MISSING**. |
| Artist-production matching | Fit and availability | **MISSING**. |
| Content packs | Synopsis/program notes and similar assets | **MISSING**. Copy-draft adapter is not this product. |
| Audience/market trends navigator | Arts-specific market view | **MISSING**. |
| Audience growth/segment prioritization | Recommended audiences | **MISSING** as intelligence; segment UI alone does not qualify. |
| Campaign planner/launch kit | Recommendations plus ready execution assets | **PROTOTYPE/SPEC**. Campaign UI and dormant copy draft; no generated plan/assets. |
| Event health, attribution and retention | Upcoming/past performance health | **PROTOTYPE/SPEC** for retention only; event health and attribution missing. |
| Dashboard execution | Insight ends in campaign action | **PROTOTYPE/SPEC**. Navigation links exist, but no real execution chain. |

**Bottom line:** CultureOwl has adopted Artelize's role-based presentation idea, not its intelligence. Without integrated transaction data, benchmark data, validated models and role-specific recommendation pipelines, Artelize parity is near-zero on the backend.

## Ludus inventory and gap analysis

Ludus is a broad performing-arts operating system. Its CRM is natively fed by ticketing, donations, classes and volunteering. Its patron profile joins operational and relationship history.

| Ludus capability | Frontend/UX pattern | CO-CRM status |
|---|---|---|
| Patron database/search/export | All purchasers/donors/registrants/volunteers; real-time search/filter/sort/export | **PROTOTYPE/SPEC**. Mock list; no org contact API/export. |
| Profile 360 | Always-visible identity; overview, orders, activities, history | **PROTOTYPE/SPEC**. Visual profile exists; data is local/mock. |
| Spending breakdown | Tickets, collections, classes, passes, add-ons, donations | **MISSING**. Mock totals are not transaction data. |
| Orders/history | Purchases, admin sales, abandoned carts, subscriptions, transfers, gifts, class registrations | **MISSING**. |
| Households/relationships | Combined purchases/giving, notes and relationships | **PROTOTYPE/SPEC**. Placeholder relationship context only. |
| Duplicates/merge | Merge without losing history | **MISSING**. |
| Tags/custom properties | Searchable tags; text/checkbox/dropdown/date properties | **PROTOTYPE/SPEC**. Local implementations only. |
| Tasks/activities | Assigned priorities/dates; calls, email, meetings, gifts, letters and outcomes | **PROTOTYPE/SPEC**. Local queue/types; no persistent activities, ownership or outcomes. |
| Notes/accessibility/forms | Internal notes, checkout-visible access needs, form submissions | **PROTOTYPE/SPEC** for notes/access preferences; forms absent. |
| Marketing audiences/email | Purchase/donation/class/tag filters, scheduling, triggers, smart links, metrics | **PROTOTYPE/SPEC**. UI only; no delivery/runtime/results. |
| Ticketing/checkout | Passwordless mobile checkout, delivery/will-call/mail, reserved/GA/arrival times | **MISSING**, intentionally on hold. |
| Seating/box office | Layouts, holds, in-person selling, printing, scanning/check-in | **MISSING**. |
| Ticket changes | Transfer, release/resale/donation, upgrade/downgrade, exchange/refund | **MISSING**. |
| Add-ons/gift cards/meals | Checkout extras and stored balances | **MISSING**. |
| Access codes/presales | Protected inventory and limits | **MISSING**. |
| Passes/discounts | Flex/season passes, usage, promo codes | **MISSING**; membership/pass decision gated. |
| Memberships | Recurring/nonrecurring status, payments/renewal, exclusive pricing, discounts, early access, private events | **MISSING**. co_api membership schema is a TODO placeholder. |
| Fundraising | Campaigns, donations, giving levels, recurring/one-time, cash/check, receipts and payouts | **MISSING**. |
| Classes | Schedules, fees/capacity, forms/files, guardians, installments, discounts, refunds/exchanges | **MISSING**. |
| Volunteers | Signup activity feeding profiles | **MISSING**. |
| Event/admin automation | Copy/coming soon, scheduled price/email triggers | **MISSING** as execution. |
| Branding/widgets/policies | Embedded ticketing, branded pages/emails, checkout forms/notices | **MISSING** outside basic campaign/template UI. |
| Payments/invoices/payouts | Card/cash/check/wallet/terminal, PWYW, invoices, deposit schedule | **MISSING** and explicitly out of current spending scope. |
| Roles/security | Staff permissions and event-specific users | **REAL foundation** in co_api, but no Ludus-style full operational permissions because those domains do not exist. |

**Bottom line:** CO-CRM has early CRM-interface overlap with Ludus, but almost none of the operational system that makes Ludus profiles complete. Claiming Ludus feature parity would be false.

## Realistic delivery sequence

### Phase 1: production CRM foundation

- Company-scoped Contact, identities, consent/suppression history, owner, source/provenance.
- Household/organization relationships, notes, accessibility, company CRM tags/properties.
- Activity model and combined timeline; duplicate detection/merge; authorized import/export.
- Real server segments with consent pre-filter, count, members and dynamic refresh.

### Phase 2: Audience Republic core loop

- Import framework and sync-run ledger; first connector only after the ticketing backend/customer demand is selected.
- Campaign/template persistence, test, schedule, delivery and metrics through verified email/SMS services.
- Engine decision, then workflow runtime/enrollment/timers/deduplication.
- Ticket/order attribution when the ticketing domain exists.
- Forms, signup/presale/competition/waitlist; ad destinations after consent governance.

### Phase 3: arts intelligence

- Establish source data and definitions before AI: event health, acquisition, retention, campaign ROI.
- Only then validate forecast/benchmark products with measurable accuracy and rights to benchmark data.
- Add Artelize-like recommendations/assets as reviewed outputs, never fabricated metrics.

### Separate product programs

- Ticketing/box office/seating/check-in/refunds/transfers.
- Memberships/passes/subscriptions.
- Fundraising/donations/receipts.
- Classes/guardians/volunteers.
- Payments, invoices, payout/tax and pricing.

These are not small CRM leftovers. Each needs backend models, permissions, audit, customer-facing flows and operational support.

## Source caveats

This inventory uses current official public marketing pages and Ludus product documentation. Public pages can omit authenticated details and sometimes contain repeated marketing copy. Artelize exposes a detailed report catalog but little technical/backend documentation, so this audit does not infer hidden capabilities. CultureOwl status was determined from code, explicit mock/stub markers and the exported co_api source, not from the earlier roadmap language.
