"use client";

import * as React from "react";
import Image from "next/image";
import { Briefcase, Calendar, MapPin, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

interface ExperienceItem {
  id: string;
  num: string;
  role: string;
  organization: string;
  shortOrg: string;
  period: string;
  location: string;
  image: string;
  badge: string;
  description: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "volta-regional",
    num: "01",
    role: "Information Technology Intern",
    organization: "Volta Regional Hospital",
    shortOrg: "Volta Regional Hosp. (Hohoe)",
    period: "Oct 2025 - Dec 2025",
    location: "Hohoe, Volta Region",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    badge: "Clinical Infrastructure",
    description: [
      "Administered the hospital Local Area Network (LAN) to ensure continuous connectivity and uninterrupted uptime across clinical wards and administrative units.",
      "Diagnosed and resolved critical hardware and software faults across medical workstations, network switches, and peripheral devices.",
      "Conducted digital literacy training sessions for healthcare personnel, improving their proficiency with modern office software and digital records.",
    ],
    skills: ["Hospital LAN", "Hardware Diagnostics", "Switch Configuration", "Clinical Staff IT Training", "System Uptime"],
  },
  {
    id: "ho-teaching",
    num: "02",
    role: "Information Technology Intern",
    organization: "Ho Teaching Hospital (Trafalgar)",
    shortOrg: "Ho Teaching (Trafalgar)",
    period: "Sep 2024 - Dec 2024",
    location: "Ho, Volta Region",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    badge: "Enterprise Networks",
    description: [
      "Supported the deployment, installation, and network configuration of hospital workstations and clinical communications infrastructure.",
      "Maintained IT asset documentation, assisted in standardizing technical procedures, and performed preventive maintenance on server room cooling and power systems.",
      "Collaborated with senior systems administrators on diagnostic auditing across departmental networks.",
    ],
    skills: ["Workstation Deployment", "Clinical Infrastructure", "Server Room Cooling", "IT Asset Tracking", "Preventive Maintenance"],
  },
  {
    id: "solidere",
    num: "03",
    role: "Customer Operations & Support",
    organization: "Solidere Ghana Limited (PremierBet Ghana)",
    shortOrg: "Solidere Ghana (PremierBet)",
    period: "Jan 2022 - Jan 2023",
    location: "Adabraka, Accra",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    badge: "Operations & Support",
    description: [
      "Provided responsive, client-centered assistance across digital chat, telephone, email, and direct in-person inquiries with consistent satisfaction ratings.",
      "Facilitated account verifications, processed transaction workflows accurately, and maintained structured documentation within collaborative shift teams.",
      "Escalated software and payment gateway anomalies directly to platform engineering leads.",
    ],
    skills: ["Customer Operations", "Account Verification", "Transaction Processing", "Cross-Shift Collaboration", "Issue Escalation"],
  },
];

export function Experience() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === EXPERIENCES.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? EXPERIENCES.length - 1 : prev - 1));
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const current = EXPERIENCES[currentIndex];

  return (
    <section id="experience" className="py-28 md:py-36 lg:py-44 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3 flex items-center justify-center gap-2">
            <Briefcase className="w-3.5 h-3.5" /> Career Journey
          </h2>
          <TextMaskReveal
            as="h3"
            className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight"
          >
            Work Experience
          </TextMaskReveal>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5">
            Hands-on systems administration, hospital LAN engineering at Volta Regional Hospital (Hohoe) and Ho Teaching Hospital (Trafalgar), and customer operations in Accra.
          </p>
        </Reveal>

        {/* Milestone Quick Selector Tabs */}
        <Reveal direction="up" delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {EXPERIENCES.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => handleSelect(idx)}
                className={`px-4 py-2 rounded-xl font-montserrat text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${currentIndex === idx
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <span className="font-mono text-[10px] opacity-75">{exp.num}</span>
                <span>{exp.shortOrg}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Main Experience Showcase Carousel */}
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
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]"
              >
                {/* LEFT COLUMN: Role Details & Achievements */}
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8">
                  <div>
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20">
                        {current.badge} &bull; MILESTONE {current.num}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {current.period}
                      </span>
                    </div>

                    {/* Role Title & Organization */}
                    <h3 className="font-montserrat text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-1">
                      {current.role}
                    </h3>
                    <h4 className="font-montserrat text-lg font-bold text-accent mb-3 flex items-center gap-2">
                      {current.organization}
                    </h4>

                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans mb-6">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{current.location}</span>
                    </div>

                    {/* Accomplishment Bullet Points */}
                    <div className="space-y-3 pt-2 border-t border-border/80">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                        KEY CONTRIBUTIONS & IMPACT
                      </span>
                      <ul className="space-y-2.5">
                        {current.description.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Skills Pill Tags */}
                  <div className="pt-4 border-t border-border/80">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold block mb-2">
                      CORE DOMAINS & TECHNOLOGIES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {current.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: High-Resolution Contextual Image */}
                <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-border bg-neutral-950 group">
                  <Image
                    src={current.image}
                    alt={current.organization}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Natural Vignette Edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Bottom Control Bar */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-4 bg-muted/60 border-t border-border">
              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {EXPERIENCES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => handleSelect(dotIdx)}
                    aria-label={`Go to milestone ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === dotIdx
                      ? "w-8 bg-accent"
                      : "w-2 bg-border hover:bg-muted-foreground/40"
                      }`}
                  />
                ))}
              </div>

              {/* Counter & Arrows */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  0{currentIndex + 1} / 0{EXPERIENCES.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous experience"
                    className="p-2 rounded-xl bg-card border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next experience"
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
