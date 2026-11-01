import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "./Icon";
import { useModalCTA } from "./modal/useModalCTA";

type MenuItem = {
  label: string;
  to: string;
  blurb?: string;
  icon?:
    | "database"
    | "users"
    | "headset"
    | "calendar"
    | "workflow"
    | "monitor"
    | "cpu"
    | "book"
    | "globe";
};

const solutions: MenuItem[] = [
  {
    label: "Sales Growth System",
    to: "/sales-growth-system",
    blurb: "Capture, nurture & convert leads",
    icon: "database",
  },
  {
    label: "Virtual Assistant Services",
    to: "/virtual-assistant-services",
    blurb: "Trained Philippines-based support",
    icon: "headset",
  },
  {
    label: "CRM & Automation",
    to: "/crm-automation",
    blurb: "One organized system",
    icon: "workflow",
  },
  {
    label: "AI & Human Support",
    to: "/ai-automation",
    blurb: "AI conversations + real people",
    icon: "cpu",
  },
  {
    label: "Appointment Setting",
    to: "/appointment-setting",
    blurb: "More booked, fewer no-shows",
    icon: "calendar",
  },
  {
    label: "Lead Follow-Up",
    to: "/lead-follow-up",
    blurb: "Consistent, connected follow-up",
    icon: "monitor",
  },
  {
    label: "Digital Solutions",
    to: "/digital-solutions",
    blurb: "Sites, funnels & landing pages",
    icon: "globe",
  },
  {
    label: "All services",
    to: "/services",
    blurb: "See the full offering",
    icon: "book",
  },
];

const resources: MenuItem[] = [
  {
    label: "Guides & Resources",
    to: "/resources",
    blurb: "Learn how we work",
    icon: "book",
  },
  {
    label: "Missed Revenue Calculator",
    to: "/missed-revenue-calculator",
    blurb: "Find hidden opportunity",
    icon: "workflow",
  },
  {
    label: "Industries",
    to: "/industries",
    blurb: "Who we help",
    icon: "globe",
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    blurb: "Real client work",
    icon: "monitor",
  },
  { label: "FAQ", to: "/faq", blurb: "Answers before you ask", icon: "users" },
  { label: "About GMG", to: "/about", blurb: "Our story", icon: "users" },
  { label: "Careers", to: "/careers", blurb: "Join the team", icon: "headset" },
  {
    label: "Contact",
    to: "/contact",
    blurb: "Talk with our team",
    icon: "calendar",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const { book } = useModalCTA();

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    ref.current?.querySelectorAll("details").forEach((d) => (d.open = false));
  }, [pathname]);

  useEffect(() => {
    const close = (e: Event) => {
      const target = e.target as Element;
      if (!ref.current?.contains(target)) {
        setActiveMenu(null);
        setOpen(false);
      }
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  const links = (items: MenuItem[]) =>
    items.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        aria-current={pathname === item.to ? "page" : undefined}
        className="gmg-mega-item"
      >
        {item.icon && (
          <span className="gmg-mega-item-icon">
            <Icon name={item.icon} size={20} />
          </span>
        )}
        <span className="gmg-mega-item-text">
          <strong>{item.label}</strong>
          {item.blurb && <small>{item.blurb}</small>}
        </span>
        <Icon name="arrow" size={16} className="gmg-mega-item-arrow" />
      </Link>
    ));

  const renderMega = (id: string, items: MenuItem[], label: string) => (
    <div
      className={`gmg-mega ${activeMenu === id ? "is-open" : ""}`}
      aria-hidden={activeMenu !== id}
    >
      <div className="gmg-mega-inner container-gmg">
        <div className="gmg-mega-grid">{links(items)}</div>
        <aside className="gmg-mega-feature">
          <span className="eyebrow">{label}</span>
          <p>
            One connected system. One dedicated team. Built around how your
            business actually works — so leads, follow-up, and support stop
            falling through the cracks.
          </p>
          <button
            type="button"
            className="btn-primary-gmg"
            onClick={() => {
              setActiveMenu(null);
              book({ subject: "Free growth audit" })();
            }}
          >
            Free growth audit <Icon name="arrow" size={16} />
          </button>
        </aside>
      </div>
    </div>
  );

  return (
    <header
      className="gmg-header"
      ref={ref}
      data-menu={activeMenu ?? undefined}
    >
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
          <button
            type="button"
            className="gmg-nav-link gmg-nav-trigger"
            aria-expanded={activeMenu === "solutions"}
            onClick={() =>
              setActiveMenu(activeMenu === "solutions" ? null : "solutions")
            }
            onMouseEnter={() => setActiveMenu("solutions")}
          >
            Solutions <Icon name="chevron" size={14} />
          </button>
          {links([
            { label: "How it works", to: "/how-it-works" },
            { label: "Pricing", to: "/pricing" },
            { label: "Integrations", to: "/integrations" },
          ])}
          <button
            type="button"
            className="gmg-nav-link gmg-nav-trigger"
            aria-expanded={activeMenu === "resources"}
            onClick={() =>
              setActiveMenu(activeMenu === "resources" ? null : "resources")
            }
            onMouseEnter={() => setActiveMenu("resources")}
          >
            Resources <Icon name="chevron" size={14} />
          </button>
          <button
            type="button"
            className="btn-primary-gmg gmg-nav-cta"
            onClick={book({ subject: "Free growth audit" })}
          >
            Free growth audit <Icon name="arrow" size={16} />
          </button>
        </nav>
      </div>

      {renderMega("solutions", solutions, "Solutions")}
      {renderMega("resources", resources, "Resources")}
    </header>
  );
}
