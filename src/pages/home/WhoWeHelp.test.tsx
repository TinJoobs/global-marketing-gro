import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import { ModalProvider } from "@/components/modal/ModalProvider";
import WhoWeHelp from "./WhoWeHelp";
afterEach(cleanup);
it("offers native horizontal navigation without a giant vertical spacer", () => {
  render(
    <MemoryRouter>
      <ModalProvider>
        <WhoWeHelp />
      </ModalProvider>
    </MemoryRouter>,
  );
  const rail = screen.getByRole("region", { name: "Industries carousel" });
  const scrollBy = vi.fn();
  Object.defineProperty(rail, "scrollBy", { value: scrollBy });
  Object.defineProperty(rail, "clientWidth", { value: 900 });
  fireEvent.click(screen.getByRole("button", { name: "Next industries" }));
  expect(scrollBy).toHaveBeenCalledWith({ left: 720, behavior: "smooth" });
  expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(
    5,
  );
  expect(rail.closest("section")?.style.height).toBe("");
});
