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
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] p-6 ${className}`}>
        {/* Subtle radial ambient glow */}
        <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.15)_0%,transparent_70%)] blur-2xl" />

        {/* Apple Weather Card */}
        <div className="relative w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div>
              <div className="text-xs font-semibold text-[#f5f5f7]">San Francisco</div>
              <div className="text-[10px] text-[#86868b]">Real-Time Forecast</div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.08)] px-2 py-0.5 text-[10px] font-medium text-[#2997ff]">
              <CloudSun size={12} />
              <span>Sunny</span>
            </div>
          </div>

          {/* Main Weather Display */}
          <div className="my-4 flex items-center justify-between">
            <div>
              <div className="text-4xl font-extralight tracking-tight text-[#f5f5f7]">
                22<span className="text-2xl font-light text-[#2997ff]">°C</span>
              </div>
              <div className="text-[11px] text-[#a1a1a6]">Partly Cloudy • High 25°</div>
            </div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] p-2">
              <CloudSun size={30} className="text-[#2997ff]" />
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex items-center gap-2 rounded-xl bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] p-2 text-[10px] text-[#a1a1a6]">
              <Wind size={12} className="text-[#2997ff]" />
              <span>Wind: 14 km/h</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] p-2 text-[10px] text-[#a1a1a6]">
              <Droplets size={12} className="text-[#2997ff]" />
              <span>Humidity: 58%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "project-2") {
    // Task Manager — Apple style
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] p-6 ${className}`}>
        {/* Subtle radial ambient glow */}
        <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.12)_0%,transparent_70%)] blur-2xl" />

        {/* Apple Task Board Card */}
        <div className="relative w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-white/30" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-[#2997ff]" />
              <span className="ml-1 text-xs font-semibold text-[#f5f5f7]">Task Pipeline</span>
            </div>
            <span className="rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.08)] px-2 py-0.5 text-[10px] font-medium text-[#2997ff]">
              3 Active
            </span>
          </div>

          {/* Tasks List */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1c1c1e] p-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#2997ff]" />
                <span className="text-xs text-[#f5f5f7]">Design System Architecture</span>
              </div>
              <span className="rounded bg-[#2997ff]/10 px-1.5 py-0.5 text-[9px] font-medium text-[#2997ff]">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#2997ff]/30 bg-[#2997ff]/5 p-2.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-[#2997ff]" />
                <span className="text-xs font-medium text-[#f5f5f7]">Fluid Gestures & Physics</span>
              </div>
              <span className="rounded bg-[#2997ff]/20 px-1.5 py-0.5 text-[9px] font-medium text-[#5eaeff]">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1c1c1e]/60 p-2.5 opacity-60">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-white/30" />
                <span className="text-xs text-[#a1a1a6]">Offline Cache Sync</span>
              </div>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-medium text-[#86868b]">
                Queued
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
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] p-6 ${className}`}>
        {/* Subtle radial ambient glow */}
        <div className="absolute -top-10 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.12)_0%,transparent_70%)] blur-2xl" />

        {/* Apple Browser Preview */}
        <div className="relative w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <div className="rounded-full bg-[#1c1c1e] px-3 py-0.5 text-[9px] text-[#86868b] border border-[rgba(255,255,255,0.06)]">
              portfolio.mahesh.dev
            </div>
            <Sparkles size={12} className="text-[#2997ff]" />
          </div>

          {/* Mock Hero Preview */}
          <div className="mt-4 space-y-2 text-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-2 py-0.5 text-[9px] text-[#2997ff]">
              <span>Minimal & Fluid</span>
            </div>
            <div className="text-base font-semibold tracking-tight text-[#f5f5f7]">
              Effortless Experiences
            </div>
            <div className="mx-auto h-1.5 w-3/4 rounded-full bg-white/10" />
            <div className="mx-auto h-1.5 w-1/2 rounded-full bg-white/10" />

            {/* Feature Pills */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] px-2.5 py-0.5 text-[8px] text-[#a1a1a6]">
                Motion
              </span>
              <span className="rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] px-2.5 py-0.5 text-[8px] text-[#a1a1a6]">
                Tailwind CSS
              </span>
              <span className="rounded-full bg-[#1c1c1e] border border-[rgba(255,255,255,0.06)] px-2.5 py-0.5 text-[8px] text-[#a1a1a6]">
                TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic fallback preview
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0f] ${className}`}>
      <div className="relative text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#161616] border border-[rgba(255,255,255,0.12)] text-[#2997ff]">
          <Layout size={32} />
        </div>
        <div className="mt-3 text-xs font-semibold text-[#f5f5f7]">{title}</div>
        <div className="text-[10px] text-[#86868b]">{category}</div>
      </div>
    </div>
  );
}
