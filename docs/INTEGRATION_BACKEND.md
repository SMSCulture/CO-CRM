# CultureOwl integration rails

## Security and tenancy

- Every connection record is addressed by `(tenantId, provider)`. The store API must enforce this composite key and deny cross-tenant scans.
- Credentials are encrypted before leaving the worker with AES-256-GCM. A per-tenant key is derived with HKDF from `INTEGRATION_CREDENTIAL_KEY`; tenant and provider are authenticated as additional data.
- Routes return assets and health only, never credential material. Audit entries contain counts and IDs, never secrets.
- Production routes must derive `tenantId` from the verified company membership in the JWT/backend. The query/header fallback exists only for `NEXT_PUBLIC_DEMO_MODE=true`.

## Persistence contract

`INTEGRATION_STORE_URL` is a private backend service implementing:

- `GET|PUT|DELETE /v1/tenants/:tenantId/connections/:provider`
- `POST /v1/tenants/:tenantId/audit`

Connection fields: provider, encrypted credential envelope, health, external account, discovered/bound assets, verified/revoked timestamps. Audit events are append-only.

## Provider adapters

Each adapter implements `verify`, `discoverAssets`, `health`, optional `sync`, and optional provider-side `disconnect`.

- Meta: OAuth code exchange exists; adapter verifies `/me` and discovers Business Portfolios, Pages, ad accounts and Pixels. Instagram professional account discovery and binding UI are next. Production persistence needs the store variables and Meta app values.
- Mailchimp: API key verification uses `/3.0/ping`; discovery reads audiences. The key is accepted only by a server route, encrypted immediately, and never returned.
- Klaviyo: private API key verification reads Accounts; discovery reads Lists. Same encrypted server-only handling.
- Events Calendar: product integration only. It produces an embed snippet; no secret or remote provider connection is required.
- Spotify: catalog stub only. No OAuth, sync or implied connection.

## Contact provenance

`ContactProvenance` is tenant keyed and records `source`, source record ID, first/last seen and consent. Initial values: `meta-ad`, `instagram`, `mailchimp`, `klaviyo`, `manual`, `purchase`. When the CRM backend schema is confirmed, make `(tenantId, contactId, source, sourceRecordId)` idempotent and expose source filters in Contacts.

## Required deployment values

`INTEGRATION_CREDENTIAL_KEY`, `INTEGRATION_STORE_URL`, `INTEGRATION_STORE_SERVICE_SECRET`, plus the Meta app variables in `META_INTEGRATION.md`. Without the store values, live routes fail closed with a configuration error; they do not pretend to connect.
