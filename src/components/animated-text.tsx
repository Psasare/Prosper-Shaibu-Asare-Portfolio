"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface TextMaskRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * Editorial Masked Typography Reveal:
 * Splits text into words or phrases and animates them upward from an overflow-hidden mask
 */
export function TextMaskReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "h2",
}: TextMaskRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const words = children.split(" ");

  return (
    <div ref={ref} className="overflow-hidden">
      <Component className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0 pb-1"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "115%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.04,
                ease: [0.22, 1, 0.36, 1], // Signature luxury editorial cubic-bezier
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    </div>
  );
}

/**
 * Infinite Typographic Architectural Marquee Ribbon:
 * Smooth, continuous horizontal gliding text alternating between solid and outlined typography
 */
export function TypographicMarquee() {
  const phrases = [
    "FULL-STACK ENGINEERING",
    "MODERN WEB DESIGN",
    "REACT NATIVE MOBILE APPS",
    "UHAS ADMINISTRATIVE COMPUTING",
    "NEXT.JS 16 & TYPESCRIPT",
    "HOSPITAL SYSTEMS INFRASTRUCTURE",
    "ACCRA & HO, GHANA",
    "HIGH-AVAILABILITY ARCHITECTURE",
  ];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-border/80 bg-card/60 backdrop-blur-xs select-none">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {/* Double array for seamless loop */}
        {[...phrases, ...phrases].map((phrase, idx) => {
          const isOutline = idx % 2 === 1;
          return (
            <div key={idx} className="flex items-center mx-6 sm:mx-8">
              <span
                className={`font-montserrat font-black text-sm sm:text-base md:text-lg uppercase tracking-[0.2em] transition-colors ${
                  isOutline
                    ? "text-transparent [-webkit-text-stroke:1px_var(--color-foreground)] opacity-70"
                    : "text-foreground"
                }`}
              >
                {phrase}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent ml-6 sm:ml-8" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/**
 * Dynamic Rotating Role Pill:
 * Smooth vertical morphing text element for hero and intros
 */
interface RotatingWordsProps {
  words: string[];
  className?: string;
}

export function RotatingWords({ words, className = "" }: RotatingWordsProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className={`inline-block relative overflow-hidden align-baseline ${className}`}>
      <motion.span
        key={index}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block text-accent font-semibold"
      >
        {words[index]}
      </motion.span>
    </span>
  );
}
