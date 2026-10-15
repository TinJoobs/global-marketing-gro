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
    icon: "message",
    title: "Automated Sequences",
    body: "Follow-up that starts within minutes and continues until the lead is ready.",
  },
  {
    icon: "phone",
    title: "Multi-Channel",
    body: "Email, SMS, and calls coordinated so no channel is forgotten.",
  },
  {
    icon: "refresh",
    title: "Lead Reactivation",
    body: "Reconnect with past inquiries and inactive customers through an approved process.",
  },
  {
    icon: "clock",
    title: "Speed to Lead",
    body: "Respond fast — before your competition does.",
  },
  {
    icon: "chart",
    title: "Follow-Up Tracking",
    body: "See exactly where each lead is in the follow-up process.",
  },
  {
    icon: "headset",
    title: "Human Touch",
    body: "Personal follow-up for the conversations automation can't handle.",
  },
];

export default function LeadFollowUp() {
  return (
    <div>
      <PageHero
        eyebrow="Connected service"
        title={<>Lead Follow-Up</>}
        lead="Your business may not have a lead problem — it may have a follow-up and execution problem. We fix that."
        primaryCta={{ label: "Book a Free Strategy Call", to: "/contact" }}
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
        title="Every Missed Follow-Up Can Become a Missed Sale"
        body="Put the right processes in place so your business responds faster and converts more opportunities."
      />
    </div>
  );
}
