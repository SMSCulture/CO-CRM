# Integration code audit

Date: 2026-09-16

## What exists

### SMSCulture/CO-CRM

This is the only accessible product repo with a CultureOwl integration catalog/table.

- `lib/data/integrations.ts`: static eight-card catalog for Meta Ads, YouTube, Spotify Advertising, HubSpot, Salesforce, Mailchimp, Klaviyo and an Events Calendar.
- `app/dashboard/settings/integrations/page.tsx`: searchable gallery over that static list on `main`.
- `app/dashboard/settings/integrations/[appId]/page.tsx`: static detail screens with placeholder images and a non-functional "Get app info" button.
- The overnight branch replaces the gallery landing screen with verified connection status from company fields and backend module availability. It does not create connectors.

This is probably the table Sean remembered, but it is a product mock/catalog, not integration infrastructure. Several cards claim sync behavior that no matching connection or sync backend was found to support. Those claims should not be shown as live functionality.

### SMSCulture/n8n

This is an upstream n8n fork, not a CultureOwl integration registry. It contains its general connector/node ecosystem, including Eventbrite credentials and an Eventbrite trigger. It could inform an automation bridge after the engine decision, but it is not evidence that CultureOwl has Eventbrite connected.

### SMSCulture/CO-APP-Front

No integration table or ticketing connector implementation found. A search hit in `EventMap.tsx` was ordinary map integration wording.

### SMSCulture/idurar-erp-crm

No CultureOwl integration table or connector implementation found. Hits were generic ERP/CRM feature documentation.

## Repositories listed but not clonable anonymously in this environment

- `SMSCulture/news-automation`
- `SMSCulture/Chaiimpressions`
- `SMSCulture/Event-Scraper-Node`
- `elchicovzl/cultureowl-v3`

GitHub lists them for the connected identity, but direct shallow clone did not have authentication for these private repositories and code search returned no integration matches. The likely source is still CO-CRM because its exact Settings > Integrations table exists and matches Sean's memory.

## Bottom line

CultureOwl has an integrations UI concept, existing direct Brevo/Stripe/HubSpot backend pieces, and a separate generic n8n codebase. It does not yet have the Audience Republic-style connection registry, provider capability matrix, sync jobs, health state, data mappings, backfill/cursor ledger, reconnect/disconnect flows or ad-segment destinations in the accessible CultureOwl product repos.
