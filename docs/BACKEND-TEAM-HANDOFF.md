# CO-CRM backend team handoff

Reconciled 2026-09-16 against the exported `co_api` Prisma source and the decorated code-first GraphQL resolvers, DTOs and entities. `co_api` generates its GraphQL schema in memory with `autoSchemaFile: true`; there is no committed SDL file.

This handoff contains only backend gaps. Existing `co_api` capabilities are listed separately so they are reused rather than rebuilt.

## Verified existing backend capabilities

- `Company` already has an account owner through required, unique `ownerId`, plus plan, Stripe, HubSpot, notes, organization type and company-user relations.
- `CompanyUser` already supports company-scoped roles and legacy roles.
- Company roles use `org.*` permission names. Existing relevant permissions include `org.promotion:read`, `org.escoop:manage`, `org.banner:manage`, `org.social:manage`, `org.report:*`, `org.billing:*`, `org.payout:*`, `org.order:*` and `org.team:manage`.
- `User`, `UserDetail`, `UserTag`, login events and favorites already exist. Existing `Tag` records support `MAIN_GENRE`, `SUBGENRE`, `SUPPORTING` and `AUDIENCE` uses, but they are global rather than company-scoped.
- `subscribersPaginated` is a real cursor connection over `User`. Its verified filters are email, name, search, market, isActive, hasCompany, isEmployee, city and state. It has no company filter.
- `CompanyBenefit` already stores cycle dates, current/static benefits, previous balance, added benefits, consumed assets, Stripe payment ID, check-payment state and `legacyMeta` (`paid`, `notes`, `sales_rep`, `dollar_value`).
- Credit utilization does not need a new rollup. Existing code-first operations include `getCompanyAssetCounters`, `getAssetUsageReport`, `getCompanyAssetHistory`, `getCompanyAdditionalAssets`, and `getCompanyPlanHistory`. `AssetUsageReport` already returns plan allowance, individually added and removed amounts, consumed/remaining totals, usage percentage, monthly consumption, low/out-of-stock status and report totals.
- `myCompany`, `myCompanies`, `myCompanyProfile`, `myCompanyDashboard` and team operations already exist.
- `AuditLog` is real and indexed, with a closed Prisma `AuditAction` enum.
- `memberships.prisma` is only a placeholder with TODO comments. It does not implement memberships.

## Backend change rules

- Add CRM models in new files under `prisma/schemas-src/`, add them to the schema assembly order, and regenerate the Prisma client.
- Ship idempotent SQL under `prisma/manual-sql/` using the existing `YYYY-MM-DD_description.sql` convention.
- Avoid automated Prisma schema synchronization because this database also contains PostGIS-managed structures.
- Mirror new permission rows and enum/database changes in the same SQL delivery. Deployment does not rely on seed execution.
- Scope CRM data at the API and authorization layers. Client-side filtering is not access control.
- Use the existing company permission namespace: propose `org.crm:read` and `org.crm:manage`, not unscoped `crm:read` / `crm:write`. Add them to the appropriate default roles and idempotent permission SQL.
- Every mutation must write the existing audit trail. Adding CRM-specific values to the closed `AuditAction` enum requires both schema-source and database enum updates; otherwise use an existing action only where its meaning is exact.

## P0: define the company-contact relationship

Do not add `companyId` to the global `User` record. Add a company-scoped relationship that can also represent people without a CultureOwl login.

Recommended shape:

- `Contact`: companyId, optional userId, ownerId, lifecycle stage, source, identity fields, channel consent/suppression, timestamps and merge keys.
- unique/index rules for company + normalized identifiers, with imports designed for idempotency.
- an explicit rule for when ticket purchase, organization signup, donation, class registration or manual import creates/links a contact.

Then expose a dedicated company-authorized contact connection. Do not retrofit organization access by passing `companyId` into `subscribersPaginated`; that resolver currently represents the CultureOwl-wide subscriber directory and its semantics are not an organization CRM.

Return enough data for profile/timeline composition without N+1 calls: company relationship, consent, ticket/order history, attendance, engagement, tags, owner, value and activity.

## P0: native CRM objects

### Deal

Company-scoped pipeline/stage, amount, close or renewal date, owner, company/contact links, won/lost state and reason. The existing `Company.ownerId` is account ownership, not a sales representative. Promote sales rep, contract value and payment notes from `CompanyBenefit.legacyMeta` into typed/indexed CRM fields while preserving the legacy source during migration.

### Activity

Typed notes, calls, emails, meetings, tasks, status changes and system events linked to contacts, companies and deals. Store actor and timestamp. Compose existing tickets, login events, asset reports and transaction-email logs into the timeline at query time rather than copying those rows into Activity.

### Company-scoped CRM tags

Do not treat the current global `Tag` / `UserTag` tables as organization CRM labels. Either add a separate company-scoped CRM tag model or extend the current model with an explicit safe scope and migration. Include batch assign/unassign mutations.

## P1: segments

Persist a versioned nested AND/OR filter tree. Evaluate it server-side against company contacts, return a true match count and paginated members, and support CSV export. Dynamic segments should re-evaluate from current records.

## P1: workflows

Persist the graph authored by CO-CRM (`trigger`, `action`, `condition`, `wait`, `goal`, `exit` nodes plus directed edges and Yes/No branches). Required operations: list, get, create, update graph, validate, activate, pause, duplicate, archive and per-node counters.

Activation must reject disconnected nodes, incomplete branches, missing templates, invalid waits, unsupported cycles and nodes outside the caller's company permissions. Do not build a scheduler until Sean selects an execution engine. The current frontend canvas is engine-neutral.

## P1: attribution

Add campaign/workflow source to the actual ticket/order domain selected by the ticketing implementation. Support attributed tickets, gross revenue, refunds, configurable conversion windows and per-node/per-campaign rollups. Preserve first-touch and last-touch fields if both models are selected.

## P2: consent, import and capture

- per-channel opt-in/out and suppression history
- idempotent CSV jobs with mapping, dry-run errors, duplicate resolution and provenance
- company-scoped forms, presales, waitlists and competitions

## Existing promotion API to use now

CO-CRM can immediately read verified `getAssetUsageReport` and related asset/history operations. Do not add another credit-utilization API. Booking/request mutations for all CultureOwl promotion products and CRM-segment targeting are still gaps.

## Finance, payout and memberships

The API already defines `org.payout:read` and `org.payout:manage`, but the exported bundle does not establish a complete payout/tax GraphQL domain. The Eventbrite-style finance area remains part of the separate ticketing project. It needs connected payout accounts, balances, schedules, refunds, disputes, tax onboarding/status/documents and step-up controls. `memberships.prisma` confirms memberships are not implemented yet.

## Frontend truth until new APIs land

- The global subscriber query is real, but it is not a safe organization contact list.
- Contacts and segments in CO-CRM remain mock/local until the company-contact API exists.
- Workflow graphs persist locally and do not execute; the current POST route is a stub.
- Company promotion credit counters and usage reports are real existing API data.
- Booking CultureOwl promotion against a CRM segment and ticket-attribution flows remain backend-dependent.
