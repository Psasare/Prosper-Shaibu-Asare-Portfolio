"use client";

import * as React from "react";
import { ArrowRight, Code2, Globe, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InteractiveCanvas3D } from "./interactive-canvas-3d";
import { RotatingWords } from "./animated-text";

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
    <section ref={sectionRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Parallax Ambient Radial Beam */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/8 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Text & CTA with Parallax */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-7 space-y-7 text-center lg:text-left z-10"
          >
            {/* Status Pill with Montserrat uppercase tracking */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-foreground">
                Available for Full-Stack, Web & Mobile Projects
              </span>
            </div>

            {/* Main Headline: Bold Montserrat with editorial serif accent, zero gradient text */}
            <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Full-Stack Engineering,{" "}
              <span className="font-serif italic font-normal text-accent">
                Web Designing
              </span>{" "}
              &{" "}
              <span className="text-foreground">
                Mobile Application Development
              </span>
              .
            </h1>

            {/* Intro Subtitle: Plus Jakarta Sans with dynamic rotating typography */}
            <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Hi, I&apos;m <span className="font-semibold text-foreground">Prosper Shaibu Asare</span>.
              I architect{" "}
              <RotatingWords
                words={[
                  "accessible, modern UI systems",
                  "reliable full-stack web platforms",
                  "performant React Native mobile apps",
                  "resilient healthcare IT architectures",
                ]}
              />
              , engineered for precision, speed, and real-world scale.
            </p>

            {/* Action Buttons with Montserrat font */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-card border border-border text-foreground font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-muted/70 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Highlights ticker */}
            <div className="pt-6 border-t border-border flex flex-wrap items-center justify-center lg:justify-start gap-6 font-montserrat text-xs text-muted-foreground font-semibold tracking-wide">
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
            className="lg:col-span-5 w-full flex items-center justify-center relative pointer-events-auto"
          >
            <InteractiveCanvas3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
