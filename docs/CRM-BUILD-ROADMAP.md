# CO-CRM build roadmap: what is still missing

Date: 2026-09-16

This is the execution list after the honest Audience Republic, Artelize and Ludus audit. The current frontend is a useful product proof, not a production CRM. Build the data foundation first so later screens report real state rather than multiplying mocks.

## Ownership key

- **CO-CRM**: this repository, including the Next.js UI and its BFF routes.
- **Viktor / co_api**: production Prisma models, GraphQL operations, authorization, audit and background services.
- **Decision**: Sean must choose scope or provider before implementation can safely continue.
- **Ticketing dependency**: blocked until the separate ticketing backend/domain exists. Ticketing connectors stay hidden and docs-only meanwhile.

## P0: production CRM foundation

### 1. Company contact system

**Viktor / co_api**

- Add a company-scoped `Contact` relation. Do not add `companyId` to the global CultureOwl `User` or expose `subscribersPaginated` as an organization CRM.
- Support an optional linked CultureOwl user plus people without a CultureOwl login.
- Store normalized identity fields, lifecycle, owner, source/provenance and timestamps.
- Add `org.crm:read` and `org.crm:manage` to the existing permission model and idempotent permission SQL.
- Expose authorized list/get/create/update/archive operations with pagination, search and filters.
- Write the existing AuditLog for every mutation.

**CO-CRM**

- Replace `MOCK_CONTACTS` with the real company contact connection.
- Add loading, empty, error and permission states.
- Keep the current blue table and profile layout, but remove every prototype total once the API lands.

**Done when** two companies cannot read or change each other's contacts, and a contact without a CultureOwl account works end to end.

### 2. Consent, suppression and communication identity

**Viktor / co_api**

- Store per-channel consent state and history: source, purpose, captured time, changed time and actor.
- Add suppression reason, bounce/complaint state and deletion/retention handling.
- Expose eligible/excluded counts without leaking suppressed recipients.

**CO-CRM**

- Show consent history on the profile.
- Make the segment builder's Eligible Base a real server pre-filter.
- Add channel preflight to campaigns and SMS.

**Done when** a suppressed contact cannot enter a delivery job even if a UI filter is wrong.

### 3. Activities, tasks, service cases and timeline

**Viktor / co_api**

- Add typed Activity/Task records for note, call, email, meeting, to-do, service case, survey follow-up and system events.
- Support owner, priority, due date, status, direction, outcome and contact/company links.
- Compose real platform events into the timeline rather than copying them into Activity.

**CO-CRM**

- Replace the local Tasks array and mock timeline.
- Add create/edit/complete/reassign/filter flows and patron-context side panel.
- Keep gifts/letters/fundraising types out until that domain exists.

**Done when** a completed service task is durable, audited and visible on the correct patron timeline after refresh.

### 4. Households, relationships, CRM tags and custom properties

**Viktor / co_api**

- Add household/organization relationships with type, primary contact and rollup rules.
- Add company-scoped CRM tags. Do not reuse global content tags without a safe scope migration.
- Add typed custom properties and values.
- Add duplicate candidates and a merge operation that preserves provenance/history.

**CO-CRM**

- Replace local tag/property/relationship placeholders.
- Add relationship editor, duplicate-review queue and merge preview.

**Done when** a merge is reversible through source/audit evidence and does not discard activity or consent history.

## P1: real audiences and data movement

### 5. Server-side segments

**Viktor / co_api**

- Persist versioned nested AND/OR/NOT definitions.
- Evaluate rules against company contacts on the server.
- Return live count, exclusions, sample members and paginated members.
- Support dynamic refresh and an explicit snapshot option.

**CO-CRM**

- Send the existing three-stage builder to the API.
- Replace prototype preview counts and saved segments.
- Add View contacts, Save as segment, duplicate and archive.

**Done when** a new purchase/contact change updates a dynamic segment without rebuilding it in the browser.

### 6. Import, export and data quality

**Viktor / co_api**

- Add idempotent CSV jobs with upload, mapping, dry run, warnings/errors, dedupe resolution and provenance.
- Add saved mappings and correction/reject queues.
- Add authorized export jobs with field selection and audit.

**CO-CRM**

- Build upload -> mapping review -> dry run -> correction -> commit.
- Use the AI mapping adapter only as a reviewed suggestion; it never commits records.
- Add Data Health for duplicates, missing consent and rejects.

**Done when** replaying the same source file does not duplicate contacts or transactions.

### 7. Integration control plane

**Viktor / co_api**

- Add IntegrationConnection, provider capabilities, encrypted secret reference and authorized OAuth callback contracts.
- Add sync-run ledger: cursor, timestamps, counts, rejects, errors, last success and retry state.
- Define canonical IDs and idempotent upserts before the first adapter.
- Add webhook ingestion and reconnect/disconnect/resync operations.

**CO-CRM**

- Replace module-availability cards with actual Connect/Reconnect/Disconnect controls, mappings, health and run logs.
- Keep ticketing providers disabled until the ticketing dependency is resolved.

**Done when** a failed sync explains which objects failed and can resume without replaying successful records.

## P2: campaign execution

### 8. Email template and campaign backend

**Viktor / co_api**

- Persist templates, campaigns, versions, audience snapshot/reference, sender identity and schedule.
- Add test delivery, queue state, cancellation, provider IDs, delivery/open/click/bounce/complaint events and cost/usage where available.
- Confirm whether existing Brevo services are platform-only or safe for company-authorized sending.

**CO-CRM**

- Replace both `stub-*` BFF saves.
- Add sender verification state, test, review, schedule, cancel and results.
- Keep final send disabled until the API proves consent and provider preflight.

**Done when** a reviewed test and scheduled campaign survive reload and delivery outcomes return to the campaign and patron timeline.

### 9. SMS execution

**Viktor / co_api**

- Expose company-safe Brevo sender/provider state, country rates, available balance/limits and message receipts.
- Enforce consent, suppression and quiet hours server-side.
- Persist exact encoding, units, eligible recipient count and quoted cost at approval time.

**CO-CRM**

- Replace the draft-only composer with audience, sender, test, cost quote and final review.
- Keep live send and credit purchase gated by Sean's approval and money rules.

**Done when** the charged units and provider receipts reconcile to the approved preflight.

### 10. Workflow persistence and runtime

**Decision: Sean**

- Choose the execution-engine scope: custom co_api scheduler/event runtime, n8n bridge, or another approved engine.
- Define the first production journey and supported triggers/actions. Do not promise every graph node in V1.

**Viktor / co_api after decision**

- Persist graphs; validate cycles, branches, templates and unsupported nodes.
- Add activation/pause/archive, enrollment, unique-contact control, waits/timers, event consumption, retries and per-node counters.

**CO-CRM**

- Replace the workflow stub save and bind node options to real templates/fields/segments.
- Show unsupported nodes and runtime status truthfully.

**Done when** one selected journey executes twice idempotently in a staging company and its node results reconcile.

## P3: acquisition and attribution

### 11. Forms, signup, presale, competition and waitlist

**Viktor / co_api**

- Add form/campaign/submission models, consent capture, custom fields and embeddable token/security rules.
- Add waitlist and eligibility state. Referral points/rewards require abuse controls.

**CO-CRM**

- Build templates, branded editor, embed/share, submissions and one-click audience follow-up.

**Ticketing dependency**

- Presale eligibility, ticket availability notification and purchase conversion cannot be complete without ticketing.

### 12. Attribution and event health

**Viktor / co_api + ticketing domain**

- Connect campaign/workflow/message IDs to orders, tickets and refunds.
- Support documented conversion windows plus first/last touch if selected.
- Add event-level revenue, attendance, capacity and refund rollups.

**CO-CRM**

- Replace prototype Retention, Campaign Response and Event Health cards with defined metrics and source drill-down.

**Done when** every reported sale resolves to the source message, order and refund state.

### 13. Ad audience destinations

**Viktor / co_api**

- Add Meta/Google/TikTok destinations only after consent rules and connection infrastructure exist.
- Hash permitted identifiers, track external audience IDs/limits and refresh dynamic membership.

**CO-CRM**

- Add destination selection, approximate eligible size, sync state and error recovery.

## P4: Artelize-style intelligence, after real data

### 14. Defined arts metrics first

**Joint product/data work**

- Lock definitions for first-time, repeat, superfan, churn risk, acquisition, campaign ROI and event health.
- Validate every metric against source records and expose freshness/provenance.

### 15. Forecasts, benchmarks and recommendations

**Decision / data dependency**

- Establish lawful, sufficient benchmark data. CultureOwl cannot claim peer benchmarking from UI design alone.
- Pick measurable jobs: demand forecast, segment prioritization, repertoire fit, donor prioritization or pricing optimization.
- Define accuracy, review and non-discrimination checks before release.

**Viktor / co_api or approved analytics service**

- Build feature pipelines, model/version records, evaluation and explanation provenance.

**CO-CRM**

- Show confidence, source period and reasons. Keep recommendations review-only.

**Missing and not to fake:** cash-runway analysis, grant strategy, donor intelligence, repertoire/artist matching, peer benchmarks and generated execution kits.

## Separate programs, not CRM leftovers

These require Sean's product decisions and dedicated backend programs:

- Ticketing, checkout, seating, box office, scanning, transfers, exchanges and refunds.
- Memberships, flex/season passes, subscriptions and benefits. `memberships.prisma` is currently a TODO placeholder.
- Fundraising, donations, recurring giving, receipts and donor finance.
- Classes, guardians, capacity, forms/files, installments and volunteers.
- Gift cards, add-ons, invoices, payment terminals, payouts, tax and pricing.

Do not add active navigation or claim parity until each domain has a real backend and permission/audit model.

## Recommended first six delivery tickets

1. **co_api:** company Contact + CRM permissions + audit.
2. **CO-CRM:** replace mock contact list/profile with that API.
3. **co_api:** consent/suppression history and eligible-count query.
4. **co_api:** Activity/Task + relationship/tag/property primitives.
5. **CO-CRM:** bind Tasks, timeline, tags/properties and patron context.
6. **co_api + CO-CRM:** persisted server segments with live count and members.

Only after those six should the team spend a sprint on campaign delivery or connectors. Otherwise marketing execution will sit on ambiguous identities, fake audience counts and unsafe consent state.
