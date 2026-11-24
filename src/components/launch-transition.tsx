"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LaunchTransitionProps {
  children: React.ReactNode;
}

const STEPS = [
  "01 Loading fonts",
  "02 Setting the theme",
  "03 Preparing the work",
  "04 Ready",
];
const MARKS = [0.22, 0.50, 0.80, 1.0];

function getInitialGreeting() {
  const hr = new Date().getHours();
  return hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
}

function getInitialLocationClock() {
  try {
    const clockStr = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Accra",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    return `Ho, Ghana • ${clockStr}`;
  } catch {
    return "Ho, Ghana";
  }
}

/**
 * Editorial Swiss/Apple-Minimalist Launch Screen Transition
 *
 * Designed with pure typographic and architectural discipline:
 * - 100% theme-consistent: leverages semantic tokens (--background, --foreground, --border, --accent)
 * - Buttery 120fps hardware-accelerated rendering: 0 React re-renders during progress wave
 * - Waits for variable font readiness before initiation to avoid FOUT/FOIT
 * - Luxury upward curtain lift via cubic-bezier clip-path
 */
export function LaunchTransition({ children }: LaunchTransitionProps) {
  const [phase, setPhase] = React.useState<"loading" | "out" | "lift" | "gone">("loading");
  const [greeting] = React.useState(getInitialGreeting);
  const [locationClock] = React.useState(getInitialLocationClock);

  const loaderRef = React.useRef<HTMLDivElement>(null);
  const nameRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const countRef = React.useRef<HTMLDivElement>(null);
  const stepsRef = React.useRef<HTMLUListElement>(null);
  const isSkippingRef = React.useRef(false);

  const nameWords = [
    { word: "Prosper", className: "block" },
    { word: "Shaibu Asare", className: "block mt-1 sm:mt-2" },
  ];

  React.useEffect(() => {
    // 1. Lock body scroll during launch
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Collect character spans for variable font weight sweep
    const chElements: HTMLElement[] = [];
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll<HTMLElement>(".ch-glyph");
      chars.forEach((c) => chElements.push(c));
    }

    let rafId = 0;
    const timers: NodeJS.Timeout[] = [];
    let isCleanedUp = false;

    const finish = () => {
      // Step 1: Elements fade out slightly and slide up
      setPhase("out");

      // Step 2: Curtain lifts upward via clip-path
      const timerLift = setTimeout(() => {
        setPhase("lift");
      }, 350);
      timers.push(timerLift);

      // Step 3: Loader is completely removed and scroll is restored
      const timerGone = setTimeout(() => {
        setPhase("gone");
        document.body.style.overflow = originalOverflow;
      }, 1450);
      timers.push(timerGone);
    };

    const startAnimation = () => {
      if (isCleanedUp) return;

      const dur = 10000; // 10 seconds total loading screen time as requested
      const sweepDur = 8000; // 8 seconds wave progression so entire name (including ASARE) reaches 800 bold with perfect buttery smoothness
      const t0 = performance.now();
      const totalChars = chElements.length;

      function frame(currentTime: number) {
        if (isCleanedUp) return;

        const p = Math.min((currentTime - t0) / dur, 1);
        const isSkip = isSkippingRef.current;
        const e = isSkip ? 1 : 0.5 - Math.cos(Math.PI * p) / 2;
        const sw = isSkip ? 1 : Math.min(1, (currentTime - t0) / sweepDur);

        // 1. Update counter directly without triggering React re-renders (120fps)
        const pct = Math.round(e * 100);
        if (countRef.current) {
          countRef.current.textContent = String(pct).padStart(3, "0");
        }

        // 2. Update bottom progress bar directly
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${e})`;
        }

        // 3. Update loading steps directly in DOM
        if (stepsRef.current) {
          const listItems = stepsRef.current.children;
          MARKS.forEach((m, i) => {
            if (e >= m - 0.001) {
              const li = listItems[i] as HTMLElement | undefined;
              if (li && !li.dataset.done) {
                li.dataset.done = "true";
                li.className =
                  "flex items-center justify-between gap-4 py-2.5 border-t border-border transition-colors duration-300 text-foreground font-medium" +
                  (i === MARKS.length - 1 ? " border-b border-border" : "");
                const b = li.querySelector("b");
                if (b) {
                  b.className = "font-semibold text-accent transition-colors duration-300";
                  b.textContent = "ok";
                }
              }
            }
          });
        }

        // 4. Variable font weight wave sweep across characters (100 -> 800)
        // Uses smootherstep (quintic Hermite) curve for buttery, zero-jerk optical weight morphing
        chElements.forEach((c, i) => {
          if (isSkip) {
            c.style.fontWeight = "800";
            c.style.opacity = "1";
            return;
          }
          const charFrac = totalChars > 1 ? i / (totalChars - 1) : 0;
          const staggerWindow = 0.60;
          const charDuration = 0.40;
          const charStart = charFrac * staggerWindow;
          const rawL = (sw - charStart) / charDuration;
          const l = Math.max(0, Math.min(1, rawL));

          // Quintic smootherstep: 6l^5 - 15l^4 + 10l^3 (C^2 continuous, zero jerk at start and finish)
          const k = l * l * l * (l * (l * 6 - 15) + 10);
          const weight = Math.round(100 + 700 * k);
          const opacity = (0.2 + 0.8 * k).toFixed(3);
          c.style.fontWeight = String(weight);
          c.style.opacity = opacity;
        });

        if (p < 1 && !isSkip) {
          rafId = requestAnimationFrame(frame);
        } else {
          // If finished or skipped, ensure all characters reach 800 bold and steps complete
          chElements.forEach((c) => {
            c.style.fontWeight = "800";
            c.style.opacity = "1";
          });
          if (countRef.current) {
            countRef.current.textContent = "100";
          }
          if (barRef.current) {
            barRef.current.style.transform = "scaleX(1)";
          }
          if (stepsRef.current) {
            const listItems = stepsRef.current.children;
            for (let i = 0; i < listItems.length; i++) {
              const li = listItems[i] as HTMLElement;
              li.dataset.done = "true";
              li.className =
                "flex items-center justify-between gap-4 py-2.5 border-t border-border transition-colors duration-300 text-foreground font-medium" +
                (i === listItems.length - 1 ? " border-b border-border" : "");
              const b = li.querySelector("b");
              if (b) {
                b.className = "font-semibold text-accent transition-colors duration-300";
                b.textContent = "ok";
              }
            }
          }
          finish();
        }
      }

      rafId = requestAnimationFrame(frame);
    };

    // 3. Ensure fonts are loaded before starting animation to prevent layout jumps/FOUT
    if (typeof document !== "undefined" && "fonts" in document) {
      Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 250)),
      ]).then(() => {
        startAnimation();
      });
    } else {
      startAnimation();
    }

    // 4. Skip event listeners
    const handleSkip = () => {
      if (!isSkippingRef.current) {
        isSkippingRef.current = true;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      isCleanedUp = true;
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const triggerSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase === "loading") {
      isSkippingRef.current = true;
    }
  };

  return (
    <>
      {phase !== "gone" && (
        <div
          ref={loaderRef}
          onClick={triggerSkip}
          role="status"
          aria-label="Loading portfolio. Tap to skip."
          style={{
            clipPath: phase === "lift" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
            transition: "clip-path 1.1s cubic-bezier(0.76, 0, 0.24, 1)",
            willChange: "clip-path",
          }}
          className={cn(
            "fixed inset-0 z-[100] flex flex-col justify-between cursor-pointer select-none overflow-hidden",
            "bg-background text-foreground",
            "px-6 sm:px-10 lg:px-14 py-6 sm:py-8",
            phase === "out" && "pointer-events-none"
          )}
        >
          {/* Subtle Vertical Drafting Guide Lines (25%, 50%, 75%) */}
          <i
            style={{ left: "25%" }}
            className={cn(
              "absolute top-0 bottom-0 w-[1px] pointer-events-none transition-opacity duration-400 hidden sm:block",
              "bg-border/60",
              phase === "out" && "opacity-0"
            )}
          />
          <i
            style={{ left: "50%" }}
            className={cn(
              "absolute top-0 bottom-0 w-[1px] pointer-events-none transition-opacity duration-400",
              "bg-border/60",
              phase === "out" && "opacity-0"
            )}
          />
          <i
            style={{ left: "75%" }}
            className={cn(
              "absolute top-0 bottom-0 w-[1px] pointer-events-none transition-opacity duration-400 hidden sm:block",
              "bg-border/60",
              phase === "out" && "opacity-0"
            )}
          />

          {/* Top Bar: Time-aware greeting & live Ho, Ghana clock */}
          <div
            className={cn(
              "relative z-10 flex items-center justify-between gap-4 pb-4 border-b text-xs sm:text-sm font-sans",
              "border-border",
              "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              phase === "out" && "opacity-0 -translate-y-3.5"
            )}
          >
            <span suppressHydrationWarning className="font-medium tracking-tight text-foreground">
              {greeting}
            </span>
            <span suppressHydrationWarning className="font-mono text-[11px] sm:text-xs text-muted-foreground">
              {locationClock}
            </span>
          </div>

          {/* Middle Section: Massive Variable Font Name & Monospace Steps */}
          <div
            className={cn(
              "relative z-10 flex-1 flex flex-col lg:flex-row lg:items-end justify-center lg:justify-between gap-8 py-6 sm:py-8",
              "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              phase === "out" && "opacity-0 -translate-y-3.5"
            )}
          >
            {/* The Name with Variable Font-Weight Wave Sweep */}
            <div
              ref={nameRef}
              aria-hidden="true"
              className="font-montserrat text-[clamp(44px,11.5vw,168px)] leading-[0.92] tracking-[-0.05em] flex flex-col select-none"
            >
              {nameWords.map((item, lineIdx) => (
                <span key={lineIdx} className={item.className}>
                  {item.word.split("").map((c, charIdx) => (
                    <i
                      key={charIdx}
                      className="ch-glyph not-italic inline-block font-[100] opacity-20 will-change-[font-weight,opacity]"
                    >
                      {c === " " ? "\u00A0" : c}
                    </i>
                  ))}
                </span>
              ))}
            </div>

            {/* Checklist of Loading Steps */}
            <ul
              ref={stepsRef}
              className="w-full max-w-[280px] sm:max-w-[320px] font-mono text-xs sm:text-[13px] list-none p-0 flex flex-col"
            >
              {STEPS.map((label, idx) => (
                <li
                  key={idx}
                  className={cn(
                    "flex items-center justify-between gap-4 py-2.5 border-t border-border transition-colors duration-300 text-muted-foreground/60",
                    idx === STEPS.length - 1 && "border-b border-border"
                  )}
                >
                  <span>{label}</span>
                  <b className="font-medium text-muted-foreground/40 transition-colors duration-300">
                    …
                  </b>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Bar: Tabular Counter & Skip Hint */}
          <div
            className={cn(
              "relative z-10 flex items-end justify-between gap-4 pt-4 border-t",
              "border-border",
              "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              phase === "out" && "opacity-0 -translate-y-3.5"
            )}
          >
            {/* Monumental Tabular 3-Digit Counter */}
            <div
              ref={countRef}
              className="font-montserrat font-[200] text-[clamp(50px,9vw,120px)] leading-[0.85] tracking-[-0.05em] tabular-nums select-none text-foreground"
            >
              000
            </div>

            <span className="font-sans text-xs sm:text-sm text-muted-foreground pb-1 cursor-pointer hover:text-foreground transition-colors">
              Tap to skip
            </span>
          </div>

          {/* Hairline Bottom Progress Bar (3px) */}
          <div
            ref={barRef}
            style={{ transform: "scaleX(0)" }}
            className="absolute left-0 right-0 bottom-0 h-[3px] bg-accent origin-left"
          />
        </div>
      )}

      {/* The Main Application Page */}
      <div
        className={cn(
          "w-full min-h-screen transition-opacity duration-700",
          phase === "loading" ? "opacity-95 pointer-events-none" : "opacity-100 pointer-events-auto"
        )}
      >
        {children}
      </div>
    </>
  );
}
