import type { PortfolioConfig } from "@/types";
import { Heart, ArrowUp } from "lucide-react";
import { getHeaderOffset } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smoothScroll";

interface FooterProps {
  data: PortfolioConfig;
}

export default function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  const scrollToSection = (href: string) => {
    smoothScrollTo(href, { offset: getHeaderOffset() });
  };

  return (
    <footer className="border-t border-(--color-border) bg-(--color-bg-secondary) px-6 pt-12 pb-24 sm:pb-12 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Tagline */}
          <div className="text-center sm:text-left">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1 text-lg font-bold tracking-tight"
            >
              <span className="gradient-text">{data.name}</span>
            </button>
            <p className="mt-1 text-xs text-(--color-text-muted)">
              {data.tagline} • Building digital experiences that feel effortless.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {data.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-xs font-medium text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Scroll to Top Link */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1.5 text-xs text-(--color-text-muted) transition-colors hover:border-(--color-border-hover) hover:text-(--color-text-primary)"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

        <hr className="my-8 border-(--color-border)" />

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-(--color-text-muted) sm:flex-row">
          <p>© {year} {data.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & developed with <Heart size={12} className="text-red-400 fill-red-400/20" /> using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
