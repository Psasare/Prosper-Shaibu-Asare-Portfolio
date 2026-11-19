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
  // Chronological order: from lower foundational education & early experience up to tertiary degree and national service
  const timeline: TimelineItem[] = [
    {
      period: "Secondary Education",
      role: "General Science",
      organization: "Kpando Senior High School",
      location: "Kpando, Volta Region",
      description: [
        "Built a strong foundation in physics, mathematics, chemistry, and elective sciences establishing analytical problem-solving skills.",
      ],
      type: "education",
    },
    {
      period: "Jan 2022 — Jan 2023",
      role: "Customer Operations & Support",
      organization: "Solidere Ghana Limited (PremierBet Ghana)",
      location: "Farrar Avenue, Adabraka Accra",
      description: [
        "Delivered responsive user assistance across phone, email, chat, and in-person channels with high satisfaction rates.",
        "Explained products, services, promotions, and account procedures clearly and evidently to clients.",
        "Handled orders, account verification, and transaction processing accurately while maintaining thorough interaction logs.",
      ],
      type: "work",
    },
    {
      period: "2022 — 2026 (Expected)",
      role: "B.Sc. in Information Technology",
      organization: "University of Ghana",
      location: "Accra, Legon",
      description: [
        "Rigorous coursework in Software Development, Database Administration, Systems Architecture, and Network Engineering.",
        "Applied software engineering principles to full-stack web and mobile application projects, combining software logic with infrastructure.",
      ],
      type: "education",
    },
    {
      period: "Sep 2024 — Dec 2024",
      role: "Information Technology Intern",
      organization: "Ho Teaching Hospital",
      location: "Ho, Ghana",
      description: [
        "Supported the deployment, installation, and network configuration of new computing systems and hospital network infrastructure.",
        "Maintained IT asset records and contributed to standard operating procedure documentation for internal technical workflows.",
        "Conducted preventive maintenance routines to minimize hospital operational downtime; monitored and maintained server room equipment for thermal and performance reliability.",
      ],
      type: "work",
    },
    {
      period: "Oct 2025 — Dec 2025",
      role: "Information Technology Intern",
      organization: "Volta Regional Hospital",
      location: "Hohoe, Ghana",
      description: [
        "Administered and maintained the hospital's local area network (LAN), ensuring high uptime and reliable connectivity across clinical departments.",
        "Diagnosed and resolved hardware and software faults on clinical workstations, printers, and critical peripheral equipment.",
        "Delivered hands-on training sessions to healthcare personnel on office software productivity and modern digital IT tools.",
      ],
      type: "work",
    },
    {
      period: "Nov 2026 — Oct 2027 (Expected)",
      role: "National Service Personnel — Administrative Computing",
      organization: "University of Health and Allied Sciences (UHAS) — IT Directorate",
      location: "Ho, Ghana",
      description: [
        "Assigned to the Administrative Computing Department under the central IT Directorate, supporting university-wide administrative platforms and student/staff computing systems.",
        "Assisting in enterprise database administration, campus portal maintenance, and digital workflow automations across academic and administrative departments.",
        "Collaborating with the IT team to uphold system uptime, data integrity, security policies, and technical support across university directorates.",
      ],
      type: "work",
    },
  ];

  return (
    <section id="experience" className="py-24 border-t border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent">
            Milestones & Career Journey
          </h2>
          <p className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Experience & Education
          </p>
          <p className="font-sans text-sm sm:text-base text-muted-foreground">
            From foundational science education up to University of Ghana IT studies, hospital systems engineering, and administrative computing at UHAS.
          </p>
        </Reveal>

        {/* Timeline List */}
        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-border">
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
                    <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-xs text-left">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 font-montserrat text-[11px] text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="font-montserrat font-bold text-base text-foreground">
                        {item.role}
                      </h3>
                      <p className="font-montserrat text-xs font-semibold text-accent mb-3">
                        {item.organization}
                      </p>

                      <ul className="space-y-1.5 font-sans text-xs text-muted-foreground leading-relaxed">
                        {item.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
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
