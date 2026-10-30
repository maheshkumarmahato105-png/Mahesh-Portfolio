import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseRadius: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const PARTICLE_COLORS = [
  "rgba(129, 140, 248, ", // indigo
  "rgba(56, 189, 248, ",  // cyan
  "rgba(244, 63, 94, ",   // rose
  "rgba(192, 132, 252, ", // violet
];

/**
 * Interactive Neural Particle & Constellation Field.
 * Features real-time cursor gravity, magnetic filaments, and click shockwave ripples.
 */
export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 170,
      isHovering: false,
    };

    const initCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles = [];
      // Adjust particle count based on screen width
      const count = Math.min(85, Math.max(35, Math.floor(width / 22)));

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.8 + 1.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius,
          baseRadius: radius,
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!,
        });
      }
    };

    initCanvasSize();
    createParticles();

    const handleResize = () => {
      initCanvasSize();
      createParticles();
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovering = false;
    };

    // Click triggers a holographic shockwave
    const handleClick = (e: globalThis.MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 180,
        alpha: 0.8,
      });

      // Scatter particles near the click point
      particles.forEach((p) => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * 5;
          p.vy += (dy / dist) * force * 5;
        }
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s]!;
        sw.radius += 5;
        sw.alpha -= 0.025;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(129, 140, 248, ${sw.alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;

        // Apply friction to dampen sudden shockwave velocity
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Maintain minimum ambient speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.3) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x <= 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x >= width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y <= 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y >= height) {
          p.y = height;
          p.vy *= -1;
        }

        // Mouse gravity & repulsion physics
        if (mouse.isHovering) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            // Magnetic gentle repulsion force
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 2.2;
            p.y += Math.sin(angle) * force * 2.2;
            p.radius = p.baseRadius * (1 + force * 0.6);

            // Draw laser filament line connecting cursor to particle
            if (dist < 130) {
              const lineAlpha = (1 - dist / 130) * 0.35;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          } else {
            p.radius = p.baseRadius;
          }
        }

        // Draw particle node with soft glowing halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.75)`;
        ctx.fill();

        // 3. Connect neighboring particles with neural synaptic lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]!;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 115;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65 dark:opacity-75 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
