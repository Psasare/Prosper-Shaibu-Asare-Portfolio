"use client";

import * as React from "react";
import Image from "next/image";
import { Layers, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "./icons";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

interface Project {
  title: string;
  badge?: string;
  description: string;
  tags: string[];
  category: "Full Stack / Mobile" | "Healthcare / Web" | "Academic Systems";
  image: string;
  githubUrl: string;
  liveUrl?: string;
  metric?: string;
}

export function Projects() {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");

  const projects: Project[] = [
    {
      title: "MindBridge - Mental Health Navigator",
      badge: "Final Year Capstone",
      description:
        "Cross-platform mental health navigation mobile application engineered for my University of Ghana final year capstone. Delivers self-guided clinical wellness assessments, mood tracking metrics, and accessible psychoeducational resources.",
      tags: ["TypeScript", "React Native", "Mobile UI", "Offline SQLite", "Mental Health"],
      category: "Full Stack / Mobile",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/Psasare/MindBridge-Mental-Health-Navigator-Mobile-App-Project",
      metric: "UG Capstone 2026",
    },
    {
      title: "Bloom Maternal Health App",
      badge: "Healthcare Digital Platform",
      description:
        "Community-centered maternal healthcare platform built to empower expecting mothers with localized prenatal milestone tracking, clinical appointment schedules, and curated wellness guidance.",
      tags: ["TypeScript", "Healthcare", "Web Platform", "Frontend Architecture", "REST APIs"],
      category: "Healthcare / Web",
      image: "https://images.unsplash.com/photo-1457342813143-a1ae27448a82?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/Ad-joa/Bloom-Maternal-Health-App",
      metric: "Clinical Healthcare",
    },
    {
      title: "Course Registration System",
      badge: "Academic Portal",
      description:
        "Institutional student enrollment and course management platform built with robust validation logic for prerequisite compliance, credit unit quotas, academic scheduling, and administrative oversight.",
      tags: ["TypeScript", "Academic Systems", "Database Design", "Authentication", "Validation Logic"],
      category: "Academic Systems",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/Psasare/Course-Registration-System",
      metric: "Prerequisites Engine",
    },
    {
      title: "Library Management System",
      badge: "Circulation & Assets",
      description:
        "Digital cataloging and library circulation platform streamlining book indexing, patron borrowing/return tracking, inventory control, and overdue fee audit logs.",
      tags: ["JavaScript", "Cataloging", "Database Management", "CRUD APIs", "Asset Tracking"],
      category: "Academic Systems",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/Psasare/Library-Management-System-",
      metric: "Inventory Logistics",
    },
  ];

  const categories = [
    "All",
    "Full Stack / Mobile",
    "Healthcare / Web",
    "Academic Systems",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-28 md:py-36 lg:py-44 border-t border-border relative">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <Reveal direction="up">
            <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" /> Featured Work
            </h2>
            <TextMaskReveal
              as="h3"
              className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.12]"
            >
              Projects &amp; Engineering Cases
            </TextMaskReveal>
            <p className="font-dm text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-xl mt-4">
              Production applications, healthcare platforms, and institutional portals engineered with TypeScript, React Native, and resilient system architectures.
            </p>
          </Reveal>

          {/* Filter Pills with JetBrains Mono font */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid with Rich Image Cards */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-14">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                key={project.title}
                className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden hover:border-accent/50 hover:shadow-2xl transition-all duration-500"
              >
                {/* Project Image Banner */}
                <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle edge fade into card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Project Body */}
                <div className="p-8 sm:p-10 lg:p-12 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Top Badges & Metric Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat text-[11px] font-bold px-3 py-1 rounded-full bg-secondary border border-border text-foreground">
                          {project.category}
                        </span>
                        {project.badge && (
                          <span className="font-montserrat text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/25">
                            {project.badge}
                          </span>
                        )}
                      </div>
                      {project.metric && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground font-bold px-2.5 py-1 rounded-md bg-secondary border border-border">
                          {project.metric}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer shadow-2xs"
                          aria-label={`View ${project.title} on GitHub`}
                          title="View Source on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-accent text-white hover:opacity-90 transition-all cursor-pointer shadow-2xs"
                            aria-label={`Visit Live Demo of ${project.title}`}
                            title="Visit Live Demo"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="font-dm text-sm sm:text-[14.5px] text-muted-foreground/85 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/80">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
