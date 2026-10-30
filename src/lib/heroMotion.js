export function initializeHero(hero, root) {
const $ = (selector, scope=hero) => scope.querySelector(selector);
  const canvas = $('[data-depth-canvas]', hero);
  const stage = $('.platform-stage', hero);
  const context = canvas && canvas.getContext('2d');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const rect = hero.getBoundingClientRect();
  let inView = rect.bottom > 0 && rect.top < window.innerHeight;
  let running = false;
  let frame = 0;
  let pointerFrame = 0;
  let width = 0;
  let height = 0;
  let previous = 0;
  const particles = Array.from({ length: window.innerWidth < 760 ? 28 : 58 }, () => ({
    x: (Math.random() - 0.5) * 1800,
    y: (Math.random() - 0.5) * 1000,
    z: 100 + Math.random() * 1500,
  }));
  const motionAllowed = () => root.dataset.motion === 'on' && !document.hidden && inView;
  function draw(delta = 0) {
    if (!context || !width || !height) return;
    context.clearRect(0, 0, width, height);
    particles.forEach(point => {
      point.z -= delta * 0.012;
      if (point.z < 100) point.z = 1600;
      const scale = 550 / point.z;
      const x = width * 0.66 + point.x * scale;
      const y = height * 0.48 + point.y * scale;
      if (x < 0 || x > width || y < 0 || y > height) return;
      context.beginPath();
      context.arc(x, y, Math.min(2, scale), 0, Math.PI * 2);
      context.fillStyle = `rgba(217,180,106,${Math.min(0.65, scale * 0.4)})`;
      context.fill();
    });
  }
  function tick(time) {
    if (!running) return;
    draw(previous ? Math.min(40, time - previous) : 0);
    previous = time;
    frame = requestAnimationFrame(tick);
  }
  function resetPointer() {
    cancelAnimationFrame(pointerFrame);
    if (stage) {
      stage.style.removeProperty('--pointer-x');
      stage.style.removeProperty('--pointer-y');
    }
  }
  function syncMotion() {
    hero.dataset.inView = String(inView);
    hero.dataset.pageVisible = String(!document.hidden);
    const next = motionAllowed();
    if (!next) {
      running = false;
      cancelAnimationFrame(frame);
      previous = 0;
      resetPointer();
      draw();
    } else if (!running) {
      running = true;
      previous = 0;
      if (context) frame = requestAnimationFrame(tick);
    }
  }
  function resize() {
    if (!canvas || !context) return;
    const box = hero.getBoundingClientRect();
    width = box.width;
    height = box.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
  if(resizeObserver) resizeObserver.observe(hero);
  else window.addEventListener('resize', resize, { passive: true });
  const intersectionObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    syncMotion();
  }) : null;
  if(intersectionObserver) intersectionObserver.observe(hero);
  document.addEventListener('visibilitychange', syncMotion);
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updatePreference = () => { root.dataset.motion = preference.matches ? 'off' : 'on'; syncMotion(); };
  preference.addEventListener('change', updatePreference);
  const onPointerMove = event => {
    if (!stage || !finePointer.matches || !motionAllowed()) return;
    const box = hero.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      stage.style.setProperty('--pointer-x', `${x * 7}deg`);
      stage.style.setProperty('--pointer-y', `${-y * 6}deg`);
    });
  };
  hero.addEventListener('pointermove', onPointerMove);
  hero.addEventListener('pointerleave', resetPointer);
  resize();
  updatePreference();
  return () => {
    running = false; cancelAnimationFrame(frame); cancelAnimationFrame(pointerFrame);
    resizeObserver?.disconnect(); intersectionObserver?.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', syncMotion);
    preference.removeEventListener('change', updatePreference);
    hero.removeEventListener('pointermove', onPointerMove);
    hero.removeEventListener('pointerleave', resetPointer);
  };

}