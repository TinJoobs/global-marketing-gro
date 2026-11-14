import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const steps: {
  icon: IconName;
  title: string;
  body: string;
  image: string;
  alt: string;
}[] = [
  {
    icon: "calendar",
    title: "Book a strategy call",
    body: "We start with a discovery conversation to understand your goals, challenges, workload, and current processes.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/fdd044f4-a4e0-473b-a9f3-147037bd9891.png",
    alt: "A discovery strategy call held over a laptop in a modern office",
  },
  {
    icon: "settings",
    title: "Choose your solution",
    body: "We recommend the right combination of CRM automation, AI tools, and Virtual Assistant support for your business.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/3acbc60c-a7a1-4c56-8361-ce2d509218ab.png",
    alt: "A consultant presenting solution options on a tablet during a planning session",
  },
  {
    icon: "rocket",
    title: "Launch your assistant & automation",
    body: "We set up your system, build your workflows, and match you with the right Virtual Assistant.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/51290e11-f28f-41ea-82ac-42709fb9763e.png",
    alt: "A modern workspace with a CRM automation dashboard on a laptop",
  },
  {
    icon: "growth",
    title: "Scale with ongoing support",
    body: "We coordinate onboarding, communication, task management, and performance reporting as you grow.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/73a801a9-37b2-408b-8a32-208574d863f1.png",
    alt: "A growing team collaborating and reviewing progress together",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <PageHero
        variant="how"
        eyebrow="How it works"
        title={<>A clearer path from inquiry to opportunity</>}
        lead="Four simple steps to put the right technology, processes, and people in place so your business can respond faster and convert more."
        primaryCta={{ label: "Book a free strategy call", to: "/contact" }}
        secondaryCta={{
          label: "See the Sales Growth System",
          to: "/sales-growth-system",
        }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="The process"
            title="From first call to ongoing growth."
            subtitle="A structured approach that connects strategy, systems, and support."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <article key={s.title} className="card-gmg step-card">
                <div className="step-media">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <span className="step-badge" aria-hidden="true">
                    {i + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-5 mb-3">
                  <span className="icon-box">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="text-2xl font-bold text-line/70">
                    {s.title.charAt(0).toUpperCase() === s.title.charAt(0)
                      ? ""
                      : ""}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-gmg pale-bg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Why this works"
            title="More than software. More than staffing."
            subtitle="We connect your strategy, systems, and support team into one coordinated growth engine."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "database" as IconName,
                title: "Customized support",
                body: "We begin with discovery to understand your goals and current processes.",
              },
              {
                icon: "users" as IconName,
                title: "The right match",
                body: "We match you with a Virtual Assistant whose skills align with your work.",
              },
              {
                icon: "refresh" as IconName,
                title: "Ongoing coordination",
                body: "We support onboarding, communication, and performance reporting.",
              },
            ].map((c) => (
              <article key={c.title} className="card-gmg">
                <span className="icon-box mb-5">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="text-base font-bold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Ready to put the right system in place?"
        body="Book a free strategy call and we'll help you map out the right combination of automation and support."
      />
      <style>{`
        .step-card { padding: 0; overflow: hidden; }
        .step-media {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--c-harbor);
        }
        .step-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
        }
        .step-card:hover .step-media img { transform: scale(1.05); }
        .step-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          min-width: 28px;
          height: 28px;
          padding: 0 8px;
          border-radius: 999px;
          background: var(--c-harbor);
          color: var(--c-mint);
          font-size: 0.8125rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px -8px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(142, 227, 214, 0.35);
        }
        .step-card .icon-box { margin-bottom: 0; }
        .step-card h3,
        .step-card p { padding-inline: 1.25rem; }
        .step-card .icon-box { margin-inline-start: 1.25rem; margin-top: 1.25rem; }
        .step-card p { padding-bottom: 1.25rem; }
      `}</style>
    </div>
  );
}
