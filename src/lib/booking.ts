/**
 * Calendar booking helper for Global Marketing Group.
 * Used the calendar-integration skill. Fetches live availability from the
 * connected CRM calendar and submits a booking to the vibe-ai booking API.
 */
import { LOCATION_ID, getSessionId } from "./tracking";

export const CALENDAR_ID = "38W29a7XVFAV5Eyk5JWg";
const BOOKING_API_URL = "https://backend.leadconnectorhq.com";
const VIBE_API_URL = "https://backend.leadconnectorhq.com/vibe-ai";

const getBrowserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

/** Clamp a date range to today-or-later and within the 31-day maximum. */
export const clampAvailabilityRange = (
  startMs: number,
  endMs: number,
): { startDate: number; endDate: number } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = Math.max(startMs, today.getTime());
  const maxEnd = startDate + 31 * 24 * 60 * 60 * 1000;
  const endDate = Math.min(Math.max(endMs, startDate), maxEnd);
  return { startDate, endDate };
};

type FreeSlotsResponse = Record<string, { slots: string[] }>;

/** Fetch available time slots for a date range (clamped, timezone-aware). */
export const fetchCalendarFreeSlots = async (
  startMs: number,
  endMs: number,
): Promise<FreeSlotsResponse> => {
  const { startDate, endDate } = clampAvailabilityRange(startMs, endMs);
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone: getBrowserTimezone(),
  });
  const res = await fetch(
    `${BOOKING_API_URL}/calendars/${CALENDAR_ID}/free-slots?${params}`,
  );
  if (!res.ok) throw new Error("Failed to load calendar availability");
  return (await res.json()) as FreeSlotsResponse;
};

export type BookingPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedSlot: string;
  selectedTimezone?: string;
  sessionId?: string;
} & Partial<Record<"notes" | "companyName" | "website", string>>;

/** Submit a booking. Returns true on success, false on failure. */
export const submitCalendarBooking = async (
  payload: BookingPayload,
): Promise<boolean> => {
  try {
    const res = await fetch(`${VIBE_API_URL}/booking/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locationId: LOCATION_ID,
        calendarId: CALENDAR_ID,
        ...payload,
        selectedTimezone: payload.selectedTimezone ?? getBrowserTimezone(),
        sessionId: payload.sessionId ?? getSessionId(),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
};

/** Flatten free-slots response into [{date, iso}] sorted ascending. */
export const slotsToOptions = (
  data: FreeSlotsResponse,
): { date: string; iso: string }[] => {
  const out: { date: string; iso: string }[] = [];
  for (const [date, info] of Object.entries(data)) {
    for (const iso of info?.slots ?? []) out.push({ date, iso });
  }
  return out.sort((a, b) => a.iso.localeCompare(b.iso));
};

/** "Tuesday, Mar 4 · 2:30 PM" formatting for slot display. */
export const formatSlot = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
