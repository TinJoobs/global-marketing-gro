import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import App from "./App";
vi.mock("./components/Layout", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("./pages/Home", () => ({ default: () => <h1>Home</h1> }));
function Location() {
  const { pathname, search } = useLocation();
  return <output data-testid="location">{pathname + search}</output>;
}
function visit(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <App />
      <Location />
    </MemoryRouter>,
  );
}
afterEach(cleanup);
describe("application routes", () => {
  it("renders the actual pricing page instead of the Home fallback", () => {
    visit("/pricing");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Simple plans\. Real support\.\s*No guesswork\./,
    );
  });
  it("shows 404 for an unknown route", () => {
    visit("/this-page-does-not-exist");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
  });
  it("preserves the legacy confirmation route", () => {
    visit("/thank-you.html");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Thank You for Connecting.",
    );
    expect(screen.getByTestId("location")).toHaveTextContent("/thank-you");
  });
  it("keeps plan and annual billing context through a legacy booking link", () => {
    visit("/contact.html?plan=growth&billing=annual");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Book your free growth audit",
    );
    expect(
      screen.getByRole("region", { name: "Your selected plan" }),
    ).toHaveTextContent("$18,327.60");
    expect(screen.getByTestId("location")).toHaveTextContent(
      "/contact?plan=growth&billing=annual",
    );
  });
  it("uses honest media/resource links rather than placeholder player buttons", () => {
    visit("/resources/media");
    expect(
      screen.queryByRole("button", { name: "Play media preview" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore the portfolio" }),
    ).toHaveAttribute("href", "/portfolio");
    expect(
      screen.getByRole("link", { name: "Browse resources" }),
    ).toHaveAttribute("href", "/resources");
  });
});
