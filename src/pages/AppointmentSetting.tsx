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
    icon: "calendar",
    title: "Online scheduling",
    body: "Calendars that let leads book the right time without back-and-forth.",
  },
  {
    icon: "bell",
    title: "Confirmations & reminders",
    body: "Automated messages that reduce no-shows and keep appointments on track.",
  },
  {
    icon: "message",
    title: "Personal follow-up",
    body: "Human follow-up for the conversations that need a real touch.",
  },
  {
    icon: "refresh",
    title: "Rescheduling",
    body: "Easy rescheduling that keeps opportunities moving instead of lost.",
  },
  {
    icon: "clock",
    title: "Time zone smart",
    body: "Scheduling that works across time zones so nothing slips through.",
  },
  {
    icon: "chart",
    title: "Appointment tracking",
    body: "Every booked call tracked in your CRM and pipeline.",
  },
];

export default function AppointmentSetting() {
  return (
    <div>
      <PageHero
        variant="appointment"
        eyebrow="Connected service"
        title={<>Appointment setting</>}
        lead="Combine online scheduling, confirmations, reminders, and personal follow-up so your team can focus on the conversations that matter."
        primaryCta={{ label: "Book a free strategy call", to: "/contact" }}
        secondaryCta={{
          label: "See the Sales Growth System",
          to: "/sales-growth-system",
        }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Set more appointments"
            title="More booked calls. Fewer no-shows."
            subtitle="Automated scheduling with the human follow-up that actually fills your calendar."
          />
          <FeatureGrid items={features} cols={3} />
        </div>
      </section>
      <CTASection
        title="Fill your calendar with qualified appointments"
        body="Online scheduling, reminders, and personal follow-up working together to keep your pipeline full."
      />
    </div>
  );
}
