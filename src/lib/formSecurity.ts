/**
 * Shared form-security helpers: honeypot bot detection, format validation,
 * and spam heuristics. Used by every lead form on the site.
 */

/** A hidden honeypot field. Real users never fill it; bots usually do. */
export const HONEYPOT_FIELD = "company_url_hp";

/** Reasonably strict email format check (RFC-ish, practical). */
export const isEmail = (value: string): boolean =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) &&
  value.length <= 254;

/** Phone is valid if it has 7–15 digits after stripping non-digits. */
export const isPhone = (value: string): boolean => {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
};

/** URL format check (http/https). */
export const isUrl = (value: string): boolean => {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

/** Name must be 2+ chars, mostly letters/spaces, no raw markup. */
export const isPersonName = (value: string): boolean => {
  const v = value.trim();
  if (v.length < 2 || v.length > 100) return false;
  if (/[<>{}[\]\\]/.test(v)) return false;
  // At least one letter
  return /[A-Za-zÀ-ÿ].*[A-Za-zÀ-ÿ]/.test(v) || /[A-Za-zÀ-ÿ]/.test(v);
};

/**
 * Spam heuristics for free-text fields. Flags obvious spam patterns:
 * excessive URLs, repeated characters, known spam keywords, all-caps shouting.
 */
export const looksLikeSpam = (value: string): boolean => {
  const v = value.trim();
  if (v.length === 0) return false;
  // Too many URLs
  const urlCount = (v.match(/https?:\/\//gi) ?? []).length;
  if (urlCount > 2) return true;
  // Very long repeated runs (e.g. "aaaaaa" or "!!!!!!")
  if (/(.)\1{9,}/.test(v)) return true;
  // Common spam keywords
  const spamTerms = [
    "seo backlink",
    "casino",
    "viagra",
    "cialis",
    "crypto giveaway",
    "free money",
    "bitcoin doubler",
    "loan offer",
  ];
  const lower = v.toLowerCase();
  if (spamTerms.some((t) => lower.includes(t))) return true;
  // Excessive capitalization (shouting) on long text
  if (v.length > 40 && v === v.toUpperCase() && /[A-Z]/.test(v)) return true;
  return false;
};

/**
 * Honeypot check: returns true if the honeypot field was filled (a bot).
 * Also enforces a minimum submit time — forms rendered and submitted in
 * under 1.5 seconds are almost certainly bots.
 */
export const isBot = (form: FormData, renderedAt: number): boolean => {
  const hp = String(form.get(HONEYPOT_FIELD) ?? "").trim();
  if (hp) return true;
  if (Date.now() - renderedAt < 1500) return true;
  return false;
};

import { useRef } from "react";

/** A hook returning a stable timestamp from when the form first mounted. */
export const useRenderedAt = (): number => {
  const ref = useRef<number>(0);
  if (ref.current === 0) ref.current = Date.now();
  return ref.current;
};
