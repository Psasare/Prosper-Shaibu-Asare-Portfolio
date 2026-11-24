"use client";

import * as React from "react";
import { usePortfolioGuide } from "./portfolio-guide-context";
import { Compass, Bot, UserCheck } from "lucide-react";

export function TourLauncherBadge() {
  const { isTourActive, isWelcomeOpen, startTour, openWelcome, profile, hasCompletedTour } =
    usePortfolioGuide();

  // Don't show if tour is actively running or welcome dialog is open
  if (isTourActive || isWelcomeOpen) return null;

  const displayName = profile?.addressedAs ? profile.addressedAs : "Visitor";

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
      <div className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg hover:border-accent/50 transition-all group">
        <button
          onClick={openWelcome}
          className="flex items-center gap-2 text-left cursor-pointer hover:opacity-80 transition-opacity"
          title="Change how you are addressed"
          aria-label="Change how you are addressed"
        >
          <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
            {profile ? <UserCheck className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-semibold leading-none">
              Welcome
            </span>
            <span className="font-montserrat font-bold text-xs text-foreground group-hover:text-accent transition-colors leading-tight">
              {displayName}
            </span>
          </div>
        </button>

        <div className="w-[1px] h-6 bg-border mx-0.5" />

        <button
          onClick={() => startTour(0)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-montserrat font-bold text-[11px] uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
        >
          <Compass className="w-3 h-3" />
          <span>{hasCompletedTour ? "Replay Tour" : "Take Tour"}</span>
        </button>
      </div>
    </div>
  );
}
