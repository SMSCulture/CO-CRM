'use client';

import dynamic from 'next/dynamic';

const EasyEmailEditor = dynamic(() => import('./easy-email-editor-client'), { ssr: false });

export default function EasyEmailTestPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <EasyEmailEditor />
    </div>
  );
}
