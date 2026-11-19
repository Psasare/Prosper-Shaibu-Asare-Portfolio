"use client";

import * as React from "react";
import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";
import { SplineScene } from "./spline-scene";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-border/80 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-foreground/80">
                Available for Engineering Roles & Collaborative Projects
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500">reliable software</span> & interactive experiences.
            </h1>

            {/* Intro Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Hi, I&apos;m <span className="font-semibold text-foreground">Prosper Shaibu Asare</span>. I engineer scalable web systems, intuitive interfaces, and dynamic interactive visuals built with speed and accessibility at their core.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md shadow-primary/20 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted/80 hover:border-primary/40 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Highlights ticker */}
            <div className="pt-6 border-t border-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" /> Full-Stack Engineering
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Spline 3D & Framer
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" /> Next.js & TypeScript
              </div>
            </div>
          </div>

          {/* Right Column: 3D Scene / Spline Showcase */}
          <div className="lg:col-span-5 h-[420px] sm:h-[460px] w-full flex items-center justify-center">
            <SplineScene className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
