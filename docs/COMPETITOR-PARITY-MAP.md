# CultureOwl parity map: Shotgun, Audience Republic, and Ludus

Date: 2026-09-16

## Answer

CultureOwl should inventory the full operating system across all three products before deciding what belongs in CRM V1. Audience Republic is strongest in cross-ticketing audience data, activation, automation, and attributable marketing. Shotgun combines first-party ticketing with fan discovery, community follow/favorite behavior, CRM segments, newsletters, push, exclusive inventory, resale, transfer, and waitlists. Ludus is deepest in performing-arts operations: box office, seating, patron/household history, assigned relationship tasks, memberships/passes, classes, volunteering, and fundraising. CultureOwl's differentiation should sit above parity: local cultural discovery plus owned promotional inventory, one profile across consumer/community/commercial activity, transparent credits, and CRM-to-promotion activation.

## Complete inventory by capability

| Capability | Shotgun | Audience Republic | Ludus | CultureOwl target |
|---|---|---|---|---|
| Contact/fan profile | Buyer demographics, purchase behavior, average spend, community/follower signals | Ticket purchases, email/SMS engagement, lifetime value, demographics, tags | Tickets, donations, classes, volunteering, email, access codes, notes, tags | Unified person/account profile with timeline and consent |
| Segmentation | Ready-made and custom segments by activity, history, demographics | Layered AND/OR, purchase/spend/frequency/genre/engagement, dynamic updates | Filters/lists by tags, purchases, donations, attendance, dates/actions | Company-scoped dynamic segments plus CultureOwl aggregate reach |
| CRM activity | Community insight and campaign response | Fan profiles and campaign history | Calls, emails, meetings, follow-ups, priorities/due dates | Tasks, notes, ownership, activity timeline, audit |
| Email | Built-in promotional/practical newsletters, editor/preview, delivery/open/revenue metrics, Mailchimp/Brevo sync | Targeted campaigns, personalization, A/B, scheduling, event-linked conversion | Builder, templates/previous campaign, merge tags/smart links, lists, schedule/results | One editor, event-native blocks, consent, tests, attribution |
| SMS/push | Push notifications; public evidence reviewed did not establish native SMS | SMS/MMS campaigns, automation and attribution | SMS used for patron verification; marketing-SMS parity not established | Product decision: SMS V1; keep push/mobile notification path |
| Automation | Practical notification workflows and community activation; full graph depth not established publicly | Triggered journeys, purchase/abandoned-cart/fan engagement, email/SMS logic, templates, ticket attribution | Triggers/access codes plus operational automation | Visual graph authoring; engine-neutral until engine is chosen |
| Acquisition | Ticket marketplace/community discovery, follows/favorites, exclusive inventory, waitlist | Signup forms, presales, competitions, waitlists | Purchases, donations, classes, volunteers, manual/CSV import | Forms, presales, waitlists, competitions, QR/social capture |
| Ads | Not established in reviewed public sources | Meta/Google/TikTok audience sync and lookalikes | Not established | V2 audience sync after consent and governance |
| Ticketing | Event setup, live sales, branded organizer page, ticket types, high volume | Integrates with major ticketing platforms rather than core box office | Reserved/GA, seating/box office/walk-up, check-in/front of house, passes | Separate project, retained in parity map |
| Transfer/resale/waitlist | Integrated transfer/resale; waitlist auto-notifies and charges | Waitlists for data capture; ticketing behavior depends on connected platform | Exchanges/refunds and ticket operations | Separate ticketing project |
| Community | Consumer discovery marketplace, follows, favorites, alerts and high-intent audience | Audience database and activation, less consumer-community oriented | Patron/household community centered on organization | CultureOwl city audience plus organization patrons with privacy wall |
| Memberships/passes | Revenue diversification claim, detail not established | Not core in reviewed sources | Memberships, flexible passes/season tickets | Separate ticketing/subscriptions decision |
| Fundraising | Not established | Not established | Campaign pages, goals/deadlines, updates/messages, giving levels, receipts, one-time/recurring, online/cash/check, donor profiles | Separate scope decision, but CRM must model donation history |
| Classes | Not established | Not established | Schedules, fees/capacity, forms/files, guardian links, installments, discounts, refunds/exchanges, exports | Separate operations scope; profile should ingest class activity |
| Finance/payouts | Cashflow controls claimed; details need authenticated docs | Marketing platform, not primary payout layer | Direct deposit daily/weekly/monthly or check; reporting | Separate ticketing finance project with balances, schedules, tax, refunds/disputes |
| Attribution | Newsletter revenue and ticket-sales feedback | Message/event ticket revenue, recipient conversions, link selection, annotated sales timeline, exports | Sales/donation/activity reports; comparable campaign-to-ticket depth not established | First/last touch, event-linked revenue, refunds and conversion windows |
| Imports/exports | External ESP sync shown; complete import surface not established | 20+ ticket integrations; CSV contacts/events/sales, auto-map/clean, exports | Imports contacts/donations and exports operational lists/reports | Idempotent CSV with mapping, dry run, errors, merge and source |
| Integrations | Mailchimp and Brevo publicly documented | Ticketing, advertising and messaging integration matrix; API tokens | Built-in operating suite; public integration depth not established here | Use existing Brevo/Stripe/S3 and add governed connectors |
| Admin/privacy | Consent split between promotional and practical email | Opt-ins synced depending on source, data export/ownership | Organization-centric profiles and admin tasks | Hard company scope, RBAC, AuditLog, consent and impersonation isolation |

## How CultureOwl improves after parity

1. Put an organization's patrons and the addressable CultureOwl audience in one product without revealing CultureOwl-wide identities. Show aggregate reach before a permitted campaign activation.
2. Turn CultureOwl inventory into native CRM actions: eScoop, dedicated email, banner, marquee, social inclusion, editorial, and event featuring from a segment or campaign, with credits and delivery status shown in the same flow.
3. Use one event-centered timeline for tickets, campaigns, owned promotion, content delivery, community follows, and attributed revenue.
4. Make workflows channel-neutral. The same condition can route to an organization email, a CultureOwl promotion request, push, a staff task, or an exit goal.
5. Treat finance and tax as a separate ticketing domain, but surface read-only payout health and order/refund context on account and event views when authorized.
6. Add AI only after Sean chooses jobs, data boundaries, review rules, and a measurable value test. Do not make AI the architecture.

## Build order

### Foundation
- Install integrity, auth guard, one email editor.
- Company-scoped contact relation, consent, RBAC and audit.
- Shared event/order/contact identifiers and import provenance.

### CRM parity
- Real contacts and full profile/timeline.
- CRM tags, custom properties, duplicate merge, household/account links.
- CSV import/export with mapping and dry-run correction.
- Dynamic nested segments and true match counts.
- Tasks, notes, owners, deals/renewals.

### Marketing parity
- Visual workflow authoring and backend persistence.
- Choose engine only after a product decision and a one-journey proof.
- Finish email editor/campaign flow, test/preview, scheduling, consent checks.
- Ticket-revenue attribution and event-level campaign timeline.
- Data-capture forms, presales, competitions and waitlists.
- Decide SMS; then ad-audience sync.

### CultureOwl differentiation
- CultureOwl Promotion inventory, allowance/credit rollup, booking/request flow.
- Aggregate addressable audience estimates and privacy-safe activation.
- Cross-channel delivery and attributed revenue reporting.

### Separate operational projects, still tracked for parity
- Ticketing/box office, seating, resale/transfer, waitlists and check-in.
- Memberships/passes/subscriptions.
- Classes, guardians, forms and installments.
- Fundraising and recurring giving.
- Finance/payout/tax, refunds and disputes.

## Caveats

- Shotgun public pages establish CRM, segments, newsletter, push, exclusive tickets, resale, transfer, waitlist and revenue reporting. They do not establish every back-office or financial detail.
- Audience Republic conversion documentation requires an email open, link click, and purchase for the reviewed conversion definition. CultureOwl should decide whether to offer that strict rule plus first/last-touch models rather than copying a single attribution rule.
- Ludus has broad public feature detail, but some operational behaviors need product documentation before implementation.
- The real co_api bundle is still pending a non-Slack delivery route. Backend claims must be reconciled against it before API code is written.

## Priority deep dive: Audience Republic integration model

Sean's priority is not an app-store gallery. It is the data-operating model Audience Republic uses across ticketing, advertising, messaging and API/automation sources.

### Verified catalog

The current public catalog lists ticketing connectors for AudienceView, DICE, Eventbrite, Eventix, Humanitix, Leap Event Technology, Megatix, Moshtix, Oztix, Shotgun, Showclix, Ticketek, Ticket Fairy, ticket.io, Ticketmaster, TicketSpice, Ticket Tailor, Tixr, TryBooking, Universe, Vivenu and Xceed. Advertising connectors include Google Ads Audiences, Meta Audiences and TikTok Audiences. The help center also documents Zapier and a bearer-token API.

### What ticketing connectors do

- Sync events, ticket-sale orders and attendees/contacts, not only email addresses.
- Preserve provider/source identity so imported and synced events are distinguishable.
- Expose provider-specific setup because authentication varies. Examples reviewed: Eventbrite authorization, Humanitix connection, and DICE access token.
- Document supported and unsupported fields per connector instead of promising universal parity.
- Surface discrepancies and troubleshooting as integration state, not as silent data loss.
- Offer CSV ingestion when a provider is unsupported, including import mode, date format, timezone, currency, source, column mapping, custom fields and in-product format correction.

### What ad connectors do

- Let a saved dynamic segment be selected and synced into a chosen ad account.
- Keep the external audience updated as the source segment changes.
- Require the right external account and admin permissions.
- Show sync progress, errors and reconnect paths. Common causes in the reviewed docs include expired/mismatched tokens, insufficient account permission, dirty email/phone formats and external audience limits.

### What API and automation connectors do

- Use scoped bearer tokens and provide test-call guidance.
- Accept contact tags and marketing opt-in state explicitly.
- Return validation errors for bad or missing fields.
- Zapier mapping includes email, mobile and marketing opt-in rather than treating consent as an afterthought.

### CultureOwl integration object model

A production integration needs more than `connected: boolean`:

```ts
interface IntegrationConnection {
  id: string;
  companyId: string;
  provider: string;
  category: 'ticketing' | 'advertising' | 'messaging' | 'crm' | 'automation';
  status: 'connected' | 'syncing' | 'action_required' | 'error' | 'disconnected';
  externalAccountId?: string;
  externalAccountName?: string;
  scopes: string[];
  connectedBy: string;
  connectedAt: string;
  lastSyncAt?: string;
  lastSuccessfulSyncAt?: string;
  cursor?: string;
  errorCode?: string;
  errorSummary?: string;
  fieldMappings?: IntegrationFieldMapping[];
  syncSettings: Record<string, unknown>;
}
```

Add provider capabilities so UI and jobs know which objects and directions are supported: events, orders, attendees, refunds, opt-ins, tags, custom fields, segment export, historical backfill, incremental sync and webhooks.

### Build order for integrations

1. Connection registry, encrypted secret reference, scopes, account identity, health and audit.
2. Sync-run ledger with started/completed timestamps, cursor, object counts, rejects and errors.
3. Canonical event/order/contact/source identifiers and idempotent upsert rules.
4. CSV importer as the universal fallback, with mapping templates and correction queue.
5. First ticketing adapter chosen from real customer demand; prove history backfill plus incremental updates.
6. Segment destination framework, then Meta/Google/TikTok adapters with consent-safe hashing and automatic refresh.
7. API tokens/webhooks and Zapier-style automation bridge.
8. Admin UI for reconnect, resync, mappings, logs and disconnect.

Do not claim every connector syncs every field. Maintain a capability matrix per provider and expose it in product documentation and setup UI.
