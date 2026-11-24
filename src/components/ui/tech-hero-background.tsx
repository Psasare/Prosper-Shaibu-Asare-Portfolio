"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface TraceBus {
  points: { x: number; y: number }[];
  viaStart: boolean;
  viaEnd: boolean;
  chipLabel?: string;
}

interface DataPacket {
  busIndex: number;
  segmentIndex: number;
  progress: number;
  speed: number;
  length: number;
}

interface VectorAnchor {
  x: number;
  y: number;
  handleAx: number;
  handleAy: number;
  handleBx: number;
  handleBy: number;
  driftVx: number;
  driftVy: number;
}

interface FloatingTechToken {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  opacity: number;
  pulsePhase: number;
}

const TECH_TOKENS = [
  "const [state, set] = use()",
  "export async function",
  "LAN 192.168.1.1/24",
  "git::main",
  "UHAS_IT_DIR // HO",
  "200 OK [HTTP/3]",
  "type Props<T> =",
  "λ serverless_edge",
  "0x7F // buffer",
  "Next.js 16.4",
  "React 19",
  "TypeScript v5.7",
  "PostgreSQL :: ACID",
  "{ ...architecture }",
  "UG_LEGON // BSC_IT",
  "[06°36'N / 00°28'E]",
];

/**
 * Advanced Architectural Design & Tech Background
 *
 * Implements a high-precision, bespoke CAD/circuit aesthetic:
 * 1. Precision 56px Engineering Grid with dynamic crosshairs (+) that illuminate near cursor
 * 2. 45° Chamfered Circuit Buses with solder-pad vias and silicon microchip outlines
 * 3. Luminescent Data Packets gliding with fading comet trails
 * 4. Vector Pen Tool & Bézier Anchor Handles reflecting UI/UX digital craft
 * 5. Monospace Engineering Syntax & Telemetry (Ho, Ghana coordinates, UHAS IT, Next.js)
 * 6. Smooth interactive magnetic cursor proximity & dual atmospheric radiance blooms
 */
export function TechHeroBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;
    const isDark = resolvedTheme === "dark";

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 190,
    };

    // Parallax scroll tracking with smooth lerp
    const scroll = {
      y: 0,
      targetY: 0,
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    scroll.targetY = window.scrollY;
    scroll.y = window.scrollY;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // 1. Procedural Circuit Buses Generation
    const GRID_SIZE = 56;
    const generateBuses = (): TraceBus[] => {
      const buses: TraceBus[] = [];
      const numBuses = Math.min(14, Math.max(8, Math.floor(width / 130)));

      for (let i = 0; i < numBuses; i++) {
        // Align to grid nodes
        const startGridX = Math.floor((Math.random() * (width - 120) + 60) / GRID_SIZE);
        const startGridY = Math.floor((Math.random() * (height - 120) + 60) / GRID_SIZE);

        const x0 = startGridX * GRID_SIZE;
        const y0 = startGridY * GRID_SIZE;

        const points: { x: number; y: number }[] = [{ x: x0, y: y0 }];
        let currX = x0;
        let currY = y0;

        const numSegments = 2 + Math.floor(Math.random() * 3);
        let horizontal = Math.random() > 0.5;

        for (let s = 0; s < numSegments; s++) {
          const stepCount = (1 + Math.floor(Math.random() * 3)) * (Math.random() > 0.5 ? 1 : -1);
          if (horizontal) {
            const nextX = currX + stepCount * GRID_SIZE;
            // 45° chamfer transition
            const chamfer = Math.min(GRID_SIZE, Math.abs(nextX - currX) / 2);
            const chamferX = nextX > currX ? currX + chamfer : currX - chamfer;
            const chamferY = currY + (Math.random() > 0.5 ? 1 : -1) * (chamfer / 2);

            points.push({ x: chamferX, y: chamferY });
            points.push({ x: nextX, y: chamferY });
            currX = nextX;
            currY = chamferY;
          } else {
            const nextY = currY + stepCount * GRID_SIZE;
            const chamfer = Math.min(GRID_SIZE, Math.abs(nextY - currY) / 2);
            const chamferX = currX + (Math.random() > 0.5 ? 1 : -1) * (chamfer / 2);
            const chamferY = nextY > currY ? currY + chamfer : currY - chamfer;

            points.push({ x: chamferX, y: chamferY });
            points.push({ x: chamferX, y: nextY });
            currX = chamferX;
            currY = nextY;
          }
          horizontal = !horizontal;
        }

        buses.push({
          points,
          viaStart: true,
          viaEnd: true,
          chipLabel: i % 3 === 0 ? (i % 2 === 0 ? "UHAS_RT" : "CORE_V4") : undefined,
        });
      }
      return buses;
    };

    const buses = generateBuses();

    // 2. Data Packets
    const packets: DataPacket[] = [];
    const maxPackets = 12;

    for (let p = 0; p < 8; p++) {
      if (buses.length > 0) {
        packets.push({
          busIndex: Math.floor(Math.random() * buses.length),
          segmentIndex: 0,
          progress: Math.random(),
          speed: 0.35 + Math.random() * 0.45,
          length: 18 + Math.random() * 14,
        });
      }
    }

    // 3. Vector Design Handles (Bézier UI/UX Engineering motifs)
    const vectorAnchors: VectorAnchor[] = [];
    const numAnchors = Math.min(6, Math.max(3, Math.floor(width / 320)));

    for (let a = 0; a < numAnchors; a++) {
      const ax = (0.15 + 0.7 * Math.random()) * width;
      const ay = (0.15 + 0.7 * Math.random()) * height;
      const armLength = 28 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;

      vectorAnchors.push({
        x: ax,
        y: ay,
        handleAx: ax + Math.cos(angle) * armLength,
        handleAy: ay + Math.sin(angle) * armLength,
        handleBx: ax - Math.cos(angle) * armLength,
        handleBy: ay - Math.sin(angle) * armLength,
        driftVx: (Math.random() - 0.5) * 0.15,
        driftVy: (Math.random() - 0.5) * 0.15,
      });
    }

    // 4. Floating Engineering Syntax Tokens
    const tokens: FloatingTechToken[] = [];
    const tokenCount = Math.min(10, Math.max(6, Math.floor(width / 160)));

    for (let t = 0; t < tokenCount; t++) {
      tokens.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        text: TECH_TOKENS[t % TECH_TOKENS.length],
        opacity: 0.22 + Math.random() * 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Tab visibility handling
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    // -------------------------------------------------------------
    // Main 120 FPS CAD & Tech Canvas Rendering Engine
    // -------------------------------------------------------------
    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);

      if (!isVisible) {
        lastTime = now;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Mouse position smoothing (Lerp)
      if (mouse.targetX > 0) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Multi-plane spatial scroll parallax (smooth lerp)
      scroll.y += (scroll.targetY - scroll.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Color palettes according to theme: Dark mode uses sleek, deep, disciplined tones
      const accentRgb = isDark ? "226, 163, 101" : "142, 95, 46";
      const busRgb = isDark ? "40, 52, 74" : "71, 85, 105";
      const crossRgb = isDark ? "30, 42, 60" : "100, 116, 139";
      const cyanGlowRgb = isDark ? "56, 189, 248" : "14, 165, 233";

      // -------------------------------------------------------------
      // LAYER 1: Interactive Radial Cursor Energy
      // -------------------------------------------------------------
      if (mouse.x > 0 && mouse.y > 0) {
        const radGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        radGrad.addColorStop(0, `rgba(${accentRgb}, ${isDark ? 0.09 : 0.06})`);
        radGrad.addColorStop(0.5, `rgba(${cyanGlowRgb}, ${isDark ? 0.03 : 0.02})`);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // -------------------------------------------------------------
      // LAYER 2: Architectural CAD Grid & Interactive Crosshairs (+) with Spatial Parallax
      // -------------------------------------------------------------
      const cols = Math.ceil(width / GRID_SIZE);
      const rows = Math.ceil(height / GRID_SIZE) + 1;
      const gridOffsetY = -((scroll.y * 0.035) % GRID_SIZE);

      ctx.save();
      for (let c = 0; c <= cols; c++) {
        const gx = c * GRID_SIZE;
        for (let r = -1; r <= rows; r++) {
          const gy = r * GRID_SIZE + gridOffsetY;

          // Distance to cursor
          const dmx = mouse.x - gx;
          const dmy = mouse.y - gy;
          const distMouse = Math.hypot(dmx, dmy);

          let crossSize = 2.5;
          let alpha = isDark ? 0.05 : 0.035;

          if (distMouse < mouse.radius) {
            const proximity = 1 - distMouse / mouse.radius;
            crossSize = 2.5 + proximity * 3;
            alpha = isDark ? 0.05 + proximity * 0.18 : 0.035 + proximity * 0.12;
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(${crossRgb}, ${alpha})`;
          }

          ctx.lineWidth = 1;
          ctx.beginPath();
          // Horizontal cross tick
          ctx.moveTo(gx - crossSize, gy);
          ctx.lineTo(gx + crossSize, gy);
          // Vertical cross tick
          ctx.moveTo(gx, gy - crossSize);
          ctx.lineTo(gx, gy + crossSize);
          ctx.stroke();
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 3: Circuit Logic Buses, Vias & Microchip Dies
      // -------------------------------------------------------------
      ctx.save();
      for (let b = 0; b < buses.length; b++) {
        const bus = buses[b];
        const pts = bus.points;
        if (pts.length < 2) continue;

        // Trace line
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let k = 1; k < pts.length; k++) {
          ctx.lineTo(pts[k].x, pts[k].y);
        }
        ctx.strokeStyle = `rgba(${busRgb}, ${isDark ? 0.06 : 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Terminal solder vias (double concentric circular pad)
        const drawVia = (px: number, py: number) => {
          // Outer via ring
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${accentRgb}, ${isDark ? 0.16 : 0.11})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Inner solid pin
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentRgb}, ${isDark ? 0.28 : 0.18})`;
          ctx.fill();
        };

        if (bus.viaStart) drawVia(pts[0].x, pts[0].y);
        if (bus.viaEnd) drawVia(pts[pts.length - 1].x, pts[pts.length - 1].y);

        // Microchip processor die badge if configured
        if (bus.chipLabel && pts.length > 2) {
          const midPt = pts[Math.floor(pts.length / 2)];
          const chipW = 54;
          const chipH = 18;
          const chipX = midPt.x - chipW / 2;
          const chipY = midPt.y - chipH / 2;

          // Chip lead pins (3 on top, 3 on bottom)
          ctx.strokeStyle = `rgba(${busRgb}, ${isDark ? 0.12 : 0.08})`;
          ctx.lineWidth = 0.8;
          for (let pin = 0; pin < 3; pin++) {
            const pinX = chipX + 11 + pin * 16;
            ctx.beginPath();
            ctx.moveTo(pinX, chipY - 2.5);
            ctx.lineTo(pinX, chipY);
            ctx.moveTo(pinX, chipY + chipH);
            ctx.lineTo(pinX, chipY + chipH + 2.5);
            ctx.stroke();
          }

          // Chip Silicon Body
          ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(241, 245, 249, 0.5)";
          ctx.strokeStyle = `rgba(${accentRgb}, ${isDark ? 0.18 : 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.roundRect(chipX, chipY, chipW, chipH, 3);
          ctx.fill();
          ctx.stroke();

          // Chip Silicon Label
          ctx.font = "bold 8px 'JetBrains Mono', monospace";
          ctx.fillStyle = `rgba(${accentRgb}, ${isDark ? 0.4 : 0.3})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(bus.chipLabel, midPt.x, midPt.y);
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 4: Dynamic Luminescent Data Packets & Fading Comet Trails
      // -------------------------------------------------------------
      ctx.save();
      for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
        const pkt = packets[pIdx];
        const bus = buses[pkt.busIndex];
        if (!bus || bus.points.length < 2) continue;

        pkt.progress += pkt.speed * dt;

        // Advance to next segment if progress >= 1
        if (pkt.progress >= 1) {
          pkt.segmentIndex++;
          pkt.progress = 0;
          if (pkt.segmentIndex >= bus.points.length - 1) {
            // Re-route to a new random bus or loop
            pkt.busIndex = Math.floor(Math.random() * buses.length);
            pkt.segmentIndex = 0;
            pkt.progress = 0;
            continue;
          }
        }

        const pA = bus.points[pkt.segmentIndex];
        const pB = bus.points[pkt.segmentIndex + 1];
        if (!pA || !pB) continue;

        const curX = pA.x + (pB.x - pA.x) * pkt.progress;
        const curY = pA.y + (pB.y - pA.y) * pkt.progress;

        // Trailing comet vector calculation
        const dx = pB.x - pA.x;
        const dy = pB.y - pA.y;
        const segDist = Math.hypot(dx, dy);
        const normDx = segDist > 0 ? dx / segDist : 1;
        const normDy = segDist > 0 ? dy / segDist : 0;

        const tailX = curX - normDx * pkt.length;
        const tailY = curY - normDy * pkt.length;

        // Glowing packet tail gradient
        const cometGrad = ctx.createLinearGradient(tailX, tailY, curX, curY);
        cometGrad.addColorStop(0, "rgba(0,0,0,0)");
        cometGrad.addColorStop(0.7, `rgba(${cyanGlowRgb}, ${isDark ? 0.2 : 0.12})`);
        cometGrad.addColorStop(1, `rgba(${accentRgb}, ${isDark ? 0.35 : 0.25})`);

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // Packet Head Glow
        ctx.beginPath();
        ctx.arc(curX, curY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${isDark ? 0.55 : 0.45})`;
        ctx.shadowColor = `rgba(${accentRgb}, 0.4)`;
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // Spawn new packets occasionally
      if (packets.length < maxPackets && Math.random() < 0.02) {
        packets.push({
          busIndex: Math.floor(Math.random() * buses.length),
          segmentIndex: 0,
          progress: 0,
          speed: 0.3 + Math.random() * 0.5,
          length: 16 + Math.random() * 12,
        });
      }

      // -------------------------------------------------------------
      // LAYER 5: Vector Pen Tool & Bézier Anchor Handles (Subtle Design Craft)
      // -------------------------------------------------------------
      ctx.save();
      for (let a = 0; a < vectorAnchors.length; a++) {
        const v = vectorAnchors[a];

        v.x += v.driftVx;
        v.y += v.driftVy;
        v.handleAx += v.driftVx;
        v.handleAy += v.driftVy;
        v.handleBx += v.driftVx;
        v.handleBy += v.driftVy;

        if (v.x < 30 || v.x > width - 30) v.driftVx *= -1;
        if (v.y < 30 || v.y > height - 30) v.driftVy *= -1;

        const distM = Math.hypot(mouse.x - v.x, mouse.y - v.y);
        const nearMouse = distM < mouse.radius;
        const anchorAlpha = nearMouse ? (isDark ? 0.22 : 0.15) : isDark ? 0.07 : 0.04;

        ctx.beginPath();
        ctx.moveTo(v.handleAx, v.handleAy);
        ctx.lineTo(v.handleBx, v.handleBy);
        ctx.strokeStyle = `rgba(${accentRgb}, ${anchorAlpha * 0.7})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        const drawHandleCircle = (hx: number, hy: number) => {
          ctx.beginPath();
          ctx.arc(hx, hy, 2, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.7)";
          ctx.strokeStyle = `rgba(${accentRgb}, ${anchorAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.fill();
          ctx.stroke();
        };

        drawHandleCircle(v.handleAx, v.handleAy);
        drawHandleCircle(v.handleBx, v.handleBy);

        const sqSize = nearMouse ? 5.5 : 4.5;
        ctx.save();
        ctx.translate(v.x, v.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(${accentRgb}, ${anchorAlpha * 0.8})`;
        ctx.strokeStyle = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
        ctx.lineWidth = 0.6;
        ctx.fillRect(-sqSize / 2, -sqSize / 2, sqSize, sqSize);
        ctx.strokeRect(-sqSize / 2, -sqSize / 2, sqSize, sqSize);
        ctx.restore();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 6: Perimeter Engineering Framing & Crop Brackets (Low-noise)
      // -------------------------------------------------------------
      ctx.save();
      const bracketSize = 12;
      const margin = 20;
      const bracketAlpha = isDark ? 0.12 : 0.08;
      ctx.strokeStyle = `rgba(${accentRgb}, ${bracketAlpha})`;
      ctx.lineWidth = 1;

      // Top-Left ⌜
      ctx.beginPath();
      ctx.moveTo(margin, margin + bracketSize);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + bracketSize, margin);
      ctx.stroke();

      // Top-Right ⌝
      ctx.beginPath();
      ctx.moveTo(width - margin - bracketSize, margin);
      ctx.lineTo(width - margin, margin);
      ctx.lineTo(width - margin, margin + bracketSize);
      ctx.stroke();

      // Bottom-Left ⌞
      ctx.beginPath();
      ctx.moveTo(margin, height - margin - bracketSize);
      ctx.lineTo(margin, height - margin);
      ctx.lineTo(margin + bracketSize, height - margin);
      ctx.stroke();

      // Bottom-Right ⌟
      ctx.beginPath();
      ctx.moveTo(width - margin - bracketSize, height - margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.lineTo(width - margin, height - margin - bracketSize);
      ctx.stroke();

      // Subtle Precision Coordinates Tag (Top Right)
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.fillStyle = `rgba(${accentRgb}, ${bracketAlpha * 0.9})`;
      ctx.textAlign = "right";
      ctx.fillText("[CAD // 56PX_GRID]", width - margin - 16, margin + 4);

      // Subtle Location Tag (Bottom Left)
      ctx.textAlign = "left";
      ctx.fillText("[LOC // HO, GH :: 06.60N 00.47E]", margin + 16, height - margin - 2);

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none select-none opacity-40 dark:opacity-50 transition-opacity duration-700"
    >
      {/* Ambient Warm & Cool Atmospheric Radiance Blooms (Dual Tone Depth) */}
      <div
        className="absolute -top-[15%] -right-[10%] w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full blur-[160px] opacity-[0.035] dark:opacity-[0.015] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, rgba(213, 189, 175, 0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-[15%] -left-[10%] w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full blur-[170px] opacity-[0.025] dark:opacity-[0.012] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%)",
        }}
      />

      {/* Dynamic 120 FPS CAD Grid, Circuit Buses & Vector Engineering Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
export default TechHeroBackground;
