import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import { ModalProvider } from "@/components/modal/ModalProvider";
import WhoWeHelp from "./WhoWeHelp";

afterEach(cleanup);

it("renders a full-bleed vertical stacking deck of industry cards", () => {
  render(
    <MemoryRouter>
      <ModalProvider>
        <WhoWeHelp />
      </ModalProvider>
    </MemoryRouter>,
  );
  // Section is the full-bleed stacking deck (aria-labelledby -> h2 text)
  const section = screen.getByRole("region", {
    name: /built for the businesses that never stop moving/i,
  });
  expect(section).toHaveClass("who-we-help");
  // Each industry renders as a stack layer (sticky panel)
  const panels = screen.getAllByRole("article");
  expect(panels.length).toBeGreaterThan(5);
});
