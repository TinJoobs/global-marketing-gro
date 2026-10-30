# Global Marketing Group Website

Production-ready static website for **Global Marketing Group**.

The public site is intentionally placed at the repository root so it can be uploaded directly to GitHub, GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a standard static web host without a framework or build system.

## Quick start

1. Upload every file and folder in this repository to a new GitHub repository.
2. Keep the default branch named `main`.
3. Open `assets/gmg-config.js` and add the approved public GHL form/calendar URLs.
4. For GitHub Pages, go to **Settings > Pages > Source > GitHub Actions**.
5. Push to `main`. The included workflow validates and deploys the public website automatically.

To preview locally:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## GHL integration

Edit `assets/gmg-config.js`.

Only use public form/calendar/embed URLs. Never place a GHL private API key in frontend files.

```js
window.GMG_CONFIG = {
  siteUrl: 'https://glomarkgroup.com',
  contactEmail: '',
  contactPhone: '',
  contactPhoneHref: '',
  forms: {
    contact: '',
    careers: ''
  },
  calendars: {
    strategy: '',
    salesGrowth: '',
    virtualAssistant: ''
  }
};
```

The contact and booking areas remain safe, disabled previews until real public GHL widget URLs are added.

## Repository structure

```text
/
├── index.html
├── about-us.html
├── sales-growth-system.html
├── virtual-assistant-services.html
├── ...other public pages
├── assets/
│   ├── styles.css
│   ├── main.js
│   ├── gmg-config.js
│   └── images/
├── .github/workflows/deploy-pages.yml
├── scripts/check_repo.py
├── project/
│   ├── ghl-blocks/
│   ├── standalone/
│   ├── source/
│   ├── docs/
│   └── previews/
├── netlify.toml
├── vercel.json
├── robots.txt
└── sitemap.xml
```

## Deployment options

### GitHub Pages
The included `.github/workflows/deploy-pages.yml` publishes only the public site files and runs the repository validation first.

### Netlify
Import the repository. `netlify.toml` is already included. No build framework is required.

### Vercel
Import the repository as a static project. `vercel.json` is included.

### GHL
Use the page fragments in `project/ghl-blocks/` when you want to paste page content into GoHighLevel Custom HTML elements. Full standalone HTML versions are in `project/standalone/`.

## Validation

Rebuild the root website, standalone pages, and GHL blocks together with Python 3.12 or newer:

```bash
python3 project/source/build.py
```

The generator reads the shared files in `assets/`. Edit those files and the templates in `project/source/build.py`, then rebuild rather than editing portable copies individually.

Run:

```bash
python scripts/check_repo.py
```

The full browser QA suite is at `project/source/test_site.py`; install its development dependencies from `project/source/requirements-dev.txt` and run `python3 project/source/test_site.py`. It checks all 28 pages at seven widths and exercises the form/calendar integration hooks with test URLs. Use `GMG_BROWSER_EXECUTABLE` to select an installed Chrome/Chromium binary.

Additional keyboard-navigation and unavailable-contact regressions run with `node scripts/test_navigation.cjs` (requires the Playwright Node package and Chrome/Chromium). The UI refresh report is in `project/docs/UI-UX-REFRESH-QA.md`.

## Before launch

- Add the approved GHL public form and calendar URLs.
- Confirm the business email and phone number.
- Replace draft Privacy, Terms, and Refund pages with approved legal copy.
- Confirm the production domain in `assets/gmg-config.js`, `robots.txt`, and `sitemap.xml`.
- If you use a custom domain on GitHub Pages, configure it in GitHub Pages settings. Do not add a `CNAME` file until the domain is final.

## Important

This repository contains no private GHL credentials and does not require Node, React, npm, or a server-side runtime to serve the website.
