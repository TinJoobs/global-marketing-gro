# Global Marketing Group

The active project is a **React + Vite + TypeScript application**. `index.html` mounts `src/main.tsx`; React Router renders the GMG pages. The production output is `dist/`.

## Run the project

Use a supported Node version: **20.19+, 22.13+, or 24+**, matching the ranges in `package.json`.

```sh
npm ci
npm run dev
```

Vite listens on `0.0.0.0:8080` by default. Localhost and `.modal.host` previews are allowed. Set `GMG_ALLOWED_HOSTS=preview.example.com,another.example.com` for additional trusted preview hostnames; host checking remains enabled.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
# With the preview running and Chrome installed:
npm run test:browser
npm run test:heroes
```

Interactive hero objects cover every canonical page, with mouse/touch/keyboard rotation, reset controls, and a selectable extruded Philippines map on Home. See [docs/HERO-3D.md](docs/HERO-3D.md) for coverage and interaction details.

The visual design uses one token-based system derived from the GMG logo. See [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) for palette, type, layout rules and component classes.

Browser QA accepts `GMG_TEST_URL` and `GMG_BROWSER_EXECUTABLE` for a different server or Chromium executable. Set `GMG_TEST_ARTIFACT_DIR` to write browser screenshots outside `docs/previews`. It intercepts CRM submissions.

Type checking does not emit JavaScript, declaration files or build-info files into the source tree. The npm lockfile is authoritative; `npm ci` installs the verified dependency graph.

## Application structure

- `src/App.tsx`: real page routes, legacy aliases and the 404 route.
- `src/components`: shared navigation, footer, layout and the native single-line integration-logo strip.
- `src/pages`: GMG service pages, pricing, integration directory, contact, guides, careers and the Missed Revenue Calculator.
- `src/data`: source-backed packages, integration options, official logo manifest and guide content.
- `src/index.css`: the design system (tokens, base, components). `src/hero.css`: Home hero. See `docs/DESIGN-SYSTEM.md`.
- `public/assets/images`: local brand, logo and support artwork.
- `public/robots.txt`, `public/sitemap.xml`: crawler files copied into the production build.
- `docs/HARNESS-REPAIR.md`: assessment, verification and operational limits.

Old `.html` URLs resolve to the corresponding React route. Unknown URLs show a 404 page rather than Home. The calculator is available on Home and under Resources. Its results are estimates and remain available without signup.

## Forms

Email signup, consultation requests and careers forms use the existing CRM intake identifiers in `src/lib/tracking.ts`. Forms show pending and retryable failure states and only acknowledge an accepted HTTP response. They do not guarantee email delivery or reserve an appointment. Calculator inputs are not sent with email signup. Keep CRM workflows and delivery configuration in the owner's CRM account; never put private credentials in frontend files.

## Deploy

Netlify and Vercel configurations build this Vite application and publish `dist/` with SPA deep-link fallback. Keep security headers and the `public/` crawler files. See [DEPLOYMENT.md](DEPLOYMENT.md). Other hosts need the same `npm ci` / `npm run build` / `dist` setup.

## Historical static/GHL exports

The former root HTML and assets are preserved in `project/legacy-static/`. Standalone pages and GHL fragments remain in `project/standalone/` and `project/ghl-blocks/`. They are historical exports, not the active application's routes or styling source.

The optional Python generator now writes **only** to the historical export folders and cannot overwrite the React entry point:

```sh
# Requires Python 3.12+
python3 project/source/build.py
python3 scripts/check_repo.py
```

Node/Vite builds do not require Python. Future product changes should be made in React; update legacy exports separately when needed. The independent static browser QA script remains for historical exports only.
