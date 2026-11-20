/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import {
  Layers,
  Cpu,
  Smartphone,
  Workflow,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";

// ==========================================
// TECH STACK SPHERE DATASET
// Specialized technologies Prosper utilizes across Web, Mobile & Systems
// ==========================================
const BASE_TECH_STACK: Omit<ImageData, "id">[] = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    alt: "GitHub",
    title: "GitHub • CI/CD & Version Control",
    description: "Branching strategies, GitHub Actions automation, pull request workflows, and repository management.",
  },
  {
    src: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
    alt: "Framer Motion",
    title: "Framer Motion • Fluid Micro-Interactions",
    description: "Spring physics, layout transitions, exit sequences, and hardware-accelerated UI feedback.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
    title: "Next.js 16 • Full-Stack Web Architecture",
    description: "App Router, Server Actions, Route Handlers, Edge optimization, and hybrid SSR/SSG rendering.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    alt: "React",
    title: "React 19 & React Native • Web & Mobile",
    description: "Declarative component architectures, custom hooks, cross-platform mobile apps, and concurrent features.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
    title: "TypeScript • Strict Type Safety",
    description: "End-to-end interface contracts, generic utility types, type inference, and scalable enterprise codebases.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    alt: "Tailwind CSS",
    title: "Tailwind CSS v4 • Modern Design Tokens",
    description: "Modern design token architectures, custom dark/light themes, fluid grids, and responsive layouts.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
    title: "Node.js • Backend Runtime & Services",
    description: "Asynchronous backend logic, microservice middleware, streaming APIs, and server administration.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    alt: "Python",
    title: "Python • Systems & Data Engineering",
    description: "Automated network scripting, backend data processing, algorithmic logic, and computational tasks.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
    title: "PostgreSQL • Relational Database Schemas",
    description: "ACID-compliant relational modeling, structured schemas, indexing optimization, and SQL performance.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    alt: "Docker",
    title: "Docker • Containerized Infrastructure",
    description: "Multi-stage Docker builds, container orchestration, environment isolation, and deployment consistency.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    alt: "Linux",
    title: "Linux • Server & Network Systems",
    description: "Server room operations, bash scripting, network socket diagnostics, and hospital infrastructure.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    alt: "Three.js",
    title: "Three.js • 3D Spatial Computing",
    description: "WebGL viewports, procedural geometry, lighting, particle nebulae, and interactive 3D simulations.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    alt: "Git",
    title: "Git • Distributed Version Control",
    description: "Atomic commit discipline, trunk-based branching, rebasing, and merge conflict resolution.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
    title: "Modern JavaScript (ESNext)",
    description: "Modern asynchronous architecture, event loop mechanics, closures, and browser APIs.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    alt: "HTML5",
    title: "HTML5 • Accessible Semantic Tree",
    description: "Accessible ARIA labeling, semantic tree structuring, SEO metadata, and web standard compliance.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    alt: "CSS3",
    title: "Modern CSS3 • Animations & Subgrids",
    description: "Container queries, fluid typography clamps, CSS variables, and GPU-accelerated keyframe animations.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    alt: "Express.js",
    title: "Express.js • RESTful APIs & Middleware",
    description: "Scalable endpoint routing, CORS handling, token verification, and JSON payload handling.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    alt: "Vercel",
    title: "Vercel • Serverless Edge Cloud",
    description: "Edge networks, continuous integration preview builds, global DNS, and performance analytics.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    alt: "Vite",
    title: "Vite • Next-Gen Frontend Bundler",
    description: "Instant hot module reloading (HMR), optimized Rollup bundling, and fast modern development.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    alt: "Figma",
    title: "Figma • Interface & Systems Prototyping",
    description: "Design system tokens, user experience wireframes, interactive flows, and visual design assets.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
    alt: "Redux",
    title: "Redux Toolkit • Predictable State Management",
    description: "Global client state slices, immutable updates, memoized selectors, and middleware workflows.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
    alt: "GraphQL",
    title: "GraphQL • Strongly Typed Data Schemas",
    description: "Declarative queries, fine-grained mutation resolvers, and efficient payload fetching.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    alt: "Firebase",
    title: "Firebase • Cloud Services & Push Notifications",
    description: "Firestore document databases, authentication rules, remote config, and push notifications.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    alt: "Supabase",
    title: "Supabase • Postgres Backend as a Service",
    description: "Postgres schema modeling, Row Level Security (RLS) policies, and real-time database subscriptions.",
  },
];

// Generate 42 items using Fibonacci coverage
const TECH_SPHERE_IMAGES: ImageData[] = [];
for (let i = 0; i < 42; i++) {
  const baseIndex = i % BASE_TECH_STACK.length;
  const item = BASE_TECH_STACK[baseIndex];
  TECH_SPHERE_IMAGES.push({
    id: `tech-${i + 1}-${item.alt.toLowerCase()}`,
    ...item,
  });
}

export function Skills() {
  const [inspectedTech, setInspectedTech] = React.useState<ImageData | null>(TECH_SPHERE_IMAGES[0] || null);
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const categories = [
    {
      title: "Frontend & Web Design",
      icon: Layers,
      description:
        "Building responsive, high-performance web applications using modern Next.js and React architectures with strict type safety and accessible design standards.",
      skills: [
        "Next.js (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Design Systems",
        "Responsive & A11y UI",
      ],
    },
    {
      title: "Mobile & UI/UX Engineering",
      icon: Smartphone,
      description:
        "Developing intuitive cross-platform mobile experiences with fluid touch interactions, modular components, and seamless offline data caching.",
      skills: [
        "React Native & Mobile UI",
        "Framer Motion",
        "Touch Gestures & Feedback",
        "Component Libraries",
        "Mobile State Management",
        "Adaptive Light/Dark Modes",
      ],
    },
    {
      title: "Backend & Systems",
      icon: Cpu,
      description:
        "Architecting dependable backend logic, secure authentication layers, and efficient relational database schemas built for reliability and scale.",
      skills: [
        "Node.js & Express",
        "Python",
        "RESTful APIs",
        "Database Design & SQL",
        "Authentication & Security",
        "Server-Side Rendering",
      ],
    },
    {
      title: "Tools, Systems & DevOps",
      icon: Workflow,
      description:
        "Applying disciplined engineering workflows, version control standards, continuous deployment, and enterprise infrastructure maintenance.",
      skills: [
        "Git & GitHub Workflows",
        "Vercel Deployment",
        "Network Administration",
        "Systems Troubleshooting",
        "Testing & Code Quality",
        "Performance Optimization",
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-28 md:py-36 lg:py-44 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3">
            Capabilities & Focus
          </h2>
          <TextMaskReveal
            as="h3"
            className="font-montserrat text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground leading-tight"
          >
            Technical Stack & Craft
          </TextMaskReveal>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-5 sm:mt-6">
            A comprehensive engineering toolkit cultivated through enterprise systems administration, academic rigor, and production software delivery.
          </p>
        </Reveal>

        {/* Interactive 3D Technology Sphere Showcase - 100% Unboxed, Free-Floating (NO CANVAS / NO CARD BOX) */}
        <Reveal direction="up" className="mb-16 md:mb-20">
          <div className="relative w-full flex flex-col items-center justify-center">
            {/* Header Readout Badge */}
            <div className="text-center mb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-muted border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Interactive 3D Stack Constellation</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Drag to rotate the 3D Fibonacci sphere &bull; Click any technology logo for details
              </p>
            </div>

            {/* 3D Sphere - Floating freely directly on the page background */}
            <div className="w-full flex items-center justify-center overflow-visible py-2">
              <SphereImageGrid
                images={TECH_SPHERE_IMAGES}
                containerSize={580}
                sphereRadius={225}
                dragSensitivity={0.75}
                momentumDecay={0.96}
                maxRotationSpeed={5}
                baseImageScale={0.14}
                hoverScale={1.3}
                perspective={1000}
                autoRotate={true}
                autoRotateSpeed={0.25}
                onHoverImage={(img) => img && setInspectedTech(img)}
                onSelectImage={(img) => img && setInspectedTech(img)}
              />
            </div>

            {/* Live Interactive Stack Inspector HUD */}
            <div className="w-full max-w-2xl mx-auto mt-6 px-4">
              {inspectedTech ? (
                <div className="p-5 sm:p-6 rounded-2xl bg-card/90 border border-border/80 shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200/90 shadow-md p-2.5 flex items-center justify-center shrink-0">
                    <img
                      src={inspectedTech.src}
                      alt={inspectedTech.alt}
                      className="w-full h-full object-contain filter drop-shadow-xs"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/25">
                        Selected Architecture
                      </span>
                      <h4 className="font-montserrat font-bold text-base text-foreground">
                        {inspectedTech.title || inspectedTech.alt}
                      </h4>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {inspectedTech.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-3 px-6 rounded-xl bg-card/60 border border-border/80 text-center font-mono text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Click or hover any technology node to inspect Prosper&apos;s architectural usage</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* 4 Categorized Pillars Grid */}
        <motion.div style={{ y: cardsY }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.title} delay={index * 0.12} direction="up">
                <div className="h-full group p-8 sm:p-10 lg:p-12 rounded-2xl border border-border bg-card hover:border-accent/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 font-montserrat text-xs font-bold text-foreground bg-muted/80 hover:bg-muted hover:border-accent/40 transition-all rounded-lg px-3 py-2 border border-border"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
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
