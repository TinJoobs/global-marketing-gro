/* Global Marketing Group | No framework, no tracker, no client-side secrets. */
(() => {
  'use strict';
  const root = document.getElementById('gmg-site');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  root.classList.add('gmg-js');
  const config = window.GMG_CONFIG || {};
  const $ = (selector, scope = root) => scope.querySelector(selector);
  const $$ = (selector, scope = root) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let manuallyPaused = false;
  try { manuallyPaused = sessionStorage.getItem('gmg-motion-paused') === 'true'; } catch (_) { /* Storage is optional. */ }
  function setMotion() {
    const off = reduceMotion.matches || manuallyPaused;
    root.dataset.motion = off ? 'off' : 'on';
    $$('[data-motion-toggle]').forEach(button => {
      button.setAttribute('aria-pressed', String(off));
      button.textContent = reduceMotion.matches ? 'Reduced motion enabled' : (off ? 'Resume animations' : 'Pause animations');
      button.disabled = reduceMotion.matches;
    });
    if (off) $$('[data-tilt]').forEach(el => el.style.removeProperty('transform'));
  }
  $$('[data-motion-toggle]').forEach(button => button.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    try { sessionStorage.setItem('gmg-motion-paused', String(manuallyPaused)); } catch (_) { /* Optional preference. */ }
    setMotion();
  }));
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', setMotion);
  setMotion();

  const menuToggle = $('[data-nav-toggle]');
  const menu = $('[data-nav-panel]');
  function closeMenu(restoreFocus = false) {
    if (!menu || !menuToggle) return;
    $$('.nav-menu[open]').forEach(details => { details.open = false; });
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) menuToggle.focus();
  }
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menu.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    const desktop = window.matchMedia('(min-width: 1001px)');
    if (desktop.addEventListener) desktop.addEventListener('change', () => {
      const focused = document.activeElement;
      const disclosure = focused && focused.closest('.nav-menu');
      const hadMenuFocus = menu.contains(focused);
      closeMenu();
      if (!desktop.matches && hadMenuFocus) menuToggle.focus();
      else if (desktop.matches && disclosure) $('summary', disclosure).focus();
      else if (desktop.matches && focused === menuToggle) $('.nav-menu > summary', menu).focus();
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openDropdown = $('.nav-menu[open]');
    if (openDropdown) {
      openDropdown.open = false;
      $('summary', openDropdown).focus();
    } else if (menu && menu.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    $$('.nav-menu[open]').forEach(details => {
      if (!details.contains(event.target)) details.open = false;
    });
    if (menu && menuToggle && !menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  document.addEventListener('focusin', event => {
    $$('.nav-menu[open]').forEach(details => {
      if (!details.contains(event.target)) details.open = false;
    });
    if (menu && menuToggle && !menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  $$('.nav-menu').forEach(details => details.addEventListener('toggle', () => {
    if (!details.open) return;
    $$('.nav-menu[open]').forEach(other => { if (other !== details) other.open = false; });
  }));

  // Content is visible without JavaScript. Only offscreen elements receive reveal effects.
  if ('IntersectionObserver' in window && root.dataset.motion !== 'off') {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -15px 0px' });
    $$('[data-reveal]').forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-ready');
        observer.observe(el);
      }
    });
  }
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  $$('[data-tilt]').forEach(el => {
    let frame = 0;
    el.addEventListener('pointermove', event => {
      if (!finePointer.matches || root.dataset.motion === 'off') return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg)`;
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty('transform');
    });
  });

  const params = new URLSearchParams(window.location.search);
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const withCampaign = url => {
    if (!config.forwardCampaignParameters) return url;
    campaignKeys.forEach(key => {
      const value = params.get(key);
      if (value && value.length <= 200 && !url.searchParams.has(key)) url.searchParams.set(key, value);
    });
    return url;
  };
  const routes = config.routes || {};
  $$('a[href]').forEach(link => {
    const raw = link.getAttribute('href');
    if (!raw || /^(#|mailto:|tel:)/i.test(raw)) return;
    try {
      const url = new URL(raw, window.location.href);
      const sameOrigin = url.origin === window.location.origin;
      const basename = url.pathname.split('/').pop();
      if (sameOrigin && Object.prototype.hasOwnProperty.call(routes, basename)) {
        const target = new URL(routes[basename], window.location.href);
        if (!['https:', 'http:', 'file:'].includes(target.protocol)) return;
        // Route values can include their own query; preserve page-specific service context.
        url.searchParams.forEach((v, k) => { if (!target.searchParams.has(k)) target.searchParams.set(k, v); });
        if (url.hash) target.hash = url.hash;
        link.href = withCampaign(target).href;
      } else if (sameOrigin && config.forwardCampaignParameters) {
        link.href = withCampaign(url).href;
      }
    } catch (_) { /* A malformed optional route must not break the page. */ }
  });

  function httpsUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try { const url = new URL(value.trim()); return url.protocol === 'https:' ? url : null; } catch (_) { return null; }
  }
  const email = String(config.contactEmail || '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    $$('[data-contact-email]').forEach(link => {
      link.textContent = email; link.href = `mailto:${email}`; link.hidden = false;
    });
  }
  const phoneHref = String(config.contactPhoneHref || '');
  if (config.contactPhone && /^tel:\+?[0-9 ()-]+$/.test(phoneHref)) {
    $$('[data-contact-phone]').forEach(link => {
      link.textContent = String(config.contactPhone); link.href = phoneHref; link.hidden = false;
    });
  }
  $$('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  const service = params.get('service') || 'strategy';
  const serviceLabels = {
    strategy: 'Free strategy call',
    'sales-growth': 'Sales Growth Assessment',
    'virtual-assistant': 'VA discovery call',
    'crm-automation': 'CRM and automation discovery',
    'digital-solutions': 'Digital solutions discovery',
    'appointment-setting': 'Appointment-setting discovery',
    'lead-follow-up': 'Lead follow-up discovery'
  };
  $$('[data-booking-topic]').forEach(el => { el.textContent = serviceLabels[service] || serviceLabels.strategy; });
  $$('[data-topic]').forEach(link => link.setAttribute('aria-current', String(link.dataset.topic === service)));
  const serviceSelect = $('[data-preview-service]');
  if (serviceSelect && Array.from(serviceSelect.options).some(option => option.value === service)) serviceSelect.value = service;

  let helperLoaded = false;
  function loadEmbedHelper() {
    const helperUrl = httpsUrl(config.embedHelperScript);
    if (!helperUrl || helperLoaded) return;
    helperLoaded = true;
    const script = document.createElement('script');
    script.src = helperUrl.href;
    script.async = true;
    document.body.appendChild(script);
  }
  $$('[data-widget]').forEach(slot => {
    const kind = slot.dataset.widget;
    const forms = config.forms || {};
    const calendars = config.calendars || {};
    let rawUrl = forms[kind] || '';
    if (kind === 'calendar') {
      const key = service === 'virtual-assistant' ? 'virtualAssistant' : (
        ['sales-growth', 'crm-automation', 'appointment-setting', 'lead-follow-up'].includes(service) ? 'salesGrowth' : 'strategy'
      );
      rawUrl = calendars[key] || calendars.strategy || '';
    }
    const embedUrl = httpsUrl(rawUrl);
    if (!embedUrl) return; // Keep the clearly labeled, non-submitting setup preview.
    withCampaign(embedUrl);
    const name = kind === 'calendar' ? 'booking calendar' : (kind === 'careers' ? 'application form' : 'consultation form');
    const mount = () => {
      const restoreFocus = slot.contains(document.activeElement);
      slot.replaceChildren();
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl.href;
      iframe.title = `Global Marketing Group ${name}`;
      iframe.className = 'gmg-embed';
      const heights = config.widgetHeights || {};
      const requestedHeight = Number(heights[kind]);
      iframe.height = String(Number.isFinite(requestedHeight) && requestedHeight >= 300 ? requestedHeight : (kind === 'calendar' ? 920 : 1180));
      iframe.loading = 'eager';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      const formMatch = embedUrl.pathname.match(/\/widget\/form\/([a-zA-Z0-9_-]+)/);
      iframe.id = formMatch ? `inline-${formMatch[1]}` : `gmg-${kind}-embed`;
      if (formMatch) {
        iframe.dataset.layout = '{"id":"INLINE"}';
        iframe.dataset.triggerType = 'alwaysShow';
        iframe.dataset.triggerValue = '';
        iframe.dataset.activationType = 'alwaysActivated';
        iframe.dataset.activationValue = '';
        iframe.dataset.deactivationType = 'neverDeactivate';
        iframe.dataset.deactivationValue = '';
        iframe.dataset.formName = `GMG ${name}`;
        iframe.dataset.height = iframe.height;
        iframe.dataset.layoutIframeId = iframe.id;
        iframe.dataset.formId = formMatch[1];
      }
      slot.appendChild(iframe);
      const fallback = document.createElement('a');
      fallback.href = embedUrl.href;
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.className = 'widget-fallback';
      fallback.textContent = `Having trouble? Open the ${name} in a new tab.`;
      slot.appendChild(fallback);
      if (restoreFocus) iframe.focus();
      loadEmbedHelper();
    };
    if (config.clickToLoadWidgets === false) { mount(); return; }
    const gate = document.createElement('div');
    gate.className = 'widget-gate';
    const heading = document.createElement('h3');
    heading.textContent = kind === 'calendar' ? 'Choose a time that works for you' : (kind === 'careers' ? 'Tell us about your experience' : 'Tell us how we can help');
    const description = document.createElement('p');
    description.textContent = `Load our ${name} to continue. This connects to our external form and scheduling provider. Review the Privacy Policy before sharing personal information.`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary';
    button.textContent = `Load ${name}`;
    button.addEventListener('click', mount, { once: true });
    gate.append(heading, description, button);
    slot.replaceChildren(gate);
  });

  const hours = $('[data-hours]');
  if (hours) {
    hours.disabled = false;
    const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    const updateEstimate = () => {
      const h = Number(hours.value);
      if (!Number.isFinite(h)) return;
      $('[data-hours-value]').textContent = `${h} hours`;
      $('[data-weekly-estimate]').textContent = currency.format(h * 10);
      $('[data-monthly-estimate]').textContent = currency.format(h * 10 * 52 / 12);
      hours.setAttribute('aria-valuetext', `${h} hours per week`);
    };
    hours.addEventListener('input', updateEstimate);
    updateEstimate();
  }
  const roleToggle = $('[data-expand-roles]');
  if (roleToggle) roleToggle.addEventListener('click', () => {
    const cards = $$('details.role-card');
    const open = cards.some(card => !card.open);
    cards.forEach(card => { card.open = open; });
    roleToggle.textContent = open ? 'Collapse all roles' : 'Explore all roles';
    roleToggle.setAttribute('aria-expanded', String(open));
  });
  const search = $('[data-faq-search]');
  if (search) {
    const cards = $$('[data-faq]');
    const status = $('[data-faq-status]');
    search.addEventListener('input', () => {
      const term = search.value.trim().toLowerCase();
      let count = 0;
      cards.forEach(card => {
        const matches = card.textContent.toLowerCase().includes(term);
        card.hidden = !matches;
        if (matches) count += 1;
      });
      status.textContent = term ? `${count} of ${cards.length} questions match your search.` : '';
      const empty = $('[data-faq-empty]');
      if (empty) empty.hidden = count !== 0;
    });
  }
  $$('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
  $$('[data-reset-checklist]').forEach(button => button.addEventListener('click', () => {
    $$('.print-checks input[type="checkbox"]').forEach(input => { input.checked = false; });
  }));
})();

/* A single logo row uses one animation loop; native scrolling remains available. */
(() => {
  const root=document.getElementById('gmg-site');
  const slider=root?.querySelector('[data-integration-slider]');
  if(!slider||slider.dataset.ready==='true')return;
  slider.dataset.ready='true';
  const rows=Array.from(slider.querySelectorAll('[data-logo-row]')).map(viewport=>{
    const original=viewport.querySelector('[data-logo-original]');
    const clone=original.cloneNode(true);
    clone.removeAttribute('data-logo-original');clone.setAttribute('data-logo-clone','');clone.setAttribute('aria-hidden','true');
    clone.querySelectorAll('a').forEach(link=>link.tabIndex=-1);
    viewport.querySelector('.integration-logo-track').append(clone);
    return {viewport,original,clone,width:0,position:0,direction:Number(viewport.dataset.direction)};
  });
  let frame=0,previous=0,inView=false,hovered=false,scrollPauseUntil=0,resumeTimer=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const motionAllowed=()=>root.dataset.motion==='on'&&!reduced.matches&&!document.hidden&&inView&&!hovered&&!slider.contains(document.activeElement)&&performance.now()>=scrollPauseUntil;
  function measure(){rows.forEach(row=>{row.width=row.original.getBoundingClientRect().width;if(row.direction<0&&row.viewport.scrollLeft===0&&!row.clone.hidden&&root.dataset.motion==='on'&&!reduced.matches)row.viewport.scrollLeft=row.width;});}
  function stop(){cancelAnimationFrame(frame);frame=0;previous=0;}
  function tick(time){if(!motionAllowed()){stop();return;}const delta=previous?Math.min(40,time-previous):0;previous=time;rows.forEach(row=>{if(!row.width)return;let next=row.position+row.direction*delta*.022;if(next>=row.width)next-=row.width;else if(next<0)next+=row.width;row.position=next;row.viewport.scrollLeft=next;});frame=requestAnimationFrame(tick);}
  function sync(){const off=root.dataset.motion!=='on'||reduced.matches;rows.forEach(row=>{row.clone.hidden=off;});if(motionAllowed()){if(!frame){rows.forEach(row=>row.position=row.viewport.scrollLeft);frame=requestAnimationFrame(tick);}}else stop();}
  function userScroll(){scrollPauseUntil=performance.now()+2500;stop();clearTimeout(resumeTimer);resumeTimer=setTimeout(sync,2600);}
  slider.addEventListener('mouseenter',()=>{hovered=true;sync();});slider.addEventListener('mouseleave',()=>{hovered=false;sync();});
  slider.addEventListener('focusin',sync);slider.addEventListener('focusout',()=>requestAnimationFrame(sync));
  slider.addEventListener('pointerdown',userScroll,{passive:true});slider.addEventListener('pointerup',userScroll,{passive:true});slider.addEventListener('wheel',userScroll,{passive:true});
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-motion']});
  if('ResizeObserver'in window)new ResizeObserver(measure).observe(slider);else addEventListener('resize',measure,{passive:true});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();}).observe(slider);else{inView=true;}
  measure();sync();
})();
