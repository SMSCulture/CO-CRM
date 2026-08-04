import type { TReaderDocument } from '@usewaypoint/email-builder';

// Original starter documents (not copied from usewaypoint's own samples) —
// just enough structure to demonstrate the block types this editor supports.

export const BLANK_TEMPLATE: TReaderDocument = {
  root: {
    type: 'EmailLayout',
    data: {
      backdropColor: '#F5F5F5',
      canvasColor: '#FFFFFF',
      textColor: '#242424',
      fontFamily: 'MODERN_SANS',
      childrenIds: ['block-heading'],
    },
  },
  'block-heading': {
    type: 'Heading',
    data: {
      props: { text: 'Your email starts here' },
      style: { padding: { top: 24, bottom: 16, right: 24, left: 24 } },
    },
  },
} as TReaderDocument;

export const WELCOME_EMAIL_TEMPLATE: TReaderDocument = {
  root: {
    type: 'EmailLayout',
    data: {
      backdropColor: '#F5F5F5',
      canvasColor: '#FFFFFF',
      textColor: '#242424',
      fontFamily: 'MODERN_SANS',
      childrenIds: ['block-heading', 'block-text', 'block-button', 'block-divider', 'block-footer'],
    },
  },
  'block-heading': {
    type: 'Heading',
    data: {
      props: { text: 'Welcome to CultureOwl' },
      style: { padding: { top: 32, bottom: 8, right: 24, left: 24 } },
    },
  },
  'block-text': {
    type: 'Text',
    data: {
      props: { text: "We're glad you're here. Here's how to get started with your account." },
      style: { padding: { top: 4, bottom: 16, right: 24, left: 24 } },
    },
  },
  'block-button': {
    type: 'Button',
    data: {
      props: { text: 'Get Started', url: 'https://example.com', buttonBackgroundColor: '#2563EB' },
      style: { padding: { top: 8, bottom: 24, right: 24, left: 24 } },
    },
  },
  'block-divider': {
    type: 'Divider',
    data: { style: { padding: { top: 8, bottom: 8, right: 24, left: 24 } } },
  },
  'block-footer': {
    type: 'Text',
    data: {
      props: { text: 'You are receiving this email because you signed up for an account.' },
      style: { padding: { top: 16, bottom: 32, right: 24, left: 24 }, fontSize: 12, color: '#8A8A8A' },
    },
  },
} as TReaderDocument;

export const SAMPLE_TEMPLATES = [
  { id: 'blank', label: 'Blank', document: BLANK_TEMPLATE },
  { id: 'welcome-email', label: 'Welcome Email', document: WELCOME_EMAIL_TEMPLATE },
];
