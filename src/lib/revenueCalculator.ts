import { buildTrackingPayload } from "./tracking";

export type RevenueInputs = {
  inquiries: string;
  unfollowed: string;
  closeRate: string;
  saleValue: string;
};
export type RevenueErrors = Partial<Record<keyof RevenueInputs, string>>;
type Calculation =
  | { ok: true; monthlyOpportunity: number; neglectedLeads: number }
  | { ok: false; errors: RevenueErrors };

export function calculateMissedRevenue(inputs: RevenueInputs): Calculation {
  const limits = { inquiries: 1_000_000, unfollowed: 100, closeRate: 100, saleValue: 1_000_000_000 };
  const errors: RevenueErrors = {};
  for (const key of Object.keys(limits) as (keyof RevenueInputs)[]) {
    const raw = inputs[key].trim();
    const value = Number(raw);
    if (!/^\d+(\.\d+)?$/.test(raw) || !Number.isFinite(value) || value < 0 || value > limits[key] || (key === "inquiries" && !Number.isInteger(value))) {
      errors[key] = key === "inquiries"
        ? "Enter a whole number from 0 to 1,000,000."
        : key === "saleValue"
          ? "Enter a dollar value from 0 to 1,000,000,000 without commas."
          : "Enter a percentage from 0 to 100.";
    }
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  const neglectedLeads = Number(inputs.inquiries) * Number(inputs.unfollowed) / 100;
  return { ok: true, neglectedLeads, monthlyOpportunity: neglectedLeads * Number(inputs.closeRate) / 100 * Number(inputs.saleValue) };
}

export function isValidSignupEmail(email: string): boolean {
  return email.trim().length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const SIGNUP_CONSENT = "I agree to receive email follow-up guidance and marketing from Global Marketing Group. I can unsubscribe at any time.";

export async function requestFollowUpGuidance(email: string, consent: boolean): Promise<void> {
  if (!isValidSignupEmail(email) || !consent) throw new Error("Valid email and consent are required.");
  const body = new FormData();
  body.append("event", JSON.stringify(buildTrackingPayload(
    "missed-revenue-guidance", "Missed Revenue Calculator Guidance",
    { email: email.trim(), consent: true, calendar_notes: `Requested follow-up guidance. Consent: ${SIGNUP_CONSENT}` },
    { email: "Email Address", consent: "Email Marketing Consent", calendar_notes: "Request and Consent" },
  )));
  const response = await fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
    method: "POST", headers: { version: "2021-07-28" }, body,
  });
  if (!response.ok) throw new Error("The intake service did not accept the request.");
}
