import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BookingModal } from "./BookingModal";
import { fetchCalendarFreeSlots, submitCalendarBooking } from "@/lib/booking";
import { postTrackingEvent } from "@/lib/tracking";
vi.mock("@/lib/booking", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/booking")>()),
  fetchCalendarFreeSlots: vi.fn(),
  submitCalendarBooking: vi.fn(),
}));
vi.mock("@/lib/tracking", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/tracking")>()),
  postTrackingEvent: vi.fn(),
}));
// Bypass the submit-timing heuristic (tests submit instantly); keep honeypot.
vi.mock("@/lib/formSecurity", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/formSecurity")>();
  return {
    ...actual,
    isBot: (form: FormData) =>
      Boolean(String(form.get(actual.HONEYPOT_FIELD) ?? "").trim()),
  };
});
const slots = Array.from(
  { length: 14 },
  (_, i) => `2030-12-02T${String(i + 8).padStart(2, "0")}:00:00Z`,
);
beforeEach(() => {
  vi.mocked(fetchCalendarFreeSlots).mockResolvedValue({
    "2030-12-02": { slots },
  });
  vi.mocked(submitCalendarBooking).mockResolvedValue(true);
  vi.mocked(postTrackingEvent).mockResolvedValue(undefined);
});
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
function open() {
  render(<BookingModal onDone={() => {}} preset={{ plan: "growth" }} />);
}
async function fill() {
  const radio = (await screen.findAllByRole("radio", { name: /8:00/ }))[0];
  fireEvent.click(radio);
  fireEvent.change(screen.getByLabelText("First name"), {
    target: { value: "Test" },
  });
  fireEvent.change(screen.getByLabelText("Last name"), {
    target: { value: "Person" },
  });
  fireEvent.change(screen.getByLabelText("Email", { exact: true }), {
    target: { value: "test@example.invalid" },
  });
  fireEvent.change(screen.getByLabelText("Phone", { exact: true }), {
    target: { value: "3175550100" },
  });
  fireEvent.click(screen.getAllByRole("radio")[0]);
  fireEvent.click(screen.getByRole("checkbox"));
}
describe("booking request", () => {
  it("distinguishes availability failure from an empty calendar and retries", async () => {
    vi.mocked(fetchCalendarFreeSlots).mockRejectedValueOnce(Error("offline"));
    open();
    await screen.findByText(/couldn't load available times/i);
    expect(screen.queryByText(/No times are open/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry availability" }));
    await screen.findAllByRole("radio");
    expect(fetchCalendarFreeSlots).toHaveBeenCalledTimes(2);
  });
  it("shows every available time and the timezone", async () => {
    open();
    expect(await screen.findAllByRole("radio")).toHaveLength(14);
    expect(screen.getByText(/Times shown in/)).toHaveTextContent(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
  });
  it("makes consent errors visible and associates them with the checkbox", async () => {
    open();
    await screen.findAllByRole("radio");
    fireEvent.click(screen.getByRole("button", { name: "Confirm my call" }));
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("checkbox")).toHaveAccessibleDescription(
      "Please agree to be contacted.",
    );
  });
  it("sends consent/context tracking after a booked appointment and survives secondary tracking failure", async () => {
    vi.mocked(postTrackingEvent).mockRejectedValueOnce(Error("offline"));
    open();
    await fill();
    fireEvent.click(screen.getByRole("button", { name: "Confirm my call" }));
    await screen.findByText("You're booked. Talk soon.");
    await waitFor(() => expect(postTrackingEvent).toHaveBeenCalledTimes(1));
    expect(
      vi.mocked(postTrackingEvent).mock.calls[0][0].formData,
    ).toMatchObject({ email: "test@example.invalid", consent: true });
    expect(submitCalendarBooking).toHaveBeenCalledTimes(1);
  });
});
