import { NextResponse } from 'next/server';
import { importMapRequest, importMapResult } from '@/lib/ai/contracts';
import { reviewedAiDraft } from '@/lib/ai/provider';
export async function POST(request:Request){try{const input=importMapRequest.parse(await request.json());const result=importMapResult.parse(await reviewedAiDraft('contact-import-map',input));return NextResponse.json({...result,reviewRequired:true});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Draft failed'},{status:400});}}
