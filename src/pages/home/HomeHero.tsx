import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { initializeHero } from "@/lib/heroMotion";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import { Hero3DScene } from "@/components/hero3d/Hero3DScene";
import "@/hero.css";
import "@/components/hero3d/hero3d.css";
export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { book } = useModalCTA();
  useEffect(() => {
    if (ref.current)
      return initializeHero(ref.current, document.getElementById("gmg-site"));
  }, []);
  return (
    <section className="hero-experience hero-experience--3d" ref={ref}>
      <div className="hero-atmosphere" aria-hidden="true">
        <canvas data-depth-canvas />
        <span className="ambient-glow glow-one" />
        <span className="ambient-glow glow-two" />
        <div className="perspective-grid" />
      </div>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span /> Global Marketing Group
            </span>
            <h1>Delegate smarter, not harder.</h1>
            <p className="lead">
              AI-enhanced executive assistants and an all-in-one CRM that
              automate workflows, streamline operations, and free you to focus
              on scaling your business.
            </p>
            <div className="actions">
              <button
                className="btn-primary-gmg"
                type="button"
                onClick={book({ subject: "Quick Hire / EA Discovery Call" })}
              >
                Quick hire services <Icon name="arrow" size={18} />
              </button>
              <button
                className="btn-outline-gmg"
                type="button"
                onClick={book({ subject: "Schedule A Demo" })}
              >
                Schedule a demo <Icon name="calendar" size={18} />
              </button>
            </div>
            <p className="hero-note">
              <Icon name="check" size={16} />
              Built for growing businesses. Backed by real human support.
            </p>
          </div>
          <div className="hero-3d-slot">
            <Hero3DScene variant="philippines" />
          </div>
        </div>
        <div className="hero-proof-strip">
          <div>
            <Icon name="database" />
            One organized CRM
          </div>
          <div>
            <Icon name="workflow" />
            Connected follow-up
          </div>
          <div>
            <Icon name="headset" />
            Philippines-based support
          </div>
          <Link to="/pricing">
            Plans from <strong>$597/month</strong>
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
