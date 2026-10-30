# UI and UX refresh verification

Reviewed October 29, 2026. This report covers the brand-preserving UI refresh; the original QA report remains a historical record.

## What changed
- A shorter homepage organized around two service choices, an illustrative workflow, delivery steps, human support, industries, and FAQs.
- Pricing and How it works directly available in the header; named Solutions and Resources disclosures replace the broad Explore menu.
- More readable shared typography, larger touch targets, consistent card/button styles, and responsive grid sizing.
- Menus close when focus leaves or the visitor clicks outside. Escape and breakpoint transitions preserve focus on visible controls.
- Unavailable contact and booking widgets offer the existing public phone number. No data is submitted and no appointment is implied. Preview questions are optional to expand.
- The source generator now rebuilds the repository-root website and all standalone/GHL editions from one command.

## Results
- Repository structure, assets, local links and fragment validation: **28 pages passed**.
- Full browser suite: **1,717 assertions, 196 viewport cases, 0 failures** across 28 pages at 320, 360, 390, 768, 1024, 1440, and 1920 pixels.
- Targeted navigation/contact suite: **8 of 8 passed**. The new tests reproduced failures before the fixes, including focus loss on resize.
- Existing estimator, FAQ filtering, role expansion, guide checklists, no-JavaScript presentation, and simulated GHL routing/iframe/UTM checks remain passing.
- Reviewed fresh desktop and mobile homepage screenshots.
- Independent read-only code review found one material issue: focus loss when a focused dropdown link was hidden at a breakpoint. Added regression tests in both directions, corrected focus restoration, and reran both suites successfully.

## Reproduce
Use Python 3.12+ for the generator. Browser dependencies are development-only; the deployed site still has no runtime dependencies.

```bash
python3 project/source/build.py
python3 scripts/check_repo.py
python3 -m pip install -r project/source/requirements-dev.txt
python3 project/source/test_site.py
node scripts/test_navigation.cjs
```

The Node test requires the Playwright package. Both browser suites accept `GMG_BROWSER_EXECUTABLE`; the Node suite defaults to the macOS Chrome application path. Python also detects Chromium/Chrome. The full suite writes `qa-results.json` and screenshots under `project/previews/`.

## Review images
- [Desktop homepage](../previews/home-hero.png)
- [Mobile homepage](../previews/home-mobile-hero.png)

## Limits
Checks used headless Chrome and test widget URLs. Live GHL submissions, appointment reservations, actual telephone availability, production hosting, other browsers, and screen-reader testing were not performed. Existing public phone details were retained. Live forms/calendars and legal-page approval remain owner setup tasks; no external GHL settings were changed and no deployment was requested.

Comparable-business research and design decisions are recorded in [the design specification](../../docs/superpowers/specs/2026-10-29-ui-ux-design.md).
