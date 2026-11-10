import { useEffect, type RefObject } from "react";

/**
 * Provides Escape-to-close, body scroll locking, and focus trapping for accessible modals.
 */
export function useModalAccessibility(
  isOpen: boolean,
  onClose: () => void,
  contentRef: RefObject<HTMLDivElement | null>,
  focusSelector = "button, input, textarea"
) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = window.setTimeout(() => {
      contentRef.current?.querySelector<HTMLElement>(focusSelector)?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [isOpen, onClose, contentRef, focusSelector]);
}

