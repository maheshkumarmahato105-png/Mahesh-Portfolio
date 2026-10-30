import { motion } from "motion/react";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/types";
import { prefersReducedMotion } from "@/lib/utils";
import ProjectGraphic from "@/components/ProjectGraphic";

interface ProjectCardProps {
  project: Project;
  index: number;
  inView?: boolean;
  onSelect: (project: Project) => void;
  isFeatured?: boolean;
}

export default function ProjectCard({
  project,
  index,
  onSelect,
  isFeatured = false,
}: ProjectCardProps) {
  const reduced = prefersReducedMotion();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: reduced ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        delay: (index % 3) * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#161616] transition-all duration-300 hover:border-[rgba(255,255,255,0.24)] hover:bg-[#19191b] ${
        isFeatured ? "lg:col-span-2" : "col-span-1"
      }`}
    >
      <div>
        {/* Visual Preview Area */}
        <div
          onClick={() => onSelect(project)}
          className={`relative w-full overflow-hidden bg-[#1c1c1e] cursor-pointer ${
            isFeatured ? "aspect-21/9 sm:aspect-16/7" : "aspect-16/10"
          }`}
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <ProjectGraphic id={project.id} title={project.title} category={project.category} />
          )}

          {/* Sample Indicator Pill */}
          {project.isSample && (
            <div className="absolute right-4 top-4 rounded-full border border-[rgba(255,255,255,0.14)] bg-[#161616]/80 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#a1a1a6] backdrop-blur-md">
              Sample Project
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-8">
          {/* Eyebrow Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
              {project.category}
            </span>
          </div>

          {/* Main Title */}
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f5f7]">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2.5 text-sm leading-relaxed text-[#a1a1a6] line-clamp-2">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[#1c1c1e] px-2.5 py-1 text-[11px] font-mono text-[#86868b]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] px-6 py-4 sm:px-8">
        <button
          onClick={() => onSelect(project)}
          className="group/link flex items-center gap-1.5 text-xs font-medium text-[#2997ff] hover:text-[#5eaeff] transition-colors cursor-pointer"
        >
          <span>View Overview</span>
          <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-0.5" />
        </button>

        <div className="flex items-center gap-4 text-xs font-medium text-[#86868b]">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#f5f5f7] transition-colors"
            >
              <span>Demo</span>
              <ExternalLink size={12} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#f5f5f7] transition-colors"
            >
              <Code2 size={13} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
