"use client";

import * as React from "react";
import Image from "next/image";
import { Server, Code2, Users2, Smartphone, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

interface PillarItem {
  id: string;
  num: string;
  title: string;
  category: string;
  icon: React.ElementType;
  image: string;
  summary: string;
  highlights: string[];
}

const PILLARS: PillarItem[] = [
  {
    id: "infra",
    num: "01",
    title: "Infrastructure & Systems",
    category: "Hardware & Networks",
    icon: Server,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    summary: "Hands-on experience administering hospital Local Area Networks (LANs), configuring server rooms, diagnosing workstation faults, and engineering high-availability topologies.",
    highlights: ["Hospital Clinical LANs", "Workstation Diagnostics", "Network Switch Uptime", "Preventive Maintenance"],
  },
  {
    id: "fullstack",
    num: "02",
    title: "Full-Stack Architecture",
    category: "Modern Web Engineering",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    summary: "Architecting resilient, type-safe web applications using Next.js 16, TypeScript, structured database schemas, and microservice integration patterns.",
    highlights: ["Next.js 16 App Router", "PostgreSQL & Prisma", "REST & GraphQL APIs", "Scalable System Design"],
  },
  {
    id: "mobile",
    num: "03",
    title: "Mobile UI & Performance",
    category: "Cross-Platform Mobile",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    summary: "Crafting fluid cross-platform mobile experiences with React Native, emphasizing 60 FPS gesture responsiveness, offline-first synchronization, and accessible design.",
    highlights: ["React Native & Expo", "Offline-First SQLite Sync", "Fluid 60 FPS Gestures", "WCAG Accessible UI"],
  },
  {
    id: "people",
    num: "04",
    title: "Healthcare Systems & People",
    category: "Operations & Training",
    icon: Users2,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    summary: "Shaped by customer operations and healthcare staff IT training at Volta Regional Hospital and Ho Teaching Hospital, ensuring complex software serves real human needs.",
    highlights: ["Medical Staff IT Training", "Operational Documentation", "Cross-Shift Collaboration", "Empathetic Human UX"],
  },
];

export function About() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [activePillar, setActivePillar] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bioY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const handleNext = () => {
    setDirection(1);
    setActivePillar((prev) => (prev === PILLARS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActivePillar((prev) => (prev === 0 ? PILLARS.length - 1 : prev - 1));
  };

  const current = PILLARS[activePillar];
  const Icon = current.icon;

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-28 border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Bio text narrative */}
          <motion.div style={{ y: bioY }} className="lg:col-span-6 space-y-7">
            <Reveal direction="up">
              <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> About Me
              </h2>
              <TextMaskReveal
                as="h3"
                className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-[1.2]"
              >
                Bridging dependable infrastructure with modern software engineering.
              </TextMaskReveal>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
                I am an analytical, driven, and detail-oriented <span className="font-semibold text-foreground">Information Technology undergraduate</span> at the <span className="font-semibold text-foreground">University of Ghana, Legon</span>, with comprehensive experience across technology infrastructure, full-stack software development, and systems administration.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.22}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                Grounded in General Science foundations from Kpando Senior High, my journey bridges physical technology infrastructure with modern software engineering. Having administered hospital Local Area Networks (LANs), resolved critical hardware and software faults across medical workstations, and trained personnel at <span className="text-foreground font-medium">Volta Regional Hospital (Hohoe)</span> and <span className="text-foreground font-medium">Ho Teaching Hospital (Trafalgar)</span>, I build software with deep respect for uptime, data accuracy, and user experience.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.28}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether deploying university academic platforms, architecting healthcare digital companions, or crafting mobile wellness tools, my objective is simple: engineering resilient software that solves genuine everyday challenges.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.34}>
              <div className="pt-3 flex flex-wrap gap-2.5 font-montserrat text-xs font-semibold text-foreground">
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  BSc. IT Undergraduate &bull; 2026 (UG Legon)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  Volta Regional Hospital &bull; IT Intern
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  Ho Teaching Hospital (Trafalgar) &bull; Systems & Network
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  General Science &bull; Kpando SHS
                </span>
              </div>
            </Reveal>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Engineering Pillars Carousel */}
          <div className="lg:col-span-6">
            <Reveal direction="up" delay={0.2}>
              <div className="relative rounded-3xl bg-card border border-border overflow-hidden p-6 sm:p-8 shadow-xl">
                {/* Carousel Header Controls */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold block">
                      CORE CRAFT // PILLAR {current.num} OF 04
                    </span>
                    <h4 className="font-montserrat font-bold text-lg text-foreground mt-0.5">
                      Engineering Foundations
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous pillar"
                      className="p-2 rounded-xl bg-secondary border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next pillar"
                      className="p-2 rounded-xl bg-secondary border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Animated Carousel Card Content */}
                <div className="relative min-h-[360px] flex flex-col justify-between">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current.id}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="space-y-5"
                    >
                      {/* Image Preview Banner */}
                      <div className="relative h-44 rounded-2xl overflow-hidden border border-border/80 group">
                        <Image
                          src={current.image}
                          alt={current.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-4 z-10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/25 backdrop-blur-md border border-accent/40 flex items-center justify-center text-accent">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-accent uppercase tracking-wider block font-bold">
                                {current.category}
                              </span>
                              <h5 className="font-montserrat font-extrabold text-base text-white">
                                {current.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Summary Text */}
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {current.summary}
                      </p>

                      {/* Highlights Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {current.highlights.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border/80"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Progress Dots & Selector Thumbnails */}
                  <div className="flex items-center justify-between pt-6 border-t border-border/60 mt-4">
                    <div className="flex items-center gap-2">
                      {PILLARS.map((p, dotIdx) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setDirection(dotIdx > activePillar ? 1 : -1);
                            setActivePillar(dotIdx);
                          }}
                          aria-label={`Go to pillar ${p.num}`}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            activePillar === dotIdx
                              ? "w-8 bg-accent"
                              : "w-2 bg-border hover:bg-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-muted-foreground font-semibold">
                      0{activePillar + 1} / 0{PILLARS.length}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
