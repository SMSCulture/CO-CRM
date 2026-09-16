import type {IntegrationProvider,ProviderAdapter} from '../types';import {mailchimpAdapter} from './mailchimp';import {klaviyoAdapter} from './klaviyo';import {metaAdapter} from './meta';
const adapters:Partial<Record<IntegrationProvider,ProviderAdapter>>={meta:metaAdapter,mailchimp:mailchimpAdapter,klaviyo:klaviyoAdapter};
export function providerAdapter(provider:IntegrationProvider){const adapter=adapters[provider];if(!adapter)throw new Error(`No API-key adapter for ${provider}`);return adapter}
