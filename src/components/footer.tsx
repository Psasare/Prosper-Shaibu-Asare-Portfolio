import * as React from "react";
import { Terminal } from "lucide-react";
import { GithubIcon } from "./icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-14 lg:py-18 bg-card">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 font-montserrat text-xs text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center text-accent">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-foreground">
            Prosper Shaibu Asare
          </span>
          <span className="font-normal font-sans text-muted-foreground">&copy; {currentYear}. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Psasare"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1.5 font-semibold"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span>&bull;</span>
          <span className="font-sans text-muted-foreground">
            Built with Next.js, TypeScript & Three.js
          </span>
        </div>
      </div>
    </footer>
  );
}
