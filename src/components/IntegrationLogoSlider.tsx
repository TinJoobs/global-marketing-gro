import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logos from "../data/integrationLogos.json";
import "../integration-logos.css";

export default function IntegrationLogoSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const root = slider.closest<HTMLElement>("#gmg-site");
    const viewport = slider.querySelector<HTMLElement>("[data-logo-row]")!;
    const original = slider.querySelector<HTMLElement>("[data-logo-original]")!;
    const clone = slider.querySelector<HTMLElement>("[data-logo-clone]")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let position = 0;
    let width = 0;
    let inView = !("IntersectionObserver" in window);
    let hovered = false;
    let touching = false;
    let disposed = false;
    let pauseUntil = 0;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    const listeners: (() => void)[] = [];
    const motionOff = () => reduced.matches || root?.dataset.motion === "off";
    const canMove = () =>
      !motionOff() &&
      !document.hidden &&
      inView &&
      !hovered &&
      !touching &&
      !slider.contains(document.activeElement) &&
      performance.now() >= pauseUntil;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    }

    function tick(time: number) {
      if (disposed || !canMove()) {
        stop();
        return;
      }
      const delta = previous ? Math.min(40, time - previous) : 0;
      previous = time;
      if (width > 0) {
        position = (position + delta * 0.022) % width;
        viewport.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      if (disposed) return;
      clone.hidden = motionOff();
      if (canMove()) {
        if (!frame) {
          position = viewport.scrollLeft;
          frame = requestAnimationFrame(tick);
        }
      } else stop();
    }

    function measure() {
      width = original.getBoundingClientRect().width;
    }

    function userScroll() {
      stop();
      clearTimeout(resumeTimer);
      // Reduced-motion users own the native scroll position, including after interaction.
      if (motionOff()) {
        pauseUntil = 0;
        return;
      }
      pauseUntil = performance.now() + 2500;
      resumeTimer = setTimeout(sync, 2501);
    }

    function listen(
      target: EventTarget,
      event: string,
      callback: EventListener,
      passive = false,
    ) {
      target.addEventListener(event, callback, { passive });
      listeners.push(() => target.removeEventListener(event, callback));
    }

    listen(slider, "mouseenter", () => {
      hovered = true;
      sync();
    });
    listen(slider, "mouseleave", () => {
      hovered = false;
      sync();
    });
    listen(slider, "focusin", sync);
    listen(slider, "focusout", () => queueMicrotask(sync));
    listen(
      slider,
      "pointerdown",
      () => {
        touching = true;
        userScroll();
      },
      true,
    );
    listen(
      window,
      "pointerup",
      () => {
        if (touching) {
          touching = false;
          userScroll();
        }
      },
      true,
    );
    listen(
      window,
      "pointercancel",
      () => {
        if (touching) {
          touching = false;
          userScroll();
        }
      },
      true,
    );
    listen(slider, "wheel", userScroll, true);
    listen(document, "visibilitychange", sync);
    listen(reduced, "change", sync);

    const resize =
      "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    resize?.observe(original);
    if (!resize) listen(window, "resize", measure, true);
    const intersection =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            inView = entries[0]?.isIntersecting ?? false;
            sync();
          })
        : null;
    intersection?.observe(slider);
    const mutation = new MutationObserver(sync);
    if (root)
      mutation.observe(root, {
        attributes: true,
        attributeFilter: ["data-motion"],
      });
    measure();
    sync();

    return () => {
      disposed = true;
      stop();
      clearTimeout(resumeTimer);
      listeners.forEach((remove) => remove());
      resize?.disconnect();
      intersection?.disconnect();
      mutation.disconnect();
    };
  }, []);

  const renderLogos = (duplicate: boolean) =>
    logos.map((logo) => (
      <a
        className="integration-logo-card"
        key={logo.slug}
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${logo.name} official website (opens in a new tab)`}
        tabIndex={duplicate ? -1 : undefined}
      >
        <span className={`integration-logo-art integration-logo--${logo.slug}`}>
          <img
            src={`/${logo.file}`}
            alt=""
            width="96"
            height="44"
            loading="lazy"
            decoding="async"
          />
        </span>
      </a>
    ));

  return (
    <section
      className="section integration-logo-band"
      aria-labelledby="integration-logos-title"
    >
      <div className="container">
        <div className="section-head center">
          <h2 id="integration-logos-title">
            Works with the tools you already use
          </h2>
          <p>
            Lead sources, calendars, payments, and daily work can connect to one
            organized system.
          </p>
        </div>
        <div
          className="integration-logo-slides"
          data-integration-slider
          ref={sliderRef}
          aria-labelledby="integration-logos-title"
        >
          <div
            className="integration-logo-row"
            data-logo-row
            role="group"
            aria-label="Integration logos. Scroll horizontally to explore."
            tabIndex={0}
          >
            <div className="integration-logo-track">
              <div className="integration-logo-group" data-logo-original>
                {renderLogos(false)}
              </div>
              <div
                className="integration-logo-group"
                data-logo-clone
                aria-hidden="true"
                hidden
              >
                {renderLogos(true)}
              </div>
            </div>
          </div>
        </div>
        <p className="integration-slide-hint">
          Swipe or scroll to explore. Motion pauses while you hover or focus
          here.
        </p>
        <div className="actions center">
          <Link className="btn btn-outline" to="/integrations">
            Explore integration options <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="integration-slide-note">
          Native, marketplace, and connector options. Account eligibility,
          setup, third-party subscriptions, and usage charges vary. Logos
          identify third-party tools; no endorsement is implied.
        </p>
      </div>
    </section>
  );
}
