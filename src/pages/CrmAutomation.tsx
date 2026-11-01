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
    icon: "capture",
    title: "Lead Capture",
    body: "Bring leads into one organized CRM through forms, landing pages, calendars, calls, and other sources.",
  },
  {
    icon: "message",
    title: "Conversation Management",
    body: "Every message, call, and email tracked in one place — no more scattered inboxes.",
  },
  {
    icon: "calendar",
    title: "Appointment Scheduling",
    body: "Online calendars with confirmations and reminders built into your CRM.",
  },
  {
    icon: "chart",
    title: "Sales Pipeline",
    body: "Track opportunities from first contact to close with a pipeline built around your process.",
  },
  {
    icon: "refresh",
    title: "Lead Reactivation",
    body: "Reconnect with previous inquiries and inactive customers through an organized process.",
  },
  {
    icon: "report",
    title: "Reporting & Analytics",
    body: "Understand activity, follow-up, and results with reporting that reflects your business.",
  },
];

export default function CrmAutomation() {
  return (
    <div>
      <PageHero
        variant="crm"
        eyebrow="Connected service"
        title={<>CRM & Automation</>}
        lead="Connect contacts, conversations, appointments, tasks, and your sales pipeline in one organized system."
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
            eyebrow="One organized system"
            title="Your business, finally in one place."
            subtitle="Stop juggling scattered tools. One CRM that automates leads, sales, and customer relationships."
          />
          <FeatureGrid items={features} cols={3} />
        </div>
      </section>
      <CTASection
        title="Put Your Whole Business in One System"
        body="Capture, organize, follow up, and convert — all from a single CRM built around your process."
      />
    </div>
  );
}
