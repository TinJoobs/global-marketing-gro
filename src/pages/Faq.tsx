import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import {
  PageHero,
  SectionHead,
  CTASection,
  FAQList,
} from "@/components/sections";

const faqs = [
  {
    q: "Is the Sales Growth System only a CRM?",
    a: "No. The CRM is the central platform, but the service also includes strategy, workflow development, automation, follow-up processes, and optional Virtual Assistant support.",
  },
  {
    q: "How much do Virtual Assistant services cost?",
    a: "Growth is $1,697/month plus $2,997 setup and includes one dedicated trained Philippines-based VA. Scale is $3,497/month plus $4,997 setup. VA Boost is $1,497/month.",
  },
  {
    q: "Can I use Virtual Assistant services without purchasing the Sales Growth System?",
    a: "Yes. Virtual Assistant support can be used as a separate service or integrated with the Sales Growth System.",
  },
  {
    q: "Do you work with my industry?",
    a: "We support a wide range of industries including accounting, real estate, medical, insurance, coaching, construction, wellness, education, nonprofits, and local services.",
  },
  {
    q: "What does done-for-you implementation include?",
    a: "We set up your CRM, build your workflows, create your funnels and landing pages, configure automations, and coordinate your Virtual Assistant, so you can focus on your business.",
  },
  {
    q: "How quickly can I get started?",
    a: "Book a free strategy call and we'll map out the right solution for your business. Most clients are up and running within a couple of weeks.",
  },
  {
    q: "Is there a long-term contract?",
    a: "We offer flexible plans. Begin with the services you need today and expand your support as your business grows.",
  },
  {
    q: "Do you offer AI tools?",
    a: "Yes. Our AI tools include automated engagement, 24/7 availability, predictive lead identification, instant intelligent responses, precision targeting, and efficient follow-ups.",
  },
];

export default function Faq() {
  return (
    <div>
      <PageHero
        variant="faq"
        eyebrow="Help center"
        title={<>Frequently asked questions</>}
        lead="Start with clarity. Explore how the system and your Virtual Assistant can work for your business."
      />
      <section className="section-gmg">
        <div className="container-gmg max-w-3xl">
          <SectionHead
            center
            eyebrow="A few helpful answers"
            title="Everything you need to know."
          />
          <FAQList items={faqs} />
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're happy to help.
            </p>
            <Link to="/contact" className="btn-primary-gmg">
              Contact us <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CTASection
        title="Ready to get started?"
        body="Book a free strategy call and we'll help you find the right solution for your business."
      />
    </div>
  );
}
