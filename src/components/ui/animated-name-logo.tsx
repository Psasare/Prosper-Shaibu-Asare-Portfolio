"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedNameLogoProps {
  className?: string;
}

type BotState = "walking" | "jumping" | "celebrating";

/**
 * Animated Code Character (Developer Bot)
 *
 * A sleek, high-tech developer automaton that strides across the screen,
 * holding an illuminated code stylus that weaves each letter of Prosper's name.
 */
function CodeWalkerBot({
  state,
  facing = "right",
}: {
  state: BotState;
  facing?: "right" | "left" | "front";
}) {
  return (
    <div
      className={cn(
        "relative select-none pointer-events-none transition-transform duration-300",
        facing === "left" && "-scale-x-100"
      )}
    >
      {/* Jet Spark / Dust Emitter during jumping & walking */}
      {state === "jumping" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.4, 0.4], y: [0, 12] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent/80 rounded-full blur-[3px]"
        />
      )}

      {/* Floating Celebration Sparkles */}
      {state === "celebrating" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.3, 0],
            y: [-10, -28],
            x: [0, 8, -6],
          }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
          className="absolute -top-4 right-0 text-accent text-xs font-bold font-mono"
        >
          ✦
        </motion.div>
      )}

      <svg
        viewBox="0 0 52 60"
        className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 overflow-visible drop-shadow-[0_4px_16px_rgba(56,189,248,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="botChassis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="visorScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Antenna with pulsing beacon LED */}
        <line
          x1="26"
          y1="8"
          x2="26"
          y2="2"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="26" cy="2" r="2.5" fill="#38bdf8" />
        <circle
          cx="26"
          cy="2"
          r="4.5"
          fill="#38bdf8"
          opacity="0.35"
          className="animate-ping"
        />

        {/* Head / Monitor Case */}
        <rect
          x="12"
          y="8"
          width="28"
          height="22"
          rx="6"
          fill="url(#botChassis)"
          stroke="#38bdf8"
          strokeWidth="1.6"
        />

        {/* Terminal Screen Visor */}
        <rect
          x="15"
          y="11"
          width="22"
          height="16"
          rx="4"
          fill="url(#visorScreen)"
        />

        {/* Dynamic Digital Face Expressions */}
        {state === "celebrating" ? (
          // Joyful smiling expression: ^ ‿ ^
          <g
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 18 L21 16 L23 18" />
            <path d="M29 18 L31 16 L33 18" />
            <path d="M23 22 Q26 24 29 22" fill="none" />
          </g>
        ) : state === "jumping" ? (
          // Focused / thrill expression: ● ●
          <g fill="#38bdf8">
            <circle cx="20" cy="18" r="2" />
            <circle cx="32" cy="18" r="2" />
            <line
              x1="24"
              y1="22"
              x2="28"
              y2="22"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        ) : (
          // Active coding expression: > _
          <g fill="#38bdf8">
            <path
              d="M18 16 L22 18.5 L18 21"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line
              x1="26"
              y1="21"
              x2="31"
              y2="21"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Body / Cyber Torso */}
        <rect
          x="16"
          y="30"
          width="20"
          height="15"
          rx="4"
          fill="url(#botChassis)"
          stroke="#475569"
          strokeWidth="1.2"
        />

        {/* Chest Glowing Code Symbol: </> */}
        <g
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 34.5 L20 37.5 L22 40.5" />
          <path d="M30 34.5 L32 37.5 L30 40.5" />
          <line x1="27" y1="34.5" x2="25" y2="40.5" />
        </g>

        {/* Left Arm (Swing / Wave) */}
        <motion.g
          style={{ transformOrigin: "15px 32px" }}
          animate={
            state === "celebrating"
              ? { rotate: -125 }
              : state === "jumping"
                ? { rotate: -50 }
                : { rotate: [-24, 24, -24] }
          }
          transition={
            state === "walking"
              ? { repeat: Infinity, duration: 0.48, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <rect x="11" y="32" width="4.5" height="11" rx="2" fill="#334155" />
          <circle cx="13" cy="43" r="2.5" fill="#38bdf8" />
        </motion.g>

        {/* Right Arm (Holding the Code Stylus / Light Wand) */}
        <motion.g
          style={{ transformOrigin: "37px 32px" }}
          animate={
            state === "celebrating"
              ? { rotate: -135 }
              : state === "jumping"
                ? { rotate: 25 }
                : { rotate: [18, -18, 18] }
          }
          transition={
            state === "walking"
              ? { repeat: Infinity, duration: 0.48, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <rect x="36" y="32" width="4.5" height="11" rx="2" fill="#334155" />
          {/* Hand clasp */}
          <circle cx="38" cy="43" r="2.5" fill="#64748b" />
          {/* Stylus Shaft */}
          <line
            x1="38"
            y1="43"
            x2="44"
            y2="52"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Stylus Glowing Emitter Tip */}
          <circle cx="44" cy="52" r="2.2" fill="#38bdf8" />
          {state !== "celebrating" && (
            <circle
              cx="44"
              cy="52"
              r="4.5"
              fill="#38bdf8"
              opacity="0.45"
              className="animate-ping"
            />
          )}
        </motion.g>

        {/* Left Leg */}
        <motion.g
          style={{ transformOrigin: "20px 45px" }}
          animate={
            state === "celebrating"
              ? { rotate: 0 }
              : state === "jumping"
                ? { rotate: -40 }
                : { rotate: [28, -28, 28] }
          }
          transition={
            state === "walking"
              ? { repeat: Infinity, duration: 0.48, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <rect x="18" y="45" width="4.5" height="10" rx="2" fill="#334155" />
          {/* Tech Sneaker */}
          <rect x="16.5" y="53" width="7.5" height="3.5" rx="1.5" fill="#0f172a" />
          <line
            x1="17"
            y1="56"
            x2="24"
            y2="56"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
        </motion.g>

        {/* Right Leg */}
        <motion.g
          style={{ transformOrigin: "31px 45px" }}
          animate={
            state === "celebrating"
              ? { rotate: 0 }
              : state === "jumping"
                ? { rotate: 40 }
                : { rotate: [-28, 28, -28] }
          }
          transition={
            state === "walking"
              ? { repeat: Infinity, duration: 0.48, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <rect x="29" y="45" width="4.5" height="10" rx="2" fill="#334155" />
          {/* Tech Sneaker */}
          <rect x="28.5" y="53" width="7.5" height="3.5" rx="1.5" fill="#0f172a" />
          <line
            x1="29"
            y1="56"
            x2="36"
            y2="56"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
        </motion.g>
      </svg>
    </div>
  );
}

/**
 * Animated Name Motion Design
 *
 * An animated code character strides across Tier 1 (PROSPER), leaves an illuminated letter trail,
 * performs an agile leap down to Tier 2 (SHAIBU ASARE), walks across spelling the rest of the name,
 * and strikes a celebratory pose with neon signature lines.
 */
export function AnimatedNameLogo({ className }: AnimatedNameLogoProps) {
  // Timeline phases calibrated for a luxurious 10-second launch experience:
  // 0.0s - 3.8s: Row 1 Walk & Spell (PROSPER)
  // 3.8s - 4.6s: Agile Jumping transition
  // 4.6s - 8.2s: Row 2 Walk & Spell (SHAIBU ASARE)
  // 8.2s - 10.0s+: Triumphant Celebration & Full Glow
  const [phase, setPhase] = React.useState<"row1" | "jumping" | "row2" | "celebrating">("row1");

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase("jumping"), 3800);
    const t2 = setTimeout(() => setPhase("row2"), 4600);
    const t3 = setTimeout(() => setPhase("celebrating"), 8200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Letters configuration with synchronized activation timestamps (in seconds)
  const row1Letters = [
    { char: "P", time: 0.8 },
    { char: "R", time: 1.2 },
    { char: "O", time: 1.6 },
    { char: "S", time: 2.0 },
    { char: "P", time: 2.4 },
    { char: "E", time: 2.8 },
    { char: "R", time: 3.2 },
  ];

  const shaibuLetters = [
    { char: "S", time: 4.8 },
    { char: "H", time: 5.1 },
    { char: "A", time: 5.4 },
    { char: "I", time: 5.7 },
    { char: "B", time: 6.0 },
    { char: "U", time: 6.3 },
  ];

  const asareLetters = [
    { char: "A", time: 6.7 },
    { char: "S", time: 7.0 },
    { char: "A", time: 7.3 },
    { char: "R", time: 7.6 },
    { char: "E", time: 7.9 },
  ];

  // Floating binary/code sparks that dissipate into the trail
  const sparks = [
    { glyph: "0", x: "14%", y: -18, delay: 1.2 },
    { glyph: "1", x: "42%", y: -24, delay: 2.0 },
    { glyph: "</>", x: "72%", y: -20, delay: 2.8 },
    { glyph: "{ }", x: "28%", y: -16, delay: 5.4 },
    { glyph: "1", x: "65%", y: -22, delay: 6.8 },
    { glyph: "0", x: "88%", y: -18, delay: 7.5 },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full select-none py-4 sm:py-6 overflow-visible",
        className
      )}
    >
      {/* Ambient Radial Halo */}
      <div className="absolute w-[80%] h-[90%] bg-accent/12 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Main Two-Tier Architectural Typography Display */}
      <div className="flex flex-col items-center justify-center text-center relative overflow-visible w-full max-w-4xl">
        {/* ======================================================== */}
        {/* TIER 1: PROSPER */}
        {/* ======================================================== */}
        <div className="relative inline-flex flex-col items-center overflow-visible">
          {/* Animated Code Walker on Row 1 */}
          {(phase === "row1" || phase === "jumping") && (
            <motion.div
              initial={{ left: "-45px", opacity: 0, scale: 0.8 }}
              animate={
                phase === "row1"
                  ? {
                    left: ["-45px", "calc(100% - 15px)"],
                    opacity: [0, 1, 1],
                    scale: [0.8, 1, 1],
                  }
                  : {
                    left: "calc(100% - 15px)",
                    x: [0, 20, 10],
                    y: [0, -25, 70],
                    opacity: [1, 1, 0],
                    scale: [1, 1.1, 0.9],
                  }
              }
              transition={
                phase === "row1"
                  ? {
                    left: { duration: 3.2, ease: "easeInOut", delay: 0.5 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.35 },
                  }
                  : {
                    duration: 0.8,
                    ease: "easeInOut",
                  }
              }
              className="absolute -top-10 sm:-top-13 md:-top-15 z-30 pointer-events-none"
            >
              <CodeWalkerBot
                state={phase === "jumping" ? "jumping" : "walking"}
                facing="right"
              />
            </motion.div>
          )}

          {/* Row 1 Floating Code Bits / Sparks */}
          {sparks.slice(0, 3).map((spark, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 0.9, 0],
                y: [0, spark.y],
                scale: [0.6, 1.2, 0.8],
              }}
              transition={{
                duration: 1.0,
                delay: spark.delay,
                ease: "easeOut",
              }}
              style={{ left: spark.x }}
              className="absolute -top-4 font-mono text-[10px] sm:text-xs font-bold text-accent pointer-events-none select-none z-20"
            >
              {spark.glyph}
            </motion.span>
          ))}

          {/* Letters of PROSPER */}
          <div className="flex items-center justify-center overflow-visible py-1">
            {row1Letters.map((item, idx) => (
              <motion.span
                key={idx}
                initial={{
                  opacity: 0,
                  y: 28,
                  scale: 0.65,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: [0.65, 1.22, 1],
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.6,
                  delay: item.time,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-montserrat font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[0.24em] sm:tracking-[0.28em] text-foreground inline-block select-none leading-none relative"
              >
                {/* Initial neon burst glow behind each letter as it materializes */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.6, 1.2] }}
                  transition={{ duration: 0.55, delay: item.time }}
                  className="absolute inset-0 text-accent blur-[8px] pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {item.char}
                </motion.span>
                {item.char}
              </motion.span>
            ))}
          </div>

          {/* Dynamic Signature Rule under PROSPER (Traces directly behind the walker) */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              scaleX: { duration: 3.2, delay: 0.55, ease: "easeInOut" },
              opacity: { duration: 0.35, delay: 0.55 },
            }}
            style={{ transformOrigin: "left center" }}
            className="w-full h-1 sm:h-1.5 rounded-full bg-accent mt-2 sm:mt-3 shadow-[0_0_16px_rgba(59,130,246,0.65)]"
          />
        </div>

        {/* ======================================================== */}
        {/* TIER 2: SHAIBU ASARE */}
        {/* ======================================================== */}
        <div className="relative inline-flex flex-col items-center overflow-visible mt-4 sm:mt-6">
          {/* Animated Code Walker on Row 2 */}
          {(phase === "row2" || phase === "celebrating") && (
            <motion.div
              initial={
                phase === "row2"
                  ? { left: "-40px", y: -25, opacity: 0, scale: 0.9 }
                  : { left: "calc(100% - 15px)", y: 0, opacity: 1, scale: 1 }
              }
              animate={
                phase === "row2"
                  ? {
                    left: ["-40px", "calc(100% - 15px)"],
                    y: [-25, 0],
                    opacity: [0, 1, 1],
                    scale: [0.9, 1, 1],
                  }
                  : {
                    left: "calc(100% - 15px)",
                    y: [0, -6, 0],
                    opacity: 1,
                    scale: 1,
                  }
              }
              transition={
                phase === "row2"
                  ? {
                    left: { duration: 3.5, ease: "easeInOut" },
                    y: { duration: 0.5, ease: "easeOut" },
                    opacity: { duration: 0.3 },
                  }
                  : {
                    y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                  }
              }
              className="absolute -top-10 sm:-top-13 md:-top-15 z-30 pointer-events-none"
            >
              <CodeWalkerBot
                state={phase === "celebrating" ? "celebrating" : "walking"}
                facing={phase === "celebrating" ? "front" : "right"}
              />
            </motion.div>
          )}

          {/* Row 2 Floating Code Bits / Sparks */}
          {sparks.slice(3).map((spark, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 0.9, 0],
                y: [0, spark.y],
                scale: [0.6, 1.2, 0.8],
              }}
              transition={{
                duration: 1.0,
                delay: spark.delay,
                ease: "easeOut",
              }}
              style={{ left: spark.x }}
              className="absolute -top-4 font-mono text-[10px] sm:text-xs font-bold text-accent pointer-events-none select-none z-20"
            >
              {spark.glyph}
            </motion.span>
          ))}

          {/* Words Container: SHAIBU + ASARE */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-9 gap-y-3">
            {/* SHAIBU */}
            <div className="relative inline-flex flex-col items-center">
              <div className="flex items-center justify-center overflow-visible py-1">
                {shaibuLetters.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{
                      opacity: 0,
                      y: 22,
                      scale: 0.7,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [0.7, 1.2, 1],
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.55,
                      delay: item.time,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-[0.26em] sm:tracking-[0.3em] text-foreground/90 inline-block select-none leading-none relative"
                  >
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 0.85, 0], scale: [0.5, 1.5, 1.1] }}
                      transition={{ duration: 0.5, delay: item.time }}
                      className="absolute inset-0 text-accent blur-[6px] pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      {item.char}
                    </motion.span>
                    {item.char}
                  </motion.span>
                ))}
              </div>

              {/* Dynamic Signature Rule under SHAIBU */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  scaleX: { duration: 1.8, delay: 4.7, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: 4.7 },
                }}
                style={{ transformOrigin: "left center" }}
                className="w-full h-0.5 sm:h-1 rounded-full bg-accent/90 mt-1.5 sm:mt-2 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              />
            </div>

            {/* ASARE */}
            <div className="relative inline-flex flex-col items-center">
              <div className="flex items-center justify-center overflow-visible py-1">
                {asareLetters.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{
                      opacity: 0,
                      y: 22,
                      scale: 0.7,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [0.7, 1.2, 1],
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.55,
                      delay: item.time,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-[0.26em] sm:tracking-[0.3em] text-foreground/90 inline-block select-none leading-none relative"
                  >
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 0.85, 0], scale: [0.5, 1.5, 1.1] }}
                      transition={{ duration: 0.5, delay: item.time }}
                      className="absolute inset-0 text-accent blur-[6px] pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      {item.char}
                    </motion.span>
                    {item.char}
                  </motion.span>
                ))}
              </div>

              {/* Dynamic Signature Rule under ASARE */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  scaleX: { duration: 1.5, delay: 6.6, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: 6.6 },
                }}
                style={{ transformOrigin: "left center" }}
                className="w-full h-0.5 sm:h-1 rounded-full bg-accent/90 mt-1.5 sm:mt-2 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
