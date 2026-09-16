import { SignJWT, jwtVerify } from 'jose';

export const META_GRAPH_VERSION='v25.0';
export const META_CALLBACK_PATH='/api/integrations/meta/callback';
const enc=new TextEncoder();
function secret(){const value=process.env.META_TOKEN_ENCRYPTION_KEY;if(!value)throw new Error('META_TOKEN_ENCRYPTION_KEY is not configured');return enc.encode(value)}
export async function createState(tenantId:string){return new SignJWT({tenantId,nonce:crypto.randomUUID()}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('10m').sign(secret())}
export async function readState(value:string){const {payload}=await jwtVerify(value,secret());return {tenantId:String(payload.tenantId||'')};}
export {sealCredential as encryptToken,openCredential as decryptToken} from './credential-crypto';
export function callbackUrl(origin:string){return `${origin}${META_CALLBACK_PATH}`}
export function configured(){return Boolean(process.env.META_APP_ID&&process.env.META_APP_SECRET&&process.env.META_LOGIN_CONFIG_ID&&process.env.META_TOKEN_ENCRYPTION_KEY)}
