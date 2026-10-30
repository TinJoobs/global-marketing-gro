/* Browser regressions for keyboard navigation and unconfigured contact journeys.
 * Requires Playwright and a local Chrome/Chromium installation; no live forms.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.GMG_BROWSER_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const failures = [];
  const cases = [
    ['mobile navigation closes when keyboard focus leaves it', async page => {
      await page.locator('[data-nav-toggle]').click();
      await page.locator('#main-content').evaluate(el => { el.tabIndex = -1; el.focus(); });
      assert.equal(await page.locator('[data-nav-panel]').isHidden(), true);
    }],
    ['dropdown closes when keyboard focus leaves the header menu', async page => {
      await page.locator('[data-nav-toggle]').click();
      await page.locator('.nav-menu > summary').first().click();
      await page.locator('.site-header .brand').focus();
      assert.equal(await page.locator('.nav-menu[open]').count(), 0);
    }],
    ['desktop resize clears stale dropdown state', async page => {
      await page.locator('[data-nav-toggle]').click();
      await page.locator('.nav-menu > summary').first().click();
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.waitForFunction(() => document.querySelector('[data-nav-toggle]').getAttribute('aria-expanded') === 'false');
      assert.equal(await page.locator('.nav-menu[open]').count(), 0);
    }],
    ['Escape restores focus to the mobile navigation toggle', async page => {
      await page.locator('[data-nav-toggle]').click();
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('[data-nav-panel]').isHidden(), true);
      assert.equal(await page.locator('[data-nav-toggle]').evaluate(el => el === document.activeElement), true);
    }],
    ['desktop resize preserves focus from a collapsed dropdown child', async page => {
      await page.locator('[data-nav-toggle]').click();
      const menu = page.locator('.nav-menu').first();
      await menu.locator('summary').click();
      await menu.locator('.dropdown a').first().focus();
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.waitForFunction(() => document.querySelector('[data-nav-toggle]').getAttribute('aria-expanded') === 'false');
      assert.equal(await menu.locator('summary').evaluate(el => el === document.activeElement), true);
    }],
    ['mobile resize moves desktop navigation focus to the visible toggle', async page => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.locator('[data-nav-panel] > a').first().focus();
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-nav-panel]')).display === 'none');
      assert.equal(await page.locator('[data-nav-toggle]').evaluate(el => el === document.activeElement), true);
    }],
    ['unavailable booking offers a working phone alternative', async page => {
      await page.setContent(fs.readFileSync(path.join(root, 'project/standalone/book-a-call.html'), 'utf8'));
      const link = page.locator('[data-widget="calendar"] a[href="tel:+13177792554"]');
      assert.equal(await link.isVisible(), true);
      assert.equal(await page.locator('[data-widget="calendar"] iframe').count(), 0);
    }],
    ['unavailable contact form offers a working phone alternative', async page => {
      await page.setContent(fs.readFileSync(path.join(root, 'project/standalone/contact.html'), 'utf8'));
      assert.equal(await page.locator('[data-widget="contact"] a[href="tel:+13177792554"]').isVisible(), true);
      assert.equal(await page.locator('.preview-form input').first().isDisabled(), true);
    }],
  ];
  for (const [name, test] of cases) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    try {
      await page.setContent(fs.readFileSync(path.join(root, 'project/standalone/index.html'), 'utf8'));
      await test(page);
      console.log(`PASS ${name}`);
    } catch (error) {
      failures.push(name);
      console.error(`FAIL ${name}: ${error.message}`);
    } finally { await page.close(); }
  }
  await browser.close();
  console.log(`${cases.length - failures.length}/${cases.length} navigation and contact checks passed`);
  process.exitCode = failures.length ? 1 : 0;
})().catch(error => { console.error(error); process.exitCode = 1; });
