import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowDown, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import type { PortfolioConfig } from "@/types";
import { getHeaderOffset, prefersReducedMotion } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smoothScroll";

interface HeroProps {
  data: PortfolioConfig;
}

export default function Hero({ data }: HeroProps) {
  const { scrollY } = useScroll();
  const reduced = prefersReducedMotion();

  // Subtle scroll parallax
  const textY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 35]);
  const visualY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -25]);
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);

  // Restrained pointer-responsive movement on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 28, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToWork = () => {
    smoothScrollTo("#projects", { offset: getHeaderOffset() });
  };

  const scrollToContact = () => {
    smoothScrollTo("#contact", { offset: getHeaderOffset() });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pt-32 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Slow, ambient radial lighting behind the main object */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[550px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(41,151,255,0.09)_0%,rgba(16,16,20,0.04)_50%,transparent_75%)] blur-3xl" />
        <div className="absolute top-1/4 h-[400px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Product Announcement Headline & Editorial Copy */}
          <motion.div
            style={{ y: textY, opacity }}
            className="space-y-8 text-center lg:col-span-7 lg:text-left"
          >
            {/* Eyebrow Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#161616] px-3.5 py-1 text-xs font-medium text-[#f5f5f7]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2997ff] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2997ff]" />
                </span>
                Available for engineering roles
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]">
                {data.tagline}
              </span>
            </motion.div>

            {/* Cinematic Headline with Staggered Word Reveals */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: reduced ? 0 : 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="text-4xl font-semibold tracking-tight text-[#f5f5f7] sm:text-6xl md:text-7xl lg:text-7xl leading-[1.05]"
              >
                I build digital experiences that feel{" "}
                <span className="gradient-text font-bold">effortless.</span>
              </motion.h1>
            </div>

            {/* Refined Description */}
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="mx-auto max-w-2xl text-base font-normal leading-relaxed text-[#a1a1a6] sm:text-lg md:text-xl lg:mx-0"
            >
              {data.introduction}
            </motion.p>

            {/* Apple-Style Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start pt-2"
            >
              <button
                onClick={scrollToWork}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#2997ff] hover:bg-[#5eaeff] px-7 py-3.5 text-sm font-medium text-white transition-all duration-200 active:scale-98 sm:w-auto shadow-sm cursor-pointer"
              >
                <span>Explore Work</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={scrollToContact}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.14)] bg-[#161616]/60 hover:bg-[#1c1c1e] text-[#f5f5f7] px-7 py-3.5 text-sm font-medium transition-all duration-200 active:scale-98 sm:w-auto backdrop-blur-md cursor-pointer"
              >
                <span>Get in Touch</span>
              </button>
            </motion.div>

            {/* Technical Metadata Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-6 border-t border-[rgba(255,255,255,0.12)] pt-6 text-xs text-[#86868b] lg:justify-start"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#2997ff]" />
                <span>Strict TypeScript</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-[#f5f5f7]" />
                <span>Sub-second Initial Load</span>
              </div>
              <span>•</span>
              <div>
                <span className="text-[#f5f5f7] font-semibold">100%</span> Responsive Design
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Architectural Glass Monolith Object */}
          <motion.div
            style={{
              y: visualY,
              rotateX: reduced ? 0 : rotateX,
              rotateY: reduced ? 0 : rotateY,
            }}
            initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="flex items-center justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] rounded-3xl border border-[rgba(255,255,255,0.14)] bg-gradient-to-b from-[#1c1c1e]/90 via-[#161616]/95 to-[#0a0a0a]/98 p-6 shadow-2xl backdrop-blur-3xl sm:p-8">
              {/* Top Display Header */}
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.18)]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.18)]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.18)]" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                  Frontend Architecture
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff]" />
              </div>

              {/* Monolith Spec Sheet */}
              <div className="space-y-6 pt-6">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#86868b]">
                    Engineer
                  </div>
                  <div className="mt-1 text-lg font-semibold tracking-tight text-[#f5f5f7]">
                    Mahesh Kumar Mahato
                  </div>
                  <div className="text-xs text-[#a1a1a6]">
                    Crafting minimal, high-efficiency web apps
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-[rgba(255,255,255,0.08)] py-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#86868b]">
                      Core Stack
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#f5f5f7]">
                      React 19 & TypeScript
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#86868b]">
                      Design System
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#f5f5f7]">
                      Tailwind & Motion
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#86868b]">
                    Architecture Pillars
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#a1a1a6]">
                    <span>Fluid Layout Fluidity</span>
                    <span className="font-semibold text-[#f5f5f7]">100% Responsive</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#a1a1a6]">
                    <span>Semantic Accessibility</span>
                    <span className="font-semibold text-[#2997ff]">WCAG AA Compliant</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#a1a1a6]">
                    <span>Animation Fidelity</span>
                    <span className="font-semibold text-[#f5f5f7]">60/120 FPS Native</span>
                  </div>
                </div>

                {/* Bottom Action Pill */}
                <div className="pt-2">
                  <button
                    onClick={scrollToWork}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] hover:bg-[#252528] px-4 py-3 text-xs font-medium text-[#f5f5f7] transition-colors cursor-pointer"
                  >
                    <span>View Selected Works</span>
                    <ArrowRight size={13} className="text-[#2997ff]" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={scrollToWork}
          className="scroll-indicator flex flex-col items-center gap-1.5 text-[#86868b] hover:text-[#f5f5f7] transition-colors cursor-pointer"
          aria-label="Scroll to projects section"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
          <ArrowDown size={13} />
        </button>
      </motion.div>
    </section>
  );
}
