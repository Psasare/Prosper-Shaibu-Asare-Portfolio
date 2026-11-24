"use client";

import * as React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Server,
  Network,
  Cpu,
  Users2,
  ChevronRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

interface ExperienceItem {
  id: string;
  num: string;
  role: string;
  organization: string;
  shortOrg: string;
  department: string;
  period: string;
  location: string;
  badge: string;
  isActive?: boolean;
  metricLabel: string;
  metricValue: string;
  description: {
    title: string;
    detail: string;
    icon: React.ElementType;
  }[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "uhas-it",
    num: "01",
    role: "National Service Personnel (NSS)",
    organization: "University of Health and Allied Sciences (UHAS)",
    shortOrg: "UHAS IT Directorate",
    department: "IT Directorate • Systems & Infrastructure",
    period: "Oct 2025 - Present",
    location: "Ho, Volta Region",
    badge: "Active Service",
    isActive: true,
    metricLabel: "Operational Scope",
    metricValue: "University Systems & Campus LAN",
    description: [
      {
        title: "Campus Infrastructure & Network Administration",
        detail:
          "Administer university network infrastructure, enterprise switches, and fiber connectivity across academic departments, directorates, and computer laboratories.",
        icon: Network,
      },
      {
        title: "Workstation Maintenance & Diagnostics",
        detail:
          "Perform hardware diagnostics, operating system deployments, and security configurations across institutional administrative computers and staff terminals.",
        icon: Cpu,
      },
      {
        title: "Institutional Digital Workflow Support",
        detail:
          "Assist faculty and administrative personnel with digital portal workflows, institutional email routing, and credential authentication systems.",
        icon: Users2,
      },
    ],
    skills: [
      "Enterprise Campus LAN",
      "Systems Administration",
      "Hardware Diagnostics",
      "Network Troubleshooting",
      "Institutional Workflows",
      "User IT Support",
    ],
  },
  {
    id: "volta-regional",
    num: "02",
    role: "Information Technology Intern",
    organization: "Volta Regional Hospital",
    shortOrg: "Volta Regional Hosp. (Hohoe)",
    department: "IT Department • Healthcare Systems",
    period: "Oct 2025 - Dec 2025",
    location: "Hohoe, Volta Region",
    badge: "Clinical Infrastructure",
    isActive: false,
    metricLabel: "System Uptime",
    metricValue: "99.9% Clinical LAN Availability",
    description: [
      {
        title: "Hospital Local Area Network (LAN) Administration",
        detail:
          "Managed hospital network switches and structured cabling ensuring uninterrupted connectivity across critical wards, pharmacy, laboratories, and records.",
        icon: Network,
      },
      {
        title: "Medical Workstation Diagnostics & Fault Resolution",
        detail:
          "Resolved urgent hardware, software, and peripheral faults on clinical workstations with rapid turnaround to prevent delays in patient care delivery.",
        icon: ShieldCheck,
      },
      {
        title: "Healthcare Personnel Digital Literacy Training",
        detail:
          "Conducted structured software workshops for doctors, nurses, and administrative staff to improve efficiency in electronic records and hospital software.",
        icon: Users2,
      },
    ],
    skills: [
      "Hospital LAN",
      "Network Switches",
      "Hardware Diagnostics",
      "Clinical IT Training",
      "System Uptime",
      "Patient Data Security",
    ],
  },
  {
    id: "ho-teaching",
    num: "03",
    role: "Information Technology Intern",
    organization: "Ho Teaching Hospital (Trafalgar)",
    shortOrg: "Ho Teaching (Trafalgar)",
    department: "Directorate of IT • Hospital Infrastructure",
    period: "Sep 2024 - Dec 2024",
    location: "Ho, Volta Region",
    badge: "Enterprise Networks",
    isActive: false,
    metricLabel: "Infrastructure",
    metricValue: "Workstations & Server Room Facilities",
    description: [
      {
        title: "Hospital Workstation Deployment & Network Config",
        detail:
          "Deployed, configured, and integrated new enterprise medical workstations into departmental subnets with strict access control and static IP allocations.",
        icon: Server,
      },
      {
        title: "Server Room Facilities & Preventive Maintenance",
        detail:
          "Maintained server room infrastructure, monitored cooling airflows, inspected backup power UPS arrays, and updated technical asset logs.",
        icon: Activity,
      },
      {
        title: "Departmental Network Diagnostic Auditing",
        detail:
          "Collaborated with senior network engineers on diagnostic packet analysis, cable testing, and throughput verification across clinical units.",
        icon: Network,
      },
    ],
    skills: [
      "Workstation Deployment",
      "Server Facilities",
      "UPS & Cooling Systems",
      "IT Asset Tracking",
      "Diagnostic Auditing",
      "Preventive Maintenance",
    ],
  },
  {
    id: "solidere",
    num: "04",
    role: "Customer Operations & Support Specialist",
    organization: "Solidere Ghana Limited (PremierBet Ghana)",
    shortOrg: "Solidere Ghana (PremierBet)",
    department: "Customer Operations • Adabraka",
    period: "Jan 2022 - Jan 2023",
    location: "Adabraka, Accra",
    badge: "Client Operations",
    isActive: false,
    metricLabel: "Service Rating",
    metricValue: "High-Volume Resolution & Accuracy",
    description: [
      {
        title: "Multi-Channel Technical & Client Operations",
        detail:
          "Delivered responsive technical assistance across digital chat platforms, telephony, and direct in-person inquiries with strict adherence to SLA standards.",
        icon: Users2,
      },
      {
        title: "Verification Workflows & Transaction Processing",
        detail:
          "Facilitated KYC user verification protocols, audited digital ledger records, and maintained accurate documentation during high-volume shift operations.",
        icon: ShieldCheck,
      },
      {
        title: "Engineering Bug & Payment Gateway Escalation",
        detail:
          "Identified platform regressions and transactional gateway anomalies, compiling structured reproduction steps for software engineering leads.",
        icon: Cpu,
      },
    ],
    skills: [
      "Client Operations",
      "KYC Verification",
      "Transaction Processing",
      "Incident Escalation",
      "Cross-Shift Collaboration",
      "SLA Management",
    ],
  },
];

export function Experience() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const current = EXPERIENCES[selectedIndex];

  return (
    <section
      id="experience"
      className="py-28 md:py-36 lg:py-44 border-t border-border relative overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3 flex items-center justify-center gap-2">
            <Briefcase className="w-3.5 h-3.5" /> Career Journey
          </h2>
          <TextMaskReveal
            as="h3"
            className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.12]"
          >
            Work Experience
          </TextMaskReveal>
          <p className="font-dm text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5">
            Practical systems administration, hospital LAN engineering at Volta Regional Hospital (Hohoe) and Ho Teaching Hospital (Trafalgar), and current National Service at UHAS IT Directorate.
          </p>
        </Reveal>

        {/* Modern Split-Pane Architecture (Image-Free, Executive & Clean) */}
        <Reveal direction="up" delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT RAIL: Interactive Milestone Navigator */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-2 px-1">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Select Milestone
                </span>
                <span className="font-mono text-xs text-accent font-bold">
                  0{selectedIndex + 1} / 0{EXPERIENCES.length}
                </span>
              </div>

              <div className="space-y-3">
                {EXPERIENCES.map((exp, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group relative overflow-hidden ${
                        isSelected
                          ? "bg-card border-accent/60 shadow-lg shadow-accent/5 ring-1 ring-accent/30"
                          : "bg-card/60 border-border/80 hover:bg-card hover:border-accent/30"
                      }`}
                    >
                      {/* Active Left Indicator Bar */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeExperienceIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-accent">
                            {exp.num}
                          </span>
                          <span className="text-muted-foreground/40 font-mono text-xs">•</span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {exp.period}
                          </span>
                          {exp.isActive && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[9.5px] font-bold uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active
                            </span>
                          )}
                        </div>

                        <h4 className="font-montserrat font-bold text-base text-foreground truncate group-hover:text-accent transition-colors">
                          {exp.organization}
                        </h4>

                        <p className="font-dm text-xs text-muted-foreground/90 truncate">
                          {exp.role}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                          isSelected
                            ? "text-accent translate-x-0.5"
                            : "group-hover:translate-x-1"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT PANEL: Executive Architecture Detail Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl bg-card border border-border p-7 sm:p-10 lg:p-12 shadow-xl space-y-8 relative overflow-hidden"
                >
                  {/* Subtle Corner Ambient Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

                  {/* Header Block */}
                  <div className="space-y-4 border-b border-border/80 pb-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest px-3 py-1 rounded-lg bg-accent/10 border border-accent/20">
                          {current.badge}
                        </span>
                        {current.isActive && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Current Service Role
                          </span>
                        )}
                      </div>

                      <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {current.period}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-montserrat text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-snug">
                        {current.role}
                      </h3>
                      <h4 className="font-montserrat text-lg font-bold text-accent mt-1">
                        {current.organization}
                      </h4>
                      <p className="font-mono text-xs text-muted-foreground mt-1">
                        {current.department}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground/80" />
                        {current.location}
                      </span>
                      <span>•</span>
                      <span className="text-foreground/80 font-semibold">
                        {current.metricLabel}:{" "}
                        <span className="text-accent">{current.metricValue}</span>
                      </span>
                    </div>
                  </div>

                  {/* Structured Key Contributions List */}
                  <div className="space-y-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-bold block">
                      Core Contributions &amp; Architectural Impact
                    </span>

                    <div className="grid grid-cols-1 gap-3.5">
                      {current.description.map((item, dIdx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={dIdx}
                            className="p-4 sm:p-5 rounded-2xl bg-secondary/50 border border-border/80 hover:border-accent/40 transition-colors flex items-start gap-4"
                          >
                            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent shrink-0 mt-0.5">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-montserrat font-bold text-sm text-foreground">
                                {item.title}
                              </h5>
                              <p className="font-dm text-sm text-muted-foreground/90 leading-relaxed">
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Skills / Technology Domain Cloud */}
                  <div className="pt-2 border-t border-border/80">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-bold block mb-3">
                      Specialized Tooling &amp; Protocols
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {current.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:border-accent/40 transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
