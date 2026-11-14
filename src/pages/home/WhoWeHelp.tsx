import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import { industryShowcase } from "./homeData";

export default function WhoWeHelp() {
  const { book } = useModalCTA();
  return (
    <section className="who-we-help" aria-labelledby="who-help-title">
      <div className="container-gmg">
        <div className="who-help-stack-intro">
          <span className="eyebrow">Who we help</span>
          <h2 id="who-help-title">
            Built for the businesses that never stop moving.
          </h2>
          <p className="who-help-lead">
            Real work. Connected support. See how GMG fits the industry you
            serve.
          </p>
        </div>
        <div className="who-help-deck">
          {industryShowcase.map((industry) => (
            <article className="who-help-layer" key={industry.label}>
              <div className="who-help-card">
                <img
                  className="who-help-media"
                  src={industry.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.hidden = true;
                  }}
                />
                <div className="who-help-overlay" aria-hidden="true" />
                <div className="who-help-body">
                  <span className="who-help-icon" aria-hidden="true">
                    <Icon name={industry.icon} size={22} />
                  </span>
                  <h3 className="who-help-label">{industry.label}</h3>
                  <p className="who-help-blurb">{industry.blurb}</p>
                  <Link
                    className="who-help-link"
                    to={industry.to}
                    aria-label={`How GMG helps ${industry.label}`}
                  >
                    How GMG helps <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="who-help-cta-row">
          <div>
            <h3>Every industry. One connected system.</h3>
            <p>
              Built around your business, from the first inquiry to the people
              who follow through.
            </p>
          </div>
          <div className="who-help-cta-actions">
            <Link className="btn-dark-gmg" to="/industries">
              See all industries <Icon name="arrow" size={16} />
            </Link>
            <button
              type="button"
              className="who-help-cta-secondary"
              onClick={book({ subject: "Industry fit call" })}
            >
              Book a fit call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
