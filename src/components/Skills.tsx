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

const iconMap: Record<string, ReactNode> = {
  "code-2": <Code2 size={22} />,
  palette: <Palette size={22} />,
  "file-code-2": <FileCode2 size={22} />,
  atom: <Atom size={22} />,
  "shield-check": <ShieldCheck size={22} />,
  wind: <Wind size={22} />,
  "git-branch": <GitBranch size={22} />,
  smartphone: <Smartphone size={22} />,
  eye: <Eye size={22} />,
  zap: <Zap size={22} />,
};

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const reduced = prefersReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...new Set(skills.map((s) => s.category))];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(41,151,255,0.05)_0%,transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Capabilities"
          title="Engineered with modern tools."
          description="A specialized toolkit focused on frontend architecture, rendering performance, and fluid responsive design."
        />

        {/* Minimal Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-12 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#2997ff] text-white shadow-xs"
                  : "border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#a1a1a6] hover:border-[rgba(255,255,255,0.22)] hover:text-[#f5f5f7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  delay: reduced ? 0 : 0.04 * (i % 5),
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="group relative flex h-full flex-col justify-between rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 transition-all hover:border-[rgba(255,255,255,0.24)] hover:bg-[#1c1c1e]"
                tabIndex={0}
                role="article"
                aria-label={`${skill.name} — ${skill.description}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-[#2997ff] transition-transform duration-300 group-hover:scale-105">
                      {iconMap[skill.icon] ?? <Code2 size={22} />}
                    </div>
                    <span className="rounded-full bg-white/6 px-2 py-0.5 text-[9px] font-mono text-[#86868b]">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-semibold tracking-tight text-[#f5f5f7]">
                    {skill.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#86868b] transition-colors group-hover:text-[#a1a1a6]">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
