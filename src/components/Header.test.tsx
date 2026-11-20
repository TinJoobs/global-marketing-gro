import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import { ModalProvider } from "./modal/ModalProvider";
import Header from "./Header";

afterEach(cleanup);

const renderHeader = () =>
  render(
    <MemoryRouter>
      <ModalProvider>
        <Header />
      </ModalProvider>
    </MemoryRouter>,
  );

it("keeps one navigation tree with grouped submenus that open as disclosures in the narrow layout", () => {
  renderHeader();
  const nav = screen.getByRole("navigation", { name: "Main navigation" });
  const list = document.getElementById("gmg-nav-list");
  expect(nav.contains(list)).toBe(true);
  expect(list).toHaveAttribute("popover", "auto");
  const toggle = screen.getByRole("button", { name: "Menu" });
  expect(toggle).toHaveAttribute("popovertarget", "gmg-nav-list");
  expect(toggle).toHaveAttribute("aria-controls", "gmg-nav-list");

  const trigger = screen.getByRole("button", { name: "Solutions" });
  const panel = document.getElementById("gmg-menu-solutions");
  expect(panel).toHaveAttribute("hidden");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(trigger);
  expect(panel).not.toHaveAttribute("hidden");
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(list?.contains(panel)).toBe(true);
  fireEvent.click(trigger);
  expect(panel).toHaveAttribute("hidden");
});

it("shows the growth audit call to action once", () => {
  renderHeader();
  expect(screen.getAllByRole("button", { name: /free growth audit/i })).toHaveLength(1);
  expect(screen.getByRole("link", { name: "Compare plans", hidden: true })).toHaveAttribute("href", "/pricing");
});
