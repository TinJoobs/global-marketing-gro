import { Link } from "react-router-dom";

const arrow = (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
);

const solutions = [
  {
    kicker: "For a more consistent sales process",
    title: "Sales Growth System",
    body: "Keep leads, conversations, appointments, and follow-up in one connected process. Give every opportunity a clear next step.",
    icon: "database",
    tags: ["CRM & automation", "Lead follow-up", "Custom scope"],
    to: "/solutions",
  },
  {
    kicker: "For more time to run your business",
    title: "Virtual Assistant Services",
    body: "Delegate the recurring work that fills your day. Get skilled support matched to your tasks, working hours, and business needs.",
    icon: "headset",
    tags: ["From $10/hour", "Philippines-based", "Matched to your needs"],
    to: "/solutions",
  },
];

const industries = [
  { label: "Home Services", id: "home-services" },
  { label: "Real Estate", id: "real-estate" },
  { label: "Insurance", id: "insurance" },
  { label: "Coaches & Consultants", id: "coaches-consultants" },
  { label: "Medical & Professional Practices", id: "medical-professional" },
  { label: "Restaurants & Hospitality", id: "restaurants-hospitality" },
];

const faqs = [
  {
    q: "Is the Sales Growth System only a CRM?",
    a: "No. The CRM is the central platform, but the service also includes strategy, workflow development, automation, follow-up processes, and optional Virtual Assistant support.",
  },
  {
    q: "How much do Virtual Assistant services cost?",
    a: "General Virtual Assistant support starts at $10 per hour. Specialized or certified support may require a different rate depending on the qualifications and scope of work required.",
  },
  {
    q: "Can I use Virtual Assistant services without purchasing the Sales Growth System?",
    a: "Yes. Virtual Assistant support can be used as a separate service or integrated with the Sales Growth System.",
  },
];

function IconBox({ variant = "" }: { variant?: string }) {
  return (
    <span className={`icon-box ${variant}`}>
      <svg
        className="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v3" />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                CRM automation + virtual assistants
              </span>
              <h1>
                More follow-through.
                <br />
                <span className="accent">More room to grow.</span>
              </h1>
              <p className="lead">
                Turn inquiries into next steps. Connect your sales process with
                the people who keep your business moving, so you can focus on
                what comes next.
              </p>
              <div className="actions">
                <Link className="btn btn-primary" to="/contact">
                  Book a free strategy call {arrow}
                </Link>
                <Link className="btn btn-outline" to="/#core-solutions">
                  Find your starting point {arrow}
                </Link>
              </div>
              <p className="hero-note">
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
                Start with your goals. Build around your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core solutions */}
      <section className="section" id="core-solutions">
        <div className="container">
          <div className="section-intro-row">
            <div className="section-head">
              <span className="eyebrow">Two ways to move forward</span>
              <h2>
                The right support.
                <br />
                For the work in front of you.
              </h2>
              <p>
                Start with a sales system, a Virtual Assistant, or bring them
                together.
              </p>
            </div>
            <Link className="text-link" to="/solutions">
              Compare services {arrow}
            </Link>
          </div>
          <div className="grid-2">
            {solutions.map((s) => (
              <article className="card solution-card" key={s.title}>
                <div className="card-top">
                  <IconBox variant="blue" />
                  <span className="solution-kicker">{s.kicker}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="micro-tags">
                  {s.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link className="text-link" to={s.to}>
                  Explore {s.title} {arrow}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="section pale" id="how-we-help">
        <div className="container">
          <div className="split">
            <div>
              <div className="section-head">
                <span className="eyebrow">Built around your business</span>
                <h2>
                  Less chasing.
                  <br />
                  More moving forward.
                </h2>
                <p>
                  Missed follow-ups, scattered information, and an overflowing
                  task list make growth harder than it needs to be.
                </p>
              </div>
              <p className="lead">
                We connect your CRM, follow-up process, and day-to-day support.
                Your team knows what needs to happen, who owns it, and what
                comes next.
              </p>
              <Link className="text-link" to="/how-it-works">
                See how it works {arrow}
              </Link>
            </div>
            <div className="delivery-list">
              <article>
                <span>01</span>
                <div>
                  <h3>Understand the work</h3>
                  <p>
                    We review your goals, workload, and current sales process.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Shape the right support</h3>
                  <p>
                    Agree on the systems, skills, responsibilities, and scope
                    you need.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Put it into practice</h3>
                  <p>
                    Get help with onboarding, coordination, and ongoing review.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section pale">
        <div className="container">
          <div className="section-intro-row">
            <div className="section-head">
              <span className="eyebrow">Who we support</span>
              <h2>
                Different businesses.
                <br />
                The same need for dependable support.
              </h2>
            </div>
            <Link className="text-link" to="/solutions">
              Explore all industries {arrow}
            </Link>
          </div>
          <div className="industry-links">
            {industries.map((i) => (
              <Link to="/solutions" key={i.id}>
                <span>{i.label}</span> {arrow}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="split top">
            <div>
              <div className="section-head">
                <span className="eyebrow">Before we talk</span>
                <h2>A little clarity goes a long way.</h2>
                <p>Understand the options before deciding on your next step.</p>
              </div>
              <Link className="text-link" to="/pricing">
                See pricing and support {arrow}
              </Link>
              <br />
              <Link className="text-link" to="/resources">
                Browse all questions {arrow}
              </Link>
            </div>
            <div className="faq-list">
              {faqs.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="faq-answer">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-wrap">
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="eyebrow">Your next step</span>
              <h2>Let&apos;s make the next step a clear one.</h2>
              <p>
                Tell us what is slowing your business down. We will help
                identify a useful starting point, whether that is a better sales
                process, dependable VA support, or both.
              </p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" to="/contact">
                Book a Free Strategy Call
              </Link>
              <Link className="secondary-cta" to="/contact">
                Or contact Global Marketing Group
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
