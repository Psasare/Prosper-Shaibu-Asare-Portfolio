"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedNameLogoProps {
  className?: string;
}

const letterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.15,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 52,
    filter: "blur(12px)",
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/**
 * Professional Montserrat Kinetic Signature Logo
 *
 * Designed with pure executive Apple aesthetic discipline:
 * - Authentic Montserrat geometric sans-serif typography
 * - Smooth split-letter staggered kinetic reveal with blur interpolation
 * - Precision architectural hairline signature rules beneath each word mark
 * - High-contrast, responsive scaling across mobile, tablet, and ultra-wide screens
 */
export function AnimatedNameLogo({ className }: AnimatedNameLogoProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full select-none py-4 sm:py-6",
        className
      )}
    >
      {/* Ambient Radial Halo */}
      <div className="absolute w-[80%] h-[90%] bg-accent/12 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Main Two-Tier Architectural Typography Display */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Tier 1: PROSPER */}
        <div className="relative inline-flex flex-col items-center">
          <motion.div
            variants={letterContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center overflow-hidden py-1"
          >
            {"PROSPER".split("").map((char, idx) => (
              <motion.span
                key={idx}
                variants={letterVariants}
                className="font-montserrat font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[0.24em] sm:tracking-[0.28em] text-foreground inline-block select-none leading-none"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Dynamic Signature Rule under PROSPER */}
          <motion.div
            custom={0.52}
            variants={underlineVariants}
            initial="hidden"
            animate="visible"
            style={{ transformOrigin: "left center" }}
            className="w-full h-1 sm:h-1.5 rounded-full bg-accent mt-2 sm:mt-3 shadow-[0_0_16px_rgba(59,130,246,0.65)]"
          />
        </div>

        {/* Tier 2: SHAIBU ASARE */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-9 gap-y-3 mt-4 sm:mt-6">
          {/* SHAIBU */}
          <div className="relative inline-flex flex-col items-center">
            <motion.div
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center overflow-hidden py-1"
            >
              {"SHAIBU".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-[0.26em] sm:tracking-[0.3em] text-foreground/90 inline-block select-none leading-none"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              custom={0.78}
              variants={underlineVariants}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: "left center" }}
              className="w-full h-0.5 sm:h-1 rounded-full bg-accent/90 mt-1.5 sm:mt-2 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
            />
          </div>

          {/* ASARE */}
          <div className="relative inline-flex flex-col items-center">
            <motion.div
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center overflow-hidden py-1"
            >
              {"ASARE".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-[0.26em] sm:tracking-[0.3em] text-foreground/90 inline-block select-none leading-none"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              custom={0.92}
              variants={underlineVariants}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: "left center" }}
              className="w-full h-0.5 sm:h-1 rounded-full bg-accent/90 mt-1.5 sm:mt-2 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
