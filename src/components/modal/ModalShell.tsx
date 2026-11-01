import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/Icon";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Accessible modal shell: backdrop click + Escape close, focus trap,
 *  scroll lock, and focus restoration. Rendered above all site content. */
export function ModalShell({
  onClose,
  kind,
  children,
}: {
  onClose: () => void;
  kind: "booking" | "contact";
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Lock body scroll while the modal is open (offset for scrollbar width).
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    const background = document.getElementById("gmg-site");
    const previousHidden = background?.getAttribute("aria-hidden");
    const previousInert = background?.hasAttribute("inert");
    background?.setAttribute("inert", "");
    background?.setAttribute("aria-hidden", "true");
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      if (!previousInert) background?.removeAttribute("inert");
      if (previousHidden == null) background?.removeAttribute("aria-hidden");
      else background?.setAttribute("aria-hidden", previousHidden);
      const visible = (element: HTMLElement | null) =>
        element?.isConnected &&
        element.getClientRects().length > 0 &&
        !element.closest("[inert]");
      const trigger = previouslyFocused.current;
      const toggle = document.querySelector<HTMLElement>(".gmg-menu-toggle");
      // A mobile navigation CTA becomes hidden when its popup opens.
      const target = visible(trigger)
        ? trigger
        : visible(toggle)
          ? toggle
          : document.getElementById("main-content");
      target?.focus({ preventScroll: true });
    };
  }, []);

  // Move focus into the panel on mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Escape closes; Tab is trapped within the panel.
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !panelRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [onKeyDown]);

  const titleId = `modal-title-${kind}`;
  const descId = `modal-desc-${kind}`;

  return (
    <div
      className="gmg-modal-overlay"
      role="presentation"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="gmg-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button
          type="button"
          className="gmg-modal-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <Icon name="x" size={22} />
        </button>
        <div id={descId} className="sr-only">
          {kind === "booking"
            ? "Book a discovery call with Global Marketing Group."
            : "Send a message to Global Marketing Group."}
        </div>
        <div id={titleId} className="sr-only">
          {kind === "booking" ? "Schedule a call" : "Contact us"}
        </div>
        {children}
      </div>
    </div>
  );
}
