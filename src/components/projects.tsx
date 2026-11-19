"use client";

import * as React from "react";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "./icons";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export function Projects() {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const projects: Project[] = [
    {
      title: "MindBridge Mental Health Navigator",
      category: "Full Stack / Mobile",
      description:
        "Comprehensive mental health assistance platform featuring triage assistance, daily mood tracking, and connected clinical support resources.",
      tags: ["React Native", "TypeScript", "Node.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/Psasare",
      featured: true,
    },
    {
      title: "Bloom Maternal Health App",
      category: "Healthcare / Web",
      description:
        "Specialized maternal healthcare tracking application supporting mothers through prenatal analytics, appointment scheduling, and vital health milestones.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
      githubUrl: "https://github.com/Psasare",
      featured: true,
    },
    {
      title: "Automated Car Plate Recognition System",
      category: "AI & Computer Vision",
      description:
        "Optical character recognition and license plate identification system processing high-throughput traffic feeds with vehicle verification logic.",
      tags: ["Python", "OpenCV", "Machine Learning", "FastAPI"],
      githubUrl: "https://github.com/Psasare",
      featured: true,
    },
    {
      title: "Interactive 3D Web Canvas",
      category: "3D & Creative",
      description:
        "Experiential landing page integrating Spline 3D real-time scenes with custom interactive states, physics interactions, and adaptive light/dark shading.",
      tags: ["Spline 3D", "Next.js", "Framer Motion", "Tailwind CSS"],
      githubUrl: "https://github.com/Psasare",
      featured: false,
    },
    {
      title: "Library Management System",
      category: "Full Stack / Mobile",
      description:
        "Institutional resource and catalog management platform handling member checkout workflows, fine processing, and automated reservation alerts.",
      tags: ["TypeScript", "Node.js", "Database Systems", "Tailwind CSS"],
      githubUrl: "https://github.com/Psasare",
      featured: false,
    },
    {
      title: "Course Registration & Academic Portal",
      category: "Healthcare / Web",
      description:
        "High-concurrency university course registration portal featuring timetable conflict detection, prerequisite checking, and student dashboard.",
      tags: ["React", "Express", "SQL", "Tailwind CSS"],
      githubUrl: "https://github.com/Psasare",
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Full Stack / Mobile",
    "Healthcare / Web",
    "AI & Computer Vision",
    "3D & Creative",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-primary">
              Featured Work
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Projects & Engineering Cases
            </p>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Selected projects highlighting systems architecture, practical user utility,
              and modern interactive aesthetics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                    : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={project.title}
                className="flex flex-col justify-between p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md hover:border-primary/40 hover:bg-card/90 transition-all duration-300 shadow-sm group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
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

                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub link banner */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Psasare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Discover more repositories and contributions on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
