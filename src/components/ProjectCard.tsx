import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ExternalLink,
  Code2,
  Check,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/types";
import { prefersReducedMotion, copyToClipboard } from "@/lib/utils";
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

  // Instagram Interactive States with LocalStorage persistence
  const [isLiked, setIsLiked] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_liked_projects");
      if (saved) {
        const likedIds = JSON.parse(saved);
        return Array.isArray(likedIds) && likedIds.includes(project.id);
      }
    } catch {
      // fallback
    }
    return false;
  });

  const baseLikes = 48 + index * 9;
  const [likesCount, setLikesCount] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_liked_projects");
      if (saved) {
        const likedIds = JSON.parse(saved);
        if (Array.isArray(likedIds) && likedIds.includes(project.id)) {
          return baseLikes + 1;
        }
      }
    } catch {}
    return baseLikes;
  });

  const [isSaved, setIsSaved] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastTapRef = useRef<number>(0);

  const toggleLikePersist = (liked: boolean) => {
    try {
      const saved = localStorage.getItem("portfolio_liked_projects");
      let likedIds: string[] = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(likedIds)) likedIds = [];
      if (liked) {
        if (!likedIds.includes(project.id)) likedIds.push(project.id);
      } else {
        likedIds = likedIds.filter((id) => id !== project.id);
      }
      localStorage.setItem("portfolio_liked_projects", JSON.stringify(likedIds));
    } catch {}
  };

  // Instagram double-tap to like on mobile and desktop
  const handleImageTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        toggleLikePersist(true);
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
      toggleLikePersist(false);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      toggleLikePersist(true);
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
      initial={{ opacity: 0, y: reduced ? 0 : 35, scale: reduced ? 1 : 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        delay: (index % 2) * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#161616] transition-all duration-300 hover:border-[#2997ff]/40 hover:shadow-[0_0_30px_rgba(41,151,255,0.14)] ${
        isFeatured ? "lg:col-span-2" : "col-span-1"
      }`}
    >
      <div>
        {/* ─── Apple-Styled Instagram Post Header ─── */}
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            {/* Story Ring Avatar with Authentic Instagram Sunset Gradient */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[0_0_10px_rgba(220,39,67,0.3)]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#161616] text-[11px] font-semibold text-[#f5f5f7]">
                M
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f5f5f7]">
                <span>mahesh.dev</span>
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#2997ff] text-white text-[7px] font-bold">
                  ✓
                </span>
              </div>
              <div className="text-[10px] text-[#86868b]">
                {project.category} • San Francisco, CA
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelect(project)}
            className="rounded-full p-1.5 text-[#86868b] hover:bg-white/6 hover:text-[#f5f5f7] transition-colors cursor-pointer"
            aria-label="View options"
          >
            <MoreHorizontal size={17} />
          </button>
        </div>

        {/* ─── Visual Preview Area with Double-Tap to Like ─── */}
        <div
          onClick={handleImageTap}
          className={`relative w-full overflow-hidden bg-[#1c1c1e] cursor-pointer select-none ${
            isFeatured ? "aspect-21/9 sm:aspect-16/7" : "aspect-16/10"
          }`}
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <ProjectGraphic id={project.id} title={project.title} category={project.category} />
          )}

          {/* Double-Tap Heart Burst Animation */}
          <AnimatePresence>
            {showHeartBurst && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.35, 1], opacity: [0, 1, 0] }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <Heart
                  size={96}
                  className="fill-[#ed4956] text-[#ed4956] drop-shadow-[0_0_35px_rgba(237,73,86,0.75)]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sample Indicator Pill */}
          {project.isSample && (
            <div className="absolute right-4 top-4 rounded-full border border-[rgba(255,255,255,0.14)] bg-[#161616]/80 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#a1a1a6] backdrop-blur-md">
              Sample Project
            </div>
          )}
        </div>

        {/* ─── Apple-Styled Instagram Action Bar ─── */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleToggleLike}
              className={`transition-colors cursor-pointer ${
                isLiked ? "text-[#ed4956]" : "text-[#f5f5f7] hover:text-[#ed4956]"
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

            {/* Comment Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => onSelect(project)}
              className="text-[#f5f5f7] hover:text-[#2997ff] transition-colors cursor-pointer"
              aria-label="View details and comments"
            >
              <MessageCircle size={21} strokeWidth={2} />
            </motion.button>

            {/* Share / Copy Link Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleShare}
              className="text-[#f5f5f7] hover:text-[#2997ff] transition-colors cursor-pointer"
              aria-label="Share project link"
            >
              {copied ? (
                <Check size={20} className="text-[#2997ff]" />
              ) : (
                <Send size={20} strokeWidth={2} />
              )}
            </motion.button>
          </div>

          {/* Bookmark / Save Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleToggleSave}
            className={`transition-colors cursor-pointer ${
              isSaved ? "text-[#2997ff]" : "text-[#f5f5f7] hover:text-[#2997ff]"
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
        <div className="px-5 pb-5">
          {/* Likes Count */}
          <div className="text-xs font-semibold text-[#f5f5f7]">
            {likesCount} likes
          </div>

          {/* Main Title & Description Caption */}
          <div className="mt-2 text-xs sm:text-sm leading-relaxed text-[#a1a1a6]">
            <span className="font-semibold text-[#f5f5f7] mr-1.5">mahesh.dev</span>
            <span className="text-[#f5f5f7] font-medium mr-1">{project.title}:</span>
            <span>{project.description}</span>
          </div>

          {/* Technology Hashtags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[#1c1c1e] px-2 py-0.5 text-[10px] font-mono text-[#86868b] transition-colors group-hover:text-[#2997ff]"
              >
                #{tech.toLowerCase().replace(/[^a-z0-9]/g, "")}
              </span>
            ))}
          </div>

          {/* Toast feedback */}
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#2997ff]/10 border border-[#2997ff]/30 px-3 py-1 text-[10px] font-medium text-[#2997ff]"
            >
              <Check size={11} />
              <span>Project link copied to clipboard</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* ─── Footer Action Bar ─── */}
      <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] px-5 py-3.5 bg-[#141416]">
        <button
          onClick={() => onSelect(project)}
          className="group/link flex items-center gap-1.5 text-xs font-medium text-[#2997ff] hover:text-[#5eaeff] transition-colors cursor-pointer py-1"
        >
          <span>View Overview Sheet</span>
          <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-0.5" />
        </button>

        <div className="flex items-center gap-4 text-xs font-medium text-[#86868b]">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#f5f5f7] transition-colors py-1"
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
              className="flex items-center gap-1 hover:text-[#f5f5f7] transition-colors py-1"
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
