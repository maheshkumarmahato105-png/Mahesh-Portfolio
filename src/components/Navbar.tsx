import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
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
  Grid3X3,
  Send,
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

const navIcons: Record<string, ReactNode> = {
  home: <Home size={18} strokeWidth={2} />,
  about: <User size={18} strokeWidth={2} />,
  skills: <Code2 size={18} strokeWidth={2} />,
  projects: <Grid3X3 size={18} strokeWidth={2} />,
  contact: <Send size={18} strokeWidth={2} />,
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
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false);
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
      if (e.key === "Escape") {
        setIsOpen(false);
        setDynamicIslandExpanded(false);
      }
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

  const scrollToSection = useCallback(
    (href: string) => {
      setIsOpen(false);
      setDynamicIslandExpanded(false);
      const cleanId = href.replace("#", "").trim() || "home";
      setActiveSection?.(cleanId, 850);
      smoothScrollTo(href, {
        offset: getHeaderOffset(),
      });
    },
    [setActiveSection]
  );

  return (
    <>
      {/* ─── Translucent Graphite Header Navigation Bar ─── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#0a0a0a]/85 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.12)] py-2.5 sm:py-3 shadow-xs"
            : "bg-transparent py-3 sm:py-5"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo Monogram */}
          <button
            onClick={() => scrollToSection("#home")}
            className="group flex items-center gap-2 text-left transition-opacity hover:opacity-90 cursor-pointer shrink-0"
            aria-label="Mahesh Kumar Mahato — Return to top"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#161616] border border-[rgba(255,255,255,0.14)] text-xs font-semibold text-[#f5f5f7] shadow-xs group-hover:border-[#2997ff]/50 transition-colors">
              M
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold tracking-tight text-[#f5f5f7]">
                Mahesh Kumar Mahato
              </span>
              <span className="text-[10px] text-[#86868b]">
                Developer
              </span>
            </div>
          </button>

          {/* ─── Mobile Apple Dynamic Island (Embedded in Header Row) ─── */}
          <div className="relative flex items-center justify-center md:hidden">
            <motion.div
              layout
              onClick={() => setDynamicIslandExpanded(!dynamicIslandExpanded)}
              className="cursor-pointer overflow-hidden rounded-full border border-white/20 bg-black/95 text-[#f5f5f7] shadow-xl backdrop-blur-3xl transition-all select-none"
              animate={
                dynamicIslandExpanded
                  ? { width: 260, height: 96, borderRadius: 24 }
                  : { width: "auto", height: 30, borderRadius: 9999 }
              }
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            >
              {!dynamicIslandExpanded ? (
                /* Collapsed Dynamic Island Pill */
                <div className="flex h-full items-center justify-between gap-2 px-2.5 text-[10px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2997ff] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2997ff]" />
                    </span>
                    <span className="font-semibold text-white tracking-tight">mahesh.dev</span>
                  </div>
                  <div className="h-2 w-px bg-white/20" />
                  <span className="text-[#86868b] uppercase tracking-wider text-[8px] font-mono">{activeSection}</span>
                </div>
              ) : (
                /* Expanded Dynamic Island Widget */
                <div className="flex h-full flex-col justify-between p-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#161616] border border-[#2997ff]/40 text-[10px] font-bold text-[#2997ff]">
                        M
                      </div>
                      <div>
                        <div className="font-semibold text-white text-[11px] leading-tight">Mahesh Kumar Mahato</div>
                        <div className="text-[9px] text-[#86868b]">Web Developer • Active</div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDynamicIslandExpanded(false);
                      }}
                      className="rounded-full bg-white/10 p-1 text-white/70 hover:bg-white/20 cursor-pointer"
                    >
                      <X size={11} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDynamicIslandExpanded(false);
                        scrollToSection("#contact");
                      }}
                      className="flex-1 rounded-full bg-[#2997ff] py-1 text-center text-[10px] font-semibold text-white shadow-xs cursor-pointer"
                    >
                      Message
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white hover:bg-white/20 cursor-pointer"
                    >
                      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Desktop Navigation Links — Translucent Graphite Capsule */}
          <div
            ref={navRef}
            onMouseLeave={() => setHoveredSection(null)}
            className="relative hidden items-center gap-1 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(28,28,30,0.72)] p-1 backdrop-blur-2xl transition-colors md:flex"
          >
            {links.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              const isHovered = hoveredSection === sectionId;

              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setHoveredSection(sectionId)}
                  className={cn(
                    "group relative z-10 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-tight transition-colors duration-200 select-none cursor-pointer",
                    isActive
                      ? "text-[#f5f5f7] font-semibold"
                      : isHovered
                      ? "text-[#f5f5f7]"
                      : "text-[#a1a1a6] hover:text-[#f5f5f7]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Active Tab Graphite Glass Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.14)] shadow-xs"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}

                  {/* Hover Glider Pill */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.04)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-200",
                      isActive ? "text-[#2997ff]" : "text-[#86868b] group-hover:text-[#a1a1a6]"
                    )}
                  >
                    {navIcons[sectionId] ?? <Sparkles size={15} />}
                  </span>

                  {/* Label */}
                  <span className="relative z-10">{link.label}</span>

                  {/* Active Pip */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#2997ff] shadow-[0_0_6px_#2997ff]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-[#a1a1a6] transition-colors hover:text-[#f5f5f7] hover:bg-white/6 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Let's Talk Pill Button */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="flex items-center gap-2 rounded-full bg-[#2997ff] hover:bg-[#5eaeff] text-white px-4 py-1.5 text-xs font-medium tracking-tight transition-colors shadow-xs cursor-pointer active:scale-98"
            >
              <Mail size={13} />
              <span>Let's Talk</span>
            </button>
          </div>

          {/* Mobile Top Controls (Theme & Menu) */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-1.5 text-[#a1a1a6] transition-colors hover:text-[#f5f5f7] cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-[rgba(255,255,255,0.12)] p-1.5 text-[#f5f5f7] transition-colors hover:bg-white/6 cursor-pointer"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Floating Bottom Navigation Dock (iOS Instagram Tabs) ─── */}
      <div
        className="fixed inset-x-0 mx-auto z-40 w-[calc(100%-1.5rem)] max-w-[340px] md:hidden pointer-events-none"
        style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="pointer-events-auto grid grid-cols-5 w-full items-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(24,24,27,0.92)] p-1.5 shadow-2xl backdrop-blur-2xl">
          {links.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <motion.button
                key={link.href}
                whileTap={{ scale: 0.84 }}
                onClick={() => scrollToSection(link.href)}
                className="relative flex flex-col items-center justify-center py-2 transition-all cursor-pointer select-none"
                aria-label={link.label}
              >
                {/* Active Pill on Mobile with Subtle Iridescent Glow */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-nav"
                    className="absolute inset-0 rounded-full bg-[rgba(41,151,255,0.14)] border border-[#2997ff]/40 shadow-[0_0_14px_rgba(41,151,255,0.28)]"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 transition-colors duration-200",
                    isActive ? "text-[#2997ff]" : "text-[#86868b]"
                  )}
                >
                  {navIcons[sectionId] ?? <Sparkles size={16} />}
                </div>

                {/* Active Pip */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-[#2997ff] shadow-[0_0_6px_#2997ff]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ─── Mobile Drawer Menu Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="fixed inset-x-4 top-16 z-50 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 shadow-2xl md:hidden"
              role="dialog"
              aria-label="Mobile Navigation"
            >
              <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation links">
                {links.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer",
                        isActive
                          ? "bg-white/8 text-[#2997ff] font-semibold"
                          : "text-[#a1a1a6] hover:bg-white/4 hover:text-[#f5f5f7]"
                      )}
                    >
                      <span className={isActive ? "text-[#2997ff]" : "text-[#86868b]"}>
                        {navIcons[sectionId]}
                      </span>
                      <span>{link.label}</span>
                    </button>
                  );
                })}

                <hr className="my-2 border-[rgba(255,255,255,0.12)]" />

                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-xs text-[#86868b]">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3 py-1.5 text-xs text-[#f5f5f7] cursor-pointer"
                  >
                    {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>

                <button
                  onClick={() => scrollToSection("#contact")}
                  className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#2997ff] hover:bg-[#5eaeff] px-4 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <Mail size={14} />
                  Let's Talk
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
