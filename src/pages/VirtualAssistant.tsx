import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import {
  PageHero,
  SectionHead,
  CTASection,
  FeatureGrid,
} from "@/components/sections";

const roles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "briefcase",
    title: "Accounting Executive Assistant",
    body: "Bookkeeping support, invoicing, expense tracking, and financial admin handled with accuracy.",
  },
  {
    icon: "home",
    title: "Realtor Executive Assistant",
    body: "Listing management, lead coordination, appointment setting, and transaction support.",
  },
  {
    icon: "medical",
    title: "Medical Executive Assistant",
    body: "Patient scheduling, records coordination, and front-office support for medical practices.",
  },
  {
    icon: "shield",
    title: "Insurance Executive Assistant",
    body: "Policy management, client follow-up, claims support, and administrative coordination.",
  },
  {
    icon: "settings",
    title: "Customizable Business Needs",
    body: "Matched to your specific workflow, industry, and the tasks you need completed.",
  },
  {
    icon: "monitor",
    title: "Website & Digital Support",
    body: "Website updates, content management, and digital task support for your online presence.",
  },
];

const benefits: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Skilled & Matched",
    body: "We profile your needs and match you with a Virtual Assistant whose skills align with your work.",
  },
  {
    icon: "clock",
    title: "Dedicated support in Growth",
    body: "Dedicated support with recruiting, vetting and backup coverage in the Growth plan.",
  },
  {
    icon: "globe",
    title: "Philippines-Based",
    body: "Experienced, English-proficient professionals available across your business hours.",
  },
  {
    icon: "headset",
    title: "Ongoing Coordination",
    body: "We support onboarding, communication, task coordination, and performance reporting.",
  },
];

export default function VirtualAssistant() {
  return (
    <div>
      <PageHero
        variant="va"
        eyebrow="Our core solution"
        title={<>Virtual Assistant Services</>}
        lead="Skilled Virtual Assistants who help manage the daily tasks that keep your business moving — so you can focus on growth."
        note="Growth includes a dedicated Philippines-based VA for $1,697/month plus $2,997 setup. VA Boost is $1,497/month."
        primaryCta={{ label: "Get Your Executive Assistant", to: "/contact" }}
        secondaryCta={{ label: "View all services", to: "/services" }}
      />

      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Specialized roles"
            title="The Right Assistant for Your Business."
            subtitle="Matched to your industry, workflow, and the work you actually need completed."
          />
          <FeatureGrid items={roles} cols={3} />
        </div>
      </section>

      <section className="section-gmg pale-bg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead
              eyebrow="Why GMG Virtual Assistants"
              title="Dependable support, coordinated for you."
              subtitle="More than staffing — we help you connect the right person to the right work."
            />
            <div className="space-y-5">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <Icon
                    name="check"
                    size={22}
                    className="text-teal mt-1 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-navy">{b.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {b.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary-gmg mt-8">
              Quick Hire Services <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="card-gmg">
            <span className="icon-box mb-5">
              <Icon name="headset" size={26} />
            </span>
            <h3 className="text-xl font-bold mb-3">
              Flexible support that grows with you.
            </h3>
            <p className="text-muted-foreground mb-3">
              Begin with the services you need today and expand your support as
              your business grows. Use Virtual Assistant support on its own or
              integrated with the Sales Growth System.
            </p>
            <p className="text-muted-foreground">
              No long lock-in. Just dependable help, coordinated by our team.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Reclaim Your Time with the Right Support"
        body="Let us match you with a Virtual Assistant who understands your industry and your specific needs."
        primaryLabel="Get Your Executive Assistant"
      />
    </div>
  );
}
