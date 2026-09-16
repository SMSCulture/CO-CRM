# AI draft adapters

Two server-only routes provide reviewed suggestions: `/api/ai/import-map` and `/api/ai/copy-draft`. Both validate input and structured output with Zod, return `reviewRequired: true`, and never commit contacts or send messages. Configure `AI_DRAFT_ENDPOINT` and `AI_DRAFT_KEY` only in server secrets. The provider choice remains replaceable behind `lib/ai/provider.ts`.
