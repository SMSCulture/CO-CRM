import { NextResponse } from 'next/server';
import { copyDraftRequest, copyDraftResult } from '@/lib/ai/contracts';
import { reviewedAiDraft } from '@/lib/ai/provider';
export async function POST(request:Request){try{const input=copyDraftRequest.parse(await request.json());const result=copyDraftResult.parse(await reviewedAiDraft('campaign-copy-draft',input));return NextResponse.json({...result,reviewRequired:true});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Draft failed'},{status:400});}}
