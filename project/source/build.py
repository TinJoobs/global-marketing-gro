#!/usr/bin/env python3
"""Build static, standalone, and GHL-block editions. Python standard library only.
Usage: python3 project/source/build.py (Python 3.12+, from any working directory).
"""
from pathlib import Path
from html import escape
import base64, json, re, csv, shutil
from content import *
ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT/'legacy-static'
ASSETS = WEB/'assets'
PAGES = {}
E = escape

ICONS = {
 'arrow':'<path d="M4 12h15m-6-6 6 6-6 6"/>',
 'chevron':'<path d="m6 9 6 6 6-6"/>',
 'plus':'<path d="M12 5v14M5 12h14"/>',
 'check':'<path d="m5 12 4 4L19 6"/>',
 'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
 'calendar':'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2m-8 3h2"/>',
 'users':'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v3"/>',
 'headset':'<path d="M3 13V11a9 9 0 0 1 18 0v6a4 4 0 0 1-4 4h-3"/><rect x="2" y="11" width="5" height="7" rx="2"/><rect x="17" y="11" width="5" height="7" rx="2"/><path d="M10 21h4"/>',
 'database':'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
 'chart':'<path d="M4 20h17M5 16v-4m5 4V9m5 7V6m5 10V3M4 8l5-3 5 1 6-4"/>',
 'growth':'<path d="M3 17 9 11l4 3 8-10m-6 0h6v6M4 21h17"/>',
 'workflow':'<rect x="8" y="2" width="8" height="6" rx="1"/><rect x="2" y="16" width="7" height="6" rx="1"/><rect x="15" y="16" width="7" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
 'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
 'phone':'<path d="M5 3h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z"/>',
 'message':'<path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-6 4V5a2 2 0 0 1 2-2Z"/><path d="M7 8h10M7 12h7"/>',
 'briefcase':'<rect x="2" y="7" width="20" height="14" rx="3"/><path d="M8 7V4h8v3M2 12l10 4 10-4m-10 2v4"/>',
 'refresh':'<path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/>',
 'capture':'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="12" r="4"/>',
 'report':'<path d="M6 2h9l5 5v15H4V4a2 2 0 0 1 2-2Zm8 0v6h6M8 17v-3m4 3v-6m4 6v-4"/>',
 'bell':'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-9 12a3 3 0 0 0 6 0"/>',
 'filter':'<path d="M3 4h18l-7 8v7l-4 2v-9Z"/>',
 'star':'<path d="m12 2 3.1 6.4 7.1 1-5.1 5 .9 7.1-6-3.4-6 3.4.9-7.1-5.1-5 7.1-1Z"/>',
 'file':'<path d="M6 2h9l5 5v15H4V4a2 2 0 0 1 2-2Zm8 0v6h6M8 12h8m-8 4h8"/>',
 'heart':'<path d="M20 4c-3-3-7-1-8 1-1-2-5-4-8-1-4 4 0 9 8 16 8-7 12-12 8-16Z"/>',
 'megaphone':'<path d="m3 10 14-6v15L3 14Zm14-3h4v9h-4M5 15l2 7h4l-2-6"/>',
 'clipboard':'<rect x="4" y="4" width="16" height="18" rx="2"/><rect x="8" y="2" width="8" height="5" rx="1"/><path d="m8 13 2 2 5-5m-7 9h8"/>',
 'search':'<circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/>',
 'rocket':'<path d="M14 3c3-2 7-2 7-2s0 4-2 7l-9 9-5-5ZM8 9H3l-2 5 5 1m9 0 1 5 5-2v-5M4 18l-2 4 4-2"/><circle cx="15" cy="7" r="2"/>',
 'home':'<path d="m2 11 10-9 10 9M5 9v13h14V9M9 22v-8h6v8"/>',
 'building':'<path d="M3 22V7l8-5v20m0-16h10v16M1 22h22M6 9h2m-2 4h2m-2 4h2m6-7h3m-3 4h3m-3 4h3"/>',
 'shield':'<path d="m12 2 9 4v6c0 5-5 8-9 10-4-2-9-5-9-10V6Z"/><path d="m8 12 3 3 5-6"/>',
 'medical':'<path d="m12 2 9 4v6c0 5-5 8-9 10-4-2-9-5-9-10V6Z"/><path d="M12 7v9m-4-5h8"/>',
 'utensils':'<path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M20 2c-5 4-5 9 0 10v10m0-20v10"/>',
 'hands':'<path d="m2 12 4-6h5l3 3-3 3-3-2m14 2-4-6h-5M4 11l-2 4 9 7 9-7-2-4M9 15l5 4m-3-7 6 5"/>',
 'map':'<path d="M20 9c0 6-8 13-8 13S4 15 4 9a8 8 0 0 1 16 0Z"/><circle cx="12" cy="9" r="3"/>',
 'settings':'<path d="m10 2-1 3-3 1-3-1-2 4 3 2v3l-2 2 2 4 3-1 3 1 1 3h4l1-3 3-1 3 1 2-4-3-2v-3l2-2-2-4-3 1-3-1-1-3Z"/><circle cx="12" cy="12" r="4"/>',
 'code':'<path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 2l-4 20"/>',
 'monitor':'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 22h8m-4-5v5M2 13h20"/>',
 'cpu':'<rect x="5" y="5" width="14" height="14" rx="3"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4"/>',
 'link':'<path d="m10 14 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 10a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-2 2" transform="translate(2 -1) scale(.85)"/>',
 'mail':'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/>',
 'globe':'<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20M4 6h16M4 18h16"/>',
 'book':'<path d="M12 5C7 2 2 3 2 3v17s5-1 10 2c5-3 10-2 10-2V3s-5-1-10 2Zm0 0v17"/>',
 'lock':'<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M7 10V6a5 5 0 0 1 10 0v4m-5 5v3"/>',
 'print':'<path d="M6 8V2h12v6M6 17H2V8h20v9h-4M6 14h12v8H6Zm12-3h1"/>',
}
def icon(name):
    if name not in ICONS: raise ValueError('Unknown icon: '+name)
    return f'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#gmg-i-{name}"></use></svg>'
def sprite():
    return '<svg class="icon-sprite" aria-hidden="true" width="0" height="0" style="position:absolute;overflow:hidden"><defs>'+''.join(f'<symbol id="gmg-i-{k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{v}</symbol>' for k,v in ICONS.items())+'</defs></svg>'
def btn(text, href='book-a-call.html', style='primary', ico='arrow'):
    return f'<a class="btn btn-{style}" href="{E(href,quote=True)}">{E(text)}{icon(ico)}</a>'
def link(text, href):
    return f'<a class="text-link" href="{E(href,quote=True)}">{E(text)}{icon("arrow")}</a>'
def check(items):
    return '<ul class="check-list">'+''.join(f'<li>{icon("check")}<span>{E(t)}</span></li>' for t in items)+'</ul>'
def head(eyebrow,title,desc='',center=False):
    return f'<div class="section-head{" center" if center else ""}" data-reveal><span class="eyebrow">{E(eyebrow)}</span><h2>{title}</h2>{"<p>"+E(desc)+"</p>" if desc else ""}</div>'
def section(body, cls='', id=''):
    return f'<section class="section {cls}"'+(f' id="{id}"' if id else '')+f'><div class="container">{body}</div></section>'
def feature_grid(items, columns=3):
    return f'<div class="grid-{columns}">'+''.join(f'<article class="card feature-card" data-reveal><span class="icon-box {"blue" if i%3==1 else "purple" if i%3==2 else ""}">{icon(ic)}</span><h3>{E(title)}</h3><p>{E(desc)}</p></article>' for i,(ic,title,desc) in enumerate(items))+'</div>'
def process(items):
    return '<div class="process">'+''.join(f'<article class="process-item" data-reveal><div class="step-orb">{icon(ic)}<span class="step-num">{i:02}</span></div><h3>{E(title)}</h3><p>{E(desc)}</p></article>' for i,(ic,title,desc) in enumerate(items,1))+'</div>'
def faqs(indices=None,search=False):
    items = FAQS if indices is None else [FAQS[i] for i in indices]
    start='<div class="search-field"><label for="faq-search">Search questions</label><input id="faq-search" type="search" placeholder="Try pricing, CRM, location, or customization" data-faq-search></div><p class="filter-status" role="status" aria-live="polite" data-faq-status></p>' if search else ''
    return start+'<div class="faq-list">'+''.join(f'<details class="faq-item" data-faq><summary>{E(q)}{icon("plus")}</summary><div class="faq-answer">{E(a)}</div></details>' for q,a in items)+'</div>'+('<p data-faq-empty hidden>No matching questions. Try a different word or contact our team.</p>' if search else '')
def brand():
    return '<a class="brand" href="index.html" aria-label="Global Marketing Group home"><img src="assets/images/brand-mark.png" alt="" width="64" height="63"><span><span class="wordmark">GLOBAL<br>MARKETING GROUP</span><span class="brand-tagline">SYSTEMS. PEOPLE. GROWTH.</span></span></a>'
def nav(active):
    def a(label,path): return f'<a href="{path}.html"'+(' aria-current="page"' if active==path else '')+f'>{label}</a>'
    return f'''<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><div class="container header-inner">{brand()}
<button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="main-nav" aria-label="Open navigation">{icon('menu')}</button>
<nav class="nav-panel" id="main-nav" aria-label="Main navigation" data-nav-panel>
<details class="nav-menu"><summary>Solutions {icon('chevron')}</summary><div class="dropdown">
<div><span class="eyebrow">Start here</span>{a('Sales Growth System','sales-growth-system')}{a('Virtual Assistant Services','virtual-assistant-services')}{a('Compare all services','services')}</div>
<div><span class="eyebrow">Supporting services</span>{a('CRM &amp; Automation','crm-automation')}{a('AI &amp; Human Support','ai-automation')}{a('Digital Solutions','digital-solutions')}{a('Appointment Setting','appointment-setting')}{a('Lead Follow-Up','lead-follow-up')}{a('Integrations','integrations')}</div>
</div></details>{a('How it works','how-it-works')}{a('Pricing','pricing')}
<details class="nav-menu resources-menu"><summary>Resources {icon('chevron')}</summary><div class="dropdown">
<div><span class="eyebrow">Explore</span>{a('Guides &amp; Resources','resources')}{a('Industries We Serve','industries')}{a('Portfolio','portfolio')}{a('Questions &amp; Answers','faq')}</div>
</div></details>{a('About','about-us')}{a('Contact','contact')}{btn('Let’s talk',style='dark',ico='arrow')}
</nav></div></header>'''
def footer():
    groups=[('Solutions',[('Sales Growth System','sales-growth-system'),('Virtual Assistant Services','virtual-assistant-services'),('CRM & Automation','crm-automation'),('Digital Solutions','digital-solutions'),('Pricing & Support','pricing')]),('Services',[('Appointment Setting','appointment-setting'),('Lead Follow-Up','lead-follow-up'),('AI & Human Support','ai-automation'),('Integrations','integrations'),('View All Services','services')]),('Company & Resources',[('About Us','about-us'),('Industries','industries'),('Portfolio','portfolio'),('Guides & Resources','resources'),('Help & FAQs','faq'),('Careers','careers'),('Contact Us','contact')])]
    cols=''.join('<div><span class="footer-heading">'+E(title)+'</span><div class="footer-links">'+''.join(f'<a href="{path}.html">{E(label)}</a>' for label,path in items)+'</div></div>' for title,items in groups)
    return f'''<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-about">{brand()}<p>Sales Systems. Smart Automation.<br>Dependable Virtual Support.</p><p>Global Marketing Group connects your strategy, systems, and support team so you can focus on growing your business.</p><div class="footer-contact"><a href="mailto:" data-contact-email hidden></a><a href="tel:" data-contact-phone hidden></a><a href="contact.html">Talk with our team {icon('arrow')}</a></div></div>{cols}</div><div class="footer-bottom"><span>&copy; <span data-year>2026</span> Global Marketing Group. All rights reserved.</span><div class="footer-legal"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-and-conditions.html">Terms &amp; Conditions</a><a href="refund-policy.html">Refund Policy</a><button class="motion-toggle js-only" type="button" data-motion-toggle aria-pressed="false">Pause animations</button></div></div></div></footer>'''
def cta(title='Ready to create a better system for growth?',desc='Let us help you build the system and support team needed to follow up, stay organized, and turn more opportunities into customers.',service='strategy',label='Book a Free Strategy Call'):
    return f'<section class="cta-wrap"><div class="container"><div class="cta-banner" data-reveal><div><span class="eyebrow">Your next step</span><h2>{title}</h2><p>{E(desc)}</p></div><div class="actions">{btn(label,"book-a-call.html?service="+service,ico="calendar")}<a class="secondary-cta" href="contact.html">Or contact Global Marketing Group</a></div></div></div></section>'
def photo(kind='support',cards=True):
    file='support-professional.webp' if kind=='support' else 'collaboration.webp'
    alt='Support professional wearing a headset and working at a laptop' if kind=='support' else 'Professionals collaborating around a laptop'
    floats=f'<div class="float-card f-one">{icon("database")}<div><strong>One organized CRM</strong><span>A clearer view of every lead</span></div></div><div class="float-card f-two">{icon("users")}<div><strong>Real human support</strong><span>People who keep work moving</span></div></div><div class="float-card f-three">{icon("calendar")}<div><strong>Follow-up, connected</strong><span>From first inquiry to next step</span></div></div>' if cards else ''
    return f'<div class="hero-visual"><div class="visual-stage" data-tilt><div class="halo" aria-hidden="true"></div><div class="hero-dots" aria-hidden="true"></div><div class="photo-shape"><img src="assets/images/{file}" alt="{alt}" width="343" height="322" fetchpriority="high"></div><span class="orbit-point" aria-hidden="true"></span>{floats}</div></div>'
def dashboard():
    cols=[('NEW INQUIRY',['Website inquiry','Referral contact']),('FOLLOW-UP',['Discovery call','Proposal follow-up']),('NEXT STEP',['Consultation booked','Customer check-in'])]
    return '<div class="dashboard-scene"><div class="dashboard" data-tilt><div class="dashboard-bar"><span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span><strong>SALES GROWTH SYSTEM</strong></div><div class="dashboard-main"><h3>Every lead. A clear next step.</h3><p>Capture, follow up, and stay organized.</p><div class="pipeline-columns">'+''.join('<div class="pipeline-col"><span>'+title+'</span>'+''.join('<div class="pipeline-card"><b>'+t+'</b><i></i><i></i></div>' for t in values)+'</div>' for title,values in cols)+'</div><div class="dashboard-footer">'+icon('check')+' Technology + consistent human support</div></div></div><span class="scene-label">Illustrative workflow. Not a live dashboard or client result.</span></div>'
def flow_board(rows=None):
    if rows is None: rows=[('capture','New inquiry received','Capture the contact in your CRM'),('workflow','Follow-up begins','The next step has a clear owner'),('users','Your team takes over','Personal attention where it matters')]
    return '<div class="flow-board" data-tilt>'+''.join(f'<div class="flow-row"><span class="icon-box">{icon(ic)}</span><div><strong>{E(title)}</strong><span>{E(desc)}</span></div></div>' for ic,title,desc in rows)+'</div>'
def pagehero(label,title,desc,visual='',service='strategy',button='Book a Free Strategy Call',extra=''):
    return f'<section class="page-hero{" simple" if not visual else ""}"><div class="container"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>{icon("arrow")}<span aria-current="page">{E(label)}</span></nav><div class="{"hero-grid" if visual else ""}"><div class="hero-copy"><span class="eyebrow">{E(label)}</span><h1>{title}</h1><p class="lead">{E(desc)}</p>{extra}<div class="actions">{btn(button,"book-a-call.html?service="+service)}{link('Explore our services','services.html')}</div></div>{visual}</div></div></section>'
def add(slug,label,body,title=None,desc='',noindex=False):
    PAGES[slug]={'label':label,'body':body,'title':title or label+' | Global Marketing Group','description':desc or 'Explore '+label.lower()+' with Global Marketing Group. Sales systems, smart automation, and dependable Virtual Assistant support.','noindex':noindex}

def core_solutions():
    return '<div class="grid-2">'+''.join(f'<article class="card solution-card" data-reveal><div class="card-top"><span class="icon-box {color}">{icon(ic)}</span><span class="solution-kicker">{E(kicker)}</span></div><h3>{title}</h3><p>{E(desc)}</p><div class="micro-tags">'+''.join('<span class="tag">'+E(t)+'</span>' for t in tags)+f'</div>{link(label,url)}</article>' for kicker,ic,color,title,desc,tags,label,url in [
        ('For a more consistent sales process','database','blue','Sales Growth System&trade;','Keep leads, conversations, appointments, and follow-up in one connected process. Give every opportunity a clear next step.',['CRM & automation','Lead follow-up','Custom scope'],'Explore the Sales Growth System','sales-growth-system.html'),
        ('For more time to run your business','headset','','Virtual Assistant Services','Delegate the recurring work that fills your day. Get skilled support matched to your tasks, working hours, and business needs.',['From $10/hour','Philippines-based','Matched to your needs'],'Explore Virtual Assistant support','virtual-assistant-services.html')])+'</div>'

def connection():
    return section('<div class="connection-grid"><div>'+head('The power of people + technology','Automation Creates the Process.<br><span class="accent">People Create the Connection.</span>')+'<p class="lead">Your system handles the repetitive work while your Virtual Assistant supports the tasks that require judgment, communication, and human connection.</p></div><div><div class="connection-flow">'+''.join('<article class="connection-node"><div class="sphere">'+icon(ic)+'</div><h3>'+E(title)+'</h3><p>'+E(desc)+'</p></article>' for ic,title,desc in [('database','Sales Growth System','CRM and sales automation'),('workflow','Follow-Up Workflows','Lead and pipeline management'),('users','Dedicated VA','Personal support and execution'),('clipboard','Project Coordination','Accountability and reporting')])+'</div></div></div>','dark-section')

def home():
    workflow=f'''<figure class="growth-workflow" aria-labelledby="workflow-title">
<div class="workflow-heading"><span class="eyebrow">Systems + people, connected</span><span class="workflow-mark" aria-hidden="true">{icon('workflow')}</span><h2 id="workflow-title">Good opportunities.<br>A clear next step.</h2></div>
<ol class="workflow-steps"><li><span class="workflow-icon">{icon('capture')}</span><div><strong>Capture the inquiry</strong><p>One place for your leads and conversations.</p></div><span class="workflow-index" aria-hidden="true">01</span></li>
<li><span class="workflow-icon">{icon('message')}</span><div><strong>Keep the conversation moving</strong><p>Follow-up and reminders with a clear owner.</p></div><span class="workflow-index" aria-hidden="true">02</span></li>
<li><span class="workflow-icon">{icon('calendar')}</span><div><strong>Make room for the next opportunity</strong><p>Appointments, tasks, and personal support.</p></div><span class="workflow-index" aria-hidden="true">03</span></li></ol>
<div class="workflow-human"><img src="assets/images/support-professional.webp" alt="Support professional working at a laptop" width="343" height="322"><div><strong>Technology sets the process.</strong><p>People keep the work moving.</p></div>{icon('users')}</div>
<figcaption>Illustrative workflow. Not live activity or a client result.</figcaption></figure>'''
    hero=f'''<section class="home-hero"><div class="container"><div class="hero-grid"><div class="hero-copy"><span class="eyebrow">CRM automation + virtual assistants</span><h1>More follow-through.<br><span class="accent">More room to grow.</span></h1><p class="lead">Turn inquiries into next steps. Connect your sales process with the people who keep your business moving, so you can focus on what comes next.</p><div class="actions">{btn('Book a free strategy call',ico='arrow')}{btn('Find your starting point','#core-solutions','outline')}</div><p class="hero-note">{icon('check')}Start with your goals. Build around your business.</p><div class="hero-service-links"><a href="sales-growth-system.html">A clearer sales process {icon('arrow')}</a><a href="virtual-assistant-services.html">VA support from $10/hour {icon('arrow')}</a></div></div>{workflow}</div></div></section>'''
    body=hero+section('<div class="section-intro-row">'+head('Two ways to move forward','The right support.<br>For the work in front of you.','Start with a sales system, a Virtual Assistant, or bring them together.')+link('Compare services','services.html')+'</div>'+core_solutions(),id='core-solutions')
    body+=section('<div class="split"><div>'+head('Built around your business','Less chasing.<br>More moving forward.','Missed follow-ups, scattered information, and an overflowing task list make growth harder than it needs to be.')+'<p class="lead">We connect your CRM, follow-up process, and day-to-day support. Your team knows what needs to happen, who owns it, and what comes next.</p>'+link('See how it works','how-it-works.html')+'</div><div class="delivery-list">'+''.join(f'<article><span>{num}</span><div><h3>{E(title)}</h3><p>{E(desc)}</p></div></article>' for num,title,desc in [('01','Understand the work','We review your goals, workload, and current sales process.'),('02','Shape the right support','Agree on the systems, skills, responsibilities, and scope you need.'),('03','Put it into practice','Get help with onboarding, coordination, and ongoing review.')])+'</div></div>','pale',id='how-we-help')
    body+=section('<div class="people-panel"><div class="people-photo"><img src="assets/images/collaboration.webp" alt="Professionals working together at a laptop" width="208" height="142" loading="lazy"><span>U.S. roots. Global support.</span></div><div>'+head('Technology with a human connection','A system is only as useful<br>as the follow-through.','Automation handles the repeatable steps. Your Virtual Assistant supports the work that needs communication, judgment, and a personal touch.')+check(['Support matched to the tasks you need completed','Clear responsibilities and communication','Coordination as your business needs change'])+link('Get to know Global Marketing Group','about-us.html')+'</div></div>')
    industries='<div class="industry-links">'+''.join(f'<a href="industries.html#{slug}">{icon(ic)}<span>{E(title)}</span>{icon("arrow")}</a>' for slug,ic,title,*_ in INDUSTRIES[:6])+'</div>'
    body+=section('<div class="section-intro-row">'+head('Who we support','Different businesses.<br>The same need for dependable support.')+link('Explore all industries','industries.html')+'</div>'+industries,'pale')
    body+=section('<div class="split top"><div>'+head('Before we talk','A little clarity goes a long way.','Understand the options before deciding on your next step.')+link('See pricing and support','pricing.html')+'<br>'+link('Browse all questions','faq.html')+'</div><div>'+faqs([1,4,7])+'</div></div>')
    body+=cta('Let’s make the next step a clear one.','Tell us what is slowing your business down. We will help identify a useful starting point, whether that is a better sales process, dependable VA support, or both.')
    add('index','Home',body,'Sales Growth System and Virtual Assistant Services | Global Marketing Group','Grow your business with CRM automation, lead follow-up, appointment setting, sales-pipeline management, and professional Virtual Assistant services from Global Marketing Group.')

SUPPORT = {
 'crm-automation': {
  'name':'CRM & Automation','icon':'database','title':'A home for every lead.<br><span class="accent">A plan for every next step.</span>',
  'desc':'Connect your contacts, conversations, appointments, tasks, and sales pipeline in one organized system. Build follow-up around the way your business actually works.',
  'intro':'Less scattered information. More consistent action.',
  'detail':'CRM setup is one part of the Sales Growth System. We begin with your current customer journey, then organize the records, stages, ownership, and follow-up your team needs.',
  'features': [('database','Organized contact records','Keep customer details, conversation history, and next actions together.'),('chart','Clear pipeline stages','See which leads are new, qualified, scheduled, quoted, won, or need follow-up.'),('workflow','Purpose-built workflows','Connect acknowledgments, task assignments, reminders, and internal notifications.'),('mail','Email and SMS follow-up','Support a consistent communication process using approved messages.'),('calendar','Connected scheduling','Bring booking, confirmations, and reminders into the lead journey.'),('report','Activity reporting','Review lead activity, appointment progress, and follow-up execution.')],
  'checks':['Your current lead sources and contact records','How opportunities move through your business','Who owns each follow-up task','The messages and reporting your team needs'],
  'service':'crm-automation','related':'sales-growth-system'
 },
 'ai-automation': {
  'name':'AI & Human Support','icon':'cpu','title':'Smarter automation.<br><span class="accent">Human connection, intact.</span>',
  'desc':'Use automation to organize repetitive work while keeping your people in control of the conversations that need context, care, and judgment.',
  'intro':'Start with a useful process, not another tool.',
  'detail':'Automation should support your customer experience, not make it harder to reach a person. We review practical opportunities for automated responses, lead routing, task coordination, and optional AI-assisted workflows within your agreed scope.',
  'features':[('message','Approved responses','Define the messages and business information an automated process may use.'),('capture','Lead capture and routing','Organize incoming inquiries and move the right information to your team.'),('workflow','Repeatable follow-up','Connect routine acknowledgments, task reminders, and next-step prompts.'),('users','Human handoffs','Make room for personal attention when a question needs a team member.'),('clipboard','Clear boundaries','Agree on responsibilities, escalation rules, and review requirements.'),('report','Ongoing review','Use activity and feedback to identify what needs adjustment.')],
  'checks':['The questions and tasks that repeat most often','Where customers need a real person','Approved information and escalation rules','Which capabilities are available in your chosen setup'],
  'service':'crm-automation','related':'crm-automation'
 },
 'digital-solutions': {
  'name':'Digital Solutions','icon':'monitor','title':'Your digital presence.<br><span class="accent">Connected to your growth.</span>',
  'desc':'Connect websites, landing pages, funnels, and approved marketing content to a clear lead-capture and follow-up process.',
  'intro':'A website should lead somewhere useful.',
  'detail':'The existing Global Marketing Group service offering includes website and landing-page development, funnels, and marketing support. In the rebrand, these services support a simple goal: make the next step clear and keep the resulting inquiry organized.',
  'features':[('monitor','Websites and landing pages','Give visitors a clear explanation of your business and a useful next step.'),('capture','Lead-capture funnels','Connect focused pages, forms, and appointment calls to action.'),('megaphone','Campaign support','Coordinate approved content and campaign assets with the lead journey.'),('mail','Email-campaign support','Keep your brand communication connected to organized contact records.'),('calendar','Forms and calendars','Link customer interest to a consultation, inquiry, or booking.'),('report','Performance visibility','Review the agreed measures for leads, appointments, and follow-up activity.')],
  'checks':['The offer and audience for each page or campaign','Your approved brand content and creative assets','Where every form or booking should go','Who will follow up after an inquiry arrives'],
  'service':'digital-solutions','related':'lead-follow-up'
 },
 'appointment-setting': {
  'name':'Appointment Setting','icon':'calendar','title':'From interested lead<br>to <span class="accent">a clear next appointment.</span>',
  'desc':'Combine online scheduling, confirmations, reminders, and personal follow-up so your team can focus on the conversations that matter.',
  'intro':'Booking is a process, not just a calendar link.',
  'detail':'Your Sales Growth System can support scheduling and reminders. A Virtual Assistant can help with inquiry review, appointment setting, confirmations, and follow-up within your agreed responsibilities and working hours.',
  'features':[('filter','Qualify the inquiry','Organize the information your team needs before a consultation.'),('calendar','Simplify scheduling','Give qualified prospects an appropriate booking next step.'),('bell','Confirm and remind','Support appointments with approved confirmation and reminder messages.'),('headset','Add personal support','Have a VA assist with scheduling communication and routine questions.'),('refresh','Follow up on next steps','Keep rescheduling and follow-up tasks visible to the responsible person.'),('report','Review appointment activity','Understand scheduling progress alongside the sales pipeline.')],
  'checks':['The types of appointments your business offers','Availability, ownership, and qualification needs','Your confirmation and reminder process','Who handles changes and unanswered inquiries'],
  'service':'appointment-setting','related':'virtual-assistant-services'
 },
 'lead-follow-up': {
  'name':'Lead Follow-Up & Reactivation','icon':'refresh','title':'Keep the conversation<br><span class="accent">from going quiet.</span>',
  'desc':'Build a structured follow-up process for new inquiries, open proposals, previous leads, and customers who may still need your services.',
  'intro':'Your next opportunity may already be in your CRM.',
  'detail':'The Sales Growth System combines automated communication with clear ownership. A dedicated Virtual Assistant can support personalized messages, follow-up calls, record updates, and escalation to your sales team.',
  'features':[('capture','Organize existing contacts','Review available records and sort contacts around useful next actions.'),('message','Respond to new inquiries','Set up an acknowledgment and an appropriate follow-up path.'),('heart','Nurture thoughtfully','Stay connected with prospects who are not yet ready to decide.'),('file','Follow up on proposals','Keep estimates, proposals, and open questions from getting lost.'),('refresh','Reconnect with past leads','Create an approved reactivation process for relevant previous contacts.'),('users','Make ownership clear','Define who monitors responses and takes the conversation forward.')],
  'checks':['Your contact sources and communication permissions','The needs and stage of each contact group','Approved messages and follow-up responsibilities','How to stop or change outreach when a contact responds'],
  'service':'lead-follow-up','related':'sales-growth-system'
 },
 'integrations': {
  'name':'Integrations & Workflow Support','icon':'link','title':'Connect the tools.<br><span class="accent">Keep the process clear.</span>',
  'desc':'Review where leads and customer information enter your business, then plan the connections that support your CRM and daily work.',
  'intro':'Build the connection around the business need.',
  'detail':'Global Marketing Group lists custom integrations among its existing services. Each connection should be assessed for available platform access, data requirements, scope, and maintenance before implementation.',
  'features':[('capture','Lead-source connections','Plan how website forms and other agreed sources create useful CRM records.'),('calendar','Scheduling handoffs','Connect appointment activity to the right customer record and next task.'),('database','Field organization','Agree on the information your team needs and where it should belong.'),('workflow','Workflow coordination','Map what starts a process, who owns it, and what follows.'),('clipboard','Testing and documentation','Review the agreed scenarios before the connection is put into use.'),('users','Operational handover','Clarify access, responsibilities, and how issues should be reported.')],
  'checks':['The platforms and account access currently available','Which information needs to move between systems','Duplicate handling and ownership expectations','The testing and ongoing support included in scope'],
  'service':'crm-automation','related':'crm-automation'
 }
}

def service_cards(slugs=None):
    keys=slugs or list(SUPPORT)
    return '<div class="grid-3">'+''.join(f'<article class="card" data-reveal><span class="icon-box">{icon(SUPPORT[k]["icon"])}</span><h3>{E(SUPPORT[k]["name"])}</h3><p>{E(SUPPORT[k]["desc"])}</p>{link("Explore this service",k+".html")}</article>' for k in keys)+'</div>'

def sales_growth():
    body=pagehero('Sales Growth System','Build a Sales Process That <span class="accent">Does Not Depend on Memory.</span>',SGS_LEAD,dashboard(),'sales-growth','Request a Sales Growth Assessment', '<p class="hero-note">It is not simply another CRM. It is a complete follow-up and conversion system supported by technology, proven processes, and real people.</p>')
    body+=section('<div class="split top"><div>'+head('What is the Sales Growth System?','A Better Way to Manage Leads and Sales Opportunities.','Many businesses generate inquiries but do not have a reliable system for responding, following up, and moving prospects toward a decision.')+'<div class="callout"><p>The Sales Growth System creates a structured process for every lead, from the first inquiry to follow-up, conversion, and reactivation.</p></div></div><ol class="ordered-steps">'+''.join('<li>'+E(t)+'</li>' for t in SGS_STEPS)+'</ol></div>')
    body+=section(head('What is included?','The tools and processes behind the follow-up.','A connected system configured around your business and agreed service scope.',True)+feature_grid(SGS_FEATURES)+'<p class="scope-note">Communication channels, usage charges, approvals, and third-party connections depend on the agreed setup. Review the communication and consent requirements before launch.</p>','pale')
    body+=section(head('Our five-part Sales Growth process','From capture to reactivation.',center=True)+process(SGS_PROCESS))
    body+=section('<div class="split top"><div>'+head('Sales Growth System with VA support','Technology Works Better When Someone Is Managing It.','A CRM can organize your leads, but it cannot replace every personal conversation or follow-up task.')+'<p class="lead">This combination gives your business both automation and human support.</p><div class="actions">'+btn('Explore VA Support','virtual-assistant-services.html','white')+'</div></div><div>'+check(SGS_VA)+'</div></div>','dark-section')
    body+=section('<div class="split top"><div>'+head('Who is it for?','A Strong Fit for Businesses Ready to Follow Up Better.')+check(SGS_FIT)+'</div><div>'+head('Your questions, answered','More clarity before you begin.')+faqs([0,1,2,8])+'</div></div>')
    body+=cta('Stop Letting Valuable Leads Disappear','Let Global Marketing Group evaluate your current sales and follow-up process and identify where opportunities may be getting lost.','sales-growth','Book Your Sales Growth Assessment')
    add('sales-growth-system','Sales Growth System',body,'Sales Growth System, CRM and Lead Follow-Up Automation','Capture, organize, nurture, and convert more leads with CRM setup, automated follow-up, appointment scheduling, pipeline management, and lead reactivation.')

def estimator():
    return f'''<div class="estimator"><span class="eyebrow">Plan your support</span><h3>A simple starting-rate estimate.</h3><label for="weekly-hours">Weekly VA support <strong data-hours-value>20 hours</strong></label><input id="weekly-hours" data-hours disabled type="range" min="5" max="40" step="5" value="20" aria-describedby="estimate-note"><div class="estimate-output" aria-live="polite" aria-atomic="true"><div><strong data-weekly-estimate>$200</strong><small>Illustrative weekly cost</small></div><div><strong data-monthly-estimate>$867</strong><small>Illustrative monthly average</small></div></div><p id="estimate-note">Estimate only, at the $10/hour general-support starting rate. Monthly average = weekly hours &times; $10 &times; 52 &divide; 12. This is not a quote or a promise of available hours. Specialized support, scope, and other agreed costs may differ.</p></div>'''

def virtual_assistant():
    body=pagehero('Virtual Assistant Services','Get the Support You Need to <span class="accent">Focus on Growth.</span>','Your time should be spent leading your business, serving customers, and making important decisions, not trying to complete every administrative and follow-up task yourself.',photo(),'virtual-assistant','Schedule a VA Discovery Call','<div class="price-badge"><span>General support from</span><strong>$10</strong><span>/ hour</span></div>')
    roles=''.join(f'<details class="card role-card" id="{slug}" {"open" if i<2 else ""}><summary><span class="icon-box">{icon(ic)}</span><span class="summary-label"><strong>{E(title)}</strong><small>{E(desc)}</small></span>{icon("chevron")}</summary>{check(tasks)}</details>' for i,(slug,ic,title,desc,tasks) in enumerate(VA_ROLES))
    body+=section('<div class="section-intro-row">'+head('What can a Virtual Assistant do?','Skilled Support for the Work That Keeps Your Business Moving.','Global Marketing Group connects businesses with skilled Virtual Assistants who provide reliable, ongoing support.')+'<button class="btn btn-outline js-only" data-expand-roles aria-expanded="false" type="button">Explore all roles</button></div><div class="grid-2">'+roles+'</div>',id='roles')
    body+=section(head('Our VA matching process','The right fit starts with understanding your business.',center=True)+process(VA_PROCESS),'pale')
    body+=section('<div class="split"><div><span class="eyebrow">Our Virtual Assistants</span><h2>Skilled Support<br><span class="accent">From the Philippines.</span></h2><p class="lead">Our Virtual Assistants are based in the Philippines and are selected to support businesses with professionalism, adaptability, strong communication, and a commitment to dependable service.</p><p class="lead">Depending on the assignment, your VA may work independently or alongside a project manager and other Global Marketing Group team members.</p><div class="micro-tags"><span class="tag">Matched skills</span><span class="tag">Defined responsibilities</span><span class="tag">Scheduled working hours</span></div></div><div class="photo-panel" data-tilt><img class="team-image" src="assets/images/collaboration.webp" alt="Professionals discussing work around a laptop" width="208" height="142" loading="lazy"><div class="caption-card"><strong>Support with a human connection.</strong><p>People, processes, and communication working together.</p></div></div></div>')
    body+=section(head('Benefits of hiring a Virtual Assistant','More room for the work only you can do.',center=True)+feature_grid(VA_BENEFITS),'pale')
    body+=section('<div class="split top"><div>'+head('What you receive','A Clear Arrangement. Dependable Coordination.','Your Virtual Assistant arrangement may include:')+check(VA_RECEIVE)+'</div><div>'+estimator()+'<p class="pricing-footnote">General Virtual Assistant support starts at $10 per hour. Specialized or certified support may require a different rate depending on the qualifications and scope of work required.</p>'+link('View pricing and support options','pricing.html')+'</div></div>')
    body+=section('<div class="split top"><div>'+head('Common questions','Build confidence before you delegate.')+'</div><div>'+faqs([3,4,5,6,7])+'</div></div>','pale')
    body+=cta('You Do Not Have to Run Your Business Alone','Tell us what is taking too much of your time. We will help identify the tasks you can delegate and the type of Virtual Assistant support your business needs.','virtual-assistant','Find Your Virtual Assistant')
    add('virtual-assistant-services','Virtual Assistant Services',body,'Professional Virtual Assistant Services Starting at $10 Per Hour','Delegate administrative work, CRM management, lead follow-up, appointment setting, customer support, and marketing tasks to a professional Virtual Assistant.')

def services():
    body=pagehero('Our Services','Better Systems.<br>Better People.<br><span class="accent">Better Growth.</span>','Two core solutions bring structure to your sales process and dependable support to your daily operations.',flow_board())
    body+=section(head('Start with the foundation','Choose the support your business needs.')+core_solutions())
    body+=section(head('Supporting services','Connect the work around your customer journey.','These services can support the Sales Growth System, VA arrangement, or a separately agreed project.',True)+service_cards(),'pale')
    body+=section('<div class="split"><div>'+head('Not sure where to start?','Begin with the work that is getting in your way.','Tell us about your current systems, daily workload, and follow-up challenges. We will recommend an appropriate next step, rather than a one-size-fits-all package.')+link('See our discovery process','how-it-works.html')+'</div>'+flow_board([('search','Understand','Your goals, workload, and existing process'),('settings','Shape the support','The system, skills, and scope you need'),('users','Put it into practice','Onboarding, coordination, and review')])+'</div>')
    body+=cta()
    add('services','All Services',body)
    for slug,d in SUPPORT.items():
        visual=dashboard() if slug=='crm-automation' else flow_board([(d['icon'],d['name'],'Built around your business needs'),('workflow','Connected process','Clear ownership and repeatable next steps'),('users','Real human support','Personal attention when it matters')])
        body=pagehero(d['name'],d['title'],d['desc'],visual,d['service'])
        body+=section('<div class="split top"><div>'+head('A practical approach',E(d['intro']),d['detail'])+'</div><div class="insight-card"><h3>What we review together</h3>'+check(d['checks'])+'</div></div>')
        body+=section(head('Your scope may include','Practical support, connected to your business.',center=True)+feature_grid(d['features']),'pale')
        body+=section('<div class="split"><div>'+head('Systems + people','The process works best when someone owns the next step.','Connect automated follow-up with the people responsible for monitoring inquiries, maintaining records, and keeping conversations moving.')+link('Explore the '+PAGES.get(d['related'],{}).get('label','Sales Growth System'),d['related']+'.html')+'</div>'+flow_board()+'</div>')
        body+=cta('Build a clearer process for your business.','Discuss your priorities, current setup, and the support needed to make your next step practical.',d['service'])
        add(slug,d['name'],body,desc=d['desc'])

def industries():
    body=pagehero('Industries We Serve','Customized for Your Industry.<br><span class="accent">Built Around Your Business.</span>','Our services can be customized for busy business owners and growing organizations across a wide range of industries.',flow_board([('search','Understand the work','Your customers, workload, and priorities'),('settings','Shape the process','A system that fits your business'),('headset','Match the support','Skills and responsibilities that make sense')]))
    cards=''
    for slug,ic,title,full,desc,tasks in INDUSTRIES:
        cards+=f'<article class="card industry-card" id="{slug}" data-reveal><div class="card-header"><span class="icon-box">{icon(ic)}</span><h3>{E(title)}</h3></div><p>{E(desc)}</p>{check(tasks)}{link("Discuss your business","book-a-call.html?industry="+slug)}</article>'
    body+=section(head('Who we serve','Your industry has its own rhythm. Your support should respect it.','The examples below show possible administrative and follow-up support. Your service agreement defines the actual responsibilities.')+'<div class="grid-2">'+cards+'</div>')
    body+=section('<div class="callout"><h3>Appropriate support. Clearly defined responsibilities.</h3><p>Regulated, clinical, financial, and licensed decisions remain with your authorized professionals. Sensitive-data access and any compliance requirements must be reviewed before work begins. No industry certification or compliance status is implied by this page.</p></div>','pale section-sm')
    body+=cta('Tell Us About the Way Your Business Works.','We will help identify the systems, processes, and Virtual Assistant support that fit your goals and day-to-day workload.')
    add('industries','Industries We Serve',body)

def about():
    body=pagehero('About Global Marketing Group','Helping Businesses Grow Through <span class="accent">Systems, Support, and Service.</span>','Global Marketing Group helps small businesses and organizations improve how they manage leads, customers, marketing activities, and daily operations.',photo('team',False))
    body+=section('<div class="split"><div>'+head('Growth takes more than attention','The System Provides Structure.<br>The People Support Execution.','Our Sales Growth System and Virtual Assistant Services are designed to work together. We provide the technology and processes needed to organize growth, along with the people needed to support execution.')+'</div><div class="insight-card"><h3>What businesses need to grow</h3>'+check(['Reliable follow-up','Organized systems','Consistent communication','Skilled administrative support','Clear accountability','People who care about completing the work correctly'])+'</div></div>')
    body+=section('<div class="grid-2"><article class="card"><span class="icon-box">'+icon('capture')+'</span><span class="eyebrow">Our mission</span><h2>Practical support.<br>Meaningful progress.</h2><p>'+ABOUT_MISSION+'</p></article><article class="card"><span class="icon-box blue">'+icon('globe')+'</span><span class="eyebrow">Our vision</span><h2>A trusted partner<br>for the road ahead.</h2><p>'+ABOUT_VISION+'</p></article></div>','pale')
    body+=section(head('Our approach','We Listen. We Build. We Connect. We Grow.',center=True)+feature_grid(ABOUT_APPROACH,4))
    body+=section('<div class="split top"><div>'+head('Our roots','A U.S. Business.<br><span class="accent">A Global Support Team.</span>','Global Marketing Group describes its roots as a U.S.-based company formed in Indiana. Our Virtual Assistants are based in the Philippines and support clients remotely.')+'<p class="lead">Our rebrand brings that people-and-technology approach into one clear promise: better systems, dependable support, and a more organized way to grow.</p></div><div class="stack"><article class="card leader-card"><span class="initials" aria-hidden="true">RM</span><div><h3>Ray B. Millan</h3><p>CEO / Founder</p></div></article><article class="card leader-card"><span class="initials" aria-hidden="true">GB</span><div><h3>Gary Buenconsejo</h3><p>President</p></div></article><p class="tiny">Leadership details drawn from the existing Global Marketing Group About page.</p></div></div>','pale')
    body+=cta('Your Business Does Not Have to Grow Alone.')
    add('about-us','About Us',body,'About Global Marketing Group','Learn how Global Marketing Group helps small businesses improve sales follow-up, daily operations, automation, and productivity through integrated systems and Virtual Assistant support.')

def how_it_works():
    body=pagehero('How It Works','A Clear Process.<br><span class="accent">Support That Fits.</span>','We start by understanding your goals, challenges, workload, and current processes. Then we shape the system and support around the work you need completed.')
    body+=section('<div class="split"><div>'+head('First, we listen','Start With a Discovery Conversation.','Discuss your current sales process, missed opportunities, administrative workload, and the tasks you want to delegate.')+check(['Clarify your goals and the work that is not getting done','Review your existing CRM, lead sources, and communication','Identify the skills, schedule, and support you need','Agree on the most appropriate next step'])+'</div>'+flow_board([('search','Discovery','Understand your priorities'),('clipboard','Scope and responsibilities','Define the work and expectations'),('rocket','Onboarding','Prepare access, instructions, and next steps')])+'</div>')
    body+=section(head('The Sales Growth System','A Five-Part Process for Your Customer Journey.',center=True)+process(SGS_PROCESS)+'<div class="actions center">'+link('Explore the Sales Growth System','sales-growth-system.html')+'</div>','pale')
    body+=section(head('Virtual Assistant services','A Thoughtful Match. A Clear Start.',center=True)+process(VA_PROCESS)+'<div class="actions center">'+link('Explore Virtual Assistant Services','virtual-assistant-services.html')+'</div>')
    body+=section('<div class="split top"><div>'+head('After onboarding','Keep the Work Visible and the Communication Open.','Our team supports communication, task coordination, client check-ins, and performance reporting.')+'</div><div>'+check(['Define priorities and scheduled working hours','Track completed work and outstanding tasks','Share end-of-day or scheduled progress reports','Review questions and operational concerns','Adjust or expand the agreed scope as needs evolve'])+'</div></div>','dark-section')
    body+=section(head('Before your call','A little preparation helps us ask better questions.',center=True)+feature_grid([('file','Bring your priorities','List the tasks or missed opportunities that concern you most.'),('database','Know your current tools','Have a simple overview of where contacts and appointments are managed.'),('users','Identify the right people','Include the person who understands your day-to-day operations.')]))
    body+=cta()
    add('how-it-works','How It Works',body)

def pricing():
    body=pagehero('Pricing & Support','Start With What You Need.<br><span class="accent">Build From There.</span>','General Virtual Assistant support starts at $10 per hour. Sales Growth System and combined arrangements are scoped around your business needs.')
    cards=[('Virtual Assistant Support','From $10','per hour for general support',['Discovery and needs assessment','VA matching and defined responsibilities','Support hours and communication agreed with you'],'virtual-assistant'),('Sales Growth System','Custom scope','based on your process and requirements',['CRM and sales pipeline organization','Follow-up and appointment workflows','Lead reactivation and performance tracking'],'sales-growth'),('System + VA Support','A connected plan','technology and human support together',['A structured customer journey','A VA to help manage daily execution','Coordination and reporting based on scope'],'strategy')]
    body+=section('<div class="grid-3">'+''.join(f'<article class="card pricing-card"><span class="eyebrow">{E(t)}</span><h2>{E(p)}</h2><p>{E(sub)}</p>{check(items)}<div class="actions">{btn("Discuss Your Needs","book-a-call.html?service="+service)}</div></article>' for t,p,sub,items,service in cards)+'<p class="scope-note">Specialized or certified support may require a different rate depending on the qualifications and scope of work required. The starting rate does not represent an all-inclusive CRM, marketing, or managed-service package.</p>')
    body+=section('<div class="split"><div>'+head('Plan before you commit','Understand the Starting Rate, Then Define the Work.','Use this estimate as a discussion aid. Your actual arrangement depends on the work, qualifications, schedule, and support you agree with Global Marketing Group.')+check(['General VA support starts at $10 per hour','Specialized services may use a different rate','VA support can be separate from the Sales Growth System','The final scope and any additional costs need written confirmation'])+'</div>'+estimator()+'</div>','pale')
    body+=section('<div class="split top"><div>'+head('Clear expectations','What We Clarify Before Work Begins.')+check(['Responsibilities, priorities, and working hours','Required skills and any specialized qualifications','Onboarding, task coordination, and reporting','CRM, communication usage, third-party, or campaign costs where applicable','The service agreement and change-request process'])+'</div><div>'+faqs([4,7,8,9])+'</div></div>')
    body+=cta('Find the Right Starting Point for Your Business.')
    add('pricing','Pricing & Support',body)

# Preview controls intentionally do not collect or submit visitor information.
# Replace the marked slot with a real GHL embed, or configure GMG_CONFIG.forms.
def field(name,label,type='text',placeholder='',full=False,options=None):
    inp=f'<input id="{name}" name="{name}" type="{type}" placeholder="{E(placeholder,quote=True)}" autocomplete="off">'
    if options: inp=f'<select id="{name}" name="{name}"'+(' data-preview-service' if name=='service_interest' else '')+'>'+''.join(f'<option value="{E(v,quote=True)}">{E(t)}</option>' for v,t in options)+'</select>'
    if type=='textarea': inp=f'<textarea id="{name}" name="{name}" rows="4" placeholder="{E(placeholder,quote=True)}"></textarea>'
    return f'<div class="field{" full" if full else ""}"><label for="{name}">{E(label)}</label>{inp}</div>'
def contact_preview():
    fields=field('full_name','Full Name','text','Your full name')+field('business_name','Business Name','text','Your business')+field('email','Email Address','email','you@yourbusiness.com')+field('phone','Phone Number','tel','Your phone number')+field('website','Website','url','https://yourbusiness.com')+field('industry','Industry',options=[('','Select your industry')]+[(r[0],r[2]) for r in INDUSTRIES])+field('service_interest','Service of Interest',full=True,options=[('','Select a service'),('sales-growth','Sales Growth System'),('virtual-assistant','Virtual Assistant Services'),('crm-automation','CRM and Automation'),('both','Both Sales Growth System and VA Support')])+field('business_challenge','What is your biggest business challenge?','textarea','Tell us what needs the most attention.',True)+field('va_hours','How many hours of VA support do you need?','text','For example, 20 hours per week')+field('preferred_contact','Preferred contact method',options=[('','Select a contact method'),('email','Email'),('phone','Phone')])+field('preferred_date','Preferred consultation date','date',full=True)
    return f'''<!-- GHL_CONTACT_EMBED_START: Replace the contents of this slot with your full approved GHL inline embed, or set GMG_CONFIG.forms.contact. -->
<div class="widget-slot" id="ghl-contact-slot" data-widget="contact"><div class="contact-alternative"><span class="icon-box">{icon('phone')}</span><h3>Let’s start with a conversation.</h3><p>Online consultation requests are not available yet. Call our team to discuss your business and the support you need.</p><a class="btn btn-primary" href="tel:+13177792554" data-contact-phone>Call +1 (317) 779-2554</a><p class="tiny">No information is collected by the preview below.</p></div><details class="preview-questions"><summary>Preview the consultation questions {icon('chevron')}</summary><form class="preview-form" aria-label="Consultation form preview" onsubmit="return false"><fieldset disabled><div class="form-grid">{fields}</div><button class="btn btn-primary" type="button" disabled>Request My Consultation {icon('arrow')}</button></fieldset></form></details></div>
<!-- GHL_CONTACT_EMBED_END -->'''

def contact():
    body=pagehero("Let's Talk About Your Business",'Discover Where Better Systems and Support Can <span class="accent">Make the Greatest Difference.</span>','Schedule a discovery call with Global Marketing Group. After learning about your needs, we will recommend the most appropriate next step.',button='Schedule a Discovery Call')
    aside=head('Your discovery conversation','Let Us Learn About Your Business.')+check(CONTACT_TOPICS)+'<div class="contact-facts"><div class="reason">'+icon('map')+'<div><h3>U.S. roots. Global support.</h3><p>Shelbyville, Indiana, United States<br>Virtual Assistant team based in the Philippines</p></div></div><div class="reason">'+icon('phone')+'<div><h3>Talk with our team</h3><p><a href="tel:+13177792554" data-contact-phone>+1 (317) 779-2554</a></p><p><a href="mailto:" data-contact-email hidden></a></p></div></div><div class="reason">'+icon('globe')+'<div><h3>Stay connected</h3><p><a href="https://www.facebook.com/glomarkgroup" target="_blank" rel="noopener noreferrer">Facebook</a> &nbsp; / &nbsp; <a href="https://www.youtube.com/@glomarkgroup" target="_blank" rel="noopener noreferrer">YouTube</a></p></div></div></div>'
    body+=section('<div class="contact-layout"><aside class="contact-aside">'+aside+'</aside><div class="form-shell"><span class="eyebrow">Request a consultation</span><h2>Tell Us How We Can Help</h2><p class="small">Share a little about your business and the support you are looking for.</p>'+contact_preview()+'<p class="form-privacy">Do not send passwords, payment details, or sensitive customer records. Read our <a href="privacy-policy.html">Privacy Policy</a> before sharing information. A requested date is not a confirmed appointment.</p></div></div>',id='consultation-form')
    body+=section('<div class="split top"><div>'+head('A little more clarity','Common Questions Before We Talk.')+'</div><div>'+faqs([4,7,9])+'</div></div>','pale')
    add('contact','Contact',body,'Contact Global Marketing Group','Schedule a discovery call to discuss your Sales Growth System, CRM automation, lead follow-up, and Virtual Assistant service needs.')

def booking():
    body=pagehero('Book a Free Strategy Call','A Better Growth Process<br><span class="accent">Starts With a Conversation.</span>','Tell us where work is getting stuck. We will review your goals, current processes, workload, and service requirements before recommending a solution.',button='Choose Your Next Step')
    # Remove a circular CTA in the booking hero: the actual calendar is below.
    body=body.replace('href="book-a-call.html?service=strategy"','href="#calendar"').replace('Explore Our Services</a>','Choose Your Next Step</a>')
    left=head('Your next step','Let Us Talk About Your Priorities.','Choose the conversation that fits your needs. Your appointment is only confirmed after completing the live calendar booking process.')+'<div class="topic-buttons"><a href="book-a-call.html?service=strategy#calendar" data-topic="strategy">Strategy call</a><a href="book-a-call.html?service=sales-growth#calendar" data-topic="sales-growth">Sales Growth Assessment</a><a href="book-a-call.html?service=virtual-assistant#calendar" data-topic="virtual-assistant">VA discovery</a></div>'+check(['Review the goals and challenges you want to solve','Discuss your current systems and follow-up process','Identify daily tasks you would like to delegate','Agree on an appropriate next step'])+'<div class="callout"><p>Prefer to send the details first?</p>'+link('Use our consultation form','contact.html#consultation-form')+'</div>'
    slot='''<!-- GHL_CALENDAR_EMBED_START: Replace this slot's contents with your approved calendar embed, or set GMG_CONFIG.calendars. -->
<div class="widget-slot" data-widget="calendar" id="ghl-calendar-slot"><div class="contact-alternative"><span class="icon-box">'''+icon('calendar')+'''</span><h3>Prefer to talk it through?</h3><p>Online scheduling is not available yet. Call our team to arrange your conversation and find the right starting point.</p><a class="btn btn-primary" href="tel:+13177792554" data-contact-phone>Call +1 (317) 779-2554</a><p class="tiny">No appointment is reserved on this page.</p></div></div>
<!-- GHL_CALENDAR_EMBED_END -->'''
    body+=section('<div class="contact-layout"><aside class="contact-aside">'+left+'</aside><div class="form-shell"><span class="eyebrow">Schedule your conversation</span><h2 data-booking-topic>Free strategy call</h2>'+slot+'<p class="form-privacy">Review the <a href="privacy-policy.html">Privacy Policy</a> and <a href="terms-and-conditions.html">Terms &amp; Conditions</a> before sharing information.</p></div></div>',id='calendar')
    add('book-a-call','Book a Free Strategy Call',body)

GUIDES = [
 ('guide-lead-follow-up','Lead Follow-Up Checklist','A Practical Checkup for Your Lead Journey.','Use this checklist to find the gaps between receiving an inquiry and giving it a clear next step.','refresh',[
  ('Capture the inquiry','Start by understanding where an opportunity enters the business. A follow-up process cannot help a lead your team cannot find.', ['List the websites, forms, calls, and other sources that create inquiries.','Choose where each contact record should be stored.','Identify the information the team needs before making contact.','Decide how to check for duplicate records.']),
  ('Define the first response','An acknowledgment and a useful next action are different things. Plan both so a lead is not left waiting without direction.', ['Prepare approved messages for common inquiry types.','Name the person responsible for checking replies.','Define which inquiries need a personal conversation.','Decide how unanswered inquiries become follow-up tasks.']),
  ('Make ownership visible','The CRM should show who owns the next step, not just what happened last.', ['Set pipeline stages that reflect your actual process.','Assign an owner or responsible team member.','Record the next action and the expected follow-up date.','Define how questions or qualified opportunities are escalated.']),
  ('Support the appointment','Bring scheduling, confirmations, reminders, and next steps together.', ['Connect the appropriate booking calendar.','Review confirmation and reminder messages.','Identify who handles changes and rescheduling requests.','Record what should happen after an appointment.']),
  ('Review existing opportunities','Past leads and open proposals deserve an organized review, not a blanket message to everyone.', ['Separate active, previous, and inactive contacts.','Review the contact source and communication permissions.','Plan useful messages for each approved contact group.','Stop or adjust outreach when a contact responds or opts out.']),
  ('Review the work','Use your reporting to understand activity and unfinished next steps. Avoid judging the process from a single number.', ['Review unassigned inquiries and overdue follow-up tasks.','Check appointments and open proposals.','Discuss questions raised by the people doing the work.','Choose one practical improvement for the next review.'])]),
 ('guide-va-delegation','VA Delegation Planner','Know What to Delegate. Set Your VA Up to Succeed.','Use this planner before a VA discovery call to make your workload, priorities, and expectations easier to explain.','users',[
  ('List the recurring work','Begin with the tasks that repeatedly interrupt your day. Describe the work itself, rather than only a job title.', ['List daily and weekly administrative tasks.','Identify sales follow-up and customer communication needs.','Include CRM updates, reporting, and approved marketing support.','Separate recurring tasks from one-time projects.']),
  ('Choose a useful starting point','Start with work that has clear instructions and an identifiable outcome. Keep the initial responsibilities realistic.', ['Choose the tasks causing the most friction.','Explain what a completed task should look like.','Note any skills or specialist qualifications required.','Identify decisions that must remain with your team.']),
  ('Prepare the instructions','A reliable handover gives the VA enough context to work and a clear path for questions.', ['Prepare approved scripts, templates, and examples.','Describe the normal steps for each priority task.','Name the person who approves changes or decisions.','Explain when and how an issue should be escalated.']),
  ('Set the working arrangement','Clarify availability and communication before work begins.', ['Discuss the hours of support needed.','Agree on scheduled working hours and handovers.','Choose a task-tracking and communication method.','Define the expected end-of-day or scheduled progress report.']),
  ('Prepare access carefully','Give the person the access needed for the agreed work, not every permission available.', ['Identify the systems needed for each task.','Arrange role-appropriate accounts and permissions.','Keep passwords out of general inquiry forms and shared notes.','Agree on how access is reviewed and removed when work changes.']),
  ('Review and improve','Use the early work to improve instructions and priorities. The goal is dependable execution, not expecting someone to read your mind.', ['Review a sample of completed work together.','Ask where the instructions were unclear.','Adjust priorities as the workload becomes clearer.','Agree on any scope changes before adding new responsibilities.'])]),
 ('guide-crm-readiness','CRM Readiness Worksheet','Build the Process Before You Build the Automation.','Use this worksheet to prepare the information needed for a practical Sales Growth System assessment.','database',[
  ('Understand the current setup','Map where customer information lives before deciding what should change.', ['List your current CRM, spreadsheets, forms, and calendars.','Identify who maintains each system.','Describe the problems caused by the current setup.','Separate essential information from fields nobody uses.']),
  ('Define the customer journey','Your pipeline stages should describe real changes in a customer conversation.', ['List the main steps from inquiry to customer.','Explain what qualifies a contact to move to the next stage.','Identify waiting points, open proposals, and follow-up needs.','Decide how existing customers and inactive leads should be handled.']),
  ('Define contact information','Make it clear what the team needs to know and where that information comes from.', ['List the required contact and business details.','Record the lead source where it is available.','Plan fields for qualification, ownership, and next action.','Review the data and communication permissions available.']),
  ('Plan the automation','Every workflow needs a starting condition, a useful action, and a safe stopping point.', ['Describe what should start each workflow.','Define approved messages, assignments, and reminders.','Specify what happens when the contact responds or books.','Identify when a human needs to take over.']),
  ('Connect the people','Even a well-organized CRM needs someone to maintain the records and act on the next task.', ['Identify the owner of new inquiries.','Define who keeps pipeline stages and notes current.','List the tasks a VA could support.','Choose who receives activity reports and escalation notices.']),
  ('Prepare to review the setup','A launch review should reflect your actual customer journey, including exceptions.', ['Test a new inquiry and its follow-up path.','Review appointment confirmations and changes.','Check duplicate handling and ownership expectations.','Document open questions before the system goes live.'])])]

def resources():
    body=pagehero('Guides & Resources','Practical Tools for<br><span class="accent">a More Organized Business.</span>','Start with useful questions, simple checklists, and a clearer picture of the work your system and support team need to handle.')
    cards=''
    for slug,label,title,desc,ic,sections in GUIDES:
        cards+=f'<article class="card resource-card"><div class="resource-cover"><span>Global Marketing Group<br><br>Practical guide</span>{icon(ic)}</div><span class="eyebrow">Free interactive checklist</span><h3>{E(label)}</h3><p>{E(desc)}</p>{link("Open the guide",slug+".html")}</article>'
    body+=section(head('Make your next step easier','Prepare. Prioritize. Put the Work in Order.',center=True)+'<div class="grid-3">'+cards+'</div>')
    body+=section('<div class="split"><div>'+head('Common questions','Answers Before You Get Started.','Learn about the Sales Growth System, VA matching, pricing, location, and customization.')+link('Browse all frequently asked questions','faq.html')+'</div><div>'+faqs([0,4,7])+'</div></div>','pale')
    body+=cta('Turn a Checklist Into a Clearer Plan.','Bring your completed checklist to a discovery conversation. We will use your priorities to recommend the most appropriate next step.')
    add('resources','Guides & Resources',body)
    for slug,label,title,desc,ic,sections in GUIDES:
        body=pagehero(label,E(title),desc)
        toc='<aside class="article-nav"><span class="eyebrow">Inside this guide</span>'+''.join(f'<a href="#step-{i}">{i:02} &nbsp; {E(t)}</a>' for i,(t,*_) in enumerate(sections,1))+'</aside>'
        article='<article class="article-body"><div class="actions no-print"><button class="btn btn-primary js-only" type="button" data-print>'+icon('print')+' Print this guide</button><button class="btn btn-outline js-only" type="button" data-reset-checklist>Reset checklist</button></div><p class="note-line">Check off the items you have reviewed. These selections stay on this page only and are not sent to Global Marketing Group.</p>'
        for i,(title,desc,tasks) in enumerate(sections,1):
            article+=f'<section id="step-{i}"><span class="eyebrow">Step {i:02}</span><h2>{E(title)}</h2><p>{E(desc)}</p><ul class="print-checks">'+''.join(f'<li><label><input type="checkbox" name="check-{i}-{j}"><span>{E(t)}</span></label></li>' for j,t in enumerate(tasks,1))+'</ul></section>'
        article+='<div class="callout"><h3>Use this as a conversation starter.</h3><p>This guide is a planning tool, not a promise that every item is included in a service package. Confirm your responsibilities, support, and implementation scope during discovery.</p></div></article>'
        body+=section('<div class="article-layout">'+toc+article+'</div>')+cta()
        add(slug,label,body,desc=desc)
    body=pagehero('Frequently Asked Questions','Clear Answers.<br><span class="accent">Confident Next Steps.</span>','Learn how the Sales Growth System and Virtual Assistant Services can support your business, separately or together.')
    body+=section('<div class="faq-container">'+faqs(search=True)+'</div>')+cta('Still Have a Question?','Tell us about your business and the support you are considering. We will help clarify the next step.')
    add('faq','Frequently Asked Questions',body)

def careers():
    body=pagehero('Careers','Bring Your Skills.<br><span class="accent">Make the Work Matter.</span>','Explore the types of work connected to Global Marketing Group and share your interest in supporting businesses with professionalism, communication, and dependable follow-through.',photo('team',False),button='Explore Client Services')
    body=body.replace('href="book-a-call.html?service=strategy"','href="#application"').replace('Explore Client Services','Share Your Interest')
    body+=section(head('Areas of interest','Different Skills. A Shared Commitment to Service.','These are areas of interest, not a promise of current vacancies, selection, compensation, or a particular employment arrangement.',True)+feature_grid([('headset','Virtual & Executive Assistance','Administrative support, CRM updates, client communication, marketing coordination, and reporting.'),('briefcase','Account Representation','Business conversations and relationship support aligned with approved company processes.'),('users','Referral & Partnership Interest','Introduce your background and the kind of working relationship you would like to explore.')]))
    fields=field('applicant_name','Full Name','text','Your full name')+field('applicant_email','Email Address','email','you@example.com')+field('applicant_location','Country / Location','text','Your location')+field('applicant_role','Area of Interest',options=[('','Select an area'),('va','Virtual / Executive Assistant'),('account','Account Representative'),('referral','Referral / Partnership')])+field('applicant_profile','Professional Profile or Portfolio URL','url','https://',True)+field('applicant_availability','Availability','text','Your preferred working hours',True)+field('applicant_experience','Relevant Experience','textarea','Tell us about your skills and the work you support.',True)
    body+=section('<div class="contact-layout"><div>'+head('Share your interest','Tell Us About the Work You Do Well.','Describe your experience, the systems you know, your availability, and how you support clear communication and consistent execution.')+'<div class="callout"><p>Use professional information only. Do not submit government identification, passwords, bank details, or sensitive personal documents through this form.</p></div></div><div class="form-shell"><h2>Introduce Yourself</h2><!-- GHL_CAREERS_EMBED_START --><div class="widget-slot" data-widget="careers" id="ghl-careers-slot"><div class="widget-notice"><strong>Application form preview. Not connected.</strong>Add a separate, approved GHL recruitment form before inviting applications.</div><form class="preview-form" aria-label="Careers form preview" onsubmit="return false"><fieldset disabled><div class="form-grid">'+fields+'</div><button type="button" class="btn btn-primary" disabled>Share My Interest</button></fieldset></form></div><!-- GHL_CAREERS_EMBED_END --><p class="form-privacy">Review the <a href="privacy-policy.html">Privacy Policy</a> before sharing your professional information.</p></div></div>','pale',id='application')
    add('careers','Careers',body)

def portfolio():
    projects=[('Awaken the Sacred Woman','Coaching & personal development','A coaching and personal-development business featured in the existing Global Marketing Group portfolio.','https://inspiredbyelba.com','heart','AS'),('HealthViber','Health services','A health-services business featured in the existing portfolio.','https://healthviber.com','medical','HV'),('Tranquility Salt Cave','Wellness','A Columbus, Ohio wellness business featured in the existing portfolio.','https://tranquilitysaltcave.com','heart','TS'),('Klinghammer Construction','Home services','A remodeling and construction business featured in the existing portfolio.','https://klinghammer-construction.com','home','KC'),('The COC Cares','Nonprofit','A cancer-support nonprofit featured in the existing portfolio.','https://www.thecoccares.org','hands','COC')]
    body=pagehero('Portfolio','Different Businesses.<br><span class="accent">A Shared Need for Better Support.</span>','A selection of businesses featured on the existing Global Marketing Group portfolio page. Explore their public websites for context.')
    body+=section('<div class="grid-2">'+''.join(f'<article class="card portfolio-card"><div class="portfolio-cover">{icon(ic)}<span>{initials}</span></div><span class="eyebrow">{E(cat)}</span><h2>{E(name)}</h2><p>{E(desc)}</p><a class="text-link" href="{url}" target="_blank" rel="noopener noreferrer">Visit public website {icon("arrow")}</a></article>' for name,cat,desc,url,ic,initials in projects)+'<article class="card portfolio-invitation"><span class="icon-box">'+icon('globe')+'</span><h2>What Could Better Systems and Support Look Like for Your Business?</h2><p>Tell us about your workload, customer journey, and the opportunities you want to manage more consistently.</p>'+link('Start a conversation','contact.html')+'</article></div><p class="scope-note">Portfolio listings identify businesses publicly featured by Global Marketing Group. No specific project scope, quantified outcome, current contract status, or endorsement is claimed here.</p>')+cta()
    add('portfolio','Portfolio',body)

def legal_and_utility():
    legal={
      'privacy-policy':('Privacy Policy',[
       ('Information and purpose','Insert the approved explanation of what information is collected through inquiries, bookings, applications, and any added tracking tools, and why it is used.'),
       ('Service providers and communications','Identify the actual CRM, form, calendar, hosting, and communications providers. Review cross-border handling, communication permissions, retention, and privacy-request procedures.'),
       ('This website implementation','The delivered website does not preload analytics or advertising trackers. It can load your configured external GHL widget after a visitor chooses to do so. Animation preferences may be stored in session storage. Adding integrations can change these details.'),
       ('Business details and contact','Confirm the responsible business entity, approved contact method, applicable rights, policy effective date, and complete owner-approved wording.')]),
      'terms-and-conditions':('Terms & Conditions',[
       ('Website use','Insert the approved terms covering website access, intellectual property, acceptable use, external links, and any relevant limitations.'),
       ('Services and scope','Review how website descriptions relate to actual service agreements, fees, working hours, deliverables, third-party charges, and change requests.'),
       ('Inquiries and appointments','Clarify the effect of submitting an inquiry or requesting an appointment. A preferred date on a form must not be described as a confirmed booking.'),
       ('Approval before publication','Confirm the responsible entity, applicable law, dispute terms, effective date, and wording with the appropriate reviewer. This layout does not establish contract terms.')]),
      'refund-policy':('Refund Policy',[
       ('Review the existing policy','The current website includes a credit-card refund policy. Confirm whether its eligibility rules, request deadlines, and processing times remain approved for the rebranded offers.'),
       ('Clarify which services are covered','Review treatment of VA hours, CRM setup, recurring services, completed work, subscriptions, and third-party costs under the relevant agreements.'),
       ('Publish the approved process','Insert the authorized request method, required transaction information, review process, and final policy wording. This template does not create refund rights or exclusions.')])}
    for slug,(label,sections) in legal.items():
        body=pagehero(label,E(label),'Branded policy layout prepared for review. Final approved policy wording is required before publication.')
        body+=section('<div class="legal-container"><div class="policy-banner"><strong>Review draft. Not a final published policy.</strong><p>The supplied content document names this page but does not provide its policy text. Do not publish this draft in place of an approved policy. This page is excluded from search indexing in the supplied files.</p></div><!-- APPROVED_POLICY_CONTENT_START -->'+''.join(f'<section class="legal-block"><h2>{E(title)}</h2><p>{E(desc)}</p></section>' for title,desc in sections)+'<!-- APPROVED_POLICY_CONTENT_END --><p class="small">For business inquiries, please use the <a href="contact.html">Contact page</a>.</p></div>')
        add(slug,label,body,noindex=True)
    body=section('<div class="success-shell"><div class="success-icon">'+icon('check')+'</div><span class="eyebrow">Global Marketing Group</span><h1>Thank You for Connecting.</h1><p>For successfully submitted inquiries, the next step is a review of your business goals and support needs. A consultation request does not confirm an appointment.</p><p>Use our booking page to choose an available time, or return to the contact page if you have not submitted your details.</p><div class="actions center">'+btn('Book a Strategy Call','book-a-call.html')+btn('Back to Home','index.html','outline')+'</div><p class="tiny">This page is a confirmation-page layout. It does not itself send a form, reserve a time, or verify a submission.</p></div>')
    add('thank-you','Thank You',body,noindex=True)
    body=section('<div class="success-shell"><span class="eyebrow">Page not found / 404</span><h1>A Clear Next Step.<br>Just Not This Page.</h1><p>The page you are looking for may have moved. Let us help you find the right place.</p><div class="actions center">'+btn('Return to Home','index.html')+btn('Explore Services','services.html','outline')+'</div></div>')
    add('404','Page Not Found',body,noindex=True)


def data_uri(path):
    mime={'.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg'}.get(path.suffix,'application/octet-stream')
    return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode('ascii')
def inline_images(markup):
    return re.sub(r'(?P<prefix>src=")(assets/images/[^"]+)(?P<suffix>")',lambda m:m.group('prefix')+data_uri(WEB/m.group(2))+m.group('suffix'),markup)

def build():
    WEB.mkdir(parents=True,exist_ok=True)
    for folder in ('standalone', 'ghl-blocks', 'docs'):
        (ROOT/folder).mkdir(exist_ok=True)
    home(); sales_growth(); virtual_assistant(); services(); industries(); about(); how_it_works(); pricing(); contact(); booking(); resources(); careers(); portfolio(); legal_and_utility()
    css=(ASSETS/'styles.css').read_text()
    js=(ASSETS/'main.js').read_text()
    config=(ASSETS/'gmg-config.js').read_text()
    route_map={slug+'.html':('/' if slug=='index' else '/'+slug) for slug in PAGES}
    ghl_config=config.replace('routes: {}','routes: '+json.dumps(route_map,indent=2))
    meta_rows=[]
    for slug,d in PAGES.items():
        url='https://glomarkgroup.com/'+('' if slug=='index' else slug+'.html')
        favicon='<link rel="icon" type="image/png" href="assets/images/brand-mark.png">'
        headmeta=f'''<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#071e3f"><meta name="description" content="{E(d['description'],quote=True)}"><meta name="robots" content="{'noindex,follow' if d['noindex'] else 'index,follow'}"><title>{E(d['title'])}</title><link rel="canonical" href="{url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Global Marketing Group"><meta property="og:title" content="{E(d['title'],quote=True)}"><meta property="og:description" content="{E(d['description'],quote=True)}"><meta property="og:url" content="{url}"><meta property="og:image" content="https://glomarkgroup.com/assets/images/social-preview.jpg"><meta name="twitter:card" content="summary_large_image">'''
        schema={'@context':'https://schema.org','@type':'WebPage','name':d['title'],'description':d['description'],'url':url,'publisher':{'@type':'Organization','name':'Global Marketing Group','url':'https://glomarkgroup.com/'}}
        structured='<script type="application/ld+json">'+json.dumps(schema,ensure_ascii=True)+'</script>'
        shell=f'<div id="gmg-site">{sprite()}{nav(slug)}<main id="main-content">{d["body"]}</main>{footer()}</div>'
        # Static edition: shared, cacheable CSS/JS/images. Each page has a complete document.
        full=f'<!doctype html>\n<html lang="en"><head>{headmeta}{favicon}<link rel="stylesheet" href="assets/styles.css">{structured}</head><body class="gmg-document">{shell}<script src="assets/gmg-config.js"></script><script src="assets/main.js"></script></body></html>\n'
        (WEB/(slug+'.html')).write_text(full)
        # Portable edition: all CSS, JS, and image bytes are inside this one HTML file.
        inline_favicon='<link rel="icon" type="image/png" href="'+data_uri(ASSETS/'images/brand-mark.png')+'">'
        portable=f'<!doctype html>\n<html lang="en"><head>{headmeta}{inline_favicon}<style>\n{css}\n</style>{structured}</head><body class="gmg-document">{inline_images(shell)}\n<script>\n{config}\n</script>\n<script>\n{js}\n</script></body></html>\n'
        (ROOT/'standalone'/(slug+'.html')).write_text(portable)
        # GHL Custom HTML edition: do not paste document tags into a page-builder element.
        block=f'<!-- GMG GHL BLOCK: {d["label"]}\nUse one full-width custom HTML element. Remove default page-builder padding.\nSet title, description, canonical URL, and noindex in the GHL page SEO settings.\nNative embeds may replace the marked slots. All styles are scoped to #gmg-site. -->\n<style>\n{css}\n</style>\n{inline_images(shell)}\n<script>\n{ghl_config}\n</script>\n<script>\n{js}\n</script>\n'
        (ROOT/'ghl-blocks'/(slug+'.html')).write_text(block)
        meta_rows.append({'file':slug+'.html','ghl_slug':'/' if slug=='index' else '/'+slug,'page_title':d['title'],'meta_description':d['description'],'robots':'noindex,follow' if d['noindex'] else 'index,follow'})
    with (ROOT/'docs/SEO-PAGE-MAP.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(meta_rows[0]));w.writeheader();w.writerows(meta_rows)
    (ROOT/'docs/page-manifest.json').write_text(json.dumps([{k:v for k,v in d.items() if k!='body'}|{'slug':slug,'file':slug+'.html'} for slug,d in PAGES.items()],indent=2))
    # Crawling assets use the static-edition URLs. Regenerate for the final deployment path.
    sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('<url><loc>https://glomarkgroup.com/'+('' if slug=='index' else slug+'.html')+'</loc></url>\n' for slug,d in PAGES.items() if not d['noindex'])+'</urlset>\n'
    (WEB/'sitemap.xml').write_text(sitemap)
    (WEB/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://glomarkgroup.com/sitemap.xml\n')
    (ROOT/'docs/ghl-route-map.json').write_text(json.dumps(route_map,indent=2))
    # Start page lives outside the published site. It is a local handoff dashboard.
    start='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Global Marketing Group | Website Handoff</title><style>body{margin:0;background:#f1f7f7;color:#071e3f;font:16px/1.65 system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:55px 25px}h1{font-size:clamp(32px,5vw,52px);letter-spacing:-.05em;line-height:1.1}h2{margin-top:45px}a{color:#006d70;text-underline-offset:4px}small{color:#536779}header{background:#071e3f;color:white;border-radius:22px;padding:40px}header p{color:#c5dcdF}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:15px}.card{background:white;padding:22px;border:1px solid #dbe7e8;border-radius:14px}.card b{display:block;margin-bottom:13px}.links{display:flex;flex-wrap:wrap;gap:16px;font-size:14px}.note{padding:22px;border-left:4px solid #008889;background:#e6f3ee;margin:25px 0}code{font-size:13px}li{margin:8px 0}</style></head><body><main><header><small style="color:#6ed6c5">GLOBAL MARKETING GROUP / WEBSITE HANDOFF</small><h1>Better systems.<br>Better people. Better growth.</h1><p>28 complete pages. Three delivery formats. One connected brand.</p></header><div class="note"><strong>Start here:</strong> Open <a href="standalone/index.html">the self-contained homepage</a>. Every standalone page includes its styles, scripts, icons, and images. Extract the full ZIP to use all navigation links.</div><h2>Choose your format</h2><div class="grid"><div class="card"><b>1. Standalone HTML</b><p>Open or edit any full HTML file. No installation, CDN, or asset folder needed.</p></div><div class="card"><b>2. Website folder</b><p>Publish all contents together to a static host. Shared assets make ongoing maintenance easier.</p></div><div class="card"><b>3. GHL blocks</b><p>Paste the block into a full-width Custom HTML element, then configure routes and live widgets.</p></div></div><h2>Page directory</h2><div class="grid">'''
    start+=''.join(f'<div class="card"><b>{E(d["label"])}</b><div class="links"><a href="standalone/{slug}.html">Full HTML</a><a href="../{slug}.html">Shared-asset page</a><a href="ghl-blocks/{slug}.html">GHL block</a></div><small>{slug}.html</small></div>' for slug,d in PAGES.items())
    start+='''</div><h2>Before publishing</h2><div class="card"><p>Configure your approved GHL contact form, separate careers form, and booking calendars. Form and calendar previews are intentionally inactive. Replace the three policy drafts with approved copy. Confirm leadership, contact details, portfolio permissions, and the final URL format.</p><div class="links"><a href="docs/GHL-INTEGRATION.md">Integration guide</a><a href="docs/CONTENT-SOURCES.md">Content sources</a><a href="docs/LAUNCH-CHECKLIST.md">Launch checklist</a><a href="docs/SEO-PAGE-MAP.csv">SEO page map</a><a href="docs/QA-REPORT.md">QA report</a></div></div></main></body></html>'''
    (ROOT/'START-HERE.html').write_text(start)
    print(f'Built {len(PAGES)} pages x 3 formats in {ROOT}')

if __name__=='__main__':
    build()
