"use client";

import * as React from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";

interface TextMaskRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Editorial Masked Typography Reveal:
 * Splits text into words and lifts each word smoothly from an overflow-hidden mask
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

/**
 * Infinite Typographic Architectural Marquee Ribbon:
 * Rich rhythmic typography showcasing varied styles:
 * 1. Bold Solid Display Sans
 * 2. Outlined Geometric Stroke Text
 * 3. Monospace Precision HUD Tag
 * 4. Literary Editorial Serif Italic
 */
export function TypographicMarquee() {
  const marqueeItems = [
    { text: "FULL-STACK ENGINEERING", type: "solid" },
    { text: "Web Designing & Craft", type: "serif" },
    { text: "CROSS-PLATFORM MOBILE", type: "outline" },
    { text: "[ NEXT.JS 16 // TYPESCRIPT ]", type: "mono" },
    { text: "HEALTHCARE SYSTEMS ARCHITECTURE", type: "solid" },
    { text: "Accessible UI Systems", type: "serif" },
    { text: "HOSPITAL NETWORK INFRASTRUCTURE", type: "outline" },
    { text: "[ UG LEGON // IT UNDERGRADUATE ]", type: "mono" },
  ];

  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const baseX = React.useRef(0);

  // Scroll velocity reactive tracking
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  React.useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();
    const baseSpeed = 0.024; // base speed percentage per ms

    const loop = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      const vel = smoothVelocity.get();
      // Calculate dynamic acceleration based on page scroll velocity
      const velocityFactor = Math.min(Math.abs(vel) * 0.0007, 0.12);
      const totalSpeed = baseSpeed + velocityFactor;

      baseX.current -= totalSpeed * dt * 0.05;
      if (baseX.current <= -50) {
        baseX.current += 50;
      }

      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `translate3d(${baseX.current.toFixed(3)}%, 0, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [smoothVelocity]);

  return (
    <div className="relative w-full overflow-hidden py-8 sm:py-9 border-y border-border/80 bg-card/60 backdrop-blur-xs select-none">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={marqueeRef}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center mx-5 sm:mx-8">
            {item.type === "solid" && (
              <span className="font-montserrat font-black text-xs sm:text-sm md:text-base uppercase tracking-[0.24em] text-foreground">
                {item.text}
              </span>
            )}
            {item.type === "outline" && (
              <span className="font-montserrat font-black text-xs sm:text-sm md:text-base uppercase tracking-[0.24em] text-transparent [-webkit-text-stroke:1.2px_currentColor] opacity-75">
                {item.text}
              </span>
            )}
            {item.type === "serif" && (
              <span className="font-serif italic font-normal text-accent text-base sm:text-lg md:text-xl tracking-normal">
                {item.text}
              </span>
            )}
            {item.type === "mono" && (
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-accent font-bold px-2.5 py-0.5 rounded-md border border-accent/30 bg-accent/10">
                {item.text}
              </span>
            )}
            <span className="w-1.5 h-1.5 rounded-full bg-accent ml-5 sm:ml-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Dynamic Rotating Role Pill:
 * Smooth vertical morphing text element with locked baseline alignment
 * and natural matching sans typography, completely aligned with surrounding sentence.
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
    }, 3400);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <motion.span
      layout="position"
      transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className="inline-flex relative items-baseline align-baseline mx-1 overflow-visible"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`border-b border-accent/40 pb-0.5 inline-block whitespace-nowrap ${className || "font-serif italic font-normal text-accent"}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
