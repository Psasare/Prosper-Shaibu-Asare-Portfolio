"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, Terminal } from "lucide-react";
import { GithubIcon } from "./icons";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const { scrollYProgress } = useScroll();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // Scroll Spy: tracks current viewport section
  React.useEffect(() => {
    const sectionIds = ["about", "skills", "experience", "education", "projects", "contact"];
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-25% 0px -55% 0px",
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top Precision Viewport Progress Laser Line */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-[70] pointer-events-none">
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
          className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-12 xl:px-16 pt-5">
        <nav className="max-w-7xl xl:max-w-[1400px] mx-auto backdrop-blur-xl bg-card/85 border border-border rounded-2xl px-6 sm:px-8 py-3.5 shadow-xs flex items-center justify-between transition-all">
          {/* Brand with Montserrat */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-montserrat font-black text-sm uppercase tracking-[0.18em] text-foreground">
              PROSPER <span className="text-accent">ASARE</span>
            </span>
          </Link>

          {/* Desktop Links with Active Section Scroll Spy Indicator */}
          <div className="hidden md:flex items-center gap-7 font-montserrat text-xs uppercase tracking-wider font-semibold text-muted-foreground">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors ${
                    isActive ? "text-foreground font-bold" : "hover:text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action icons & Theme toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Psasare"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden max-w-7xl xl:max-w-[1400px] mx-auto mt-2 p-4 rounded-2xl bg-card border border-border shadow-lg space-y-3 font-montserrat text-xs uppercase tracking-wider font-semibold">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-accent/15 text-accent font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
