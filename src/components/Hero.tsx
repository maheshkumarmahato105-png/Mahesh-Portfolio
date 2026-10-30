import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Sparkles, MessageSquare } from "lucide-react";
import type { PortfolioConfig } from "@/types";
import { getHeaderOffset, prefersReducedMotion } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smoothScroll";

interface HeroProps {
  data: PortfolioConfig;
}

export default function Hero({ data }: HeroProps) {
  const { scrollY } = useScroll();
  const reduced = prefersReducedMotion();

  const orbY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -90]);
  const textY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 50]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

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
      transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0.15 },
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 pb-16"
    >
      {/* Cinematic Ambient Background Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[650px] w-[950px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-linear-to-br from-indigo-500/10 via-purple-500/8 to-transparent blur-3xl" />
        <div className="absolute bottom-10 right-10 h-[450px] w-[650px] rounded-full bg-linear-to-tl from-violet-500/8 via-fuchsia-500/5 to-transparent blur-3xl" />
      </div>

      {/* Floating 3D-Inspired Glowing Orb */}
      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute right-[5%] top-1/4 -z-0 opacity-40 sm:opacity-70 lg:right-[8%] lg:top-1/3 lg:opacity-100"
      >
        <div className="orb-animate relative h-64 w-64 sm:h-80 sm:w-80 xl:h-96 xl:w-96">
          {/* Outermost ambient bloom */}
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-indigo-500/25 via-purple-500/20 to-fuchsia-500/15 blur-2xl" />
          {/* Mid glow ring */}
          <div className="absolute inset-4 rounded-full bg-linear-to-tr from-indigo-400/35 via-violet-500/25 to-purple-400/15 blur-md" />
          {/* Glass sphere shell */}
          <div className="absolute inset-8 rounded-full border border-white/20 bg-linear-to-br from-indigo-400/20 to-purple-600/10 backdrop-blur-md" />
          {/* Specular highlight */}
          <div className="absolute inset-14 rounded-full bg-linear-to-t from-transparent via-white/10 to-white/30" />
          {/* Orbiting accent ring */}
          <div className="absolute -inset-3 rounded-full border border-indigo-400/20 border-dashed animate-[spin_20s_linear_infinite]" />
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto max-w-4xl text-center lg:text-left"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-7"
        >
          {/* Name & Availability Pill */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {/* Availability Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg-glass) px-3.5 py-1.5 text-xs font-medium text-(--color-text-secondary) shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </span>

            {/* Role indicator */}
            <span className="rounded-full border border-(--color-border) bg-(--color-bg-glass) px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-(--color-text-muted) backdrop-blur-sm">
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

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start pt-2"
          >
            <button
              onClick={scrollToWork}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-(--color-accent) px-8 py-3.5 text-sm font-semibold text-white shadow-(--color-accent-glow) transition-all hover:scale-[1.02] hover:bg-(--color-accent-hover) active:scale-[0.98] sm:w-auto"
            >
              <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
              Explore My Work
            </button>
            <button
              onClick={scrollToContact}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg-glass) px-8 py-3.5 text-sm font-medium text-(--color-text-primary) backdrop-blur-md transition-all hover:scale-[1.02] hover:border-(--color-border-hover) hover:bg-(--color-surface) active:scale-[0.98] sm:w-auto"
            >
              <MessageSquare size={16} />
              Let's Talk
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={scrollToWork}
          className="scroll-indicator flex flex-col items-center gap-2 text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
          aria-label="Scroll to projects section"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
          <ArrowDown size={14} />
        </button>
      </motion.div>
    </section>
  );
}
