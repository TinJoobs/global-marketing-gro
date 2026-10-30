/* Run against npm run preview or dev. All external form requests are intercepted. */
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.GMG_TEST_URL || 'http://127.0.0.1:8080';
const routes = ['/', '/pricing', '/services', '/integrations', '/missed-revenue-calculator', '/contact', '/about', '/portfolio', '/faq', '/careers', '/resources', '/how-it-works', '/sales-growth-system', '/virtual-assistant-services', '/crm-automation', '/ai-automation', '/digital-solutions', '/appointment-setting', '/lead-follow-up', '/industries', '/guide-va-delegation', '/guide-lead-follow-up', '/guide-crm-readiness', '/resources/affiliate', '/resources/media', '/careers/account-rep', '/careers/executive-assistant', '/careers/referral', '/privacy', '/terms', '/refund', '/thank-you'];
(async () => {
 const browser = await chromium.launch({ executablePath: process.env.GMG_BROWSER_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
 try {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  let submissions=0;
  await page.route('https://backend.leadconnectorhq.com/**', route=>{ submissions++; return route.fulfill({status:503,body:'mock failure'}); });
  for(const route of routes){
   await page.goto(base+route); await page.locator('h1').waitFor();
   assert.equal(await page.locator('h1').count(),1,route+' has one page heading');
   if(route!=='/') assert.notEqual(await page.locator('h1').innerText(),'Your Business.\nRunning Better.',route);
  }
  await page.goto(base+'/contact.html?plan=growth&billing=annual');
  await page.waitForURL('**/contact?plan=growth&billing=annual');
  assert.match(await page.locator('main').innerText(),/18,327.60/);
  await page.goto(base+'/thank-you.html'); await page.waitForURL('**/thank-you');
  await page.goto(base+'/unknown-page'); assert.match(await page.locator('h1').innerText(),/404/);
  for(const width of [320,390,768,1024,1440,1920]){
   await page.setViewportSize({width,height:1000});
   for(const route of ['/', '/pricing', '/integrations', '/missed-revenue-calculator', '/contact', '/guide-va-delegation']){
    await page.goto(base+route); await page.locator('h1').waitFor();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`No horizontal overflow: ${route} at ${width}`);
   }
  }
  await page.setViewportSize({width:1440,height:1000}); await page.goto(base+'/');
  await page.waitForFunction(()=>document.querySelector('.hero-experience')?.dataset.inView==='true');
  assert.ok(await page.locator('.hero-experience').evaluate(el=>el.getAnimations({subtree:true}).some(a=>a.playState==='running')),'hero animates');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('#gmg-site')?.dataset.motion==='off');
  assert.equal(await page.locator('.hero-experience').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0,'hero respects reduced motion');
  await page.emulateMedia({reducedMotion:'no-preference'});
  const strip=page.locator('[data-integration-slider]'), row=page.locator('[data-logo-row]');
  await strip.scrollIntoViewIfNeeded(); await page.mouse.move(0,0);
  await page.locator('[data-logo-original] img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-logo-original] img')].every(i=>i.complete&&i.naturalWidth>0));
  assert.equal(await page.locator('[data-logo-original] img').count(),12);
  assert.ok(await page.locator('[data-logo-original] a').evaluateAll(items=>new Set(items.map(i=>Math.round(i.getBoundingClientRect().top))).size===1),'one logo line');
  const left=()=>row.evaluate(el=>el.scrollLeft);
  const initial=await left(); await page.waitForTimeout(600); assert.ok(await left()>initial+5,'logo strip moves');
  await strip.hover(); await page.waitForTimeout(100); const hovered=await left(); await page.waitForTimeout(300); assert.ok(Math.abs(await left()-hovered)<2,'hover pauses');
  await page.mouse.move(0,0); await row.focus(); await page.waitForTimeout(100); const focused=await left(); await page.waitForTimeout(300); assert.ok(Math.abs(await left()-focused)<2,'focus pauses');
  await page.emulateMedia({reducedMotion:'reduce'}); await row.evaluate(el=>el.scrollLeft=100); await page.waitForTimeout(300); assert.equal(Math.round(await left()),100,'reduced motion preserves manual scrolling');
  assert.ok(await page.locator('[data-logo-clone]').isHidden());
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.getByRole('link',{name:'Explore integration options',exact:false}).click(); await page.waitForURL('**/integrations');
  await page.getByRole('link',{name:'Global Marketing Group home'}).click(); await strip.waitFor();
  assert.equal(await page.locator('[data-logo-clone]').count(),1,'remount does not duplicate clones');
  fs.mkdirSync('docs/previews',{recursive:true});
  await page.screenshot({path:'docs/previews/harness-home.png',fullPage:false});
  await strip.scrollIntoViewIfNeeded(); await strip.screenshot({path:'docs/previews/harness-logo-strip.png'});
  await page.goto(base+'/missed-revenue-calculator');
  for(const [id,value] of Object.entries({inquiries:'100',unfollowed:'30',closeRate:'25',saleValue:'500'})) await page.locator('#revenue-'+id).fill(value);
  assert.match(await page.getByLabel('Estimated monthly lost opportunity').innerText(),/3,750/);
  await page.locator('#revenue-unfollowed').fill('101'); assert.equal(await page.getByLabel('Estimated monthly lost opportunity').count(),0);
  await page.locator('#revenue-unfollowed').fill('30');
  await page.getByLabel('Email address',{exact:true}).fill('browser-test@example.invalid');
  await page.getByRole('checkbox',{name:/I agree to receive/}).check();
  await page.getByRole('button',{name:'Request follow-up guidance'}).click();
  await page.getByText(/could not receive your request/).waitFor(); assert.equal(submissions,1);
  assert.equal(await page.getByLabel('Email address',{exact:true}).inputValue(),'browser-test@example.invalid');
  await page.setViewportSize({width:390,height:844}); await page.goto(base+'/missed-revenue-calculator');
  await page.screenshot({path:'docs/previews/harness-calculator-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Open navigation'}).click(); await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');
  for(const file of ['robots.txt','sitemap.xml']){const response=await page.request.get(base+'/'+file);const body=await response.text();assert.ok(!body.includes('<!doctype html>'));assert.match(body,file==='robots.txt'?/Sitemap:/:/<urlset/);}
  assert.deepEqual(errors,[]);
  console.log(`Browser QA passed: ${routes.length} routes, 36 responsive page checks, legacy links, 12 decoded official logos, single-row motion/pause/reduced-motion/remount, calculator math/validation, mocked signup failure, menu Escape, crawler assets; no page errors.`);
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
