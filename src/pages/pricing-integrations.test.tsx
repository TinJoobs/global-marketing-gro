import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Pricing from "./Pricing";
import Integrations from "./Integrations";

afterEach(cleanup);

describe("package billing", () => {
  it("shows photo pricing and annual savings without discounting setup", () => {
    render(
      <MemoryRouter>
        <Pricing />
      </MemoryRouter>,
    );
    const launch = screen.getByRole("article", { name: "Launch plan" });
    expect(within(launch).getByText("$597")).toBeInTheDocument();
    expect(
      within(launch).getByText(/\$1,997 one-time setup/),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Annual/ }));
    expect(within(launch).getByText("$537.30")).toBeInTheDocument();
    expect(
      within(launch).getByText(/\$6,447.60 billed annually/),
    ).toBeInTheDocument();
    expect(
      within(launch).getByText(/\$1,997 one-time setup/),
    ).toBeInTheDocument();
    expect(
      within(launch).getByRole("link", { name: /Choose Launch/ }),
    ).toHaveAttribute("href", "/contact?plan=launch&billing=annual");
    expect(screen.getByText(/\$18,327.60 billed annually/)).toBeInTheDocument();
    expect(screen.getByText(/\$37,767.60 billed annually/)).toBeInTheDocument();
  });
});

describe("integration directory", () => {
  it("combines category and text search, announces an empty state, and resets", () => {
    render(
      <MemoryRouter>
        <Integrations />
      </MemoryRouter>,
    );
    expect(
      screen.getAllByRole("link", { name: /Official details for/ }),
    ).toHaveLength(42);
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "payments" },
    });
    expect(
      screen.getAllByRole("link", { name: /Official details for/ }),
    ).toHaveLength(7);
    fireEvent.change(screen.getByLabelText("Search integrations"), {
      target: { value: "STRIPE" },
    });
    expect(
      screen.getAllByRole("link", { name: /Official details for/ }),
    ).toHaveLength(1);
    fireEvent.change(screen.getByLabelText("Search integrations"), {
      target: { value: "Gmail" },
    });
    expect(
      screen.queryAllByRole("link", { name: /Official details for/ }),
    ).toHaveLength(0);
    expect(screen.getByRole("status")).toHaveTextContent(
      "No integrations match",
    );
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(
      screen.getAllByRole("link", { name: /Official details for/ }),
    ).toHaveLength(42);
  });
});
