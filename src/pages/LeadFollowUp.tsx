import React from "react";
import { type IconName } from "@/components/Icon";
import {
  PageHero,
  SectionHead,
  CTASection,
  FeatureGrid,
} from "@/components/sections";

const features: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "message",
    title: "Automated sequences",
    body: "Follow-up that starts within minutes and continues until the lead is ready.",
  },
  {
    icon: "phone",
    title: "Multi-Channel",
    body: "Email, SMS, and calls coordinated so no channel is forgotten.",
  },
  {
    icon: "refresh",
    title: "Lead reactivation",
    body: "Reconnect with past inquiries and inactive customers through an approved process.",
  },
  {
    icon: "clock",
    title: "Speed to lead",
    body: "Respond before your competition does.",
  },
  {
    icon: "chart",
    title: "Follow-up tracking",
    body: "See exactly where each lead is in the follow-up process.",
  },
  {
    icon: "headset",
    title: "Human touch",
    body: "Personal follow-up for the conversations automation can't handle.",
  },
];

export default function LeadFollowUp() {
  return (
    <div>
      <PageHero
        variant="lead"
        eyebrow="Connected service"
        title={<>Lead follow-up</>}
        lead="Your business may not have a lead problem. It may have a follow-up and execution problem. We fix that."
        primaryCta={{ label: "Book a free strategy call", to: "/contact" }}
        secondaryCta={{ label: "See how it works", to: "/how-it-works" }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Never miss a follow-up"
            title="Keep every conversation moving."
            subtitle="Automated and personal follow-up so no inquiry is left waiting and every lead has a clear next step."
          />
          <FeatureGrid items={features} cols={3} />
        </div>
      </section>
      <CTASection
        title="Every missed follow-up can become a missed sale"
        body="Put the right processes in place so your business responds faster and converts more opportunities."
      />
    </div>
  );
}
