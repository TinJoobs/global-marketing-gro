const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.GMG_TEST_URL||'http://127.0.0.1:8080';
const artifactDir=process.env.GMG_TEST_ARTIFACT_DIR||'docs/previews/cinematic';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.GMG_BROWSER_EXECUTABLE||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},timezoneId:'America/Indiana/Indianapolis'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let mode='failure',bookings=0,tracking=0;
  const tomorrow=Date.now()+86400000;
  const slots=Array.from({length:14},(_,i)=>new Date(tomorrow+i*1800000).toISOString());
  await page.route('https://backend.leadconnectorhq.com/**',async route=>{
   const request=route.request();
   if(request.method()==='GET')return route.fulfill({status:mode==='failure'?503:200,contentType:'application/json',body:mode==='failure'?'{}':JSON.stringify({tomorrow:{slots}})});
   if(request.url().includes('/booking/submit')){bookings++;assert.equal(request.postDataJSON().calendarId,'38W29a7XVFAV5Eyk5JWg');return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:true})})}
   tracking++;return route.fulfill({status:503,body:'Mock tracking failure'});
  });
  await page.goto(base+'/');await page.locator('h1').waitFor();
  const trigger=page.getByRole('button',{name:'Free growth audit',exact:true});
  await trigger.click();await page.getByRole('dialog').waitFor();
  await page.getByText(/couldn't load available times/).waitFor();
  assert.ok(await page.locator('#gmg-site').evaluate(el=>el.inert));
  mode='ready';await page.getByRole('button',{name:'Retry availability'}).click();await page.getByRole('radio').first().waitFor();
  assert.equal(await page.getByRole('radio').count(),14);
  assert.ok((await page.locator('.gmg-timezone').innerText()).includes(await page.evaluate(()=>Intl.DateTimeFormat().resolvedOptions().timeZone)));
  await page.getByRole('button',{name:'Confirm my call'}).click();
  assert.equal(await page.getByRole('checkbox').getAttribute('aria-invalid'),'true');
  assert.equal(await page.locator('.gmg-field-error').first().evaluate(el=>getComputedStyle(el).color),'rgb(255, 173, 173)','readable error text on the navy surface');
  assert.ok((await page.getByRole('button',{name:'Close dialog'}).boundingBox()).width>=44,'44px close target');
  await page.getByLabel('First name',{exact:true}).fill('Browser');await page.getByLabel('Last name',{exact:true}).fill('Test');await page.getByLabel('Email',{exact:true}).fill('test@example.invalid');await page.getByLabel('Phone',{exact:true}).fill('3175550100');
  await page.getByRole('radio').last().check();await page.getByRole('checkbox').check();
  await page.getByRole('button',{name:'Confirm my call'}).click();await page.getByText("You're booked. Talk soon.").waitFor();
  await page.waitForTimeout(100);assert.equal(bookings,1);assert.equal(tracking,1);
  await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);assert.ok(await trigger.evaluate(el=>el===document.activeElement));assert.ok(!await page.locator('#gmg-site').evaluate(el=>el.inert));
  for(const [index,value] of [[0,'0'],[1,'1'],[2,'2']]){
   await page.locator(`[data-chapter="${index}"]`).evaluate(el=>{const r=el.getBoundingClientRect();window.scrollBy(0,r.top-innerHeight*.3)});
   await page.waitForFunction(expected=>document.querySelector('[data-story-stage]')?.getAttribute('data-story-stage')===expected,value);
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(150);
  assert.equal(await page.locator('.hero-experience').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
  assert.equal(await page.locator('[data-story-stage]').evaluate(el=>getComputedStyle(el).position),'relative');
  fs.mkdirSync(artifactDir,{recursive:true});await page.screenshot({path:artifactDir+'/home-desktop.png'});
  await page.locator('[data-chapter="1"]').scrollIntoViewIfNeeded();await page.screenshot({path:artifactDir+'/workflow-desktop.png'});
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});await page.goto(base+'/');await page.locator('h1').waitFor();await page.waitForTimeout(1000);
  await page.screenshot({path:artifactDir+'/home-mobile.png',fullPage:false});
  await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('button',{name:'Free growth audit',exact:true}).click();await page.getByRole('dialog').waitFor();
  await page.getByRole('button',{name:'Close dialog'}).focus();await page.keyboard.press('Shift+Tab');assert.ok(await page.evaluate(()=>!!document.activeElement.closest('[role="dialog"]')));
  await page.keyboard.press('Escape');await page.waitForTimeout(100);
  assert.ok(await page.getByRole('button',{name:'Open navigation'}).evaluate(el=>el===document.activeElement),'mobile close restores focus to visible navigation toggle');
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  assert.deepEqual(errors,[]);
  console.log('Cinematic QA passed: real app startup, 3 scroll chapters, reduced-motion/static layout, 14 timezone-aware slots, availability retry, validation, mocked booking plus failed tracking, inert background, focus trap/restoration, Escape, mobile scroll restoration; no browser errors.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
