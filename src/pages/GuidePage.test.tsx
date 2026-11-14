import { ModalProvider } from "@/components/modal/ModalProvider";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GuidePage from "./GuidePage";
import Resources from "./Resources";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
const router = (page: React.ReactNode) => (
  <MemoryRouter>
    <ModalProvider>{page}</ModalProvider>
  </MemoryRouter>
);

describe("planning guides", () => {
  it.each([
    [
      "guide-va-delegation",
      "Know what to delegate. Set your VA up to succeed.",
    ],
    ["guide-lead-follow-up", "A practical checkup for your lead journey."],
    [
      "guide-crm-readiness",
      "Build the process before you build the automation.",
    ],
  ])("renders the original %s with 24 local checklist items", (slug, title) => {
    render(router(<GuidePage slug={slug} />));
    expect(
      screen.getByRole("heading", { level: 1, name: title }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(24);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(7);
  });

  it("checks items, resets all selections, and invokes browser print", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(router(<GuidePage slug="guide-va-delegation" />));
    const checks = screen.getAllByRole("checkbox");
    fireEvent.click(checks[0]);
    fireEvent.click(checks[23]);
    expect(checks[0]).toBeChecked();
    expect(checks[23]).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Reset checklist" }));
    checks.forEach((check) => expect(check).not.toBeChecked());
    fireEvent.click(screen.getByRole("button", { name: "Print this guide" }));
    expect(print).toHaveBeenCalledOnce();
  });

  it("links resources to all three guides", () => {
    render(router(<Resources />));
    for (const slug of [
      "guide-va-delegation",
      "guide-lead-follow-up",
      "guide-crm-readiness",
    ]) {
      expect(
        screen
          .getAllByRole("link")
          .some((link) => link.getAttribute("href") === `/${slug}`),
      ).toBe(true);
    }
  });
});
