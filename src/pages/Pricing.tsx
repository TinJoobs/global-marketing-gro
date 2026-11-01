import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { PageHero, SectionHead, CTASection } from "@/components/sections";
import { packages, addonBoosts, pricingTerms } from "@/data/packages";

const money = (amount: number, cents = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(amount);

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const annual = billing === "annual";
  return (
    <div>
      <PageHero
        simple
        eyebrow="Pricing & support"
        title={
          <>
            Simple Plans. Real Support.
            <br />
            <span className="text-primary">No Guesswork.</span>
          </>
        }
        lead="Automation plus offshore talent, packaged into three clear plans. Upgrade anytime as you grow."
        note={pricingTerms.target_audience}
      />
      <section className="section-gmg" aria-labelledby="plans-title">
        <div className="container-gmg">
          <h2 id="plans-title" className="sr-only">
            Choose your plan
          </h2>
          <div
            className="flex flex-wrap justify-center gap-3 mb-5"
            role="group"
            aria-label="Billing frequency"
          >
            <button
              type="button"
              className={annual ? "btn-outline-gmg" : "btn-primary-gmg"}
              aria-pressed={!annual}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={annual ? "btn-primary-gmg" : "btn-outline-gmg"}
              aria-pressed={annual}
              onClick={() => setBilling("annual")}
            >
              Annual — save 10%
            </button>
          </div>
          <p
            className="text-center text-sm text-muted-foreground mb-12"
            role="status"
          >
            {annual
              ? "Annual service paid upfront. Monthly equivalent shown below; setup billed separately at signing."
              : "Monthly service pricing. Setup billed separately at signing."}
          </p>
          <div className="grid lg:grid-cols-3 gap-7 items-stretch">
            {packages.map((plan) => {
              const monthlyEquivalent = annual
                ? plan.monthly *
                  (1 - pricingTerms.annual_discount_percent / 100)
                : plan.monthly;
              return (
                <article
                  key={plan.slug}
                  aria-label={`${plan.name} plan`}
                  className={`card-gmg plan-card flex flex-col relative ${plan.popular ? "border-primary" : ""}`}
                >
                  <div className="plan-heading">
                  <div className="plan-badge-slot">
                  {plan.popular && (
                    <span className="eyebrow mb-4">Most popular</span>
                  )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-7 min-h-12">
                    {plan.tagline}
                  </p>
                  </div>
                  <div className="mb-3">
                    <span className="text-4xl xl:text-5xl font-bold">
                      {money(monthlyEquivalent, annual)}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      /month{annual ? " equivalent" : ""}
                    </span>
                  </div>
                  {annual && (
                    <p className="font-semibold mb-3">
                      {money(monthlyEquivalent * 12, true)} billed annually
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground pb-6 border-b border-border">
                    {money(plan.setup)} one-time setup · due at signing
                  </p>
                  <ul className="space-y-4 my-7 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm leading-relaxed"
                      >
                        <Check
                          aria-hidden="true"
                          className="text-primary w-5 h-5 shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?plan=${plan.slug}&billing=${billing}`}
                    className={
                      plan.popular
                        ? "btn-primary-gmg justify-center"
                        : "btn-outline-gmg justify-center"
                    }
                  >
                    Choose {plan.name}
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="text-center mt-8 space-y-2 text-muted-foreground text-sm">
            <p>
              All plans require a {pricingTerms.minimum_months}-month minimum
              term. {pricingTerms.setup_due}
            </p>
            <p>
              {pricingTerms.custom_note}{" "}
              <Link to="/contact?plan=custom" className="text-link">
                Discuss a custom plan
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="section-gmg bg-secondary/30">
        <div className="container-gmg">
          <SectionHead
            eyebrow="Add-on boosts"
            title="More support, when you need it."
            subtitle="Attach to any plan to expand your account as you grow."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {addonBoosts.map((boost) => (
              <article className="card-gmg" key={boost.slug}>
                <h3 className="font-bold text-lg mb-3">{boost.name}</h3>
                <p className="text-2xl font-bold">
                  {money(boost.monthly)}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    /month
                  </span>
                </p>
                {boost.spend_extra && (
                  <p className="text-sm text-muted-foreground mt-2">
                    + advertising spend
                  </p>
                )}
              </article>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            We’ll confirm service scope, usage costs, and any third-party
            charges before you sign. The annual discount applies to plan service
            pricing; setup remains separate.
          </p>
        </div>
      </section>
      <CTASection
        title="Ready to Stop Losing Leads?"
        body="Tell us where your business needs support. We’ll help you choose the right plan."
        primaryLabel="Book Your Free Growth Audit"
      />
    </div>
  );
}
