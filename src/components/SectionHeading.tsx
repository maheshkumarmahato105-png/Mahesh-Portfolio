import { motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  inView?: boolean;
  align?: "center" | "left";
}

export default function SectionHeading({
  label,
  title,
  description,
  inView = true,
  align = "center",
}: SectionHeadingProps) {
  const reduced = prefersReducedMotion();
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 10 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5 }}
        className={`flex ${isCenter ? "justify-center" : "justify-start"}`}
      >
        <span className="inline-flex items-center rounded-full border border-(--color-border) bg-(--color-bg-glass) px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-accent) backdrop-blur-md">
          {label}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-3xl font-extrabold tracking-tight text-(--color-text-primary) sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 text-base leading-relaxed text-(--color-text-secondary) sm:text-lg ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
