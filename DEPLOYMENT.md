# Deployment Guide

## GitHub repository upload

Create a new empty repository, then upload the full contents of this folder including hidden files such as `.github`, `.gitignore`, and `.nojekyll`.

If using Git locally:

```bash
git init
git add .
git commit -m "Initial Global Marketing Group website"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## GitHub Pages

1. Open repository **Settings**.
2. Select **Pages**.
3. Under Build and deployment, choose **GitHub Actions**.
4. Push to `main` or manually run the workflow under **Actions**.

## Configure GHL

Open `assets/gmg-config.js` and add public widget URLs for:

- Contact form
- Careers form
- General strategy calendar
- Sales Growth assessment calendar
- Virtual Assistant consultation calendar

The site automatically uses the strategy calendar as a fallback for service-specific calendar slots when configured.

## Custom domain

When `glomarkgroup.com` is ready, configure it in the hosting provider and verify DNS. Keep `siteUrl`, `robots.txt`, and `sitemap.xml` aligned to the final canonical domain.
