'use client';

import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { StandardLayout } from 'easy-email-extensions';
import { AdvancedType } from 'easy-email-core';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

const initialValues = {
  subject: 'Season announcement', subTitle: '',
  content: { type: 'page', data: { value: { breakpoint: '480px' } }, attributes: { 'background-color': '#f1f5f9', width: '600px' }, children: [
    { type: AdvancedType.TEXT, data: { value: { content: '<h1>Announcing our new season</h1><p>Share the performances, artists, and stories your audience will not want to miss.</p>' } }, attributes: {}, children: [] },
    { type: AdvancedType.BUTTON, data: { value: { content: 'Explore the season' } }, attributes: { 'background-color': '#1685c0', color: '#ffffff' }, children: [] },
  ] },
};

const categories = [{ label: 'Content', active: true, blocks: [
  { type: AdvancedType.TEXT, title: 'Text' }, { type: AdvancedType.IMAGE, title: 'Image' }, { type: AdvancedType.BUTTON, title: 'Button' },
  { type: AdvancedType.DIVIDER, title: 'Divider' }, { type: AdvancedType.SPACER, title: 'Spacer' }, { type: AdvancedType.COLUMN, title: 'Columns' },
] }];

export default function EasyEmailEditorClient() {
  return <div className="h-[calc(100vh-13rem)] min-h-[700px] overflow-hidden rounded-xl border bg-white shadow-sm">
    <EmailEditorProvider data={initialValues as never} height="100%">
      {() => <StandardLayout showSourceCode categories={categories as never}><EmailEditor /></StandardLayout>}
    </EmailEditorProvider>
  </div>;
}
