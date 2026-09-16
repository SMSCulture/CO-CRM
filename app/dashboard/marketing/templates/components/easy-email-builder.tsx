'use client';

import dynamic from 'next/dynamic';
import { LoaderCircle } from 'lucide-react';

const Editor = dynamic(() => import('./easy-email-editor-client'), {
  ssr: false,
  loading: () => <div className="flex min-h-[700px] items-center justify-center rounded-xl border bg-white"><LoaderCircle className="h-6 w-6 animate-spin text-co-blue"/><span className="ml-2 text-sm text-muted-foreground">Loading editor…</span></div>,
});

export function EasyEmailBuilder() { return <Editor />; }
