import { Icon } from "@/components/Icon";
import { Link } from "react-router-dom";
import { testimonials } from "./homeData";

export default function Testimonials() {
  return (
    <section
      className="testimonials section-gmg"
      aria-labelledby="testimonials-title"
    >
      <div className="container-gmg">
        <div className="test-head">
          <div>
            <span className="eyebrow">Loved by growing teams</span>
            <h2 id="testimonials-title">
              Don't just take{" "}
              <span className="accent-text">our word for it.</span>
            </h2>
          </div>
          <p className="test-summary-copy">
            Client perspectives on the people and systems behind their business.
          </p>
        </div>

        <div className="test-grid">
          {testimonials.map((t) => (
            <article className="test-card" key={t.name}>
              <div className="test-card-top">
                <span className="test-industry">{t.industry}</span>
              </div>
              <blockquote className="test-quote">“{t.quote}”</blockquote>
              <div className="test-author">
                {t.avatar ? (
                  <img
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                    }}
                    src={t.avatar}
                    alt={t.name}
                    className="test-avatar w-11 h-11 rounded-full object-cover border border-[#72e4d4]/30"
                    width="44"
                    height="44"
                    loading="lazy"
                  />
                ) : (
                  <span className="test-avatar" aria-hidden="true">
                    {t.name.charAt(0)}
                  </span>
                )}
                <span className="test-author-meta">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="test-foot">
          <p>
            Want results like these? Start with a free growth audit — no
            pressure, just a clear plan.
          </p>
          <Link className="btn-primary-gmg" to="/contact">
            Book your free growth audit <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
