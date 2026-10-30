import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Code2,
  Briefcase,
  Sparkles,
  Mail,
  X,
  ExternalLink,
  Plus,
} from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { getHeaderOffset } from "@/lib/utils";

export interface Story {
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

const storiesData: Story[] = [
  {
    id: "about",
    name: "Profile",
    tagline: "Background",
    badge: "Story • 1 of 5",
    title: "Mahesh Kumar Mahato",
    subtitle: "Frontend Architecture & Interaction",
    paragraphs: [
      "I craft digital experiences that balance engineering rigor with cinematic visual simplicity.",
      "Dedicated to translating complex user workflows into clean, intuitive, and remarkably fast interfaces.",
    ],
    icon: User,
    actionLabel: "Read Background",
    actionHref: "#about",
  },
  {
    id: "skills",
    name: "Toolkit",
    tagline: "Stack",
    badge: "Story • 2 of 5",
    title: "Engineered for 60/120 FPS",
    subtitle: "Modern Frontend Stack",
    paragraphs: [
      "Specialized in React 19, TypeScript, Tailwind CSS, and Motion.",
      "Dedicated to strict type safety, zero cumulative layout shifts, and sub-second initial load speeds.",
    ],
    icon: Code2,
    actionLabel: "View All Skills",
    actionHref: "#skills",
  },
  {
    id: "projects",
    name: "Showcase",
    tagline: "Apps",
    badge: "Story • 3 of 5",
    title: "Precision & Craft",
    subtitle: "Production Applications",
    paragraphs: [
      "From real-time weather analytics platforms to interactive task boards with local persistence.",
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
    badge: "Story • 4 of 5",
    title: "Subtlety & Clarity",
    subtitle: "Apple Minimalism",
    paragraphs: [
      "Guided by the principles of clarity, deliberate typography, obsidian depth, and tactile haptics.",
      "Details are not just details; they make the entire experience.",
    ],
    icon: Sparkles,
    actionLabel: "Experience Craft",
    actionHref: "#projects",
  },
  {
    id: "contact",
    name: "Connect",
    tagline: "Inquiry",
    badge: "Story • 5 of 5",
    title: "Available for Projects",
    subtitle: "Let's Collaborate",
    paragraphs: [
      "Looking for a frontend developer who treats performance, accessibility, and visual polish as non-negotiables?",
      "Send an inquiry—I look forward to discussing how I can deliver value to your team.",
    ],
    icon: Mail,
    actionLabel: "Send Message",
    actionHref: "#contact",
  },
];

export default function StoriesBar() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [seenStories, setSeenStories] = useState<Record<string, boolean>>({});
  const progressTimerRef = useRef<number | null>(null);

  const activeStory = activeStoryIndex !== null ? storiesData[activeStoryIndex] : null;

  // Auto-advance Instagram story progress bar (4.5s per story)
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const interval = 50;
    const step = (interval / 4500) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setStoryProgress((prev) => {
        if (prev + step >= 100) {
          if (activeStoryIndex < storiesData.length - 1) {
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
    const storyId = storiesData[index]?.id;
    if (storyId) {
      setSeenStories((prev) => ({ ...prev, [storyId]: true }));
    }
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
    if (activeStoryIndex < storiesData.length - 1) {
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
      {/* ─── Apple-Designed Instagram Stories Carousel ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 py-4 overflow-hidden"
      >
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-2 snap-x snap-mandatory">
          {/* Your Story (Creator) */}
          <div
            onClick={() => openStory(0)}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 snap-start group select-none"
          >
            <div className="relative">
              <div className="flex h-16 w-16 sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full p-[2px] bg-gradient-to-tr from-[#2997ff] via-[#a259ff] to-[#00d2ff] shadow-[0_0_15px_rgba(41,151,255,0.3)] transition-transform duration-300 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#161616] border-2 border-[#0a0a0a] text-sm font-semibold text-[#f5f5f7]">
                  M
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#2997ff] text-white border-2 border-[#0a0a0a] shadow-xs">
                <Plus size={11} strokeWidth={3} />
              </div>
            </div>
            <span className="text-[11px] font-medium text-[#f5f5f7] tracking-tight">Your Story</span>
          </div>

          {/* Highlight Stories with Apple Iridescent Rings */}
          {storiesData.map((story, idx) => {
            const Icon = story.icon;
            const isSeen = seenStories[story.id];
            return (
              <motion.div
                key={story.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => openStory(idx)}
                className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 snap-start group select-none"
              >
                <div
                  className={`flex h-16 w-16 sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full p-[2px] transition-all duration-300 group-hover:scale-105 ${
                    isSeen
                      ? "border border-white/20 bg-transparent"
                      : "bg-gradient-to-tr from-[#2997ff] via-[#a259ff] to-[#00d2ff] shadow-[0_0_15px_rgba(41,151,255,0.25)]"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#161616] border-2 border-[#0a0a0a] text-[#2997ff]">
                    <Icon size={20} className="transition-transform group-hover:scale-110" />
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#a1a1a6] group-hover:text-[#f5f5f7] transition-colors tracking-tight">
                  {story.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ─── Apple iOS Story Viewer Modal ─── */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-2xl">
            <div className="absolute inset-0" onClick={closeStory} />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative flex h-[88vh] max-h-[720px] w-full max-w-md flex-col justify-between overflow-hidden rounded-[36px] border border-[rgba(255,255,255,0.16)] bg-[#161616]/95 p-6 text-[#f5f5f7] shadow-2xl backdrop-blur-3xl"
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Subtle ambient lighting */}
              <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.25)_0%,transparent_70%)] blur-3xl" />

              {/* Segmented Top Progress Bars */}
              <div className="relative z-10 flex gap-1.5 pt-1">
                {storiesData.map((s, idx) => {
                  let progress = 0;
                  if (activeStoryIndex !== null) {
                    if (idx < activeStoryIndex) progress = 100;
                    else if (idx === activeStoryIndex) progress = storyProgress;
                  }
                  return (
                    <div
                      key={s.id}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-white/20"
                    >
                      <div
                        className="h-full bg-white transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Story Header */}
              <div className="relative z-10 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-tr from-[#2997ff] via-[#a259ff] to-[#00d2ff]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#161616] text-xs font-semibold text-white">
                      M
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <span>mahesh.dev</span>
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2997ff] text-white text-[8px]">
                        ✓
                      </span>
                    </div>
                    <div className="text-[10px] text-[#86868b]">{activeStory.badge}</div>
                  </div>
                </div>

                <button
                  onClick={closeStory}
                  className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close story"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Story Middle Content */}
              <div className="relative z-10 my-auto py-6">
                <span className="inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2997ff]">
                  {activeStory.tagline}
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl text-[#f5f5f7]">
                  {activeStory.subtitle}
                </h2>
                <div className="mt-4 space-y-3">
                  {activeStory.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-[#a1a1a6]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Story Action Bar */}
              <div className="relative z-10 space-y-3 pb-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAction(activeStory.actionHref)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2997ff] hover:bg-[#5eaeff] hover:shadow-[0_0_20px_rgba(41,151,255,0.4)] py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer"
                >
                  <span>{activeStory.actionLabel}</span>
                  <ExternalLink size={14} />
                </motion.button>

                <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-[#86868b]">
                  <span>Hold to pause</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStory}
                      className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 text-[#f5f5f7] cursor-pointer"
                    >
                      Prev
                    </button>
                    <button
                      onClick={nextStory}
                      className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 text-[#f5f5f7] cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Touch Navigation Left/Right Areas */}
              <div
                className="absolute inset-y-16 left-0 w-1/3 cursor-pointer z-0"
                onClick={prevStory}
                aria-label="Previous story"
              />
              <div
                className="absolute inset-y-16 right-0 w-1/3 cursor-pointer z-0"
                onClick={nextStory}
                aria-label="Next story"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
