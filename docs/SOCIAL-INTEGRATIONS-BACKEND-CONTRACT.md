# Social integrations backend contract

The organization owns every connected account, Page, ad account, audience and payment method. CultureOwl is the control UI and never becomes the advertiser or payment owner.

## Connection registry

```ts
type SocialProvider = 'meta' | 'tiktok';
type ConnectionStatus = 'pending' | 'connected' | 'action_required' | 'expired' | 'revoked' | 'error';
interface SocialConnection {
  id: string; companyId: string; provider: SocialProvider; status: ConnectionStatus;
  externalBusinessId?: string; externalBusinessName?: string; scopes: string[];
  encryptedSecretRef: string; tokenExpiresAt?: string; connectedBy: string;
  connectedAt: string; lastHealthCheckAt?: string; errorCode?: string;
}
interface SocialAsset {
  id: string; connectionId: string; type: 'facebook_page'|'instagram_account'|'tiktok_account'|'meta_ad_account'|'meta_pixel';
  externalId: string; displayName: string; selected: boolean; capabilities: string[];
}
```

Tokens must be encrypted by the backend/KMS and referenced by opaque ID. Never return access or refresh tokens to the browser. Store OAuth state and PKCE verifier server-side with a short expiry, bind both to company + user + provider, allow only registered callback URLs, and audit connect/reconnect/disconnect/asset-selection actions.

## API operations

1. `POST /companies/:companyId/integrations/:provider/oauth/start` returns the provider authorization URL and opaque attempt ID.
2. `GET /integrations/:provider/oauth/callback` validates state, exchanges the code server-side, persists encrypted credentials, fetches account identity, then redirects to asset selection.
3. `GET /companies/:companyId/integrations/:provider/assets` returns eligible Pages, professional Instagram accounts, TikTok accounts, ad accounts and Pixels without secrets.
4. `PUT /companies/:companyId/integrations/:provider/assets` saves the explicit organization choices and capability snapshot.
5. `GET /companies/:companyId/integrations` returns status, selected assets, token expiry/health and last sync.
6. `POST /companies/:companyId/integrations/:provider/reconnect` starts a fresh scoped OAuth grant.
7. `DELETE /companies/:companyId/integrations/:provider` revokes with the provider where supported, deletes local secrets and disables jobs.

## Provider sequence

- Meta first: Facebook Login for Business, Pages + Instagram professional publishing scopes, then separate Marketing API permissions for ads. App review/business verification gates production publishing and ads.
- TikTok second: Login Kit plus Content Posting API. Keep TikTok posting disabled until app review/audit is approved.

## Jobs and safety

Create idempotent publish and campaign jobs with company ID, selected asset ID, event/version ID, provider idempotency key, state, attempts, provider object IDs and structured error. Recheck connection health and permissions before every effect. A draft never launches automatically after reconnect. Meta billing stays on the organization's selected ad account.
