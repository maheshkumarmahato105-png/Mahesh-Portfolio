import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { prefersReducedMotion } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  magneticStrength?: number;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * Magnetic 3D Cursor Attraction Button.
 * Subtly attracts towards cursor on hover and springs back elastically.
 */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  magneticStrength = 10,
  ariaLabel,
  disabled = false,
}: MagneticButtonProps) {
  const reduced = prefersReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 20, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set((distanceX / (rect.width / 2)) * magneticStrength);
    y.set((distanceY / (rect.height / 2)) * magneticStrength);
  };

  const handleMouseEnter = () => {
    if (reduced || disabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (reduced) {
    return (
      <button
        onClick={onClick}
        className={className}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: smoothX, y: smoothY }}
      whileTap={{ scale: 0.94 }}
      className={`relative will-change-transform cursor-pointer ${className}`}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

