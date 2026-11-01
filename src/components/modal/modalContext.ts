import { createContext, useContext } from "react";

export type ModalKind = "booking" | "contact";

export type ContactPreset = {
  /** Preselected subject line. */
  subject?: string;
  /** Plan slug captured in the submission (e.g. "growth"). */
  plan?: string;
  /** Service type captured in the submission (e.g. "lead-follow-up"). */
  service?: string;
  /** Billing preference (e.g. "monthly" | "annual"). */
  billing?: string;
};

export interface ModalState {
  kind: ModalKind;
  preset?: ContactPreset;
}

interface ModalContextValue {
  state: ModalState | null;
  openBooking: (preset?: ContactPreset) => void;
  openContact: (preset?: ContactPreset) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return ctx;
}
