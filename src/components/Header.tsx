import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "./Icon";
import { useModalCTA } from "./modal/useModalCTA";

const solutions = [
  ["Sales Growth System", "/sales-growth-system"],
  ["Virtual Assistant Services", "/virtual-assistant-services"],
  ["All services", "/services"],
  ["CRM & Automation", "/crm-automation"],
  ["AI & Human Support", "/ai-automation"],
  ["Lead Follow-Up", "/lead-follow-up"],
];
const resources = [
  ["Guides & Resources", "/resources"],
  ["Missed Revenue Calculator", "/missed-revenue-calculator"],
  ["Industries", "/industries"],
  ["Portfolio", "/portfolio"],
  ["FAQ", "/faq"],
  ["About GMG", "/about"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigationFocus = useRef<Element | null>(null);
  const { pathname } = useLocation();
  const { book } = useModalCTA();
  useEffect(() => {
    setOpen(false);
    ref.current?.querySelectorAll("details").forEach((d) => (d.open = false));
  }, [pathname]);
  useEffect(() => {
    const close = (e: Event) => {
      const target = e.target as Element;
      ref.current?.querySelectorAll("details[open]").forEach((d) => {
        if (!d.contains(target)) (d as HTMLDetailsElement).open = false;
      });
      if (e.type === "focusin")
        navigationFocus.current = target.closest("nav") ? target : null;
      if (e.type === "pointerdown" && !ref.current?.contains(target))
        navigationFocus.current = null;
      if (!ref.current?.contains(target)) {
        setOpen(false);
        ref.current
          ?.querySelectorAll("details")
          .forEach((d) => (d.open = false));
      }
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const disclosure =
          ref.current?.querySelector<HTMLDetailsElement>("details[open]");
        if (disclosure) {
          disclosure.open = false;
          disclosure.querySelector("summary")?.focus();
        } else {
          setOpen(false);
          toggle.current?.focus();
        }
      }
    };
    const media = matchMedia("(min-width:1201px)");
    const resize = () => {
      const focused =
        document.activeElement === document.body
          ? navigationFocus.current
          : document.activeElement;
      const disclosure = focused?.closest("details");
      const inNav = focused?.closest("nav");
      setOpen(false);
      ref.current?.querySelectorAll("details").forEach((d) => (d.open = false));
      if (!media.matches && inNav) toggle.current?.focus();
      else if (media.matches && disclosure)
        disclosure.querySelector("summary")?.focus();
      else if (media.matches && focused === toggle.current)
        ref.current?.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("focusin", close);
    document.addEventListener("keydown", escape);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("focusin", close);
      document.removeEventListener("keydown", escape);
      media.removeEventListener("change", resize);
    };
  }, []);
  const links = (items: string[][]) =>
    items.map(([label, to]) => (
      <Link
        key={to}
        to={to}
        aria-current={pathname === to ? "page" : undefined}
      >
        {label}
      </Link>
    ));
  return (
    <header className="gmg-header" ref={ref}>
      <div className="container-gmg gmg-header-inner">
        <Link
          className="gmg-brand"
          to="/"
          aria-label="Global Marketing Group home"
        >
          <img
            src="/assets/images/gmg-headset-logo.webp"
            alt=""
            width="76"
            height="76"
          />
          <span>
            GLOBAL
            <br />
            MARKETING GROUP<small>SYSTEMS. PEOPLE. GROWTH.</small>
          </span>
        </Link>
        <button
          ref={toggle}
          className="gmg-menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="gmg-nav"
          onClick={() => setOpen(!open)}
        >
          <Icon name="menu" />
        </button>
        <nav
          id="gmg-nav"
          className={open ? "is-open" : ""}
          aria-label="Main navigation"
        >
          <details>
            <summary>
              Solutions <Icon name="chevron" size={14} />
            </summary>
            <div className="gmg-dropdown">{links(solutions)}</div>
          </details>
          {links([
            ["How it works", "/how-it-works"],
            ["Pricing", "/pricing"],
            ["Integrations", "/integrations"],
          ])}
          <details>
            <summary>
              Resources <Icon name="chevron" size={14} />
            </summary>
            <div className="gmg-dropdown">{links(resources)}</div>
          </details>
          <button type="button" className="btn-primary-gmg" onClick={book()}>
            Free growth audit <Icon name="arrow" size={16} />
          </button>
        </nav>
      </div>
    </header>
  );
}
