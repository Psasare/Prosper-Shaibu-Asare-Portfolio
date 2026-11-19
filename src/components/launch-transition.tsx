"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Smartphone,
  Server,
  GraduationCap,
  CheckCircle2,
  Terminal as TerminalIcon,
  Activity,
  Cpu,
} from "lucide-react";

interface LaunchTransitionProps {
  children: React.ReactNode;
}

export function LaunchTransition({ children }: LaunchTransitionProps) {
  const [isDone, setIsDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [phaseIndex, setPhaseIndex] = React.useState(0);

  const phases = [
    {
      step: "01",
      badge: "CORE ARCHITECTURE",
      title: "FULL-STACK SOFTWARE ENGINEERING",
      subtitle: "High-Throughput APIs • Relational Database Schemas • Resilient Architecture",
      telemetry: "COMPILING RUNTIME ENVIRONMENT & SERVICES",
      icon: Code2,
    },
    {
      step: "02",
      badge: "USER EXPERIENCE",
      title: "MODERN WEB DESIGN & ARCHITECTURE",
      subtitle: "Next.js 16 • Tailwind CSS v4 • Editorial Design Systems • Responsive A11y",
      telemetry: "INITIALIZING THREE.JS 3D VIEWPORT & METALLIC SHADERS",
      icon: Globe,
    },
    {
      step: "03",
      badge: "MOBILE SYSTEMS",
      title: "CROSS-PLATFORM MOBILE APPLICATION DEVELOPMENT",
      subtitle: "React Native • Native Touch Gestures • Offline-First State Caching",
      telemetry: "CONNECTING GITHUB REPOSITORIES: MINDBRIDGE & BLOOM HEALTH",
      icon: Smartphone,
    },
    {
      step: "04",
      badge: "ENTERPRISE COMPUTING",
      title: "HEALTHCARE & ADMINISTRATIVE COMPUTING",
      subtitle: "UHAS Administrative Computing • Volta Regional & Ho Teaching Hospitals",
      telemetry: "VALIDATING CLINICAL WORKSTATIONS & ERP DATABASE PROTOCOLS",
      icon: Server,
    },
    {
      step: "05",
      badge: "ACADEMIC FOUNDATION",
      title: "UNIVERSITY OF GHANA & SCIENTIFIC RIGOR",
      subtitle: "BSc. Information Technology Graduate '26 • Analytical Problem-Solving",
      telemetry: "CALIBRATING PRODUCTION CONTRAST & EDITORIAL TYPOGRAPHY",
      icon: GraduationCap,
    },
    {
      step: "06",
      badge: "SYSTEM READY",
      title: "ENGINEERING PORTFOLIO READY",
      subtitle: "Welcome to the Production Software Works of Prosper Shaibu Asare",
      telemetry: "ALL ARCHITECTURES VERIFIED (100%) • UNMASKING INTERFACE",
      icon: CheckCircle2,
    },
  ];

  const terminalLogs = [
    "[BOOT:0.0s] Kernel initialization started",
    "[CORE:1.5s] Full-Stack TypeScript architecture loaded",
    "[3D:3.2s] Three.js WebGL2 hardware acceleration verified",
    "[REPOS:5.0s] MindBridge & Bloom Maternal Health synced",
    "[ERP:6.8s] UHAS ICT Directorate & hospital networks linked",
    "[ACADEMIC:8.4s] University of Ghana BSc. IT verified",
    "[READY:9.6s] Production portfolio unmasking sequence ready",
  ];

  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 10-second minimum choreographed launch experience
    // 9600ms counter duration + 600ms completion hold + 900ms curtain wipe = ~11.1 seconds total
    const totalDuration = 9600;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      setProgress(pct);

      if (pct < 18) {
        setPhaseIndex(0);
      } else if (pct < 38) {
        setPhaseIndex(1);
      } else if (pct < 58) {
        setPhaseIndex(2);
      } else if (pct < 76) {
        setPhaseIndex(3);
      } else if (pct < 94) {
        setPhaseIndex(4);
      } else {
        setPhaseIndex(5);
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = originalOverflow;
        }, 600);
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        setIsDone(true);
        document.body.style.overflow = originalOverflow;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const safetyTimeout = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = originalOverflow;
    }, 14000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDone(true);
    document.body.style.overflow = "";
  };

  const activePhase = phases[phaseIndex];
  const ActiveIcon = activePhase.icon;

  return (
    <>
      <AnimatePresence mode="wait">
        {!isDone && (
          <motion.div
            key="launch-curtain"
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1], // Luxury architectural curtain wipe
              },
            }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#08090d] text-[#f8fafc] select-none overflow-hidden p-4 sm:p-8 lg:p-12"
            aria-label="Loading portfolio. Click skip button to proceed immediately."
          >
            {/* Cinematic Background: Precise Technical Blueprint Grid & Ambient Nebula */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Corner Architectural Reticles */}
            <div className="absolute top-4 left-4 text-xs font-mono text-[#cbd5e1]/40 pointer-events-none">
              ┌ [06°36&apos;N / 00°28&apos;E]
            </div>
            <div className="absolute top-4 right-4 text-xs font-mono text-[#cbd5e1]/40 pointer-events-none">
              [GHANA / SYS.ONLINE] ┐
            </div>
            <div className="absolute bottom-4 left-4 text-xs font-mono text-[#cbd5e1]/40 pointer-events-none">
              └ [ACCRA • HO • HOHOE]
            </div>
            <div className="absolute bottom-4 right-4 text-xs font-mono text-[#cbd5e1]/40 pointer-events-none">
              [2026 PRODUCTION RUNTIME] ┘
            </div>

            {/* Ambient Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent rounded-full blur-[140px] pointer-events-none opacity-70" />

            {/* TOP HEADER: High-Contrast Technical Navigation Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs font-montserrat tracking-widest uppercase font-semibold border-b border-[#202533] pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
                <span className="text-[#f8fafc] font-black text-xs sm:text-sm tracking-widest">
                  PROSPER SHAIBU ASARE
                </span>
                <span className="hidden sm:inline text-[#cbd5e1]/50 font-normal">/</span>
                <span className="hidden sm:inline text-[#cbd5e1] font-semibold">
                  HO, GHANA
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-md bg-[#11141c] border border-[#202533] text-[11px] font-mono text-[#cbd5e1]">
                  <Activity className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span>CALIBRATING PRODUCTION STACK</span>
                </div>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-4 py-2 rounded-xl bg-[#11141c] border border-accent/40 text-[#f8fafc] hover:bg-accent hover:text-[#090b10] font-montserrat text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                >
                  Skip Intro ➔
                </button>
              </div>
            </div>

            {/* MAIN DASHBOARD STAGE: Three-Column Technical Layout */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto w-full max-w-7xl mx-auto py-4">
              {/* LEFT COLUMN (Desktop): Live Typewriter Diagnostic Log Stream */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-between p-5 rounded-2xl border border-[#202533] bg-[#0d0f15]/80 backdrop-blur-md shadow-lg h-[340px]">
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#202533] text-[11px] font-montserrat font-bold uppercase tracking-wider text-accent">
                    <TerminalIcon className="w-3.5 h-3.5" />
                    <span>System Diagnostic</span>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] text-[#cbd5e1]/80 leading-relaxed">
                    {terminalLogs.slice(0, phaseIndex + 2).map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="truncate"
                      >
                        <span className="text-accent">&gt;</span> {log}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#202533] flex items-center justify-between text-[10px] font-mono text-[#cbd5e1]/60">
                  <span>LOG BUFFER: LIVE</span>
                  <span className="text-accent font-bold">PASS 100%</span>
                </div>
              </div>

              {/* CENTER COLUMN: Master Gyroscopic HUD Emblem, Title & Morphing Cards */}
              <div className="lg:col-span-6 flex flex-col items-center text-center px-2">
                {/* Master High-Tech Gyroscope Emblem */}
                <div className="relative mb-6 flex items-center justify-center">
                  {/* Outer Orbit with Degree Ticks */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-accent/40"
                  />
                  {/* Middle Counter-Rotating Faceted Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="absolute w-22 h-22 sm:w-24 sm:h-24 rounded-2xl border border-[#202533] bg-[#11141c]/80 backdrop-blur-xs shadow-md"
                  />
                  {/* Central Radiant Titanium Core */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-montserrat font-black text-2xl sm:text-3xl tracking-widest text-accent drop-shadow-[0_0_12px_rgba(213,189,175,0.4)]">
                      PSA
                    </span>
                    <span className="text-[9px] font-mono text-[#cbd5e1]/70 tracking-widest uppercase mt-0.5">
                      GH • 2026
                    </span>
                  </div>
                </div>

                {/* Master Heroic Name with Architectural Editorial Typography */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#f8fafc] uppercase tracking-[0.2em] sm:tracking-[0.26em] drop-shadow-md leading-tight"
                >
                  Prosper Shaibu Asare
                </motion.h1>

                {/* Stately Dynamic Showcase Card */}
                <div className="w-full max-w-xl min-h-[110px] mt-4 flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={phaseIndex}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="p-4 sm:p-5 rounded-2xl border border-[#202533] bg-[#11141c]/90 backdrop-blur-md shadow-md w-full"
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center text-accent">
                          <ActiveIcon className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-montserrat text-xs font-black text-accent tracking-widest uppercase">
                          {activePhase.badge} &bull; PHASE {activePhase.step} / 06
                        </span>
                      </div>
                      <div className="font-montserrat font-black text-sm sm:text-base text-[#f8fafc] uppercase tracking-wide mb-1">
                        {activePhase.title}
                      </div>
                      <div className="font-sans text-xs sm:text-sm text-[#cbd5e1] leading-relaxed max-w-lg mx-auto">
                        {activePhase.subtitle}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Grand Numeric Counter & Dual-Track Precision Rail */}
                <div className="w-full max-w-lg mt-6 sm:mt-8">
                  <div className="flex items-end justify-between mb-2 px-1">
                    <div className="text-left">
                      <span className="font-montserrat text-[11px] font-bold text-[#f8fafc] uppercase tracking-widest block">
                        ARCHITECTURE STATUS
                      </span>
                      <span className="font-mono text-[11px] text-[#cbd5e1]/80 uppercase tracking-wider block mt-0.5">
                        {activePhase.telemetry}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono font-black text-3xl sm:text-4xl text-accent tabular-nums">
                        {String(progress).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-sm text-accent/70 font-bold">%</span>
                    </div>
                  </div>

                  {/* Dual-Rail Precision Progress Track */}
                  <div className="w-full h-2.5 bg-[#11141c] rounded-full overflow-hidden border border-[#202533] p-0.5 relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent rounded-full relative"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_12px_#ffffff]" />
                    </motion.div>
                  </div>

                  {/* Precision Tick Scale */}
                  <div className="flex justify-between text-[9px] font-mono text-[#cbd5e1]/40 mt-1 px-0.5">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (Desktop): Live Hardware & Service Credentials */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-between p-5 rounded-2xl border border-[#202533] bg-[#0d0f15]/80 backdrop-blur-md shadow-lg h-[340px]">
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#202533] text-[11px] font-montserrat font-bold uppercase tracking-wider text-accent">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Runtime Credentials</span>
                  </div>

                  <div className="space-y-3 font-montserrat text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#cbd5e1]/50 block">Degree & Alma Mater</span>
                      <span className="font-bold text-[#f8fafc] text-xs block">BSc. IT Graduate &bull; 2026</span>
                      <span className="text-[11px] text-[#cbd5e1] font-medium block">University of Ghana, Legon</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#cbd5e1]/50 block">Enterprise Placement</span>
                      <span className="font-bold text-[#f8fafc] text-xs block">UHAS ICT Directorate</span>
                      <span className="text-[11px] text-[#cbd5e1] font-medium block">Administrative Computing</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#cbd5e1]/50 block">Clinical Infrastructure</span>
                      <span className="font-bold text-[#f8fafc] text-xs block">Ho Teaching & Volta Regional</span>
                      <span className="text-[11px] text-[#cbd5e1] font-medium block">Systems & Network Engineering</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#202533] flex items-center justify-between text-[10px] font-mono text-[#cbd5e1]/60">
                  <span>DISCIPLINES: 3/3</span>
                  <span className="text-accent font-bold">READY</span>
                </div>
              </div>
            </div>

            {/* BOTTOM FOOTER BAR: Audio Waveform Equalizer & Ticker */}
            <div className="relative z-10 flex items-center justify-between text-xs font-montserrat tracking-widest uppercase font-semibold border-t border-[#202533] pt-4">
              <div className="flex items-center gap-4">
                <span className="text-[#cbd5e1] font-bold text-[11px] sm:text-xs">
                  FULL-STACK ENGINEERING &bull; WEB DESIGNING &bull; MOBILE APP DEVELOPMENT
                </span>
              </div>

              {/* High-Tech 16-Bar Audio Equalizer */}
              <div className="flex items-end gap-1 h-5">
                {[0.3, 0.7, 0.5, 0.9, 0.6, 0.8, 1.0, 0.4, 0.85, 0.65, 0.95, 0.45, 0.75, 0.35, 0.9, 0.5].map((val, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: [`${val * 20}px`, `${Math.max(4, (1 - val) * 20)}px`, `${val * 20}px`],
                    }}
                    transition={{
                      duration: 0.7 + (i % 5) * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 bg-accent rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Luminous Bottom Laser Edge for the Grand Wipe Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_20px_var(--color-accent)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Wrapper: Crystal clear rendering (zero blur filter applied) */}
      <motion.div
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
