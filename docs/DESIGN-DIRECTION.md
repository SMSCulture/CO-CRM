# CO-CRM design direction: Blue Signal

Date: 2026-09-16

## Decision

Use a light-first operating interface with a complete, deliberate dark theme later, not an automatic inversion now. CRM work is dense, long-running and table-heavy; the light theme gives the cleanest hierarchy for scanning records, filters and financial values. Dark mode should ship only when every semantic token, chart, table state, email preview and workflow canvas has been checked. A half-dark product with white panels reads as broken.

CultureOwl blue is the system's signal color. It marks focus, selection, active navigation, primary actions and live data. Purple, orange, pink and red remain narrow semantic accents for CultureOwl promotion types, warnings and destructive states. They do not compete with blue for ordinary actions.

## Brand system

- Canvas: cool near-white rather than mixed warm grey and white.
- Surfaces: one white panel level, one soft blue-tinted raised/selected level, consistent borders.
- Primary blue: current `#3d98d3` brand hue; use darker blue for text and controls where contrast requires it.
- Radius: 12-16px for major panels, 8-10px for controls, full pills only for status and tags.
- Type: Plus Jakarta Sans remains. Use 30-32px page titles, 14px table body, 12px metadata and uppercase only for tiny section labels.
- Spacing: 8px base rhythm. Dense screens use 12/16/24, not arbitrary gaps.
- Icons: Lucide at 16px in controls, 18-20px for navigation. Never decorate every value.

## Layout

Follow the current best SaaS pattern of predictable layers:

1. Stable left navigation.
2. Page header with title/context on the left and the single primary action on the right.
3. View bar with saved view, search, quick filters, sort/columns/density.
4. Content surface, usually a table or canvas.
5. Contextual bulk toolbar only after selection.

Linear's 2026 refresh stresses preserving rich information density without making every element compete for attention, and putting repeated actions in predictable locations. HubSpot's updated record index uses saved views, quick filters and configurable tables. Attio treats filters/sorts as view state. Those are the right patterns for CO-CRM.

## Motion

Motion explains state; it does not decorate the product.

- 120-160ms for hover, focus and selection.
- 180-220ms for panels, sheets and view changes.
- Ease-out for entry, ease-in for exit.
- Animate opacity and transform only in repeated table/canvas interactions. Avoid layout animation on large lists.
- Rows do not float or bounce. Selection gets a blue wash and a 2px inset edge.
- Sheets slide from the same side everywhere.
- Skeletons replace spinners for page regions.
- Respect `prefers-reduced-motion`; all core actions remain understandable with motion off.

## Table redesign

The proof piece is Contacts. The redesign provides:

- a clear white data surface separated from the blue-grey canvas
- sticky header and controlled horizontal overflow
- compact 56px rows with stronger identity and quiet secondary text
- initials avatar for scanability without image dependency
- status badge, consent indicator and limited visible tags
- sortable spend and last-active columns
- row hover, keyboard-visible contact links and blue selection state
- working select-all plus a contextual selected-count toolbar
- numeric alignment using tabular figures
- footer with shown/selected counts and explicit mock-data label while backend contact scope is missing

Next table steps are saved views, column chooser, density control, pagination, pinned columns and persisted sorting. Those should reuse one table primitive rather than diverging page by page.

## Light and dark token strategy

Every component uses semantic tokens only: canvas, surface, elevated surface, foreground, muted foreground, border, input, primary, primary-hover, selected, warning, danger and success. Dark mode gets its own values for those roles. No component should contain a one-off white background that bypasses the token system.

## Source notes

- Linear design refresh: https://linear.app/now/behind-the-latest-design-refresh
- HubSpot record index overview: https://knowledge.hubspot.com/records/understand-the-updated-index-page
- HubSpot record filters: https://knowledge.hubspot.com/records/view-and-filter-records-in-the-updated-index-page
- Attio table views: https://attio.com/help/reference/managing-your-data/views/create-and-manage-table-views
- Attio filters and sorts: https://attio.com/help/reference/managing-your-data/views/filter-and-sort-views
- Carbon data table usage: https://carbondesignsystem.com/components/data-table/usage/
- Carbon data table style: https://carbondesignsystem.com/components/data-table/style/
- Material semantic color roles: https://m3.material.io/styles/color/roles
- Stripe app components: https://docs.stripe.com/stripe-apps/components
