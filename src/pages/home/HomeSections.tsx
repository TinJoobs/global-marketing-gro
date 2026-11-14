import ConnectedStory from "./ConnectedStory";
import WhoWeHelp from "./WhoWeHelp";
import Testimonials from "./Testimonials";
import PricingHighlight from "./PricingHighlight";
import IntegrationLogoSlider from "@/components/IntegrationLogoSlider";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { SectionHead, FAQList, CTASection } from "@/components/sections";
import { coreSolutions, faqs } from "./homeData";
import { Hero3DScene } from "@/components/hero3d/Hero3DScene";
import "@/components/hero3d/hero3d.css";

const supportFacts = [
  "Recruiting and vetting handled for you",
  "Backup coverage so work keeps moving",
  "Regular reporting on what got done",
];

export default function HomeSections() {
  return (
    <>
      <IntegrationLogoSlider />

      <section className="section-gmg solutions-section" id="core-solutions">
        <div className="container-gmg">
          <SectionHead title="A sales system, and the people to run it." />
          <div className="grid md:grid-cols-2 gap-5">
            {coreSolutions.map((c) => (
              <article className="card-gmg" key={c.title}>
                <span className="icon-box mb-6">
                  <Icon name={c.icon} />
                </span>
                <h3 className="mb-3">{c.title}</h3>
                <p className="text-muted-foreground mb-5">{c.body}</p>
                <div className="solution-tags">
                  {c.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
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

      <section className="section-gmg pt-0">
        <div className="container-gmg">
          <div className="home-tool-card grid md:grid-cols-[1.4fr_1fr] items-center gap-10">
            <div>
              <h2 className="mb-5">
                How much revenue slips through the cracks?
              </h2>
              <p className="font-semibold text-navy mb-3">
                Try the free missed revenue calculator.
              </p>
              <p>
                Estimate the monthly opportunity lost when inquiries go
                unanswered, then build a follow-up process that gives every lead
                a next step.
              </p>
              <Link
                className="btn-dark-gmg mt-8"
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
              <p className="mt-4 text-[0.9375rem]">
                Your inquiry volume, follow-up gap, estimated close rate, and
                average sale value. Results are estimates, with every assumption
                explained.
              </p>
              <p className="mt-3 text-[0.9375rem] font-semibold text-navy">
                No signup needed to see your estimate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingHighlight />

      <WhoWeHelp />

      <section className="section-gmg pale-bg people-section">
        <div className="container-gmg grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="people-map">
            <Hero3DScene variant="philippines" />
          </div>
          <div>
            <SectionHead
              title="Your assistant works from our team in the Philippines."
              subtitle="A trained Virtual Assistant keeps the daily work moving, with the support of the people around them."
            />
            <ul className="people-facts">
              {supportFacts.map((fact) => (
                <li key={fact}>
                  <Icon name="check" size={18} />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <Link className="btn-dark-gmg" to="/virtual-assistant-services">
              Meet your support options <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section-gmg pt-0">
        <div className="container-gmg grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20">
          <div>
            <SectionHead
              title="Common questions"
              subtitle="How the platform and your support team work together."
            />
            <Link className="text-link" to="/faq">
              Read all questions <Icon name="arrow" size={16} />
            </Link>
          </div>
          <FAQList items={faqs} />
        </div>
      </section>

      <CTASection
        title="Ready to stop losing leads?"
        body="Bring your CRM, follow-up, and support team together. Start with a free growth audit and a clear plan for what comes next."
      />
    </>
  );
}
