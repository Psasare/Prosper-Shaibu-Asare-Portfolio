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
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="max-w-6xl mx-auto backdrop-blur-xl bg-card/70 border border-border/70 rounded-2xl px-5 py-3 shadow-lg shadow-black/5 flex items-center justify-between transition-all">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Terminal className="w-4 h-4" />
          </div>
          <span>
            Prosper <span className="text-primary font-normal">Asare</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
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
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <ThemeToggle />

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto backdrop-blur-2xl bg-card/95 border border-border/80 rounded-2xl p-5 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border flex items-center gap-3 text-sm text-muted-foreground">
            <a
              href="https://github.com/Psasare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
