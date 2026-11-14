import React from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const roles: {
  icon: IconName;
  title: string;
  body: string;
  to: string;
  cta: string;
}[] = [
  {
    icon: "headset",
    title: "Executive assistant",
    body: "Join our team of skilled Virtual Assistants supporting businesses across industries.",
    to: "/careers/executive-assistant",
    cta: "Apply now",
  },
  {
    icon: "users",
    title: "Referral partner",
    body: "Refer businesses to GMG and earn rewards for successful introductions.",
    to: "/careers/referral",
    cta: "Submit a referral",
  },
  {
    icon: "briefcase",
    title: "Account representative",
    body: "Help businesses discover the right GMG solutions as part of our growth team.",
    to: "/careers/account-rep",
    cta: "Apply now",
  },
];

export default function Careers() {
  return (
    <div>
      <PageHero
        variant="careers"
        eyebrow="Careers"
        title={<>Grow with Global Marketing Group</>}
        lead="Join a team that connects strategy, systems, and support to help businesses grow. Explore our open roles and referral opportunities."
        primaryCta={{ label: "View open roles", to: "#roles" }}
        secondaryCta={{ label: "Contact us", to: "/contact" }}
      />
      <section className="section-gmg" id="roles">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Open opportunities"
            title="Find your next role."
            subtitle="Whether you want to support clients, refer businesses, or help others discover GMG, there's a place for you."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <article key={r.title} className="card-gmg">
                <span className="icon-box mb-5">
                  <Icon name={r.icon} size={26} />
                </span>
                <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm mb-5">{r.body}</p>
                <Link
                  to={r.to}
                  className="btn-primary-gmg w-full justify-center"
                >
                  {r.cta} <Icon name="arrow" size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Ready to join the team?"
        body="Apply for a role or submit a referral. We'd love to hear from you."
        primaryLabel="Contact us"
      />
    </div>
  );
}
