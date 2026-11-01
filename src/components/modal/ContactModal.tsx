import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/Icon";
import type { ContactPreset } from "./modalContext";
import { buildTrackingPayload, postTrackingEvent } from "@/lib/tracking";

const CONSENT =
  "I agree that Global Marketing Group may contact me by email about this request.";

const SUBJECTS = [
  "General inquiry",
  "Quick hire services",
  "Schedule a demo",
  "Pricing & plans",
  "Sales Growth System",
  "Virtual Assistant services",
  "Partnership / affiliate",
  "Careers",
];

type Status = "idle" | "submitting" | "success" | "error";

/** Contact modal: fires a tracked CRM submission and shows a thank-you state.
 *  Closes on X / backdrop / Escape (handled by ModalShell). */
export function ContactModal({
  preset,
  onDone,
}: {
  preset?: ContactPreset;
  onDone: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [subject, setSubject] = useState(preset?.subject ?? SUBJECTS[0]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const consent = form.get("consent") === "on";

    const next: Record<string, string> = {};
    if (!name || name.length > 100) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      next.email = "Enter a valid email.";
    if (!message || message.length > 5000)
      next.message = "Tell us what you need (up to 5,000 characters).";
    if (!consent) next.consent = "Please agree to email contact.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    const ctx = [
      preset?.plan ? `Plan: ${preset.plan}` : "",
      preset?.billing ? `Billing: ${preset.billing}` : "",
      preset?.service ? `Service: ${preset.service}` : "",
    ]
      .filter(Boolean)
      .join(" · ");
    const notes = [message, ctx, `Subject: ${subject}`]
      .filter(Boolean)
      .join("\n\n");
    try {
      await postTrackingEvent(
        buildTrackingPayload(
          "contact-modal",
          "Contact Request",
          { first_name: name, email, phone, calendar_notes: notes, consent },
          {
            first_name: "Full Name",
            email: "Email",
            phone: "Phone",
            calendar_notes: "Message",
            consent: "Contact Consent",
          },
        ),
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="gmg-modal-body gmg-modal-thanks">
        <span className="icon-box" aria-hidden="true">
          <Icon name="check" size={30} />
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mt-5">
          Message received.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Thank you for reaching out. Our team will reply by email shortly to
          coordinate next steps.
        </p>
        <button className="btn-primary-gmg mt-7" type="button" onClick={onDone}>
          Done
        </button>
      </div>
    );
  }

  return (
    <form className="gmg-modal-body" onSubmit={handleSubmit} noValidate>
      <span className="eyebrow">We'd love to help</span>
      <h2 className="text-2xl md:text-3xl font-bold mt-1">Send us a message</h2>
      <p className="text-muted-foreground mt-2">
        Tell us what you need and we'll get back to you within one business day.
      </p>

      <div className="space-y-1.5 mt-6">
        <Label htmlFor="cm-name">Full name</Label>
        <Input
          id="cm-name"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className="h-12"
        />
        {errors.name && <p className="gmg-field-error">{errors.name}</p>}
      </div>

      <div className="gmg-modal-grid mt-5">
        <div className="space-y-1.5">
          <Label htmlFor="cm-email">Email</Label>
          <Input
            id="cm-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-12"
          />
          {errors.email && <p className="gmg-field-error">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cm-phone">Phone (optional)</Label>
          <Input
            id="cm-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-12"
          />
        </div>
      </div>

      <div className="space-y-1.5 mt-5">
        <Label htmlFor="cm-subject">Subject</Label>
        <select
          id="cm-subject"
          name="subject"
          className="h-12"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5 mt-5">
        <Label htmlFor="cm-message">What would you like help with?</Label>
        <Textarea
          id="cm-message"
          name="message"
          required
          maxLength={5000}
          className="min-h-28"
          placeholder="Share a little about your business and where you'd like support."
        />
        {errors.message && <p className="gmg-field-error">{errors.message}</p>}
      </div>

      <label className="gmg-consent mt-5">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 accent-primary"
        />
        <span>{CONSENT}</span>
      </label>

      <button
        className="btn-primary-gmg w-full mt-6"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <Icon name="arrow" size={18} />
      </button>
      {status === "error" && (
        <p role="alert" className="gmg-field-error mt-3 text-center">
          We couldn't send your message. Please try again or email{" "}
          <a href="mailto:garyb@glomarkgroup.com">garyb@glomarkgroup.com</a>.
        </p>
      )}
    </form>
  );
}
