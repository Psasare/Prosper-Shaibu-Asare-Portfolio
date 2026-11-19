"use client";

import * as React from "react";
import {
  Layers,
  Cpu,
  Smartphone,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "./reveal";

export function Skills() {
  const categories = [
    {
      title: "Frontend & Web Design",
      icon: Layers,
      description:
        "Modern, responsive, accessible web interfaces engineered with strict type safety and design precision.",
      skills: [
        "Next.js (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Design Systems",
        "Responsive & A11y Design",
      ],
    },
    {
      title: "Mobile & UI/UX Engineering",
      icon: Smartphone,
      description:
        "Intuitive mobile application interfaces, cross-platform architecture, and fluid micro-interactions.",
      skills: [
        "React Native & Mobile UI",
        "Framer & Framer Motion",
        "Touch Gestures & Feedback",
        "Component Libraries",
        "Mobile State Management",
        "Light & Dark UI Adaptation",
      ],
    },
    {
      title: "Backend & Systems",
      icon: Cpu,
      description:
        "Performant full-stack application logic, secure data access, and API design.",
      skills: [
        "Node.js & Express",
        "Python",
        "RESTful APIs",
        "Database Design & SQL",
        "Authentication & Security",
        "Server-Side Rendering",
      ],
    },
    {
      title: "Tools, Workflow & Delivery",
      icon: Workflow,
      description:
        "Developer tooling and disciplined engineering practices for production excellence.",
      skills: [
        "Git & GitHub Workflows",
        "Vercel Deployment",
        "Turbopack & Modern Bundlers",
        "Model Context Protocol (MCP)",
        "Testing & Code Quality",
        "Performance Optimization",
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-primary">
            Capabilities & Focus
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Technical Stack & Craft
          </p>
          <p className="text-sm sm:text-base text-muted-foreground">
            A balanced foundation spanning resilient full-stack engineering, web design, and cross-platform mobile apps.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.title} delay={index * 0.12} direction="up">
                <div className="h-full group p-6 sm:p-8 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md hover:border-primary/50 hover:bg-card/95 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 text-xs font-medium text-foreground/90 bg-muted/40 hover:bg-primary/5 hover:border-primary/30 transition-all rounded-lg px-3 py-2 border border-border/40"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
