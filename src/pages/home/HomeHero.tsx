import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { useModalCTA } from "@/components/modal/useModalCTA";
import { heroImage } from "@/data/heroMedia";
import "@/hero.css";

const columns = [
  {
    stage: "New lead",
    cards: [
      {
        name: "Dana Reyes",
        source: "Website form",
        value: "$2,400",
        time: "2m ago",
      },
      {
        name: "Marco Ellis",
        source: "Facebook ad",
        value: "$1,150",
        time: "18m ago",
      },
      {
        name: "Priya Nair",
        source: "Missed call",
        value: "$860",
        time: "1h ago",
      },
    ],
  },
  {
    stage: "Contacted",
    cards: [
      {
        name: "Sam Whitaker",
        source: "Referral",
        value: "$3,200",
        time: "Today",
      },
      { name: "Lena Ortiz", source: "Google", value: "$940", time: "Today" },
    ],
  },
  {
    stage: "Appointment booked",
    cards: [
      {
        name: "Tom Becker",
        source: "Website form",
        value: "$4,750",
        time: "Tue",
      },
      { name: "Ava Kim", source: "Instagram", value: "$1,600", time: "Wed" },
    ],
  },
  {
    stage: "Won",
    cards: [
      { name: "Chris Dunn", source: "Referral", value: "$5,200", time: "Mon" },
    ],
  },
];

export default function HomeHero() {
  const { book } = useModalCTA();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!fine?.matches || reduced?.matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        el.style.setProperty("--tx", `${((x - 0.5) * 6).toFixed(2)}deg`);
        el.style.setProperty("--ty", `${((0.5 - y) * 4).toFixed(2)}deg`);
      });
    };
    const leave = () => {
      el.style.setProperty("--tx", "0deg");
      el.style.setProperty("--ty", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <section
      className="hero-cinema"
      ref={ref}
      aria-labelledby="home-hero-title"
    >
      <div className="cinema-media" aria-hidden="true">
        <img src={heroImage} alt="" fetchPriority="high" decoding="async" />
        <span className="cinema-shade" />
        <span className="cinema-spot" />
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
          <p className="cinema-price">
            Plans from <Link to="/pricing">$597/month</Link>.
          </p>
        </div>

        <figure
          className="crm-shot"
          aria-label="Example of a sales pipeline inside the CRM"
        >
          <div className="crm-window">
            <div className="crm-top">
              <span className="crm-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="crm-title">Opportunities</span>
              <span className="crm-search" aria-hidden="true">
                <Icon name="search" size={14} /> Search contacts
              </span>
            </div>
            <div className="crm-body">
              <nav className="crm-side" aria-hidden="true">
                {(
                  [
                    "chart",
                    "users",
                    "message",
                    "calendar",
                    "workflow",
                    "settings",
                  ] as const
                ).map((n, i) => (
                  <span key={n} className={i === 0 ? "is-on" : ""}>
                    <Icon name={n} size={16} />
                  </span>
                ))}
              </nav>
              <div className="crm-board">
                <div className="crm-board-head">
                  <strong>Sales pipeline</strong>
                  <span>10 open opportunities</span>
                </div>
                <div className="crm-cols">
                  {columns.map((col) => (
                    <div className="crm-col" key={col.stage}>
                      <div className="crm-col-head">
                        {col.stage}
                        <b>{col.cards.length}</b>
                      </div>
                      {col.cards.map((c) => (
                        <div className="crm-card" key={c.name}>
                          <div className="crm-card-row">
                            <span className="crm-avatar">
                              {c.name
                                .split(" ")
                                .map((p) => p[0])
                                .join("")}
                            </span>
                            <strong>{c.name}</strong>
                          </div>
                          <div className="crm-card-meta">
                            <span>{c.source}</span>
                            <span>{c.value}</span>
                          </div>
                          <span className="crm-card-time">{c.time}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="crm-toast" aria-hidden="true">
            <span className="crm-toast-icon">
              <Icon name="calendar" size={16} />
            </span>
            <span>
              <strong>Appointment booked</strong>
              Tom Becker, Tuesday at 10:30 AM
            </span>
          </div>
          <figcaption>
            Sample data. Your pipeline is built around your stages.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
