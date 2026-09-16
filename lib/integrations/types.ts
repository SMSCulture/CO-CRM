export const INTEGRATION_PROVIDERS=['meta','mailchimp','klaviyo','event-calendar','spotify'] as const;
export type IntegrationProvider=(typeof INTEGRATION_PROVIDERS)[number];
export type IntegrationHealth='connected'|'degraded'|'revoked'|'disconnected';
export interface IntegrationAsset {id:string;type:string;name:string;externalId:string;metadata?:Record<string,unknown>}
export interface ConnectionRecord {tenantId:string;provider:IntegrationProvider;encryptedCredential:string;credentialVersion:1;health:IntegrationHealth;externalAccountId?:string;assets:IntegrationAsset[];createdAt:string;updatedAt:string;lastVerifiedAt?:string;revokedAt?:string}
export interface AuditEvent {tenantId:string;provider:IntegrationProvider;action:'connected'|'verified'|'assets.discovered'|'assets.bound'|'sync.started'|'sync.completed'|'sync.failed'|'revoked'|'disconnected';actorId?:string;at:string;metadata?:Record<string,unknown>}
export interface ProviderAdapter {provider:IntegrationProvider;verify(credential:string):Promise<{externalAccountId:string;displayName?:string}>;discoverAssets(credential:string):Promise<IntegrationAsset[]>;sync?(connection:ConnectionRecord):Promise<{records:number;cursor?:string}>;disconnect?(credential:string):Promise<void>;health(credential:string):Promise<IntegrationHealth>}
export type ContactSource='meta-ad'|'instagram'|'mailchimp'|'klaviyo'|'manual'|'purchase';
export interface ContactProvenance {tenantId:string;contactId:string;source:ContactSource;sourceRecordId?:string;firstSeenAt:string;lastSeenAt:string;consent:'unknown'|'subscribed'|'unsubscribed'}
