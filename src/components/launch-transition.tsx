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

  const manifestos = [
    {
      category: "DISCIPLINE 01",
      title: "Full-Stack Software Engineering",
      subtitle: "Architecting resilient, type-safe web systems and scalable backend infrastructure.",
      detail: "Next.js 16 • TypeScript • RESTful APIs • Relational Schemas",
    },
    {
      category: "DISCIPLINE 02",
      title: "Modern Web Design & Architecture",
      subtitle: "Crafting editorial, accessible digital experiences with strict aesthetic standards.",
      detail: "Tailwind CSS v4 • Editorial Systems • Responsive Web Standards",
    },
    {
      category: "DISCIPLINE 03",
      title: "Cross-Platform Mobile Development",
      subtitle: "Engineering intuitive touch applications designed for real-world reliability.",
      detail: "React Native • Offline-First Caching • Fluid Micro-Interactions",
    },
    {
      category: "ENTERPRISE",
      title: "Administrative & Clinical Computing",
      subtitle: "Enterprise systems administration at UHAS and hospital network infrastructure.",
      detail: "UHAS ICT Directorate • Ho Teaching Hospital • Volta Regional Hospital",
    },
    {
      category: "SCHOLARSHIP",
      title: "University of Ghana IT Graduate",
      subtitle: "Grounded in analytical problem-solving and rigorous computer science foundations.",
      detail: "BSc. Information Technology '26 • Analytical Science (Kpando SHS)",
    },
  ];

  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 10-second choreographed executive launch sequence
    // 9400ms progression + 600ms hold + 900ms curtain unmask = ~10.9s total
    const totalDuration = 9400;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      setProgress(pct);

      if (pct < 22) {
        setPhaseIndex(0);
      } else if (pct < 44) {
        setPhaseIndex(1);
      } else if (pct < 66) {
        setPhaseIndex(2);
      } else if (pct < 88) {
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

  const activeManifesto = manifestos[phaseIndex];

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
                duration: 0.95,
                ease: [0.76, 0, 0.24, 1], // Signature luxury architectural wipe
              },
            }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0a0b0e] text-[#f8fafc] select-none overflow-hidden p-6 sm:p-10 md:p-14 lg:p-16"
            aria-label="Loading portfolio. Press Escape or click enter to proceed immediately."
          >
            {/* Subtle luxury ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/8 rounded-full blur-[160px] pointer-events-none" />

            {/* Hairline geometric border framing */}
            <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/[0.07] pointer-events-none" />

            {/* TOP HEADER: High-End Editorial Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="font-montserrat font-black text-sm tracking-[0.25em] text-[#f8fafc] uppercase">
                  Prosper Shaibu Asare
                </span>
                <span className="hidden sm:inline text-white/30">&bull;</span>
                <span className="font-sans text-xs text-[#cbd5e1]/70 font-medium tracking-wide">
                  Software Engineer & Architect
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#cbd5e1]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>Folio Archive 2026</span>
                </div>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="group flex items-center gap-2.5 font-montserrat text-xs font-bold uppercase tracking-widest text-[#f8fafc] hover:text-accent transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">Enter Folio</span>
                  <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-xs text-white group-hover:border-accent group-hover:text-accent group-hover:translate-x-0.5 transition-all">
                    ➔
                  </div>
                </button>
              </div>
            </div>

            {/* CENTER STAGE: Refined Emblem & Cinematic Typographic Motion */}
            <div className="relative z-10 my-auto py-8 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
              {/* Luxury Geometric Monogram Crest */}
              <div className="relative mb-10 flex items-center justify-center">
                {/* Slow Rotating Hairline Diamond Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-white/[0.12] rotate-45"
                />
                {/* Inner Counter-Rotating Hexagon */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                  className="absolute w-18 h-18 sm:w-20 sm:h-20 rounded-xl border border-accent/40"
                />
                {/* Central Emblem Monogram */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-montserrat font-black text-xl sm:text-2xl tracking-[0.2em] text-[#f8fafc]">
                    PSA
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-0.5" />
                </div>
              </div>

              {/* Master Statement Manifesto with Mask Reveal */}
              <div className="min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phaseIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent font-semibold block">
                      [ {activeManifesto.category} ]
                    </span>
                    <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#f8fafc] tracking-tight leading-tight uppercase">
                      {activeManifesto.title}
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed font-normal">
                      {activeManifesto.subtitle}
                    </p>
                    <p className="font-mono text-xs text-white/50 tracking-wider pt-1">
                      {activeManifesto.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* BOTTOM POWER PANEL: Monolithic Luxury Counter & Geocoordinates */}
            <div className="relative z-10 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-end justify-between gap-6">
              {/* Location & Alma Mater */}
              <div className="text-left space-y-1">
                <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-[#f8fafc] block">
                  Ho, Ghana &bull; 06° 36&apos; N, 00° 28&apos; E
                </span>
                <span className="font-sans text-xs text-[#cbd5e1]/60 font-medium block">
                  University of Ghana &bull; BSc. Information Technology
                </span>
              </div>

              {/* Monolithic Luxury Percentage Counter */}
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold mr-2 hidden sm:inline">
                  INITIALIZING
                </span>
                <span className="font-montserrat font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter text-[#f8fafc] tabular-nums leading-none">
                  {String(progress).padStart(2, "0")}
                </span>
                <span className="font-serif italic text-2xl sm:text-3xl text-accent font-normal leading-none">
                  %
                </span>
              </div>
            </div>

            {/* Hairline Edge Progress Line across the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05]">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page: Rendered with pristine 100% clarity and zero blur */}
      <motion.div
        initial={{ opacity: 0.96 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
