import { useState, useEffect, useRef, useCallback } from "react";
import { getHeaderOffset } from "@/lib/utils";

/**
 * Detects which section is currently active based on scroll position.
 * Returns the ID of the active section (without #) and a setter to allow
 * immediate optimistic locking when a navigation link is clicked.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSectionState] = useState<string>(
    sectionIds[0] ?? "home"
  );
  const lockTimeoutRef = useRef<number | null>(null);
  const isLockedRef = useRef(false);

  const setActiveSection = useCallback(
    (id: string, lockDurationMs = 850) => {
      setActiveSectionState(id);
      isLockedRef.current = true;

      if (lockTimeoutRef.current !== null) {
        window.clearTimeout(lockTimeoutRef.current);
      }

      lockTimeoutRef.current = window.setTimeout(() => {
        isLockedRef.current = false;
        lockTimeoutRef.current = null;
      }, lockDurationMs);
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      // If locked by a programmatic click transition, do not overwrite
      if (isLockedRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const offset = getHeaderOffset() + 100;

      // 1. If at the very top of the page, activate "home"
      if (scrollY < 120) {
        setActiveSectionState(sectionIds[0] ?? "home");
        return;
      }

      // 2. If at the bottom of the page, activate the last section
      if (scrollY + windowHeight >= docHeight - 60) {
        setActiveSectionState(sectionIds[sectionIds.length - 1] ?? "contact");
        return;
      }

      // 3. Find the section whose bounding box contains the header reading line
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]!;
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section top has reached or passed the header threshold
          // and section bottom is still below the threshold
          if (rect.top <= offset && rect.bottom > offset) {
            setActiveSectionState(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lockTimeoutRef.current !== null) {
        window.clearTimeout(lockTimeoutRef.current);
      }
    };
  }, [sectionIds]);

  return { activeSection, setActiveSection };
}
