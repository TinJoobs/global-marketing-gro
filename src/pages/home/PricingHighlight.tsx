import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { packages, pricingTerms } from "@/data/packages";
import { useModalCTA } from "@/components/modal/useModalCTA";

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export default function PricingHighlight() {
  const { book } = useModalCTA();
  return (
    <section
      className="section-gmg pricing-highlight"
      aria-labelledby="pricing-highlight-title"
    >
      <div className="container-gmg">
        <div className="pricing-highlight-head">
          <span className="eyebrow">Simple plans. Real support.</span>
          <h2 id="pricing-highlight-title">
            Choose the support your business needs.
          </h2>
          <p className="pricing-highlight-lead">
            Start with automation. Add dedicated people and operational support
            as you grow. No guesswork, no surprises.
          </p>
        </div>

        <div className="pricing-highlight-grid">
          {packages.map((p) => (
            <article
              className={`price-card${p.popular ? " is-popular" : ""}`}
              key={p.slug}
            >
              <div className="price-badge-slot">
                {p.popular && (
                  <span className="price-popular-badge">
                    <Icon name="star" size={14} /> Most popular
                  </span>
                )}
              </div>
              <div className="price-card-glow" aria-hidden="true" />
              <div className="price-card-top">
                <span className="price-tier">{p.name}</span>
                <p className="price-tagline">{p.tagline}</p>
              </div>
              <div className="price-amount">
                <span className="price-amount-main">
                  {money(p.monthly)}
                  <small>/mo</small>
                </span>
                <span className="price-setup">
                  + {money(p.setup)} one-time setup
                </span>
              </div>
              <ul className="price-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={16} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="price-card-cta">
                {p.popular ? (
                  <button
                    type="button"
                    className="btn-primary-gmg"
                    onClick={book({
                      plan: p.slug,
                      billing: "monthly",
                      subject: `${p.name} plan consultation`,
                    })}
                  >
                    Get started with {p.name} <Icon name="arrow" size={16} />
                  </button>
                ) : (
                  <Link
                    className="btn-outline-gmg"
                    to={`/contact?plan=${p.slug}&billing=monthly`}
                  >
                    Explore {p.name} <Icon name="arrow" size={16} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="pricing-highlight-foot">
          <p>
            {pricingTerms.minimum_months}-month minimum. Setup is billed at
            signing. Annual plans save {pricingTerms.annual_discount_percent}%.
          </p>
          <Link className="text-link" to="/pricing">
            Compare every feature and add-on <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
