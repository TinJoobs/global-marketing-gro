import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { calculateMissedRevenue } from "@/lib/revenueCalculator";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const sliders = [
  {
    key: "inquiries",
    label: "Inquiries per month",
    min: 0,
    max: 1000,
    step: 10,
    format: (v: number) => `${v}`,
  },
  {
    key: "unfollowed",
    label: "Never followed up",
    min: 0,
    max: 100,
    step: 1,
    format: (v: number) => `${v}%`,
  },
  {
    key: "closeRate",
    label: "Could close with follow-up",
    min: 0,
    max: 100,
    step: 1,
    format: (v: number) => `${v}%`,
  },
  {
    key: "saleValue",
    label: "Average sale value",
    min: 0,
    max: 20000,
    step: 50,
    format: (v: number) => usd.format(v),
  },
] as const;

type Key = (typeof sliders)[number]["key"];

export default function HomeCalculator() {
  const id = useId();
  const [values, setValues] = useState<Record<Key, number>>({
    inquiries: 100,
    unfollowed: 30,
    closeRate: 20,
    saleValue: 500,
  });
  const result = calculateMissedRevenue({
    inquiries: String(values.inquiries),
    unfollowed: String(values.unfollowed),
    closeRate: String(values.closeRate),
    saleValue: String(values.saleValue),
  });
  const monthly = result.ok ? result.monthlyOpportunity : 0;
  const leads = result.ok ? result.neglectedLeads : 0;

  return (
    <section className="section-gmg home-calc" aria-labelledby={`${id}-title`}>
      <div className="container-gmg">
        <div className="home-calc-grid">
          <div className="home-calc-intro">
            <h2 id={`${id}-title`}>
              How much revenue slips through the cracks?
            </h2>
            <p>
              Move the sliders to match a typical month. The estimate updates as
              you go. Nothing is sent anywhere.
            </p>
            <Link className="text-link" to="/missed-revenue-calculator">
              Open the full calculator and checklist
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="home-calc-panel">
            <div className="home-calc-controls">
              {sliders.map((s) => {
                const pct = ((values[s.key] - s.min) / (s.max - s.min)) * 100;
                return (
                  <div className="calc-row" key={s.key}>
                    <div className="calc-row-head">
                      <label htmlFor={`${id}-${s.key}`}>{s.label}</label>
                      <output htmlFor={`${id}-${s.key}`}>
                        {s.format(values[s.key])}
                      </output>
                    </div>
                    <input
                      id={`${id}-${s.key}`}
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={values[s.key]}
                      style={{ ["--fill" as string]: `${pct}%` }}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          [s.key]: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="home-calc-result" aria-live="polite">
              <span className="calc-result-label">
                Estimated revenue missed each month
              </span>
              <strong className="calc-result-value">
                {usd.format(monthly)}
              </strong>
              <span className="calc-result-sub">
                {Math.round(leads).toLocaleString("en-US")} inquiries a month
                get no reply. That is about {usd.format(monthly * 12)} a year.
              </span>
              <p className="calc-result-note">
                An estimate from your own numbers, not a guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
