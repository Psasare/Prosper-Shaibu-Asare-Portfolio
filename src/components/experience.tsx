"use client";

import * as React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { Reveal } from "./reveal";

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
  type: "work" | "education";
}

export function Experience() {
  // Chronological order: from foundational education up through university degree to apex enterprise service
  const timeline: TimelineItem[] = [
    {
      period: "Secondary Education",
      role: "General Science",
      organization: "Kpando Senior High School",
      location: "Kpando, Volta Region",
      description: [
        "Built rigorous analytical and quantitative problem-solving foundations through advanced coursework in physics, elective mathematics, and chemistry.",
        "Cultivated the scientific curiosity, disciplined inquiry, and computational thinking that underpin my approach to software engineering.",
      ],
      type: "education",
    },
    {
      period: "Jan 2022 - Jan 2023",
      role: "Customer Operations & Support",
      organization: "Solidere Ghana Limited (PremierBet Ghana)",
      location: "Farrar Avenue, Adabraka Accra",
      description: [
        "Provided responsive, client-centered assistance across digital chat, telephone, email, and direct in-person inquiries with consistent satisfaction ratings.",
        "Facilitated account verifications, processed transaction workflows accurately, and maintained structured documentation within collaborative shift teams.",
      ],
      type: "work",
    },
    {
      period: "2022 - 2026 (Expected)",
      role: "B.Sc. in Information Technology",
      organization: "University of Ghana",
      location: "Accra, Legon",
      description: [
        "Pursuing advanced studies in software development, relational database administration, computer network engineering, and system architectures.",
        "Applying modern software engineering principles to full-stack web and mobile application projects, combining backend logic with accessible interface design.",
      ],
      type: "education",
    },
    {
      period: "Sep 2024 - Dec 2024",
      role: "Information Technology Intern",
      organization: "Ho Teaching Hospital",
      location: "Ho, Ghana",
      description: [
        "Supported the deployment, installation, and network configuration of hospital workstations and clinical communications infrastructure.",
        "Maintained IT asset documentation, assisted in standardizing technical procedures, and performed preventive maintenance on server room cooling and power systems.",
      ],
      type: "work",
    },
    {
      period: "Oct 2025 - Dec 2025",
      role: "Information Technology Intern",
      organization: "Volta Regional Hospital",
      location: "Hohoe, Ghana",
      description: [
        "Administered the hospital Local Area Network (LAN) to ensure continuous connectivity and uninterrupted uptime across clinical wards and administrative units.",
        "Diagnosed and resolved critical hardware and software faults across medical workstations, network switches, and peripheral devices.",
        "Conducted digital literacy training sessions for healthcare personnel, improving their proficiency with modern office software and digital records.",
      ],
      type: "work",
    },
    {
      period: "Nov 2026 - Oct 2027 (Expected)",
      role: "National Service Personnel - Administrative Computing",
      organization: "University of Health and Allied Sciences (UHAS) - ICT Directorate",
      location: "Ho, Ghana",
      description: [
        "Entrusted with the maintenance, support, and ongoing evolution of university administrative information systems, ERP platforms, and central databases.",
        "Collaborating with academic and administrative stakeholders to evaluate functional requirements, optimize digital workflows, and guarantee institutional data accuracy.",
        "Participating in cross-system integration, quality assurance, performance monitoring, and security management to uphold high-availability enterprise services.",
      ],
      type: "work",
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-28 border-t border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3">
            Career Journey & Milestones
          </h2>
          <p className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight">
            Experience & Education
          </p>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-5 sm:mt-6">
            A chronological journey of analytical development, clinical systems support, University of Ghana academic excellence, and enterprise computing leadership.
          </p>
        </Reveal>

        {/* Timeline List */}
        <div className="max-w-3xl mx-auto space-y-10 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-border">
          {timeline.map((item, index) => {
            const isWork = item.type === "work";
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.role + item.period}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-accent bg-card flex items-center justify-center text-accent z-10 shadow-xs">
                  {isWork ? (
                    <Briefcase className="w-3.5 h-3.5" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Content Box */}
                <div
                  className={`pl-12 sm:pl-0 sm:w-1/2 ${
                    isEven ? "sm:pl-10" : "sm:pr-10 text-left sm:text-right"
                  }`}
                >
                  <Reveal delay={index * 0.1} direction={isEven ? "left" : "right"}>
                    <div className="p-7 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-xs text-left">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 font-montserrat text-[11px] text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="font-montserrat font-bold text-base text-foreground mb-0.5">
                        {item.role}
                      </h3>
                      <p className="font-montserrat text-xs font-semibold text-accent mb-4">
                        {item.organization}
                      </p>

                      <ul className="space-y-2 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
