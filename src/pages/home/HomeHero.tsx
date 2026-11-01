import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import visual from "@/assets/platform-visual.html?raw";
import { initializeHero } from "@/lib/heroMotion";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import "@/hero.css";
export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { book } = useModalCTA();
  useEffect(() => {
    if (ref.current)
      return initializeHero(ref.current, document.getElementById("gmg-site"));
  }, []);
  return (
    <section className="hero-experience" ref={ref}>
      <div className="hero-atmosphere" aria-hidden="true">
        <canvas data-depth-canvas />
        <span className="ambient-glow glow-one" />
        <span className="ambient-glow glow-two" />
        <div className="perspective-grid" />
      </div>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker"><span/> SYSTEMS. PEOPLE. GROWTH.</span>
            <h1>Your business.<br/><span className="accent">In full flow.</span></h1>
            <p className="lead">
              Connected systems. Dedicated people. More room to grow.
              Bring your CRM, follow-up, and Philippines-based support team together—and get back to the work you love.
            </p>
            <div className="actions">
              <button
                className="btn-primary-gmg"
                type="button"
                onClick={book({ subject: "Free growth audit" })}
              >
                Book your free growth audit <Icon name="arrow" size={18} />
              </button>
              <Link className="btn-outline-gmg" to="/pricing">
                Explore the plans <Icon name="arrow" size={18} />
              </Link>
            </div>
            <p className="hero-note">
              <Icon name="check" size={16} />
              Built for growing businesses. Backed by real human support.
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: visual }} />
        </div>
        <a href="#connected-story" className="hero-scroll-link">
          <span className="scroll-line"/> Discover a more connected business <Icon name="arrow" size={16}/>
        </a>
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
