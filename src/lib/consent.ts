export type ConsentChoice = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

const KEY = "gmg-cookie-consent-v1";
export const CONSENT_EVENT = "gmg:consent-change";
export const OPEN_CONSENT_EVENT = "gmg:open-consent";

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    return typeof parsed.analytics === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, marketing: boolean) {
  const choice: ConsentChoice = {
    necessary: true,
    analytics,
    marketing,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(choice));
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
  return choice;
}

export function hasConsent(kind: "analytics" | "marketing"): boolean {
  if (typeof window === "undefined") return false;
  return readConsent()?.[kind] === true;
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
