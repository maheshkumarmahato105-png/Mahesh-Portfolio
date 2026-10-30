import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Code2 } from "lucide-react";
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

          {/* Modal / Bottom Sheet Panel */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.title}`}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[rgba(255,255,255,0.14)] bg-[#161616] shadow-2xl text-[#f5f5f7]"
          >
            {/* Mobile Sheet Drag Handle */}
            <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-[#1c1c1e] p-2 text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Image Preview */}
            <div className="aspect-16/9 w-full overflow-hidden bg-[#1c1c1e]">
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
              {project.isSample && (
                <div className="mb-4 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1c1c1e] px-4 py-2 text-xs font-mono text-[#86868b]">
                  Sample Project Entry
                </div>
              )}

              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
                  {project.category}
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7]">
                  {project.title}
                </h3>
              </div>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#a1a1a6]">
                {project.longDescription || project.description}
              </p>

              {/* Technologies */}
              <div className="mt-6 border-t border-[rgba(255,255,255,0.08)] pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]">
                  Engineered With
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[#1c1c1e] px-2.5 py-1 text-xs font-mono text-[#a1a1a6]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-8 flex flex-wrap gap-3 border-t border-[rgba(255,255,255,0.08)] pt-6">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#2997ff] hover:bg-[#5eaeff] px-6 py-2.5 text-xs font-medium text-white transition-colors"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                ) : (
                  <span className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] px-5 py-2.5 text-xs text-[#86868b] opacity-60">
                    <ExternalLink size={13} />
                    Demo not linked
                  </span>
                )}

                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] hover:bg-[#252528] px-6 py-2.5 text-xs font-medium text-[#f5f5f7] transition-colors"
                  >
                    <Code2 size={14} />
                    View Source
                  </a>
                ) : (
                  <span className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] px-5 py-2.5 text-xs text-[#86868b] opacity-60">
                    <Code2 size={14} />
                    Source not linked
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
