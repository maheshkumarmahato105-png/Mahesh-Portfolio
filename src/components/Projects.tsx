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

        {/* Mobile-Interactive Horizontally-Scrollable Category Filter Strip */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-12 flex items-center overflow-x-auto no-scrollbar sm:justify-center gap-2 py-2 snap-x"
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
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all cursor-pointer shrink-0 snap-start select-none ${
                activeFilter === cat
                  ? "bg-[#2997ff] text-white shadow-[0_0_15px_rgba(41,151,255,0.35)]"
                  : "border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#a1a1a6] hover:border-[rgba(255,255,255,0.24)] hover:text-[#f5f5f7]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid: Spacious 2-Column Composition with Progressive Scroll Reveals */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
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
      </div>

      {/* Apple Product Sheet Modal */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
}
