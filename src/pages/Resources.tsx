import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const resources: { icon: IconName; title: string; body: string; to: string }[] =
  [
    {
      icon: "monitor",
      title: "Portfolio",
      body: "Client success gallery — websites, funnels, and AI solutions we've built.",
      to: "/portfolio",
    },
    {
      icon: "megaphone",
      title: "Affiliate Program",
      body: "Unlock your earning potential with our exclusive affiliate program.",
      to: "/resources/affiliate",
    },
    {
      icon: "book",
      title: "Blog",
      body: "Guides and insights on CRM, automation, and business growth.",
      to: "/resources",
    },
    {
      icon: "briefcase",
      title: "Services",
      body: "Full-service digital strategy, funnel creation, and CRM setup.",
      to: "/services",
    },
    {
      icon: "globe",
      title: "Media Center",
      body: "Our connected toolkit and client/project media examples.",
      to: "/resources/media",
    },
    {
      icon: "chart",
      title: "Pricing",
      body: "Transparent plans with no hidden fees.",
      to: "/pricing",
    },
  ];

export default function Resources() {
  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title={<>Guides, Tools & Insights</>}
        lead="Explore our portfolio, affiliate program, services, and media center — everything you need to learn about GMG and grow your business."
        primaryCta={{ label: "Book a Free Strategy Call", to: "/contact" }}
        secondaryCta={{ label: "View all services", to: "/services" }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Explore"
            title="Resources to help you grow."
            subtitle="Practical guides, client work, and programs to support your journey."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => (
              <article key={r.title} className="card-gmg">
                <span className="icon-box mb-5">
                  <Icon name={r.icon} size={26} />
                </span>
                <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{r.body}</p>
                <Link to={r.to} className="text-link text-sm">
                  Learn more <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Ready to Put These Resources to Work?"
        body="Book a free strategy call and we'll help you apply these insights to your business."
      />
    </div>
  );
}
