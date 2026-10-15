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
    icon: "link",
    title: "Integration Ecosystem",
    body: "Connect the popular tools you already use within one cutting-edge marketing solution.",
  },
  {
    icon: "code",
    title: "No-Code Builder",
    body: "Build powerful automations without writing a single line of code.",
  },
  {
    icon: "refresh",
    title: "Real-Time Data Sync",
    body: "Keep every system updated instantly so nothing falls out of sync.",
  },
  {
    icon: "workflow",
    title: "Workflow Automation",
    body: "Trigger actions across tools automatically based on what your leads do.",
  },
  {
    icon: "lock",
    title: "Enterprise-Grade Security",
    body: "Your data stays protected with security built for growing businesses.",
  },
  {
    icon: "settings",
    title: "Custom Connections",
    body: "Tailor integrations to fit the way your business actually works.",
  },
];

export default function Integrations() {
  return (
    <div>
      <PageHero
        eyebrow="Connected service"
        title={<>Seamlessly Connect Your Tools</>}
        lead="Connect popular tools within a cutting-edge marketing solution — an integration ecosystem, no-code builder, real-time data sync, workflow automation, and enterprise-grade security."
        primaryCta={{ label: "Book a Free Strategy Call", to: "/contact" }}
        secondaryCta={{ label: "View all services", to: "/services" }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="One connected ecosystem"
            title="Your tools, finally working together."
            subtitle="Stop switching between platforms. Connect everything into one organized system."
          />
          <FeatureGrid items={features} cols={3} />
        </div>
      </section>
      <CTASection
        title="Connect Your Entire Tech Stack"
        body="Real-time sync and workflow automation across the tools your business already relies on."
      />
    </div>
  );
}
