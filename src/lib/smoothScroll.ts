/**
 * Ultra-smooth Apple-grade scroll engine.
 * Implements a high-refresh-rate (60Hz / 120Hz ProMotion) requestAnimationFrame interpolation
 * with dynamic distance-based timing and Apple-inspired quintic ease-out deceleration curve.
 */

export interface SmoothScrollOptions {
  /** Offset in pixels from top (e.g. to account for sticky navbar) */
  offset?: number;
  /** Explicit duration in ms (auto-calculated if omitted) */
  duration?: number;
  /** Callback invoked when the scroll completes */
  onComplete?: () => void;
}

// Global reference to active scroll animation to allow cancellation on new clicks
let activeAnimationId: number | null = null;
let cancelScrollListeners: (() => void) | null = null;

/**
 * Quintic ease-out curve: Starts promptly and glides into position with liquid-smooth deceleration.
 */
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

/**
 * Smoothly scrolls the window to a target element ID, selector, or pixel coordinate.
 */
export function smoothScrollTo(
  target: number | HTMLElement | string,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === "undefined") return;

  const { offset = 80, duration: explicitDuration, onComplete } = options;

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

  const startY = window.scrollY;
  const distance = targetY - startY;

  // If already at target within 2 pixels, trigger callback immediately
  if (Math.abs(distance) <= 2) {
    window.scrollTo(0, targetY);
    onComplete?.();
    return;
  }

  // Check user motion preferences
  const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReduced) {
    window.scrollTo(0, targetY);
    onComplete?.();
    return;
  }

  // Cancel any existing scroll animation
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }
  if (cancelScrollListeners) {
    cancelScrollListeners();
    cancelScrollListeners = null;
  }

  // Calculate dynamic duration based on travel distance
  // Short hops (<500px): ~420ms, Medium (500-1500px): ~600ms, Long (>1500px): ~750ms
  const absDist = Math.abs(distance);
  const duration =
    explicitDuration ??
    Math.min(800, Math.max(420, Math.round(absDist * 0.28)));

  const startTime = performance.now();

  // If the user intentionally scrolls with wheel or touch during the glide, gracefully yield control
  const handleUserInterruption = (e: Event) => {
    // Only interrupt on intentional wheel actions (ignore micro-jitters)
    if (e.type === "wheel") {
      const wheelEvent = e as WheelEvent;
      if (Math.abs(wheelEvent.deltaY) < 6) return;
    }
    if (activeAnimationId !== null) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("wheel", handleUserInterruption);
    window.removeEventListener("touchstart", handleUserInterruption);
    cancelScrollListeners = null;
  };

  window.addEventListener("wheel", handleUserInterruption, { passive: true });
  window.addEventListener("touchstart", handleUserInterruption, { passive: true });
  cancelScrollListeners = cleanup;

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const easedProgress = easeOutQuint(progress);

    const currentY = startY + distance * easedProgress;
    window.scrollTo(0, currentY);

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
