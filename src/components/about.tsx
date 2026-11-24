"use client";

import * as React from "react";
import { Server, Code2, Users2, Smartphone } from "lucide-react";
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
  const bioY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

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

  return (
    <section ref={sectionRef} id="about" className="py-28 md:py-36 lg:py-44 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        {/* Top Part: Asymmetric Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start mb-20 lg:mb-28">
          {/* Left Column: Section Title & Quick Credential Tags */}
          <motion.div style={{ y: bioY }} className="lg:col-span-5 space-y-7 lg:space-y-8">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-montserrat text-xs uppercase tracking-widest font-bold">
                About Me
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <TextMaskReveal
                as="h3"
                className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.12]"
              >
                Bridging dependable infrastructure with modern software engineering.
              </TextMaskReveal>
            </Reveal>

            <Reveal direction="up" delay={0.16}>
              <div className="flex flex-wrap gap-2.5 pt-2 font-mono text-xs font-medium text-foreground">
                <span className="px-3.5 py-2 rounded-xl bg-card border border-border shadow-2xs">
                  BSc. IT &bull; UG Legon &apos;26
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-card border border-border shadow-2xs">
                  Volta Regional Hosp. (Hohoe)
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-card border border-border shadow-2xs">
                  Ho Teaching Hosp. (Trafalgar)
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-card border border-border shadow-2xs">
                  General Science &bull; Kpando SHS
                </span>
              </div>
            </Reveal>
          </motion.div>

          {/* Right Column: Generous, Comfortable Reading Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 lg:pt-2">
            <Reveal direction="up" delay={0.12}>
              <p className="font-dm text-lg sm:text-xl lg:text-[22px] text-foreground/95 font-normal leading-[1.7] tracking-[-0.012em]">
                I am an analytical, driven, and detail-oriented <span className="text-accent underline decoration-accent/35 underline-offset-4 font-medium">Information Technology Graduate</span> from the University of Ghana, Legon, with practical field experience spanning healthcare networks, full-stack software development, and systems administration.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="font-dm text-base sm:text-[17px] text-muted-foreground/90 leading-[1.82] tracking-[-0.005em]">
                Grounded in General Science foundations from Kpando Senior High, my journey bridges physical technology infrastructure with modern software engineering. Having administered hospital Local Area Networks (LANs), resolved critical hardware and software faults across medical workstations, and trained personnel at <span className="text-foreground font-medium">Volta Regional Hospital (Hohoe)</span> and <span className="text-foreground font-medium">Ho Teaching Hospital (Trafalgar)</span>, I build software with deep respect for uptime, data accuracy, and user experience.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.28}>
              <p className="font-dm text-base sm:text-[17px] text-muted-foreground/90 leading-[1.82] tracking-[-0.005em]">
                Whether deploying university academic platforms, architecting healthcare digital companions, or crafting mobile wellness tools, my objective is simple: engineering resilient software that solves genuine everyday challenges.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bottom Part: Spacious 4-Column Horizontal Engineering Pillars */}
        <motion.div style={{ y: gridY }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.08} direction="up">
                <div className="p-8 sm:p-9 lg:p-10 rounded-2xl border border-border bg-card/80 hover:bg-card hover:border-accent/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xs group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-13 h-13 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-montserrat font-bold text-lg text-foreground tracking-tight mb-3 group-hover:text-accent transition-colors">
                      {v.title}
                    </h4>
                    <p className="font-dm text-sm sm:text-[14.5px] text-muted-foreground/85 leading-[1.7] font-normal">
                      {v.text}
                    </p>
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
