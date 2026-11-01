import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import { industryShowcase } from "./homeData";

export default function WhoWeHelp() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const { book } = useModalCTA();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progressScale = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 820px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      if (!desktop.matches || reduced.matches) {
        setEnabled(false);
        setDistance(0);
        return;
      }
      setEnabled(true);
      requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      });
    };
    measure();
    desktop.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      desktop.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const Panels = ({ forTrack }: { forTrack?: boolean }) => (
    <>
      {industryShowcase.map((industry) => (
        <article
          className={`who-help-panel${forTrack ? "" : " is-static"}`}
          key={industry.label}
        >
          <div
            className="who-help-media"
            style={{ backgroundImage: `url(${industry.image})` }}
            role="img"
            aria-label={`${industry.label} — ${industry.blurb}`}
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
      <article
        className={`who-help-panel who-help-cta${forTrack ? "" : " is-static"}`}
      >
        <div className="who-help-body">
          <span className="who-help-icon who-help-icon-cta">
            <Icon name="globe" size={26} />
          </span>
          <h3 className="who-help-label">
            Every industry. One connected system.
          </h3>
          <p className="who-help-blurb">
            From lead capture to follow-up to the people behind it — built
            around how your business actually works.
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
    </>
  );

  return (
    <section
      ref={containerRef}
      className="who-we-help"
      aria-labelledby="who-help-title"
      style={enabled ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="who-help-glow" aria-hidden="true" />
      <div className="who-help-sticky">
        <div className="who-help-head container-gmg">
          <span className="eyebrow">Who we help</span>
          <h2 id="who-help-title">
            Built for the businesses that{" "}
            <span className="accent-text">never stop moving.</span>
          </h2>
          <p className="who-help-lead">
            Scroll through the real work we support — then see it connected to
            one system and one team behind it.
          </p>
        </div>

        {enabled ? (
          <div className="who-help-viewport">
            <motion.div ref={trackRef} className="who-help-track" style={{ x }}>
              <Panels forTrack />
            </motion.div>
          </div>
        ) : (
          <div className="who-help-grid container-gmg">
            <Panels />
          </div>
        )}

        <div className="who-help-bar container-gmg" aria-hidden={!enabled}>
          <span className="who-help-bar-label">
            Scroll to explore industries
          </span>
          <span className="who-help-bar-track">
            <motion.span
              className="who-help-bar-fill"
              style={{ width: progressScale }}
            />
          </span>
          <span className="who-help-bar-count">
            {industryShowcase.length} industries
          </span>
        </div>
      </div>
    </section>
  );
}
