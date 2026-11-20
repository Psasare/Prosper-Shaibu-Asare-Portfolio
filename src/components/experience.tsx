"use client";

import * as React from "react";
import { Briefcase } from "lucide-react";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";
import { ConnoisseurStackInteractor, MenuItem } from "./ui/connoisseur-stack-interactor";

const EXPERIENCE_ITEMS: MenuItem[] = [
  {
    num: "01",
    name: "Volta Regional Hospital",
    subtitle: "Information Technology Intern",
    period: "Oct 2025 - Dec 2025",
    location: "Hohoe, Volta Region",
    clipId: "clip-original",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    description: [
      "Administered the hospital Local Area Network (LAN) to ensure continuous connectivity and uninterrupted uptime across clinical wards and administrative units.",
      "Diagnosed and resolved critical hardware and software faults across medical workstations, network switches, and peripheral devices.",
      "Conducted digital literacy training sessions for healthcare personnel, improving their proficiency with modern office software and digital records.",
    ],
    skills: ["Hospital LAN", "Hardware Diagnostics", "Network Administration", "Staff IT Training"],
  },
  {
    num: "02",
    name: "Ho Teaching Hospital",
    subtitle: "Information Technology Intern (Trafalgar)",
    period: "Sep 2024 - Dec 2024",
    location: "Ho, Ghana",
    clipId: "clip-hexagons",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    description: [
      "Supported the deployment, installation, and network configuration of hospital workstations and clinical communications infrastructure.",
      "Maintained IT asset documentation, assisted in standardizing technical procedures, and performed preventive maintenance on server room cooling and power systems.",
    ],
    skills: ["Workstation Deployment", "Clinical Infrastructure", "Server Room Maintenance", "IT Asset Tracking"],
  },
  {
    num: "03",
    name: "Solidere Ghana Limited",
    subtitle: "Customer Operations & Support (PremierBet Ghana)",
    period: "Jan 2022 - Jan 2023",
    location: "Adabraka, Accra",
    clipId: "clip-pixels",
    image: "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80",
    description: [
      "Provided responsive, client-centered assistance across digital chat, telephone, email, and direct in-person inquiries with consistent satisfaction ratings.",
      "Facilitated account verifications, processed transaction workflows accurately, and maintained structured documentation within collaborative shift teams.",
    ],
    skills: ["Client Operations", "Transaction Processing", "Cross-Shift Collaboration", "Digital Communication"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-28 border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3 flex items-center justify-center gap-2">
            <Briefcase className="w-3.5 h-3.5" /> Professional Career
          </h2>
          <TextMaskReveal
            as="h3"
            className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight"
          >
            Work Experience
          </TextMaskReveal>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5">
            Hands-on systems administration, hospital LAN engineering at Volta Regional Hospital (Hohoe) and Ho Teaching Hospital (Trafalgar), and customer operations.
          </p>
        </Reveal>

        {/* Interactive Connoisseur Stack Carousel */}
        <Reveal direction="up" delay={0.2}>
          <ConnoisseurStackInteractor items={EXPERIENCE_ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
