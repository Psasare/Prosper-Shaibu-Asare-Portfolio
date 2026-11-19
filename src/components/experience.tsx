"use client";

import * as React from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";

interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  shortOrg: string;
  description: string[];
  type: "work" | "education";
}

export function Experience() {
  const timeline: TimelineItem[] = [
    {
      id: "kpando",
      period: "Secondary Education",
      role: "General Science",
      organization: "Kpando Senior High School",
      shortOrg: "Kpando SHS",
      location: "Kpando, Volta Region",
      description: [
        "Built rigorous analytical and quantitative problem-solving foundations through advanced coursework in physics, elective mathematics, and chemistry.",
        "Cultivated the scientific curiosity, disciplined inquiry, and computational thinking that underpin my approach to software engineering.",
      ],
      type: "education",
    },
    {
      id: "solidere",
      period: "Jan 2022 - Jan 2023",
      role: "Customer Operations & Support",
      organization: "Solidere Ghana Limited (PremierBet Ghana)",
      shortOrg: "Solidere Ghana",
      location: "Farrar Avenue, Adabraka Accra",
      description: [
        "Provided responsive, client-centered assistance across digital chat, telephone, email, and direct in-person inquiries with consistent satisfaction ratings.",
        "Facilitated account verifications, processed transaction workflows accurately, and maintained structured documentation within collaborative shift teams.",
      ],
      type: "work",
    },
    {
      id: "ug-legon",
      period: "2022 - 2026 (Expected)",
      role: "B.Sc. in Information Technology",
      organization: "University of Ghana",
      shortOrg: "UG Legon",
      location: "Accra, Legon",
      description: [
        "Pursuing advanced studies in software development, relational database administration, computer network engineering, and system architectures.",
        "Applying modern software engineering principles to full-stack web and mobile application projects, combining backend logic with accessible interface design.",
      ],
      type: "education",
    },
    {
      id: "ho-teaching",
      period: "Sep 2024 - Dec 2024",
      role: "Information Technology Intern",
      organization: "Ho Teaching Hospital",
      shortOrg: "Ho Teaching Hosp.",
      location: "Ho, Ghana",
      description: [
        "Supported the deployment, installation, and network configuration of hospital workstations and clinical communications infrastructure.",
        "Maintained IT asset documentation, assisted in standardizing technical procedures, and performed preventive maintenance on server room cooling and power systems.",
      ],
      type: "work",
    },
    {
      id: "volta-regional",
      period: "Oct 2025 - Dec 2025",
      role: "Information Technology Intern",
      organization: "Volta Regional Hospital",
      shortOrg: "Volta Regional Hosp.",
      location: "Hohoe, Ghana",
      description: [
        "Administered the hospital Local Area Network (LAN) to ensure continuous connectivity and uninterrupted uptime across clinical wards and administrative units.",
        "Diagnosed and resolved critical hardware and software faults across medical workstations, network switches, and peripheral devices.",
        "Conducted digital literacy training sessions for healthcare personnel, improving their proficiency with modern office software and digital records.",
      ],
      type: "work",
    },
    {
      id: "uhas",
      period: "Nov 2026 - Oct 2027 (Expected)",
      role: "National Service Personnel - Administrative Computing",
      organization: "University of Health and Allied Sciences (UHAS) - ICT Directorate",
      shortOrg: "UHAS ICT Directorate",
      location: "Ho, Ghana",
      description: [
        "Entrusted with the maintenance, support, and ongoing evolution of university administrative information systems, ERP platforms, and central databases.",
        "Collaborating with academic and administrative stakeholders to evaluate functional requirements, optimize digital workflows, and guarantee institutional data accuracy.",
        "Participating in cross-system integration, quality assurance, performance monitoring, and security management to uphold high-availability enterprise services.",
      ],
      type: "work",
    },
  ];

  const [activeFilter, setActiveFilter] = React.useState<"all" | "work" | "education">("all");
  const [currentIndex, setCurrentIndex] = React.useState(timeline.length - 1); // Default to apex enterprise milestone (UHAS)
  const [direction, setDirection] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<"slide" | "list">("slide");

  const filteredItems = React.useMemo(() => {
    if (activeFilter === "all") return timeline;
    return timeline.filter((item) => item.type === activeFilter);
  }, [activeFilter, timeline]);

  // Keep index in bounds when filter changes
  React.useEffect(() => {
    setCurrentIndex(filteredItems.length - 1);
  }, [filteredItems]);

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = filteredItems.length - 1;
      if (next >= filteredItems.length) next = 0;
      return next;
    });
  };

  const handleSelectIndex = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation when hovering or focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") paginate(-1);
    if (e.key === "ArrowRight") paginate(1);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="experience" className="py-24 md:py-28 border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3">
            Career Journey & Milestones
          </h2>
          <p className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight">
            Experience & Education
          </p>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-5 sm:mt-6">
            A curated timeline of analytical science foundations, hospital systems engineering, University of Ghana studies, and administrative computing at UHAS.
          </p>
        </Reveal>

        {/* Filter & View Mode Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-4xl mx-auto">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card border border-border shadow-xs">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Milestones ({timeline.length})
            </button>
            <button
              onClick={() => setActiveFilter("work")}
              className={`px-3.5 py-1.5 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === "work"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Work & Clinical (4)
            </button>
            <button
              onClick={() => setActiveFilter("education")}
              className={`px-3.5 py-1.5 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === "education"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Education (2)
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "slide" ? "list" : "slide")}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card border border-border text-foreground hover:border-accent font-montserrat text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              title="Toggle between Interactive Slider and Full List"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
              <span>{viewMode === "slide" ? "View Full List" : "Interactive Slider"}</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: INTERACTIVE SLIDER STAGE (Compact, Zero Infinite Scroll) */}
        {viewMode === "slide" ? (
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="max-w-4xl mx-auto focus:outline-none"
            aria-label="Interactive timeline slider. Use left and right arrow keys to navigate."
          >
            {/* Horizon Timeline Stepper Bar */}
            <div className="relative mb-8 px-2 sm:px-6">
              {/* Connecting Rail */}
              <div className="absolute top-1/2 left-4 right-4 sm:left-8 sm:right-8 -translate-y-1/2 h-1 bg-border rounded-full -z-0" />

              {/* Steps */}
              <div className="relative z-10 flex items-center justify-between">
                {filteredItems.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  const isPassed = idx < currentIndex;
                  const isWork = item.type === "work";

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectIndex(idx)}
                      className="group flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                      {/* Node Circle */}
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                          isActive
                            ? "bg-accent text-accent-foreground border-accent scale-110 shadow-md ring-4 ring-accent/20"
                            : isPassed
                            ? "bg-card text-accent border-accent hover:scale-105"
                            : "bg-card text-muted-foreground border-border hover:border-accent hover:text-foreground"
                        }`}
                      >
                        {isWork ? (
                          <Briefcase className="w-4 h-4" />
                        ) : (
                          <GraduationCap className="w-4 h-4" />
                        )}
                      </div>

                      {/* Label under node (responsive) */}
                      <span
                        className={`hidden sm:block mt-2 font-montserrat text-[11px] font-bold tracking-tight max-w-[100px] text-center truncate transition-colors ${
                          isActive
                            ? "text-foreground font-black"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {item.shortOrg}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Active Milestone Card (Slide Stage) */}
            <div className="relative min-h-[380px] sm:min-h-[340px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -100) paginate(1);
                    if (swipe > 100) paginate(-1);
                  }}
                  className="w-full p-7 sm:p-9 md:p-10 rounded-2xl border border-border bg-card shadow-md relative overflow-hidden"
                >
                  {/* Subtle Accent Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

                  {/* Header Meta: Period, Location, Badge & Step Counter */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-border/80 pb-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 font-montserrat text-xs font-bold px-3 py-1 rounded-lg bg-secondary text-secondary-foreground border border-border">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {activeItem.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-foreground px-2.5 py-1">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {activeItem.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-montserrat text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/25">
                        {activeItem.type === "work" ? "Professional Systems" : "Academic Degree"}
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground ml-1">
                        {String(currentIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Role Title & Organization */}
                  <div className="mb-6 relative z-10">
                    <h3 className="font-montserrat font-black text-xl sm:text-2xl text-foreground mb-1 leading-tight">
                      {activeItem.role}
                    </h3>
                    <p className="font-montserrat text-sm sm:text-base font-bold text-accent">
                      {activeItem.organization}
                    </p>
                  </div>

                  {/* Detailed Accomplishments */}
                  <ul className="space-y-3 font-sans text-sm sm:text-base text-muted-foreground leading-relaxed relative z-10">
                    {activeItem.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-foreground/90 font-normal">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Bar: Prev / Dots / Next */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/80">
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-foreground hover:border-accent hover:text-accent font-montserrat text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Milestone</span>
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {filteredItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === currentIndex
                        ? "w-8 bg-accent"
                        : "w-2 bg-border hover:bg-muted-foreground/60"
                    }`}
                    aria-label={`Go to milestone ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => paginate(1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-foreground hover:border-accent hover:text-accent font-montserrat text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                <span className="hidden sm:inline">Next Milestone</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* VIEW 2: EXPANDED COMPACT TIMELINE (All 6 displayed cleanly side-by-side) */
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item, index) => {
              const isWork = item.type === "work";
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-accent/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 font-montserrat text-xs font-bold px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
                        <Calendar className="w-3 h-3 text-accent" />
                        {item.period}
                      </span>
                      <span className="font-montserrat text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/25">
                        {isWork ? "Work" : "Education"}
                      </span>
                    </div>

                    <h3 className="font-montserrat font-bold text-base text-foreground mb-1">
                      {item.role}
                    </h3>
                    <p className="font-montserrat text-xs font-semibold text-accent mb-3">
                      {item.organization}
                    </p>

                    <ul className="space-y-2 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-montserrat text-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent" />
                      {item.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
