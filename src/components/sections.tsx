import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "./Icon";
import { useModalCTA } from "./modal/useModalCTA";

export const SectionHead: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
}> = ({ eyebrow, title, subtitle, center }) => (
  <div className={center ? "section-head is-center" : "section-head"}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2 className="section-title">{title}</h2>
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
  variant?: string;
}> = ({
  eyebrow,
  title,
  lead,
  note,
  primaryCta,
  secondaryCta,
  visual,
  simple,
}) => {
  return (
    <section className="page-hero-gmg page-hero-gmg--3d">
      <div className="container-gmg">
        <div
          className={`hero-page-layout${simple ? " is-compact" : ""}${visual ? "" : " is-text"}`}
        >
          <div className="hero-page-copy">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p className="lead-gmg mt-6">{lead}</p>
            {note && (
              <p className="mt-4 text-muted-foreground max-w-[60ch]">{note}</p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-9">
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
          {visual}
        </div>
      </div>
    </section>
  );
};

export const CTASection: React.FC<{
  eyebrow?: string;
  title: string;
  body: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
}> = ({
  eyebrow,
  title,
  body,
  primaryLabel = "Book your free growth audit",
  primaryTo = "/contact",
  secondaryLabel = "Or contact Global Marketing Group",
}) => {
  const { book, contact } = useModalCTA();
  return (
    <section className="cta-section pb-[var(--space-section)]">
      <div className="container-gmg">
        <div className="cta-banner-gmg">
          <div className="relative">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="max-w-[18ch]">{title}</h2>
            <p className="text-muted-foreground mt-4 max-w-[56ch]">{body}</p>
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
  const base = React.useId();
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button
            type="button"
            id={`${base}-q${i}`}
            onClick={() => setOpen(open === i ? null : i)}
            className="faq-trigger"
            aria-expanded={open === i}
            aria-controls={`${base}-a${i}`}
          >
            {item.q}
            <Icon name="plus" size={20} />
          </button>
          <div
            id={`${base}-a${i}`}
            className="faq-panel"
            style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            aria-hidden={open !== i}
          >
            <div>
              <p>{item.a}</p>
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
  <div className="rounded-[14px] border border-line bg-white p-6 space-y-4">
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
        ? "grid md:grid-cols-2 gap-5"
        : "grid md:grid-cols-2 lg:grid-cols-3 gap-5"
    }
  >
    {items.map((f, i) => (
      <article key={i} className="card-gmg">
        <span className="icon-box mb-5">
          <Icon name={f.icon || "check"} size={22} />
        </span>
        <h3 className="text-[1.1875rem] mb-2">{f.title}</h3>
        <p className="text-muted-foreground">{f.body}</p>
      </article>
    ))}
  </div>
);

export function Hero3DLayout({
  children,
}: {
  children: React.ReactNode;
  variant?: string;
}) {
  return (
    <div className="hero-page-layout is-text">
      <div className="hero-page-copy">{children}</div>
    </div>
  );
}
