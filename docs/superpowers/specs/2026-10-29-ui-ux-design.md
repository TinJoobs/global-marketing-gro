# GMG UI and UX refresh

The owner asked for UI and UX improvements, competitor research, installed-skill guidance, and explicitly delegated design choices and execution on 2026-10-29.

## Intent
Help business owners understand GMG's two core offers and choose an appropriate conversation with less reading and navigation friction.

## Direction and constraints
- Retain the navy/teal identity, brand assets, existing prices, service claims, URLs, and static HTML/CSS/JavaScript architecture.
- Prioritize readable 16px body text, clear hierarchy, restrained motion, visible keyboard focus, and comfortable touch targets.
- Make pricing and the process directly discoverable in the header. Group secondary resources and services under descriptive disclosures.
- Replace the lengthy homepage with a concise offer, two service paths, a practical explanation of delivery, relevant industries, and useful FAQs.
- Show a clearly labeled illustrative workflow, without invented performance metrics, customers, reviews, or live activity.
- Keep form/calendar integrations opt-in. When absent, explain availability in visitor-facing language and offer the existing public phone contact. Never imply an inquiry was sent or appointment reserved.
- Keep root pages, standalone files, and GHL fragments synchronized from the existing source generator. Fix its repository-root path as part of making the changes reproducible.
- No change to credentials, live GHL settings, legal policies, or deployment configuration. Deliver a reviewable branch; do not merge or publish.

## Approaches considered
1. Cosmetic CSS-only polish: small but leaves the long homepage and hidden navigation structure.
2. Focused brand-preserving refresh (selected by agent under delegated judgment): improve shared layout and journeys with existing components and tooling.
3. New framework/rebrand: unnecessary migration and maintenance cost for a static business site.

## Research
Reviewed https://belaysolutions.com/services/assistant/virtual, https://www.prialto.com/, and https://www.wishup.co/ on 2026-10-29. Useful patterns: distinct services, an explicit onboarding process, task-based explanations, and a prominent consultation action. These inform hierarchy and flow; competitor text, claims, and assets are not reused.

UI UX Pro Max's B2B Service result supports clear service paths, readable type, keyboard access, and prominent contact actions. The agent selected GMG's existing palette and system fonts instead of importing the result's legal-sector typography.

## Verification
Run repository link/structure validation, rebuild all three editions, execute the existing 28-page responsive/interaction suite, and add regression coverage for navigation focus/closure and unavailable booking alternatives. Inspect fresh desktop/mobile screenshots.
