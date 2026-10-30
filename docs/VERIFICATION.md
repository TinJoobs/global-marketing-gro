# Migration and calculator verification

Verified October 30, 2026 against the destination's existing React/Vite source structure.

## Delivered

The approved dark green/gold experience is adapted into the React shell and pages. It includes the enhanced headset/globe logo, CSS 3D workflow with decorative Philippines silhouette, depth particles, exact photo packages/add-ons/terms, 42 documented integration options, source evidence, updated FAQs/VA copy, three native guides, and the requested removal of breadcrumbs, hero platform label and visible motion buttons. Destination-specific pages are retained; five existing resource/career pages are now routed. Old `.html` links redirect to React routes.

The new `/missed-revenue-calculator` is linked on Home, in Resources navigation and on the Resources page. The homepage feature is titled **How Much Revenue Slips Through the Cracks?** and describes estimating lost monthly opportunity before building a follow-up process.

The calculator uses monthly inquiries × unfollowed-up percentage × estimated close rate × average sale value. Defaults are labeled illustrative. Assumptions and formula are visible, results are estimates, zero is valid, invalid/blank/negative/out-of-range values suppress results, and the checklist is local. Results are ungated. Email signup has explicit opt-in consent and pending/error/acknowledgement states. Calculator values are not submitted with signup. Consultation requests carry known plan/billing context and never claim an appointment is reserved.

## Results

- Vitest: **32/32 tests pass** across six test files, including formula boundaries, mocked signup/contact failures and acknowledgements, exact annual package totals, integration filtering, and guide checklists.
- TypeScript application check: passed.
- ESLint: zero errors; one existing Fast Refresh export warning in `src/components/Reveal.tsx`.
- Production build: passed (Vite; approximately 400 kB JavaScript / 118 kB gzip).
- Browser smoke: **32 routes, 62 route/responsive cases**, zero runtime errors. Core pages checked at 320, 390, 768, 1101 and 1440 pixels without horizontal overflow.
- Browser calculator probe: 100 × 30% × 25% × $500 = **$3,750.00**; invalid percentage hides result; mocked signup sends one intercepted request and shows acknowledgement. No live test submission.
- Browser navigation: mobile Escape closes menu; old guide `.html` URL redirects correctly. Two focused browser probes also confirm keyboard focus restoration across desktop/mobile resizing.
- Hero: 11 active CSS animations in normal mode, zero while offscreen; changing to reduced motion sets the hero off with zero running CSS animations. React cleanup disconnects observers and cancels animation frames on unmount.
- Read-only review found a cancellation/hourly-billing policy contradiction with the new packages. Those paragraphs now refer to the three-month minimum and signed service agreement. Reviewer confirmed no remaining material findings.
- A computed contrast scan found inherited low-contrast step numerals on two pages; their text color is corrected. Gradients and all accessibility behavior were not exhaustively audited. Desktop/mobile Home and calculator previews were inspected.

## Reproduce

```sh
npm install
npm run test
npx tsc --noEmit -p tsconfig.app.json
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 5173
# Requires Playwright and Chrome:
node scripts/check-browser.cjs
```

## Existing dependencies and operational limits

The destination dependency ranges and Bun lockfile are retained. A temporary npm lock used to inspect the installed dependency graph reported **10 inherited advisories: six moderate, two high, two critical**, affecting tools/dependencies including Vite/Vitest and Zod. Suggested fixes require major version changes; those upgrades were kept outside this migration. No force upgrade was applied, and the temporary npm lock was removed to follow the repository policy. This is not a dependency security clearance.

Live CRM delivery, email automations, real consultation scheduling, live phone/email availability, production hosting, other browsers and screen readers were not tested. The existing CRM identifiers and intake destination are retained. Delivery automations require the owner's CRM configuration. Existing legal pages still require owner approval; the consistency fix does not establish new refund rights or terms. Deployment configuration uses SPA fallbacks for Vercel; other hosts need equivalent rewrites.
