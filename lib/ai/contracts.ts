import { z } from 'zod';
export const importMapRequest = z.object({ headers: z.array(z.string()).min(1), sample: z.array(z.record(z.string(), z.unknown())).max(10) });
export const importMapResult = z.object({ mappings: z.array(z.object({ source: z.string(), target: z.string(), confidence: z.number().min(0).max(1), reason: z.string() })), warnings: z.array(z.string()) });
export const copyDraftRequest = z.object({ channel: z.enum(['email','sms']), goal: z.string().min(3), audience: z.string().min(2), facts: z.array(z.string()), tone: z.string().optional() });
export const copyDraftResult = z.object({ subject: z.string().optional(), body: z.string(), warnings: z.array(z.string()) });
