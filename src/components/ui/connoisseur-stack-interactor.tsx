"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export interface MenuItem {
  num: string;
  name: string;
  clipId?: string;
  image: string;
  subtitle?: string;
  period?: string;
  location?: string;
  description?: string[];
  skills?: string[];
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "University of Ghana",
    subtitle: "B.Sc. in Information Technology",
    period: "2022 - 2026 (Expected)",
    location: "Accra, Legon",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    description: [
      "Pursuing comprehensive advanced studies in software development methodologies, database administration, networking principles, and enterprise system architectures.",
      "Engineering full-stack web and mobile capstones, bridging dependable distributed backend logic with accessible, fluid user interfaces.",
      "Conducting practical laboratories across Linux systems administration, relational schema modeling, and client-server network topologies.",
    ],
    skills: ["Software Engineering", "Relational Databases", "Computer Networks", "System Architecture"],
  },
  {
    num: "02",
    name: "Kpando Senior High",
    subtitle: "General Science Foundations",
    period: "Secondary Education",
    location: "Kpando, Volta Region",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    description: [
      "Built rigorous quantitative problem-solving foundations through advanced coursework in elective mathematics, physics, and chemistry.",
      "Cultivated the disciplined scientific inquiry, empirical analysis, and structured computational thinking that directly underpin software engineering.",
      "Engaged in laboratory experimentation, data collection, and rigorous theoretical problem modeling.",
    ],
    skills: ["Elective Mathematics", "Physics", "Chemistry", "Quantitative Problem Solving"],
  },
];

/**
 * Apple-Minimalist Academic & Scientific Foundations Showcase
 *
 * Replaces gimmicky SVG clip-paths and burger templates with an executive,
 * architectural institution showcase featuring fluid transitions, dignified
 * typography, and high-resolution academic photography.
 */
export function ConnoisseurStackInteractor({
  items = defaultItems,
  className,
}: {
  items?: MenuItem[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items[activeIndex] || items[0];

  return (
    <div
      className={cn(
        "relative rounded-3xl bg-card border border-border p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl transition-all",
        className
      )}
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Institution Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-border/80">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.num + item.name}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  "px-4 sm:px-5 py-2.5 rounded-xl font-montserrat text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2.5",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                    : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span className="font-mono text-[11px] opacity-75">{item.num}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Counter */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-foreground font-bold">{currentItem.num}</span>
          <span>/</span>
          <span>0{items.length}</span>
        </div>
      </div>

      {/* Main Two-Column Architectural Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* LEFT COLUMN: Academic Details & Curriculum Highlights */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentItem.num}
              custom={direction}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Institution & Degree Title */}
              <div>
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-accent font-bold mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Degree Program</span>
                </div>
                <h3 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
                  {currentItem.name}
                </h3>
                {currentItem.subtitle && (
                  <p className="font-montserrat font-bold text-accent text-base sm:text-lg mt-1.5">
                    {currentItem.subtitle}
                  </p>
                )}
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {currentItem.period && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-mono text-foreground font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {currentItem.period}
                  </span>
                )}
                {currentItem.location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-mono text-foreground font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    {currentItem.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-xs font-montserrat uppercase tracking-wider text-accent font-bold">
                  <Award className="w-3.5 h-3.5" />
                  {activeIndex === 0 ? "Undergraduate Degree" : "Scientific Foundations"}
                </span>
              </div>

              {/* Structured Key Takeaways */}
              {currentItem.description && currentItem.description.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="font-montserrat text-xs uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-accent" /> Core Curriculum &amp; Research Focus
                  </p>
                  <ul className="space-y-3">
                    {currentItem.description.map((desc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Competencies Tag Cloud */}
              {currentItem.skills && currentItem.skills.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {currentItem.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-md bg-secondary/80 border border-border text-[11px] font-montserrat font-medium text-foreground tracking-wide"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-border/70">
            <div className="flex items-center gap-2">
              {items.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleSelect(dotIdx)}
                  aria-label={`Switch to ${items[dotIdx].name}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    activeIndex === dotIdx
                      ? "w-8 bg-accent"
                      : "w-2 bg-border hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous institution"
                className="p-2.5 rounded-xl bg-secondary border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next institution"
                className="p-2.5 rounded-xl bg-secondary border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Architectural Photography Showcase */}
        <div className="lg:col-span-6 relative w-full flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl lg:rounded-3xl overflow-hidden border border-border/80 bg-muted shadow-2xl group">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentItem.image}
                custom={direction}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentItem.image}
                  alt={currentItem.name}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent pointer-events-none" />

                {/* Floating Top Header Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-white/20 dark:border-white/10 text-[11px] font-montserrat uppercase tracking-wider text-foreground font-bold shadow-sm">
                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                    <span>{currentItem.name}</span>
                  </span>
                </div>

                {/* Bottom Glassmorphic Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10">
                  <div className="p-4 sm:p-5 rounded-2xl bg-card/85 backdrop-blur-md border border-border/80 shadow-lg flex items-center justify-between">
                    <div>
                      <div className="font-montserrat text-xs uppercase tracking-wider text-accent font-bold">
                        {currentItem.location}
                      </div>
                      <div className="font-montserrat text-sm sm:text-base font-extrabold text-foreground">
                        {currentItem.subtitle}
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      Verified
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Component = ConnoisseurStackInteractor;
