import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const industries: {
  icon: IconName;
  label: string;
  body: string;
  image: string;
}[] = [
  {
    icon: "briefcase",
    label: "Accounting",
    body: "Bookkeeping support, invoicing, and financial admin.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/f4b97468-3dd8-45ea-988a-92e06a0c2dea.jpg",
  },
  {
    icon: "home",
    label: "Real estate",
    body: "Listing management, lead coordination, and transaction support.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/764d3eee-c0f4-48fb-848d-68e46173b632.jpg",
  },
  {
    icon: "medical",
    label: "Medical",
    body: "Patient scheduling, records coordination, and front-office support.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/7a0a6dc1-1180-40a9-87a9-9837b3336797.jpg",
  },
  {
    icon: "shield",
    label: "Insurance",
    body: "Policy management, client follow-up, and claims support.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/c73435e0-0d44-45ac-b31b-51a81829de4f.jpg",
  },
  {
    icon: "users",
    label: "Coaching",
    body: "Client onboarding, scheduling, and content management.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/dc0297f2-923f-47a1-b5b8-311ef8d7c510.jpg",
  },
  {
    icon: "building",
    label: "Construction",
    body: "Project coordination, quotes, and follow-up.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/98e7b3ce-bc7b-4419-aaf2-c68a7dd4057f.jpg",
  },
  {
    icon: "heart",
    label: "Wellness",
    body: "Appointment setting and member communication.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/c787e53b-4db5-4e5d-b5b9-695d96d07d40.jpg",
  },
  {
    icon: "book",
    label: "Education",
    body: "Enrollment follow-up and student coordination.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/23e24ea9-24db-4d0b-854b-ac09e4781696.jpg",
  },
  {
    icon: "hands",
    label: "Nonprofit",
    body: "Donor management and outreach coordination.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/fd7e3928-3135-4886-9ecd-4c77e41d9d0d.jpg",
  },
  {
    icon: "map",
    label: "Local services",
    body: "Lead capture, scheduling, and reactivation.",
    image:
      "https://vibe.filesafe.space/1778597036474054298/assets/554559be-0f66-4506-ac46-6cfc2cb1274e.jpg",
  },
];

export default function Industries() {
  return (
    <div>
      <PageHero
        variant="industries"
        eyebrow="Who we serve"
        title={<>Industries we support</>}
        lead="Built for busy business owners and growing organizations across industries, from accounting and real estate to wellness, education, and local services."
        primaryCta={{ label: "Book a free strategy call", to: "/contact" }}
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
              <article key={ind.label} className="who-help-card">
                <img
                  className="who-help-media"
                  src={ind.image}
                  alt={`${ind.label} business support`}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.hidden = true;
                  }}
                />
                <div className="who-help-overlay" aria-hidden="true" />
                <div className="who-help-body">
                  <span className="who-help-icon" aria-hidden="true">
                    <Icon name={ind.icon} size={22} />
                  </span>
                  <h3 className="who-help-label">{ind.label}</h3>
                  <p className="who-help-blurb">{ind.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary-gmg">
              Find your industry fit <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CTASection
        title="Built for your industry"
        body="Whatever your field, we connect the right strategy, systems, and support to help you grow."
      />
    </div>
  );
}
