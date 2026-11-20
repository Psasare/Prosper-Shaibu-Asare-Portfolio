"use client";

import * as React from "react";
import { GraduationCap } from "lucide-react";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";
import { ConnoisseurStackInteractor, MenuItem } from "./ui/connoisseur-stack-interactor";

const EDUCATION_ITEMS: MenuItem[] = [
  {
    num: "01",
    name: "University of Ghana",
    subtitle: "B.Sc. in Information Technology",
    period: "2022 - 2026 (Expected)",
    location: "Accra, Legon",
    clipId: "clip-original",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    description: [
      "Pursuing comprehensive advanced studies in software development methodologies, database administration, networking principles, and enterprise system architectures.",
      "Engineering full-stack web and mobile capstones, bridging dependable distributed backend logic with accessible, fluid user interfaces.",
      "Conducting practical laboratories across Linux systems administration, relational schema modeling, and client-server network topologies.",
    ],
    skills: ["Software Engineering", "Relational Databases", "Computer Networks", "System Architecture"],
  },
  {
    num: "02",
    name: "Kpando Senior High",
    subtitle: "General Science Foundations",
    period: "Secondary Education",
    location: "Kpando, Volta Region",
    clipId: "clip-hexagons",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    description: [
      "Built rigorous quantitative problem-solving foundations through advanced coursework in elective mathematics, physics, and chemistry.",
      "Cultivated the disciplined scientific inquiry, empirical analysis, and structured computational thinking that directly underpin software engineering.",
      "Engaged in laboratory experimentation, data collection, and rigorous theoretical problem modeling.",
    ],
    skills: ["Elective Mathematics", "Physics", "Chemistry", "Quantitative Problem Solving"],
  },
];

export function Education() {
  return (
    <section id="education" className="py-28 md:py-36 lg:py-44 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3 flex items-center justify-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" /> Academic Foundations
          </h2>
          <TextMaskReveal
            as="h3"
            className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight"
          >
            Education & Science
          </TextMaskReveal>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5">
            B.Sc. Information Technology studies at the University of Ghana, Legon, grounded in General Science foundations from Kpando Senior High School.
          </p>
        </Reveal>

        {/* Interactive Connoisseur Stack Carousel for Education */}
        <Reveal direction="up" delay={0.2}>
          <ConnoisseurStackInteractor items={EDUCATION_ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
