import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Code2,
  Briefcase,
  Sparkles,
  Mail,
  X,
  ArrowRight,
} from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { getHeaderOffset } from "@/lib/utils";

interface Highlight {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  icon: typeof User;
  actionLabel: string;
  actionHref: string;
}

const highlightsData: Highlight[] = [
  {
    id: "about",
    name: "Profile",
    tagline: "Background",
    badge: "Highlight • 1 of 5",
    title: "Mahesh Kumar Mahato",
    subtitle: "Frontend Architecture & Interaction",
    paragraphs: [
      "Building web applications that balance engineering rigor with cinematic visual simplicity.",
      "Dedicated to translating complex user workflows into clean, intuitive, and remarkably fast interfaces.",
    ],
    icon: User,
    actionLabel: "Read Background",
    actionHref: "#about",
  },
  {
    id: "skills",
    name: "Toolkit",
    tagline: "Engineering",
    badge: "Highlight • 2 of 5",
    title: "Engineered for 60/120 FPS",
    subtitle: "Modern Frontend Stack",
    paragraphs: [
      "Specialized in React 19, TypeScript, Tailwind CSS, and Motion.",
      "Dedicated to semantic HTML, strict type safety, zero layout shifts, and sub-second initial load speeds.",
    ],
    icon: Code2,
    actionLabel: "View All Skills",
    actionHref: "#skills",
  },
  {
    id: "projects",
    name: "Showcase",
    tagline: "Work",
    badge: "Highlight • 3 of 5",
    title: "Precision & Craft",
    subtitle: "Production Applications",
    paragraphs: [
      "From weather analytics platforms to real-time productivity apps with local persistence.",
      "Every project is engineered with modular architecture, strict validation, and responsive polish.",
    ],
    icon: Briefcase,
    actionLabel: "Explore Projects",
    actionHref: "#projects",
  },
  {
    id: "craft",
    name: "Design",
    tagline: "Philosophy",
    badge: "Highlight • 4 of 5",
    title: "Subtlety & Clarity",
    subtitle: "Minimalism by Design",
    paragraphs: [
      "Guided by the principles of clarity, deliberate typography, obsidian depth, and tactile haptics.",
      "Details are not just details; they make the entire experience.",
    ],
    icon: Sparkles,
    actionLabel: "View Craftsmanship",
    actionHref: "#projects",
  },
  {
    id: "contact",
    name: "Connect",
    tagline: "Inquiry",
    badge: "Highlight • 5 of 5",
    title: "Available for Projects",
    subtitle: "Let's Collaborate",
    paragraphs: [
      "Looking for a frontend developer who treats performance, accessibility, and visual polish as non-negotiables?",
      "Send an inquiry—I look forward to discussing how I can deliver value to your team.",
    ],
    icon: Mail,
    actionLabel: "Get in Touch",
    actionHref: "#contact",
  },
];

export default function StoriesBar() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressTimerRef = useRef<number | null>(null);

  const activeStory = activeStoryIndex !== null ? highlightsData[activeStoryIndex] : null;

  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const interval = 50;
    const step = (interval / 5000) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          if (activeStoryIndex < highlightsData.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (progressTimerRef.current !== null) {
        window.clearInterval(progressTimerRef.current);
      }
    };
  }, [activeStoryIndex, isPaused]);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setStoryProgress(0);
    setIsPaused(false);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setStoryProgress(0);
  };

  const prevStory = () => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setStoryProgress(0);
    }
  };

  const nextStory = () => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex < highlightsData.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setStoryProgress(0);
    } else {
      closeStory();
    }
  };

  const handleAction = (href: string) => {
    closeStory();
    smoothScrollTo(href, { offset: getHeaderOffset() });
  };

  return (
    <>
      {/* Editorial Key Highlights Strip */}
      <div className="relative mx-auto max-w-7xl px-6 py-6 overflow-hidden">
        <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto no-scrollbar py-2">
          {highlightsData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => openStory(idx)}
                className="group flex items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#161616] hover:bg-[#1c1c1e] hover:border-[rgba(255,255,255,0.22)] px-4 py-2 transition-all cursor-pointer shrink-0"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/6 text-[#2997ff] group-hover:scale-105 transition-transform">
                  <Icon size={12} />
                </div>
                <span className="text-xs font-medium text-[#f5f5f7] tracking-tight">
                  {item.name}
                </span>
                <span className="text-[10px] text-[#86868b] uppercase tracking-wider">
                  {item.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Sheet Modal */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={closeStory} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative flex w-full max-w-lg flex-col justify-between overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.14)] bg-[#161616] p-7 text-[#f5f5f7] shadow-2xl"
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Progress Bars */}
              <div className="flex gap-1.5">
                {highlightsData.map((s, idx) => {
                  let progress = 0;
                  if (activeStoryIndex !== null) {
                    if (idx < activeStoryIndex) progress = 100;
                    else if (idx === activeStoryIndex) progress = storyProgress;
                  }
                  return (
                    <div
                      key={s.id}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                    >
                      <div
                        className="h-full bg-[#2997ff] transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Header */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.12)] text-[#2997ff]">
                    <activeStory.icon size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#f5f5f7]">{activeStory.title}</div>
                    <div className="text-[10px] text-[#86868b]">{activeStory.badge}</div>
                  </div>
                </div>

                <button
                  onClick={closeStory}
                  className="rounded-full bg-white/6 p-1.5 text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors cursor-pointer"
                  aria-label="Close highlight"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="my-8 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
                  {activeStory.tagline}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-[#f5f5f7]">
                  {activeStory.subtitle}
                </h3>
                <div className="space-y-3 pt-1">
                  {activeStory.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm font-normal leading-relaxed text-[#a1a1a6]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="space-y-3 border-t border-[rgba(255,255,255,0.08)] pt-5">
                <button
                  onClick={() => handleAction(activeStory.actionHref)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2997ff] hover:bg-[#5eaeff] py-3 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  <span>{activeStory.actionLabel}</span>
                  <ArrowRight size={14} />
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#86868b]">
                  <span>Hold to pause</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStory}
                      className="rounded-full bg-white/6 px-3 py-1 hover:text-[#f5f5f7] cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextStory}
                      className="rounded-full bg-white/6 px-3 py-1 hover:text-[#f5f5f7] cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
