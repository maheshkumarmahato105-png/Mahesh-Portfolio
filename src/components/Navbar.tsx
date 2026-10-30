import { useState, useEffect, useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Mail,
  Home,
  User,
  Code2,
  Briefcase,
  Send,
  Heart,
  Sparkles,
} from "lucide-react";
import type { NavLink } from "@/types";
import { cn, getHeaderOffset } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smoothScroll";

interface NavbarProps {
  links: NavLink[];
  activeSection: string;
  setActiveSection?: (id: string, lockDurationMs?: number) => void;
  theme: string;
  toggleTheme: () => void;
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
}

const navIcons: Record<string, ReactNode> = {
  home: <Home size={17} strokeWidth={2.2} />,
  about: <User size={17} strokeWidth={2.2} />,
  skills: <Code2 size={17} strokeWidth={2.2} />,
  projects: <Briefcase size={17} strokeWidth={2.2} />,
  contact: <Send size={16} strokeWidth={2.2} />,
};

export default function Navbar({
  links,
  activeSection,
  setActiveSection,
  theme,
  toggleTheme,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<BurstParticle[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape & handle body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.classList.add("menu-open");
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const triggerParticle = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle: BurstParticle = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setParticles((prev) => [...prev.slice(-4), newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 700);
  };

  const scrollToSection = useCallback(
    (href: string) => {
      setIsOpen(false);
      const cleanId = href.replace("#", "").trim() || "home";
      setActiveSection?.(cleanId, 900);
      smoothScrollTo(href, {
        offset: getHeaderOffset(),
      });
    },
    [setActiveSection]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredSection(null);
  };

  return (
    <>
      {/* Floating Instagram-Style Burst Particles on Tap */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.4, y: 0, x: 0 }}
            animate={{
              opacity: 0,
              scale: [0.5, 1.35, 0.8],
              y: -38,
              x: (Math.random() - 0.5) * 24,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="pointer-events-none fixed z-60 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]"
            style={{ left: p.x - 8, top: p.y - 12 }}
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Top Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass shadow-md py-2.5 sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo Monogram with Instagram Story Gradient Ring */}
          <motion.button
            onClick={(e) => {
              triggerParticle(e);
              scrollToSection("#home");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2.5 text-xl font-black tracking-tight"
            aria-label="Mahesh Kumar Mahato — Return to top"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-(--color-bg) font-black text-sm tracking-tight text-(--color-text-primary) transition-colors">
                M
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-(--color-text-primary)">
                Mahesh
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-(--color-text-muted) transition-colors group-hover:text-rose-500">
                Portfolio
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation Links — Apple Dynamic Island Capsule */}
          <div
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative hidden items-center gap-1 rounded-full border border-(--color-border) bg-(--color-bg-glass) p-1.5 backdrop-blur-2xl transition-colors md:flex shadow-xs"
          >
            {/* Interactive cursor spotlight glow & dynamic specular border rim */}
            <div
              className="pointer-events-none absolute -inset-px rounded-full overflow-hidden transition-opacity duration-300"
              style={{ opacity: mousePos ? 1 : 0 }}
            >
              {/* Dual-tone glowing flashlight beam that follows cursor */}
              <div
                className="absolute inset-0"
                style={{
                  background: mousePos
                    ? `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.32), rgba(244, 63, 94, 0.18), transparent 70%)`
                    : "none",
                }}
              />
              {/* High-precision specular border rim glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  padding: "1px",
                  background: mousePos
                    ? `radial-gradient(90px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.45), transparent 70%)`
                    : "none",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
            </div>

            {links.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              const isHovered = hoveredSection === sectionId;

              return (
                <motion.button
                  key={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    triggerParticle(e);
                    scrollToSection(link.href);
                  }}
                  onMouseEnter={() => setHoveredSection(sectionId)}
                  className={cn(
                    "group relative z-10 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer",
                    isActive
                      ? "text-(--color-text-primary)"
                      : isHovered
                      ? "text-(--color-text-primary)"
                      : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Active Tab Spring Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-full bg-white/12 dark:bg-white/16 border border-white/20 dark:border-white/25 shadow-[0_2px_12px_rgba(0,0,0,0.25)] backdrop-blur-md"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}

                  {/* Mouse Hover Glider Pill */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="hover-nav"
                      className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/10 border border-white/15 dark:border-white/20 shadow-xs backdrop-blur-xs"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Instagram-Style Bouncy Spring Icon */}
                  <motion.span
                    animate={
                      isActive
                        ? { scale: [1, 0.82, 1.25, 0.96, 1], y: [0, 1, -2, 0] }
                        : isHovered
                        ? { scale: 1.25, y: -2 }
                        : { scale: 1, y: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 480,
                      damping: 18,
                    }}
                    className={cn(
                      "relative z-10 flex items-center justify-center transition-colors duration-200",
                      isActive
                        ? "text-(--color-accent) drop-shadow-[0_0_8px_rgba(129,140,248,0.7)]"
                        : isHovered
                        ? "text-rose-500 dark:text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                        : "text-(--color-text-muted)"
                    )}
                  >
                    {navIcons[sectionId] ?? <Sparkles size={16} />}
                  </motion.span>

                  {/* Text Label */}
                  <span className="relative z-10 transition-colors duration-200">{link.label}</span>

                  {/* Instagram Story Gradient Active Pip */}
                  {isActive && (
                    <motion.span
                      layoutId="instagram-active-dot"
                      className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-linear-to-r from-amber-500 via-rose-500 to-purple-600 shadow-[0_0_8px_rgba(236,72,153,0.9)]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Interactive Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 18 }}
              whileTap={{ scale: 0.88 }}
              className="rounded-full p-2.5 text-(--color-text-secondary) transition-colors hover:bg-(--color-surface) hover:text-(--color-text-primary) cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Interactive Let's Talk CTA */}
            <motion.button
              onClick={(e) => {
                triggerParticle(e);
                scrollToSection("#contact");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-(--color-accent) px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-(--color-accent-glow) transition-all hover:bg-(--color-accent-hover) cursor-pointer"
            >
              <Mail size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Let's Talk</span>
            </motion.button>
          </div>

          {/* Mobile Top Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.88 }}
              className="rounded-full p-2 text-(--color-text-secondary) transition-colors hover:bg-(--color-surface) hover:text-(--color-text-primary)"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="rounded-xl border border-(--color-border) p-2 text-(--color-text-primary) transition-colors hover:bg-(--color-surface)"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Instagram-Style Floating Bottom Navigation Bar (iPhone Style) */}
      <div className="fixed bottom-3 inset-x-0 mx-auto z-40 w-[calc(100%-1.5rem)] max-w-[340px] md:hidden pointer-events-none">
        <div className="pointer-events-auto grid grid-cols-5 w-full items-center rounded-full border border-(--color-border) bg-(--color-bg-glass)/95 p-1.5 shadow-2xl backdrop-blur-2xl">
          {links.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <motion.button
                key={link.href}
                whileTap={{ scale: 0.82 }}
                onClick={(e) => {
                  triggerParticle(e);
                  scrollToSection(link.href);
                }}
                className="relative flex flex-col items-center justify-center py-2 transition-colors cursor-pointer"
                aria-label={link.label}
              >
                {/* Active Pill on Mobile */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-nav"
                    className="absolute inset-0 rounded-full bg-white/12 dark:bg-white/16 border border-white/20 shadow-xs"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}

                {/* Bouncy Icon */}
                <motion.div
                  animate={
                    isActive
                      ? { scale: [1, 0.8, 1.28, 0.95, 1], y: [0, 2, -2.5, 0] }
                      : { scale: 1, y: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 14,
                  }}
                  className={cn(
                    "relative z-10 transition-colors",
                    isActive
                      ? "text-(--color-accent) drop-shadow-[0_0_8px_rgba(129,140,248,0.7)]"
                      : "text-(--color-text-muted)"
                  )}
                >
                  {navIcons[sectionId] ?? <Sparkles size={17} />}
                </motion.div>

                {/* Mobile Active Pip */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-instagram-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-linear-to-r from-amber-500 via-rose-500 to-purple-600 shadow-[0_0_6px_rgba(236,72,153,0.8)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="fixed inset-x-4 top-20 z-50 max-h-[85vh] overflow-y-auto rounded-3xl border border-(--color-border) bg-(--color-bg-elevated) p-6 shadow-2xl md:hidden"
              role="dialog"
              aria-label="Mobile Navigation"
            >
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation links">
                {links.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.button
                      key={link.href}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => {
                        triggerParticle(e);
                        scrollToSection(link.href);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-medium transition-colors",
                        isActive
                          ? "bg-(--color-accent)/15 text-(--color-accent) font-semibold"
                          : "text-(--color-text-secondary) hover:bg-(--color-surface) hover:text-(--color-text-primary)"
                      )}
                    >
                      <span className={isActive ? "text-(--color-accent)" : "text-(--color-text-muted)"}>
                        {navIcons[sectionId]}
                      </span>
                      <span>{link.label}</span>
                    </motion.button>
                  );
                })}

                <hr className="my-2 border-(--color-border)" />

                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-sm font-medium text-(--color-text-secondary)">
                    Theme
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-xs font-medium text-(--color-text-primary)"
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    triggerParticle(e);
                    scrollToSection("#contact");
                  }}
                  className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-(--color-accent) px-4 py-3.5 text-sm font-semibold text-white shadow-(--color-accent-glow) transition-all hover:bg-(--color-accent-hover)"
                >
                  <Mail size={16} />
                  Let's Talk
                </motion.button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
