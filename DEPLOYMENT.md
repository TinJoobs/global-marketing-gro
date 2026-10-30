# Build and deployment

The live website is the React application in `src/`, bootstrapped by the root `index.html`. Vite builds the production site into `dist/`. Archived static HTML in `project/legacy-static/` is reference material and is not published.

## Requirements and commands

Use Node.js 20.19+, 22.13+, or 24+ and npm. Node 24 is recommended for deployment. Vite 8, Vitest 4 and jsdom 27 are pinned to maintained compatible releases in `package-lock.json`.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`npm run dev` binds `0.0.0.0:8080` and fails if that port is occupied. `npm run preview` serves the production build on the same address. Both retain Vite hostname checks, with localhost/IP access and `.modal.host` previews allowed. To allow additional proxy hosts, set `GMG_ALLOWED_HOSTS` to comma-separated hostnames, for example:

```sh
GMG_ALLOWED_HOSTS=preview.example.com,.preview.example.org npm run dev
```

A leading dot permits that domain and its subdomains. Use only domains you control; URLs, ports and wildcard `*` entries are rejected. This variable is server configuration and is not exposed to browser code.

Type checking uses `tsc --noEmit` for both application and configuration files. It does not generate JavaScript copies of the Vite config or TypeScript build metadata. Tests use Vitest, jsdom and Testing Library, with setup in `src/test/setup.ts`.

## Hosting

Netlify and Vercel configurations install with npm, build with `npm run build`, and publish only `dist/`. Use Node 24 on either host. Commit `package-lock.json` and use `npm ci` for reproducible installs; do not introduce a second package-manager lockfile.

The SPA fallback serves `index.html` for clean paths, deep paths and legacy `.html` paths. React Router selects the corresponding page or the application’s not-found page. Vercel excludes `/assets/` from this fallback; Netlify serves existing files before its fallback. No Python server or repository-root publish directory is needed.

For another static host, upload the contents of `dist/` and configure the same fallback after real-file lookup. Verify direct visits and refreshes at `/services`, a deep page, and `/contact.html` after deployment. `vite preview` is a local build check, not a production server.
