import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/Icon";
import { useModal } from "./modalContext";
import type { ContactPreset } from "./modalContext";
import {
  fetchCalendarFreeSlots,
  formatSlot,
  slotsToOptions,
  submitCalendarBooking,
} from "@/lib/booking";
import { buildTrackingPayload } from "@/lib/tracking";

const CONSENT =
  "I agree that Global Marketing Group may contact me about this booking request.";

type Status = "idle" | "loading" | "submitting" | "success" | "error";

/** Booking modal: fetches live calendar availability and submits to the CRM
 *  booking API. Shows a thank-you state on success. Closes on X / backdrop. */
export function BookingModal({
  preset,
  onDone,
}: {
  preset?: ContactPreset;
  onDone: () => void;
}) {
  const [range] = useState(() => {
    const start = Date.now();
    return { start, end: start + 14 * 24 * 60 * 60 * 1000 };
  });
  const [slots, setSlots] = useState<{ date: string; iso: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    fetchCalendarFreeSlots(range.start, range.end)
      .then((data) => active && setSlots(slotsToOptions(data)))
      .catch(() => active && setSlots([]))
      .finally(() => active && setLoadingSlots(false));
    return () => {
      active = false;
    };
  }, [range.start, range.end]);

  const contextNote = useMemo(() => {
    const bits = [
      preset?.plan ? `Plan: ${preset.plan}` : "",
      preset?.billing ? `Billing: ${preset.billing}` : "",
      preset?.service ? `Service: ${preset.service}` : "",
      preset?.subject ? `Subject: ${preset.subject}` : "",
    ].filter(Boolean);
    return bits.join(" · ");
  }, [preset]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;
    const form = new FormData(e.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    const consent = form.get("consent") === "on";

    const next: Record<string, string> = {};
    if (!firstName) next.firstName = "Enter your first name.";
    if (!lastName) next.lastName = "Enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email.";
    if (phone.replace(/\D/g, "").length < 7)
      next.phone = "Enter a phone number.";
    if (!selected) next.slot = "Choose a time.";
    if (!consent) next.consent = "Please agree to be contacted.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    const ok = await submitCalendarBooking({
      firstName,
      lastName,
      email,
      phone,
      selectedSlot: selected,
      notes: [notes, contextNote].filter(Boolean).join("\n\n"),
    });
    if (ok) {
      // Also fire a form-tracking event so the lead joins the CRM contact list.
      buildTrackingPayload("booking-modal", "Booking Request", {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        calendar_notes: [notes, contextNote, `Slot: ${formatSlot(selected)}`]
          .filter(Boolean)
          .join("\n\n"),
        consent,
      });
      setStatus("success");
      formRef.current?.reset();
    } else {
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
          You're booked. Talk soon.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Thank you for scheduling with Global Marketing Group. A confirmation
          and calendar invite are on their way to your inbox. We'll see you at
          the time you selected.
        </p>
        <button className="btn-primary-gmg mt-7" type="button" onClick={onDone}>
          Done
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="gmg-modal-body"
      onSubmit={handleSubmit}
      noValidate
    >
      <span className="eyebrow">Free discovery call</span>
      <h2 className="text-2xl md:text-3xl font-bold mt-1">
        Book your strategy call
      </h2>
      <p className="text-muted-foreground mt-2">
        Pick a time that works for you. We'll review your goals and map out the
        right CRM and support for your business.
      </p>

      {contextNote && (
        <p className="gmg-modal-note">
          <Icon name="check" size={15} /> {contextNote}
        </p>
      )}

      <div className="gmg-modal-grid mt-6">
        <div className="space-y-1.5">
          <Label htmlFor="bk-first">First name</Label>
          <Input
            id="bk-first"
            name="firstName"
            required
            autoComplete="given-name"
            className="h-12"
          />
          {errors.firstName && (
            <p className="gmg-field-error">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-last">Last name</Label>
          <Input
            id="bk-last"
            name="lastName"
            required
            autoComplete="family-name"
            className="h-12"
          />
          {errors.lastName && (
            <p className="gmg-field-error">{errors.lastName}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-email">Email</Label>
          <Input
            id="bk-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-12"
          />
          {errors.email && <p className="gmg-field-error">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-phone">Phone</Label>
          <Input
            id="bk-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="h-12"
          />
          {errors.phone && <p className="gmg-field-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-1.5 mt-5">
        <Label htmlFor="bk-notes">
          What would you like to cover? (optional)
        </Label>
        <Textarea
          id="bk-notes"
          name="notes"
          className="min-h-24"
          placeholder="Share where you'd like support."
        />
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">Choose a time</legend>
        <span className="text-sm font-semibold text-navy block mb-2">
          Choose a time
        </span>
        {loadingSlots ? (
          <div className="gmg-slots-skeleton" aria-live="polite">
            <span>Loading available times…</span>
          </div>
        ) : slots.length ? (
          <div
            className="gmg-slots"
            role="listbox"
            aria-label="Available times"
          >
            {slots.slice(0, 12).map((s) => (
              <button
                key={s.iso}
                type="button"
                role="option"
                aria-selected={selected === s.iso}
                className={`gmg-slot ${selected === s.iso ? "is-selected" : ""}`}
                onClick={() => setSelected(s.iso)}
              >
                {formatSlot(s.iso)}
              </button>
            ))}
          </div>
        ) : (
          <div className="gmg-slots-empty">
            No times are open in the next two weeks. Email{" "}
            <a href="mailto:garyb@glomarkgroup.com">garyb@glomarkgroup.com</a>{" "}
            and we'll find one.
          </div>
        )}
        {errors.slot && <p className="gmg-field-error mt-2">{errors.slot}</p>}
      </fieldset>

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
        {status === "submitting" ? "Booking…" : "Confirm my call"}
        <Icon name="arrow" size={18} />
      </button>
      {status === "error" && (
        <p role="alert" className="gmg-field-error mt-3 text-center">
          We couldn't book that time. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
