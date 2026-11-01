import React from "react";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "calendar",
    title: "Book a Strategy Call",
    body: "We start with a discovery conversation to understand your goals, challenges, workload, and current processes.",
  },
  {
    icon: "settings",
    title: "Choose Your Solution",
    body: "We recommend the right combination of CRM automation, AI tools, and Virtual Assistant support for your business.",
  },
  {
    icon: "rocket",
    title: "Launch Your Assistant & Automation",
    body: "We set up your system, build your workflows, and match you with the right Virtual Assistant.",
  },
  {
    icon: "growth",
    title: "Scale with Ongoing Support",
    body: "We coordinate onboarding, communication, task management, and performance reporting as you grow.",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <PageHero
        variant="how"
        eyebrow="How it works"
        title={<>A Clearer Path from Inquiry to Opportunity</>}
        lead="Four simple steps to put the right technology, processes, and people in place so your business can respond faster and convert more."
        primaryCta={{ label: "Book a Free Strategy Call", to: "/contact" }}
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
              <article key={s.title} className="card-gmg">
                <div className="flex items-center justify-between mb-5">
                  <span className="icon-box">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <span className="text-2xl font-bold text-line">0{i + 1}</span>
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
                title: "Customized Support",
                body: "We begin with discovery to understand your goals and current processes.",
              },
              {
                icon: "users" as IconName,
                title: "The Right Match",
                body: "We match you with a Virtual Assistant whose skills align with your work.",
              },
              {
                icon: "refresh" as IconName,
                title: "Ongoing Coordination",
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
        title="Ready to Put the Right System in Place?"
        body="Book a free strategy call and we'll help you map out the right combination of automation and support."
      />
    </div>
  );
}
