import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";

function openContact(search = "") {
  render(<MemoryRouter initialEntries={[`/contact${search}`]}><Contact /></MemoryRouter>);
}

function fillRequest() {
  fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Test Visitor" } });
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "contact-test@example.invalid" } });
  fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Follow-up support" } });
  fireEvent.change(screen.getByLabelText("What would you like help with?"), { target: { value: "Please help us review our lead follow-up." } });
  fireEvent.click(screen.getByRole("checkbox", { name: /I agree/ }));
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
  vi.stubGlobal("crypto", { randomUUID: () => "11111111-1111-4111-8111-111111111111" });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("consultation requests", () => {
  it("carries known annual package pricing without discounting setup", () => {
    openContact("?plan=launch&billing=annual");
    const context = screen.getByRole("region", { name: "Your selected plan" });
    expect(context).toHaveTextContent("Launch");
    expect(context).toHaveTextContent("$537.30 /month equivalent");
    expect(context).toHaveTextContent("$6,447.60 billed annually");
    expect(context).toHaveTextContent("$1,997 one-time setup");
    expect(context).toHaveTextContent("3-month minimum term");
  });

  it("shows monthly context and ignores unknown packages", () => {
    openContact("?plan=growth&billing=monthly");
    expect(screen.getByRole("region", { name: "Your selected plan" })).toHaveTextContent("$1,697 /month");
    cleanup();
    openContact("?plan=not-a-plan&billing=annual");
    expect(screen.queryByRole("region", { name: "Your selected plan" })).not.toBeInTheDocument();
  });

  it("offers a free growth audit and working email fallbacks", () => {
    openContact("?service=lead-follow-up");
    expect(screen.getByRole("heading", { level: 1, name: "Book your free growth audit" })).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toHaveValue("Lead follow-up growth audit");
    expect(screen.getByRole("link", { name: "garyb@glomarkgroup.com" })).toHaveAttribute("href", "mailto:garyb@glomarkgroup.com");
    expect(screen.getByRole("link", { name: "norly@glomarkgroup.com" })).toHaveAttribute("href", "mailto:norly@glomarkgroup.com");
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
  });

  it("requires valid contact details and consent without sending incomplete requests", () => {
    openContact();
    fireEvent.click(screen.getByRole("button", { name: "Request consultation" }));
    expect(screen.getByLabelText("Full name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email address")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("checkbox", { name: /I agree/ })).toHaveAttribute("aria-invalid", "true");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("waits for acceptance, includes context and consent, then acknowledges a request", async () => {
    let accept: (response: Response) => void;
    vi.mocked(fetch).mockImplementation(() => new Promise<Response>((resolve) => { accept = resolve; }));
    openContact("?plan=launch&billing=annual");
    fillRequest();
    fireEvent.click(screen.getByRole("button", { name: "Request consultation" }));
    expect(screen.getByRole("button", { name: "Submitting…" })).toBeDisabled();
    expect(screen.queryByText(/Request received/)).not.toBeInTheDocument();
    const [url, request] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("https://backend.leadconnectorhq.com/external-tracking/events");
    const event = JSON.parse((request?.body as FormData).get("event") as string);
    expect(event.formData).toMatchObject({ email: "contact-test@example.invalid", consent: true });
    expect(event.formData.calendar_notes).toContain("Launch");
    expect(event.formData.calendar_notes).toContain("$6,447.60");
    accept!({ ok: true } as Response);
    const acknowledgement = await screen.findByRole("status");
    expect(acknowledgement).toHaveTextContent("Request received");
    expect(acknowledgement).toHaveTextContent("An appointment has not been booked");
  });

  it.each(["http", "network"])("retains input and permits retry after %s failure", async (failure) => {
    if (failure === "http") vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
    else vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    openContact();
    fillRequest();
    fireEvent.click(screen.getByRole("button", { name: "Request consultation" }));
    const error = await screen.findByRole("alert");
    expect(error).toHaveTextContent("could not receive your request");
    expect(within(error).getByRole("link", { name: "email Gary" })).toHaveAttribute("href", "mailto:garyb@glomarkgroup.com");
    expect(screen.getByLabelText("Email address")).toHaveValue("contact-test@example.invalid");
    expect(screen.getByRole("button", { name: "Request consultation" })).toBeEnabled();
  });
});
