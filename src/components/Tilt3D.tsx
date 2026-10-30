import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { prefersReducedMotion } from "@/lib/utils";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  scaleOnHover?: number;
  onClick?: () => void;
}

/**
 * High-performance 3D Interactive Tilt & Depth Glare Container.
 * Gives child elements real 3D spatial depth, spring physics, and dynamic specular sheen.
 */
export default function Tilt3D({
  children,
  className = "",
  maxTilt = 9,
  perspective = 1100,
  glare = true,
  scaleOnHover = 1.02,
  onClick,
}: Tilt3DProps) {
  const reduced = prefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates between -0.5 and +0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Fluid spring configuration
  const springConfig = { stiffness: 280, damping: 22, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  const scale = useSpring(isHovered ? scaleOnHover : 1, springConfig);

  // Glare coordinates
  const glareBg = useTransform([x, y], ([latestX, latestY]) => {
    const gx = (Number(latestX) + 0.5) * 100;
    const gy = (Number(latestY) + 0.5) * 100;
    return `radial-gradient(circle 320px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.16), transparent 70%)`;
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    if (reduced) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (reduced) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* 3D Depth Canvas */}
      <div style={{ transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </div>

      {/* Dynamic Specular Glare Reflection */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div className="absolute inset-0" style={{ background: glareBg }} />
        </motion.div>
      )}
    </motion.div>
  );
}

