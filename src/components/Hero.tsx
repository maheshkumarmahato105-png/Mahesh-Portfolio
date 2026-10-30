import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Sparkles, MessageSquare, Terminal } from "lucide-react";
import type { PortfolioConfig } from "@/types";
import { getHeaderOffset, prefersReducedMotion } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smoothScroll";
import SpatialHero3D from "@/components/SpatialHero3D";
import MagneticButton from "@/components/MagneticButton";

interface HeroProps {
  data: PortfolioConfig;
}

export default function Hero({ data }: HeroProps) {
  const { scrollY } = useScroll();
  const reduced = prefersReducedMotion();

  const textY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 40]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const scrollToWork = () => {
    smoothScrollTo("#projects", { offset: getHeaderOffset() });
  };

  const scrollToContact = () => {
    smoothScrollTo("#contact", { offset: getHeaderOffset() });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 pt-28 pb-16 lg:pt-32"
    >
      {/* Cinematic Ambient Background Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[650px] w-[950px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-linear-to-br from-indigo-500/12 via-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-10 right-10 h-[500px] w-[650px] rounded-full bg-linear-to-tl from-violet-500/10 via-fuchsia-500/8 to-transparent blur-3xl" />
      </div>

      {/* Main Grid Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headline, Bio, and 3D Magnetic CTAs (col-span-7) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-7 text-center lg:col-span-7 lg:text-left"
          >
            {/* Name & Availability Pill */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              {/* Availability Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-(--color-bg-glass) px-3.5 py-1.5 text-xs font-medium text-(--color-text-secondary) shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for opportunities
              </span>

              {/* Role indicator */}
              <span className="rounded-full border border-white/10 bg-(--color-bg-glass) px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-(--color-text-muted) backdrop-blur-sm">
                {data.tagline}
              </span>
            </motion.div>

            {/* Prominent Name */}
            <motion.div variants={item}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-(--color-accent)">
                {data.name}
              </p>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={item}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {data.headline.split(" ").map((word, i) => (
                <span key={i}>
                  {word === "effortless." ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            {/* Introduction Paragraph */}
            <motion.p
              variants={item}
              className="mx-auto max-w-2xl text-base leading-relaxed text-(--color-text-secondary) sm:text-lg md:text-xl lg:mx-0"
            >
              {data.introduction}
            </motion.p>

            {/* 3D Magnetic CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start pt-2"
            >
              <MagneticButton
                onClick={scrollToWork}
                magneticStrength={14}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-(--color-accent) px-8 py-3.5 text-sm font-semibold text-white shadow-(--color-accent-glow) transition-all hover:bg-(--color-accent-hover) sm:w-auto"
                ariaLabel="Explore portfolio projects"
              >
                <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
                <span>Explore My Work</span>
              </MagneticButton>

              <MagneticButton
                onClick={scrollToContact}
                magneticStrength={12}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-(--color-bg-glass) px-8 py-3.5 text-sm font-medium text-(--color-text-primary) backdrop-blur-md transition-all hover:border-white/30 hover:bg-(--color-surface) sm:w-auto"
                ariaLabel="Let's Talk contact section"
              >
                <MessageSquare size={16} />
                <span>Let's Talk</span>
              </MagneticButton>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={item}
              className="flex items-center justify-center gap-6 border-t border-white/10 pt-6 text-xs text-(--color-text-muted) lg:justify-start"
            >
              <div className="flex items-center gap-1.5">
                <Terminal size={14} className="text-cyan-400" />
                <span>Modern Frontend</span>
              </div>
              <span>•</span>
              <div>
                <span className="font-semibold text-(--color-text-primary)">60/120 FPS</span> ProMotion
              </div>
              <span>•</span>
              <div>
                <span className="font-semibold text-(--color-text-primary)">100%</span> Responsive
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Spatial 3D Interactive Centerpiece (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.9, y: reduced ? 0 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex items-center justify-center lg:col-span-5 lg:justify-end"
          >
            <SpatialHero3D onExplore={scrollToWork} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={scrollToWork}
          className="scroll-indicator flex flex-col items-center gap-2 text-(--color-text-muted) transition-colors hover:text-(--color-text-primary) cursor-pointer"
          aria-label="Scroll to projects section"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
          <ArrowDown size={14} />
        </button>
      </motion.div>
    </section>
  );
}
