# Global Marketing Group

A React + TypeScript template powered by Vite, Tailwind CSS, and shadcn/ui components.

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Available scripts

- `npm run dev` - start Vite in development mode
- `npm run build` - create a production build
- `npm run build:dev` - create a development-mode build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks
- `npm run test` - run Vitest tests once
- `npm run test:watch` - run Vitest in watch mode

## Verification commands

Use these to verify repository health:

```bash
npm run lint
npm run test
npm run build
npx tsc --noEmit
```

## Lockfile policy

This repository does not track `package-lock.json`.

## Application structure

`src/App.tsx` defines React Router routes. `src/components` contains the shared shell; `src/pages/home` contains the redesigned Home experience; `src/data` holds package, integration and guide content. `src/theme.css` carries the dark green/gold design and `src/hero.css` the 3D workflow. Artwork is local under `public/assets/images`.

The Missed Revenue Calculator lives at `/missed-revenue-calculator`, with entry points on Home and in Resources. Results use the visitor's assumptions and are ungated. Checklist selections last for the current visit to the page. Signup and consultation requests use the existing CRM intake identifiers in `src/lib/tracking.ts`. Delivery automations must be maintained in that CRM account. No calendar reservation is implied by a consultation request.

`_repo_*` files remain as legacy source snapshots and are not Vite entry points. The old static generator and standalone/GHL HTML were adapted into React components rather than copied over the application. `vercel.json` supplies SPA deep-link rewrites; configure an equivalent fallback when using another host.

See [repository assessment](docs/REPOSITORY-ALIGNMENT.md) and [verification report](docs/VERIFICATION.md). The optional browser smoke script requires Playwright and Chrome: start `npm run preview -- --host 127.0.0.1 --port 5173`, then run `node scripts/check-browser.cjs`.
