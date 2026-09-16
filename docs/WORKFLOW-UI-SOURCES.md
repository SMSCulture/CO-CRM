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
