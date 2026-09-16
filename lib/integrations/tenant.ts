import {NextRequest} from 'next/server';
const TENANT=/^[a-zA-Z0-9_-]{1,80}$/;
export function tenantFrom(request:NextRequest){const tenant=request.nextUrl.searchParams.get('tenant')||request.headers.get('x-cultureowl-tenant')||(process.env.NEXT_PUBLIC_DEMO_MODE==='true'?'demo-company':'');if(!TENANT.test(tenant))throw new Error('A valid organization context is required');return tenant}
