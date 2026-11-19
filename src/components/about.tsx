"use client";

import * as React from "react";
import { Server, Code2, Users2, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./reveal";
import { EditorialHeading } from "./animated-text";

export function About() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax subtle counter-drift between bio narrative and pillars grid
  const bioY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const values = [
    {
      icon: Server,
      titleSans: "Infrastructure &",
      titleSerif: "Systems",
      text: "Practical background managing hospital LAN networks, server facilities, hardware diagnostics, and enterprise database systems.",
    },
    {
      icon: Code2,
      titleSans: "Full-Stack",
      titleSerif: "Architecture",
      text: "Engineering resilient, maintainable web applications using Next.js, TypeScript, RESTful services, and structured data schemas.",
    },
    {
      icon: Smartphone,
      titleSans: "Mobile &",
      titleSerif: "Responsive UI",
      text: "Crafting fluid cross-platform mobile apps and responsive web interfaces designed for intuitive touch and effortless human use.",
    },
    {
      icon: Users2,
      titleSans: "People &",
      titleSerif: "Communication",
      text: "Shaped by customer operations and healthcare staff IT training, ensuring complex technical systems serve real human workflows.",
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-28 border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Bio text with Parallax */}
          <motion.div style={{ y: bioY }} className="lg:col-span-6 space-y-7">
            <EditorialHeading
              align="left"
              eyebrow="About Me"
              sansText="Bridging dependable infrastructure with"
              serifText="modern software engineering."
            />

            <Reveal direction="up" delay={0.15}>
              <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
                I am an Information Technology professional and scholar at the <span className="font-serif italic font-normal text-accent text-lg">University of Ghana, Legon</span>, dedicated to building dependable full-stack web platforms, elegant responsive interfaces, and cross-platform mobile applications.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.22}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                Grounded in analytical science foundations from Kpando Senior High, my journey bridges physical technology infrastructure with modern software design. Having administered hospital networks, supported clinical workstations at <span className="text-foreground font-medium">Volta Regional</span> and <span className="text-foreground font-medium">Ho Teaching Hospitals</span>, and prepared for enterprise systems management at the <span className="text-foreground font-medium">UHAS ICT Directorate</span>, I build software with deep respect for uptime, data accuracy, and user experience.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.28}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether deploying university academic platforms, architecting healthcare digital companions, or crafting mobile wellness tools, my objective is simple: engineering resilient software that solves genuine everyday challenges.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.34}>
              <div className="pt-3 flex flex-wrap gap-2.5 font-montserrat text-xs font-semibold text-foreground">
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  BSc. IT Graduate &bull; 2026 (UG Legon)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  UHAS ICT Directorate &bull; NSS &apos;27
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  Administrative Computing
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border">
                  General Science &bull; Kpando SHS
                </span>
              </div>
            </Reveal>
          </motion.div>

          {/* Pillars grid with Parallax */}
          <motion.div style={{ y: gridY }} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.titleSans} delay={i * 0.1} direction="up">
                  <div className="p-7 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-xs group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-montserrat font-bold text-base text-foreground mb-2">
                        {v.titleSans}{" "}
                        <span className="font-serif italic font-normal text-accent">
                          {v.titleSerif}
                        </span>
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
