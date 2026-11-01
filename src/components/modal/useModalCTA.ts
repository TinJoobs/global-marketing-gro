import { useModal, type ContactPreset } from "./modalContext";

/** Convenience hook for CTAs that should open the booking or contact modal.
 *  Returns ready-to-use click handlers + open helpers. */
export function useModalCTA() {
  const { openBooking, openContact, closeModal } = useModal();
  return {
    openBooking,
    openContact,
    closeModal,
    /** Build an onClick that opens the booking modal. */
    book: (preset?: ContactPreset) => () => openBooking(preset),
    /** Build an onClick that opens the contact modal. */
    contact: (preset?: ContactPreset) => () => openContact(preset),
  };
}
