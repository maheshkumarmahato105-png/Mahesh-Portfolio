/**
 * Ultra-smooth Apple-grade scroll engine.
 * Uses requestAnimationFrame with a customized quartic ease-out curve for a luxurious,
 * cinematic glide that matches Apple's product showcase websites.
 */

let activeAnimationId: number | null = null;

// Apple-style quartic ease-out: starts with gentle acceleration and glides gracefully to a stop
export const appleEaseOut = (t: number): number => 1 - Math.pow(1 - t, 4);

export interface SmoothScrollOptions {
  /** Offset in pixels from top (e.g. to account for sticky navbar) */
  offset?: number;
  /** Base duration in milliseconds */
  duration?: number;
  /** Custom easing function (defaults to appleEaseOut) */
  easing?: (t: number) => number;
  /** Callback invoked when the scroll animation completes */
  onComplete?: () => void;
}

/**
 * Smoothly scrolls the window to a target element, CSS selector, or pixel coordinate.
 */
export function smoothScrollTo(
  target: number | HTMLElement | string,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === "undefined") return;

  // Cancel any running scroll animation immediately
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }

  const {
    offset = 80,
    duration = 850,
    easing = appleEaseOut,
    onComplete,
  } = options;

  let targetY = 0;

  if (typeof target === "number") {
    targetY = Math.max(0, target);
  } else if (typeof target === "string") {
    const cleanId = target.replace("#", "").trim();
    if (!cleanId || cleanId === "home") {
      targetY = 0;
    } else {
      const el = document.getElementById(cleanId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      targetY = Math.max(0, rect.top + window.scrollY - offset);
    }
  } else if (target instanceof HTMLElement) {
    if (target.id === "home") {
      targetY = 0;
    } else {
      const rect = target.getBoundingClientRect();
      targetY = Math.max(0, rect.top + window.scrollY - offset);
    }
  }

  // Ensure target doesn't exceed maximum document scroll height
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  targetY = Math.min(targetY, maxScroll);

  // If user prefers reduced motion, jump directly
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    onComplete?.();
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  // Already at target position
  if (Math.abs(distance) < 2) {
    window.scrollTo(0, targetY);
    onComplete?.();
    return;
  }

  // Dynamically scale duration based on distance so short scrolls aren't sluggish
  // and long scrolls aren't violently fast (between 650ms and 1050ms)
  const dynamicDuration = Math.min(
    1050,
    Math.max(650, Math.round(duration * (Math.abs(distance) / 1200 + 0.4)))
  );

  // Temporarily disable CSS scroll-behavior during RAF animation to prevent browser interpolation conflict
  const originalScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  let startTime: number | null = null;

  // Allow user to cancel programmatic scroll at any point by manually scrolling
  const abortEvents = ["wheel", "touchmove"];
  const handleAbort = () => {
    if (activeAnimationId !== null) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
      cleanup();
    }
  };

  const cleanup = () => {
    document.documentElement.style.scrollBehavior = originalScrollBehavior;
    abortEvents.forEach((evt) => {
      window.removeEventListener(evt, handleAbort);
    });
  };

  abortEvents.forEach((evt) => {
    window.addEventListener(evt, handleAbort, { passive: true });
  });

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / dynamicDuration, 1);
    const easedProgress = easing(progress);

    const nextY = startY + distance * easedProgress;
    window.scrollTo(0, nextY);

    if (progress < 1) {
      activeAnimationId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      activeAnimationId = null;
      cleanup();
      onComplete?.();
    }
  };

  activeAnimationId = requestAnimationFrame(step);
}
