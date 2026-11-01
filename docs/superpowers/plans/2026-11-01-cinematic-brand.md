# GMG Cinematic Brand Implementation Plan

**Goal:** Deliver the requested cinematic design in the existing React app, following the live GMG brand, after fixing the audit's verified regressions.
**Architecture:** Retain React/Vite/TypeScript, native CSS 3D/canvas and existing Framer Motion. Reuse the geographic SVG and official integration logos. No new runtime dependency, video download, scroll hijacking, or WebGL bundle is needed.
**Spec:** User's requested cinematic treatment, existing logo/map/pricing/calculator requirements, and `docs/CINEMATIC-AUDIT.md`.

## Design

Navy #06162C and existing blue #014EA6 anchor the site. White/ice text and logo-inspired teal #72E4D4 light the hero and workflow. Warm #BD942D remains a small secondary detail. The homepage opens with expressive but readable typography, illuminated depth, the Philippines map, and the existing CRM/VA story. Three scroll chapters explain capture, follow-up, and human support with a sticky illustrative workflow. All chapter text stays readable without motion. Retain official logos in one line, source pricing, calculator, service links and current modal CTAs.

Approaches considered: CSS 3D plus existing motion (chosen under the user's instruction to execute, preserves performance and code); a new WebGL scene (additional bundle/context cost); video background (asset/download cost and less meaningful interaction). No further design approval is needed: the user approved this direction and explicitly requested execution.

## Global constraints

- Use existing navy/blue brand, enhanced headset logo, source-backed packages, 42 integrations, calculator, CRM identifiers and calendar ID.
- Respect reduced motion; pause background animation offscreen/hidden; no scroll trapping; readable touch/keyboard experience.
- Keep React source and static archive isolated; retain current remote history.
- Do not send real test leads or bookings.

## Review focus

- Calendar request failure, empty slots and malformed slot data must have distinct safe outcomes.
- A booked appointment must never be retried because secondary analytics failed.
- Popup focus, background isolation and scroll restoration must work with StrictMode and route changes.
- Mobile and reduced-motion users must see every chapter and reach every CTA.
- Source updates must preserve concurrent remote changes and all approved content.

## Task 1 — audit fixes

Files: modal components, `src/lib/booking.ts`, provider-dependent test fixtures, new modal/booking tests.
1. Write and run failing regressions for failed availability retry, all slots, consent feedback, booking tracking, malformed slots and inert background restoration.
2. Implement the smallest fixes and associate form errors. Keep booking success independent of secondary tracking.
3. Repair provider test wrappers, remove unused import, run suite/build/lint.

## Task 2 — cinematic design

Files: `src/theme.css`, `src/hero.css`, `src/pages/home/HomeHero.tsx`, `src/pages/home/HomeSections.tsx`, new `ConnectedStory.tsx`, `src/cinematic.css`, `src/lib/heroMotion.js`.
1. Apply navy/blue/teal semantic palette and consistent surface/button typography.
2. Rework hero composition and layered lighting; reuse map/3D workflow. Add finite entry animation and offscreen-safe atmospheric motion.
3. Build a three-chapter IntersectionObserver story with static fallback, cleanup and reduced-motion support. Browser assertions cover active chapter changes and mobile/static content visibility.
4. Polish responsive lower sections, cards, CTA and modal states while retaining information and links.

## Task 3 — verify and publish

Run strict production build, lint and all tests. Run 32-route/36-layout browser QA and additional popup/chapters/reduced-motion checks using mocked endpoints. Inspect desktop/mobile screenshots. Review final diff independently, fix material findings, then re-read remote main and publish without force. Record actual results and limits in audit doc.

## Execution record

Task 1: Complete. Baseline: build passed, lint 1 error, 3/56 tests failed. Eight new modal/calendar regressions RED→GREEN; full-app startup regression RED→GREEN. Existing provider-dependent test fixtures corrected.
Task 2: Complete. Native CSS 3D/canvas and existing assets retained; chapter observer test and production scroll/reduced-motion assertions passed. Mobile hidden-trigger focus restoration reproduced in browser and fixed.
Task 3: Complete locally. Build/lint and 66 tests passed; 32-route/36-layout browser QA and cinematic/popup suite passed. Fresh independent review found one CSS cascade issue; classified as an accessibility issue because it overrode readable error text and the 44px close target. Reproduced RED in browser; fixed import order; full suite and browser checks GREEN. No deferred minor findings.
Dependency audit follow-up: minimatch development-tool finding patched with an exact 11.0.1 override, with maintained upstream packages kept. Clean install and audit report zero vulnerabilities. No change to runtime dependencies. Publishing uses the verified latest remote head as parent and an expected-head lease, without force.
