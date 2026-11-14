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
            <h2 id="testimonials-title">Don't just take our word for it.</h2>
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
                    className="test-avatar"
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

      </div>
    </section>
  );
}
