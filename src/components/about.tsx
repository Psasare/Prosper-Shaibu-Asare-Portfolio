"use client";

import * as React from "react";
import { Terminal, Code2, Rocket, Smartphone } from "lucide-react";
import { Reveal } from "./reveal";

export function About() {
  const values = [
    {
      icon: Terminal,
      title: "Clean Architecture",
      text: "Writing modular, testable, and maintainable code built with TypeScript and resilient system patterns.",
    },
    {
      icon: Smartphone,
      title: "Mobile & Responsive",
      text: "Crafting fluid cross-platform mobile apps and responsive web interfaces designed for intuitive human touch.",
    },
    {
      icon: Code2,
      title: "User-Centered Thinking",
      text: "Every interaction, animation curve, and breakpoint is tuned for real human accessibility and speed.",
    },
    {
      icon: Rocket,
      title: "Adaptive & Iterative",
      text: "Rapid prototyping, continuous delivery, and staying ahead of emerging development tools and engineering practices.",
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
                Passionate about full-stack engineering, web design, and mobile solutions.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                I am a Software Engineer specializing in full-stack engineering, modern web designing, and mobile application development. My approach combines robust backend systems with refined, accessible user interfaces.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether building resilient healthcare platforms, developing machine learning computer vision systems, or engineering mobile applications, I focus on delivering seamless end-to-end user experiences that perform flawlessly across both light and dark environments.
              </p>
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
