import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2,
  Palette,
  FileCode2,
  Atom,
  ShieldCheck,
  Wind,
  GitBranch,
  Smartphone,
  Eye,
  Zap,
} from "lucide-react";
import type { Skill } from "@/types";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import Tilt3D from "@/components/Tilt3D";

const iconMap: Record<string, ReactNode> = {
  "code-2": <Code2 size={24} />,
  palette: <Palette size={24} />,
  "file-code-2": <FileCode2 size={24} />,
  atom: <Atom size={24} />,
  "shield-check": <ShieldCheck size={24} />,
  wind: <Wind size={24} />,
  "git-branch": <GitBranch size={24} />,
  smartphone: <Smartphone size={24} />,
  eye: <Eye size={24} />,
  zap: <Zap size={24} />,
};

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const reduced = prefersReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Group by category and include "All"
  const categories = ["All", ...new Set(skills.map((s) => s.category))];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-32 lg:py-40"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-100 w-100 translate-x-1/3 rounded-full bg-linear-to-l from-purple-500/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="Technologies I work with"
          description="A specialized toolkit focused on modern frontend engineering, performance, and responsive interfaces."
        />

        {/* Category filter pills - loads into view upon scrolling */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-(--color-accent) text-white shadow-(--color-accent-glow)"
                  : "border border-(--color-border) text-(--color-text-muted) hover:border-(--color-border-hover) hover:text-(--color-text-primary)"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid - progressively reveals on scroll down */}
        <div
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: reduced ? 0 : 35, scale: reduced ? 1 : 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  delay: reduced ? 0 : 0.06 * (i % 5),
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="h-full"
              >
                <Tilt3D maxTilt={10} glare={true} className="h-full rounded-2xl">
                  <div
                    tabIndex={0}
                    role="article"
                    aria-label={`${skill.name} — ${skill.description}`}
                    className="group relative flex h-full flex-col justify-between cursor-pointer rounded-2xl border border-(--color-border) bg-(--color-bg-glass) p-5 backdrop-blur-sm transition-colors hover:border-(--color-border-hover) hover:bg-(--color-surface)"
                  >
                    {/* Glow on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-(--color-accent-glow) to-transparent" />
                    </div>

                    <div className="relative">
                      <div
                        style={{ transform: "translateZ(25px)" }}
                        className="flex items-center justify-between"
                      >
                        <div className="text-(--color-accent) transition-colors group-hover:text-(--color-accent-hover)">
                          {iconMap[skill.icon] ?? <Code2 size={24} />}
                        </div>
                        <span className="rounded-full bg-white/4 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                          {skill.category}
                        </span>
                      </div>

                      <h3
                        style={{ transform: "translateZ(18px)" }}
                        className="mt-4 text-sm font-semibold text-(--color-text-primary)"
                      >
                        {skill.name}
                      </h3>
                      <p
                        style={{ transform: "translateZ(14px)" }}
                        className="mt-1 text-xs leading-relaxed text-(--color-text-muted) transition-colors group-hover:text-(--color-text-secondary)"
                      >
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
