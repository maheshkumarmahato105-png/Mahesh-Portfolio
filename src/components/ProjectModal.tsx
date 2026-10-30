import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import ProjectGraphic from "@/components/ProjectGraphic";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Trap focus, close on Escape, prevent body scroll
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Basic focus trap
      if (e.key === "Tab" && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);

    // Focus the close button
    const timer = setTimeout(() => {
      contentRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal / iOS Bottom Sheet Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.title}`}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-[32px] sm:rounded-3xl border border-(--color-border) bg-(--color-bg-elevated) shadow-2xl"
          >
            {/* iOS Bottom Sheet Drag Handle (Mobile Only) */}
            <div className="mx-auto mt-2.5 mb-1 h-1 w-10 rounded-full bg-(--color-text-muted)/40 sm:hidden" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-(--color-surface) p-2 text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="aspect-video w-full overflow-hidden bg-linear-to-br from-(--color-surface) to-(--color-bg)">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <ProjectGraphic id={project.id} title={project.title} category={project.category} />
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Sample notice */}
              {project.isSample && (
                <div className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-xs text-amber-400">
                  This is a sample project entry. Replace it with your real work.
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-(--color-accent)">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-(--color-text-primary)">
                    {project.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-base leading-relaxed text-(--color-text-secondary)">
                {project.longDescription || project.description}
              </p>

              {/* Tech Stack */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
                  Technologies
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-(--color-border) px-3 py-1 text-xs font-medium text-(--color-text-secondary)"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-8 flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-(--color-accent) px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-(--color-accent-hover) hover:shadow-(--color-accent-glow)"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                ) : (
                  <span className="flex items-center gap-2 rounded-full border border-(--color-border) px-6 py-2.5 text-sm text-(--color-text-muted) opacity-50">
                    <ExternalLink size={14} />
                    Demo not available
                  </span>
                )}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-(--color-border) px-6 py-2.5 text-sm font-medium text-(--color-text-primary) transition-colors hover:bg-(--color-surface)"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    View Source
                  </a>
                ) : (
                  <span className="flex items-center gap-2 rounded-full border border-(--color-border) px-6 py-2.5 text-sm text-(--color-text-muted) opacity-50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    Source not available
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
