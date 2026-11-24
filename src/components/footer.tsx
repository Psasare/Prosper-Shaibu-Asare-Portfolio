import * as React from "react";
import { Terminal } from "lucide-react";
import { GithubIcon } from "./icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-14 lg:py-18 bg-card/75 backdrop-blur-md">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 font-montserrat text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-ultramagnetic font-bold text-xs sm:text-sm text-foreground">
            Prosper Shaibu Asare
          </span>
          <span suppressHydrationWarning className="font-normal font-dm text-xs sm:text-sm text-muted-foreground">&copy; {currentYear}. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <a
            href="https://github.com/Psasare"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1.5 font-bold"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <span>&bull;</span>
          <span className="font-dm text-muted-foreground">
            Built with Next.js, TypeScript &amp; Three.js
          </span>
        </div>
      </div>
    </footer>
  );
}
