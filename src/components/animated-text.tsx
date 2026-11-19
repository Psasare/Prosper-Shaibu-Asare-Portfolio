"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface TextMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Editorial Masked Typography Reveal:
 * Smoothly lifts text or structured elements upward from an overflow-hidden mask
 */
export function TextMaskReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "h2",
}: TextMaskRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (typeof children === "string") {
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
                  ease: [0.22, 1, 0.36, 1],
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

  return (
    <div ref={ref} className="overflow-hidden">
      <Component className={className}>
        <motion.span
          className="inline-block"
          initial={{ y: "105%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
          transition={{
            duration: 0.75,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.span>
      </Component>
    </div>
  );
}

/**
 * Editorial Dual-Type Heading:
 * Combines bold modernist sans-serif with literary editorial italic serif,
 * matching the signature styling seen on "Web Designing" in the hero headline.
 */
interface EditorialHeadingProps {
  eyebrow?: string;
  sansText: string;
  serifText: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function EditorialHeading({
  eyebrow,
  sansText,
  serifText,
  description,
  className = "",
  align = "center",
}: EditorialHeadingProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div ref={ref} className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3"
        >
          {eyebrow}
        </motion.div>
      )}

      <div className="overflow-hidden pb-1">
        <h3 className="font-montserrat text-3xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight text-foreground leading-[1.18]">
          <motion.span
            className="inline-block mr-2.5"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {sansText}
          </motion.span>
          <motion.span
            className="font-serif italic font-normal text-accent inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {serifText}
          </motion.span>
        </h3>
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/**
 * Infinite Typographic Architectural Marquee Ribbon:
 * Alternates between monolithic geometric uppercase and literary editorial serif italic
 */
export function TypographicMarquee() {
  const items = [
    { text: "FULL-STACK ENGINEERING", isSerif: false },
    { text: "Web Designing & UI Craft", isSerif: true },
    { text: "REACT NATIVE MOBILE SYSTEMS", isSerif: false },
    { text: "Accessible Digital Systems", isSerif: true },
    { text: "NEXT.JS 16 & TYPESCRIPT", isSerif: false },
    { text: "Hospital IT Infrastructure", isSerif: true },
    { text: "UHAS ADMINISTRATIVE COMPUTING", isSerif: false },
    { text: "University of Ghana Scholar", isSerif: true },
  ];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-border/80 bg-card/60 backdrop-blur-xs select-none">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {/* Double array for seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-5 sm:mx-7">
            {item.isSerif ? (
              <span className="font-serif italic font-normal text-accent text-base sm:text-lg md:text-xl tracking-normal">
                {item.text}
              </span>
            ) : (
              <span className="font-montserrat font-black text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] text-foreground">
                {item.text}
              </span>
            )}
            <span className="w-1.5 h-1.5 rounded-full bg-accent ml-5 sm:ml-7" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Dynamic Rotating Role Pill:
 * Smooth vertical morphing text element with locked baseline alignment
 * and editorial serif italic typography matching the "Web Designing" design style.
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
    }, 3200);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="inline-flex items-baseline align-baseline relative mx-1">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -7 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className={`font-serif italic font-normal text-accent inline-block whitespace-nowrap ${className}`}
      >
        {words[index]}
      </motion.span>
    </span>
  );
}
