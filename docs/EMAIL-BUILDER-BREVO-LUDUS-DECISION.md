# Brevo vs Ludus email builder decision - September 16, 2026

## Answer
Use Brevo's editor information architecture, implemented with Sean's open-source Easy Email/MJML stack. Brevo publicly documents the actual editor anatomy in detail: canvas, Content/Style left navigation, structural sections vs content blocks, reusable sections, responsive visibility, preview/test, history and send/save actions. Ludus confirms a drag-and-drop, no-code, branded builder with templates, merge tags, event purchase buttons, recipient/timing steps and prior campaigns as templates, but its public sources do not document a more advanced editor interaction model. Ludus is the better source for arts-specific content and workflow; Brevo is the stronger UI reference.

## Applied pattern
- Full-height editor immediately under one compact, route-aware Marketing tab bar.
- No repeated page eyebrow/title/description above the builder.
- Drag/drop blocks and sections from Easy Email.
- MJML responsive output and source view.
- Seeded arts season announcement content.
- Preserve CultureOwl campaign workflow, merge tags, event CTAs and audience selection as integrations around the editor rather than rebuilding editor chrome.

## Sources
- https://help.brevo.com/hc/en-us/articles/360016831820-Overview-of-the-Drag-Drop-email-editor
- https://help.brevo.com/hc/en-us/articles/360016873319-About-sections-and-content-blocks
- https://help.brevo.com/hc/en-us/articles/360017636539-Configure-your-email-layout-and-design-with-the-Style-tab
- https://support.ludus.com/email-design-tool
- https://support.ludus.com/create-a-marketing-campaign
- https://support.ludus.com/reuse-prior-marketing-campaign-as-a-template
- https://hello.ludus.com/marketing
