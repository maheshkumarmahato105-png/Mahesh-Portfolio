import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project, ProjectCategory } from "@/types";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

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
  const reduced = prefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
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
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[550px] w-[550px] bg-[radial-gradient(circle_at_center,rgba(41,151,255,0.06)_0%,transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Showcase"
          title="Crafted for clarity."
          description="A curated selection of focused web applications engineered with modern technologies and attention to visual detail."
        />

        {/* Minimal Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-12 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-[#2997ff] text-white shadow-xs"
                  : "border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#a1a1a6] hover:border-[rgba(255,255,255,0.22)] hover:text-[#f5f5f7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid: Spacious 2-Column Composition */}
        <div
          className="mt-14 grid gap-8 md:grid-cols-2"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isFeatured={i === 0 && activeFilter === "All"}
                onSelect={openModal}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-[#86868b] text-sm"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>

      {/* Project Overview Modal */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
}
