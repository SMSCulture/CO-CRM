# Original code and open-source audit

Audited September 16, 2026. Baseline is the last pre-rebuild main commit, `51279a1`; current main is compared against it. This is an assessment, not permission to remove packages.

## Original features

| Area | What the original had | Current state | Assessment |
|---|---|---|---|
| Segment builder | Sean's Shotgun-style browsable filter categories and direct pick flow | **Restored** from `7d2fe3a`, then Birthday, expanded Interests, Location, City, ZIP and Age were added | Original wins. Keep it as the base. |
| Patron profile | Full activity, tags, transactions, custom fields and charts | Preserved and extended with patron context, birthday, interests and location | Current wins. Keep current. |
| Contacts table | Dense sortable patron table | Current adds selection toolbar, status, subscription signal, sorting and stronger scan hierarchy | Current wins. Keep current. |
| Campaign builder | Drag-sort email campaign accordion using dnd-kit | Byte-for-byte unchanged from the pre-rebuild version | Keep. It is functional UI, though backend execution remains separate. |
| Links and tracking | Pixel grid/dialog/table | Byte-for-byte unchanged | Keep. Wire to backend later. |
| Tags and data properties | Tag and custom-property management UIs | Byte-for-byte unchanged | Keep. Wire to company-scoped APIs. |
| Email template builder | Waypoint document model plus an experimental Easy Email route | Waypoint model retained; editor chrome redesigned. Easy Email experiment and packages were removed | Keep Waypoint as the current model. See the Easy Email trial below before permanently dropping it. |
| Workflows | Linear trigger + ordered step cards | Replaced by React Flow canvas with validation and config sheet | Current canvas is stronger for branching logic. Restore the original linear editor only as a simple/list mode if user testing shows the canvas is too heavy. Do not replace the canvas now. |
| Integrations catalog | Searchable catalog of many app cards | Replaced by an honest live-status control plane for the few backend fields that exist | Combine them: current status truth should stay, but the original searchable catalog is better for discovery. Bring it back as an "Available integrations" section, clearly labeled unavailable/roadmap until contracts exist. |
| Dashboard | Four blank metric placeholders | Role-based prototype home with tasks and readiness | Current wins. |
| Analytics | "Not built" placeholder | Curated arts report launch cards | Current wins. |
| Promotion | Six product cards | Same six cards plus credit/readiness dashboard | Current wins, provided no action implies a purchase without approval. |

## Open-source inventory

### Keep and actively use

| Package(s) | Purpose | Used now? | Recommendation |
|---|---|---:|---|
| `@usewaypoint/email-builder` and Waypoint block packages | Email document schema, block rendering and HTML output | Yes | **Keep/integrate.** This is the active template model. Add true drag/reorder and richer image/columns controls rather than switching models blindly. |
| `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | Accessible drag sorting | Yes, campaign builder | **Keep.** Also reuse for email block reorder if the Waypoint editor stays. |
| `recharts` | Patron/event charts | Yes | **Keep.** Extend into retention and campaign reports once data is real. |
| `@xyflow/react` | Node canvas for workflows | Yes, added in rebuild | **Keep.** It is the stronger foundation for branching workflows. |
| Radix UI, `cmdk`, `sonner`, `lucide-react`, Tailwind/shadcn utilities | Accessible UI primitives, command UI, notifications and icons | Yes | **Keep.** Core application UI. |
| Apollo, GraphQL, Zustand, React Hook Form, Zod | Data, state, forms and validation | Yes | **Keep.** Core app foundation. |
| Sentry | Error capture | Yes | **Keep**, but finish instrumentation before production. |

### Trial before deciding

| Package(s) | Purpose | Used now? | Recommendation |
|---|---|---:|---|
| `easy-email-core`, `easy-email-editor`, `easy-email-extensions`, `mjml-browser` | Full drag-and-drop MJML email editor | No. The pre-rebuild code had a `/marketing/easy-email-test` smoke-test route; the rebuild removed the route and packages. | **Trial, don't silently drop.** It offered real drag blocks and source view, but duplicated the Waypoint model and added a large second editor stack. Restore it only on an internal comparison route or Storybook, test React 19 stability/export fidelity, then choose one editor model. Do not ship both to users. |
| `@dittofeed/sdk-web` | Dittofeed event/marketing SDK | No code usage found in baseline or current app | **Assess with backend architecture.** Keep only if CultureOwl will send browser-side events to Dittofeed; otherwise remove and integrate server-side through the backend instead. |

### Likely drop after dependency verification

| Package | Purpose | Used now? | Recommendation |
|---|---|---:|---|
| `cheerio` | Server HTML parsing | No import found | **Drop** unless a planned import/sanitization adapter needs it. |
| `react-final-form` | Form state | No import found; React Hook Form is already the active form stack | **Drop.** Avoid two form libraries. |
| `@opentelemetry/core` | Direct telemetry API | No direct import found | **Drop as a direct dependency** if Sentry/transitive instrumentation does not require it to be declared. Verify with a clean install/build first. |
| `@usewaypoint/document-core` | Waypoint document helpers | No direct import found | **Keep temporarily** until the Waypoint package graph is checked; it may be a peer requirement even without app imports. |
| `@radix-ui/react-visually-hidden` | Accessible hidden labels | No direct app import found | **Keep temporarily** if generated shadcn/Radix components depend on it transitively; otherwise remove in the cleanup pass. |

## Proposed sequence for Sean's decisions

1. Keep the restored segment picker and current patron profile, contacts table, dashboard, reports, campaign builder and tracking.
2. Add the old searchable integration catalog under the current truthful status panel, without implying connections exist.
3. Run a side-by-side internal trial of Easy Email vs the active Waypoint builder. Compare drag/reorder, responsive output, MJML/HTML fidelity, bundle size, React 19 stability and how existing templates migrate.
4. Choose one email document model. Then remove the losing editor and its dependencies.
5. Decide whether workflows need a simple linear mode in addition to the React Flow canvas.
6. Remove confirmed-unused packages only after clean install, lint, TypeScript and production build pass.
