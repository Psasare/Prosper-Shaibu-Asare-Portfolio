"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, Terminal } from "lucide-react";
import { GithubIcon } from "./icons";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="max-w-6xl mx-auto backdrop-blur-xl bg-card/85 border border-border rounded-2xl px-5 py-3 shadow-xs flex items-center justify-between transition-all">
        {/* Brand with Montserrat */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-montserrat font-extrabold text-base tracking-tight hover:opacity-85 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-foreground">
            Prosper <span className="font-medium text-accent">Asare</span>
          </span>
        </Link>

        {/* Desktop Links with Montserrat uppercase tracking */}
        <div className="hidden md:flex items-center gap-7 font-montserrat text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
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
        <div className="md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-2xl bg-card border border-border shadow-lg space-y-3 font-montserrat text-xs uppercase tracking-wider font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
