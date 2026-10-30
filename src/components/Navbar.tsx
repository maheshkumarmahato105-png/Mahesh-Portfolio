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
  Briefcase,
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
  home: <Home size={17} strokeWidth={2} />,
  about: <User size={17} strokeWidth={2} />,
  skills: <Code2 size={17} strokeWidth={2} />,
  projects: <Briefcase size={17} strokeWidth={2} />,
  contact: <Send size={16} strokeWidth={2} />,
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

  const scrollToSection = useCallback(
    (href: string) => {
      setIsOpen(false);
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
      {/* Translucent Graphite Navigation Bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.12)] py-3 shadow-xs"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo Monogram */}
          <button
            onClick={() => scrollToSection("#home")}
            className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="Mahesh Kumar Mahato — Return to top"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#161616] border border-[rgba(255,255,255,0.12)] text-xs font-semibold text-[#f5f5f7]">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-tight text-[#f5f5f7]">
                Mahesh Kumar Mahato
              </span>
              <span className="text-[10px] text-[#86868b]">
                Developer
              </span>
            </div>
          </button>

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
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#2997ff]"
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

          {/* Mobile Top Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-[#a1a1a6] transition-colors hover:text-[#f5f5f7]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-[rgba(255,255,255,0.12)] p-2 text-[#f5f5f7] transition-colors hover:bg-white/6"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Floating Bottom Navigation Dock */}
      <div className="fixed bottom-3 inset-x-0 mx-auto z-40 w-[calc(100%-1.5rem)] max-w-[340px] md:hidden pointer-events-none">
        <div className="pointer-events-auto grid grid-cols-5 w-full items-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(28,28,30,0.85)] p-1.5 shadow-2xl backdrop-blur-2xl">
          {links.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative flex flex-col items-center justify-center py-2 transition-colors cursor-pointer active:scale-95"
                aria-label={link.label}
              >
                {/* Active Pill on Mobile */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-nav"
                    className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.14)]"
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
                    "relative z-10 transition-colors",
                    isActive ? "text-[#2997ff]" : "text-[#86868b]"
                  )}
                >
                  {navIcons[sectionId] ?? <Sparkles size={16} />}
                </div>

                {/* Active Pip */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-[#2997ff]"
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
      </div>

      {/* Mobile Drawer Menu Overlay */}
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
              className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-6 shadow-2xl md:hidden"
              role="dialog"
              aria-label="Mobile Navigation"
            >
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation links">
                {links.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors",
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
                    className="flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3 py-1.5 text-xs text-[#f5f5f7]"
                  >
                    {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>

                <button
                  onClick={() => scrollToSection("#contact")}
                  className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[#2997ff] hover:bg-[#5eaeff] px-4 py-3 text-xs font-semibold text-white transition-colors"
                >
                  <Mail size={15} />
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
