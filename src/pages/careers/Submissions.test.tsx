import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AccountRep from "./AccountRep";
import ExecutiveAssistant from "./ExecutiveAssistant";
import Referral from "./Referral";

// Bypass the submit-timing heuristic (tests submit instantly); keep honeypot.
vi.mock("@/lib/formSecurity", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/formSecurity")>();
  return {
    ...actual,
    isBot: (form: FormData) =>
      Boolean(String(form.get(actual.HONEYPOT_FIELD) ?? "").trim()),
  };
});

const cases = [
  {
    name: "account representative",
    Component: AccountRep,
    fields: {
      name: "Test Applicant",
      email: "test@example.invalid",
      linkedin: "https://linkedin.com/in/test",
      location: "Indianapolis",
    },
    expected: {
      first_name: "Test Applicant",
      email: "test@example.invalid",
      city: "Indianapolis",
      "0v9TM8bBpbR4Dl24FCUW": "https://linkedin.com/in/test",
    },
  },
  {
    name: "executive assistant",
    Component: ExecutiveAssistant,
    fields: {
      firstName: "Test",
      lastName: "Applicant",
      email: "test@example.invalid",
      phone: "1234567890",
      experience: "Scheduling experience",
    },
    expected: {
      first_name: "Test",
      last_name: "Applicant",
      email: "test@example.invalid",
      phone: "1234567890",
      "3wgex2CP4Qcr8NXsjtAr": "Scheduling experience",
    },
  },
  {
    name: "referral",
    Component: Referral,
    fields: {
      yourName: "Test Referrer",
      yourEmail: "test@example.invalid",
      refName: "Example Business",
      refContact: "Contact Person",
    },
    expected: {
      organization: "Example Business",
      R30rdrrITokjVI26Bz1J: "Contact Person",
      CcvTRPOprQ69M8yF5Oax: "Test Referrer",
      xCypGtK2FMI2MiqYwqQq: "test@example.invalid",
    },
  },
];

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
  vi.stubGlobal("alert", vi.fn());
  vi.stubGlobal("crypto", {
    randomUUID: () => "11111111-1111-4111-8111-111111111111",
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

for (const item of cases) {
  describe(item.name, () => {
    function fill() {
      const view = render(<item.Component />);
      for (const [name, value] of Object.entries(item.fields)) {
        const input = view.container.querySelector(`[name="${name}"]`)!;
        fireEvent.change(input, { target: { value } });
      }
      return view;
    }

    it("requires privacy consent before sending", () => {
      fill();
      const consent = screen.getByRole("checkbox", { name: /I agree/ });
      expect(consent).toBeRequired();
      expect(
        screen.getByRole("link", { name: "Privacy Policy" }),
      ).toHaveAttribute("href", "/privacy");
      fireEvent.click(
        screen.getByRole("button", { name: /application|referral/i }),
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("disables pending submissions and acknowledges only server acceptance with existing mappings", async () => {
      let accept!: (response: Response) => void;
      vi.mocked(fetch).mockImplementation(
        () =>
          new Promise<Response>((resolve) => {
            accept = resolve;
          }),
      );
      fill();
      fireEvent.click(screen.getByRole("checkbox", { name: /I agree/ }));
      fireEvent.click(
        screen.getByRole("button", { name: /application|referral/i }),
      );
      expect(
        screen.getByRole("button", { name: "Submitting…" }),
      ).toBeDisabled();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(alert).not.toHaveBeenCalled();
      const [, request] = vi.mocked(fetch).mock.calls[0];
      const event = JSON.parse(
        (request?.body as FormData).get("event") as string,
      );
      expect(event.formData).toMatchObject({ ...item.expected, consent: true });
      accept(new Response(null, { status: 202 }));
      expect(await screen.findByRole("status")).toHaveTextContent(/received/i);
      expect(screen.getByRole("status")).not.toHaveTextContent(
        /appointment|booked|hired/i,
      );
    });

    it.each(["http", "network"])(
      "preserves entered details after %s failure and allows retry",
      async (kind) => {
        if (kind === "http")
          vi.mocked(fetch).mockResolvedValue(
            new Response(null, { status: 500 }),
          );
        else vi.mocked(fetch).mockRejectedValue(new Error("offline"));
        const view = fill();
        fireEvent.click(screen.getByRole("checkbox", { name: /I agree/ }));
        fireEvent.click(
          screen.getByRole("button", { name: /application|referral/i }),
        );
        expect(await screen.findByRole("alert")).toHaveTextContent(
          /try again/i,
        );
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
        for (const [name, value] of Object.entries(item.fields))
          expect(view.container.querySelector(`[name="${name}"]`)).toHaveValue(
            value,
          );
        expect(
          screen.getByRole("button", { name: /application|referral/i }),
        ).toBeEnabled();
        expect(alert).not.toHaveBeenCalled();
        vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 202 }));
        fireEvent.click(
          screen.getByRole("button", { name: /application|referral/i }),
        );
        expect(await screen.findByRole("status")).toHaveTextContent(
          /received/i,
        );
      },
    );
  });
}
