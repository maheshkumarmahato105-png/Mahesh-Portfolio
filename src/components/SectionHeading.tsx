import { motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  inView?: boolean;
  align?: "center" | "left";
  highlightWord?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const reduced = prefersReducedMotion();
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      {/* Category Eyebrow Label with Chromatic Pulse */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`flex ${isCenter ? "justify-center" : "justify-start"}`}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(41,151,255,0.2)] bg-[#161616]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#2997ff] backdrop-blur-md shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff] animate-pulse" />
          <span>{label}</span>
        </span>
      </motion.div>

      {/* Main Display Heading */}
      <motion.h2
        initial={{ opacity: 0, y: reduced ? 0 : 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mt-4 text-3xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08]"
      >
        {title}
      </motion.h2>

      {/* Subtitle Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className={`mt-4 text-base font-normal leading-relaxed text-[#a1a1a6] sm:text-lg md:text-xl ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
