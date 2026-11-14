import ConnectedStory from "./ConnectedStory";
import WhoWeHelp from "./WhoWeHelp";
import Testimonials from "./Testimonials";
import PricingHighlight from "./PricingHighlight";
import HomeCalculator from "./HomeCalculator";
import IntegrationLogoSlider from "@/components/IntegrationLogoSlider";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { SectionHead, FAQList, CTASection } from "@/components/sections";
import { coreSolutions, faqs } from "./homeData";

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

      <HomeCalculator />

      <PricingHighlight />

      <WhoWeHelp />

      <section className="section-gmg pale-bg people-section">
        <div className="container-gmg grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          <figure
            className="report-card"
            aria-label="Example of a weekly assistant report"
          >
            <div className="report-head">
              <span className="crm-avatar">JM</span>
              <div>
                <strong>Weekly update from your assistant</strong>
                <span>Friday, 4:45 PM</span>
              </div>
            </div>
            <ul className="report-list">
              <li>
                <Icon name="check" size={16} /> Followed up with 38 new
                inquiries
              </li>
              <li>
                <Icon name="check" size={16} /> Booked 11 appointments, 2
                rescheduled
              </li>
              <li>
                <Icon name="check" size={16} /> Reactivated 6 past customers
              </li>
              <li className="is-open">
                <Icon name="clock" size={16} /> 3 quotes waiting on your
                approval
              </li>
            </ul>
            <p className="report-note">
              &ldquo;Two of the quotes are ready to send once you confirm
              pricing. I&rsquo;ll call the rest back Monday morning.&rdquo;
            </p>
            <figcaption>
              Sample report. Your reporting is set up around your goals.
            </figcaption>
          </figure>
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
