"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "node" | "code";
  text?: string;
  opacity: number;
  pulsePhase: number;
}

const TECH_SYMBOLS = [
  "{ }",
  "</>",
  "=>",
  "01",
  "async",
  "LAN",
  "git:main",
  "200 OK",
  "0xFF",
  "::1",
  "API",
  "v4.0",
];

export function TechHeroBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;
    const isDark = resolvedTheme === "dark";

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 170,
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Track mouse for interactive glow
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize particles
    const particleCount = Math.floor(Math.min(width, 1400) / 32);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isCode = i % 4 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: isCode ? 10 : Math.random() * 2 + 1.5,
        type: isCode ? "code" : "node",
        text: isCode ? TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)] : undefined,
        opacity: Math.random() * 0.4 + 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Packet pulses traveling along circuit traces
    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }
    const packets: Packet[] = [];

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let lastTime = performance.now();

    const loop = (now: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Colors based on theme
      const accentRgb = isDark ? "213, 189, 175" : "142, 95, 46";
      const lineRgb = isDark ? "255, 255, 255" : "15, 23, 42";

      // 1. Subtle mouse spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const radGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        radGrad.addColorStop(0, `rgba(${accentRgb}, ${isDark ? 0.08 : 0.05})`);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and draw connections (network topology)
      const maxDist = 140;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.08 : 0.05);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            // 45-degree circuit chamfer routing for tech circuit aesthetic
            const midX = (p1.x + p2.x) / 2;
            ctx.lineTo(midX, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Chance to spawn packet pulse
            if (packets.length < 12 && Math.random() < 0.003) {
              packets.push({
                fromIndex: i,
                toIndex: j,
                progress: 0,
                speed: Math.random() * 0.8 + 0.4,
              });
            }
          }
        }
      }

      // 3. Update and draw packet pulses
      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        pkt.progress += pkt.speed * dt;
        if (pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const pA = particles[pkt.fromIndex];
        const pB = particles[pkt.toIndex];
        if (!pA || !pB) {
          packets.splice(k, 1);
          continue;
        }

        const curX = pA.x + (pB.x - pA.x) * pkt.progress;
        const curY = pA.y + (pB.y - pA.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${0.8 * Math.sin(pkt.progress * Math.PI)})`;
        ctx.shadowColor = `rgba(${accentRgb}, 0.5)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Update and draw particles / code symbols
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Interactive mouse push/pull
        const dMouseX = mouse.x - p.x;
        const dMouseY = mouse.y - p.y;
        const distMouse = Math.hypot(dMouseX, dMouseY);
        let mouseBoost = 0;

        if (distMouse < mouse.radius) {
          mouseBoost = (1 - distMouse / mouse.radius) * 0.5;
          // Connect to mouse cursor
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${accentRgb}, ${mouseBoost * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Pulse
        p.pulsePhase += dt * 1.5;
        const pulse = 0.5 + 0.5 * Math.sin(p.pulsePhase);
        const currentOpacity = Math.min(1, p.opacity * (0.6 + 0.4 * pulse) + mouseBoost);

        if (p.type === "code" && p.text) {
          ctx.font = "bold 11px 'JetBrains Mono', monospace";
          ctx.fillStyle = `rgba(${accentRgb}, ${currentOpacity * (isDark ? 0.35 : 0.28)})`;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentRgb}, ${currentOpacity * (isDark ? 0.5 : 0.4)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 -z-20 overflow-hidden pointer-events-none select-none"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Dynamic Interactive Tech & Development Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Top & Bottom Vignettes for Soft Fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
