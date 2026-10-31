import { CloudSun, CheckCircle2, Layout, Sparkles, Wind, Droplets } from "lucide-react";

interface ProjectGraphicProps {
  id: string;
  title: string;
  category: string;
  className?: string;
}

export default function ProjectGraphic({ id, title, category, className = "" }: ProjectGraphicProps) {
  if (id === "project-1") {
    // Weather Dashboard — Apple style
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] p-2.5 sm:p-5 ${className}`}>
        {/* Subtle radial ambient glow */}
        <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.18)_0%,transparent_70%)] blur-2xl" />

        {/* Apple Weather Card */}
        <div className="relative w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-3 sm:p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2 sm:pb-3">
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-[#f5f5f7]">San Francisco</div>
              <div className="text-[9px] sm:text-[10px] text-[#86868b]">Real-Time Forecast</div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.08)] px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-[#2997ff]">
              <CloudSun size={11} />
              <span>Sunny</span>
            </div>
          </div>

          {/* Main Weather Display */}
          <div className="my-2.5 sm:my-4 flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-4xl font-extralight tracking-tight text-[#f5f5f7]">
                22<span className="text-xl sm:text-2xl font-light text-[#2997ff]">°C</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#a1a1a6]">Partly Cloudy • High 25°</div>
            </div>
            <div className="relative flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] p-1.5 sm:p-2">
              <CloudSun size={24} className="text-[#2997ff]" />
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1 sm:pt-2">
            <div className="flex items-center gap-1.5 rounded-xl bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] p-1.5 sm:p-2 text-[9px] sm:text-[10px] text-[#a1a1a6]">
              <Wind size={11} className="text-[#2997ff] shrink-0" />
              <span className="truncate">14 km/h</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] p-1.5 sm:p-2 text-[9px] sm:text-[10px] text-[#a1a1a6]">
              <Droplets size={11} className="text-[#2997ff] shrink-0" />
              <span className="truncate">58% Hum</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "project-2") {
    // Task Manager — Apple style
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] p-2.5 sm:p-5 ${className}`}>
        {/* Subtle radial ambient glow */}
        <div className="absolute -left-6 -top-6 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.15)_0%,transparent_70%)] blur-2xl" />

        {/* Apple Task Board Card */}
        <div className="relative w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-3 sm:p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2 sm:pb-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-white/30" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-[#2997ff]" />
              <span className="ml-1 text-[11px] sm:text-xs font-semibold text-[#f5f5f7]">Pipeline</span>
            </div>
            <span className="rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.08)] px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-[#2997ff]">
              3 Active
            </span>
          </div>

          {/* Tasks List */}
          <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1c1c1e] p-2 sm:p-2.5">
              <div className="flex items-center gap-2 truncate">
                <CheckCircle2 size={12} className="text-[#2997ff] shrink-0" />
                <span className="text-[11px] sm:text-xs text-[#f5f5f7] truncate">Design System</span>
              </div>
              <span className="rounded bg-[#2997ff]/10 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-medium text-[#2997ff] shrink-0">
                Done
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#2997ff]/30 bg-[#2997ff]/5 p-2 sm:p-2.5">
              <div className="flex items-center gap-2 truncate">
                <div className="h-2.5 w-2.5 rounded-full border-2 border-[#2997ff] shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium text-[#f5f5f7] truncate">Fluid Gestures</span>
              </div>
              <span className="rounded bg-[#2997ff]/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-medium text-[#5eaeff] shrink-0">
                In Dev
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "project-3") {
    // Portfolio Website — Apple style
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] p-2.5 sm:p-5 ${className}`}>
        {/* Subtle radial ambient glow */}
        <div className="absolute -top-8 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.15)_0%,transparent_70%)] blur-2xl" />

        {/* Apple Browser Preview */}
        <div className="relative w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-3 sm:p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2 sm:pb-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <div className="rounded-full bg-[#1c1c1e] px-2.5 py-0.5 text-[8px] sm:text-[9px] text-[#86868b] border border-[rgba(255,255,255,0.06)]">
              portfolio.dev
            </div>
            <Sparkles size={11} className="text-[#2997ff]" />
          </div>

          {/* Mock Hero Preview */}
          <div className="mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2 text-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-2 py-0.5 text-[8px] sm:text-[9px] text-[#2997ff]">
              <span>Minimal & Fluid</span>
            </div>
            <div className="text-sm sm:text-base font-semibold tracking-tight text-[#f5f5f7]">
              Effortless UI
            </div>
            <div className="mx-auto h-1 w-2/3 rounded-full bg-white/10" />

            {/* Feature Pills */}
            <div className="flex items-center justify-center gap-1 pt-1.5">
              <span className="rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] px-2 py-0.5 text-[8px] text-[#a1a1a6]">
                Motion
              </span>
              <span className="rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] px-2 py-0.5 text-[8px] text-[#a1a1a6]">
                React 19
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic fallback preview
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] p-3 ${className}`}>
      <div className="relative text-center">
        <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#161616] border border-[rgba(255,255,255,0.12)] text-[#2997ff]">
          <Layout size={24} className="sm:hidden" />
          <Layout size={32} className="hidden sm:block" />
        </div>
        <div className="mt-2 text-xs font-semibold text-[#f5f5f7] truncate max-w-[120px]">{title}</div>
        <div className="text-[10px] text-[#86868b]">{category}</div>
      </div>
    </div>
  );
}
