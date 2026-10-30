import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MissedRevenueCalculator from "./MissedRevenueCalculator";

function openPage() {
  render(<MemoryRouter><MissedRevenueCalculator /></MemoryRouter>);
}

function completeSignup() {
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "calculator-test@example.invalid" } });
  fireEvent.click(screen.getByRole("checkbox", { name: /I agree to receive/ }));
  fireEvent.click(screen.getByRole("button", { name: "Request follow-up guidance" }));
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
  vi.stubGlobal("crypto", { randomUUID: () => "11111111-1111-4111-8111-111111111111" });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("MissedRevenueCalculator", () => {
  it("shows an illustrative estimate, recalculates, and hides stale results when invalid", () => {
    openPage();
    expect(screen.getByLabelText("Estimated monthly lost opportunity")).toHaveTextContent("$3,000");
    fireEvent.change(screen.getByLabelText("Monthly inquiries"), { target: { value: "200" } });
    expect(screen.getByLabelText("Estimated monthly lost opportunity")).toHaveTextContent("$6,000");
    fireEvent.change(screen.getByLabelText("Monthly inquiries"), { target: { value: "" } });
    expect(screen.queryByLabelText("Estimated monthly lost opportunity")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Monthly inquiries")).toHaveAttribute("aria-invalid", "true");
  });

  it("requires valid email and explicit consent before sending", () => {
    openPage();
    fireEvent.click(screen.getByRole("button", { name: "Request follow-up guidance" }));
    expect(screen.getByText(/Enter a valid email address/)).toBeInTheDocument();
    expect(screen.getByText(/Please opt in/)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("waits for accepted intake before reporting success and sends consent", async () => {
    let accept: (value: Response) => void;
    vi.mocked(fetch).mockImplementation(() => new Promise<Response>((resolve) => { accept = resolve; }));
    openPage();
    completeSignup();
    expect(screen.getByRole("button", { name: "Submitting…" })).toBeDisabled();
    expect(screen.queryByText(/Request received/)).not.toBeInTheDocument();
    const request = vi.mocked(fetch).mock.calls[0];
    expect(request[0]).toBe("https://backend.leadconnectorhq.com/external-tracking/events");
    const event = JSON.parse((request[1]?.body as FormData).get("event") as string);
    expect(event.formData).toMatchObject({ email: "calculator-test@example.invalid", consent: true });
    accept!({ ok: true } as Response);
    await screen.findByText(/Request received\. Thank you/);
  });

  it.each(["http", "network"])("shows an actionable error for %s failure and allows retry", async (failure) => {
    if (failure === "http") vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
    else vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    openPage();
    completeSignup();
    await screen.findByText(/could not receive your request/);
    expect(screen.queryByText(/Request received/)).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Request follow-up guidance" })).toBeEnabled());
    expect(screen.getByLabelText("Email address")).toHaveValue("calculator-test@example.invalid");
  });
});
