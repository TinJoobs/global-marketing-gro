import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ModalShell } from "./ModalShell";
afterEach(() => {
  cleanup();
  document.getElementById("gmg-site")?.remove();
});
it("isolates the background and restores its attributes and scroll state", () => {
  const background = document.createElement("div");
  background.id = "gmg-site";
  document.body.append(background);
  const { unmount } = render(
    <ModalShell kind="contact" onClose={() => {}}>
      <button>Inside</button>
    </ModalShell>,
  );
  expect(background).toHaveAttribute("inert");
  expect(background).toHaveAttribute("aria-hidden", "true");
  expect(document.body.style.overflow).toBe("hidden");
  unmount();
  expect(background).not.toHaveAttribute("inert");
  expect(background).not.toHaveAttribute("aria-hidden");
  expect(document.body.style.overflow).toBe("");
});
it("handles Escape and exposes a useful accessible description", () => {
  const close = vi.fn();
  render(
    <ModalShell kind="booking" onClose={close}>
      <button>Inside</button>
    </ModalShell>,
  );
  expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
    "Book a discovery call with Global Marketing Group.",
  );
  fireEvent.keyDown(document, { key: "Escape" });
  expect(close).toHaveBeenCalledOnce();
});
