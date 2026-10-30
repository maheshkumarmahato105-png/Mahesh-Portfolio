import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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
      ref={ref}
      className="relative px-6 py-24 sm:py-32 lg:py-40"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-(--color-border) to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Projects"
          title="Selected work"
          description="A showcase of projects I've built. Replace these samples with your real work."
          inView={inView}
        />

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-(--color-accent) text-white shadow-(--color-accent-glow)"
                  : "border border-(--color-border) text-(--color-text-secondary) hover:border-(--color-border-hover) hover:text-(--color-text-primary)"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                onSelect={openModal}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-(--color-text-muted)"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
}
