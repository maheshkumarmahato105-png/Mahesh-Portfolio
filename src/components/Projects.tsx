import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grid3X3, Rows, Heart, MessageCircle } from "lucide-react";
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
          /* Grid Mode: Instagram Profile 3-Column Square Tiles with Hover / Tap Overlay */
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openModal(project)}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] cursor-pointer select-none"
                >
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

                  {/* Instagram-Style Overlay on Hover / Active */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 p-3 text-center backdrop-blur-xs">
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {project.title}
                    </span>
                    <div className="mt-2 flex items-center gap-4 text-xs font-bold text-white">
                      <div className="flex items-center gap-1">
                        <Heart size={14} className="fill-white" />
                        <span>{48 + index * 9}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} className="fill-white" />
                        <span>{2 + index}</span>
                      </div>
                    </div>
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
