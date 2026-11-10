import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Sparkles, Check, AlertCircle } from "lucide-react";
import type { Skill, SkillCategory } from "@/types";
import {
  SKILL_CATEGORIES,
  SKILL_ICON_OPTIONS,
  SKILL_PRESETS,
  getProficiencyTier,
  getSkillIcon,
} from "@/lib/skills";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

interface AddSkillModalProps {
  isOpen: boolean;
  existingSkills: Skill[];
  editingSkill?: Skill | null;
  initialName?: string;
  onClose: () => void;
  onSave: (skill: Omit<Skill, "isCustom">, originalName?: string) => {
    ok: boolean;
    error?: string;
  };
}

const DEFAULT_FORM = {
  name: "",
  category: "Frontend" as SkillCategory,
  icon: "code-2",
  level: 80,
  experience: "6+ months",
  description: "",
  usageNote: "",
  highlightsText: "",
};

export default function AddSkillModal({
  isOpen,
  existingSkills,
  editingSkill = null,
  initialName = "",
  onClose,
  onSave,
}: AddSkillModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(DEFAULT_FORM.name);
  const [category, setCategory] = useState<SkillCategory>(DEFAULT_FORM.category);
  const [icon, setIcon] = useState(DEFAULT_FORM.icon);
  const [level, setLevel] = useState(DEFAULT_FORM.level);
  const [experience, setExperience] = useState(DEFAULT_FORM.experience);
  const [description, setDescription] = useState(DEFAULT_FORM.description);
  const [usageNote, setUsageNote] = useState(DEFAULT_FORM.usageNote);
  const [highlightsText, setHighlightsText] = useState(DEFAULT_FORM.highlightsText);
  const [error, setError] = useState<string | null>(null);

  useModalAccessibility(isOpen, onClose, contentRef, "input");

  useEffect(() => {
    if (!isOpen) return;

    if (editingSkill) {
      setName(editingSkill.name);
      setCategory(editingSkill.category);
      setIcon(editingSkill.icon || "code-2");
      setLevel(editingSkill.level ?? 80);
      setExperience(editingSkill.experience ?? "Active");
      setDescription(editingSkill.description);
      setUsageNote(editingSkill.usageNote ?? "");
      setHighlightsText((editingSkill.highlights ?? []).join(", "));
    } else {
      setName(initialName);
      setCategory(DEFAULT_FORM.category);
      setIcon(DEFAULT_FORM.icon);
      setLevel(DEFAULT_FORM.level);
      setExperience(DEFAULT_FORM.experience);
      setDescription(DEFAULT_FORM.description);
      setUsageNote(DEFAULT_FORM.usageNote);
      setHighlightsText(DEFAULT_FORM.highlightsText);
    }
    setError(null);
  }, [isOpen, editingSkill, initialName]);

  const availablePresets = SKILL_PRESETS.filter(
    (preset) =>
      !existingSkills.some(
        (existing) => existing.name.toLowerCase() === preset.name.toLowerCase()
      )
  );

  const applyPreset = (preset: Omit<Skill, "isCustom">) => {
    setName(preset.name);
    setCategory(preset.category);
    setIcon(preset.icon);
    setLevel(preset.level ?? 75);
    setExperience(preset.experience ?? "6+ months");
    setDescription(preset.description);
    setUsageNote(preset.usageNote ?? "");
    setHighlightsText((preset.highlights ?? []).join(", "));
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();

    if (!trimmedName) {
      setError("Please enter a skill name.");
      return;
    }
    if (!trimmedDesc) {
      setError("Please add a brief description of what you do with this skill.");
      return;
    }

    const parsedHighlights = highlightsText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 6);

    const payload: Omit<Skill, "isCustom"> = {
      name: trimmedName,
      category,
      icon,
      level,
      tier: getProficiencyTier(level),
      experience: experience.trim() || "Active",
      description: trimmedDesc,
      usageNote: usageNote.trim() || undefined,
      highlights:
        parsedHighlights.length > 0
          ? parsedHighlights
          : ["Core Concepts", "Project Application"],
    };

    const result = onSave(payload, editingSkill?.name);
    if (!result.ok) {
      setError(result.error ?? "Could not save skill.");
      return;
    }
    onClose();
  };

  const tier = getProficiencyTier(level);
  const inputClasses =
    "w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3.5 py-2.5 text-base sm:text-sm text-[#f5f5f7] placeholder-[#86868b] transition-colors focus:border-[#2997ff] focus:outline-none";

  return (
    <AnimatePresence>
      {isOpen && (
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
            aria-label={editingSkill ? `Edit skill: ${editingSkill.name}` : "Add a new skill"}
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[rgba(255,255,255,0.14)] bg-[#161616] text-[#f5f5f7] shadow-2xl"
          >
            {/* Mobile Drag Handle */}
            <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-[#1c1c1e] p-2 text-[#a1a1a6] transition-colors hover:text-[#f5f5f7] cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
                  {editingSkill ? "Update Capability" : "Expand Toolkit"}
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#f5f5f7] sm:text-2xl">
                  {editingSkill ? `Edit ${editingSkill.name}` : "Add a New Skill"}
                </h3>
              </div>

              {/* Quick-Pick Presets when adding */}
              {!editingSkill && availablePresets.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-[#86868b]">
                    <Sparkles size={12} className="text-[#2997ff]" />
                    <span>Quick fill popular technologies:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {availablePresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#1c1c1e] px-3 py-1 text-xs font-medium text-[#a1a1a6] transition-all hover:border-[#2997ff]/50 hover:text-[#f5f5f7] cursor-pointer"
                      >
                        <Plus size={11} className="text-[#2997ff]" />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Card Preview */}
              <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#111111] p-3.5">
                <div className="mb-2 text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                  Live Preview
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1c1c1e] text-[#2997ff]">
                    {getSkillIcon(icon, 20)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-[#f5f5f7]">
                        {name.trim() || "Skill Name"}
                      </span>
                      <span className="shrink-0 rounded-full bg-white/6 px-2 py-0.5 text-[9px] font-mono text-[#86868b]">
                        {category}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-[#86868b]">
                      {description.trim() || "Short overview of what you build with it"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-xl border border-[#ff453a]/40 bg-[#ff453a]/10 px-3.5 py-2.5 text-xs text-[#ff6961]"
                >
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name & Experience */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="skill-name-input"
                    className="mb-1.5 block text-xs font-medium text-[#a1a1a6]"
                  >
                    Skill Name *
                  </label>
                  <input
                    id="skill-name-input"
                    type="text"
                    value={name}
                    maxLength={40}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="e.g. Next.js, Node.js, Figma"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="skill-experience-input"
                    className="mb-1.5 block text-xs font-medium text-[#a1a1a6]"
                  >
                    Experience
                  </label>
                  <input
                    id="skill-experience-input"
                    type="text"
                    value={experience}
                    maxLength={28}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 1+ year, Exploring"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <span className="mb-1.5 block text-xs font-medium text-[#a1a1a6]">
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                        category === cat
                          ? "bg-[#2997ff] text-white shadow-[0_0_12px_rgba(41,151,255,0.3)]"
                          : "border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] text-[#a1a1a6] hover:text-[#f5f5f7]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <span className="mb-1.5 block text-xs font-medium text-[#a1a1a6]">
                  Icon
                </span>
                <div className="grid grid-cols-8 gap-1.5">
                  {SKILL_ICON_OPTIONS.map((opt) => {
                    const active = icon === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setIcon(opt.id)}
                        title={opt.label}
                        aria-label={`Select ${opt.label} icon`}
                        aria-pressed={active}
                        className={`flex h-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                          active
                            ? "border-[#2997ff] bg-[#2997ff]/15 text-[#2997ff]"
                            : "border-[rgba(255,255,255,0.08)] bg-[#1c1c1e] text-[#a1a1a6] hover:border-white/25 hover:text-[#f5f5f7]"
                        }`}
                      >
                        {opt.render(16)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Proficiency Slider */}
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <label htmlFor="skill-level-range" className="font-medium text-[#a1a1a6]">
                    Proficiency
                  </label>
                  <span className="font-mono text-[#f5f5f7]">
                    <span className="text-[#86868b] mr-1.5">{tier}</span>
                    <span className="font-semibold text-[#2997ff]">{level}%</span>
                  </span>
                </div>
                <input
                  id="skill-level-range"
                  type="range"
                  min={20}
                  max={100}
                  step={2}
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full accent-[#2997ff] cursor-pointer"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="skill-desc-input"
                  className="mb-1.5 block text-xs font-medium text-[#a1a1a6]"
                >
                  Short Description *
                </label>
                <input
                  id="skill-desc-input"
                  type="text"
                  value={description}
                  maxLength={120}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. Full-stack React framework with App Router and SSR"
                  className={inputClasses}
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label
                  htmlFor="skill-highlights-input"
                  className="mb-1.5 block text-xs font-medium text-[#a1a1a6]"
                >
                  What You Know (comma separated)
                </label>
                <input
                  id="skill-highlights-input"
                  type="text"
                  value={highlightsText}
                  maxLength={160}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="e.g. REST APIs, Express Middleware, Auth Flows"
                  className={inputClasses}
                />
              </div>

              {/* Usage Note */}
              <div>
                <label
                  htmlFor="skill-usage-input"
                  className="mb-1.5 block text-xs font-medium text-[#a1a1a6]"
                >
                  Practical Context (optional)
                </label>
                <textarea
                  id="skill-usage-input"
                  rows={2}
                  value={usageNote}
                  maxLength={220}
                  onChange={(e) => setUsageNote(e.target.value)}
                  placeholder="How you apply this skill in projects..."
                  className={inputClasses}
                />
              </div>

              {/* Submit Bar */}
              <div className="flex items-center justify-end gap-3 border-t border-[rgba(255,255,255,0.08)] pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-5 py-2.5 text-xs font-medium text-[#a1a1a6] transition-colors hover:text-[#f5f5f7] cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#2997ff] px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(41,151,255,0.3)] transition-colors hover:bg-[#5eaeff] cursor-pointer"
                >
                  <Check size={14} />
                  <span>{editingSkill ? "Save Changes" : "Add Skill"}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

