"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "./icons";
import { Reveal } from "./reveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: "Full Stack / Mobile" | "Healthcare / Web" | "AI & Computer Vision";
  githubUrl?: string;
  liveUrl?: string;
}

export function Projects() {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");

  const projects: Project[] = [
    {
      title: "Maternal Health & Pediatric Companion",
      description:
        "Comprehensive health tracking web platform featuring localized prenatal workflows, appointment scheduling, and offline-resilient data caching.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs"],
      category: "Healthcare / Web",
      githubUrl: "https://github.com/Psasare",
    },
    {
      title: "Automated License Plate Recognition (ALPR)",
      description:
        "High-accuracy optical computer vision pipeline engineered for low-latency vehicle character extraction, batch frame analysis, and database audit logs.",
      tags: ["Python", "FastAPI", "OpenCV", "Machine Learning", "Docker"],
      category: "AI & Computer Vision",
      githubUrl: "https://github.com/Psasare",
    },
    {
      title: "Institutional Management & Records Portal",
      description:
        "Scalable administrative web portal providing role-based access control, real-time analytics dashboards, and encrypted record workflows.",
      tags: ["React", "Express.js", "PostgreSQL", "JWT Auth", "A11y"],
      category: "Full Stack / Mobile",
      githubUrl: "https://github.com/Psasare",
    },
    {
      title: "Community Outreach & Resource Hub",
      description:
        "Civic-focused progressive web portal connecting volunteers with local aid programs, dynamic scheduling, and interactive map geocoding.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Leaflet Maps"],
      category: "Healthcare / Web",
      githubUrl: "https://github.com/Psasare",
    },
    {
      title: "Mobile Task & Priority Engine",
      description:
        "Fluid cross-platform mobile application supporting gesture-driven task management, local offline persistence, and calendar synchronization.",
      tags: ["React Native", "TypeScript", "Mobile UI", "SQLite", "Framer Motion"],
      category: "Full Stack / Mobile",
      githubUrl: "https://github.com/Psasare",
    },
    {
      title: "Real-time Edge Vision Inspector",
      description:
        "Real-time video inference interface streaming edge detection metrics with lightweight WebSocket communication and visual heatmaps.",
      tags: ["Python", "WebSockets", "Computer Vision", "Tailwind CSS"],
      category: "AI & Computer Vision",
      githubUrl: "https://github.com/Psasare",
    },
  ];

  const categories = [
    "All",
    "Full Stack / Mobile",
    "Healthcare / Web",
    "AI & Computer Vision",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 border-t border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal direction="up" className="space-y-3">
            <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent">
              Featured Work
            </h2>
            <p className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Projects & Engineering Cases
            </p>
            <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-xl">
              Selected projects highlighting systems architecture, practical user utility,
              and modern interactive aesthetics.
            </p>
          </Reveal>

          {/* Filter Pills with Montserrat font */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={project.title}
                className="flex flex-col justify-between p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-montserrat text-[11px] font-semibold px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          aria-label="View Source on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          aria-label="Visit Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
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
