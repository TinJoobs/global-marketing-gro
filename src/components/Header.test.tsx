import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import { ModalProvider } from "./modal/ModalProvider";
import Header from "./Header";
afterEach(cleanup);
it("hides closed menu links, contains expanded menus in the mobile scroll region, and restores desktop trigger focus", () => {
  render(
    <MemoryRouter>
      <ModalProvider>
        <Header />
      </ModalProvider>
    </MemoryRouter>,
  );
  const trigger = screen.getByRole("button", { name: "Solutions" });
  const panel = document.getElementById("gmg-menu-solutions");
  expect(panel).toHaveAttribute("hidden");
  fireEvent.click(trigger);
  expect(panel).not.toHaveAttribute("hidden");
  expect(document.querySelector("#gmg-nav")?.contains(panel)).toBe(true);
  fireEvent.keyDown(document, { key: "Escape" });
  expect(trigger).toHaveFocus();
  expect(panel).toHaveAttribute("hidden");
});
