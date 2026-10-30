import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, ExternalLink, Code2, Briefcase, User, Mail } from "lucide-react";
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
  gradient: string;
  icon: typeof User;
  actionLabel: string;
  actionHref: string;
}

const storiesData: Story[] = [
  {
    id: "about",
    name: "About Me",
    tagline: "Background",
    badge: "Story • 1 of 5",
    title: "Mahesh Kumar Mahato",
    subtitle: "Web Developer & Frontend Specialist",
    paragraphs: [
      "I build digital experiences that feel effortless, intuitive, and remarkably fast.",
      "With a strong foundation in modern web technologies, I love translating complex design concepts into fluid, accessible code.",
    ],
    gradient: "from-amber-500 via-rose-500 to-purple-600",
    icon: User,
    actionLabel: "Explore Full Bio",
    actionHref: "#about",
  },
  {
    id: "skills",
    name: "Toolkit",
    tagline: "Technologies",
    badge: "Story • 2 of 5",
    title: "Engineered for 60fps",
    subtitle: "Modern Frontend Stack",
    paragraphs: [
      "Specialized in React, TypeScript, Tailwind CSS, and Framer Motion.",
      "Dedicated to semantic HTML, strict type safety, responsive design, and sub-second initial load speeds.",
    ],
    gradient: "from-purple-600 via-indigo-500 to-sky-400",
    icon: Code2,
    actionLabel: "View All Skills",
    actionHref: "#skills",
  },
  {
    id: "projects",
    name: "Selected Work",
    tagline: "Featured",
    badge: "Story • 3 of 5",
    title: "Crafted With Care",
    subtitle: "Real-world Applications",
    paragraphs: [
      "From glassmorphic weather dashboards with live APIs to interactive task boards with local persistence.",
      "Every project is built with clean architecture, zero dead buttons, and full responsive polish.",
    ],
    gradient: "from-emerald-400 via-teal-500 to-indigo-600",
    icon: Briefcase,
    actionLabel: "View Projects Showcase",
    actionHref: "#projects",
  },
  {
    id: "craft",
    name: "Philosophy",
    tagline: "Aesthetic",
    badge: "Story • 4 of 5",
    title: "Design & Precision",
    subtitle: "Minimalism & Craft",
    paragraphs: [
      "Inspired by the world's finest modern design systems: deep obsidian blacks, subtle glass surfaces, and tactile spring dynamics.",
      "Details are not just details; they make the product.",
    ],
    gradient: "from-pink-500 via-rose-500 to-yellow-500",
    icon: Sparkles,
    actionLabel: "Experience The Work",
    actionHref: "#projects",
  },
  {
    id: "contact",
    name: "Hire Me",
    tagline: "Let's Connect",
    badge: "Story • 5 of 5",
    title: "Available Now",
    subtitle: "Ready for Opportunities",
    paragraphs: [
      "Looking for a motivated developer who values quality, speed, and great user experience?",
      "Send me a message—I would love to discuss how I can contribute to your team or next project.",
    ],
    gradient: "from-rose-500 via-fuchsia-600 to-indigo-600",
    icon: Mail,
    actionLabel: "Send A Message",
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

  // Auto-advance Instagram story progress bar (5 seconds per story)
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const interval = 50; // update every 50ms
    const step = (interval / 4500) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setStoryProgress((prev) => {
        if (prev + step >= 100) {
          // Advance to next story or close
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
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [activeStoryIndex, isPaused]);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setStoryProgress(0);
    const storyId = storiesData[index]?.id;
    if (storyId) {
      setSeenStories((prev) => ({ ...prev, [storyId]: true }));
    }
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setStoryProgress(0);
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

  const prevStory = () => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setStoryProgress(0);
    } else {
      setStoryProgress(0);
    }
  };

  const handleAction = (href: string) => {
    closeStory();
    smoothScrollTo(href, { offset: getHeaderOffset() });
  };

  return (
    <>
      {/* Instagram Stories Carousel Row */}
      <div className="relative w-full overflow-hidden mx-auto max-w-4xl px-4 py-6">
        <div className="mb-3 flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-(--color-text-muted)">
            <Sparkles size={13} className="text-rose-500" />
            <span>Interactive Highlights</span>
          </div>
          <span className="text-[11px] font-medium text-(--color-text-muted)">
            Tap to view stories
          </span>
        </div>

        {/* Horizontal scroll container with hidden scrollbars */}
        <div className="flex w-full items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none overscroll-x-contain">
          {storiesData.map((story, i) => {
            const Icon = story.icon;
            const isSeen = seenStories[story.id];

            return (
              <motion.button
                key={story.id}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => openStory(i)}
                className="group flex flex-col items-center gap-1.5 shrink-0 focus:outline-none"
                aria-label={`View story: ${story.name}`}
              >
                {/* Gradient Ring Avatar */}
                <div
                  className={`relative flex h-14 w-14 sm:h-18 sm:w-18 items-center justify-center rounded-full p-[2.5px] transition-transform duration-300 ${
                    isSeen
                      ? "bg-(--color-border)"
                      : `bg-linear-to-tr ${story.gradient} shadow-sm`
                  }`}
                >
                  {/* Inner Dark Background */}
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-(--color-bg-elevated) p-1 border-2 border-(--color-bg)">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-(--color-surface) text-(--color-text-primary) transition-colors group-hover:text-(--color-accent)">
                      <Icon size={20} className="transition-transform duration-300 group-hover:scale-110 sm:hidden" />
                      <Icon size={22} className="transition-transform duration-300 group-hover:scale-110 hidden sm:block" />
                    </div>
                  </div>

                  {/* Pulsing glow ring on first story */}
                  {!isSeen && i === 0 && (
                    <span className="absolute -inset-1 rounded-full animate-pulse opacity-40 bg-linear-to-r from-amber-500 to-rose-500 blur-xs -z-10" />
                  )}
                </div>

                {/* Story Label */}
                <span className="max-w-[64px] sm:max-w-[72px] truncate text-[10px] sm:text-[11px] font-medium text-(--color-text-secondary) group-hover:text-(--color-text-primary)">
                  {story.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Instagram Story Fullscreen Viewer Modal */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-0 sm:p-4 backdrop-blur-2xl">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={closeStory} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="relative flex h-full w-full max-w-md flex-col justify-between overflow-hidden rounded-none sm:rounded-3xl border border-white/10 bg-black/95 p-6 text-white shadow-2xl"
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Ambient Glow */}
              <div
                className={`pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-linear-to-br ${activeStory.gradient} opacity-25 blur-3xl`}
              />

              {/* Top Progress Bars */}
              <div className="relative z-10 flex gap-1.5 pt-2">
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
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-tr ${activeStory.gradient} p-0.5`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                      <activeStory.icon size={16} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold">{activeStory.title}</div>
                    <div className="text-[10px] text-white/60">{activeStory.badge}</div>
                  </div>
                </div>

                <button
                  onClick={closeStory}
                  className="rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Close story"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Story Middle Content */}
              <div className="relative z-10 my-auto py-8">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-rose-300 backdrop-blur-md">
                  {activeStory.tagline}
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl text-white">
                  {activeStory.subtitle}
                </h2>
                <div className="mt-4 space-y-3">
                  {activeStory.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-white/80">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Story Action Bar & Nav Controls */}
              <div className="relative z-10 space-y-3 pb-4">
                <button
                  onClick={() => handleAction(activeStory.actionHref)}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r ${activeStory.gradient} py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <span>{activeStory.actionLabel}</span>
                  <ExternalLink size={14} />
                </button>

                <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-white/50">
                  <span>Hold to pause</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStory}
                      className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/15"
                    >
                      Prev
                    </button>
                    <button
                      onClick={nextStory}
                      className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/15"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Left/Right Click Areas to Navigate */}
              <div
                className="absolute inset-y-16 left-0 w-1/3 cursor-pointer z-0"
                onClick={prevStory}
              />
              <div
                className="absolute inset-y-16 right-0 w-1/3 cursor-pointer z-0"
                onClick={nextStory}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
