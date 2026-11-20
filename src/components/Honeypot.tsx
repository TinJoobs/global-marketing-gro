import { HONEYPOT_FIELD } from "@/lib/formSecurity";

/**
 * Visually-hidden honeypot field. Real users never see or fill it.
 * Bots that scrape form fields tend to populate it, flagging themselves.
 * Must remain in the DOM and be non-displayed (not type="hidden", which
 * some bots skip) for best detection.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="gmg-honeypot">
      <label htmlFor={HONEYPOT_FIELD}>Company website (leave blank)</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
    </div>
  );
}
