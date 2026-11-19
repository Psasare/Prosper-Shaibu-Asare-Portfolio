"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LaunchTransitionProps {
  children: React.ReactNode;
}

export function LaunchTransition({ children }: LaunchTransitionProps) {
  const [isDone, setIsDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [phaseIndex, setPhaseIndex] = React.useState(0);

  const phases = [
    {
      title: "FULL-STACK SOFTWARE ENGINEERING",
      subtitle: "High-Throughput APIs • Relational Schemas • Resilient Architecture",
      telemetry: "COMPILING RUNTIME ENVIRONMENT & SERVICES",
    },
    {
      title: "MODERN WEB DESIGN & ARCHITECTURE",
      subtitle: "Next.js 16 • Tailwind CSS • Design Systems • Accessible UX",
      telemetry: "INITIALIZING THREE.JS METALLIC VIEWPORT",
    },
    {
      title: "MOBILE APPLICATION DEVELOPMENT",
      subtitle: "React Native • Cross-Platform Performance • Offline Cache",
      telemetry: "LOADING GITHUB PRODUCTION REPOSITORIES",
    },
    {
      title: "ENGINEERING PORTFOLIO READY",
      subtitle: "Welcome to the Software Works of Prosper Shaibu Asare",
      telemetry: "SYSTEM CALIBRATED • UNMASKING INTERFACE",
    },
  ];

  React.useEffect(() => {
    // Lock body scroll while intro is playing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 5-second choreographed launch experience
    const totalDuration = 4400; // 4.4s for counter/telemetry, then wipe to 5.0s
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      setProgress(pct);

      if (pct < 28) {
        setPhaseIndex(0);
      } else if (pct < 58) {
        setPhaseIndex(1);
      } else if (pct < 88) {
        setPhaseIndex(2);
      } else {
        setPhaseIndex(3);
      }

      if (pct >= 100) {
        clearInterval(interval);
        // Pause at 100% briefly before executing grand curtain wipe
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = originalOverflow;
        }, 350);
      }
    }, 20);

    // Keyboard shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        setIsDone(true);
        document.body.style.overflow = originalOverflow;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Safety timeout: ensure site is never blocked beyond 5.4s
    const safetyTimeout = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = originalOverflow;
    }, 5400);

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
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-background text-foreground select-none overflow-hidden p-6 sm:p-10 md:p-14"
            aria-label="Loading portfolio. Click skip button to proceed immediately."
          >
            {/* Ambient Background Grid & Luminous Radial Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 bg-radial from-accent/15 via-transparent to-transparent pointer-events-none opacity-70" />

            {/* TOP BAR: High-Contrast Technical Corner Marks */}
            <div className="relative z-10 flex items-center justify-between text-xs font-montserrat tracking-widest uppercase font-semibold text-foreground border-b border-border/80 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-foreground font-bold">PROSPER SHAIBU ASARE</span>
                <span className="hidden sm:inline text-muted-foreground font-normal">/</span>
                <span className="hidden sm:inline text-muted-foreground font-medium">HO, GHANA</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:inline text-muted-foreground font-medium">
                  BSC. IT GRADUATE &bull; UG LEGON
                </span>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-3.5 py-1.5 rounded-lg bg-card border border-border text-foreground hover:border-accent hover:text-accent font-montserrat text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                >
                  Skip Intro ➔
                </button>
              </div>
            </div>

            {/* CENTER STAGE: Outstanding Emblem, Typography & Morphing Roles */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4 max-w-4xl mx-auto w-full">
              {/* Grand Concentric Monogram Emblem */}
              <div className="relative mb-8 flex items-center justify-center">
                {/* Outer Rotating Compass Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed border-accent/60"
                />
                {/* Middle Hexagon / Square Geometric Frame */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute w-18 h-18 sm:w-20 sm:h-20 rounded-2xl border border-border bg-card/60 backdrop-blur-xs shadow-xs"
                />
                {/* Core Monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-montserrat font-black text-xl sm:text-2xl tracking-widest text-accent drop-shadow-xs">
                    PSA
                  </span>
                </div>
              </div>

              {/* Master Name with High-Contrast Montserrat Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-montserrat font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-[0.22em] sm:tracking-[0.28em] drop-shadow-sm leading-tight"
              >
                Prosper Shaibu Asare
              </motion.h1>

              {/* Stately Morphing Specialization Block */}
              <div className="min-h-[72px] sm:min-h-[80px] mt-4 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phaseIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-1.5"
                  >
                    <div className="font-montserrat font-extrabold text-sm sm:text-base md:text-lg text-accent uppercase tracking-widest">
                      {activePhase.title}
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-medium text-foreground max-w-xl mx-auto leading-relaxed">
                      {activePhase.subtitle}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Precision Metrics & Dual-Rail Progress Bar */}
              <div className="w-full max-w-lg mt-8 sm:mt-10">
                <div className="flex items-end justify-between mb-2.5">
                  <div className="text-left">
                    <span className="font-montserrat text-[11px] font-bold text-foreground uppercase tracking-widest block">
                      SYSTEM STATUS
                    </span>
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mt-0.5">
                      {activePhase.telemetry}
                    </span>
                  </div>
                  <div className="font-montserrat font-black text-2xl sm:text-3xl text-accent tabular-nums">
                    {progress}%
                  </div>
                </div>

                {/* High-Contrast Dual-Track Progress Rail */}
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden border border-border p-0.5 relative">
                  <motion.div
                    className="h-full bg-accent rounded-full relative"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  >
                    {/* Glowing Leading Head */}
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 rounded-full blur-[2px]" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* BOTTOM BAR: Technical Coordinates & Soundwave Equalizer */}
            <div className="relative z-10 flex items-center justify-between text-xs font-montserrat tracking-widest uppercase font-semibold text-foreground border-t border-border/80 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-medium hidden sm:inline">
                  LAT: 06° 36&apos; N &bull; LON: 00° 28&apos; E
                </span>
                <span className="text-foreground font-bold">
                  PROD VERSION 2026.4
                </span>
              </div>

              {/* Simulated Audio/Telemetry Activity Bars */}
              <div className="flex items-end gap-1 h-4">
                {[0.4, 0.9, 0.6, 1.0, 0.7, 0.5, 0.85, 0.3].map((val, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: [`${val * 16}px`, `${Math.max(4, (1 - val) * 16)}px`, `${val * 16}px`],
                    }}
                    transition={{
                      duration: 0.8 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 bg-accent/70 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Glowing Bottom Accent Laser Lip */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_15px_var(--color-accent)]" />
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
