"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  Wifi,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Cpu,
  Smartphone,
  Layers,
  HeartPulse,
} from "lucide-react";

/**
 * Interactive 3D Multi-Device Architecture Stage
 *
 * True CSS 3D modeled MacBook Pro 16" and iPhone 16 Pro.
 * Features:
 * - Real angled unibody aluminum keyboard deck with recessed keycaps & Force Touch trackpad
 * - Tilted Liquid Retina XDR display lid with genuine camera notch & live telemetry dashboard
 * - iPhone 16 Pro with Grade 5 Titanium chassis, Action Button, Dynamic Island & React Native UI
 * - Smooth physics-driven 3D mouse parallax tracking
 * - ZERO <canvas> elements and ZERO container card bounding boxes
 */
export function InteractiveCanvas3D() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 85, damping: 20, mass: 0.9 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms for the master stage
  const stageRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const stageRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);

  // Phone counter-depth parallax
  const phoneX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const phoneY = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);

  // Floating chips parallax
  const chip1X = useTransform(smoothMouseX, [-0.5, 0.5], [-28, 28]);
  const chip1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-18, 18]);
  const chip2X = useTransform(smoothMouseX, [-0.5, 0.5], [26, -26]);
  const chip2Y = useTransform(smoothMouseY, [-0.5, 0.5], [22, -22]);

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
      className="relative w-full max-w-[620px] h-[520px] sm:h-[560px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: 1400 }}
    >
      {/* Ambient Depth Glow */}
      <div className="absolute inset-0 bg-accent/5 dark:bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 3D Master Scene Stage */}
      <motion.div
        style={{
          rotateX: stageRotateX,
          rotateY: stageRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
      >
        {/* ========================================================= */}
        {/* 1. 3D MACBOOK PRO (Full-Stack Next.js & Clinical Systems) */}
        {/* ========================================================= */}
        <div
          className="absolute left-0 sm:left-2 top-6 sm:top-4 w-[340px] sm:w-[410px] md:w-[440px]"
          style={{
            transform: "translateZ(0px) rotateY(4deg) rotateX(2deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* DISPLAY LID (Angled Upright Screen) */}
          <div
            className="relative rounded-t-2xl rounded-b-sm bg-neutral-900 border-[3px] border-neutral-700/80 p-2 sm:p-2.5 shadow-2xl transition-all"
            style={{
              transform: "rotateX(-14deg)",
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Top Display Bezel with Centered Camera Notch */}
            <div className="relative w-full h-3.5 bg-black rounded-t-xl flex items-center justify-center">
              {/* MacBook Pro Notch */}
              <div className="absolute top-0 w-24 h-3.5 bg-black rounded-b-md flex items-center justify-center gap-1.5 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-700" />
                <span className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>
            </div>

            {/* Liquid Retina XDR Screen Glass */}
            <div className="relative rounded-lg bg-card text-card-foreground border border-border/80 overflow-hidden shadow-inner font-sans text-left">
              {/* Glass Glare Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />

              {/* macOS Window Header */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-muted/80 border-b border-border text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 hover:opacity-80 transition-opacity" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 hover:opacity-80 transition-opacity" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 hover:opacity-80 transition-opacity" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-card border border-border/80 text-muted-foreground font-mono text-[9px] tracking-tight flex items-center gap-1.5">
                  <Terminal className="w-2.5 h-2.5 text-accent" />
                  <span>psasare.dev/clinical-systems</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-mono font-bold">
                  <Wifi className="w-2.5 h-2.5" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Screen Body Content */}
              <div className="p-3 sm:p-3.5 space-y-2.5">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-montserrat font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                      Clinical Systems & Architecture
                    </h4>
                    <p className="font-sans text-[10px] text-muted-foreground">
                      Next.js 16 &bull; TypeScript &bull; Hospital Telemetry
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
                      LAN UPTIME
                    </span>
                    <span className="font-montserrat font-bold text-[11px] text-foreground flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" /> 100%
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 border border-border/60">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground block">
                      DATA THROUGHPUT
                    </span>
                    <span className="font-montserrat font-bold text-[11px] text-accent flex items-center gap-1">
                      <Cpu className="w-2.5 h-2.5" /> 4.2k req/s
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 border border-border/60">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground block">
                      WORKSTATIONS
                    </span>
                    <span className="font-montserrat font-bold text-[11px] text-foreground flex items-center gap-1">
                      <HardDrive className="w-2.5 h-2.5 text-blue-500" /> SYNCED
                    </span>
                  </div>
                </div>

                {/* Telemetry Waveform Graph */}
                <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 space-y-1">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-muted-foreground font-semibold flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5 text-accent" /> Hospital Network Latency
                    </span>
                    <span className="font-mono text-foreground font-bold">12ms nominal</span>
                  </div>
                  <svg className="w-full h-7 overflow-visible" viewBox="0 0 320 35">
                    <defs>
                      <linearGradient id="macCurveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,28 Q35,8 70,20 T140,6 T210,22 T280,10 T320,15 L320,35 L0,35 Z"
                      fill="url(#macCurveGrad)"
                    />
                    <path
                      d="M0,28 Q35,8 70,20 T140,6 T210,22 T280,10 T320,15"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Active Hospital Status Strip */}
                <div className="flex items-center justify-between pt-1 font-mono text-[9px] text-muted-foreground border-t border-border/60">
                  <span className="flex items-center gap-1 text-[9px]">
                    <Layers className="w-2.5 h-2.5 text-accent" /> Volta Regional & Ho Teaching
                  </span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HINGE CYLINDER */}
          <div className="relative -mt-0.5 mx-auto w-40 sm:w-48 h-1.5 bg-neutral-950 rounded-full border-t border-neutral-700/60 z-10" />

          {/* KEYBOARD DECK (Realistic Forward-Tilted 3D Aluminum Chassis) */}
          <div
            className="relative -mt-1 mx-auto w-[355px] sm:w-[430px] md:w-[460px] h-[135px] sm:h-[155px] rounded-b-2xl bg-gradient-to-b from-neutral-800 via-neutral-850 to-neutral-900 border-x-2 border-b-2 border-neutral-700/80 shadow-2xl p-2.5 sm:p-3"
            style={{
              transform: "rotateX(62deg)",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Aluminum Edge Highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-500/40 to-transparent" />

            {/* Recessed Keyboard Well with Speaker Grilles */}
            <div className="flex items-center justify-between gap-1.5 sm:gap-2">
              {/* Left Speaker Grille */}
              <div className="w-3 sm:w-4 h-16 sm:h-20 bg-neutral-900/90 rounded-sm flex flex-col justify-between py-1 px-0.5 opacity-60">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="block w-full h-[1px] bg-neutral-700/50" />
                ))}
              </div>

              {/* Main Keyboard Grid */}
              <div className="flex-1 bg-neutral-950/95 rounded-lg p-1.5 border border-neutral-800/80 shadow-inner flex flex-col gap-1">
                {/* Function Row */}
                <div className="flex justify-between gap-0.5">
                  <span className="flex-1 h-2 bg-neutral-850 rounded-[2px] border border-neutral-700/40" />
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="w-4 h-2 bg-neutral-850 rounded-[2px] border border-neutral-700/40" />
                  ))}
                  <span className="w-5 h-2 bg-neutral-800 rounded-[2px] border border-accent/40" />
                </div>
                {/* Number Row */}
                <div className="flex justify-between gap-0.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="flex-1 h-2.5 bg-neutral-850 rounded-[2px] border border-neutral-700/40" />
                  ))}
                  <span className="w-6 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                </div>
                {/* QWERTY Row */}
                <div className="flex justify-between gap-0.5">
                  <span className="w-5 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                  {Array.from({ length: 11 }).map((_, i) => (
                    <span key={i} className="flex-1 h-2.5 bg-neutral-850 rounded-[2px] border border-neutral-700/40" />
                  ))}
                  <span className="w-5 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                </div>
                {/* Spacebar Row */}
                <div className="flex items-center justify-between gap-0.5">
                  <span className="w-4 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                  <span className="w-4 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                  <span className="w-5 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                  <span className="flex-1 h-2.5 bg-neutral-850 rounded-[2px] border border-neutral-700/40 shadow-xs" />
                  <span className="w-5 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                  <span className="w-4 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                  <span className="w-5 h-2.5 bg-neutral-800 rounded-[2px] border border-neutral-700/40" />
                </div>
              </div>

              {/* Right Speaker Grille */}
              <div className="w-3 sm:w-4 h-16 sm:h-20 bg-neutral-900/90 rounded-sm flex flex-col justify-between py-1 px-0.5 opacity-60">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="block w-full h-[1px] bg-neutral-700/50" />
                ))}
              </div>
            </div>

            {/* Glass Force Touch Trackpad */}
            <div className="mx-auto mt-2 w-28 sm:w-36 h-9 sm:h-11 rounded-lg bg-neutral-850/90 border border-neutral-700/60 shadow-inner flex items-center justify-center">
              <span className="w-6 h-[1px] bg-neutral-700/40 rounded-full" />
            </div>

            {/* Front Lip with Display Opening Groove */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 flex justify-center">
              <div className="w-12 h-1 bg-neutral-950 rounded-t-sm border-t border-neutral-600/50" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. 3D SMARTPHONE (iPhone 16 Pro React Native App)          */}
        {/* ========================================================= */}
        <motion.div
          style={{
            x: phoneX,
            y: phoneY,
            transform: "translateZ(90px) rotateY(-16deg) rotateX(4deg)",
            transformStyle: "preserve-3d",
          }}
          className="absolute right-0 sm:right-4 bottom-2 sm:bottom-4 w-[180px] sm:w-[210px]"
        >
          {/* Phone Titanium Outer Chassis */}
          <div
            className="relative rounded-[36px] bg-gradient-to-b from-neutral-800 via-neutral-900 to-black p-2 sm:p-2.5 border-[3px] border-neutral-600/80 shadow-2xl"
            style={{
              boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Left Side Action Button & Volume Rockers */}
            <div className="absolute -left-1.5 top-14 w-1 h-3.5 bg-neutral-600 rounded-l-sm" />
            <div className="absolute -left-1.5 top-20 w-1 h-6 bg-neutral-600 rounded-l-sm" />
            <div className="absolute -left-1.5 top-28 w-1 h-6 bg-neutral-600 rounded-l-sm" />

            {/* Right Side Power Button */}
            <div className="absolute -right-1.5 top-20 w-1 h-8 bg-neutral-600 rounded-r-sm" />

            {/* Dynamic Island Pill with Dual Sensors */}
            <div className="relative w-full flex justify-center mb-1 z-20">
              <div className="w-14 sm:w-16 h-4 bg-black rounded-full flex items-center justify-between px-2 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-700" />
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-accent" />
                </div>
              </div>
            </div>

            {/* Phone Screen Display */}
            <div className="rounded-[28px] bg-card text-card-foreground border border-border/80 overflow-hidden shadow-inner p-2.5 sm:p-3 space-y-2 text-left">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between text-[9px] text-muted-foreground font-semibold px-1">
                <span className="font-mono">09:41</span>
                <span className="flex items-center gap-1 font-mono">
                  <span>5G</span>
                  <span className="w-3.5 h-2 rounded-[2px] border border-muted-foreground/80 p-[1px] flex items-center">
                    <span className="w-full h-full bg-emerald-500 rounded-[1px]" />
                  </span>
                </span>
              </div>

              {/* App Identity Banner */}
              <div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-accent font-bold flex items-center gap-1">
                  <Smartphone className="w-2.5 h-2.5" /> REACT NATIVE MOBILE
                </span>
                <h5 className="font-montserrat font-bold text-xs sm:text-sm text-foreground leading-tight">
                  MindBridge Health
                </h5>
              </div>

              {/* Clinical Sync Widget */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-muted/60 border border-border/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-[10px] text-foreground flex items-center gap-1">
                    <HeartPulse className="w-3 h-3 text-red-500" /> Clinical Vitals
                  </span>
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                </div>
                <p className="font-sans text-[8px] text-muted-foreground">
                  Offline-first hospital data sync active
                </p>
                {/* Progress bar */}
                <div className="w-full bg-border/80 h-1 rounded-full overflow-hidden mt-1">
                  <div className="w-4/5 h-full bg-accent rounded-full animate-pulse" />
                </div>
              </div>

              {/* Action Rows */}
              <div className="space-y-1 pt-0.5">
                <div className="p-1.5 rounded-lg bg-card border border-border/60 flex items-center justify-between text-[9px]">
                  <span className="font-medium text-foreground">Wards Connected</span>
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
            transform: "translateZ(120px)",
          }}
          className="absolute -top-4 -left-2 sm:left-0 z-30"
        >
          <div className="px-3 py-1.5 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-xl flex items-center gap-2">
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
            transform: "translateZ(135px)",
          }}
          className="absolute -bottom-4 right-0 sm:right-4 z-30"
        >
          <div className="px-3 py-1.5 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-xl flex items-center gap-2">
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
