# Repository assessment and implementation plan

The destination is a React 18 + TypeScript application built with Vite, React Router and Tailwind. `src/components/Layout.tsx`, `Header.tsx` and `Footer.tsx` define the shared shell; `src/pages` contains routed pages; `src/lib/tracking.ts` defines the existing CRM intake. Vitest and Testing Library are configured. Root `_repo_*` files are legacy source snapshots, not the running Vite application. No AGENTS.md is present.

The prior GMG repository generates static HTML plus standalone/GHL copies. Those outputs should not replace the destination's Vite entry point. Port the approved visual system, enhanced logo, animated 3D workflow/Philippines backdrop, photo-based packages, verified integration catalog, and updated contact copy into native React pages and shared components. Keep destination-only content and the existing form destination. Preserve previous guide URLs with React guide pages.

Add `/missed-revenue-calculator` to Resources and feature it on Home as **How Much Revenue Slips Through the Cracks?** Description: **Estimate the monthly opportunity lost when inquiries go unanswered—then build a follow-up process that gives every lead a next step.**

The calculator uses inquiries × unfollowed-up percentage × estimated close rate × average sale value. It labels outcomes as estimates, states assumptions, validates inputs, leaves results ungated, and includes a local follow-up checklist, opt-in email signup using the existing CRM intake, and a consultation link. Signup must await an acknowledged response and show errors honestly. No real test submissions.

Verify arithmetic/boundaries, consent/signup states with mocked requests, package calculations and integration filters, production build/typecheck/lint, and browser layouts/navigation at mobile and desktop widths. Push a reviewable branch to the destination repository, preserving its current main branch and configuration.

Implementation completed as native React pages/components. Existing repository main is preserved; delivery uses a reviewable codex branch. Verification and inherited dependency findings are recorded in VERIFICATION.md.
