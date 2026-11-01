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
 assert.ok((await page.locator('.industry-carousel').boundingBox()).height<1400,'no enormous industry spacer');
 const rail=page.getByRole('region',{name:'Industries carousel'});await rail.scrollIntoViewIfNeeded();
 const initial=await rail.evaluate(el=>el.scrollLeft);await page.getByRole('button',{name:'Next industries'}).click();await page.waitForFunction(()=>document.querySelector('.industry-rail').scrollLeft>100);assert.ok(await rail.evaluate(el=>el.scrollLeft)>initial);
 await rail.focus();await page.keyboard.press('End');await page.waitForTimeout(200);await rail.evaluate(el=>el.scrollLeft=el.scrollWidth);await page.locator('.who-help-cta a').focus();assert.ok(await page.locator('.who-help-cta a').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth}),'last card keyboard reachable');
 await page.locator('.industry-rail img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
 await page.waitForFunction(()=>[...document.querySelectorAll('.industry-rail img')].every(img=>img.complete&&img.naturalWidth>0));
 assert.equal(await page.locator('.test-card').count(),3);assert.equal(await page.locator('.test-score').count(),0);
 await page.evaluate(()=>scrollTo(0,0));const trigger=page.getByRole('button',{name:'Solutions',exact:true});await trigger.click();assert.ok(await page.getByRole('link',{name:/Capture, nurture/}).isVisible());await page.keyboard.press('Escape');assert.ok(await trigger.evaluate(el=>el===document.activeElement));assert.ok(await page.locator('#gmg-menu-solutions').isHidden());
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open navigation'}).click();await trigger.click();const nav=page.locator('#gmg-nav');await nav.getByRole('link',{name:/All services/}).scrollIntoViewIfNeeded();assert.ok(await nav.getByRole('link',{name:/All services/}).evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight}),'last mobile submenu link reachable');
 await page.keyboard.press('Escape');assert.ok(await trigger.evaluate(el=>el===document.activeElement));await page.keyboard.press('Escape');assert.ok(await page.getByRole('button',{name:'Open navigation'}).evaluate(el=>el===document.activeElement));
 await page.getByRole('button',{name:'Open navigation'}).click();await trigger.click();await nav.getByRole('link',{name:/All services/}).focus();await page.setViewportSize({width:1440,height:1000});await page.waitForTimeout(100);assert.ok(await trigger.evaluate(el=>el===document.activeElement),'focus restores to desktop trigger after resize');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.industry-rail').evaluate(el=>getComputedStyle(el).scrollBehavior),'auto');
 fs.mkdirSync(artifacts,{recursive:true});
 for(const [route,name] of [['/','home'],['/pricing','pricing'],['/contact','contact'],['/guide-va-delegation','guide']]){
  await page.goto(base+route);await page.locator('h1').waitFor();await page.screenshot({path:artifacts+'/'+name+'-mobile.jpg',type:'jpeg',quality:85,fullPage:false});
 }
 assert.deepEqual(errors,[]);
 console.log('Glass QA passed: 128 route/viewport checks, restored story layout, bounded native carousel, all 6 industry photos loaded, keyboard/arrow access, 3 source-backed testimonials, desktop/mobile submenu focus and reachability, reduced motion; no page errors.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
