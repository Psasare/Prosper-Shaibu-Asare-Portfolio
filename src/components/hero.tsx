"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Code2, Globe, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RotatingWords } from "./animated-text";

const InteractiveCanvas3D = dynamic(
  () => import("./interactive-canvas-3d").then((mod) => mod.InteractiveCanvas3D),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full max-w-[700px] xl:max-w-[760px] min-h-[300px] sm:min-h-[420px] lg:h-[600px] xl:h-[640px] flex items-center justify-center select-none" />
    ),
  }
);

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms: creates high-end multi-plane depth as user scrolls
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="hero" ref={sectionRef} className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-36 overflow-hidden">
      {/* Parallax Ambient Radial Beam */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-accent/8 rounded-full blur-[130px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Column: Text & CTA with Parallax */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left z-10"
          >
            {/* Status Pill with JetBrains Mono uppercase tracking */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground">
                Available for Full-Stack, Web &amp; Mobile Projects
              </span>
            </div>

            {/* Main Headline: Bold Montserrat with editorial serif accent */}
            <h1 className="font-montserrat text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.18] sm:leading-[1.12]">
              Full-Stack Engineering,{" "}
              <span className="font-serif italic font-normal text-accent">
                Web Designing
              </span>{" "}
              &amp; Mobile Application Development.
            </h1>

            {/* Intro Subtitle: Bold, authoritative Georgia Pro Black editorial typography */}
            <p className="font-georgia font-black text-lg sm:text-2xl lg:text-[23px] text-foreground/90 max-w-2xl mx-auto lg:mx-0 leading-[1.65] sm:leading-relaxed tracking-tight">
              Hi, I&apos;m <span className="text-foreground">Prosper Shaibu Asare</span>.
              I architect{" "}
              <RotatingWords
                words={[
                  "accessible modern UI systems",
                  "performant React Native mobile apps",
                  "resilient full-stack web platforms",
                  "hospital network infrastructure",
                ]}
                className="font-georgia font-black italic text-accent border-b-2 border-accent/40 pb-0.5"
              />
              , engineered for precision, speed, and real-world scale.
            </p>

            {/* Action Buttons with Montserrat font */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-card border border-border text-foreground font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-muted/70 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Highlights ticker */}
            <div className="pt-5 sm:pt-6 border-t border-border flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 font-montserrat text-xs text-muted-foreground font-semibold tracking-wide">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" /> Full-Stack Engineering
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" /> Web Designing
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-accent" /> Mobile Application Development
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Articulation with Parallax */}
          <motion.div
            style={{ y: canvasY, scale: canvasScale }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex items-center justify-center relative pointer-events-auto overflow-visible"
          >
            <InteractiveCanvas3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
