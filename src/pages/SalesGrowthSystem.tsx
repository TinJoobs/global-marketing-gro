import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import {
  PageHero,
  SectionHead,
  CTASection,
  FeatureGrid,
  FlowBoard,
} from "@/components/sections";

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "phone",
    title: "Capture",
    body: "Bring leads into one organized CRM through forms, landing pages, calendars, calls, and other sources.",
  },
  {
    icon: "message",
    title: "Nurture",
    body: "Automated and personal follow-up so no inquiry is left waiting and every lead has a clear next step.",
  },
  {
    icon: "calendar",
    title: "Set appointments",
    body: "Online scheduling with confirmations and reminders so your team focuses on the conversations that matter.",
  },
  {
    icon: "chart",
    title: "Convert",
    body: "Track opportunities from first contact to close with a sales pipeline built around your process.",
  },
];

const features: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "database",
    title: "Centralized CRM",
    body: "Every contact, conversation, appointment, and opportunity lives in one organized system.",
  },
  {
    icon: "refresh",
    title: "Lead reactivation",
    body: "Reconnect with previous inquiries and inactive customers through an approved, organized process.",
  },
  {
    icon: "workflow",
    title: "Workflow automation",
    body: "Automate repetitive follow-up so your team can focus on the conversations that need care.",
  },
  {
    icon: "report",
    title: "Pipeline visibility",
    body: "See exactly where each opportunity stands and what needs to happen next.",
  },
  {
    icon: "chart",
    title: "Performance reporting",
    body: "Understand activity, follow-up, and results with reporting that reflects how your business works.",
  },
  {
    icon: "headset",
    title: "Human + AI support",
    body: "Combine automation for repetitive work with dependable people for the conversations that matter.",
  },
];

export default function SalesGrowthSystem() {
  return (
    <div>
      <PageHero
        variant="crm"
        eyebrow="Our core solution"
        title={<>The Sales Growth System™</>}
        lead="A complete sales and follow-up system designed to help you capture, organize, nurture, and convert more leads, without doing everything yourself."
        note="The CRM is the central platform, but the service also includes strategy, workflow development, automation, follow-up processes, and optional Virtual Assistant support."
        primaryCta={{ label: "Book a free strategy call", to: "/contact" }}
        secondaryCta={{ label: "See how it works", to: "/how-it-works" }}
      />

      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="The four-step system"
            title="From inquiry to opportunity."
            subtitle="Capture the lead. Keep the conversation moving. Set the appointment. Close the sale."
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
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHead
              eyebrow="What's included"
              title="Everything you need to grow in one system."
            />
            <FeatureGrid items={features} cols={2} />
          </div>
          <div>
            <SectionHead
              eyebrow="Your pipeline at a glance"
              title="See every opportunity clearly."
              subtitle="No more scattered notes or missed follow-ups. One organized view of your entire sales process."
            />
            <FlowBoard
              rows={[
                {
                  title: "New lead captured",
                  sub: "From form, call, or landing page",
                  icon: "capture",
                },
                {
                  title: "First follow-up sent",
                  sub: "Automated within minutes",
                  icon: "message",
                },
                {
                  title: "Appointment booked",
                  sub: "Calendar with reminders",
                  icon: "calendar",
                },
                {
                  title: "Opportunity in pipeline",
                  sub: "Tracked from contact to close",
                  icon: "chart",
                },
                {
                  title: "Customer won",
                  sub: "Followed up and nurtured",
                  icon: "check",
                },
              ]}
            />
            <Link to="/contact" className="btn-primary-gmg mt-6">
              Get Your Sales Growth System <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Stop losing opportunities to missed follow-up"
        body="The right system, processes, and people can help your business respond faster, stay organized, and convert more opportunities."
      />
    </div>
  );
}
