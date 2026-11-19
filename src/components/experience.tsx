import * as React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
  type: "work" | "education";
}

export function Experience() {
  const timeline: TimelineItem[] = [
    {
      period: "2024 — Present",
      role: "Full-Stack Software Engineer",
      organization: "Independent & Open Source",
      location: "Remote",
      description: [
        "Architecting resilient web systems and full-stack solutions using Next.js, TypeScript, React, and Node.js.",
        "Engineering computer vision pipelines (FastAPI, OpenCV) and responsive full-stack applications with modern web architectures.",
        "Collaborating on community-driven healthcare initiatives including patient-centric maternal health tools.",
      ],
      type: "work",
    },
    {
      period: "2023 — 2024",
      role: "Frontend & Mobile Application Developer",
      organization: "Software Development Projects",
      location: "Hybrid",
      description: [
        "Built responsive mobile and web interfaces with React Native, Tailwind CSS, and state management architectures.",
        "Designed and implemented RESTful API integrations and authenticated user flows with high test coverage.",
        "Focused on performance tuning, accessible UI patterns, and fluid cross-platform animations.",
      ],
      type: "work",
    },
    {
      period: "2021 — 2024",
      role: "B.Sc. in Computer Science / Software Engineering",
      organization: "University Education",
      location: "On-Campus",
      description: [
        "Focused coursework in Data Structures, Algorithms, Software Engineering, Database Systems, and Network Architecture.",
        "Lead capstone projects involving automated recognition systems and institutional management platforms.",
      ],
      type: "education",
    },
  ];

  return (
    <section id="experience" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-primary">
            Career & Milestones
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Experience & Education
          </p>
          <p className="text-sm sm:text-base text-muted-foreground">
            A track record of engineering scalable applications, continuous learning, and software delivery.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-border/80">
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
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-primary bg-background flex items-center justify-center text-primary z-10 shadow-sm">
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
                  <div className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md hover:border-primary/40 hover:bg-card/90 transition-all duration-300 shadow-sm text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                        <Calendar className="w-3 h-3" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-foreground">
                      {item.role}
                    </h3>
                    <p className="text-xs font-medium text-primary mb-3">
                      {item.organization}
                    </p>

                    <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                      {item.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
