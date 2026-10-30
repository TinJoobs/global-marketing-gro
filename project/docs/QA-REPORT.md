# Frontend QA Report

Build reviewed: September 8, 2026.

## Result

- Pages reviewed: **28**.
- Responsive viewport cases: **196**.
- Automated assertions: **1718**.
- Failed assertions in the recorded run: **0**.
- Viewport widths: 320, 360, 390, 768, 1024, 1440, 1920 pixels.
- Machine-readable result: `qa-results.json`.
- Reproducible test script: `../source/test_site.py`.

These numbers describe the included test suite. They do not guarantee that every possible browser, integration, or deployment condition is error-free.

## What was checked

### Content and structure

The shared-asset edition was checked for a single main landmark and H1 per page, language attributes, page titles, descriptions, duplicate IDs, parseable JSON-LD, local navigation targets, anchor fragments, and referenced local images and scripts. The checks confirm that the former GMGSB brand label and Lorem ipsum text are absent. Policy drafts and utility pages were checked for noindex settings.

The portable edition was checked for embedded image data, no external script dependencies, and no external stylesheet requirement. GHL fragments were checked for a single scoped root and the absence of nested html, head, or body tags. These checks do not constitute a full HTML validator report.

### Responsive layout

All 28 self-contained pages were rendered at seven widths in headless Chromium. The suite checked page-level horizontal overflow and offscreen main-content links, buttons, and form controls. Initial page scripts ran without uncaught page errors in that run.

Desktop and mobile screenshots were captured for Home, Sales Growth System, Virtual Assistant Services, Contact, Book a Call, Industries, and Portfolio. Selected desktop and mobile screens were visually reviewed. Screenshots are included in `../previews/`.

### Interactions

The recorded run exercised the mobile navigation, Explore dropdown, Escape-key closure, animation-pause control, VA estimator, VA role accordions, FAQ search and empty state, and a printable-guide checklist and reset control.

The contact preview was checked for all eleven documented fields and disabled inputs/submission when no real GHL form is connected. A no-JavaScript presentation check confirmed visible main content and navigation, plus a disabled estimator rather than an editable slider with stale output.

### Simulated GHL integration hooks

Tests used example.test widget URLs, never a real GHL account. They checked explicit click-to-load gating, iframe creation, configured height and ID, route rewriting, allowed UTM forwarding, exclusion of unrelated query parameters, service-specific calendar selection, and general-calendar fallback.

A location proxy supplied test page URLs because live navigation was unavailable in the test environment. The website interaction script itself was unchanged for those simulated tests.

## Environment and limitations

Rendering used local Chromium through Playwright and `page.set_content()` with the self-contained HTML edition. The environment blocked direct file and localhost browser navigation. Internal destination files and fragments were checked statically; a real hosted site's navigation and HTTP responses were not tested.

No live GHL form submission, appointment reservation, iframe resizing from an actual provider, contact creation, custom-field mapping, workflow enrollment, ownership assignment, notification delivery, email/SMS behavior, or GHL page-builder import was tested. No external service was changed.

Safari, Firefox, Edge, real mobile devices, screen readers, production performance, security headers, and host-specific routing remain acceptance checks for the final deployment. Basic semantic, keyboard, reduced-motion, and contrast-conscious design measures are included; this report is not an accessibility certification or a complete WCAG audit.

The legal pages remain owner-review drafts. Leadership details, contact details, portfolio permissions, pricing, and final images still require business-owner approval. Source-resolution limits in the supplied mockup remain visible in the extracted photo assets.

## Before launch

Follow `LAUNCH-CHECKLIST.md` and `GHL-INTEGRATION.md`. Add the real embeds, approve final policies, confirm routes and contact details, and complete real submissions and bookings on the published site before directing visitors to it.
