import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import { industryShowcase } from "./homeData";

export default function WhoWeHelp() {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { book } = useModalCTA();
  const move = (direction: number) =>
    rail.current?.scrollBy({
      left: rail.current.clientWidth * 0.8 * direction,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  return (
    <section
      className="who-we-help industry-carousel"
      aria-labelledby="who-help-title"
    >
      <div className="who-help-canvas" aria-hidden="true" />
      <div className="who-help-sticky">
        <div className="who-help-head container-gmg">
          <span className="eyebrow">Who we help</span>
          <h2 id="who-help-title">
            Built for the businesses that{" "}
            <span className="accent-text">never stop moving.</span>
          </h2>
          <p className="who-help-lead">
            Real work. Connected support. Explore how GMG fits your industry.
          </p>
        </div>
        <div className="industry-controls container-gmg">
          <span>Swipe, scroll, or use the arrows to explore</span>
          <div>
            <button
              type="button"
              aria-label="Previous industries"
              onClick={() => move(-1)}
            >
              <Icon name="arrow" className="industry-previous" size={19} />
            </button>
            <button
              type="button"
              aria-label="Next industries"
              onClick={() => move(1)}
            >
              <Icon name="arrow" size={19} />
            </button>
          </div>
        </div>
        <div
          className="industry-rail"
          ref={rail}
          role="region"
          aria-label="Industries carousel"
          tabIndex={0}
          onScroll={(event) => {
            const el = event.currentTarget;
            const max = el.scrollWidth - el.clientWidth;
            setProgress(max > 0 ? el.scrollLeft / max : 0);
          }}
        >
          {industryShowcase.map((industry) => (
            <article className="who-help-panel" key={industry.label}>
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
                <span className="who-help-icon">
                  <Icon name={industry.icon} size={26} />
                </span>
                <h3 className="who-help-label">{industry.label}</h3>
                <p className="who-help-blurb">{industry.blurb}</p>
                <Link className="who-help-link" to={industry.to}>
                  How GMG helps <Icon name="arrow" size={16} />
                </Link>
              </div>
            </article>
          ))}
          <article className="who-help-panel who-help-cta">
            <div className="who-help-body">
              <span className="who-help-icon">
                <Icon name="globe" size={26} />
              </span>
              <h3 className="who-help-label">
                Every industry. One connected system.
              </h3>
              <p className="who-help-blurb">
                Built around your business, from the first inquiry to the people
                who follow through.
              </p>
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
          </article>
        </div>
        <div className="industry-progress container-gmg" aria-hidden="true">
          <span>
            <i
              style={{
                transform: `scaleX(${0.08 + Math.min(1, Math.max(0, progress)) * 0.92})`,
              }}
            />
          </span>
          <small>
            {industryShowcase.length} industries. One connected team.
          </small>
        </div>
      </div>
    </section>
  );
}
