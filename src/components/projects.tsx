"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "./icons";
import { Reveal } from "./reveal";

interface Project {
  title: string;
  badge?: string;
  description: string;
  tags: string[];
  category: "Full Stack / Mobile" | "Healthcare / Web" | "Academic Systems";
  githubUrl: string;
  liveUrl?: string;
}

export function Projects() {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");

  const projects: Project[] = [
    {
      title: "MindBridge - Mental Health Navigator",
      badge: "Final Year Project",
      description:
        "Cross-platform mental health navigation mobile application engineered for my University of Ghana final year capstone. Delivers self-guided clinical wellness assessments, mood tracking metrics, and accessible psychoeducational resources.",
      tags: ["TypeScript", "React Native", "Mobile UI", "Mental Health", "State Management"],
      category: "Full Stack / Mobile",
      githubUrl: "https://github.com/Psasare/MindBridge-Mental-Health-Navigator-Mobile-App-Project",
    },
    {
      title: "Bloom Maternal Health App",
      badge: "Healthcare Collaboration",
      description:
        "Community-centered maternal healthcare digital platform built to empower expecting mothers with localized prenatal milestone tracking, clinical appointment schedules, and curated wellness guidance.",
      tags: ["TypeScript", "Healthcare", "Web Platform", "Frontend Architecture", "REST APIs"],
      category: "Healthcare / Web",
      githubUrl: "https://github.com/Ad-joa/Bloom-Maternal-Health-App",
    },
    {
      title: "Course Registration System",
      badge: "Academic Portal",
      description:
        "Institutional student enrollment and course management platform built with robust validation logic for prerequisite compliance, credit unit quotas, academic scheduling, and administrative oversight.",
      tags: ["TypeScript", "Academic Systems", "Database Design", "Authentication", "Validation Logic"],
      category: "Academic Systems",
      githubUrl: "https://github.com/Psasare/Course-Registration-System",
    },
    {
      title: "Library Management System",
      badge: "Circulation & Assets",
      description:
        "Digital cataloging and library circulation platform streamlining book indexing, patron borrowing/return tracking, inventory control, and overdue fee audit logs.",
      tags: ["JavaScript", "Cataloging", "Database Management", "CRUD APIs", "Asset Tracking"],
      category: "Academic Systems",
      githubUrl: "https://github.com/Psasare/Library-Management-System-",
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
    <section id="projects" className="py-24 md:py-28 border-t border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <Reveal direction="up">
            <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3">
              Featured Work
            </h2>
            <p className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight">
              Projects & Engineering Cases
            </p>
            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mt-5">
              A curated collection of production applications, capstone projects, and institutional platforms engineered with modern TypeScript and resilient system patterns.
            </p>
          </Reveal>

          {/* Filter Pills with Montserrat font */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={project.title}
                className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-montserrat text-[11px] font-semibold px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="font-montserrat text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/25">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
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
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          aria-label={`Visit Live Demo of ${project.title}`}
                          title="Visit Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg sm:text-xl text-foreground mb-2.5 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-montserrat text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
