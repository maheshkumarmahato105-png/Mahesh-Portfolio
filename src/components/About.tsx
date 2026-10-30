import { motion } from "motion/react";
import { Calendar, User, Sparkles, Gauge, Layers, ShieldCheck } from "lucide-react";
import type { PortfolioConfig } from "@/types";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";

interface AboutProps {
  data: PortfolioConfig;
}

const focusAreas = [
  {
    icon: Sparkles,
    title: "Interactive UI & Motion",
    desc: "Crafting fluid, natural transitions and gesture-driven animations with Motion and CSS.",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    desc: "Striving for sub-second loads, clean asset bundling, and 60fps frame rates.",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    desc: "Writing scalable, readable TypeScript and reusable React component systems.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility & Semantics",
    desc: "Building for all users with semantic HTML, keyboard flows, and WCAG AA standards.",
  },
];

export default function About({ data }: AboutProps) {
  const reduced = prefersReducedMotion();

  return (
    <section
      id="about"
      className="relative px-6 py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-indigo-500/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="A bit about me"
          description="Passionate about crafting clean, interactive, and performant web experiences."
        />

        {/* Split layout: Bio & Stats (Left) + Timeline & Focus (Right) */}
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: Bio + Stats + Abstract Visual Element */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-8"
          >
            {/* Bio Paragraphs */}
            <div className="space-y-5">
              {data.aboutParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-base leading-relaxed text-(--color-text-secondary) sm:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Core Focus Areas */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                Core Interests & Principles
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {focusAreas.map((area, i) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, y: reduced ? 0 : 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.55 }}
                      className="group rounded-2xl border border-(--color-border) bg-(--color-bg-glass) p-4 backdrop-blur-sm transition-colors hover:border-(--color-border-hover) hover:bg-(--color-surface)"
                    >
                      <div className="flex items-center gap-2 text-(--color-accent)">
                        <Icon size={16} className="transition-transform group-hover:scale-110" />
                        <span className="text-xs font-semibold text-(--color-text-primary)">
                          {area.title}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-(--color-text-muted) group-hover:text-(--color-text-secondary)">
                        {area.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: reduced ? 0 : 30, scale: reduced ? 1 : 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.55 }}
                  className="rounded-2xl border border-(--color-border) bg-(--color-bg-glass) p-4 text-center backdrop-blur-sm transition-colors hover:border-(--color-border-hover)"
                >
                  <div className="text-2xl font-bold text-(--color-text-primary) sm:text-3xl">
                    {stat.value}
                    {stat.suffix && (
                      <span className="gradient-text">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-(--color-text-muted) sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Journey & Milestones Timeline */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="mb-6 flex items-center gap-2 text-(--color-text-muted)">
                <User size={16} />
                <span className="text-sm font-medium uppercase tracking-wider">
                  My Journey & Milestones
                </span>
              </div>

              <div className="relative space-y-0 pl-2">
                {/* Timeline vertical stem */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-linear-to-b from-(--color-accent) via-(--color-border) to-transparent" />

                {data.timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: reduced ? 0 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                    className="relative pb-8 pl-8 last:pb-0"
                  >
                    {/* Glowing Dot */}
                    <div className="absolute left-[2px] top-1.5 h-[14px] w-[14px] rounded-full border-2 border-(--color-accent) bg-(--color-bg) shadow-(--color-accent-glow)" />

                    <div className="flex items-center gap-2 text-xs text-(--color-accent)">
                      <Calendar size={12} />
                      <span className="font-semibold">{item.year}</span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-(--color-text-primary)">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-(--color-text-secondary)">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Apple-style minimalist quote / dedication banner */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 rounded-2xl border border-(--color-border) bg-linear-to-r from-indigo-500/5 via-purple-500/3 to-transparent p-5 backdrop-blur-sm"
            >
              <p className="text-xs italic leading-relaxed text-(--color-text-secondary)">
                "Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple."
              </p>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                — Guided by simplicity and craftsmanship
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
