"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, ShieldCheck, Activity, Wifi, Terminal } from "lucide-react";

/**
 * Interactive 3D Multi-Device Architecture Stage
 *
 * Built with native CSS 3D transforms and Framer Motion spring physics.
 * ZERO <canvas> elements and ZERO container card boxes.
 * Floats free-form in the hero section with vector-crisp typography,
 * real interactive UI screens, and dynamic 3D cursor-tracking parallax.
 */
export function InteractiveCanvas3D() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Mouse motion values for silky 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 18, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Parallax angles
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);

  // Subtle counter-depth for the overlapping phone
  const phoneX = useTransform(smoothMouseX, [-0.5, 0.5], [18, -18]);
  const phoneY = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);

  // Floating chip parallax offsets
  const chip1X = useTransform(smoothMouseX, [-0.5, 0.5], [-24, 24]);
  const chip1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-16, 16]);

  const chip2X = useTransform(smoothMouseX, [-0.5, 0.5], [26, -26]);
  const chip2Y = useTransform(smoothMouseY, [-0.5, 0.5], [18, -18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[540px] h-[460px] sm:h-[500px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: 1200 }}
    >
      {/* Master 3D Rotational Stage - No Canvas, No Box */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
      >
        {/* ========================================================= */}
        {/* 1. 3D LAPTOP (Full-Stack Next.js 16 Web Architecture)     */}
        {/* ========================================================= */}
        <div
          className="absolute left-2 sm:left-4 top-10 sm:top-8 w-[320px] sm:w-[390px] md:w-[420px]"
          style={{
            transform: "translateZ(0px) rotateY(6deg) rotateX(4deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Laptop Display Lid */}
          <div className="relative rounded-2xl bg-neutral-950 dark:bg-neutral-900 border-[3px] border-neutral-800 dark:border-neutral-700 p-2 sm:p-2.5 shadow-2xl">
            {/* Webcam dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 mx-auto mb-1.5" />

            {/* Laptop Screen Display Area */}
            <div className="rounded-lg bg-card text-card-foreground border border-border/80 overflow-hidden shadow-inner font-sans text-left">
              {/* Browser Window Titlebar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-muted/80 border-b border-border text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-card border border-border/80 text-muted-foreground font-mono text-[9px] tracking-tight">
                  psasare.dev/architecture-telemetry
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-mono font-bold">
                  <Wifi className="w-2.5 h-2.5" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Screen Body Content */}
              <div className="p-3.5 space-y-2.5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-montserrat font-bold text-xs sm:text-sm text-foreground">
                      Full-Stack Architecture & Systems
                    </h4>
                    <p className="font-sans text-[10px] text-muted-foreground">
                      Next.js 16 &bull; TypeScript &bull; Hospital Clinical Networks
                    </p>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    SLA 99.98%
                  </span>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-muted/50 border border-border/60">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground block">
                      SYSTEM STATUS
                    </span>
                    <span className="font-montserrat font-bold text-[11px] text-foreground">
                      OPTIMAL
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 border border-border/60">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground block">
                      THROUGHPUT
                    </span>
                    <span className="font-montserrat font-bold text-[11px] text-accent">
                      4.2k req/s
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 border border-border/60">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground block">
                      DATABASE
                    </span>
                    <span className="font-montserrat font-bold text-[11px] text-foreground">
                      POSTGRESQL
                    </span>
                  </div>
                </div>

                {/* Traffic Graph Simulation */}
                <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 space-y-1">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-muted-foreground font-semibold flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5 text-accent" /> Network Latency
                    </span>
                    <span className="font-mono text-foreground font-bold">12ms nominal</span>
                  </div>
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 300 40">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,32 Q30,12 60,24 T120,8 T180,26 T240,14 T300,18 L300,40 L0,40 Z"
                      fill="url(#curveGradient)"
                    />
                    <path
                      d="M0,32 Q30,12 60,24 T120,8 T180,26 T240,14 T300,18"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Mini System Logs */}
                <div className="flex items-center justify-between pt-1 font-mono text-[9px] text-muted-foreground border-t border-border/60">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-2.5 h-2.5 text-accent" /> Workstations Synced
                  </span>
                  <span className="text-emerald-500 font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Base Chassis & Trackpad Deck */}
          <div className="relative mx-auto -mt-0.5 w-[335px] sm:w-[410px] md:w-[440px] h-3 bg-neutral-800 dark:bg-neutral-800 rounded-b-xl border-t border-neutral-600/60 shadow-lg flex justify-center">
            {/* Center thumb notch */}
            <div className="w-12 h-1 bg-neutral-900 rounded-b-md" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. 3D SMARTPHONE (React Native Mobile App)                 */}
        {/* ========================================================= */}
        <motion.div
          style={{
            x: phoneX,
            y: phoneY,
            transform: "translateZ(80px) rotateY(-14deg) rotateX(4deg)",
            transformStyle: "preserve-3d",
          }}
          className="absolute right-2 sm:right-6 bottom-4 sm:bottom-6 w-[175px] sm:w-[200px]"
        >
          {/* Phone Outer Chassis with metallic edge highlight */}
          <div className="relative rounded-[32px] bg-neutral-950 dark:bg-neutral-900 border-[3.5px] border-neutral-700/80 p-2 shadow-2xl">
            {/* Dynamic Island pill */}
            <div className="w-12 h-3.5 bg-black rounded-full mx-auto mb-1 flex items-center justify-end pr-1">
              <span className="w-1 h-1 rounded-full bg-neutral-800" />
            </div>

            {/* Phone Screen Display */}
            <div className="rounded-[24px] bg-card text-card-foreground border border-border/70 overflow-hidden shadow-inner p-2.5 space-y-2 text-left">
              {/* Phone Status Row */}
              <div className="flex items-center justify-between text-[9px] text-muted-foreground font-semibold px-1">
                <span>09:41</span>
                <span>5G &bull; 100%</span>
              </div>

              {/* App Title */}
              <div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-accent font-bold block">
                  REACT NATIVE
                </span>
                <h5 className="font-montserrat font-bold text-xs text-foreground leading-tight">
                  MindBridge Health
                </h5>
              </div>

              {/* Clinical Card */}
              <div className="p-2 rounded-xl bg-muted/60 border border-border/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-[10px] text-foreground">
                    Clinical Sync
                  </span>
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                </div>
                <p className="font-sans text-[8px] text-muted-foreground">
                  Offline-first sync online
                </p>
                {/* Progress bar */}
                <div className="w-full bg-border h-1 rounded-full overflow-hidden mt-1">
                  <div className="w-4/5 h-full bg-accent rounded-full" />
                </div>
              </div>

              {/* Action Rows */}
              <div className="space-y-1 pt-0.5">
                <div className="p-1.5 rounded-lg bg-card border border-border/60 flex items-center justify-between text-[9px]">
                  <span className="font-medium text-foreground">Clinical Logs</span>
                  <CheckCircle2 className="w-2.5 h-2.5 text-accent" />
                </div>
                <div className="p-1.5 rounded-lg bg-card border border-border/60 flex items-center justify-between text-[9px]">
                  <span className="font-medium text-foreground">Medication Queue</span>
                  <CheckCircle2 className="w-2.5 h-2.5 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 3. FLOATING GLASS ARCHITECTURE CHIPS (3D Depth)          */}
        {/* ========================================================= */}
        {/* Top-Left Floating Badge */}
        <motion.div
          style={{
            x: chip1X,
            y: chip1Y,
            transform: "translateZ(110px)",
          }}
          className="absolute -top-3 -left-2 sm:left-0 z-30"
        >
          <div className="px-3 py-1.5 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-foreground tracking-wider uppercase">
              Next.js 16 // Full-Stack
            </span>
          </div>
        </motion.div>

        {/* Bottom-Right Floating Badge */}
        <motion.div
          style={{
            x: chip2X,
            y: chip2Y,
            transform: "translateZ(130px)",
          }}
          className="absolute -bottom-3 right-0 sm:right-4 z-30"
        >
          <div className="px-3 py-1.5 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-[10px] font-bold text-foreground tracking-wider uppercase">
              React Native // Mobile UI
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
