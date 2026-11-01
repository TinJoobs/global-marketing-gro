import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import { industryShowcase } from "./homeData";

export default function WhoWeHelp() {
  const { book } = useModalCTA();
  return (
    <section
      className="who-we-help industry-stack"
      aria-labelledby="who-help-title"
      style={
        {
          ["--deck-count" as string]: industryShowcase.length + 1,
        } as React.CSSProperties
      }
    >
      <span className="who-help-canvas" aria-hidden="true" />
      <div className="who-help-stack-viewport">
        <div className="who-help-stack-intro container-gmg">
          <span className="eyebrow">Who we help</span>
          <h2 id="who-help-title">
            Built for the businesses that{" "}
            <span className="accent-text">never stop moving.</span>
          </h2>
          <p className="who-help-lead">
            Real work. Connected support. Scroll through the industries we serve
            and see how GMG fits yours.
          </p>
        </div>
        <div className="who-help-deck">
          {industryShowcase.map((industry, index) => (
            <article
              className="who-help-layer"
              key={industry.label}
              style={{ ["--stack-index" as string]: index }}
            >
              <div className="who-help-card">
                <img
                  className="who-help-media"
                  src={industry.image}
                  alt={industry.label}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.hidden = true;
                  }}
                />
                <div className="who-help-overlay" aria-hidden="true" />
                <div className="who-help-body">
                  <span className="who-help-count">{`0${index + 1}`}</span>
                  <span className="who-help-icon">
                    <Icon name={industry.icon} size={26} />
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
          <article
            className="who-help-layer who-help-cta-layer"
            style={{ ["--stack-index" as string]: industryShowcase.length }}
          >
            <div className="who-help-card who-help-cta">
              <div className="who-help-body who-help-cta-body">
                <span className="who-help-icon who-help-icon-cta">
                  <Icon name="globe" size={26} />
                </span>
                <h3 className="who-help-label">
                  Every industry. One connected system.
                </h3>
                <p className="who-help-blurb">
                  Built around your business, from the first inquiry to the
                  people who follow through.
                </p>
                <div className="who-help-cta-actions">
                  <Link className="btn-primary-gmg" to="/industries">
                    See all industries <Icon name="arrow" size={16} />
                  </Link>
                  <button
                    type="button"
                    className="who-help-cta-secondary"
                    onClick={book({ subject: "Industry fit call" })}
                  >
                    or book a fit call <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
