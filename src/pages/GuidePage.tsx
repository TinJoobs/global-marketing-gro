import { Hero3DLayout } from "@/components/sections";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Printer, RotateCcw } from "lucide-react";
import { guides } from "@/data/guides";

const noMotion = { transition: "none", transform: "none", animation: "none" };

export default function GuidePage({ slug }: { slug: string }) {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide)
    return (
      <section className="section-gmg">
        <div className="container-gmg">
          <h1 className="text-3xl font-bold">Guide not found</h1>
          <Link to="/resources" className="text-link">
            Explore our resources
          </Link>
        </div>
      </section>
    );
  return <GuideChecklist key={guide.slug} guide={guide} />;
}

function GuideChecklist({ guide }: { guide: (typeof guides)[number] }) {
  const guideScene:Record<string,string>={"guide-va-delegation":"guide-va","guide-lead-follow-up":"guide-lead","guide-crm-readiness":"guide-crm"};
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  return (
    <div>
      <section className="page-hero-gmg">
        <div className="container-gmg">
          <Hero3DLayout variant={guideScene[guide.slug] ?? "resources"}>
          <span className="eyebrow">{guide.name}</span>
          <h1 className="text-4xl md:text-[3.5rem] font-bold max-w-4xl">
            {guide.title}
          </h1>
          <p className="lead-gmg mt-6 max-w-3xl">{guide.intro}</p>
          <div className="flex flex-wrap items-center gap-5 mt-8 print:hidden">
            <Link
              to="/book-a-call?service=strategy"
              className="btn-primary-gmg"
              style={noMotion}
            >
              Book a Free Strategy Call
            </Link>
            <Link to="/services" className="text-link" style={noMotion}>
              Explore our services
            </Link>
          </div>
        </Hero3DLayout>
        </div>
      </section>
      <section className="section-gmg">
        <div className="container-gmg grid lg:grid-cols-[250px_minmax(0,1fr)] gap-10 lg:gap-16 print:block">
          <aside className="print:hidden">
            <nav
              aria-label="Inside this guide"
              className="guide-navigation lg:sticky lg:top-28"
            >
              <span className="eyebrow">Inside this guide</span>
              <ol className="space-y-3">
                {guide.sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      className="block py-2 text-sm text-muted-foreground hover:text-primary"
                      href={`#step-${index + 1}`}
                    >
                      {String(index + 1).padStart(2, "0")} &nbsp;{" "}
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
              <Link to="/resources" className="text-link mt-6 text-sm">
                All resources
              </Link>
            </nav>
          </aside>
          <article className="min-w-0 max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6 print:hidden">
              <button
                type="button"
                className="btn-primary-gmg"
                style={noMotion}
                onClick={() => window.print()}
              >
                <Printer aria-hidden="true" size={18} /> Print this guide
              </button>
              <button
                type="button"
                className="btn-outline-gmg"
                style={noMotion}
                onClick={() => setChecked({})}
              >
                <RotateCcw aria-hidden="true" size={18} /> Reset checklist
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-10">
              Check off the items you have reviewed. These selections stay on
              this page only and are not sent to Global Marketing Group.
            </p>
            <div className="space-y-10">
              {guide.sections.map((section, index) => (
                <section
                  id={`step-${index + 1}`}
                  className="scroll-mt-28 print:break-inside-avoid"
                  key={section.title}
                >
                  <span className="eyebrow">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {section.body}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item, itemIndex) => {
                      const id = `${index}-${itemIndex}`;
                      return (
                        <li
                          key={item}
                          className="guide-check-item rounded-xl border border-border px-4"
                        >
                          <label className="flex items-start gap-3 min-h-12 py-3 cursor-pointer leading-relaxed">
                            <input
                              type="checkbox"
                              checked={Boolean(checked[id])}
                              onChange={(event) =>
                                setChecked({
                                  ...checked,
                                  [id]: event.target.checked,
                                })
                              }
                              className="w-5 h-5 mt-0.5 shrink-0 accent-primary"
                            />
                            <span>{item}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
            <div className="card-gmg mt-12 print:break-inside-avoid">
              <h3 className="font-bold text-xl mb-3">
                Use this as a conversation starter.
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This guide is a planning tool, not a promise that every item is
                included in a service package. Confirm your responsibilities,
                support, and implementation scope during discovery.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="py-16 print:hidden">
        <div className="container-gmg">
          <div className="cta-banner-gmg">
            <div>
              <span className="eyebrow">Your next step</span>
              <h2 className="text-3xl font-bold">
                Ready to stop losing leads?
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                Bring your CRM, follow-up, and support team together. Start with
                a free growth audit and a clear plan for what comes next.
              </p>
            </div>
            <Link
              to="/book-a-call?service=strategy"
              className="btn-primary-gmg"
              style={noMotion}
            >
              Book your free growth audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
