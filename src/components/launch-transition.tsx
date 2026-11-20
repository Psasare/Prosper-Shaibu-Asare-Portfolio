"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedNameLogo } from "./ui/animated-name-logo";

interface LaunchTransitionProps {
  children: React.ReactNode;
}

/**
 * Apple-Minimalist Launch Screen Transition
 *
 * Designed with pure Apple aesthetic discipline:
 * - Serene, distraction-free typography and breathing whitespace
 * - ZERO sci-fi telemetry, ZERO gridlines, ZERO coordinate headers, ZERO equalizer bars
 * - Pure centered typographic presentation with rotating disciplines
 * - Refined hairline progress indicator (5-second progression)
 * - Seamless luxury curtain dissolve into the portfolio
 */
export function LaunchTransition({ children }: LaunchTransitionProps) {
  const [isDone, setIsDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [phaseIndex, setPhaseIndex] = React.useState(0);

  const disciplines = [
    "Full-Stack Software Engineering",
    "Modern Web Design & Architecture",
    "Mobile Application Development",
    "Enterprise Infrastructure & Systems",
  ];

  // ~5-second smooth progression (Apple calm & deliberate pace)
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const totalDuration = 4800; // ~5 seconds total
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      setProgress(pct);

      if (pct < 28) {
        setPhaseIndex(0);
      } else if (pct < 55) {
        setPhaseIndex(1);
      } else if (pct < 82) {
        setPhaseIndex(2);
      } else {
        setPhaseIndex(3);
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = originalOverflow;
        }, 400);
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
    }, 8000);

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

  return (
    <>
      <AnimatePresence mode="wait">
        {!isDone && (
          <motion.div
            key="launch-curtain"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.02,
              filter: "blur(12px)",
              transition: {
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-background text-foreground select-none p-6 sm:p-10 lg:p-14"
            aria-label="Loading portfolio. Press Escape or click Enter to proceed."
          >
            {/* Top Bar: Discreet, Minimalist Skip / Enter Control */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-montserrat text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Portfolio Edition &bull; 2026
                </span>
              </div>

              <button
                type="button"
                onClick={handleSkip}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-foreground hover:bg-muted font-montserrat font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-2xs group"
              >
                <span>Enter</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Centered Monolithic Focus: MoZoo-Style Animated Name Logo & Rotating Disciplines */}
            <div className="flex flex-col items-center justify-center text-center my-auto px-4 max-w-4xl mx-auto w-full">
              {/* Dynamic Animated Monoline Tubular Logo (Prosper Shaibu Asare) */}
              <AnimatedNameLogo className="mb-4 sm:mb-6" />

              {/* Dynamic Rotating Subtitle: Smooth Crossfade */}
              <div className="h-8 sm:h-9 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phaseIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] text-accent font-bold"
                  >
                    {disciplines[phaseIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Apple-Style Hairline Progress Bar & Percentage */}
              <div className="w-full max-w-xs sm:max-w-sm mt-8 space-y-3">
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <div className="flex items-center justify-between font-montserrat text-[10px] font-bold text-muted-foreground/80 tracking-widest uppercase">
                  <span>Loading</span>
                  <span className="font-semibold text-foreground">{progress}%</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer: Minimalist Attribution & Skip Hint */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-left text-muted-foreground font-sans text-xs gap-2 pt-2">
              <span>University of Ghana, Legon &bull; BSc. Information Technology</span>
              <span className="font-montserrat text-[10px] uppercase tracking-wider text-muted-foreground/60">
                Press Esc to skip
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page: Fluid Cinematic Fade-In */}
      <motion.div
        initial={{ opacity: 0.95 }}
        animate={isDone ? { opacity: 1 } : { opacity: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
