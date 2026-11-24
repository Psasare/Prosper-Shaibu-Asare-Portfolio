"use client";

import * as React from "react";
import { usePortfolioGuide } from "./portfolio-guide-context";
import { User, UserCheck, Edit3 } from "lucide-react";

export function VisitorBadge() {
  const { isWelcomeOpen, openWelcome, profile } = usePortfolioGuide();

  // Don't show if welcome dialog is open
  if (isWelcomeOpen) return null;

  const displayName = profile?.addressedAs ? profile.addressedAs : "Visitor";

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
      <button
        onClick={openWelcome}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg hover:border-accent/50 transition-all group cursor-pointer"
        title="Change how you are addressed"
        aria-label="Change how you are addressed"
      >
        <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
          {profile ? <UserCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Welcome,
          </span>
          <span className="font-montserrat font-bold text-xs text-foreground group-hover:text-accent transition-colors">
            {displayName}
          </span>
          <Edit3 className="w-3 h-3 text-muted-foreground group-hover:text-foreground opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
        </div>
      </button>
    </div>
  );
}

// Keep backward-compatible alias
export const TourLauncherBadge = VisitorBadge;
