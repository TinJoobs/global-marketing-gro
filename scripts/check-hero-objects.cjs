const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.GMG_TEST_URL||'http://127.0.0.1:8080';
const artifacts=process.env.GMG_TEST_ARTIFACT_DIR||'/private/tmp/gmg-hero-qa';
const routes=[['/','philippines'],['/pricing','pricing'],['/services','services'],['/integrations','integrations'],['/missed-revenue-calculator','calculator'],['/contact','contact'],['/about','about'],['/portfolio','portfolio'],['/faq','faq'],['/careers','careers'],['/resources','resources'],['/how-it-works','how'],['/sales-growth-system','crm'],['/virtual-assistant-services','va'],['/crm-automation','crm'],['/ai-automation','ai'],['/digital-solutions','digital'],['/appointment-setting','appointment'],['/lead-follow-up','lead'],['/industries','industries'],['/guide-va-delegation','guide-va'],['/guide-lead-follow-up','guide-lead'],['/guide-crm-readiness','guide-crm'],['/resources/affiliate','affiliate'],['/resources/media','media'],['/careers/account-rep','career-sales'],['/careers/executive-assistant','career-ea'],['/careers/referral','referral'],['/privacy','privacy'],['/terms','terms'],['/refund','refund'],['/thank-you','thanks'],['/book-a-call','contact'],['/unknown-page','navigation']];
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.GMG_BROWSER_EXECUTABLE||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try{
  fs.mkdirSync(artifacts,{recursive:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://backend.leadconnectorhq.com/**',route=>route.fulfill({status:503,body:'{}'}));
  const coverage=[];
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});
   for(const [path,variant] of routes){
    await page.goto(base+path,{waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();
    const scene=page.locator('[data-hero-scene]');await scene.waitFor();
    assert.equal(await scene.count(),1,path+' has exactly one interactive scene');
    assert.equal(await scene.getAttribute('data-hero-scene'),variant,path+' matches its content');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path+' no overflow at '+width);
    assert.equal(await scene.getByRole('button',{name:'Reset 3D view'}).count(),1);
    if(variant!=='philippines')assert.ok(await scene.locator('.hero3d-object').evaluate(el=>el.childElementCount>0),path+' has actual object geometry');
    if(width===1440){coverage.push({path,variant,kind:await scene.getAttribute('data-object-kind'),heading:await page.locator('h1').innerText()});await page.screenshot({path:artifacts+'/'+(path.slice(1).replaceAll('/','-')||'home')+'.jpg',type:'jpeg',quality:78})}
   }
  }
  await page.goto(base+'/');const scene=page.locator('[data-hero-scene]'),viewport=scene.getByRole('group',{name:/interactive 3D object/});await viewport.scrollIntoViewIfNeeded();
  const rotation=()=>scene.evaluate(el=>el.style.getPropertyValue('--view-y'));
  const initial=await rotation();const box=await viewport.boundingBox();
  await page.mouse.move(box.x+box.width*.15,box.y+box.height*.4);await page.mouse.down();await page.mouse.move(box.x+box.width*.15+120,box.y+box.height*.4+12,{steps:10});await page.mouse.up();await page.waitForTimeout(50);
  assert.notEqual(await rotation(),initial,'mouse drag changes the 3D camera');assert.ok(Math.abs(parseFloat(await rotation()))<=65,'rotation remains bounded');
  await viewport.focus();await page.keyboard.press('Home');await page.waitForTimeout(50);assert.equal(await rotation(),initial,'Home resets the camera');
  await page.keyboard.press('ArrowRight');await page.waitForTimeout(50);assert.notEqual(await rotation(),initial,'keyboard rotates');
  await scene.getByRole('button',{name:'Reset 3D view'}).click();await page.waitForTimeout(50);assert.equal(await rotation(),initial);
  const angle=await rotation();await page.getByRole('button',{name:'Explore Mindanao'}).click();assert.equal(await page.getByRole('button',{name:'Explore Mindanao'}).getAttribute('aria-pressed'),'true');assert.match(await page.getByRole('status').innerText(),/Mindanao/);assert.equal(await rotation(),angle,'region changes retain camera orientation');
  await page.waitForFunction(()=>document.querySelector('[data-hero-scene]').dataset.active==='true');
  await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForFunction(()=>document.querySelector('[data-hero-scene]').dataset.active==='false');
  await viewport.scrollIntoViewIfNeeded();await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('[data-hero-scene]').dataset.active==='false');
  assert.equal(await scene.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0,'reduced motion disables ambient animation');assert.equal(await scene.locator('[data-map-layer]').count(),7,'static map remains visible');
  await viewport.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(50);assert.notEqual(await rotation(),angle,'explicit controls still work without automatic motion');
  fs.writeFileSync(artifacts+'/coverage.json',JSON.stringify(coverage,null,2));
  const touchPage=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});touchPage.on('pageerror',e=>errors.push(e.message));await touchPage.goto(base+'/');const touchScene=touchPage.locator('[data-hero-scene]'),touchViewport=touchScene.locator('.hero3d-viewport');await touchViewport.scrollIntoViewIfNeeded();const t=await touchViewport.boundingBox();const cdp=await touchPage.context().newCDPSession(touchPage);const point={x:Math.round(t.x+t.width*.15),y:Math.round(t.y+t.height*.4),id:1};
  const before=await touchScene.evaluate(el=>el.style.getPropertyValue('--view-y'));
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...point,x:point.x+80,y:point.y+3}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await touchPage.waitForTimeout(100);
  assert.notEqual(await touchScene.evaluate(el=>el.style.getPropertyValue('--view-y')),before,'touch drag rotates');assert.equal(await touchScene.getAttribute('data-dragging'),null,'touch capture cleans up');
  const scrollBefore=await touchPage.evaluate(()=>scrollY);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...point,y:point.y-150}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await touchPage.waitForTimeout(200);assert.ok(await touchPage.evaluate(()=>scrollY)>scrollBefore,'vertical touch scrolling remains available');
  await touchScene.getByRole('button',{name:'Reset 3D view'}).tap();await touchPage.waitForTimeout(50);assert.equal(await touchScene.evaluate(el=>el.style.getPropertyValue('--view-y')),before,'touch reset works');
  assert.deepEqual(errors,[]);
  console.log(`Hero QA passed: ${routes.length*4} route/viewport checks, 32 canonical pages plus booking alias and 404, content-specific geometry, mouse/touch/keyboard/reset controls, selectable geographic regions, bounded camera, offscreen/reduced-motion suspension, vertical touch scrolling; no page errors.`);
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
