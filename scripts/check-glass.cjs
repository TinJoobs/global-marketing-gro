const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.GMG_TEST_URL||'http://127.0.0.1:8080';
const artifacts=process.env.GMG_TEST_ARTIFACT_DIR||'/private/tmp/gmg-glass-qa';
const routes=['/','/pricing','/services','/integrations','/missed-revenue-calculator','/contact','/about','/portfolio','/faq','/careers','/resources','/how-it-works','/sales-growth-system','/virtual-assistant-services','/crm-automation','/ai-automation','/digital-solutions','/appointment-setting','/lead-follow-up','/industries','/guide-va-delegation','/guide-lead-follow-up','/guide-crm-readiness','/resources/affiliate','/resources/media','/careers/account-rep','/careers/executive-assistant','/careers/referral','/privacy','/terms','/refund','/thank-you'];
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.GMG_BROWSER_EXECUTABLE||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://backend.leadconnectorhq.com/**',r=>r.fulfill({status:503,body:'{}'}));
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  for(const route of routes){await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' at '+width);}
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');await page.locator('h1').waitFor();
 assert.equal(await page.locator('.story-layout').evaluate(el=>getComputedStyle(el).display),'grid','restored workflow layout');
 assert.ok(await page.locator('.story-diagram').evaluate(el=>el.getBoundingClientRect().height>=300),'restored diagram dimensions');
 const deck=page.locator('.who-help-deck');
 assert.equal(await deck.locator('.who-help-layer').count(),7,'preserved six industries and CTA');
 assert.equal(await deck.locator('.who-help-layer').first().evaluate(el=>getComputedStyle(el).position),'sticky','preserved desktop stacking design');
 await deck.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
 await page.waitForFunction(()=>[...document.querySelectorAll('.who-help-layer img')].every(img=>img.complete&&img.naturalWidth>0));
 assert.equal(await page.locator('.test-card').count(),3);assert.equal(await page.locator('.test-score').count(),0);
 await page.evaluate(()=>scrollTo(0,0));const trigger=page.getByRole('button',{name:'Solutions',exact:true});await trigger.click();assert.ok(await page.getByRole('link',{name:/Capture, nurture/}).isVisible());await page.keyboard.press('Escape');assert.ok(await trigger.evaluate(el=>el===document.activeElement));assert.ok(await page.locator('#gmg-menu-solutions').isHidden());
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open navigation'}).click();await trigger.click();const nav=page.locator('#gmg-nav');await nav.getByRole('link',{name:/All services/}).scrollIntoViewIfNeeded();assert.ok(await nav.getByRole('link',{name:/All services/}).evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight}),'last mobile submenu link reachable');
 await page.keyboard.press('Escape');assert.ok(await trigger.evaluate(el=>el===document.activeElement));await page.keyboard.press('Escape');assert.ok(await page.getByRole('button',{name:'Open navigation'}).evaluate(el=>el===document.activeElement));
 await page.getByRole('button',{name:'Open navigation'}).click();await trigger.click();await nav.getByRole('link',{name:/All services/}).focus();await page.setViewportSize({width:1440,height:1000});await page.waitForTimeout(100);assert.ok(await trigger.evaluate(el=>el===document.activeElement),'focus restores to desktop trigger after resize');
 await page.emulateMedia({reducedMotion:'reduce'});assert.notEqual(await deck.locator('.who-help-layer').first().evaluate(el=>getComputedStyle(el).position),'sticky','static reduced-motion industry layout');
 fs.mkdirSync(artifacts,{recursive:true});
 for(const [route,name] of [['/','home'],['/pricing','pricing'],['/contact','contact'],['/guide-va-delegation','guide']]){
  await page.goto(base+route);await page.locator('h1').waitFor();await page.screenshot({path:artifacts+'/'+name+'-mobile.jpg',type:'jpeg',quality:85,fullPage:false});
 }
 assert.deepEqual(errors,[]);
 console.log('Glass QA passed: 128 route/viewport checks, restored story layout, preserved industry stacking deck and static fallback, all 6 industry photos loaded, 3 source-backed testimonials, desktop/mobile submenu focus and reachability, reduced motion; no page errors.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
