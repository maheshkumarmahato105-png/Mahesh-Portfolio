import type { PortfolioConfig } from "@/types";
import { ArrowUp } from "lucide-react";
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
    <footer className="border-t border-[rgba(255,255,255,0.12)] bg-[#0a0a0a] px-6 pt-12 pb-24 sm:pb-12 text-[#86868b] transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Tagline */}
          <div className="text-center sm:text-left">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[#f5f5f7] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span>{data.name}</span>
            </button>
            <p className="mt-1 text-xs text-[#86868b]">
              {data.tagline} • Building digital experiences that feel effortless.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {data.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-xs font-medium text-[#a1a1a6] transition-colors hover:text-[#f5f5f7] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Scroll to Top Link */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#161616] px-3.5 py-1.5 text-xs text-[#a1a1a6] transition-all hover:border-[rgba(255,255,255,0.24)] hover:text-[#f5f5f7] cursor-pointer active:scale-95"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

        <hr className="my-8 border-[rgba(255,255,255,0.08)]" />

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#86868b] sm:flex-row">
          <p>Copyright © {year} {data.name}. All rights reserved.</p>
          <p className="flex items-center gap-2 text-[11px] text-[#86868b]">
            <span>Engineered with React, TypeScript & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
