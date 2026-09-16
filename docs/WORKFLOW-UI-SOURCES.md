# CRM workflow list and editor patterns - September 16, 2026

HubSpot and Brevo separate scalable monitoring from visual editing. The list should be a dense searchable table with status, trigger, enrollments, and recent activity; details/history/logs live after opening. Brevo exposes quick statistics on the workflow page and separate workflow/contact logs. HubSpot centers enrollment history and workflow details. Ludus is much simpler and event-relative, useful for arts templates but not a scalable UI reference. Salesforce reinforces saved/custom list views for large automation inventories.

For the editor, use the React Flow ecosystem already in the app with an n8n-style categorized, searchable node rail, large canvas, minimap/controls, click-to-add, handles and a configuration drawer. Avoid rebuilding graph mechanics. Prefetch editor links and disable animated fit construction so the canvas opens whole.

Sources:
- https://knowledge.hubspot.com/workflows/understand-your-workflow-details-page
- https://knowledge.hubspot.com/workflows/workflow-enrollment-history
- https://help.brevo.com/hc/en-us/articles/15445936637330-Overview-of-the-new-automation-editor
- https://help.brevo.com/hc/en-us/articles/115000263710-What-are-automation-logs-workflow-logs-event-logs-contacts-in-workflow
- https://help.brevo.com/hc/en-us/articles/22724507709714-Review-the-statistics-and-email-report-of-an-automation
- https://support.ludus.com/automations
- https://help.salesforce.com/s/articleView?id=platform.flow_monitor_list_views.htm&language=en_US&type=5


## Zapier editor correction

The visual reference moved from n8n to Zapier after review. The editor now favors Zapier's cleaner step language and treatment: explicit trigger/action labels, white compact step cards, orange trigger identity, a restrained warm canvas, a single "Add a step" library, and configuration on selection. React Flow remains the open-source graph engine so branching and stored node positions still work.

- [Zapier: get started with Zapier](https://zapier.com/blog/get-started-with-zapier/)
- [Zapier: multi-step Zaps](https://zapier.com/blog/maximize-productivity-with-multi-step-zaps/)

Zapier's documented editor pattern is top-to-bottom steps, plus buttons between steps, app/action choice, Configure, Test, and Publish. This prototype adopts the visual and interaction hierarchy without copying Zapier code or branding.
