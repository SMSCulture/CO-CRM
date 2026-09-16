import { SignJWT, jwtVerify } from 'jose';

export const META_GRAPH_VERSION='v25.0';
export const META_CALLBACK_PATH='/api/integrations/meta/callback';
const enc=new TextEncoder();
function secret(){const value=process.env.META_TOKEN_ENCRYPTION_KEY;if(!value)throw new Error('META_TOKEN_ENCRYPTION_KEY is not configured');return enc.encode(value)}
export async function createState(tenantId:string){return new SignJWT({tenantId,nonce:crypto.randomUUID()}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('10m').sign(secret())}
export async function readState(value:string){const {payload}=await jwtVerify(value,secret());return {tenantId:String(payload.tenantId||'')};}
export async function encryptToken(token:string,tenantId:string){const raw=await crypto.subtle.digest('SHA-256',secret());const key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['encrypt']);const iv=crypto.getRandomValues(new Uint8Array(12));const data=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:enc.encode(tenantId)},key,enc.encode(token));return `${Buffer.from(iv).toString('base64url')}.${Buffer.from(data).toString('base64url')}`}
export async function decryptToken(value:string,tenantId:string){const [a,b]=value.split('.');const raw=await crypto.subtle.digest('SHA-256',secret());const key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);const out=await crypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(a,'base64url'),additionalData:enc.encode(tenantId)},key,Buffer.from(b,'base64url'));return new TextDecoder().decode(out)}
export function callbackUrl(origin:string){return `${origin}${META_CALLBACK_PATH}`}
export function configured(){return Boolean(process.env.META_APP_ID&&process.env.META_APP_SECRET&&process.env.META_LOGIN_CONFIG_ID&&process.env.META_TOKEN_ENCRYPTION_KEY)}
