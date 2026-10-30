import { motion } from "motion/react";
import { ExternalLink, Info } from "lucide-react";
import type { Project } from "@/types";
import { prefersReducedMotion } from "@/lib/utils";
import ProjectGraphic from "@/components/ProjectGraphic";

interface ProjectCardProps {
  project: Project;
  index: number;
  inView?: boolean;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  onSelect,
}: ProjectCardProps) {
  const reduced = prefersReducedMotion();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: reduced ? 0 : 45, scale: reduced ? 1 : 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: (index % 3) * 0.12,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={reduced ? {} : { y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-glass) backdrop-blur-sm transition-colors hover:border-(--color-border-hover)"
    >
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-(--color-surface) to-(--color-bg-elevated)">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <ProjectGraphic id={project.id} title={project.title} category={project.category} />
        )}

        {/* Sample Badge */}
        {project.isSample && (
          <div className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-semibold text-black backdrop-blur-sm">
            Sample
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur-md">
          {project.category}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onSelect(project)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105"
            aria-label={`View details for ${project.title}`}
          >
            <Info size={14} />
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-(--color-text-primary)">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-(--color-text-secondary)">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-(--color-surface) px-2 py-0.5 text-[10px] font-medium text-(--color-text-muted)"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-4 flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-(--color-accent) transition-colors hover:text-(--color-accent-hover)"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              Source Code
            </a>
          )}
          {!project.demoUrl && !project.repoUrl && (
            <span className="text-xs italic text-(--color-text-muted)">
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
