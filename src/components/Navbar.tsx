import { useState, useEffect, useCallback, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Mail } from "lucide-react";
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass shadow-md py-3"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo Monogram */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-1.5 text-xl font-black tracking-tight"
            aria-label="Mahesh Kumar Mahato — Return to top"
          >
            <span className="gradient-text transition-transform duration-300">M.</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-(--color-text-muted) transition-colors duration-300 group-hover:text-(--color-text-primary)">
              Dev
            </span>
          </motion.button>

          {/* Desktop Navigation Links — Apple Mouse-Interactive Glass Pill */}
          <div
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative hidden items-center gap-1 rounded-full border border-(--color-border) bg-(--color-bg-glass) p-1 backdrop-blur-xl transition-colors md:flex shadow-xs"
          >
            {/* Interactive cursor spotlight glow */}
            {mousePos && (
              <div
                className="pointer-events-none absolute -inset-px rounded-full transition-opacity duration-200"
                style={{
                  background: `radial-gradient(110px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-accent-glow), transparent 75%)`,
                }}
              />
            )}

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
                    "relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-(--color-text-primary)"
                      : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Active Tab Spring Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-full bg-(--color-surface) shadow-sm"
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
                      className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xs"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="relative z-10 select-none">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Interactive Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full p-2.5 text-(--color-text-secondary) transition-colors hover:bg-(--color-surface) hover:text-(--color-text-primary)"
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
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-(--color-accent) px-5 py-2 text-sm font-medium text-white shadow-(--color-accent-glow) transition-all hover:bg-(--color-accent-hover)"
            >
              <Mail size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Let's Talk</span>
            </motion.button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="rounded-full p-2 text-(--color-text-secondary) transition-colors hover:bg-(--color-surface) hover:text-(--color-text-primary)"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.92 }}
              className="rounded-xl border border-(--color-border) p-2 text-(--color-text-primary) transition-colors hover:bg-(--color-surface)"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
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
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(link.href)}
                      className={cn(
                        "rounded-2xl px-4 py-3.5 text-left text-base font-medium transition-colors",
                        isActive
                          ? "bg-(--color-accent)/15 text-(--color-accent) font-semibold"
                          : "text-(--color-text-secondary) hover:bg-(--color-surface) hover:text-(--color-text-primary)"
                      )}
                    >
                      {link.label}
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
                  onClick={() => scrollToSection("#contact")}
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
