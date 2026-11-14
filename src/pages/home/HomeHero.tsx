import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import { heroSlides, heroVideo } from "@/data/heroMedia";
import "@/hero.css";

const SLIDE_MS = 7000;

export default function HomeHero() {
  const { book } = useModalCTA();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (paused || heroVideo || heroSlides.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>(".cinema-video");
    if (!video) return;
    if (paused) video.pause();
    else void video.play().catch(() => undefined);
  }, [paused]);

  return (
    <section
      className="hero-cinema"
      data-paused={paused ? "true" : undefined}
      aria-labelledby="home-hero-title"
    >
      <div className="cinema-media" aria-hidden="true">
        {heroVideo ? (
          <video
            className="cinema-video"
            src={heroVideo.src}
            poster={heroVideo.poster}
            autoPlay={!paused}
            muted
            loop
            playsInline
          />
        ) : (
          heroSlides.map((slide, i) => (
            <img
              key={slide.src + i}
              className={`cinema-slide${i === index ? " is-active" : ""}`}
              src={slide.src}
              alt=""
              style={{ objectPosition: slide.position }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />
          ))
        )}
        <span className="cinema-shade" />
      </div>

      <div className="container-gmg cinema-inner">
        <div className="cinema-copy">
          <p className="cinema-kicker">Global Marketing Group</p>
          <h1 id="home-hero-title">
            We keep your leads answered and your follow-up moving.
          </h1>
          <p className="cinema-lead">
            A trained assistant from our team in the Philippines, working inside
            one organized CRM built around how your business already runs.
          </p>
          <div className="cinema-actions">
            <button
              className="btn-primary-gmg"
              type="button"
              onClick={book({ subject: "Quick Hire / EA Discovery Call" })}
            >
              Quick hire services
            </button>
            <button
              className="btn-outline-gmg"
              type="button"
              onClick={book({ subject: "Schedule A Demo" })}
            >
              Schedule a demo
            </button>
          </div>
        </div>

        <div className="cinema-foot">
          <ul className="cinema-proof">
            <li>One organized CRM</li>
            <li>Connected follow-up</li>
            <li>Philippines-based support</li>
            <li>
              <Link to="/pricing">
                Plans from <strong>$597/month</strong>
              </Link>
            </li>
          </ul>
          {!heroVideo && heroSlides.length < 2 ? null : (
            <button
              type="button"
              className="cinema-pause"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              <Icon name={paused ? "play" : "pause"} size={14} />
              {paused ? "Play background" : "Pause background"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
