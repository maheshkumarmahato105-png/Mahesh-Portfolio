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
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);

  const categories = ["All", ...new Set(skills.map((s) => s.category))];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const toggleSkillActive = (name: string) => {
    setActiveSkillName((prev) => (prev === name ? null : name));
  };

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 py-16 sm:py-28 lg:py-36"
    >
      {/* Living Ambient Aurora Color Animation */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="ambient-aurora opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          label="Capabilities"
          title="Engineered with modern tools."
          description="A specialized toolkit focused on frontend architecture, rendering performance, and fluid responsive design."
        />

        {/* Mobile-Interactive Horizontally-Scrollable Category Filter Strip */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-12 flex items-center overflow-x-auto no-scrollbar sm:justify-center gap-2 py-2 snap-x"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all cursor-pointer shrink-0 snap-start select-none ${
                activeCategory === cat
                  ? "bg-[#2997ff] text-white shadow-[0_0_15px_rgba(41,151,255,0.35)]"
                  : "border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#a1a1a6] hover:border-[rgba(255,255,255,0.24)] hover:text-[#f5f5f7]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid with Staggered Scroll-Triggered Progressive Reveals */}
        <div
          className="mt-10 sm:mt-12 grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => {
              const isSelected = activeSkillName === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: reduced ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    delay: reduced ? 0 : (i % 5) * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleSkillActive(skill.name)}
                  className={`group relative flex h-full flex-col justify-between rounded-2xl border p-3.5 sm:p-5 transition-all cursor-pointer select-none ${
                    isSelected
                      ? "border-[#2997ff] bg-[#1c1c1e] shadow-[0_0_24px_rgba(41,151,255,0.22)]"
                      : "border-[rgba(255,255,255,0.12)] bg-[#161616] hover:border-[#2997ff]/40 hover:bg-[#1c1c1e] hover:shadow-[0_0_18px_rgba(41,151,255,0.12)]"
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${skill.name} — ${skill.description}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-[#2997ff] transition-transform duration-300 group-hover:scale-110">
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

                  {/* Mobile Interactive Touch Highlight Dot */}
                  <div className="mt-4 flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-2.5 text-[10px] text-[#86868b]">
                    <span className="font-mono">Production Ready</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff]" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
