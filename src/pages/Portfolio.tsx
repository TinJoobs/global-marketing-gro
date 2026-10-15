import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { PageHero, SectionHead, CTASection } from "@/components/sections";

const clients: { name: string; category: string }[] = [
  {
    name: "Awaken the Sacred Woman",
    category: "Website & Landing Page Development",
  },
  { name: "HealthViber", category: "Funnel Design" },
  { name: "Tranquility Salt Cave", category: "Website Development" },
  { name: "Klinghammer Construction", category: "Website & Funnel" },
  { name: "The COC Cares", category: "AI Chatbot & Lead Generation" },
  { name: "STEPP Forward, LLC", category: "Funnel & Automation" },
  { name: "Digestwell Health", category: "Website & Landing Page" },
  { name: "Andrew Paul", category: "AI Lead Generation" },
  { name: "Brush Crazy", category: "Website & Funnel" },
  { name: "Spruce Hill Inn", category: "Website & Booking Funnel" },
];

const services = [
  "Website & Landing Page Development",
  "Funnel & Funnel Design",
  "AI Chatbot",
  "AI Lead Generation",
];

export default function Portfolio() {
  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title={<>Portfolio</>}
        lead="Client success gallery — website and landing page development, funnel design, AI chatbots, and AI lead generation across industries."
        primaryCta={{ label: "Start Your Project", to: "/contact" }}
        secondaryCta={{ label: "View services", to: "/services" }}
      />
      <section className="section-gmg">
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="What we deliver"
            title="Real work for real businesses."
            subtitle="A selection of the websites, funnels, and AI solutions we've built for our clients."
          />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {services.map((s) => (
              <span
                key={s}
                className="text-xs font-semibold bg-pale text-teal-dark rounded-full px-4 py-2"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((c) => (
              <article key={c.name} className="card-gmg">
                <div className="rounded-xl bg-gradient-to-br from-mint/40 to-pale h-40 flex items-center justify-center mb-5">
                  <Icon name="monitor" size={40} className="text-teal" />
                </div>
                <span className="text-xs font-semibold text-teal-dark uppercase tracking-wide">
                  {c.category}
                </span>
                <h3 className="text-lg font-bold mt-2">{c.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Your Project Could Be Next"
        body="From websites and funnels to AI lead generation, we build the digital assets that grow your business."
        primaryLabel="Start Your Project"
      />
    </div>
  );
}
