import { Icon } from "@/components/Icon";
import { Link } from "react-router-dom";
import { testimonials } from "./homeData";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="test-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          size={16}
          className={i < rating ? "is-filled" : "is-empty"}
        />
      ))}
    </div>
  );
}

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
          <div className="test-summary">
            <div className="test-summary-score">
              <span className="test-score">4.9</span>
              <Stars rating={5} />
            </div>
            <p className="test-summary-copy">
              Average rating across {testimonials.length} client industries —
              based on real outcomes, not vanity metrics.
            </p>
          </div>
        </div>

        <div className="test-grid">
          {testimonials.map((t) => (
            <article className="test-card" key={t.name}>
              <div className="test-card-top">
                <Stars rating={t.rating} />
                <span className="test-industry">{t.industry}</span>
              </div>
              <blockquote className="test-quote">“{t.quote}”</blockquote>
              <figcaption className="test-author">
                {t.avatar ? (
                  <img
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
              </figcaption>
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
