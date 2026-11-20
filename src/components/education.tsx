"use client";

import * as React from "react";
import Image from "next/image";
import { GraduationCap, Calendar, MapPin, ChevronLeft, ChevronRight, CheckCircle2, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

interface EducationItem {
  id: string;
  num: string;
  degree: string;
  institution: string;
  shortOrg: string;
  period: string;
  location: string;
  image: string;
  badge: string;
  description: string[];
  coursework: string[];
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: "ug-legon",
    num: "01",
    degree: "B.Sc. in Information Technology",
    institution: "University of Ghana",
    shortOrg: "University of Ghana, Legon",
    period: "2022 - 2026 (Expected)",
    location: "Legon, Accra",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    badge: "Undergraduate Degree",
    description: [
      "Pursuing comprehensive advanced studies in software development methodologies, database administration, networking principles, and enterprise system architectures.",
      "Engineering full-stack capstone applications including MindBridge Mental Health Navigator, combining resilient backend APIs with accessible mobile interfaces.",
      "Conducting practical laboratories across Linux systems administration, relational schema modeling, and client-server network topologies.",
    ],
    coursework: [
      "Software Engineering",
      "Relational Databases",
      "Computer Networks",
      "Systems Architecture",
      "Data Structures & Algorithms",
      "Web Technologies",
    ],
  },
  {
    id: "kpando-shs",
    num: "02",
    degree: "General Science Foundations",
    institution: "Kpando Senior High School",
    shortOrg: "Kpando Senior High",
    period: "Secondary Education",
    location: "Kpando, Volta Region",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    badge: "Scientific Foundations",
    description: [
      "Built rigorous quantitative problem-solving foundations through advanced coursework in physics, elective mathematics, and chemistry.",
      "Cultivated the disciplined scientific inquiry, empirical analysis, and structured computational thinking that directly underpin my software architecture practice.",
      "Engaged in laboratory experimentation, data collection, and rigorous theoretical modeling.",
    ],
    coursework: [
      "Elective Mathematics",
      "Physics Mechanics & Electronics",
      "Chemistry",
      "Analytical Problem Solving",
      "Scientific Inquiry",
    ],
  },
];

export function Education() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === EDUCATION_DATA.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? EDUCATION_DATA.length - 1 : prev - 1));
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const current = EDUCATION_DATA[currentIndex];

  return (
    <section id="education" className="py-24 md:py-28 border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3 flex items-center justify-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" /> Academic Background
          </h2>
          <TextMaskReveal
            as="h3"
            className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight"
          >
            Education & Science
          </TextMaskReveal>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5">
            B.Sc. Information Technology studies at the University of Ghana, Legon, anchored by rigorous General Science foundations from Kpando Senior High School.
          </p>
        </Reveal>

        {/* Institution Quick Selector Tabs */}
        <Reveal direction="up" delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {EDUCATION_DATA.map((edu, idx) => (
              <button
                key={edu.id}
                onClick={() => handleSelect(idx)}
                className={`px-4 py-2 rounded-xl font-montserrat text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  currentIndex === idx
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{edu.num}</span>
                <span>{edu.shortOrg}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Main Education Showcase Carousel */}
        <Reveal direction="up" delay={0.2}>
          <div className="relative rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]"
              >
                {/* LEFT COLUMN: Academic Details */}
                <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20">
                        {current.badge} &bull; 0{currentIndex + 1} OF 0{EDUCATION_DATA.length}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {current.period}
                      </span>
                    </div>

                    {/* Degree & Institution */}
                    <h3 className="font-montserrat text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-1">
                      {current.degree}
                    </h3>
                    <h4 className="font-montserrat text-lg font-bold text-accent mb-3 flex items-center gap-2">
                      {current.institution}
                    </h4>

                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans mb-6">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{current.location}</span>
                    </div>

                    {/* Core Academic Foundations */}
                    <div className="space-y-3 pt-2 border-t border-border/80">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                        CURRICULUM & ACADEMIC HIGHLIGHTS
                      </span>
                      <ul className="space-y-2.5">
                        {current.description.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Coursework Tags */}
                  <div className="pt-4 border-t border-border/80">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold block mb-2">
                      CORE SUBJECTS & PROFICIENCIES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {current.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Campus & Science Laboratory Imagery */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-border bg-neutral-950">
                  <Image
                    src={current.image}
                    alt={current.institution}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/20 lg:to-transparent" />

                  {/* Overlay Badge at Bottom */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span className="font-montserrat font-bold text-xs uppercase tracking-wider">
                        {current.institution}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-white/80 leading-normal">
                      Rigorous analytical training, computer science foundations, and scientific methodology.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Bottom Control Bar */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-4 bg-muted/60 border-t border-border">
              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {EDUCATION_DATA.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => handleSelect(dotIdx)}
                    aria-label={`Go to education item ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === dotIdx
                        ? "w-8 bg-accent"
                        : "w-2 bg-border hover:bg-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>

              {/* Counter & Arrows */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  0{currentIndex + 1} / 0{EDUCATION_DATA.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous education milestone"
                    className="p-2 rounded-xl bg-card border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next education milestone"
                    className="p-2 rounded-xl bg-card border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
