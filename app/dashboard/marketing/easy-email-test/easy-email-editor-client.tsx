'use client';

import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { StandardLayout } from 'easy-email-extensions';
import { AdvancedType } from 'easy-email-core';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

const initialValues = {
  subject: 'React 19 smoke test',
  subTitle: '',
  content: {
    type: 'page',
    data: { value: { breakpoint: '480px' } },
    attributes: { 'background-color': '#F5F5F5', width: '600px' },
    children: [
      {
        type: AdvancedType.TEXT,
        data: { value: { content: 'If you can drag blocks from the left panel here, easy-email-editor works under React 19.' } },
        attributes: {},
        children: [],
      },
    ],
  },
};

const CATEGORIES = [
  {
    label: 'Content',
    active: true,
    blocks: [
      { type: AdvancedType.TEXT, title: 'Text' },
      { type: AdvancedType.IMAGE, title: 'Image' },
      { type: AdvancedType.BUTTON, title: 'Button' },
      { type: AdvancedType.DIVIDER, title: 'Divider' },
      { type: AdvancedType.SPACER, title: 'Spacer' },
    ],
  },
];

export default function EasyEmailEditorClient() {
  return (
    <EmailEditorProvider data={initialValues as never} height="100%">
      {() => (
        <StandardLayout showSourceCode categories={CATEGORIES as never}>
          <EmailEditor />
        </StandardLayout>
      )}
    </EmailEditorProvider>
  );
}