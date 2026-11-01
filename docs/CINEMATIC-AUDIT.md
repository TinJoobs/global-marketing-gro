# GMG audit — November 1, 2026

Base: `cce1157d5ab48612eff963038ce266d02bc27311`. Read latest source before changes. Audited the separate live domain with desktop Chrome at 1440×1000 and mobile at 390×844.

## Findings before implementation

- **Critical — full app blank at startup.** Browser integration testing reproduced `useModal must be used within a ModalProvider`. The latest App placed ModalProvider inside Layout, leaving Header/Footer outside the provider. Existing App tests mocked Layout and missed the production failure. Move the provider above Layout and cover real shared navigation with a regression test.

- **Important — booking CRM event never sent.** `BookingModal.handleSubmit` calls `buildTrackingPayload` after a successful booking but never calls `postTrackingEvent`. The lead metadata/consent event is discarded. Preserve the booked appointment if secondary tracking fails and never encourage a duplicate booking.
- **Important — calendar failures look like no availability.** A rejected availability request becomes an empty array with the message “No times are open.” Distinguish connection errors, offer retry, show the visitor's timezone, and make all available slots selectable (the current UI silently truncates to 12).
- **Important — booking validation feedback is incomplete.** Consent error is set but not rendered. Field errors are not associated with controls. Replace the incomplete ARIA listbox with native radio controls and disable the form while submitting.
- **Important — modal background not inert.** Focus trapping alone leaves background navigation exposed to assistive technology. Hide/inert the background while the modal is open, restore it on close, and test keyboard/focus restoration.
- **Verification regression — baseline lint fails.** Unused `useModal` import in BookingModal. Baseline build succeeds; lint has one error.
- **Verification regression — 3 of 56 tests fail.** Standalone resource/pricing/integrations test fixtures omit the new ModalProvider. Fix the fixtures while preserving production provider requirements.
- **Brand drift.** Active theme overrides blue/navy tokens with forest green and gold, including a gold value named `--teal`. Live GMG uses #014EA6 blue, #1E6AA9 and #0F4C75 text, white, and navy (#000321). Preserve these brand anchors; use logo-inspired teal for lighting and a small warm accent.
- **Visual gap.** Home repeats uniform cards; the hero is animated but has no cinematic narrative. Add a layered blue/teal hero, restrained entrances, a sticky three-chapter workflow story, and meaningful depth.
- **Live structural issues.** The older live home has eight H1 headings and duplicate support bullets. The React app already uses one H1. The live domain is a separate deployment, so source fixes do not by themselves publish that domain.

## Scope and safety

No browser JavaScript errors, broken loaded images, or horizontal overflow were found on the live home at the two audited sizes. No live forms or bookings were submitted. CRM/calendar functional verification uses intercepted requests, not production appointments. This is a targeted functional/design audit, not a penetration test or legal review.

## Dependency follow-up

The November 1 npm audit reported 12 moderate development-tool findings through minimatch 10.2.6, after [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) was published/reviewed. Pin the patched 11.0.1 transitive override and re-run lint, tests, production build and audit. This is build/lint tooling, not a runtime addition. Remove the override when upstream tooling adopts the patched major.

## Review follow-up

The fresh reviewer found stylesheet order overriding popup error contrast and the 44px close target. Browser assertions reproduced the red error color. Load the cinematic overrides after modal.css and verify the readable #FFADAD error color and 44px close target. The other reviewed changes had no material findings.

## Verified outcome

- Fixed the blank startup by placing ModalProvider above Layout; the real-header/footer regression failed first and now passes.
- Fixed booking tracking, availability retry/empty states, slot validation/deduplication/sorting, all available time choices, timezone display, consent/error associations, and background isolation. The eight initial regression checks failed before the fixes and now pass. Browser tests also reproduced and verified the mobile focus-restoration fix.
- Implemented navy/blue/teal cinematic styling with CSS 3D, canvas depth, the existing Philippines backdrop, finite hero entrances, and three scroll-driven workflow chapters. No new runtime dependency. Pricing, 42 integrations, official-logo strip, calculator, and page routes remain intact.
- Final strict TypeScript/production build and ESLint passed. All **66 tests** passed across 14 files.
- Production Chrome checks passed: **32 routes**, **36 responsive checks** at 320–1920px, all 12 official logo images, single-row motion/hover/focus/reduced-motion/remount handling, calculator arithmetic and validation, mocked signup failure, legacy aliases and crawler files.
- Additional production browser checks passed: all 3 scroll chapters, reduced-motion/static story, 14 selectable timezone-aware slots, retry after availability failure, visible consent validation, mocked successful booking with failed secondary tracking, inert background, focus trap, Escape, desktop/mobile focus restoration, scroll restoration, error color and 44px close target. No browser page errors.
- Clean temporary `npm ci --ignore-scripts` installed 332 packages and reported **zero vulnerabilities**, confirming the patched lockfile. No force audit downgrade was used.
- Real calendar availability was checked with GET only and returned HTTP 200 with open slots. Booking/contact submissions used intercepted endpoints only; no real appointments or test leads were created.
- Browser screenshots: `docs/previews/cinematic/`. The source update does not by itself confirm deployment of the separately hosted live domain. Live post-deployment booking delivery, other browsers and assistive-technology testing remain outside this local verification.
