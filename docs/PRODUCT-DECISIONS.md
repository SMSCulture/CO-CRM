# Product decisions for Sean

These are intentionally unresolved. No AI, workflow engine, SMS transport, paid service, or finance integration should be implemented until Sean chooses.

## CRM and automation

1. **Workflow engine:** use Brevo automation if its current API supports the required graph and reporting, self-host Dittofeed, or own execution in co_api?
2. **SMS in V1:** include two-way SMS now, outbound campaign SMS only, or park SMS for V2? If included, which approved provider and consent rules apply?
3. **Memberships:** is membership/fundraising part of CRM V1, or part of the separate ticketing/subscriptions project?
4. **Pricing:** is CRM included in existing CultureOwl plans, sold as an add-on, or tiered by contacts/sends/features?
5. **Contact ownership rule:** when does a CultureOwl user become an arts organization's contact: purchase, explicit signup, organization opt-in, or a combination?
6. **CultureOwl audience access:** should organizations see only aggregate reach estimates until they book promotion, or any limited profile data?

## AI and AWS

7. **AI jobs worth supporting:** copy help, segment suggestions, campaign summaries, send-time suggestions, churn/renewal scoring, or none for V1?
8. **Human control:** which AI outputs are suggestions only, and can any action ever run without a person reviewing it?
9. **Data boundary:** may patron/contact data leave AWS for a model provider, or must inference stay inside AWS?
10. **AWS mechanism:** after use cases and the data boundary are chosen, compare Bedrock with a no-AI baseline and a narrowly hosted service. The decision needs expected volume, latency, retention, observability, and cost limits first.
11. **Value test:** what measurable result would make AI worth keeping: time saved, campaign lift, reduced churn, higher ticket attribution, or another target?

## Ticketing finance project

12. **Scope:** does the Eventbrite-style payout/finance section ship with ticketing only, or appear read-only in CRM too?
13. **Payments:** which processor/account model owns balances and payouts?
14. **Tax:** which countries and entity types must the tax onboarding flow support first?
15. **Payout controls:** manual vs scheduled payouts, roles allowed to change bank/tax data, and whether changes require step-up authentication?
