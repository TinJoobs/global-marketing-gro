import ConnectedStory from "./ConnectedStory";
import WhoWeHelp from "./WhoWeHelp";
import Testimonials from "./Testimonials";
import PricingHighlight from "./PricingHighlight";
import IntegrationLogoSlider from "@/components/IntegrationLogoSlider";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { SectionHead, FAQList, CTASection } from "@/components/sections";
import { coreSolutions, faqs } from "./homeData";

export default function HomeSections() {
  return (
    <>
      <IntegrationLogoSlider />
      <section className="section-gmg">
        <div className="container-gmg">
          <div className="home-tool-card grid md:grid-cols-[1.4fr_1fr] items-center gap-10">
            <div>
              <span className="eyebrow">Free Missed Revenue Calculator</span>
              <h2 className="text-3xl md:text-4xl mb-5">
                How Much Revenue Slips Through the Cracks?
              </h2>
              <p>
                Estimate the monthly opportunity lost when inquiries go
                unanswered—then build a follow-up process that gives every lead
                a next step.
              </p>
              <Link
                className="btn-primary-gmg mt-7"
                to="/missed-revenue-calculator"
              >
                Calculate your missed opportunity{" "}
                <Icon name="arrow" size={18} />
              </Link>
            </div>
            <div className="home-tool-aside">
              <span className="gmg-stat">4 inputs.</span>
              <span className="home-tool-aside-title">
                One clearer picture.
              </span>
              <p className="mt-4 text-sm">
                Your inquiry volume, follow-up gap, estimated close rate, and
                average sale value. Results are estimates, with every assumption
                explained.
              </p>
              <p className="mt-4 text-sm">
                No signup needed to see your estimate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-gmg pale-bg solutions-section"
        id="core-solutions"
      >
        <div className="container-gmg">
          <SectionHead
            center
            eyebrow="Systems + people"
            title="Build the system. Put the right people behind it."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {coreSolutions.map((c) => (
              <article className="card-gmg" key={c.title}>
                <span className="icon-box mb-6">
                  <Icon name={c.icon} />
                </span>
                <h3 className="text-2xl mb-4">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {c.body}
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {c.tags.map((tag) => (
                    <span
                      className="border border-line bg-secondary rounded-full px-3 py-1 text-xs"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link className="text-link" to={c.to}>
                  {c.cta}
                  <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConnectedStory />

      <PricingHighlight />

      <WhoWeHelp />

      <section className="section-gmg pale-bg">
        <div className="container-gmg grid md:grid-cols-2 gap-12 items-center">
          <img
            className="rounded-2xl w-full"
            src="/assets/images/support-professional.webp"
            alt="Support professional working at a laptop with a headset"
            width="780"
            height="660"
            loading="lazy"
          />
          <div>
            <SectionHead
              eyebrow="Real people. Reliable follow-through."
              title="More room to run your business."
              subtitle="A trained Philippines-based Virtual Assistant helps keep the daily work moving, supported by recruiting, vetting, backup coverage, and regular reporting."
            />
            <Link className="btn-primary-gmg" to="/virtual-assistant-services">
              Meet your support options <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section-gmg">
        <div className="container-gmg grid lg:grid-cols-2 gap-12">
          <SectionHead
            eyebrow="A few helpful answers"
            title="Start with clarity."
            subtitle="Understand how the platform and your support team can work together."
          />
          <div>
            <FAQList items={faqs} />
            <Link className="text-link mt-7" to="/faq">
              Read all questions <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to stop losing leads?"
        body="Bring your CRM, follow-up, and support team together. Start with a free growth audit and a clear plan for what comes next."
      />
    </>
  );
}
