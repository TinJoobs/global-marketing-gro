import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon, type IconName } from "./Icon";
import { useModalCTA } from "./modal/useModalCTA";
import { Hero3DScene, type Hero3DVariant } from "./hero3d/Hero3DScene";
import "./hero3d/hero3d.css";
import { pageHeroVariants } from "./hero3d/heroScenes";

export const SectionHead: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
}> = ({ eyebrow, title, subtitle, center }) => (
  <div
    className={
      center
        ? "text-center max-w-3xl mx-auto mb-16 reveal"
        : "max-w-2xl mb-12 reveal"
    }
  >
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2 className="text-3xl md:text-[2.65rem] font-bold leading-[1.1]">
      {title}
    </h2>
    {subtitle && <p className="lead-gmg mt-5">{subtitle}</p>}
  </div>
);

export const PageHero: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  note?: React.ReactNode;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  visual?: React.ReactNode;
  simple?: boolean;
  /** Themed 3D object rendered in the hero's visual slot. */
  variant?: Hero3DVariant;
}> = ({
  eyebrow,
  title,
  lead,
  note,
  primaryCta,
  secondaryCta,
  visual,
  simple,
  variant,
}) => {
 const {pathname}=useLocation();
 const sceneVariant=variant ?? pageHeroVariants[pathname] ?? 'generic';
 return <section className="page-hero-gmg page-hero-gmg--3d">
    <div className="container-gmg">
      <div
        className={`hero-page-layout ${simple ? "is-compact" : ""}`}
      >
        <div className="hero-page-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="text-4xl md:text-[3.8rem] font-bold leading-[1.08]">
            {title}
          </h1>
          <p className="lead-gmg mt-7 max-w-[610px]">{lead}</p>
          {note && (
            <p className="mt-5 text-muted-foreground max-w-[610px]">{note}</p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-4 mt-10">
              {primaryCta && (
                <Link to={primaryCta.to} className="btn-primary-gmg">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCta.to} className="text-link">
                  {secondaryCta.label}
                  <Icon name="arrow" size={18} />
                </Link>
              )}
            </div>
          )}
        </div>
        {visual ?? <Hero3DScene variant={sceneVariant}/>}
      </div>
    </div>
  </section>;
};

export const CTASection: React.FC<{
  eyebrow?: string;
  title: string;
  body: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
}> = ({
  eyebrow = "Your next step",
  title,
  body,
  primaryLabel = "Book your free growth audit",
  primaryTo = "/contact",
  secondaryLabel = "Or contact Global Marketing Group",
}) => {
  const { book, contact } = useModalCTA();
  return (
    <section className="py-20 md:py-24">
      <div className="container-gmg">
        <div className="cta-banner-gmg reveal">
          <div className="relative">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="text-2xl md:text-[2rem] font-bold max-w-[660px]">
              {title}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-[680px]">{body}</p>
          </div>
          <div className="flex flex-col gap-3 relative">
            {primaryTo ? (
              <Link
                to={primaryTo}
                className="btn-primary-gmg whitespace-nowrap"
              >
                {primaryLabel}
              </Link>
            ) : (
              <button
                type="button"
                className="btn-primary-gmg whitespace-nowrap"
                onClick={book()}
              >
                {primaryLabel}
              </button>
            )}
            <button
              type="button"
              onClick={contact()}
              className="text-xs text-center text-muted-foreground hover:text-teal-dark"
            >
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQList: React.FC<{ items: { q: string; a: string }[] }> = ({
  items,
}) => {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-line bg-white overflow-hidden transition-colors hover:border-teal/30"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 text-left p-5 font-semibold text-navy"
            aria-expanded={open === i}
          >
            {item.q}
            <Icon
              name="plus"
              size={18}
              className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-45 text-teal" : ""}`}
            />
          </button>
          <div
            className="grid transition-all duration-300 ease-out"
            style={{
              gridTemplateRows: open === i ? "1fr" : "0fr",
            }}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const FlowBoard: React.FC<{
  rows: { title: string; sub: string; icon?: IconName }[];
}> = ({ rows }) => (
  <div className="rounded-2xl border border-line bg-white p-6 space-y-4 shadow-sm">
    {rows.map((r, i) => (
      <div key={i} className="flex items-center gap-4">
        <span className="icon-box">
          <Icon name={r.icon || "check"} size={22} />
        </span>
        <div>
          <strong className="text-navy block">{r.title}</strong>
          <span className="text-sm text-muted-foreground">{r.sub}</span>
        </div>
      </div>
    ))}
  </div>
);

export const FeatureGrid: React.FC<{
  items: {
    title: string;
    body: string;
    icon?: IconName;
    tone?: "" | "blue" | "purple";
  }[];
  cols?: 2 | 3;
}> = ({ items, cols = 3 }) => (
  <div
    className={
      cols === 2
        ? "grid md:grid-cols-2 gap-6"
        : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    }
  >
    {items.map((f, i) => (
      <article key={i} className="card-gmg reveal">
        <span className={`icon-box ${f.tone || ""} mb-5`}>
          <Icon name={f.icon || "check"} size={24} />
        </span>
        <h3 className="text-lg font-bold mb-2">{f.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{f.body}</p>
      </article>
    ))}
  </div>
);
