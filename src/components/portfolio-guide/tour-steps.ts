import { TourStep } from "./types";

export const TOUR_STEPS: TourStep[] = [
  {
    id: "hero",
    targetId: "hero",
    badge: "01 / Command Center",
    title: "Welcome & Systems Vision",
    getContent: (name) =>
      `Welcome, ${name}! I'm Byte, your portfolio guide. Prosper Shaibu Asare is an IT Graduate from the University of Ghana, Legon, and current NSS engineer at the UHAS IT Directorate. Notice the bold Georgia Pro Black typography and real-time tech logic grid!`,
    tip: "You can explore the rotating specializations or jump directly into any section.",
  },
  {
    id: "about",
    targetId: "about",
    badge: "02 / Narrative",
    title: "Engineering Journey & Uptime Discipline",
    getContent: (name) =>
      `Here, ${name}, you'll find Prosper's career narrative. Grounded in General Science and Elective ICT from Kpando Senior High, he transitioned from administering mission-critical hospital LAN networks to architecting modern, scalable web applications.`,
    tip: "Notice the 3-chapter scroll-driven timeline progression detailing clinical and full-stack expertise.",
  },
  {
    id: "skills",
    targetId: "skills",
    badge: "03 / Tech Core",
    title: "Full-Stack & Mobile Ecosystem",
    getContent: (name) =>
      `Take a look at the technology core, ${name}! Prosper engineers cross-platform mobile apps with React Native, modern web systems with Next.js & TypeScript, and reliable backend infrastructure.`,
    tip: "Interactive feature: Drag the 3D spherical core or hover over framework cards to inspect competencies.",
  },
  {
    id: "experience",
    targetId: "experience",
    badge: "04 / Field Track Record",
    title: "UHAS IT Directorate & Healthcare LANs",
    getContent: (name) =>
      `In this split-pane navigator, ${name}, explore Prosper's active National Service at the IT Directorate of the University of Health and Allied Sciences (UHAS), as well as his workstation diagnostics at Volta Regional & Ho Teaching Hospitals.`,
    tip: "Click through each milestone card to inspect specific responsibilities, networks, and diagnostic tools.",
  },
  {
    id: "education",
    targetId: "education",
    badge: "05 / Academics",
    title: "University of Ghana & Kpando SHS",
    getContent: (name) =>
      `Here is Prosper's academic grounding, ${name}: Bachelor of Science in Information Technology from the premier University of Ghana, Legon, with foundational General Science and Elective ICT from Kpando Senior High.`,
    tip: "The dual academic bento highlights key curriculum: Systems Administration, Network Security, and Database Systems.",
  },
  {
    id: "projects",
    targetId: "projects",
    badge: "06 / Production Builds",
    title: "Featured Engineering Projects",
    getContent: (name) =>
      `Here are featured software builds, ${name}! From healthcare digital companions and mobile wellness tools to academic platforms—engineered for accessibility, high performance, and real-world scale.`,
    tip: "Check out the live code repositories, interactive demos, and tech tag badges on each project card.",
  },
  {
    id: "contact",
    targetId: "contact",
    badge: "07 / Get in Touch",
    title: "Collaboration & Inquiries",
    getContent: (name) =>
      `That concludes our guided walkthrough, ${name}! Prosper is available for full-stack engineering, mobile application development, and systems consulting. Drop a message directly here!`,
    tip: "Feel free to submit an inquiry through this interactive terminal form or connect via GitHub and LinkedIn.",
  },
];
