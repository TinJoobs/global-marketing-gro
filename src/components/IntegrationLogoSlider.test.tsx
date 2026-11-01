// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import IntegrationLogoSlider from "./IntegrationLogoSlider";
import { readFileSync } from "node:fs";
const sliderCss = readFileSync(
  `${process.cwd()}/src/integration-logos.css`,
  "utf8",
);

describe("IntegrationLogoSlider", () => {
  let host: HTMLDivElement;
  let root: Root;
  let reduced: MediaQueryList;
  let frames: Map<number, FrameRequestCallback>;
  let frameId: number;
  let intersection: IntersectionObserverCallback;
  let style: HTMLStyleElement;

  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    host = document.createElement("div");
    host.id = "gmg-site";
    host.dataset.motion = "on";
    document.body.append(host);
    root = createRoot(host);
    style = document.createElement("style");
    style.textContent = sliderCss;
    document.head.append(style);
    reduced = Object.assign(new EventTarget(), {
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
    }) as MediaQueryList;
    vi.stubGlobal("matchMedia", () => reduced);
    frames = new Map();
    frameId = 0;
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frames.set(++frameId, callback);
      return frameId;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersection = callback;
        }
        observe() {
          intersection(
            [{ isIntersecting: true } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          );
        }
        disconnect() {}
      },
    );
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      width: 2064,
    } as DOMRect);
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
    style.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  function render() {
    act(() =>
      root.render(
        <MemoryRouter>
          <IntegrationLogoSlider />
        </MemoryRouter>,
      ),
    );
  }

  function advance(time: number) {
    const pending = [...frames.values()];
    frames.clear();
    act(() => pending.forEach((callback) => callback(time)));
  }

  it("shows all 12 official brand links in one row with artwork and no visible text cards", () => {
    render();
    const original = host.querySelector("[data-logo-original]")!;
    expect(original).not.toBeNull();
    const links = [...original.querySelectorAll("a")];
    expect(host.querySelectorAll("[data-logo-row]")).toHaveLength(1);
    expect(links).toHaveLength(12);
    expect(getComputedStyle(original).flexWrap).toBe("nowrap");
    expect(links.map((link) => link.getAttribute("aria-label"))).toEqual([
      "Facebook Lead Ads official website (opens in a new tab)",
      "Instagram official website (opens in a new tab)",
      "Gmail official website (opens in a new tab)",
      "Google Calendar official website (opens in a new tab)",
      "Stripe official website (opens in a new tab)",
      "PayPal official website (opens in a new tab)",
      "Shopify official website (opens in a new tab)",
      "Zapier official website (opens in a new tab)",
      "Outlook Email official website (opens in a new tab)",
      "Zoom official website (opens in a new tab)",
      "QuickBooks official website (opens in a new tab)",
      "Make official website (opens in a new tab)",
    ]);
    links.forEach((link) => {
      expect(link.textContent).toBe("");
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      expect(link.querySelector("img")?.getAttribute("width")).toBe("96");
      expect(link.querySelector("img")?.getAttribute("height")).toBe("44");
      expect(getComputedStyle(link).borderTopWidth).toBe("0px");
      expect(getComputedStyle(link).backgroundColor).toBe("rgba(0, 0, 0, 0)");
      expect(getComputedStyle(link.querySelector("img")!).objectFit).toBe(
        "contain",
      );
    });
    const clone = host.querySelector("[data-logo-clone]")!;
    expect(clone.getAttribute("aria-hidden")).toBe("true");
    expect(
      [...clone.querySelectorAll("a")].every((link) => link.tabIndex === -1),
    ).toBe(true);
    expect(
      host.querySelector('a[href="/integrations"]')?.textContent,
    ).toContain("Explore integration options");
  });

  it("keeps reduced-motion logos manually scrollable without automatic movement", () => {
    Object.assign(reduced, { matches: true });
    render();
    const row = host.querySelector<HTMLElement>("[data-logo-row]")!;
    expect(row).not.toBeNull();
    row.scrollLeft = 240;
    advance(1000);
    advance(1040);
    expect(row.scrollLeft).toBe(240);
    expect(host.querySelector<HTMLElement>("[data-logo-clone]")!.hidden).toBe(
      true,
    );
    expect(
      getComputedStyle(host.querySelector<HTMLElement>("[data-logo-clone]")!)
        .display,
    ).toBe("none");
    expect(frames.size).toBe(0);
  });

  it("moves at 22 pixels per second and pauses on hover and focus", () => {
    render();
    const row = host.querySelector<HTMLElement>("[data-logo-row]")!;
    const slider = host.querySelector<HTMLElement>(
      "[data-integration-slider]",
    )!;
    expect(row).not.toBeNull();
    advance(1000);
    advance(1040);
    expect(row.scrollLeft).toBeCloseTo(0.88);
    slider.dispatchEvent(new MouseEvent("mouseenter"));
    advance(1080);
    expect(row.scrollLeft).toBeCloseTo(0.88);
    slider.dispatchEvent(new MouseEvent("mouseleave"));
    act(() => row.focus());
    advance(1120);
    expect(row.scrollLeft).toBeCloseTo(0.88);
  });

  it("preserves reduced-motion native scroll after wheel interaction and its resume delay", () => {
    vi.useFakeTimers();
    Object.assign(reduced, { matches: true });
    render();
    const row = host.querySelector<HTMLElement>("[data-logo-row]")!;
    const slider = host.querySelector<HTMLElement>(
      "[data-integration-slider]",
    )!;
    row.scrollLeft = 650;
    slider.dispatchEvent(new WheelEvent("wheel", { deltaX: 120 }));
    act(() => vi.advanceTimersByTime(2700));
    expect(row.scrollLeft).toBe(650);
    expect(frames.size).toBe(0);
  });

  it("stops offscreen, resumes from native scroll, and cancels its loop on unmount", () => {
    render();
    const row = host.querySelector<HTMLElement>("[data-logo-row]")!;
    advance(1000);
    advance(1040);
    intersection(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    row.scrollLeft = 300;
    advance(1080);
    expect(row.scrollLeft).toBe(300);
    intersection(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    advance(1120);
    advance(1160);
    expect(row.scrollLeft).toBeCloseTo(300.88);
    act(() => root.unmount());
    expect(frames.size).toBe(0);
    root = createRoot(host);
  });
});
