import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Trash2,
  Pencil,
  ArrowUpRight,
} from "lucide-react";
import type { Project, Skill } from "@/types";
import { getSkillIcon, getProficiencyTier, getRelatedProjects } from "@/lib/skills";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { getHeaderOffset } from "@/lib/utils";

interface SkillDetailModalProps {
  skill: Skill | null;
  allSkills: Skill[];
  projects: Project[];
  onClose: () => void;
  onSelectSkill: (skill: Skill) => void;
  onEditCustomSkill?: (skill: Skill) => void;
  onDeleteCustomSkill?: (skillName: string) => void;
}

export default function SkillDetailModal({
  skill,
  allSkills,
  projects,
  onClose,
  onSelectSkill,
  onEditCustomSkill,
  onDeleteCustomSkill,
}: SkillDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useModalAccessibility(Boolean(skill), onClose, contentRef);

  // Reset confirmation prompt when switching skills or closing
  useEffect(() => {
    setConfirmDelete(false);
  }, [skill?.name]);

  const currentIndex = skill
    ? allSkills.findIndex((s) => s.name.toLowerCase() === skill.name.toLowerCase())
    : -1;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allSkills.length - 1;

  const handleNavigate = (direction: -1 | 1) => {
    if (currentIndex < 0) return;
    const nextSkill = allSkills[currentIndex + direction];
    if (nextSkill) onSelectSkill(nextSkill);
  };

  const handleJumpToProjects = () => {
    onClose();
    window.setTimeout(() => {
      smoothScrollTo("#projects", { offset: getHeaderOffset() });
    }, 180);
  };

  const handleDeleteClick = () => {
    if (!skill) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDeleteCustomSkill?.(skill.name);
    onClose();
  };

  const level = skill?.level ?? 80;
  const tier = skill?.tier ?? getProficiencyTier(level);
  const highlights =
    skill?.highlights && skill.highlights.length > 0
      ? skill.highlights
      : ["Core Fundamentals", "Component Implementation", "Responsive Integration"];
  const relatedProjects = skill ? getRelatedProjects(skill, projects) : [];

  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal / Mobile Bottom Sheet */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Skill details: ${skill.name}`}
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[rgba(255,255,255,0.14)] bg-[#161616] text-[#f5f5f7] shadow-2xl"
          >
            {/* Mobile Drag Handle */}
            <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-[#1c1c1e] p-2 text-[#a1a1a6] transition-colors hover:text-[#f5f5f7] cursor-pointer"
              aria-label="Close skill details"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 pr-10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#2997ff]/30 bg-[#1c1c1e] text-[#2997ff] shadow-[0_0_24px_rgba(41,151,255,0.16)]">
                  {getSkillIcon(skill.icon, 26)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#2997ff]/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2997ff]">
                      {skill.category}
                    </span>
                    {skill.experience && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#1c1c1e] px-2.5 py-0.5 text-[10px] font-mono text-[#a1a1a6]">
                        <Clock size={10} className="text-[#86868b]" />
                        {skill.experience}
                      </span>
                    )}
                    {skill.isCustom && (
                      <span className="rounded-full border border-white/15 bg-white/6 px-2.5 py-0.5 text-[10px] font-mono text-[#f5f5f7]">
                        Custom
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#f5f5f7] sm:text-3xl">
                    {skill.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#a1a1a6]">
                    {skill.description}
                  </p>
                </div>
              </div>

              {/* Proficiency Meter */}
              <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1c1c1e]/70 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-[0.16em] text-[#86868b]">
                    Proficiency
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#a1a1a6]">{tier}</span>
                    <span className="font-semibold text-[#2997ff]">{level}%</span>
                  </div>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    key={skill.name}
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#2997ff] to-[#5eaeff] shadow-[0_0_12px_rgba(41,151,255,0.45)]"
                  />
                </div>
              </div>

              {/* Usage Note */}
              {skill.usageNote && (
                <div className="mt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                    How I Use It
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#f5f5f7]/90">
                    {skill.usageNote}
                  </p>
                </div>
              )}

              {/* Knowledge & Capabilities */}
              <div className="mt-6 border-t border-[rgba(255,255,255,0.08)] pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                  What I Know & Apply
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1c1c1e] px-3.5 py-2.5 text-xs font-medium text-[#f5f5f7]"
                    >
                      <CheckCircle2 size={14} className="shrink-0 text-[#2997ff]" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applied In Projects */}
              <div className="mt-6 border-t border-[rgba(255,255,255,0.08)] pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                    Applied In Projects
                  </h4>
                  <span className="text-[11px] font-mono text-[#86868b]">
                    {relatedProjects.length}{" "}
                    {relatedProjects.length === 1 ? "project" : "projects"}
                  </span>
                </div>

                {relatedProjects.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedProjects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={handleJumpToProjects}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3.5 py-1.5 text-xs font-medium text-[#f5f5f7] transition-all hover:border-[#2997ff]/50 hover:text-[#2997ff] cursor-pointer"
                      >
                        <Layers size={12} className="text-[#2997ff]" />
                        <span>{proj.title}</span>
                        <ArrowUpRight
                          size={12}
                          className="text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2997ff]"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-[#86868b]">
                    Core skill applied across ongoing learning and upcoming builds.
                  </p>
                )}
              </div>

              {/* Footer Navigation & Custom Skill Controls */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.08)] pt-5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!hasPrev}
                    onClick={() => handleNavigate(-1)}
                    className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3.5 py-2 text-xs font-medium text-[#f5f5f7] transition-colors hover:bg-[#252528] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer"
                    aria-label="Previous skill"
                  >
                    <ChevronLeft size={14} />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    disabled={!hasNext}
                    onClick={() => handleNavigate(1)}
                    className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3.5 py-2 text-xs font-medium text-[#f5f5f7] transition-colors hover:bg-[#252528] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer"
                    aria-label="Next skill"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {skill.isCustom && (
                  <div className="flex items-center gap-2">
                    {onEditCustomSkill && (
                      <button
                        type="button"
                        onClick={() => onEditCustomSkill(skill)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3.5 py-2 text-xs font-medium text-[#f5f5f7] transition-colors hover:border-[#2997ff]/50 hover:text-[#2997ff] cursor-pointer"
                      >
                        <Pencil size={12} />
                        <span>Edit</span>
                      </button>
                    )}
                    {onDeleteCustomSkill && (
                      <button
                        type="button"
                        onClick={handleDeleteClick}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                          confirmDelete
                            ? "border-[#ff453a]/60 bg-[#ff453a]/15 text-[#ff453a]"
                            : "border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] text-[#a1a1a6] hover:border-[#ff453a]/40 hover:text-[#ff453a]"
                        }`}
                      >
                        <Trash2 size={12} />
                        <span>{confirmDelete ? "Confirm Delete" : "Remove"}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

