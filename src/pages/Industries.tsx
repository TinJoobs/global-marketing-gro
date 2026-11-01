import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const industries: { icon: IconName; label: string; body: string }[] = [
  {
    icon: "briefcase",
    label: "Accounting",
    body: "Bookkeeping support, invoicing, and financial admin.",
  },
  {
    icon: "home",
    label: "Real Estate",
    body: "Listing management, lead coordination, and transaction support.",
  },
  {
    icon: "medical",
    label: "Medical",
    body: "Patient scheduling, records coordination, and front-office support.",
  },
  {
    icon: "shield",
    label: "Insurance",
    body: "Policy management, client follow-up, and claims support.",
  },
  {
    icon: "users",
    label: "Coaching",
    body: "Client onboarding, scheduling, and content management.",
  },
  {
    icon: "building",
    label: "Construction",
    body: "Project coordination, quotes, and follow-up.",
  },
  {
    icon: "heart",
    label: "Wellness",
    body: "Appointment setting and member communication.",
  },
  {
    icon: "book",
    label: "Education",
    body: "Enrollment follow-up and student coordination.",
  },
  {
    icon: "hands",
    label: "Nonprofit",
    body: "Donor management and outreach coordination.",
  },
  {
    icon: "map",
    label: "Local Services",
    body: "Lead capture, scheduling, and reactivation.",
  },
];

export default function Industries() {
  return (
    <div>
      <PageHero
        variant="industries"
        eyebrow="Who we serve"
        title={<>Industries We Support</>}
        lead="Built for busy business owners and growing organizations across industries — from accounting and real estate to wellness, education, and local services."
        primaryCta={{ label: "Book a Free Strategy Call", to: "/contact" }}
        secondaryCta={{ label: "See how it works", to: "/how-it-works" }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Tailored to your industry"
            title="Support that fits the way you work."
            subtitle="We match the right system and the right people to your specific industry and workflow."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <article key={ind.label} className="card-gmg">
                <span className="icon-box mb-5">
                  <Icon name={ind.icon} size={26} />
                </span>
                <h3 className="text-lg font-bold mb-2">{ind.label}</h3>
                <p className="text-muted-foreground text-sm">{ind.body}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary-gmg">
              Find Your Industry Fit <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CTASection
        title="Built for Your Industry"
        body="Whatever your field, we connect the right strategy, systems, and support to help you grow."
      />
    </div>
  );
}
