"use client";

import * as React from "react";
import {
  Layers,
  Cpu,
  Smartphone,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./reveal";
import { EditorialHeading } from "./animated-text";

export function Skills() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const categories = [
    {
      titleSans: "Frontend &",
      titleSerif: "Web Design",
      icon: Layers,
      description:
        "Building responsive, high-performance web applications using modern Next.js and React architectures with strict type safety and accessible design standards.",
      skills: [
        "Next.js (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Design Systems",
        "Responsive & A11y UI",
      ],
    },
    {
      titleSans: "Mobile &",
      titleSerif: "UI/UX Engineering",
      icon: Smartphone,
      description:
        "Developing intuitive cross-platform mobile experiences with fluid touch interactions, modular components, and seamless offline data caching.",
      skills: [
        "React Native & Mobile UI",
        "Framer Motion",
        "Touch Gestures & Feedback",
        "Component Libraries",
        "Mobile State Management",
        "Adaptive Light/Dark Modes",
      ],
    },
    {
      titleSans: "Backend &",
      titleSerif: "Systems Architecture",
      icon: Cpu,
      description:
        "Architecting dependable backend logic, secure authentication layers, and efficient relational database schemas built for reliability and scale.",
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
      titleSans: "Tools, Systems &",
      titleSerif: "DevOps",
      icon: Workflow,
      description:
        "Applying disciplined engineering workflows, version control standards, continuous deployment, and enterprise infrastructure maintenance.",
      skills: [
        "Git & GitHub Workflows",
        "Vercel Deployment",
        "Network Administration",
        "Systems Troubleshooting",
        "Testing & Code Quality",
        "Performance Optimization",
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-28 border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditorialHeading
          eyebrow="Capabilities & Focus"
          sansText="Technical Stack &"
          serifText="Digital Craft"
          description="A comprehensive engineering toolkit cultivated through enterprise systems administration, academic rigor, and production software delivery."
          className="mb-16 md:mb-20"
        />

        <motion.div style={{ y: cardsY }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.titleSans} delay={index * 0.12} direction="up">
                <div className="h-full group p-7 sm:p-8 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                          {category.titleSans}{" "}
                          <span className="font-serif italic font-normal text-accent">
                            {category.titleSerif}
                          </span>
                        </h3>
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 font-montserrat text-xs font-bold text-foreground bg-muted/80 hover:bg-muted hover:border-accent/40 transition-all rounded-lg px-3 py-2 border border-border"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
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
