import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon, type IconName } from "./Icon";
import { useModalCTA } from "./modal/useModalCTA";

type MenuItem = { label: string; to: string; blurb?: string; icon?: IconName };
type MenuGroup = { title: string; items: MenuItem[] };
type Menu = {
  id: "solutions" | "resources";
  label: string;
  groups: MenuGroup[];
  footer: MenuItem;
  feature: { eyebrow: string; title: string; body: string; link: MenuItem };
};

const menus: Menu[] = [
  {
    id: "solutions",
    label: "Solutions",
    groups: [
      {
        title: "Systems",
        items: [
          { label: "Sales Growth System", to: "/sales-growth-system", blurb: "Capture, nurture and convert leads", icon: "database" },
          { label: "CRM & Automation", to: "/crm-automation", blurb: "One organized system", icon: "workflow" },
          { label: "AI & Human Support", to: "/ai-automation", blurb: "AI conversations plus real people", icon: "cpu" },
          { label: "Digital Solutions", to: "/digital-solutions", blurb: "Sites, funnels and landing pages", icon: "globe" },
        ],
      },
      {
        title: "Services",
        items: [
          { label: "Virtual Assistant Services", to: "/virtual-assistant-services", blurb: "Trained Philippines-based support", icon: "headset" },
          { label: "Appointment Setting", to: "/appointment-setting", blurb: "More booked, fewer no-shows", icon: "calendar" },
          { label: "Lead Follow-Up", to: "/lead-follow-up", blurb: "Consistent, connected follow-up", icon: "message" },
        ],
      },
    ],
    footer: { label: "See all services", to: "/services" },
    feature: {
      eyebrow: "Pricing",
      title: "Plans from $597/month",
      body: "Start with automation, or add a dedicated assistant. Three clear plans.",
      link: { label: "Compare plans", to: "/pricing" },
    },
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      {
        title: "Learn",
        items: [
          { label: "Guides & Resources", to: "/resources", blurb: "How we work", icon: "book" },
          { label: "Missed Revenue Calculator", to: "/missed-revenue-calculator", blurb: "Find hidden opportunity", icon: "chart" },
          { label: "Industries", to: "/industries", blurb: "Who we help", icon: "building" },
          { label: "Portfolio", to: "/portfolio", blurb: "Real client work", icon: "monitor" },
          { label: "FAQ", to: "/faq", blurb: "Answers before you ask", icon: "message" },
        ],
      },
      {
        title: "Company",
        items: [
          { label: "About GMG", to: "/about", blurb: "Our story", icon: "users" },
          { label: "Careers", to: "/careers", blurb: "Join the team", icon: "briefcase" },
          { label: "Contact", to: "/contact", blurb: "Talk with our team", icon: "mail" },
        ],
      },
    ],
    footer: { label: "Browse all guides", to: "/resources" },
    feature: {
      eyebrow: "Free planner",
      title: "Know what to delegate",
      body: "A step-by-step checklist for handing work to a Virtual Assistant.",
      link: { label: "Open the planner", to: "/guide-va-delegation" },
    },
  },
];

const inlineLinks: MenuItem[] = [
  { label: "How it works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "Integrations", to: "/integrations" },
];

const WIDE = "(min-width: 1201px)";

const isOpen = (el: Element) => {
  try {
    return el.matches(":popover-open");
  } catch {
    return el.classList.contains(":popover-open");
  }
};

const hide = (el: Element | null) => {
  if (el && isOpen(el)) (el as HTMLElement & { hidePopover?: () => void }).hidePopover?.();
};

export default function Header() {
  const { pathname } = useLocation();
  const { book } = useModalCTA();
  const list = useRef<HTMLUListElement>(null);
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(WIDE).matches,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<Menu["id"] | null>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(WIDE);
    const update = () => setWide(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const nav = list.current;
    if (!nav) return;
    hide(nav);
    nav.querySelectorAll(".gmg-mega").forEach(hide);
    setMenuOpen(false);
    setOpenSub(null);
    if (wide) nav.removeAttribute("popover");
    else nav.setAttribute("popover", "auto");
    menus.forEach((menu) => {
      const panel = document.getElementById(`gmg-menu-${menu.id}`);
      const trigger = nav.querySelector(`[data-menu-trigger="${menu.id}"]`);
      if (!panel || !trigger) return;
      if (wide) {
        panel.setAttribute("popover", "auto");
        trigger.setAttribute("popovertarget", panel.id);
      } else {
        panel.removeAttribute("popover");
        trigger.removeAttribute("popovertarget");
      }
    });
  }, [wide]);

  useEffect(() => {
    const nav = list.current;
    if (!nav) return;
    const onToggle = (event: Event) => {
      const target = event.target as HTMLElement;
      const open = (event as ToggleEvent).newState === "open";
      if (target === nav) {
        setMenuOpen(open);
        if (!open) setOpenSub(null);
        return;
      }
      const id = target.dataset.menu as Menu["id"] | undefined;
      if (!id) return;
      setOpenSub((current) => (open ? id : current === id ? null : current));
    };
    nav.addEventListener("toggle", onToggle, true);
    return () => nav.removeEventListener("toggle", onToggle, true);
  }, []);

  useEffect(() => {
    const nav = list.current;
    hide(nav);
    nav?.querySelectorAll(".gmg-mega").forEach(hide);
    setOpenSub(null);
  }, [pathname]);

  const closeAll = () => {
    const nav = list.current;
    nav?.querySelectorAll(".gmg-mega").forEach(hide);
    hide(nav);
  };

  return (
    <header className="gmg-header" data-layout={wide ? "wide" : "narrow"}>
      <div className="container-gmg gmg-header-inner">
        <Link className="gmg-brand" to="/" aria-label="Global Marketing Group home">
          <img src="/assets/images/gmg-headset-logo.webp" alt="" width="52" height="52" />
          <span>
            Global
            <br />
            Marketing Group<small>Systems. People. Growth.</small>
          </span>
        </Link>

        <nav id="gmg-nav" aria-label="Main navigation">
          <button
            type="button"
            className="gmg-menu-toggle"
            aria-controls="gmg-nav-list"
            aria-expanded={menuOpen}
            {...({ popovertarget: "gmg-nav-list" } as Record<string, string>)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={20} />
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>

          <ul id="gmg-nav-list" className="gmg-nav-list" ref={list}>
            {menus.slice(0, 1).map((menu) => (
              <MegaItem
                key={menu.id}
                menu={menu}
                wide={wide}
                open={openSub === menu.id}
                pathname={pathname}
                onToggle={() => setOpenSub(openSub === menu.id ? null : menu.id)}
                onNavigate={closeAll}
              />
            ))}
            {inlineLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="gmg-nav-link"
                  aria-current={pathname === item.to ? "page" : undefined}
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {menus.slice(1).map((menu) => (
              <MegaItem
                key={menu.id}
                menu={menu}
                wide={wide}
                open={openSub === menu.id}
                pathname={pathname}
                onToggle={() => setOpenSub(openSub === menu.id ? null : menu.id)}
                onNavigate={closeAll}
              />
            ))}
            <li className="gmg-nav-cta-item">
              <button
                type="button"
                className="btn-primary-gmg gmg-nav-cta"
                onClick={() => {
                  closeAll();
                  book({ subject: "Free growth audit" })();
                }}
              >
                Free growth audit <Icon name="arrow" size={16} />
              </button>
              <p className="gmg-nav-contact">
                Or email <a href="mailto:garyb@glomarkgroup.com">garyb@glomarkgroup.com</a>
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function MegaItem({
  menu,
  wide,
  open,
  pathname,
  onToggle,
  onNavigate,
}: {
  menu: Menu;
  wide: boolean;
  open: boolean;
  pathname: string;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = `gmg-menu-${menu.id}`;
  const active = menu.groups.some((g) => g.items.some((i) => i.to === pathname));
  return (
    <li className="gmg-nav-group">
      <button
        type="button"
        className="gmg-nav-link gmg-nav-trigger"
        data-menu-trigger={menu.id}
        data-active={active ? "true" : undefined}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={wide ? undefined : onToggle}
      >
        {menu.label}
        <Icon name="chevron" size={14} />
      </button>
      <div className="gmg-mega" id={panelId} data-menu={menu.id} hidden={!wide && !open}>
        <div className="gmg-mega-inner container-gmg">
          {menu.groups.map((group) => (
            <section className="gmg-mega-group" key={group.title} aria-label={group.title}>
              <h2 className="gmg-mega-heading">{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="gmg-mega-item"
                      aria-current={pathname === item.to ? "page" : undefined}
                      onClick={onNavigate}
                    >
                      {item.icon && (
                        <span className="gmg-mega-item-icon" aria-hidden="true">
                          <Icon name={item.icon} size={18} />
                        </span>
                      )}
                      <span className="gmg-mega-item-text">
                        <strong>{item.label}</strong>
                        {item.blurb && <small>{item.blurb}</small>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <aside className="gmg-mega-feature">
            <span className="gmg-mega-feature-eyebrow">{menu.feature.eyebrow}</span>
            <strong>{menu.feature.title}</strong>
            <p>{menu.feature.body}</p>
            <Link className="text-link" to={menu.feature.link.to} onClick={onNavigate}>
              {menu.feature.link.label} <Icon name="arrow" size={16} />
            </Link>
          </aside>
          <div className="gmg-mega-foot">
            <Link to={menu.footer.to} onClick={onNavigate}>
              {menu.footer.label} <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
