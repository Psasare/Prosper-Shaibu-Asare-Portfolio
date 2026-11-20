"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, Terminal } from "lucide-react";
import { LaunchKineticCore } from "./launch-kinetic-core";

interface LaunchTransitionProps {
  children: React.ReactNode;
}

export function LaunchTransition({ children }: LaunchTransitionProps) {
  const [isDone, setIsDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [phaseIndex, setPhaseIndex] = React.useState(0);
  const [clockTime, setClockTime] = React.useState("");
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const manifestos = [
    {
      code: "01",
      category: "DISCIPLINE 01 // SYSTEMS",
      title: "Full-Stack Software Engineering",
      subtitle: "Architecting resilient, type-safe web systems and high-throughput backend infrastructure.",
      detail: "Next.js 16 • TypeScript • RESTful APIs • Relational Schemas",
      sector: "FULL-STACK ARCHITECTURE",
    },
    {
      code: "02",
      category: "DISCIPLINE 02 // INTERFACE",
      title: "Modern Web Design & Architecture",
      subtitle: "Crafting editorial, accessible digital experiences with uncompromising aesthetic discipline.",
      detail: "Tailwind CSS v4 • Editorial Systems • Responsive Web Standards",
      sector: "MODERN WEB CRAFT",
    },
    {
      code: "03",
      category: "DISCIPLINE 03 // MOBILE",
      title: "Cross-Platform Mobile Development",
      subtitle: "Engineering intuitive touch applications designed for real-world reliability and offline performance.",
      detail: "React Native • Offline-First Caching • Fluid Micro-Interactions",
      sector: "CROSS-PLATFORM MOBILE",
    },
    {
      code: "04",
      category: "ENTERPRISE // INFRASTRUCTURE",
      title: "Administrative & Clinical Computing",
      subtitle: "Enterprise systems administration at UHAS and hospital clinical network infrastructure.",
      detail: "UHAS ICT Directorate • Ho Teaching Hospital • Volta Regional Hospital",
      sector: "ENTERPRISE SYSTEMS",
    },
    {
      code: "05",
      category: "SCHOLARSHIP // FOUNDATION",
      title: "University of Ghana IT Scholar",
      subtitle: "Grounded in analytical problem-solving and rigorous computer science foundations.",
      detail: "BSc. Information Technology '26 • Analytical Science (Kpando SHS)",
      sector: "UNIVERSITY OF GHANA",
    },
  ];

  // Live Accra / GMT Time Clock
  React.useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-GB", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setClockTime(`${timeStr} GMT`);
      } catch {
        setClockTime("16:20:00 GMT");
      }
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Mouse spotlight coordinates
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // 10-second minimum choreographed executive launch sequence
  // 9500ms progression + 600ms hold + 950ms curtain unmask = ~11.0s total
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const totalDuration = 9500;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      setProgress(pct);

      if (pct < 20) {
        setPhaseIndex(0);
      } else if (pct < 40) {
        setPhaseIndex(1);
      } else if (pct < 60) {
        setPhaseIndex(2);
      } else if (pct < 80) {
        setPhaseIndex(3);
      } else {
        setPhaseIndex(4);
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
    }, 15000);

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

  const activeManifesto = manifestos[phaseIndex];

  return (
    <>
      <AnimatePresence mode="wait">
        {!isDone && (
          <motion.div
            key="launch-curtain"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(16px)",
              transition: {
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1], // Signature luxury architectural zoom-through
              },
            }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-background text-foreground select-none overflow-hidden p-4 sm:p-8 md:p-10 lg:p-12 transition-colors duration-300"
            aria-label="Loading portfolio. Press Escape or click enter to proceed immediately."
          >
            {/* Subtle Interactive Cursor Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-70"
              style={{
                background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(142, 95, 46, 0.08), transparent 80%)`,
              }}
            />

            {/* Architectural Grid Matrix Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Hairline Precision Frame with Corner Crosshairs */}
            <div className="absolute inset-3 sm:inset-5 md:inset-6 border border-border/80 pointer-events-none">
              {/* Corner crosshairs */}
              <span className="absolute -top-2.5 -left-2.5 font-mono text-xs text-foreground/40 font-bold select-none">+</span>
              <span className="absolute -top-2.5 -right-2.5 font-mono text-xs text-foreground/40 font-bold select-none">+</span>
              <span className="absolute -bottom-2.5 -left-2.5 font-mono text-xs text-foreground/40 font-bold select-none">+</span>
              <span className="absolute -bottom-2.5 -right-2.5 font-mono text-xs text-foreground/40 font-bold select-none">+</span>

              {/* Edge Coordinates */}
              <div className="absolute top-2 left-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 hidden sm:block">
                SYS_INIT // LAT: 05° 38&apos; N
              </div>
              <div className="absolute top-2 right-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 hidden sm:block">
                LON: 00° 11&apos; W // ELEV: 98M
              </div>
              <div className="absolute bottom-2 left-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 hidden sm:block">
                RUNTIME // REACT 19 + NEXT 16
              </div>
              <div className="absolute bottom-2 right-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 hidden sm:block">
                SPATIAL ENGINE // THREE.JS WEBGL
              </div>
            </div>

            {/* TOP HEADER: High-End Editorial Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-border/80 pb-4 pt-1 sm:pt-0">
              {/* Left Identity & Live Beacon */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative flex items-center justify-center w-2.5 h-2.5">
                  <span className="absolute w-full h-full rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat font-black text-xs sm:text-sm tracking-[0.2em] text-foreground uppercase">
                      Prosper Shaibu Asare
                    </span>
                    <span className="hidden md:inline font-mono text-[10px] text-muted-foreground">
                      /
                    </span>
                    <span className="hidden md:inline font-mono text-[11px] text-muted-foreground tracking-wider uppercase">
                      Ho & Accra, Ghana
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/80 tracking-widest flex items-center gap-2">
                    <span>LIVE: {clockTime || "16:20:00 GMT"}</span>
                    <span className="hidden sm:inline">&bull;</span>
                    <span className="hidden sm:inline">BSC. IT &bull; UG LEBON</span>
                  </span>
                </div>
              </div>

              {/* Center Status Pill (Desktop only) */}
              <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-border text-[11px] font-mono tracking-widest text-muted-foreground shadow-xs">
                <Terminal className="w-3 h-3 text-foreground" />
                <span className="text-foreground font-semibold">FOLIO ARCHIVE</span>
                <span>• v2026.4 PRODUCTION</span>
              </div>

              {/* Right: THEMED CONSISTENT BUTTON (Exact match to portfolio primary button style) */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <span>Enter Folio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* CENTER STAGE: Executive Holographic Architecture + Typographic Mastery */}
            <div className="relative z-10 my-auto py-2 sm:py-4 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* LEFT FLANK: System Modules Diagnostics HUD (Desktop only) */}
              <div className="hidden lg:flex col-span-3 flex-col gap-3 text-left">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground font-bold pb-1 border-b border-border/80">
                  <Activity className="w-3.5 h-3.5 text-foreground" />
                  <span>Architecture Modules</span>
                </div>
                <div className="space-y-2 pt-1 font-mono text-xs">
                  {manifestos.map((m, idx) => {
                    const isActive = phaseIndex === idx;
                    const isPassed = phaseIndex > idx;
                    return (
                      <div
                        key={m.code}
                        className={`p-2.5 rounded-lg border transition-all ${
                          isActive
                            ? "bg-card border-foreground/30 shadow-xs"
                            : isPassed
                            ? "border-border/50 opacity-60"
                            : "border-transparent opacity-35"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className={`font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                            [{m.code}] {m.sector}
                          </span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive
                                ? "bg-emerald-500 animate-pulse"
                                : isPassed
                                ? "bg-muted-foreground"
                                : "bg-border"
                            }`}
                          />
                        </div>
                        {isActive && (
                          <div className="w-full bg-border h-1 rounded-full mt-2 overflow-hidden">
                            <motion.div
                              className="h-full bg-foreground"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.8, ease: "linear" }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CENTER COLUMN: Interactive 3D Kinetic Core + Monolithic Typography */}
              <div className="col-span-1 lg:col-span-6 flex flex-col items-center text-center">
                {/* Outstanding Element: Interactive 3D Kinetic Gyroscopic Core */}
                <div className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto flex items-center justify-center -my-2 sm:-my-4">
                  <LaunchKineticCore />

                  {/* Central Monogram Glass Plaque */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="px-3.5 py-1.5 rounded-xl bg-card/85 backdrop-blur-md border border-border shadow-md flex items-center gap-1.5">
                      <span className="font-montserrat font-black text-sm tracking-[0.25em] text-foreground">
                        PSA
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    </div>
                  </div>
                </div>

                {/* Master Monolithic Display Name */}
                <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-[0.16em] uppercase text-foreground leading-tight drop-shadow-xs">
                  Prosper Shaibu Asare
                </h1>

                {/* Dynamic Executive Manifesto with High-Contrast Typography */}
                <div className="min-h-[140px] sm:min-h-[150px] flex flex-col items-center justify-center w-full mt-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={phaseIndex}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-2.5 max-w-xl mx-auto px-2"
                    >
                      {/* High-Contrast Category Capsule */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-[11px] font-mono uppercase tracking-[0.2em] text-foreground font-bold shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{activeManifesto.category}</span>
                      </div>

                      {/* Main Title: Bold, Crisp, High Contrast */}
                      <h2 className="font-montserrat text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-snug uppercase">
                        {activeManifesto.title}
                      </h2>

                      {/* Subtitle: High-Contrast Slate text (NOT washed-out faint brown!) */}
                      <p className="font-sans text-xs sm:text-sm text-foreground/85 leading-relaxed font-medium">
                        {activeManifesto.subtitle}
                      </p>

                      {/* Detail Pill */}
                      <div className="pt-1">
                        <span className="inline-block font-mono text-[11px] text-foreground/75 tracking-wider bg-card/70 border border-border/80 px-3 py-1 rounded-md">
                          {activeManifesto.detail}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* RIGHT FLANK: Live Telemetry & Frequency Spectrum (Desktop only) */}
              <div className="hidden lg:flex col-span-3 flex-col gap-3 text-right">
                <div className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground font-bold pb-1 border-b border-border/80">
                  <span>System Telemetry</span>
                  <Activity className="w-3.5 h-3.5 text-foreground" />
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-card/60 border border-border/80 text-left space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>LATENCY</span>
                      <span className="text-emerald-500 font-bold">12ms • NOMINAL</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>CORE ENGINE</span>
                      <span className="text-foreground font-semibold">NEXT 16 + REACT 19</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>STYLING</span>
                      <span className="text-foreground font-semibold">TAILWIND CSS v4</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>GRAPHICS</span>
                      <span className="text-foreground font-semibold">THREE.JS HARDWARE</span>
                    </div>
                  </div>

                  {/* Equalizer Frequency Bars */}
                  <div className="p-3 rounded-lg bg-card/60 border border-border/80 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      <span>Telemetry Waveform</span>
                      <span>60 FPS</span>
                    </div>
                    <div className="h-9 flex items-end justify-between gap-1 pt-1">
                      {[40, 75, 55, 95, 65, 85, 45, 90, 60, 80, 50, 70].map((height, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-foreground/80 rounded-t-xs"
                          animate={{
                            height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`],
                          }}
                          transition={{
                            duration: 0.8 + (i % 4) * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="font-mono text-[10px] text-muted-foreground/80 tracking-wider">
                    STATUS: ALL SUBSYSTEMS NOMINAL
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM POWER PANEL: Monolithic Counter & Precision Rail */}
            <div className="relative z-10 border-t border-border/80 pt-4 flex flex-col sm:flex-row items-end justify-between gap-4">
              {/* Location & Academic Pedigree */}
              <div className="text-left space-y-1">
                <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-foreground block">
                  Ho & Accra, Ghana &bull; 05° 38&apos; N, 00° 11&apos; W
                </span>
                <span className="font-sans text-xs text-foreground/80 font-medium block">
                  University of Ghana &bull; BSc. Information Technology &bull; Kpando SHS
                </span>
              </div>

              {/* 5-Stage Precision Indicator Bar */}
              <div className="w-full sm:w-64 flex flex-col gap-1.5 order-last sm:order-none">
                <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  <span>DEPLOYMENT STAGE</span>
                  <span className="text-foreground font-bold">{phaseIndex + 1} / 5</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {manifestos.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i <= phaseIndex ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Monolithic Luxury Percentage Counter */}
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold mr-2 hidden sm:inline">
                  INITIALIZING
                </span>
                <span className="font-montserrat font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter text-foreground tabular-nums leading-none">
                  {String(progress).padStart(2, "0")}
                </span>
                <span className="font-serif italic text-2xl sm:text-3xl text-foreground/60 font-normal leading-none">
                  %
                </span>
              </div>
            </div>

            {/* Continuous Hairline Progress Edge Line across the very bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border">
              <motion.div
                className="h-full bg-foreground"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page: Morphing from spatial depth into crisp focus */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
        animate={
          isDone
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.94, filter: "blur(10px)" }
        }
        transition={{
          duration: 1.05,
          ease: [0.16, 1, 0.3, 1], // Signature fluid cinematic glide
        }}
        className="w-full min-h-screen origin-center"
      >
        {children}
      </motion.div>
    </>
  );
}
