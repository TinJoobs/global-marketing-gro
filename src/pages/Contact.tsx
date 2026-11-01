import { useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buildTrackingPayload } from "@/lib/tracking";
import { packages, pricingTerms } from "@/data/packages";

const consentText =
  "I agree that Global Marketing Group may contact me by email about this consultation request.";
const money = (amount: number, cents = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(amount);
const labels = {
  name: "Full name",
  email: "Email address",
  subject: "Subject",
  message: "What would you like help with?",
  consent: "Contact consent",
};
type Field = keyof typeof labels;

export default function Contact() {
  const [params] = useSearchParams();
  const plan = packages.find((item) => item.slug === params.get("plan"));
  const annual = params.get("billing") === "annual";
  const leadFollowUp = params.get("service") === "lead-follow-up";
  const monthly = plan
    ? plan.monthly *
      (annual ? 1 - pricingTerms.annual_discount_percent / 100 : 1)
    : 0;
  const planContext = plan
    ? `${plan.name}: ${money(monthly, annual)} /month${annual ? " equivalent" : ""}${annual ? `; ${money(monthly * 12, true)} billed annually` : ""}; ${money(plan.setup)} one-time setup due at signing; ${pricingTerms.minimum_months}-month minimum term.`
    : params.get("plan") === "custom"
      ? "Custom plan consultation; pricing and scope to be discussed."
      : "";
  const initialSubject = leadFollowUp
    ? "Lead follow-up growth audit"
    : plan
      ? `${plan.name} plan consultation`
      : params.get("plan") === "custom"
        ? "Custom plan consultation"
        : "";
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const errorSummary = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending" || status === "success") return;
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      subject: String(form.get("subject") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
    };
    const nextErrors: Partial<Record<Field, string>> = {};
    if (!values.name || values.name.length > 100)
      nextErrors.name = "Enter your name (up to 100 characters).";
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
      values.email.length > 254
    )
      nextErrors.email = "Enter a valid email address.";
    if (!values.subject || values.subject.length > 200)
      nextErrors.subject = "Enter a subject (up to 200 characters).";
    if (!values.message || values.message.length > 5000)
      nextErrors.message =
        "Tell us what you need help with (up to 5,000 characters).";
    if (form.get("consent") !== "on")
      nextErrors.consent = "Please agree to email contact about your request.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    setStatus("pending");
    const notes = [
      values.message,
      planContext,
      leadFollowUp ? "Service: Lead follow-up growth audit" : "",
      `Consent: ${consentText}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    try {
      const body = new FormData();
      body.append(
        "event",
        JSON.stringify(
          buildTrackingPayload(
            "contact-form",
            "Consultation Request",
            {
              first_name: values.name,
              email: values.email,
              calendar_notes: notes,
              consent: true,
              "09aZnxiqoakrzk5yfNLB": values.subject,
            },
            {
              first_name: "Full Name",
              email: "Email Address",
              calendar_notes: "Consultation Request and Context",
              consent: "Contact Consent",
              "09aZnxiqoakrzk5yfNLB": "Subject",
            },
          ),
        ),
      );
      const response = await fetch(
        "https://backend.leadconnectorhq.com/external-tracking/events",
        {
          method: "POST",
          headers: { version: "2021-07-28" },
          body,
        },
      );
      if (!response.ok) throw new Error("Request not accepted");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <section className="section-gmg bg-secondary/30 border-b border-border">
        <div className="container-gmg max-w-4xl text-center">
          <span className="eyebrow">
            Let's find your next growth opportunity
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book your free growth audit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {leadFollowUp
              ? "Turn your calculator estimate into a practical follow-up plan. Tell us where inquiries get stuck."
              : "Tell us where your business needs support. Request a conversation about your leads, follow-up, and operations."}
          </p>
          <p className="text-sm text-muted-foreground mt-5">
            Submit a consultation request below. We'll coordinate availability
            by email; submitting does not reserve an appointment.
          </p>
        </div>
      </section>

      <section className="section-gmg">
        <div className="container-gmg grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {plan && (
              <section className="card-gmg" aria-label="Your selected plan">
                <span className="eyebrow">Your selected plan</span>
                <h2 className="text-2xl font-bold mb-3">{plan.name}</h2>
                <p className="text-lg font-semibold">
                  {money(monthly, annual)} /month{annual ? " equivalent" : ""}
                </p>
                {annual && (
                  <p className="mt-2">
                    {money(monthly * 12, true)} billed annually, paid upfront.
                  </p>
                )}
                <p className="text-muted-foreground mt-3">
                  {money(plan.setup)} one-time setup · due at signing.
                </p>
                <p className="text-muted-foreground mt-2">
                  {pricingTerms.minimum_months}-month minimum term. Service
                  scope and any third-party charges confirmed before signing.
                </p>
                <Link to="/pricing" className="text-link mt-4">
                  Review all plans
                </Link>
              </section>
            )}
            {!plan && params.get("plan") === "custom" && (
              <p className="card-gmg">
                Let's discuss a custom plan. Pricing and scope will depend on
                your needs.
              </p>
            )}
            <div className="card-gmg">
              <h2 className="text-2xl font-bold mb-3">
                Request a consultation
              </h2>
              <p className="text-muted-foreground mb-6">
                Share a little context so our team can prepare a useful
                conversation.
              </p>
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Consultation request"
                aria-busy={status === "pending"}
              >
                {Object.keys(errors).length > 0 && (
                  <div
                    ref={errorSummary}
                    tabIndex={-1}
                    role="alert"
                    className="border border-red-400 rounded-lg p-4 mb-6 text-sm"
                  >
                    <p className="font-semibold mb-2">
                      Please check these fields:
                    </p>
                    <ul className="space-y-1">
                      {(Object.keys(errors) as Field[]).map((field) => (
                        <li key={field}>
                          <a
                            className="underline underline-offset-4"
                            href={`#contact-${field}`}
                          >
                            {labels[field]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <fieldset
                  disabled={status === "pending" || status === "success"}
                  className="space-y-6"
                >
                  <legend className="sr-only">
                    Your contact details and request
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full name</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        required
                        maxLength={100}
                        className="h-12"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "contact-name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          className="text-sm text-red-300"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email address</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        className="h-12"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "contact-email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="text-sm text-red-300"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      required
                      maxLength={200}
                      defaultValue={initialSubject}
                      className="h-12"
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "contact-subject-error" : undefined
                      }
                    />
                    {errors.subject && (
                      <p
                        id="contact-subject-error"
                        className="text-sm text-red-300"
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">
                      What would you like help with?
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      maxLength={5000}
                      className="min-h-36 text-base"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="text-sm text-red-300"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="flex gap-3 items-start min-h-12 py-2 cursor-pointer text-sm leading-relaxed"
                      htmlFor="contact-consent"
                    >
                      <input
                        id="contact-consent"
                        name="consent"
                        type="checkbox"
                        required
                        className="w-5 h-5 shrink-0 mt-0.5 accent-primary"
                        aria-invalid={!!errors.consent}
                        aria-describedby={
                          errors.consent ? "contact-consent-error" : undefined
                        }
                      />
                      <span>{consentText}</span>
                    </label>
                    {errors.consent && (
                      <p
                        id="contact-consent-error"
                        className="text-sm text-red-300"
                      >
                        {errors.consent}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      See our{" "}
                      <Link
                        to="/privacy"
                        className="underline underline-offset-4"
                      >
                        Privacy Policy
                      </Link>{" "}
                      for how we handle your information.
                    </p>
                  </div>
                  <button
                    className="btn-primary-gmg w-full min-h-12"
                    type="submit"
                  >
                    {status === "pending"
                      ? "Submitting…"
                      : status === "success"
                        ? "Request submitted"
                        : "Request consultation"}
                  </button>
                </fieldset>
                {status === "success" && (
                  <p
                    role="status"
                    className="mt-5 border border-primary rounded-lg p-4"
                  >
                    Request received. Thank you for reaching out. An appointment
                    has not been booked; our team can coordinate the next step
                    by email.
                  </p>
                )}
                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-5 border border-red-400 rounded-lg p-4"
                  >
                    We could not receive your request. Please try again or{" "}
                    <a
                      className="underline underline-offset-4"
                      href="mailto:garyb@glomarkgroup.com"
                    >
                      email Gary
                    </a>{" "}
                    or{" "}
                    <a
                      className="underline underline-offset-4"
                      href="mailto:norly@glomarkgroup.com"
                    >
                      email Norly
                    </a>{" "}
                    directly.
                  </p>
                )}
              </form>
            </div>
          </div>

          <aside className="space-y-6" aria-label="Contact details">
            <div className="card-gmg space-y-7">
              <h2 className="text-2xl font-bold">Talk to our team</h2>
              <div className="flex gap-3">
                <Mail
                  aria-hidden="true"
                  className="w-5 h-5 text-primary shrink-0 mt-1"
                />
                <div className="min-w-0">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a
                    className="block text-sm underline underline-offset-4 break-all py-2"
                    href="mailto:garyb@glomarkgroup.com"
                  >
                    garyb@glomarkgroup.com
                  </a>
                  <a
                    className="block text-sm underline underline-offset-4 break-all py-2"
                    href="mailto:norly@glomarkgroup.com"
                  >
                    norly@glomarkgroup.com
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone
                  aria-hidden="true"
                  className="w-5 h-5 text-primary shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +317 395 6740 (Gary)
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    +614 973 6161 (Norly)
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin
                  aria-hidden="true"
                  className="w-5 h-5 text-primary shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Global Marketing Group, International
                  </p>
                </div>
              </div>
            </div>
            <div className="card-gmg">
              <ShieldCheck
                className="text-primary w-8 h-8 mb-4"
                aria-hidden="true"
              />
              <h2 className="font-bold text-lg mb-3">
                A conversation, without pressure.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We'll discuss your workflow and where support might help. A
                consultation request does not commit you to a plan or payment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
