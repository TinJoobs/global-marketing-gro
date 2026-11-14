import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
} from "@/lib/consent";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setOpen(true);
    else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setDetails(true);
      setOpen(true);
      requestAnimationFrame(() => panel.current?.focus());
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setOpen(false);
  };

  return (
    <div
      ref={panel}
      className="cookie-panel"
      role="region"
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <div className="cookie-copy">
        <h2 id={titleId}>Cookies on this site</h2>
        <p>
          We use necessary cookies to keep the site and forms working. With
          your permission we also use analytics to see which pages help people,
          and marketing cookies to measure our ads. See our{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>

      {details && (
        <fieldset className="cookie-options">
          <legend className="sr-only">Cookie preferences</legend>
          <label className="cookie-option is-locked">
            <input type="checkbox" checked disabled />
            <span>
              <strong>Necessary</strong>
              Site security, forms and remembering this choice. Always on.
            </span>
          </label>
          <label className="cookie-option">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <span>
              <strong>Analytics</strong>
              Lets us connect visits to a session so we know which pages help.
            </span>
          </label>
          <label className="cookie-option">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <span>
              <strong>Marketing</strong>
              Measures whether our ads bring people to the site.
            </span>
          </label>
        </fieldset>
      )}

      <div className="cookie-actions">
        {details ? (
          <button
            type="button"
            className="btn-primary-gmg"
            onClick={() => decide(analytics, marketing)}
          >
            Save my choices
          </button>
        ) : (
          <button
            type="button"
            className="btn-outline-gmg"
            onClick={() => setDetails(true)}
          >
            Choose cookies
          </button>
        )}
        <button
          type="button"
          className="btn-outline-gmg"
          onClick={() => decide(false, false)}
        >
          Reject optional
        </button>
        <button
          type="button"
          className="btn-primary-gmg"
          onClick={() => decide(true, true)}
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
