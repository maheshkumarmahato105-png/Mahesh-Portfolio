import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Terminal, Code2, Zap, CheckCircle2, Rocket } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

interface SpatialHero3DProps {
  onExplore?: () => void;
}

export default function SpatialHero3D({ onExplore }: SpatialHero3DProps) {
  const reduced = prefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRunningDemo, setIsRunningDemo] = useState(false);

  // Mouse coordinate values normalized from -0.5 to +0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Precision fluid spring interpolation
  const springConfig = { stiffness: 240, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const scale = useSpring(isHovered ? 1.03 : 1, springConfig);

  // Dynamic light reflection glare
  const glareX = useTransform(mouseX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [15, 85]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 340px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.22), transparent 70%)`
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    if (reduced) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleRunDemo = (e: MouseEvent) => {
    e.stopPropagation();
    setIsRunningDemo(true);
    onExplore?.();
    setTimeout(() => setIsRunningDemo(false), 2400);
  };

  return (
    <div
      className="relative flex w-full items-center justify-center py-6 select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Motion Stage */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          scale,
        }}
        animate={
          reduced
            ? undefined
            : isHovered
            ? undefined
            : {
                rotateX: [2, -2, 2],
                rotateY: [-3, 3, -3],
                y: [-3, 3, -3],
              }
        }
        transition={
          isHovered
            ? undefined
            : {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="relative w-full max-w-[440px] cursor-pointer will-change-transform sm:max-w-[480px]"
      >
        {/* Layer 0: 3D Holographic Concentric Orbit Rings */}
        <div
          style={{ transform: "translateZ(-40px)" }}
          className="pointer-events-none absolute -inset-10 flex items-center justify-center opacity-70"
        >
          {/* Ring 1 - Cyan Cyber Orbit */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ transform: "rotateX(68deg)" }}
            className="absolute h-96 w-96 rounded-full border border-cyan-400/25 border-dashed"
          />
          {/* Ring 2 - Violet Matrix Orbit */}
          <motion.div
            animate={{ rotateZ: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            style={{ transform: "rotateY(65deg)" }}
            className="absolute h-[420px] w-[420px] rounded-full border border-purple-400/20"
          />
          {/* Ring 3 - Rose Particle Beacon */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ transform: "rotateX(45deg) rotateY(45deg)" }}
            className="absolute h-[380px] w-[380px] rounded-full border border-rose-400/20 border-dotted"
          />
          {/* Central Chromatic Energy Halo */}
          <div className="absolute h-64 w-64 rounded-full bg-linear-to-tr from-indigo-500/25 via-purple-500/20 to-rose-500/25 blur-3xl" />
        </div>

        {/* Layer 1: Frosted Glass Spatial Code Terminal Window */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className={`relative overflow-hidden rounded-3xl border bg-(--color-bg-glass)/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 ${
            isRunningDemo
              ? "border-emerald-400/80 shadow-[0_0_35px_rgba(16,185,129,0.35)]"
              : "border-white/20 hover:border-white/30"
          }`}
        >
          {/* Window Title Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-xs" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-xs" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-xs" />
            </div>

            <div className="flex items-center gap-1.5 rounded-md bg-black/20 px-2.5 py-0.5 text-[11px] font-mono text-(--color-text-secondary)">
              <Code2 size={13} className="text-cyan-400" />
              <span>Mahesh.tsx</span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span>120 FPS</span>
            </div>
          </div>

          {/* Syntax Highlighted Code Canvas */}
          <div className="p-5 font-mono text-xs leading-relaxed sm:text-[13px]">
            <div className="flex items-center gap-2 text-(--color-text-muted)">
              <span className="text-purple-400">import</span>
              <span className="text-white">{"{ Experience }"}</span>
              <span className="text-purple-400">from</span>
              <span className="text-emerald-400">"@portfolio/interactive"</span>;
            </div>

            <div className="mt-3 text-(--color-text-secondary)">
              <span className="text-purple-400">export const</span>{" "}
              <span className="text-amber-300">developer</span> = {"{"}
            </div>

            <div className="pl-4 text-(--color-text-primary)">
              <div>
                <span className="text-cyan-300">name</span>:{" "}
                <span className="text-emerald-300">"Mahesh Kumar Mahato"</span>,
              </div>
              <div>
                <span className="text-cyan-300">role</span>:{" "}
                <span className="text-emerald-300">"Frontend Engineer"</span>,
              </div>
              <div>
                <span className="text-cyan-300">technologies</span>: [
                <span className="text-amber-200">"React 19"</span>,{" "}
                <span className="text-amber-200">"TypeScript"</span>,{" "}
                <span className="text-amber-200">"Motion"</span>],
              </div>
              <div>
                <span className="text-cyan-300">interactive3D</span>:{" "}
                <span className="text-purple-400">true</span>,
              </div>
              <div>
                <span className="text-cyan-300">availability</span>:{" "}
                <span className="text-emerald-400">"Open for Roles"</span>,
              </div>
            </div>

            <div className="text-(--color-text-secondary)">{"};"}</div>

            {/* Interactive Terminal Bar */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-2.5 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal size={14} />
                <span className="font-semibold">
                  {isRunningDemo ? "🚀 Launching interactive showcase..." : "Ready for production"}
                </span>
              </div>
              <button
                onClick={handleRunDemo}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-sans font-medium text-white transition-all active:scale-95 ${
                  isRunningDemo
                    ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {isRunningDemo ? (
                  <>
                    <span>Running</span>
                    <Rocket size={11} className="animate-bounce text-white" />
                  </>
                ) : (
                  <>
                    <span>Run Demo</span>
                    <Zap size={11} className="text-amber-400" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Holographic Specular Glare Layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0.4 }}
          >
            <motion.div className="absolute inset-0" style={{ background: glareBackground }} />
          </motion.div>
        </div>

        {/* Layer 2: Floating Spatial 3D Tech Pill (Top-Right, translateZ: 65px) */}
        <motion.div
          style={{ transform: "translateZ(65px)" }}
          className="absolute -right-3 -top-3 sm:-right-5 sm:-top-5 flex items-center gap-2 rounded-2xl border border-white/25 bg-black/60 px-3.5 py-2 shadow-xl backdrop-blur-xl transition-transform hover:scale-105"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <Zap size={14} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-white">React 19 & TypeScript</span>
            <span className="text-[9px] text-(--color-text-muted)">High-performance UI</span>
          </div>
        </motion.div>

        {/* Layer 3: Floating Spatial 3D Experience Pill (Bottom-Left, translateZ: 80px) */}
        <motion.div
          style={{ transform: "translateZ(80px)" }}
          className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 flex items-center gap-2 rounded-2xl border border-white/25 bg-black/60 px-3.5 py-2 shadow-xl backdrop-blur-xl transition-transform hover:scale-105"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-tr from-rose-500 to-amber-500 text-white">
            <Sparkles size={13} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-white">Spatial 3D Motion</span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={10} /> 60/120 FPS Fluid
            </span>
          </div>
        </motion.div>

        {/* Layer 4: Floating Story Avatar Hologram (Top-Left, translateZ: 95px) */}
        <motion.div
          style={{ transform: "translateZ(95px)" }}
          className="absolute -left-3 top-8 hidden sm:flex items-center gap-2.5 rounded-full border border-white/20 bg-black/70 p-1.5 pr-3 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-(--color-bg) font-bold text-xs text-white">
              M
            </div>
          </div>
          <span className="text-[11px] font-semibold text-white">Mahesh</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
