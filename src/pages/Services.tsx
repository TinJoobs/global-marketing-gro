import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const services: { icon: IconName; title: string; body: string; to: string }[] =
  [
    {
      icon: "database",
      title: "CRM & automation",
      body: "Connect contacts, conversations, appointments, tasks, and your sales pipeline in one organized system.",
      to: "/crm-automation",
    },
    {
      icon: "cpu",
      title: "AI & human support",
      body: "Use automation for repetitive work while keeping your people in control of the conversations that need care.",
      to: "/ai-automation",
    },
    {
      icon: "monitor",
      title: "Digital solutions",
      body: "Websites, landing pages, funnels, and approved marketing content connected to a clear lead-capture process.",
      to: "/digital-solutions",
    },
    {
      icon: "calendar",
      title: "Appointment setting",
      body: "Online scheduling, confirmations, reminders, and personal follow-up so your team can focus on what matters.",
      to: "/appointment-setting",
    },
    {
      icon: "refresh",
      title: "Lead follow-up",
      body: "Automated and personal follow-up so no inquiry is left waiting and every lead has a clear next step.",
      to: "/lead-follow-up",
    },
    {
      icon: "link",
      title: "Integrations",
      body: "Connect the tools you already use within one cutting-edge marketing solution.",
      to: "/integrations",
    },
  ];

export default function Services() {
  return (
    <div>
      <PageHero
        variant="services"
        eyebrow="What we do"
        title={<>Elevate your marketing strategy</>}
        lead="Sales funnel creation, CRM setup, marketing automation, campaign optimization, and full-service digital strategy, all under one roof."
        primaryCta={{ label: "Book a free strategy call", to: "/contact" }}
        secondaryCta={{ label: "View pricing", to: "/pricing" }}
      />

      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Our services"
            title="Practical services that strengthen your growth."
            subtitle="Each service works on its own or connects to your core Sales Growth System."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <article key={s.title} className="card-gmg">
                <span className="icon-box mb-5">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{s.body}</p>
                <Link to={s.to} className="text-link text-sm">
                  Learn more <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gmg pale-bg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Full-service strategy"
            title="Done-for-you implementation, end to end."
            subtitle="We don't just give you tools. We set them up and manage them for you."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "workflow" as IconName,
                title: "Sales funnel creation",
                body: "High-converting funnels built around your offer and process.",
              },
              {
                icon: "database" as IconName,
                title: "CRM setup",
                body: "Customized CRM built around how your business actually works.",
              },
              {
                icon: "refresh" as IconName,
                title: "Marketing automation",
                body: "Workflows that nurture leads and reactivate past customers.",
              },
              {
                icon: "chart" as IconName,
                title: "Campaign optimization",
                body: "Data-driven refinement for better results over time.",
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
        title="Build your full-service Growth strategy"
        body="From funnel creation to CRM setup to ongoing automation, we handle the implementation so you can focus on your business."
      />
    </div>
  );
}
