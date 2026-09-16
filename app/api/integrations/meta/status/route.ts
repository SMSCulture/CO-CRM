import { NextRequest,NextResponse } from 'next/server';
import { configured } from '@/lib/integrations/meta-oauth';
export async function GET(request:NextRequest){const raw=request.cookies.get('meta_connection')?.value;return NextResponse.json({configured:configured(),connected:Boolean(raw),storage:raw?'encrypted development session':'none',productionReady:false});}
