import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grid3X3, Rows, Heart, MessageCircle, Sparkles } from "lucide-react";
import type { Project, ProjectCategory } from "@/types";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import ProjectGraphic from "@/components/ProjectGraphic";

interface ProjectsProps {
  projects: Project[];
}

const filterCategories: ProjectCategory[] = [
  "All",
  "Web App",
  "Frontend",
  "Full Stack",
];

export default function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [viewMode, setViewMode] = useState<"feed" | "grid">("feed");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 py-16 sm:py-28 lg:py-36"
    >
      {/* Living Ambient Aurora Color Animation */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="ambient-aurora opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          label="Showcase"
          title="Crafted for clarity."
          description="A curated selection of focused web applications engineered with modern technologies and attention to visual detail."
        />

        {/* ─── Instagram Profile Controls: Feed vs Grid View + Filter Pills ─── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-4">
          {/* Horizontally-Scrollable Category Filter Strip */}
          <div
            className="flex items-center overflow-x-auto no-scrollbar gap-2 py-1 max-w-full snap-x"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {filterCategories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveFilter(cat)}
                role="tab"
                aria-selected={activeFilter === cat}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer shrink-0 snap-start select-none ${
                  activeFilter === cat
                    ? "bg-[#2997ff] text-white shadow-[0_0_15px_rgba(41,151,255,0.35)]"
                    : "border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#a1a1a6] hover:border-[rgba(255,255,255,0.24)] hover:text-[#f5f5f7]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Instagram Profile View Mode Switcher (Feed vs Grid) */}
          <div className="flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#161616] p-1 shadow-xs shrink-0">
            <button
              onClick={() => setViewMode("feed")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                viewMode === "feed"
                  ? "bg-[#2997ff] text-white shadow-xs"
                  : "text-[#86868b] hover:text-[#f5f5f7]"
              }`}
              aria-label="Feed View"
              title="Feed View"
            >
              <Rows size={14} />
              <span className="hidden sm:inline">Feed</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#2997ff] text-white shadow-xs"
                  : "text-[#86868b] hover:text-[#f5f5f7]"
              }`}
              aria-label="Grid View"
              title="Grid View"
            >
              <Grid3X3 size={14} />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {/* ─── Projects Presentation: Feed vs Grid View ─── */}
        {viewMode === "feed" ? (
          /* Feed Mode: Full Instagram-Style Cards */
          <div className="mt-8 grid gap-6 sm:gap-8 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={openModal}
                  isFeatured={index === 0 && activeFilter === "All"}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Grid Mode: Instagram Profile Square Tiles (Optimized for Mobile Touch) */
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openModal(project)}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] cursor-pointer select-none shadow-sm hover:border-[#2997ff]/50 hover:shadow-[0_0_20px_rgba(41,151,255,0.2)] transition-all"
                >
                  {/* Thumbnail Image or Graphic */}
                  <div className="h-full w-full">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <ProjectGraphic id={project.id} title={project.title} category={project.category} />
                    )}
                  </div>

                  {/* Top-Right Instagram Media Badge */}
                  <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/65 border border-white/10 text-[#2997ff] backdrop-blur-md shadow-xs">
                    <Sparkles size={11} />
                  </div>

                  {/* Mobile-Friendly Bottom Info Vignette (Always visible on touchscreens) */}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 sm:p-3.5 transition-opacity duration-200">
                    <p className="text-xs sm:text-sm font-semibold text-[#f5f5f7] tracking-tight truncate drop-shadow-sm">
                      {project.title}
                    </p>
                    <div className="mt-0.5 flex items-center justify-between text-[10px] text-[#86868b]">
                      <span className="font-medium text-[#2997ff] truncate max-w-[60%]">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2 text-white/90 shrink-0 font-medium">
                        <span className="flex items-center gap-0.5">
                          <Heart size={10} className="fill-[#ff375f] text-[#ff375f]" />
                          <span>{48 + index * 9}</span>
                        </span>
                        <span className="flex items-center gap-0.5">
                          <MessageCircle size={10} className="fill-white/80" />
                          <span>{2 + index}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Hover Full-Blur Overlay */}
                  <div className="hidden sm:flex absolute inset-0 z-20 flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 p-4 text-center backdrop-blur-xs">
                    <span className="text-sm font-semibold text-white drop-shadow-md">
                      {project.title}
                    </span>
                    <span className="text-[11px] text-[#2997ff] font-medium mt-0.5">
                      {project.category}
                    </span>
                    <div className="mt-3 flex items-center gap-4 text-xs font-bold text-white">
                      <div className="flex items-center gap-1">
                        <Heart size={14} className="fill-[#ff375f] text-[#ff375f]" />
                        <span>{48 + index * 9}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} className="fill-white" />
                        <span>{2 + index}</span>
                      </div>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-white/80 rounded-full bg-white/10 px-2.5 py-1">
                      Tap to open sheet
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Apple iOS Product Sheet Modal */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
}
