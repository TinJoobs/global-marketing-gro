# Sitewide glass and layout repair — November 1, 2026

Base: e37b934738e62333140024bf75bf17a29d66de2e, including the latest homepage/megamenu changes.

Observed: the replacement cinematic stylesheet removed all workflow/story layout rules, leaving a stacked unstyled diagram; the industry's sticky element sits inside an overflow-hidden ancestor and reserves thousands of pixels of blank space; the mobile megamenu sits outside the scrollable navigation; closed desktop menus retain focusable links; the pricing badge overlaps tier content at narrow widths; forms/checklists and several older cards retain incompatible opaque or light surfaces. Build/lint/66 tests pass but do not catch these visual regressions.

Design: one navy/blue/teal glass system with translucent tinted surfaces, light edges, restrained 12–18px blur, consistent radii and readable text. Apply it to shared cards, navigation, pricing, testimonials, guides, forms, directory controls, calls to action and modal panels. Preserve logo colors, package data, calculator math and current CRM/calendar flows. Use opaque fallbacks where backdrop filters are unsupported; remove expensive blur for print/forced colors.

Execution:
1. Restore the missing story/hero foundation styles without replacing recent content. Fix menu DOM/focus/resize behavior with regression checks.
2. Replace the broken vertical industry scroll with a native full-width, keyboard/touch-accessible glass carousel, arrow controls and reduced-motion support. Keep existing industry information and assets.
3. Consolidate glass surfaces and repair pricing alignment, guide checklists, forms, spacing, image fallbacks, and mobile layouts. Keep only the three client quotes supported by the published GMG site; remove unsupported aggregate and star-rating claims.
4. Verify every route at mobile/tablet/desktop widths, computed contrast, visible controls, native carousel navigation, workflow stages, popup flows and source-backed pricing. Run build/lint/tests and existing browser suites. Review independently before pushing with an expected-head check.

## Verified outcome

- The two new Header/carousel regressions failed before the fixes and now pass. Final suite: **68 tests across 16 files**, strict build and ESLint passed.
- Glass browser suite passed **128 checks** (all 32 routes at 320/390/768/1440px), restored grid/diagram dimensions, bounded industry section height, arrow/keyboard access to the last industry, successful loading of all six industry images, three published client testimonials, hidden closed menus and reachable mobile menu links. No page errors.
- Independent review identified lost focus when a focused mobile submenu was hidden while resizing to desktop. A browser assertion reproduced it, focus now restores to the corresponding visible trigger, and the complete suite/browser checks passed again. No remaining material review findings.
- Existing 32-route/36-responsive-check browser suite passed, including official logos in one line, reduced-motion/hover/focus behavior, calculator arithmetic/validation/signup failure, legacy links and crawler assets.
- Cinematic/popup browser suite passed, including all three story stages, reduced-motion fallback, 14 mock calendar slots, retry and consent feedback, booking with failed secondary tracking, inert background, Escape and mobile/desktop focus restoration. All test submissions were intercepted.
- No runtime dependencies added. JS decreased from 570.69kB/175.60kB gzip in the latest baseline to 559.15kB/171.12kB gzip. The existing >500kB bundle advisory remains; route-level splitting is a separate future optimization. Glass/restored layout CSS adds ~4.9kB gzip. Industry photographs now use native lazy-loaded images with a decorative fallback instead of eager CSS backgrounds.
- Saved desktop/mobile previews under `docs/previews/glass/`. Safari/device-specific and screen-reader checks, hosted deployment, and real booking delivery are not asserted by these local Chrome checks.
