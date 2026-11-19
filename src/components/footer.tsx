import * as React from "react";
import { Terminal, Heart } from "lucide-react";
import { GithubIcon } from "./icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-10 bg-card/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-foreground">
            Prosper Shaibu Asare
          </span>
          <span>&copy; {currentYear}. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Psasare"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> and Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
