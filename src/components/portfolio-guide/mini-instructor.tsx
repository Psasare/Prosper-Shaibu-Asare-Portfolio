"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioGuide } from "./portfolio-guide-context";
import {
  Bot,
  ChevronRight,
  ChevronLeft,
  X,
  Minimize2,
  Maximize2,
  Info,
  Compass,
  CheckCircle2,
} from "lucide-react";

export function MiniInstructor() {
  const {
    isTourActive,
    isMinimized,
    currentStepIndex,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    endTour,
    toggleMinimize,
    profile,
  } = usePortfolioGuide();

  const addressedName = profile?.addressedAs || "Visitor";
  const isLastStep = currentStepIndex === totalSteps - 1;
  const progressPercent = ((currentStepIndex + 1) / totalSteps) * 100;

  // Keyboard navigation for tour
  React.useEffect(() => {
    if (!isTourActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowRight") {
        nextStep();
      } else if (e.key === "ArrowLeft") {
        prevStep();
      } else if (e.key === "Escape") {
        endTour();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTourActive, nextStep, prevStep, endTour]);

  if (!isTourActive) return null;

  return (
    <aside aria-label="Interactive Portfolio Tour Guide" className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[90] max-w-[calc(100vw-2.5rem)]">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Compact Tour Companion Pill */
          <motion.div
            key="minimized"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={toggleMinimize}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card/95 backdrop-blur-xl border border-accent/40 shadow-xl cursor-pointer hover:border-accent transition-all group"
          >
            <div className="relative w-8 h-8 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <Bot className="w-4 h-4 animate-bounce" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold">
                Tour Active • {currentStepIndex + 1}/{totalSteps}
              </span>
              <span className="font-montserrat font-bold text-xs text-foreground group-hover:text-accent transition-colors">
                {currentStep.title}
              </span>
            </div>
            <Maximize2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground ml-1" />
          </motion.div>
        ) : (
          /* Full Expanded Floating Mini Instructor Card */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="w-[360px] sm:w-[410px] bg-card/95 backdrop-blur-2xl border border-border rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Top progress hairline indicator */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-border/50">
              <motion.div
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-accent shadow-[0_0_8px_var(--accent)]"
              />
            </div>

            {/* Subtle decorative background glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-accent/15 rounded-full blur-2xl pointer-events-none" />

            {/* Header: Instructor identity & controls */}
            <div className="flex items-center justify-between pb-3.5 border-b border-border/80">
              <div className="flex items-center gap-2.5">
                {/* Animated Interactive Mascot */}
                <div className="relative w-9 h-9 rounded-xl bg-accent/15 border border-accent/35 flex items-center justify-center text-accent shadow-xs">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-montserrat font-bold text-xs text-foreground">
                      Byte
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-accent/15 text-accent font-semibold">
                      Mini Guide
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground block">
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                </div>
              </div>

              {/* Minimize & Close actions */}
              <div className="flex items-center gap-1 text-muted-foreground">
                <button
                  onClick={toggleMinimize}
                  className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
                  aria-label="Minimize tour guide"
                  title="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={endTour}
                  className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
                  aria-label="Exit tour"
                  title="Exit Tour"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Speech Bubble / Step Content */}
            <div className="py-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                  {currentStep.badge}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Target: #{currentStep.targetId}
                </span>
              </div>

              <h3 className="font-montserrat font-black text-sm sm:text-base text-foreground leading-snug tracking-tight">
                {currentStep.title}
              </h3>

              {/* Personalized dynamic narrative */}
              <p className="font-sans text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                {currentStep.getContent(addressedName)}
              </p>

              {/* Pro Tip Box if available */}
              {currentStep.tip && (
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/80 text-[11px] text-foreground">
                  <Info className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="leading-tight text-muted-foreground">
                    <strong className="text-foreground font-semibold">Note:</strong> {currentStep.tip}
                  </span>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-border/80">
              {/* Previous Button */}
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-montserrat font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {/* Step indicator dots */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStepIndex
                        ? "w-4 bg-accent"
                        : idx < currentStepIndex
                        ? "w-1.5 bg-accent/50"
                        : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Next / Finish Button */}
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-montserrat font-bold uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
              >
                {isLastStep ? (
                  <>
                    <span>Finish</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
