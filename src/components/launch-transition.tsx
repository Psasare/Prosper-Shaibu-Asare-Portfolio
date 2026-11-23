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

function getInitialAccraClock() {
  try {
    const clockStr = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Accra",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    return `Accra ${clockStr}`;
  } catch {
    return "Accra GMT";
  }
}

/**
 * Editorial Swiss/Apple-Minimalist Launch Screen Transition
 *
 * Designed with pure typographic and architectural discipline:
 * - Three subtle vertical hairline drafting guides (25%, 50%, 75%)
 * - Time-aware greeting & live Accra GMT clock
 * - Variable font-weight wave sweeping across "Prosper Shaibu Asare" (100 -> 800 weight)
 * - Monospace system loading steps checklist with accent status badges
 * - Monumental 3-digit tabular counter (000 -> 100) and hairline bottom progress track
 * - Luxury upward curtain lift exit transition via cubic-bezier clip-path
 */
export function LaunchTransition({ children }: LaunchTransitionProps) {
  const [phase, setPhase] = React.useState<"loading" | "out" | "lift" | "gone">("loading");
  const [counterText, setCounterText] = React.useState("000");
  const [progressVal, setProgressVal] = React.useState(0);
  const [stepStates, setStepStates] = React.useState<boolean[]>([false, false, false, false]);

  const [greeting] = React.useState(getInitialGreeting);
  const [accraClock] = React.useState(getInitialAccraClock);

  const loaderRef = React.useRef<HTMLDivElement>(null);
  const nameRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
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

    // 3. Animation loop using requestAnimationFrame
    let rafId = 0;
    const timers: NodeJS.Timeout[] = [];
    const dur = 4200; // 4.2 seconds smooth progression
    const t0 = performance.now();

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
      }, 1250);
      timers.push(timerGone);
    };

    function frame(currentTime: number) {
      const p = Math.min((currentTime - t0) / dur, 1);
      const isSkip = isSkippingRef.current;
      const e = isSkip ? 1 : 0.5 - Math.cos(Math.PI * p) / 2;
      const sw = isSkip ? 1 : Math.min(1, (currentTime - t0) / 2400);

      // Update counter
      const pct = Math.round(e * 100);
      setCounterText(String(pct).padStart(3, "0"));
      setProgressVal(e);

      // Update bottom progress bar directly for 120fps smoothness
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${e})`;
      }

      // Update steps
      setStepStates((prev) => {
        const next = [...prev];
        let changed = false;
        MARKS.forEach((m, i) => {
          if (e >= m - 0.001 && !next[i]) {
            next[i] = true;
            changed = true;
          }
        });
        return changed ? next : prev;
      });

      // Variable font weight wave sweep across characters
      chElements.forEach((c, i) => {
        const l = Math.max(0, Math.min(1, sw * 1.6 - i * 0.08));
        const k = l * l * (3 - 2 * l); // Smoothstep curve
        const weight = Math.round(100 + 700 * k); // 100 -> 800 weight
        const opacity = (0.15 + 0.85 * k).toFixed(2);
        c.style.fontWeight = String(weight);
        c.style.opacity = opacity;
      });

      if (p < 1 && !isSkip) {
        rafId = requestAnimationFrame(frame);
      } else {
        setStepStates([true, true, true, true]);
        finish();
      }
    }

    rafId = requestAnimationFrame(frame);

    // 4. Skip event listeners (tap or keydown Escape / Space / Enter)
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
            transition: phase === "lift" ? "clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          }}
          className={cn(
            "fixed inset-0 z-[100] flex flex-col justify-between cursor-pointer select-none overflow-hidden",
            "bg-[#F6F6F7] text-[#16161A] dark:bg-[#0C0C10] dark:text-[#F2F2F5]",
            "px-6 sm:px-10 lg:px-14 py-6 sm:py-8",
            phase === "out" && "pointer-events-none"
          )}
        >
          {/* Subtle Vertical Drafting Guide Lines (25%, 50%, 75%) */}
          <i
            style={{ left: "25%" }}
            className={cn(
              "absolute top-0 bottom-0 w-[1px] pointer-events-none transition-opacity duration-400 hidden sm:block",
              "bg-black/[0.08] dark:bg-white/[0.08]",
              phase === "out" && "opacity-0"
            )}
          />
          <i
            style={{ left: "50%" }}
            className={cn(
              "absolute top-0 bottom-0 w-[1px] pointer-events-none transition-opacity duration-400",
              "bg-black/[0.08] dark:bg-white/[0.08]",
              phase === "out" && "opacity-0"
            )}
          />
          <i
            style={{ left: "75%" }}
            className={cn(
              "absolute top-0 bottom-0 w-[1px] pointer-events-none transition-opacity duration-400 hidden sm:block",
              "bg-black/[0.08] dark:bg-white/[0.08]",
              phase === "out" && "opacity-0"
            )}
          />

          {/* Top Bar: Time-aware greeting & live Accra GMT clock */}
          <div
            className={cn(
              "relative z-10 flex items-center justify-between gap-4 pb-4 border-b text-xs sm:text-sm font-sans",
              "border-black/[0.09] dark:border-white/[0.11]",
              "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              phase === "out" && "opacity-0 -translate-y-3.5"
            )}
          >
            <span suppressHydrationWarning className="font-medium tracking-tight text-foreground">{greeting}</span>
            <span suppressHydrationWarning className="font-mono text-[11px] sm:text-xs text-muted-foreground">{accraClock}</span>
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
                      className="ch-glyph not-italic inline-block font-[100] opacity-15 transition-[font-weight,opacity] duration-75"
                    >
                      {c === " " ? "\u00A0" : c}
                    </i>
                  ))}
                </span>
              ))}
            </div>

            {/* Checklist of Loading Steps */}
            <ul className="w-full max-w-[280px] sm:max-w-[320px] font-mono text-xs sm:text-[13px] list-none p-0 flex flex-col">
              {STEPS.map((label, idx) => {
                const isDone = stepStates[idx];
                return (
                  <li
                    key={idx}
                    className={cn(
                      "flex items-center justify-between gap-4 py-2.5 border-t border-black/[0.09] dark:border-white/[0.11] transition-colors duration-300",
                      idx === STEPS.length - 1 && "border-b border-black/[0.09] dark:border-white/[0.11]",
                      isDone ? "text-foreground font-medium" : "text-muted-foreground/70"
                    )}
                  >
                    <span>{label}</span>
                    <b className={cn("font-medium", isDone ? "text-accent" : "text-muted-foreground/50")}>
                      {isDone ? "ok" : "…"}
                    </b>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Bar: Tabular Counter & Skip Hint */}
          <div
            className={cn(
              "relative z-10 flex items-end justify-between gap-4 pt-4 border-t",
              "border-black/[0.09] dark:border-white/[0.11]",
              "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              phase === "out" && "opacity-0 -translate-y-3.5"
            )}
          >
            {/* Monumental Tabular 3-Digit Counter */}
            <div className="font-montserrat font-[200] text-[clamp(50px,9vw,120px)] leading-[0.85] tracking-[-0.05em] tabular-nums select-none text-foreground">
              {counterText}
            </div>

            <span className="font-sans text-xs sm:text-sm text-muted-foreground pb-1 cursor-pointer hover:text-foreground transition-colors">
              Tap to skip
            </span>
          </div>

          {/* Hairline Bottom Progress Bar (3px) */}
          <div
            ref={barRef}
            style={{ transform: `scaleX(${progressVal})` }}
            className="absolute left-0 right-0 bottom-0 h-[3px] bg-accent origin-left transition-transform duration-75"
          />
        </div>
      )}

      {/* The Main Application Page */}
      <div className={cn("w-full min-h-screen transition-opacity duration-700", phase === "loading" ? "opacity-95" : "opacity-100")}>
        {children}
      </div>
    </>
  );
}
