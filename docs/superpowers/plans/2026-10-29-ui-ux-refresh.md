# GMG UI and UX Refresh Implementation Plan

> **For agentic workers:** Use executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking. The owner delegated judgment and asked to proceed; implement in this session.

**Goal:** Make GMG easier to understand, navigate, and contact across desktop and mobile.
**Architecture:** Retain shared static assets and the Python page generator. Rebuild website, portable pages, and GHL fragments from the same source.
**Tech Stack:** HTML, CSS, vanilla JavaScript, Python 3.12+, Playwright.
**Spec:** `docs/superpowers/specs/2026-10-29-ui-ux-design.md`

## Global Constraints
Keep navy/teal branding, prices, existing service claims and URLs. No new production dependencies. No invented proof or working integrations. No merge or publish.

## Review Focus
- Mobile menu and dropdown focus must remain visible and recover after Escape.
- Resizing to desktop must clear stale mobile/dropdown state.
- Unconfigured forms/calendars must offer a real contact path without accepting data.
- Existing configured widget URLs, routes and campaign forwarding must still work.
- All 28 pages must fit narrow screens; all three editions must share updates.

### Task 1: Baseline and regression coverage
Files: `project/source/test_site.py`, `scripts/test_navigation.cjs`, generator output paths.
- [x] Run root repository validator; preserve upstream output for comparison.
- [x] Add browser tests that catch open menus persisting after focus leaves, stale disclosure state after resize, and missing phone alternatives at unconfigured widgets. Run and observe failures.
- [x] Use the existing full responsive suite with repository-root paths and the installed Chrome executable.

### Task 2: Shared navigation and visitor-facing contact states
Files: `assets/main.js`, `assets/styles.css`, `project/source/build.py`.
- [x] Add mutually exclusive disclosures, keyboard/focus/outside closure, desktop reset, and appropriate focus restoration.
- [x] Expose How it works and Pricing directly; group solutions/resources using descriptive labels.
- [x] Improve the unconnected booking/contact presentations with existing phone fallback; preserve disabled forms and live embed behavior.
- [x] Run navigation regression checks and the repository validator.

### Task 3: Visual hierarchy and homepage
Files: `assets/styles.css`, `project/source/build.py`, generated root/standalone/GHL pages.
- [x] Replace repetitive homepage sections with concise service choices, workflow illustration, delivery process, selected industries, and FAQs.
- [x] Refine typography, spacing, cards, header, buttons, and mobile reading/touch layouts using shared semantic colors.
- [x] Correct generator output paths and create output directories automatically; rebuild all editions.
- [x] Run full responsive/interaction checks and inspect desktop/mobile screenshots.

### Task 4: Review and delivery
- [x] Review changed code against spec, integration contracts, and browser findings; fix material issues with regression coverage.
- [x] Record fresh QA results and material limitations.
- [x] Save the completed change on a separate GitHub branch and open a draft PR for review; leave main and deployment untouched.
