import { CloudSun, CheckCircle2, Layout, Sparkles, Wind, Droplets } from "lucide-react";

interface ProjectGraphicProps {
  id: string;
  title: string;
  category: string;
  className?: string;
}

export default function ProjectGraphic({ id, title, category, className = "" }: ProjectGraphicProps) {
  if (id === "project-1") {
    // Weather Dashboard
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-indigo-950/60 via-slate-900 to-black p-6 ${className}`}>
        {/* Ambient glow */}
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Mock Weather Card */}
        <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="text-xs font-semibold text-white/90">San Francisco</div>
              <div className="text-[10px] text-white/50">Real-Time Forecast</div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300">
              <CloudSun size={12} />
              <span>Sunny</span>
            </div>
          </div>

          {/* Main Weather Display */}
          <div className="my-4 flex items-center justify-between">
            <div>
              <div className="text-4xl font-extralight tracking-tight text-white">
                22<span className="text-2xl font-light text-amber-400">°C</span>
              </div>
              <div className="text-[11px] text-white/60">Partly Cloudy • High 25°</div>
            </div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-tr from-amber-500/30 via-orange-500/20 to-transparent p-2">
              <CloudSun size={32} className="text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex items-center gap-2 rounded-xl bg-white/3 p-2 text-[10px] text-white/70">
              <Wind size={12} className="text-indigo-400" />
              <span>Wind: 14 km/h</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/3 p-2 text-[10px] text-white/70">
              <Droplets size={12} className="text-sky-400" />
              <span>Humidity: 58%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "project-2") {
    // Task Manager
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-purple-950/60 via-slate-900 to-black p-6 ${className}`}>
        {/* Ambient glow */}
        <div className="absolute -left-6 -top-6 h-36 w-36 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-emerald-500/20 blur-3xl" />

        {/* Mock Kanban/Task Card */}
        <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-400/80" />
              <div className="h-2 w-2 rounded-full bg-amber-400/80" />
              <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="ml-1 text-xs font-semibold text-white/90">Task Board</span>
            </div>
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-medium text-purple-300">
              3 Active
            </span>
          </div>

          {/* Tasks List */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/3 p-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-xs text-white/90">Design System V2</span>
              </div>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-medium text-emerald-300">
                Done
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-500/10 p-2.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-purple-400" />
                <span className="text-xs font-medium text-white">Interactive Drag & Drop</span>
              </div>
              <span className="rounded bg-purple-500/30 px-1.5 py-0.5 text-[9px] font-medium text-purple-200">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/2 p-2.5 opacity-60">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-white/40" />
                <span className="text-xs text-white/80">LocalStorage Sync</span>
              </div>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-medium text-white/60">
                Todo
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "project-3") {
    // Portfolio Website
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-violet-950/60 via-slate-900 to-black p-6 ${className}`}>
        {/* Ambient glow */}
        <div className="absolute -top-10 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Mock Browser Window */}
        <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-400/80" />
              <div className="h-2 w-2 rounded-full bg-amber-400/80" />
              <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
            <div className="rounded-full bg-white/6 px-3 py-0.5 text-[9px] text-white/50">
              portfolio.dev
            </div>
            <Sparkles size={12} className="text-indigo-400" />
          </div>

          {/* Mock Hero Preview */}
          <div className="mt-4 space-y-2 text-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5 text-[9px] text-indigo-300">
              <span>Apple-Inspired Aesthetic</span>
            </div>
            <div className="text-base font-bold tracking-tight text-white">
              Digital Experiences
            </div>
            <div className="mx-auto h-1.5 w-3/4 rounded-full bg-white/10" />
            <div className="mx-auto h-1.5 w-1/2 rounded-full bg-white/10" />

            {/* Feature Pills */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="rounded-md bg-white/6 px-2 py-0.5 text-[8px] text-white/70">
                Framer Motion
              </span>
              <span className="rounded-md bg-white/6 px-2 py-0.5 text-[8px] text-white/70">
                Tailwind CSS
              </span>
              <span className="rounded-md bg-white/6 px-2 py-0.5 text-[8px] text-white/70">
                TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic Apple-style geometric preview
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-surface to-bg-elevated ${className}`}>
      <div className="relative">
        <div className="h-20 w-20 rounded-3xl bg-linear-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/10 p-5 shadow-inner">
          <Layout size={40} className="text-indigo-400 opacity-60" />
        </div>
        <div className="mt-2 text-center text-xs font-medium text-white/60">{title}</div>
        <div className="text-center text-[10px] text-white/40">{category}</div>
      </div>
    </div>
  );
}
