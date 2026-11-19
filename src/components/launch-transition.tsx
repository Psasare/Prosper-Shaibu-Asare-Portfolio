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
    "FULL-STACK ENGINEERING",
    "WEB DESIGN & ARCHITECTURE",
    "MOBILE APPLICATION DEVELOPMENT",
  ];

  React.useEffect(() => {
    // Lock body scroll while intro is playing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress counter animation from 0% to 100%
    const startTime = Date.now();
    const duration = 900; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 35) {
        setPhaseIndex(0);
      } else if (pct < 70) {
        setPhaseIndex(1);
      } else {
        setPhaseIndex(2);
      }

      if (pct >= 100) {
        clearInterval(interval);
        // Short pause at 100% before executing wipe
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = originalOverflow;
        }, 220);
      }
    }, 16);

    // Safety fallback: auto-complete after 1.8s maximum
    const safetyTimeout = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = originalOverflow;
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSkip = () => {
    setIsDone(true);
    document.body.style.overflow = "";
  };

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
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1], // Luxury cubic-bezier curtain wipe
              },
            }}
            onClick={handleSkip}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground select-none cursor-pointer"
            aria-label="Loading portfolio. Click to skip intro."
          >
            {/* Ambient subtle glow pulse */}
            <div className="absolute inset-0 bg-radial from-accent/10 via-transparent to-transparent pointer-events-none opacity-60" />

            {/* Center Content: Morph, Counter & Typography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 1.05,
                y: -24,
                filter: "blur(6px)",
                transition: { duration: 0.35, ease: "easeInOut" },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full"
            >
              {/* Monogram emblem with rotating morphing ring */}
              <div className="relative mb-6 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-2xl border border-accent/40 border-dashed"
                />
                <div className="absolute inset-0 flex items-center justify-center font-montserrat font-extrabold text-sm tracking-wider text-accent">
                  PSA
                </div>
              </div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.15em" }}
                animate={{ opacity: 1, letterSpacing: "0.28em" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-montserrat font-bold text-sm sm:text-base text-foreground tracking-[0.28em] uppercase"
              >
                Prosper Shaibu Asare
              </motion.h1>

              {/* Morphing Role Indicator */}
              <div className="h-6 mt-2.5 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phaseIndex}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="font-montserrat text-xs tracking-widest text-muted-foreground font-medium uppercase"
                  >
                    {phases[phaseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Progress Bar & Percentage Counter */}
              <div className="w-full max-w-xs mt-7">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground/80 mb-2">
                  <span className="tracking-widest">INITIALIZING</span>
                  <span className="font-semibold text-accent">{progress}%</span>
                </div>
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>

              {/* Skip pill hint */}
              <span className="mt-8 text-[10px] uppercase font-montserrat tracking-widest text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                Click anywhere to skip
              </span>
            </motion.div>

            {/* Curtain Bottom Wipe Edge Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main page content with coordinated entrance fade + gentle morph zoom */}
      <motion.div
        initial={{ opacity: 0.85, scale: 0.99, filter: "blur(3px)" }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay: isDone ? 0 : 0.2,
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
