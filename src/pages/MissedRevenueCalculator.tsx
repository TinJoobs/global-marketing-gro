import { Hero3DLayout } from "@/components/sections";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calculator, Check, ShieldCheck } from "lucide-react";
import {
  calculateMissedRevenue,
  isValidSignupEmail,
  requestFollowUpGuidance,
  SIGNUP_CONSENT,
  type RevenueInputs,
} from "@/lib/revenueCalculator";
import "./MissedRevenueCalculator.css";

const fields: {
  key: keyof RevenueInputs;
  label: string;
  hint: string;
  unit: string;
}[] = [
  {
    key: "inquiries",
    label: "Monthly inquiries",
    hint: "New inquiries in a typical month. Whole numbers, 0–1,000,000.",
    unit: "leads",
  },
  {
    key: "unfollowed",
    label: "Inquiries never followed up (%)",
    hint: "The share that receives no follow-up. Enter 0–100.",
    unit: "%",
  },
  {
    key: "closeRate",
    label: "Estimated close rate among neglected leads (%)",
    hint: "The share of neglected leads you think could buy with follow-up. Enter 0–100.",
    unit: "%",
  },
  {
    key: "saleValue",
    label: "Average sale value (USD)",
    hint: "One average sale, before costs. Enter $0–$1 billion without commas.",
    unit: "USD",
  },
];
const checklist = [
  "Assign an owner to every new inquiry.",
  "Set a first-response target and a follow-up reminder.",
  "Review unanswered leads and record the next step each week.",
];
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function MissedRevenueCalculator() {
  const [inputs, setInputs] = useState<RevenueInputs>({
    inquiries: "100",
    unfollowed: "30",
    closeRate: "20",
    saleValue: "500",
  });
  const result = calculateMissedRevenue(inputs);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [signupErrors, setSignupErrors] = useState<{
    email?: string;
    consent?: string;
  }>({});
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const errorSummary = useRef<HTMLDivElement>(null);

  async function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending" || status === "success") return;
    const errors = {
      ...(!isValidSignupEmail(email) && {
        email: "Enter a valid email address.",
      }),
      ...(!consent && {
        consent: "Please opt in before requesting email guidance.",
      }),
    };
    setSignupErrors(errors);
    if (Object.keys(errors).length) {
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    setStatus("pending");
    try {
      await requestFollowUpGuidance(email, consent);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="revenue-calculator">
      <section className="revenue-hero">
        <div className="container-gmg">
          <Hero3DLayout variant="calculator">
          <span className="revenue-eyebrow">
            <Calculator size={16} aria-hidden="true" /> Find the opportunity in
            your inbox
          </span>
          <h1>
            Missed revenue
            <br />
            <span>calculator</span>
          </h1>
          <p>
            More leads aren't always the answer. See what consistent follow-up
            could mean for the inquiries you already have.
          </p>
          <span className="revenue-reassurance">
            <ShieldCheck size={16} aria-hidden="true" /> Free to use. No email
            needed to calculate.
          </span>
        </Hero3DLayout>
        </div>
      </section>

      <section
        className="container-gmg revenue-workspace"
        aria-label="Revenue opportunity calculator"
      >
        <div className="card-gmg revenue-inputs">
          <span className="revenue-step">01 / Your numbers</span>
          <h2>What does a typical month look like?</h2>
          <p id="example-note">
            The default numbers are illustrative examples. Replace them with
            your own estimates; zero is valid.
          </p>
          <div className="revenue-fields" aria-describedby="example-note">
            {fields.map(({ key, label, hint, unit }) => {
              const error =
                result.ok === false ? result.errors[key] : undefined;
              return (
                <div key={key} className="revenue-field">
                  <label htmlFor={`revenue-${key}`}>{label}</label>
                  <div className="revenue-input-wrap">
                    <input
                      id={`revenue-${key}`}
                      type="text"
                      inputMode={key === "inquiries" ? "numeric" : "decimal"}
                      value={inputs[key]}
                      maxLength={24}
                      onChange={(event) =>
                        setInputs({ ...inputs, [key]: event.target.value })
                      }
                      aria-invalid={!!error}
                      aria-describedby={`revenue-${key}-hint${error ? ` revenue-${key}-error` : ""}`}
                    />
                    <span aria-hidden="true">{unit}</span>
                  </div>
                  <p id={`revenue-${key}-hint`} className="revenue-hint">
                    {hint}
                  </p>
                  {error && (
                    <p
                      id={`revenue-${key}-error`}
                      className="revenue-error"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="revenue-result-column">
          <div className="card-gmg revenue-result">
            <span className="revenue-step">02 / The potential</span>
            <h2>Estimated monthly lost opportunity</h2>
            <div aria-live="polite" aria-atomic="true">
              {result.ok ? (
                <>
                  <output
                    aria-label="Estimated monthly lost opportunity"
                    className="revenue-total"
                  >
                    {usd.format(result.monthlyOpportunity)}
                  </output>
                  <p className="revenue-result-detail">
                    Based on approximately{" "}
                    {new Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 2,
                    }).format(result.neglectedLeads)}{" "}
                    neglected inquiries per month.
                  </p>
                </>
              ) : (
                <p className="revenue-result-detail">
                  Update the highlighted fields to see your estimate.
                </p>
              )}
            </div>
            <p className="revenue-disclaimer">
              This is an estimated sales opportunity, not guaranteed actual lost
              revenue or a promise of results.
            </p>
            <details className="revenue-assumptions" open>
              <summary>How this estimate works</summary>
              <p>
                Monthly inquiries × (never followed up % ÷ 100) × (estimated
                close rate % ÷ 100) × average sale value.
              </p>
              <p>
                Assumes neglected inquiries resemble your other leads and could
                convert at your estimated rate with follow-up. Uses one sale per
                converted inquiry, before costs. It excludes repeat sales,
                seasonality, duplicate leads, and the cost of follow-up. Actual
                results may be lower or higher.
              </p>
            </details>
            <Link
              className="btn-primary-gmg revenue-consult"
              to="/contact?service=lead-follow-up"
            >
              Book a consultation <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="revenue-checklist">
            <span className="revenue-step">03 / Start closing the gap</span>
            <h2>A simple follow-up checklist</h2>
            <p>
              Use this checklist during your visit. Progress resets when you
              leave this page.
            </p>
            {checklist.map((item, index) => (
              <label key={item} className="revenue-check">
                <input type="checkbox" name={`follow-up-${index}`} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section
        className="container-gmg revenue-signup-section"
        aria-labelledby="guidance-title"
      >
        <div className="card-gmg revenue-signup">
          <div>
            <span className="revenue-step">Keep the conversation moving</span>
            <h2 id="guidance-title">Make follow-up a habit.</h2>
            <p>
              Want help putting the next step into practice? Opt in to request
              follow-up guidance from Global Marketing Group.
            </p>
            <p className="revenue-hint">
              Your calculator values are not included in this signup.
            </p>
          </div>
          <form
            onSubmit={signup}
            noValidate
            aria-label="Request follow-up guidance"
            aria-busy={status === "pending"}
          >
            {Object.keys(signupErrors).length > 0 && (
              <div
                ref={errorSummary}
                tabIndex={-1}
                role="alert"
                className="revenue-error-summary"
              >
                Please check the following:{" "}
                {signupErrors.email && (
                  <a href="#guidance-email">Email address</a>
                )}
                {signupErrors.email && signupErrors.consent && ", "}
                {signupErrors.consent && (
                  <a href="#guidance-consent">Email consent</a>
                )}
                .
              </div>
            )}
            <label htmlFor="guidance-email">Email address</label>
            <input
              id="guidance-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              value={email}
              disabled={status === "pending" || status === "success"}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={!!signupErrors.email}
              aria-describedby={
                signupErrors.email ? "guidance-email-error" : undefined
              }
            />
            {signupErrors.email && (
              <p id="guidance-email-error" className="revenue-error">
                {signupErrors.email}
              </p>
            )}
            <label className="revenue-check revenue-consent">
              <input
                id="guidance-consent"
                type="checkbox"
                required
                checked={consent}
                disabled={status === "pending" || status === "success"}
                onChange={(event) => setConsent(event.target.checked)}
                aria-invalid={!!signupErrors.consent}
                aria-describedby={
                  signupErrors.consent ? "guidance-consent-error" : undefined
                }
              />
              <span>{SIGNUP_CONSENT}</span>
            </label>
            {signupErrors.consent && (
              <p id="guidance-consent-error" className="revenue-error">
                {signupErrors.consent}
              </p>
            )}
            <p className="revenue-hint">
              See our <Link to="/privacy">Privacy Policy</Link> for how we
              handle your information.
            </p>
            <button
              className="btn-primary-gmg"
              type="submit"
              disabled={status === "pending" || status === "success"}
            >
              {status === "pending" ? (
                "Submitting…"
              ) : status === "success" ? (
                <>
                  <Check size={18} aria-hidden="true" /> Request received
                </>
              ) : (
                "Request follow-up guidance"
              )}
            </button>
            {status === "success" && (
              <p role="status" className="revenue-success">
                Request received. Thank you for your interest in follow-up
                guidance.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="revenue-error">
                We could not receive your request. Please try again, or{" "}
                <Link to="/contact?service=lead-follow-up">contact us</Link>.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
