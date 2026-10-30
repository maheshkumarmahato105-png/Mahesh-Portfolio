import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ExternalLink,
  Info,
  Check,
} from "lucide-react";
import type { Project } from "@/types";
import { prefersReducedMotion, copyToClipboard } from "@/lib/utils";
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

  // Instagram Interactive States
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(24 + index * 7);
  const [isSaved, setIsSaved] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastTapRef = useRef<number>(0);

  // Instagram double-tap to like on mobile and desktop
  const handleImageTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
    lastTapRef.current = now;
  };

  const handleToggleLike = (e: MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
  };

  const handleToggleSave = (e: MouseEvent) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  const handleShare = async (e: MouseEvent) => {
    e.stopPropagation();
    const url = project.demoUrl || project.repoUrl || window.location.href;
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-bg-glass) backdrop-blur-md transition-all hover:border-(--color-border-hover) shadow-sm hover:shadow-xl"
    >
      {/* ─── Instagram Post Header ─── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--color-border)">
        <div className="flex items-center gap-2.5">
          {/* Avatar with Story gradient ring */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-(--color-bg) font-bold text-xs text-(--color-text-primary)">
              M
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-(--color-text-primary)">
              <span>mahesh.dev</span>
              <span className="h-1 w-1 rounded-full bg-blue-500" title="Verified Creator" />
            </div>
            <div className="text-[10px] text-(--color-text-muted)">
              {project.category}
            </div>
          </div>
        </div>

        {/* Options / Details Icon */}
        <button
          onClick={() => onSelect(project)}
          className="rounded-full p-1.5 text-(--color-text-muted) transition-colors hover:bg-(--color-surface) hover:text-(--color-text-primary)"
          aria-label="View project details"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* ─── Image Area with Double-Tap to Like ─── */}
      <div
        onClick={handleImageTap}
        className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-(--color-surface) to-(--color-bg-elevated) cursor-pointer select-none"
      >
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

        {/* Giant Instagram Center Heart Burst on Double-Tap */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.4, 0.95, 0],
                opacity: [0, 1, 1, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-rose-500 drop-shadow-[0_0_24px_rgba(244,63,94,0.8)]"
            >
              <Heart size={80} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Instagram Action Buttons Row ─── */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <div className="flex items-center gap-3">
          {/* Like Button with Bouncy Spring */}
          <motion.button
            whileTap={{ scale: 0.75 }}
            onClick={handleToggleLike}
            className={`transition-colors ${
              isLiked ? "text-rose-500" : "text-(--color-text-primary) hover:text-rose-500"
            }`}
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Heart size={21} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
            </motion.div>
          </motion.button>

          {/* Comment / Details Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onSelect(project)}
            className="text-(--color-text-primary) transition-colors hover:text-(--color-accent)"
            aria-label="View details"
          >
            <MessageCircle size={21} strokeWidth={2} />
          </motion.button>

          {/* Share / Copy Link Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleShare}
            className="text-(--color-text-primary) transition-colors hover:text-(--color-accent)"
            aria-label="Share project link"
          >
            {copied ? <Check size={20} className="text-emerald-400" /> : <Send size={20} strokeWidth={2} />}
          </motion.button>
        </div>

        {/* Bookmark Save Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleToggleSave}
          className={`transition-colors ${
            isSaved ? "text-(--color-accent)" : "text-(--color-text-primary) hover:text-(--color-accent)"
          }`}
          aria-label={isSaved ? "Unsave project" : "Save project"}
        >
          <motion.div
            animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Bookmark size={21} fill={isSaved ? "currentColor" : "none"} strokeWidth={isSaved ? 0 : 2} />
          </motion.div>
        </motion.button>
      </div>

      {/* ─── Likes Counter & Caption ─── */}
      <div className="px-4 pb-4">
        {/* Likes Count */}
        <div className="text-xs font-bold text-(--color-text-primary)">
          {likesCount} likes
        </div>

        {/* Caption */}
        <div className="mt-1 text-xs leading-relaxed text-(--color-text-secondary)">
          <span className="font-bold text-(--color-text-primary) mr-1.5">mahesh.dev</span>
          <span>{project.description}</span>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-(--color-border) bg-(--color-surface) px-2 py-0.5 text-[10px] font-medium text-(--color-text-muted)"
            >
              #{tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-3.5 flex items-center justify-between border-t border-(--color-border) pt-3 text-xs font-medium">
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1 font-semibold text-(--color-accent) hover:underline"
          >
            <Info size={13} />
            <span>View Full Details</span>
          </button>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
              >
                <span>Live Demo</span>
                <ExternalLink size={12} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
