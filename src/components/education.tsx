"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  Atom,
  Binary,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

interface EducationCardData {
  id: string;
  num: string;
  institution: string;
  credential: string;
  division: string;
  period: string;
  location: string;
  statusBadge: string;
  isCandidate?: boolean;
  icon: React.ElementType;
  overview: string;
  coreCurriculum: {
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
  keyCompetencies: string[];
}

const EDUCATION_DATA: EducationCardData[] = [
  {
    id: "ug-legon",
    num: "01",
    institution: "University of Ghana",
    credential: "B.Sc. in Information Technology",
    division: "Department of Computer Science • College of Basic & Applied Sciences",
    period: "2022 - 2026 (Expected)",
    location: "Accra, Legon",
    statusBadge: "Degree Candidate",
    isCandidate: true,
    icon: GraduationCap,
    overview:
      "Advanced undergraduate curriculum spanning distributed software architecture, relational database administration, computer network topologies, and full-stack software development.",
    coreCurriculum: [
      {
        title: "Software Engineering & System Architecture",
        description:
          "Object-oriented software design, modular architectures, design patterns, algorithmic complexity, and testing methodologies.",
        icon: Binary,
      },
      {
        title: "Database Modeling & Enterprise Administration",
        description:
          "Relational schema normalization, SQL optimization, ACID compliance, transaction safety, and persistent storage engineering.",
        icon: Layers,
      },
      {
        title: "Computer Networks & Client-Server Topologies",
        description:
          "OSI and TCP/IP stack layers, routing protocols, subnetting, socket communications, and server room infrastructure management.",
        icon: BookOpen,
      },
    ],
    keyCompetencies: [
      "Software Engineering",
      "Relational Databases",
      "Computer Networks",
      "System Architecture",
      "Linux Systems Admin",
      "Full-Stack Capstones",
    ],
  },
  {
    id: "kpando-shs",
    num: "02",
    institution: "Kpando Senior High School",
    credential: "General Science & Elective ICT",
    division: "Pure Science & Computing Track • Secondary Education",
    period: "Secondary Education",
    location: "Kpando, Volta Region",
    statusBadge: "Scientific & Computing Grounding",
    isCandidate: false,
    icon: Atom,
    overview:
      "Rigorous secondary science and computing education cultivating mathematical deduction, algorithm logic, empirical laboratory experimentation, and quantitative problem-solving foundations.",
    coreCurriculum: [
      {
        title: "Elective ICT & Computing Foundations",
        description:
          "Algorithmic logic, programming concepts, computer system architecture, relational database fundamentals, and digital information systems.",
        icon: Binary,
      },
      {
        title: "Elective Mathematics & Analytical Calculus",
        description:
          "Differential and integral calculus, mathematical logic, probability theory, vectors, and systematic quantitative deduction.",
        icon: Binary,
      },
      {
        title: "Physics & Circuit Theory",
        description:
          "Electromagnetism, digital logic gates, electrical mechanics, wave dynamics, and empirical energy systems.",
        icon: Atom,
      },
    ],
    keyCompetencies: [
      "Elective ICT",
      "Computing Principles",
      "Elective Mathematics",
      "Physics & Circuits",
      "Quantitative Deduction",
      "Empirical Methodology",
    ],
  },
];

export function Education() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardsY = useTransform(scrollYProgress, [0, 1], [22, -22]);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-16 sm:py-24 md:py-36 lg:py-44 border-t border-border relative overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3 flex items-center justify-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" /> Academic Foundations
          </h2>
          <TextMaskReveal
            as="h3"
            className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.12]"
          >
            Education &amp; Science
          </TextMaskReveal>
          <p className="font-dm text-sm sm:text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto mt-3 sm:mt-5">
            B.Sc. Information Technology studies at the University of Ghana, Legon, grounded in General Science foundations and Elective ICT from Kpando Senior High School.
          </p>
        </Reveal>

        {/* Modern Dual Academic Bento Cards with Parallax Depth */}
        <motion.div style={{ y: cardsY }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {EDUCATION_DATA.map((item, idx) => {
            const MainIcon = item.icon;
            return (
              <Reveal key={item.id} direction="up" delay={idx * 0.15}>
                <div className="h-full rounded-3xl bg-card border border-border p-5 sm:p-8 lg:p-12 hover:border-accent/50 transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden">
                  {/* Subtle Background Radial Warm Glow */}
                  <div className="absolute top-0 right-0 w-56 h-56 bg-accent/6 rounded-full blur-[90px] pointer-events-none group-hover:bg-accent/10 transition-colors" />

                  <div className="space-y-6">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                          <MainIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                            {item.statusBadge}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground block">
                            Milestone {item.num}
                          </span>
                        </div>
                      </div>

                      <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {item.period}
                      </span>
                    </div>

                    {/* Degree Title & Institution */}
                    <div className="space-y-1.5">
                      <h3 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight group-hover:text-accent transition-colors">
                        {item.credential}
                      </h3>
                      <h4 className="font-montserrat text-base sm:text-lg font-bold text-foreground/90 flex items-center gap-2">
                        {item.institution}
                        <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="font-mono text-xs text-muted-foreground">
                        {item.division}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono pt-1">
                        <MapPin className="w-3.5 h-3.5 text-accent/80" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Overview Paragraph */}
                    <p className="font-dm text-xs sm:text-sm md:text-[14.5px] text-muted-foreground/90 leading-relaxed pt-1">
                      {item.overview}
                    </p>

                    {/* Core Curriculum Blocks */}
                    <div className="space-y-3 pt-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-bold block">
                        Core Academic &amp; Empirical Focus
                      </span>
                      <div className="space-y-2.5">
                        {item.coreCurriculum.map((mod, mIdx) => {
                          const ModIcon = mod.icon;
                          return (
                            <div
                              key={mIdx}
                              className="p-3 sm:p-4 rounded-xl bg-secondary/50 border border-border/80 flex items-start gap-3"
                            >
                              <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent shrink-0 mt-0.5">
                                <ModIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-0.5">
                                <h5 className="font-montserrat font-bold text-xs sm:text-sm text-foreground">
                                  {mod.title}
                                </h5>
                                <p className="font-dm text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                                  {mod.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Skills / Competencies Chip Badges */}
                  <div className="pt-6 mt-6 border-t border-border/80">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold block mb-2.5">
                      Academic Competencies &amp; Methodologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.keyCompetencies.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border hover:border-accent/40 transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                          <span>{comp}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
