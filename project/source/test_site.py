#!/usr/bin/env python3
"""Offline layout/interaction checks. Requires playwright, bs4, and Chromium.
No live GHL submissions or external network navigation are performed.
"""
from pathlib import Path
from urllib.parse import urlsplit, unquote
from collections import Counter
import json, os, re, shutil, sys
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
WEB=ROOT.parent
(ROOT/'previews').mkdir(exist_ok=True)
failures=[];checks=0;cases=0

def verify(condition,message):
 global checks
 checks+=1
 if not condition:failures.append(message)

pages=sorted(WEB.glob('*.html'))
verify(len(pages)==28,'Expected 28 website pages')
soups={p.name:BeautifulSoup(p.read_text(),'html.parser') for p in pages}
for p in pages:
 soup=soups[p.name]
 verify(len(soup.find_all('h1'))==1,f'{p.name}: one h1')
 verify(len(soup.find_all('main'))==1,f'{p.name}: one main')
 verify(soup.html.get('lang')=='en',f'{p.name}: language')
 verify(bool(soup.title and soup.title.text),f'{p.name}: title')
 verify(bool(soup.find('meta',attrs={'name':'description'})),f'{p.name}: description')
 ids=[e.get('id') for e in soup.find_all(id=True)]
 verify(not [k for k,v in Counter(ids).items() if v>1],f'{p.name}: duplicate ids')
 for e in soup.select('[src]'):
  path=e.get('src','')
  if not path.startswith(('https:','http:','data:','//')):
   verify((WEB/path).exists(),f'{p.name}: missing src {path}')
 for a in soup.select('a[href],use[href]'):
  raw=a['href'];u=urlsplit(raw)
  if u.scheme or raw.startswith('//'):continue
  name=unquote(u.path) or p.name
  if name not in soups:
   verify(False,f'{p.name}: missing link target {raw}');continue
  if u.fragment:
   verify(bool(soups[name].find(id=unquote(u.fragment))),f'{p.name}: missing fragment {raw}')
 text=soup.get_text(' ',strip=True)
 verify('GMGSB' not in text,f'{p.name}: old branding')
 verify('Lorem ipsum' not in text,f'{p.name}: lorem ipsum')
 for s in soup.select('script[type="application/ld+json"]'):
  try:json.loads(s.string)
  except Exception:verify(False,f'{p.name}: invalid JSON-LD')
 portable=(ROOT/'standalone'/p.name).read_text()
 po=BeautifulSoup(portable,'html.parser')
 verify(all(i.get('src','').startswith('data:') for i in po.find_all('img')),f'{p.name}: portable images')
 verify(not po.find('script',src=True),f'{p.name}: portable scripts')
 verify(not po.find('link',rel='stylesheet'),f'{p.name}: portable styles')
 gh=BeautifulSoup((ROOT/'ghl-blocks'/p.name).read_text(),'html.parser')
 verify(not gh.find('html') and not gh.find('head') and not gh.find('body'),f'{p.name}: GHL fragment tags')
 verify(len(gh.select('#gmg-site'))==1,f'{p.name}: GHL one root')
for n in ['privacy-policy','terms-and-conditions','refund-policy','thank-you','404']:
 verify('noindex' in soups[n+'.html'].find('meta',attrs={'name':'robots'})['content'],n+': noindex')

sizes=[320,360,390,768,1024,1440,1920]
keyshots=['index','sales-growth-system','virtual-assistant-services','contact','book-a-call','industries','portfolio']
css=(WEB/'assets/styles.css').read_text()
js=(WEB/'assets/main.js').read_text()
with sync_playwright() as pw:
 browser_path=os.environ.get('GMG_BROWSER_EXECUTABLE') or shutil.which('chromium') or shutil.which('google-chrome')
 if not browser_path and Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome').exists():
  browser_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
 browser=pw.chromium.launch(headless=True,executable_path=browser_path,args=['--no-sandbox'])
 for p in pages:
  page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
  errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content((ROOT/'standalone'/p.name).read_text(),wait_until='load')
  page.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
  page.wait_for_function("Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)")
  verify(not errors,f'{p.name}: runtime errors {errors}')
  for width in sizes:
   page.set_viewport_size({'width':width,'height':1000 if width>760 else 844})
   metrics=page.evaluate('''() => ({width:innerWidth,scroll:document.documentElement.scrollWidth,
    bad:Array.from(document.querySelectorAll('main a,main button,main input,main select,main textarea')).filter(e=>{
     const r=e.getBoundingClientRect();return r.width>0&&(r.left < -2||r.right>innerWidth+2)
    }).map(e=>({text:e.textContent.slice(0,50),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}))})''')
   verify(metrics['scroll']<=width,f'{p.name}@{width}: horizontal overflow {metrics}')
   verify(not metrics['bad'],f'{p.name}@{width}: controls outside viewport {metrics["bad"]}')
   cases+=1
   if p.stem in keyshots and width in [390,1440]:
    label='desktop' if width==1440 else 'mobile'
    shotname=('home' if p.stem=='index' else p.stem)+'-'+label
    page.screenshot(path=str(ROOT/'previews'/(shotname+'.png')),full_page=True)
    if p.stem=='index' and width==1440:
     page.screenshot(path=str(ROOT/'previews/home-hero.png'))
    if p.stem=='index' and width==390:
     page.screenshot(path=str(ROOT/'previews/home-mobile-hero.png'))
  page.close()
 # Interaction checks on normal-motion pages.
 def open_page(slug,w=1440,motion='no-preference'):
  pg=browser.new_page(viewport={'width':w,'height':1000},reduced_motion=motion)
  pg.set_content((ROOT/'standalone'/(slug+'.html')).read_text())
  return pg
 pg=open_page('index',390)
 verify(pg.locator('[data-nav-panel]').is_hidden(),'Mobile navigation initially collapsed')
 pg.locator('[data-nav-toggle]').click()
 verify(pg.locator('[data-nav-panel]').is_visible(),'Mobile menu opens')
 pg.keyboard.press('Escape')
 verify(pg.locator('[data-nav-panel]').is_hidden(),'Escape closes mobile menu')
 pg.locator('[data-nav-toggle]').click();pg.locator('.nav-menu>summary').first.click()
 verify(pg.locator('.dropdown').first.is_visible(),'Solutions dropdown opens')
 pg.keyboard.press('Escape')
 verify(not pg.locator('.nav-menu').first.evaluate('(e)=>e.open'),'Escape closes dropdown')
 pg.locator('[data-motion-toggle]').scroll_into_view_if_needed();pg.locator('[data-motion-toggle]').click()
 verify(pg.locator('#gmg-site').get_attribute('data-motion')=='off','Manual animation pause')
 pg.close()
 pg=open_page('pricing')
 pg.locator('[data-hours]').fill('30')
 verify(pg.locator('[data-weekly-estimate]').inner_text()=='$300','30h weekly estimate')
 verify(pg.locator('[data-monthly-estimate]').inner_text()=='$1,300','30h monthly estimate')
 pg.close()
 pg=open_page('virtual-assistant-services')
 pg.locator('[data-expand-roles]').click()
 verify(pg.locator('details.role-card[open]').count()==6,'Expand all VA roles')
 pg.locator('[data-expand-roles]').click()
 verify(pg.locator('details.role-card[open]').count()==0,'Collapse all VA roles')
 pg.close()
 pg=open_page('faq')
 pg.locator('[data-faq-search]').fill('Philippines')
 verify(pg.locator('[data-faq]:visible').count()==1,'FAQ search filters correctly')
 pg.locator('[data-faq-search]').fill('zzzxnoresults')
 verify(pg.locator('[data-faq-empty]').is_visible(),'FAQ no-results state')
 pg.locator('[data-faq-search]').fill('')
 verify(pg.locator('[data-faq]:visible').count()==10,'FAQ clear search')
 pg.close()
 pg=open_page('guide-va-delegation')
 pg.locator('.print-checks input').first.check()
 verify(pg.locator('.print-checks input:checked').count()==1,'Guide checklist selection')
 pg.locator('[data-reset-checklist]').click()
 verify(pg.locator('.print-checks input:checked').count()==0,'Guide checklist reset')
 pg.close()
 pg=open_page('contact')
 verify(pg.locator('#ghl-contact-slot iframe').count()==0,'No unconfigured contact iframe')
 verify(pg.locator('.preview-form button').is_disabled(),'Preview submit disabled')
 verify(pg.locator('.preview-form fieldset').evaluate('(e)=>e.disabled'),'Preview input fieldset disabled')
 verify(all(x.is_disabled() for x in pg.locator('.preview-form input,.preview-form select,.preview-form textarea').all()),'Preview controls all disabled')
 verify(pg.locator('.preview-form [name]').count()==11,'All eleven documented contact fields present')
 pg.close()
 # Exercise the unchanged JS with an injected window proxy only to supply a test URL.
 # Browser navigation is unavailable in this environment; no live provider is contacted.
 template=(ROOT/'standalone/contact.html').read_text()
 template=re.sub(r'<script\b[^>]*>.*?</script>','',template,flags=re.S)
 pg=browser.new_page(viewport={'width':1024,'height':1000})
 pg.set_content(template)
 config={'forms':{'contact':'https://widgets.example.test/widget/form/mock123'},'clickToLoadWidgets':True,'forwardCampaignParameters':True,'routes':{'book-a-call.html':'/strategy'},'widgetHeights':{'contact':1280}}
 pg.evaluate('''({js,config})=>{
  window.GMG_CONFIG=config;
  const fakeLocation={href:'https://gmg.example.test/contact.html?utm_source=test-source&email=private',search:'?utm_source=test-source&email=private',origin:'https://gmg.example.test'};
  const proxy=new Proxy(window,{get(t,k){if(k==='location')return fakeLocation;const v=Reflect.get(t,k,t);return typeof v==='function'?v.bind(t):v;}});
  new Function('window',js)(proxy);
 }''',{'js':js,'config':config})
 verify(pg.locator('#ghl-contact-slot iframe').count()==0,'Configured widget waits for explicit load')
 verify(pg.locator('#ghl-contact-slot button').inner_text()=='Load consultation form','Configured widget gate label')
 pg.locator('#ghl-contact-slot button').click()
 iframe=pg.locator('#ghl-contact-slot iframe')
 verify(iframe.count()==1,'Widget iframe created on load')
 verify(iframe.get_attribute('id')=='inline-mock123','GHL form iframe ID')
 verify(iframe.get_attribute('height')=='1280','Configured widget height')
 verify('utm_source=test-source' in iframe.get_attribute('src'),'Allowed UTM forwarded')
 verify('email=' not in iframe.get_attribute('src'),'Non-UTM input is not forwarded')
 verify(pg.locator('a[href*="/strategy?"]').count()>0,'Route mapping and query preservation')
 pg.close()
 for service,expected in [('virtual-assistant','va'),('sales-growth','sales'),('unknown','general')]:
  pg=browser.new_page()
  t=(ROOT/'standalone/book-a-call.html').read_text()
  t=re.sub(r'<script\b[^>]*>.*?</script>','',t,flags=re.S)
  pg.set_content(t)
  config={'calendars':{'strategy':'https://widgets.example.test/general','salesGrowth':'https://widgets.example.test/sales','virtualAssistant':'https://widgets.example.test/va'},'clickToLoadWidgets':False}
  pg.evaluate('''({js,config,service})=>{window.GMG_CONFIG=config;const fake={href:'https://gmg.example.test/book-a-call.html?service='+service,search:'?service='+service,origin:'https://gmg.example.test'};const proxy=new Proxy(window,{get(t,k){if(k==='location')return fake;const v=Reflect.get(t,k,t);return typeof v==='function'?v.bind(t):v;}});new Function('window',js)(proxy);}''',{'js':js,'config':config,'service':service})
  verify(pg.locator('#ghl-calendar-slot iframe').get_attribute('src').endswith('/'+expected),'Calendar routing: '+service)
  pg.close()
 # No-JS presentation uses a document with executable scripts removed.
 pg=browser.new_page(viewport={'width':390,'height':844})
 raw=(ROOT/'standalone/pricing.html').read_text()
 raw=re.sub(r'<script\b[^>]*>.*?</script>','',raw,flags=re.S)
 pg.set_content(raw)
 verify(pg.locator('h1').is_visible(),'No-JS content remains visible')
 verify(pg.locator('[data-nav-panel]').is_visible(),'No-JS navigation remains visible')
 verify(pg.locator('[data-hours]').is_disabled(),'No-JS estimator cannot show stale changed output')
 pg.close()
 browser.close()

report={'pages':len(pages),'viewport_cases':cases,'checks':checks,'failures':failures,'widths':sizes,'rendering':'Chromium set_content, standalone HTML, offline','live_ghl_tested':False}
(ROOT/'docs/qa-results.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
if failures:sys.exit(1)
