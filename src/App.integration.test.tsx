import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { afterEach, expect, it, vi } from "vitest";
import App from "./App";
vi.mock("./pages/Home", () => ({ default: () => <h1>Home</h1> }));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("renders real header/footer within the modal provider and opens the contact popup", () => {
  vi.stubGlobal("scrollTo", vi.fn());
  render(
    <HelmetProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Home");
  fireEvent.click(screen.getByRole("button", { name: /Talk with our team/ }));
  expect(
    screen.getByRole("dialog", { name: "Contact us" }),
  ).toBeInTheDocument();
  expect(document.getElementById("gmg-site")).toHaveAttribute("inert");
});
