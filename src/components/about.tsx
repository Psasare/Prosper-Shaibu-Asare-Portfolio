"use client";

import * as React from "react";
import {
  Server,
  Code2,
  Users2,
  Smartphone,
  GraduationCap,
  Building2,
  Activity,
  Atom,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

export function About() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax subtle counter-drift between bio narrative and pillars grid
  const bioY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const values = [
    {
      icon: Server,
      title: "Infrastructure & Systems",
      text: "Practical background managing hospital LAN networks, server facilities, hardware diagnostics, and enterprise database systems.",
    },
    {
      icon: Code2,
      title: "Full-Stack Architecture",
      text: "Engineering resilient, maintainable web applications using Next.js, TypeScript, RESTful services, and structured data schemas.",
    },
    {
      icon: Smartphone,
      title: "Mobile & Responsive UI",
      text: "Crafting fluid cross-platform mobile apps and responsive web interfaces designed for intuitive touch and effortless human use.",
    },
    {
      icon: Users2,
      title: "People & Communication",
      text: "Shaped by customer operations and healthcare staff IT training, ensuring complex technical systems serve real human workflows.",
    },
  ];

  const credentialBadges = [
    {
      icon: GraduationCap,
      label: "BSc. IT Scholar '26",
      detail: "University of Ghana, Legon",
    },
    {
      icon: Building2,
      label: "UHAS ICT Directorate",
      detail: "Administrative Computing (NSS '27)",
    },
    {
      icon: Activity,
      label: "Clinical IT Systems",
      detail: "Volta Regional & Ho Teaching Hosp.",
    },
    {
      icon: Atom,
      label: "Analytical Science",
      detail: "Kpando Senior High School",
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-28 border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Bio text with Parallax & Elevated Editorial Typography */}
          <motion.div style={{ y: bioY }} className="lg:col-span-6 space-y-7">
            {/* Section Eyebrow & Master Title */}
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-2xs mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-montserrat text-[11px] font-bold uppercase tracking-widest text-accent">
                  About Me &bull; Philosophy & Systems
                </span>
              </div>
              <TextMaskReveal
                as="h3"
                className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-[1.18]"
              >
                Bridging dependable infrastructure with modern software engineering.
              </TextMaskReveal>
            </Reveal>

            {/* Paragraph 1: Editorial Lead with Signature Accent Border */}
            <Reveal direction="up" delay={0.12}>
              <div className="pl-4 border-l-2 border-accent/80 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold block">
                  01 // THE STANCE
                </span>
                <p className="font-sans text-base sm:text-lg text-foreground/90 font-medium leading-relaxed">
                  At the intersection of dependable systems infrastructure and modern application craft, I engineer digital platforms built to perform under real-world pressure. As an Information Technology scholar at the{" "}
                  <span className="font-semibold text-foreground underline decoration-accent/70 decoration-2 underline-offset-4">
                    University of Ghana, Legon
                  </span>
                  , my work centers on delivering resilient full-stack web platforms, refined responsive interfaces, and high-performance cross-platform mobile apps.
                </p>
              </div>
            </Reveal>

            {/* Paragraph 2: The Enterprise & Clinical Crucible */}
            <Reveal direction="up" delay={0.2}>
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold block">
                  02 // OPERATIONAL CRUCIBLE
                </span>
                <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Rooted in rigorous analytical science from{" "}
                  <span className="font-semibold text-foreground">Kpando Senior High</span>, my engineering mindset was forged hands-on across demanding physical network infrastructure and clinical facilities. Having administered hospital LAN backbones, supported mission-critical workstations at{" "}
                  <span className="font-semibold text-foreground">Volta Regional</span> and{" "}
                  <span className="font-semibold text-foreground">Ho Teaching Hospitals</span>, and directed administrative computing platforms at the{" "}
                  <span className="font-semibold text-foreground">UHAS ICT Directorate</span>, I build software with profound respect for 99.9% uptime, zero-downtime deployments, and rock-solid data integrity.
                </p>
              </div>
            </Reveal>

            {/* Paragraph 3: The Engineering Creed & Impact */}
            <Reveal direction="up" delay={0.26}>
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold block">
                  03 // ENGINEERING CREED
                </span>
                <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                  From institutional university enrollment platforms to community maternal health companions and real-time clinical tools, my objective remains simple:{" "}
                  <span className="font-semibold text-foreground">
                    engineering resilient, human-centered software that solves genuine everyday challenges and scales effortlessly.
                  </span>
                </p>
              </div>
            </Reveal>

            {/* Credential & Institutional Badges */}
            <Reveal direction="up" delay={0.32}>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {credentialBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="font-montserrat text-xs font-bold text-foreground block truncate">
                          {badge.label}
                        </span>
                        <span className="font-sans text-[11px] text-muted-foreground block truncate">
                          {badge.detail}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </motion.div>

          {/* Pillars grid with Parallax */}
          <motion.div style={{ y: gridY }} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 0.1} direction="up">
                  <div className="p-7 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-xs group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-montserrat font-bold text-base text-foreground mb-2">
                        {v.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
