import { useCallback, useState, type ReactNode } from "react";
import {
  ModalContext,
  type ContactPreset,
  type ModalState,
} from "./modalContext";
import { ModalShell } from "./ModalShell";
import { BookingModal } from "./BookingModal";
import { ContactModal } from "./ContactModal";

/**
 * Global modal provider. Renders a single overlay that hosts either the
 * calendar booking flow or the contact form, opened on demand by any CTA.
 */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState | null>(null);

  const openBooking = useCallback((preset?: ContactPreset) => {
    setState({ kind: "booking", preset });
  }, []);
  const openContact = useCallback((preset?: ContactPreset) => {
    setState({ kind: "contact", preset });
  }, []);
  const closeModal = useCallback(() => setState(null), []);

  return (
    <ModalContext.Provider
      value={{ state, openBooking, openContact, closeModal }}
    >
      {children}
      {state && (
        <ModalShell key={state.kind} onClose={closeModal} kind={state.kind}>
          {state.kind === "booking" ? (
            <BookingModal preset={state.preset} onDone={closeModal} />
          ) : (
            <ContactModal preset={state.preset} onDone={closeModal} />
          )}
        </ModalShell>
      )}
    </ModalContext.Provider>
  );
}
