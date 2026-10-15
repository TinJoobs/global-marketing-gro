import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import {
  PageHero,
  SectionHead,
  CTASection,
  FeatureGrid,
} from "@/components/sections";

const features: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "monitor",
    title: "Professional Websites",
    body: "Conversion-focused websites that reflect your vision and deliver results.",
  },
  {
    icon: "capture",
    title: "Landing Pages",
    body: "High-impact pages built to capture leads and drive action.",
  },
  {
    icon: "workflow",
    title: "Sales Funnels",
    body: "Funnels that guide visitors from first click to customer.",
  },
  {
    icon: "search",
    title: "SEO Built-In",
    body: "Search-optimized structure so the right people find you.",
  },
  {
    icon: "link",
    title: "CRM Integration",
    body: "Every form and page connected to your lead-capture process.",
  },
  {
    icon: "headset",
    title: "Ongoing Support",
    body: "Updates, content, and maintenance handled for you.",
  },
];

export default function DigitalSolutions() {
  return (
    <div>
      <PageHero
        eyebrow="Connected service"
        title={<>Digital Solutions</>}
        lead="Create a website that reflects your vision and delivers results — professional development, conversion-focused design, brand alignment, SEO, automation, and support."
        primaryCta={{ label: "Book a Free Strategy Call", to: "/contact" }}
        secondaryCta={{ label: "View portfolio", to: "/portfolio" }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="What we build"
            title="Digital assets that capture and convert."
            subtitle="Websites, landing pages, and funnels connected to a clear lead-capture and follow-up process."
          />
          <FeatureGrid items={features} cols={3} />
        </div>
      </section>
      <CTASection
        title="Build a Website That Actually Grows Your Business"
        body="Professional design, conversion focus, and full CRM integration — all handled for you."
      />
    </div>
  );
}
