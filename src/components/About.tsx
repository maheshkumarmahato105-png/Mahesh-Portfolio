import { motion } from "motion/react";
import { Calendar, Sparkles, Gauge, Layers, ShieldCheck, ArrowUpRight } from "lucide-react";
import type { PortfolioConfig } from "@/types";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";

interface AboutProps {
  data: PortfolioConfig;
}

const focusAreas = [
  {
    icon: Sparkles,
    title: "Interaction & Motion",
    desc: "Crafting fluid, purposeful animations that communicate state and guide user focus.",
  },
  {
    icon: Gauge,
    title: "Performance First",
    desc: "Targeting sub-second initial paints, zero cumulative layout shift, and native 60/120 FPS.",
  },
  {
    icon: Layers,
    title: "Modular Systems",
    desc: "Designing scalable, component-driven TypeScript architectures that teams love maintaining.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility by Default",
    desc: "Building accessible digital experiences adhering to strict WCAG AA standards.",
  },
];

export default function About({ data }: AboutProps) {
  const reduced = prefersReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#111111] px-4 sm:px-6 py-16 sm:py-28 lg:py-36 transition-colors"
    >
      {/* Living Ambient Aurora Color Animation */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="ambient-aurora opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="Engineered with intent."
          description="A dedication to minimalism, engineering rigor, and digital experiences that feel effortless."
        />

        {/* Split Editorial Layout */}
        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Bio & Architecture Focus (col-span-7) */}
          <div className="space-y-10 lg:col-span-7">
            {/* Lead Narrative with Scroll Reveal */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="space-y-5 text-base sm:text-lg font-normal leading-relaxed text-[#a1a1a6]"
            >
              {data.aboutParagraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-[#f5f5f7] font-medium text-lg sm:text-xl" : ""}>
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Core Focus Matrix — Staggered Progressive Scroll Load */}
            <div className="space-y-4 pt-2">
              <motion.h3
                initial={{ opacity: 0, y: reduced ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]"
              >
                Core Engineering Pillars
              </motion.h3>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {focusAreas.map((area, idx) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, y: reduced ? 0 : 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 transition-all hover:border-[#2997ff]/40 hover:bg-[#1c1c1e] shadow-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[#2997ff]">
                        <Icon size={16} className="transition-transform group-hover:scale-110" />
                        <span className="text-xs font-semibold text-[#f5f5f7]">
                          {area.title}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#86868b] group-hover:text-[#a1a1a6] transition-colors">
                        {area.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Key Statistics Grid — Staggered Entrance on Scroll */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2">
              {data.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: reduced ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-3 sm:p-5 text-center transition-all hover:border-[#2997ff]/40 hover:shadow-[0_0_20px_rgba(41,151,255,0.1)] cursor-pointer"
                >
                  <div className="text-2xl font-semibold tracking-tight text-[#f5f5f7] sm:text-4xl">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-[#2997ff]">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-[#86868b] leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline & Philosophy (col-span-5) */}
          <div className="flex flex-col justify-between space-y-10 lg:col-span-5">
            <div>
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]"
              >
                <span>Journey & Milestones</span>
                <span className="text-[#2997ff]">Present</span>
              </motion.div>

              {/* Minimalist Timeline — Progressively Unveils as User Scrolls */}
              <div className="relative pl-3">
                <div className="absolute left-[19px] top-3 bottom-3 w-px bg-[rgba(255,255,255,0.12)]" />

                {data.timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: reduced ? 0 : -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="relative pb-8 pl-8 last:pb-0 group"
                  >
                    {/* Minimalist Dot with Glowing Ring */}
                    <div className="absolute left-[3px] top-1.5 h-2.5 w-2.5 rounded-full border border-[rgba(255,255,255,0.25)] bg-[#161616] group-hover:border-[#2997ff] group-hover:bg-[#2997ff] group-hover:shadow-[0_0_8px_#2997ff] transition-all" />

                    <div className="flex items-center gap-2 text-xs text-[#2997ff] font-medium">
                      <Calendar size={12} />
                      <span>{item.year}</span>
                    </div>
                    <h4 className="mt-1 text-sm font-semibold text-[#f5f5f7]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#a1a1a6]">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy Banner with Scroll Reveal */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-6 hover:border-[#2997ff]/30 transition-colors"
            >
              <p className="text-xs font-normal leading-relaxed text-[#a1a1a6] italic">
                "Simplicity is not the absence of clutter, that's a consequence of simplicity. Simplicity is somehow essentially describing the purpose and place of an object and product."
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#86868b]">
                <span>— The Philosophy of Clarity</span>
                <ArrowUpRight size={13} className="text-[#2997ff]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
