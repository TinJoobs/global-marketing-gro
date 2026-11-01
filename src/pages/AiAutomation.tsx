import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import {
  PageHero,
  SectionHead,
  CTASection,
  FeatureGrid,
} from "@/components/sections";

const tools: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "message",
    title: "Automated Engagement",
    body: "AI-driven conversations that keep leads moving without manual effort.",
  },
  {
    icon: "clock",
    title: "24/7 Availability",
    body: "Respond to inquiries any time, day or night, so no opportunity is missed.",
  },
  {
    icon: "search",
    title: "Predictive Lead Identification",
    body: "Smart scoring that surfaces the leads most likely to convert.",
  },
  {
    icon: "cpu",
    title: "Instant Intelligent Responses",
    body: "GPT-powered replies that sound human and stay on-brand.",
  },
  {
    icon: "target",
    title: "Precision Targeting",
    body: "Reach the right audience with the right message at the right time.",
  },
  {
    icon: "refresh",
    title: "Efficient Follow-Ups",
    body: "Automated sequences that nurture leads until they're ready to buy.",
  },
];

export default function AiAutomation() {
  return (
    <div>
      <PageHero
        variant="ai"
        eyebrow="Connected service"
        title={<>AI & Human Support</>}
        lead="Unleash the power of AI with Global Marketing Group — conversations, live chat, chatbot workflow automation, smart lead scoring, and GPT-powered content creation."
        primaryCta={{ label: "Schedule A Demo", to: "/contact" }}
        secondaryCta={{ label: "Explore services", to: "/services" }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="AI tools"
            title="Automation that works while you focus on growth."
            subtitle="Use automation for repetitive work while keeping your people in control of the conversations that need care."
          />
          <FeatureGrid items={tools} cols={3} />
        </div>
      </section>
      <section className="section-gmg pale-bg">
        <div className="container-gmg">
          <div className="cta-banner-gmg">
            <div>
              <span className="eyebrow">The best of both</span>
              <h2 className="text-2xl md:text-[2rem] font-bold max-w-[660px]">
                AI handles the repetitive work. Your people handle the
                relationships.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-[680px]">
                Smart lead scoring, instant responses, and automated follow-up —
                balanced with dependable human support for the conversations
                that matter.
              </p>
            </div>
            <Link to="/contact" className="btn-primary-gmg whitespace-nowrap">
              Schedule A Demo <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CTASection
        title="Put AI to Work for Your Business"
        body="See how AI-enhanced automation can capture, engage, and convert more leads for your business."
      />
    </div>
  );
}
