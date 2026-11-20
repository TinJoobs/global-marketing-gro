import Lenis from "lenis";

let instance: Lenis | null = null;

export function startSmoothScroll(): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return () => undefined;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return () => undefined;
  try {
    instance = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      prevent: (node) =>
        !!node.closest?.(
          ".gmg-modal-overlay, .cookie-panel, #gmg-nav-list, .gmg-mega, .integration-logo-row",
        ),
    });
  } catch {
    instance = null;
    return () => undefined;
  }
  let frame = 0;
  const loop = (time: number) => {
    instance?.raf(time);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);
  const sync = () => {
    if (!instance) return;
    const locked =
      document.body.style.overflow === "hidden" ||
      document.getElementById("gmg-site")?.hasAttribute("inert");
    if (locked) instance.stop();
    else instance.start();
  };
  const observer = new MutationObserver(sync);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });
  const site = document.getElementById("gmg-site");
  if (site)
    observer.observe(site, { attributes: true, attributeFilter: ["inert"] });
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    instance?.destroy();
    instance = null;
  };
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export function scrollToElement(el: HTMLElement) {
  if (instance) instance.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ block: "start" });
}
