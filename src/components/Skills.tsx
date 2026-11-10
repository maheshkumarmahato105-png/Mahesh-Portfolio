import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Project, Skill } from "@/types";
import { prefersReducedMotion } from "@/lib/utils";
import { getSkillIcon } from "@/lib/skills";
import SectionHeading from "@/components/SectionHeading";
import SkillDetailModal from "@/components/SkillDetailModal";
import AddSkillModal from "@/components/AddSkillModal";

interface SkillsProps {
  skills: Skill[];
  projects: Project[];
  onAddSkill: (skill: Omit<Skill, "isCustom">) => { ok: boolean; error?: string };
  onUpdateSkill: (
    originalName: string,
    updates: Partial<Skill>
  ) => { ok: boolean; error?: string };
  onRemoveSkill: (name: string) => void;
}

export default function Skills({
  skills,
  projects,
  onAddSkill,
  onUpdateSkill,
  onRemoveSkill,
}: SkillsProps) {
  const reduced = prefersReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [prefillName, setPrefillName] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const categories = ["All", ...new Set(skills.map((s) => s.category))];
  const effectiveCategory = categories.includes(activeCategory)
    ? activeCategory
    : "All";

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      effectiveCategory === "All" || skill.category === effectiveCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    return (
      skill.name.toLowerCase().includes(normalizedQuery) ||
      skill.description.toLowerCase().includes(normalizedQuery) ||
      skill.category.toLowerCase().includes(normalizedQuery) ||
      (skill.highlights ?? []).some((h) => h.toLowerCase().includes(normalizedQuery))
    );
  });

  const openAddModal = (initial = "") => {
    setEditingSkill(null);
    setPrefillName(initial);
    setIsAddModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setSelectedSkill(null);
    setEditingSkill(skill);
    setPrefillName("");
    setIsAddModalOpen(true);
  };

  const handleSaveSkill = (
    payload: Omit<Skill, "isCustom">,
    originalName?: string
  ) => {
    if (originalName) {
      const res = onUpdateSkill(originalName, payload);
      if (res.ok) {
        showToast(`Updated "${payload.name}"`);
      }
      return res;
    }

    const res = onAddSkill(payload);
    if (res.ok) {
      setSearchQuery("");
      if (activeCategory !== "All" && activeCategory !== payload.category) {
        setActiveCategory("All");
      }
      showToast(`Added "${payload.name}" to skills`);
    }
    return res;
  };

  const handleDeleteSkill = (name: string) => {
    onRemoveSkill(name);
    showToast(`Removed "${name}"`);
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
          description="Tap any skill card to explore proficiency, practical capabilities, and connected projects — or add new skills directly to the toolkit."
        />

        {/* Interactive Toolbar: Search & Add Skill CTA */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-sm">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, concepts, or tools..."
              aria-label="Search skills"
              className="w-full rounded-full border border-[rgba(255,255,255,0.12)] bg-[#161616] py-2.5 pl-10 pr-9 text-base sm:text-sm text-[#f5f5f7] placeholder-[#86868b] transition-colors focus:border-[#2997ff] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#86868b] hover:text-[#f5f5f7] cursor-pointer"
                aria-label="Clear skill search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Count Badge & Add Skill Action */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs font-mono text-[#86868b]">
              {filteredSkills.length} of {skills.length} capabilities
            </span>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => openAddModal()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2997ff] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_18px_rgba(41,151,255,0.28)] transition-colors hover:bg-[#5eaeff] cursor-pointer select-none"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Add Skill</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile-Interactive Horizontally-Scrollable Category Filter Strip */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-5 flex items-center overflow-x-auto no-scrollbar sm:justify-center gap-2 py-2 snap-x"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={effectiveCategory === cat}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all cursor-pointer shrink-0 snap-start select-none ${
                effectiveCategory === cat
                  ? "bg-[#2997ff] text-white shadow-[0_0_15px_rgba(41,151,255,0.35)]"
                  : "border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#a1a1a6] hover:border-[rgba(255,255,255,0.24)] hover:text-[#f5f5f7]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Toast Feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-[#2997ff]/35 bg-[#161616] px-4 py-1.5 text-xs font-medium text-[#f5f5f7] shadow-lg"
            >
              <CheckCircle2 size={14} className="text-[#2997ff]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Grid with Scroll-Triggered Container & Fluid Filter Transitions */}
        {filteredSkills.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            role="tabpanel"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, i) => {
                const isSelected = selectedSkill?.name === skill.name;
                const level = skill.level ?? 80;
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, y: reduced ? 0 : 14, scale: reduced ? 1 : 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      delay: reduced ? 0 : Math.min((i % 5) * 0.04, 0.2),
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedSkill(skill)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedSkill(skill);
                      }
                    }}
                    className={`group relative flex h-full flex-col justify-between rounded-2xl border p-3.5 sm:p-5 transition-all cursor-pointer select-none ${
                      isSelected
                        ? "border-[#2997ff] bg-[#1c1c1e] shadow-[0_0_24px_rgba(41,151,255,0.22)]"
                        : "border-[rgba(255,255,255,0.12)] bg-[#161616] hover:border-[#2997ff]/40 hover:bg-[#1c1c1e] hover:shadow-[0_0_18px_rgba(41,151,255,0.12)]"
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect ${skill.name}: ${skill.description}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <div className="text-[#2997ff] transition-transform duration-300 group-hover:scale-110">
                          {getSkillIcon(skill.icon, 22)}
                        </div>
                        <div className="flex items-center gap-1">
                          {skill.isCustom && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-[#2997ff]"
                              title="Custom added skill"
                            />
                          )}
                          <span className="rounded-full bg-white/6 px-2 py-0.5 text-[9px] font-mono text-[#86868b]">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-4 text-sm font-semibold tracking-tight text-[#f5f5f7]">
                        {skill.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#86868b] transition-colors group-hover:text-[#a1a1a6]">
                        {skill.description}
                      </p>
                    </div>

                    {/* Proficiency Indicator & Inspect Cue */}
                    <div className="mt-4 space-y-2 border-t border-[rgba(255,255,255,0.06)] pt-2.5">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-[#2997ff]/80 transition-all duration-300 group-hover:bg-[#5eaeff]"
                          style={{ width: `${level}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#86868b]">
                        <span className="font-mono">{level}%</span>
                        <span className="inline-flex items-center gap-0.5 text-[#a1a1a6] transition-colors group-hover:text-[#2997ff]">
                          <span>Know more</span>
                          <ArrowUpRight size={10} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Quick Add Skill Card */}
              {!normalizedQuery && (
                <motion.button
                  key="add-skill-tile"
                  layout
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openAddModal()}
                  className="group flex h-full min-h-[168px] flex-col items-center justify-center gap-2.5 rounded-2xl border border-dashed border-[rgba(255,255,255,0.18)] bg-[#161616]/50 p-4 text-center transition-all hover:border-[#2997ff]/60 hover:bg-[#1c1c1e] cursor-pointer select-none"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] text-[#2997ff] transition-transform duration-300 group-hover:scale-110">
                    <Plus size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#f5f5f7]">Add Skill</div>
                    <div className="mt-0.5 text-[11px] text-[#86868b]">
                      Custom capability
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search State with Instant Add Shortcut */
          <div className="mt-10 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#161616] px-6 py-12 text-center">
            <p className="text-sm font-medium text-[#f5f5f7]">
              No matching skills found for "{searchQuery.trim()}".
            </p>
            <p className="mt-1 text-xs text-[#86868b]">
              Try a different keyword or add it directly as a custom skill.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="rounded-full border border-[rgba(255,255,255,0.14)] bg-[#1c1c1e] px-5 py-2 text-xs font-medium text-[#f5f5f7] hover:bg-[#252528] cursor-pointer"
              >
                Reset Filter
              </button>
              <button
                type="button"
                onClick={() => openAddModal(searchQuery.trim())}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#2997ff] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5eaeff] cursor-pointer"
              >
                <Plus size={13} />
                <span>Add "{searchQuery.trim()}"</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Know Skill Modal / Bottom Sheet */}
      <SkillDetailModal
        skill={selectedSkill}
        allSkills={skills}
        projects={projects}
        onClose={() => setSelectedSkill(null)}
        onSelectSkill={setSelectedSkill}
        onEditCustomSkill={openEditModal}
        onDeleteCustomSkill={handleDeleteSkill}
      />

      {/* Add / Edit Skill Modal */}
      <AddSkillModal
        isOpen={isAddModalOpen}
        existingSkills={skills}
        editingSkill={editingSkill}
        initialName={prefillName}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveSkill}
      />
    </section>
  );
}
