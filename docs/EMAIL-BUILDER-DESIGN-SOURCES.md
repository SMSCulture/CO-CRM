# Email builder design sources

Checked September 16, 2026. These sources guide the UI pattern, not a copy of another product.

- Brevo, [Drag & Drop editor overview](https://help.brevo.com/hc/en-us/articles/360016831820-Overview-of-the-Drag-Drop-email-editor): the builder's sidebar separates Content and Style, while the canvas stays central.
- Brevo, [Sections and content blocks](https://help.brevo.com/hc/en-us/articles/360016873319-About-sections-and-content-blocks): sections provide column structure and blocks provide content.
- Brevo, [Style tab](https://help.brevo.com/hc/en-us/articles/360017636539-Configure-your-email-layout-and-design-with-the-Style-tab): email-wide typography, colors, spacing and buttons live together.
- Mailchimp, [New Builder](https://mailchimp.com/help/design-an-email-new-builder/): templates, content blocks and desktop/mobile styles are distinct controls.
- HubSpot, [Edit marketing email content and design](https://knowledge.hubspot.com/marketing-email/edit-marketing-email-content-and-design): prebuilt modules move directly on the canvas.
- Stripo, [Structures and containers](https://support.stripo.email/en/articles/6424840-what-are-the-structures-and-containers-how-to-use-them): the editor separates structural rows/columns from leaf blocks.

## Applied direction

- left rail: Content, Layouts, Templates;
- large neutral canvas in the middle;
- right rail: Content properties and email-wide Design;
- top actions: desktop/mobile, Preview & test, Use template;
- prototype/save state remains explicit;
- retain the current email document and HTML renderer rather than replacing the underlying model.
