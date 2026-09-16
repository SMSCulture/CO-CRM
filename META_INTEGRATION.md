# Meta integration development setup
Production callback URL: `https://cultureowl-crm-demo.chaiimpressions.workers.dev/api/integrations/meta/callback`

Server-only values required: `META_APP_ID`, `META_APP_SECRET`, `META_LOGIN_CONFIG_ID`, `META_TOKEN_ENCRYPTION_KEY` (32+ random bytes). Never expose these through `NEXT_PUBLIC_*` variables. Configure Facebook Login for Business with a Business Integration System User token, authorization-code response, and the exact callback above.

The current Cloudflare demo implements state validation, code exchange, encrypted HttpOnly test-session storage and disconnect. It intentionally does not claim production organization persistence: add a tenant-keyed encrypted database/KV integration record, asset discovery/binding, token health/revocation webhooks and audit log before client launch.
