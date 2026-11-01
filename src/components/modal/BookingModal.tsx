import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/Icon";
import type { ContactPreset } from "./modalContext";
import {
  fetchCalendarFreeSlots,
  formatSlot,
  slotsToOptions,
  submitCalendarBooking,
} from "@/lib/booking";
import { buildTrackingPayload, postTrackingEvent } from "@/lib/tracking";

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
  const [availabilityError, setAvailabilityError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    setAvailabilityError(false);
    fetchCalendarFreeSlots(range.start, range.end)
      .then((data) => active && setSlots(slotsToOptions(data)))
      .catch(() => {
        if (active) {
          setSlots([]);
          setAvailabilityError(true);
        }
      })
      .finally(() => active && setLoadingSlots(false));
    return () => {
      active = false;
    };
  }, [range.start, range.end, attempt]);

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
    if (!selected || !slots.some((slot) => slot.iso === selected))
      next.slot = "Choose a time.";
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
      void postTrackingEvent(
        buildTrackingPayload("booking-modal", "Booking Request", {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          calendar_notes: [notes, contextNote, `Slot: ${formatSlot(selected)}`]
            .filter(Boolean)
            .join("\n\n"),
          consent,
        }),
      ).catch(() => {
        /* The appointment is already booked; do not retry it for analytics. */
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
          Thank you for scheduling with Global Marketing Group. Your selected
          time is {formatSlot(selected)} (
          {Intl.DateTimeFormat().resolvedOptions().timeZone}). Keep this time
          for your records; contact us if you need to make a change.
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
      <fieldset disabled={status === "submitting"} className="booking-fields">
        <span className="eyebrow">Free discovery call</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-1">
          Book your strategy call
        </h2>
        <p className="text-muted-foreground mt-2">
          Pick a time that works for you. We'll review your goals and map out
          the right CRM and support for your business.
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
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "bk-first-error" : undefined}
              name="firstName"
              required
              autoComplete="given-name"
              className="h-12"
            />
            {errors.firstName && (
              <p id="bk-first-error" className="gmg-field-error">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bk-last">Last name</Label>
            <Input
              id="bk-last"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "bk-last-error" : undefined}
              name="lastName"
              required
              autoComplete="family-name"
              className="h-12"
            />
            {errors.lastName && (
              <p id="bk-last-error" className="gmg-field-error">
                {errors.lastName}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bk-email">Email</Label>
            <Input
              id="bk-email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "bk-email-error" : undefined}
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-12"
            />
            {errors.email && (
              <p id="bk-email-error" className="gmg-field-error">
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bk-phone">Phone</Label>
            <Input
              id="bk-phone"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "bk-phone-error" : undefined}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="h-12"
            />
            {errors.phone && (
              <p id="bk-phone-error" className="gmg-field-error">
                {errors.phone}
              </p>
            )}
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
          <p className="gmg-timezone">
            Times shown in {Intl.DateTimeFormat().resolvedOptions().timeZone}.
          </p>
          <span className="text-sm font-semibold text-navy block mb-2">
            Choose a time
          </span>
          {loadingSlots ? (
            <div className="gmg-slots-skeleton" aria-live="polite">
              <span>Loading available times…</span>
            </div>
          ) : availabilityError ? (
            <div className="gmg-slots-empty" role="alert">
              <p>
                We couldn't load available times. Check your connection and try
                again.
              </p>
              <button
                type="button"
                className="text-link mt-3"
                onClick={() => setAttempt((value) => value + 1)}
              >
                Retry availability
              </button>
            </div>
          ) : slots.length ? (
            <div className="gmg-slots" aria-label="Available times">
              {slots.map((s) => (
                <label
                  key={s.iso}
                  className={`gmg-slot ${selected === s.iso ? "is-selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="booking-time"
                    value={s.iso}
                    checked={selected === s.iso}
                    onChange={() => setSelected(s.iso)}
                    aria-invalid={!!errors.slot}
                    aria-describedby={errors.slot ? "bk-slot-error" : undefined}
                  />
                  <span>{formatSlot(s.iso)}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="gmg-slots-empty">
              No times are open in the next two weeks. Email{" "}
              <a href="mailto:garyb@glomarkgroup.com">garyb@glomarkgroup.com</a>{" "}
              and we'll find one.
            </div>
          )}
          {errors.slot && (
            <p id="bk-slot-error" className="gmg-field-error mt-2">
              {errors.slot}
            </p>
          )}
        </fieldset>

        <label className="gmg-consent mt-5">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "bk-consent-error" : undefined}
            required
            className="mt-0.5 accent-primary"
          />
          <span>{CONSENT}</span>
        </label>
        {errors.consent && (
          <p id="bk-consent-error" className="gmg-field-error">
            {errors.consent}
          </p>
        )}

        <button
          className="btn-primary-gmg w-full mt-6"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Booking…" : "Confirm my call"}
          <Icon name="arrow" size={18} />
        </button>
      </fieldset>
      {status === "error" && (
        <p role="alert" className="gmg-field-error mt-3 text-center">
          We couldn't book that time. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
