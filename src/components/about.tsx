"use client";

import * as React from "react";
import { Server, Code2, Users2, Smartphone } from "lucide-react";
import { Reveal } from "./reveal";

export function About() {
  const values = [
    {
      icon: Server,
      title: "Infrastructure & Systems",
      text: "Hands-on experience managing hospital LANs, server rooms, hardware diagnostics, and database administration.",
    },
    {
      icon: Code2,
      title: "Full-Stack Architecture",
      text: "Building robust, modular web systems with Next.js, TypeScript, RESTful endpoints, and clean data modeling.",
    },
    {
      icon: Smartphone,
      title: "Mobile & Responsive UI",
      text: "Designing tactile cross-platform mobile apps and accessible web interfaces crafted for effortless human interaction.",
    },
    {
      icon: Users2,
      title: "People & Communication",
      text: "Grounded by customer operations and hospital staff IT training, ensuring technical solutions serve real human needs.",
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio text with Reveal */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal direction="up">
              <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3">
                About Me
              </h2>
              <p className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
                Bridging reliable IT infrastructure with modern software engineering.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                I am an Information Technology scholar at the <span className="font-semibold text-foreground">University of Ghana, Legon</span>, specializing in full-stack engineering, web designing, and mobile application development. Built on a strong foundation in physics, mathematics, chemistry, and elective sciences from Kpando Senior High, my perspective unites rigorous analytical problem-solving skills with hands-on systems troubleshooting.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                From administering hospital local area networks (LANs) and server equipment at <span className="text-foreground font-medium">Volta Regional Hospital</span> and <span className="text-foreground font-medium">Ho Teaching Hospital</span>, to serving in the <span className="text-foreground font-medium">Administrative Computing Department</span> at the <span className="text-foreground font-medium">UHAS IT Directorate</span> and engineering full-stack platforms, I build technology that is structurally resilient, accessible, and user-centered.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="pt-2 flex flex-wrap gap-2.5 font-montserrat text-xs font-semibold text-foreground/80">
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  BSc. IT Candidate &bull; 2026 (UG Legon)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  UHAS IT Directorate &bull; NSS &apos;27
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  Administrative Computing
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  General Science &bull; Kpando SHS
                </span>
              </div>
            </Reveal>
          </div>

          {/* Pillars grid with staggered reveal */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 0.1} direction="up">
                  <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-xs group">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-montserrat font-bold text-base text-foreground mb-1.5">
                      {v.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
