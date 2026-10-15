import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

const BRAND_LOGO =
  "https://vibe.filesafe.space/1778597036474054298/assets/28bec8d6-0757-447c-b40e-79be9086e02b.png";

const nav = [
  { name: "Home", path: "/" },
  { name: "Sales Growth System", path: "/sales-growth-system" },
  { name: "VA Services", path: "/virtual-assistant-services" },
  {
    name: "Explore",
    submenu: [
      {
        group: "Solutions & services",
        links: [
          { name: "All Services", path: "/services" },
          { name: "CRM & Automation", path: "/crm-automation" },
          { name: "AI & Human Support", path: "/ai-automation" },
          { name: "Digital Solutions", path: "/digital-solutions" },
          { name: "Appointment Setting", path: "/appointment-setting" },
          { name: "Lead Follow-Up", path: "/lead-follow-up" },
          { name: "Integrations", path: "/integrations" },
        ],
      },
      {
        group: "Explore GMG",
        links: [
          { name: "Industries We Serve", path: "/industries" },
          { name: "How It Works", path: "/how-it-works" },
          { name: "Pricing & Support", path: "/pricing" },
          { name: "Portfolio", path: "/portfolio" },
          { name: "Guides & Resources", path: "/resources" },
          { name: "Frequently Asked Questions", path: "/faq" },
          { name: "Careers", path: "/careers" },
        ],
      },
    ],
  },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setExploreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-line py-2.5 shadow-[0_8px_30px_rgba(15,31,51,0.06)]"
          : "bg-white border-transparent py-4",
      )}
    >
      <div className="container-gmg flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Global Marketing Group home"
        >
          <img
            src={BRAND_LOGO}
            alt="Global Marketing Group"
            className="w-11 h-11 object-contain"
          />
          <span className="flex flex-col leading-[0.85] font-bold text-sm tracking-tight text-navy">
            <span className="text-[0.95rem]">GLOBAL</span>
            <span>MARKETING</span>
            <span>GROUP</span>
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Main navigation"
        >
          {nav.map((item) =>
            item.submenu ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold text-navy hover:text-teal-dark transition-colors py-2">
                  {item.name}{" "}
                  <Icon
                    name="chevron"
                    size={16}
                    className={cn(
                      "transition-transform duration-300",
                      exploreOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[480px] transition-all duration-200",
                    exploreOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-1",
                  )}
                >
                  <div className="grid grid-cols-2 gap-6 bg-white rounded-2xl border border-line shadow-[0_24px_60px_rgba(15,31,51,0.14)] p-6">
                    {item.submenu.map((col) => (
                      <div key={col.group}>
                        <span className="eyebrow text-[0.65rem]">
                          {col.group}
                        </span>
                        <div className="flex flex-col">
                          {col.links.map((l) => (
                            <Link
                              key={l.path}
                              to={l.path}
                              className="py-1.5 text-sm text-foreground/80 hover:text-teal-dark min-h-[36px] transition-colors"
                            >
                              {l.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative text-sm font-semibold transition-colors py-2 group",
                  location.pathname === item.path
                    ? "text-teal-dark"
                    : "text-navy hover:text-teal-dark",
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-teal transition-all duration-300",
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ),
          )}
          <Link to="/contact" className="btn-dark-gmg text-sm">
            Book a Strategy Call <Icon name="calendar" size={18} />
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 text-navy"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open navigation"
          aria-expanded={isOpen}
        >
          <Icon
            name={isOpen ? "plus" : "menu"}
            size={26}
            className={cn(
              "transition-transform duration-300",
              isOpen && "rotate-90",
            )}
          />
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[64px] bg-white z-40 overflow-y-auto transition-all duration-300",
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        )}
      >
        <nav className="flex flex-col gap-1 p-6">
          {nav.map((item) =>
            item.submenu ? (
              <div key={item.name} className="py-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  {item.name}
                </span>
                {item.submenu.map((col) => (
                  <div key={col.group} className="mt-3">
                    <span className="eyebrow text-[0.6rem]">{col.group}</span>
                    {col.links.map((l) => (
                      <Link
                        key={l.path}
                        to={l.path}
                        className="block py-2 text-base font-medium text-navy"
                      >
                        {l.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="py-3 text-lg font-semibold text-navy border-b border-line"
              >
                {item.name}
              </Link>
            ),
          )}
          <Link
            to="/contact"
            className="btn-dark-gmg mt-6 w-full justify-center"
          >
            Book a Strategy Call
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
