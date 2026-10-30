# Integration logo slider verification

Verified October 30, 2026 on the current static `global-marketing-gro/main` base. That base predates the supplied dark-grid screenshot, so this change adds the matching dark section as a scoped homepage component without replacing the rest of the website.

- Twelve original company-hosted logos/product/site icons replace monograms. Colors and proportions are preserved; assets are local, so loading the page does not request third-party logo hosts. Source URLs and format-only conversions are recorded in INTEGRATION-LOGO-SOURCES.md.
- One slim, card-free row carries all twelve logos in a single line using one animation frame loop. Native touch/trackpad/keyboard scrolling remains available. Hover, keyboard focus, reduced motion, the existing global motion preference, offscreen status and page visibility stop automatic movement. Temporary user scrolling pauses automatic movement.
- Animation duplicates are hidden from assistive technology and excluded from keyboard tab order. Each original service remains linked once in keyboard navigation and opens its official website in a new tab. The integration CTA opens the existing local integrations page. No claim of a partnership, full live catalog or included configuration is added.
- Without JavaScript or with reduced motion, the twelve original items remain manually scrollable. No carousel dependency or tracker was added.
- The generator updates root HTML and inline standalone/GHL editions. Official logo images are embedded in portable editions.

## Checks

- New regression suite: **11/11 checks pass**, including actual movement, original image decoding, hover/focus pause, image containment, reduced-motion clone removal and preserved manual scroll position, 320/390/768/1440px overflow checks and no-JavaScript scrolling.
- Full existing browser suite: **1,730 assertions / 196 viewport cases / 28 pages / zero failures** at seven widths (320–1920px).
- Repository asset/link/fragment validation: **28 pages pass**.
- `git diff --check`: clean.
- Desktop and mobile section screenshots inspected. The broader control-position check excludes intentional content inside the new nested horizontal scrollports; whole-page overflow and dedicated slider checks still run.

## Reproduce

Use Python 3.12+ to run the generator. Browser tests require Playwright, BeautifulSoup and Chrome/Chromium; the Node regression suite requires Playwright and defaults to the macOS Chrome path.

```sh
python3 project/source/build.py
python3 scripts/check_repo.py
node scripts/test_integration_slider.cjs
python3 project/source/test_site.py
```

Live provider accounts, actual integration syncing, production hosting, screen readers, and browsers other than Chrome were not tested. Current brand assets may change and should be checked against their official sources when refreshed.

Independent review confirmed the reduced-motion scrolling correction and found no remaining material issues. The regression reproduces the prior timer-driven reset before the correction.

The owner requested a single-line strip after the initial two-row version. All twelve marks now share one slim, full-width track without individual card frames or visible text labels. A light neutral strip preserves contrast for the original full-color and dark-ink artwork.
