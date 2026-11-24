"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioGuide } from "./portfolio-guide-context";
import { X, ArrowRight, User, Briefcase } from "lucide-react";

export function WelcomeDialog() {
  const { isWelcomeOpen, closeWelcome, saveProfile, startTour, profile } = usePortfolioGuide();
  const [name, setName] = React.useState(profile?.name || "");
  const [title, setTitle] = React.useState(profile?.role || "");

  React.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setTitle(profile.role);
    }
  }, [profile]);

  const handleSubmit = (withTour: boolean) => {
    const trimmedName = name.trim();
    const trimmedTitle = title.trim();
    const finalName = trimmedName || trimmedTitle || "Guest";
    const addressedAs = trimmedName || trimmedTitle || "Guest";

    saveProfile({
      name: finalName,
      role: trimmedTitle || "Visitor",
      addressedAs,
    });

    if (withTour) {
      startTour(0);
    } else {
      closeWelcome();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(true);
    } else if (e.key === "Escape") {
      closeWelcome();
    }
  };

  return (
    <AnimatePresence>
      {isWelcomeOpen && (
        <div
          role="dialog"
          aria-labelledby="welcome-title"
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-[80] flex justify-center sm:justify-end pointer-events-none select-none"
        >
          {/* Small Floating Menu Card - Completely non-blocking (No full-screen backdrop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 18 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            onKeyDown={handleKeyDown}
            className="w-full max-w-[340px] bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-4 sm:p-5 shadow-2xl pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h2 id="welcome-title" className="font-montserrat font-bold text-sm text-foreground">
                  Welcome
                </h2>
                <p className="font-sans text-xs text-muted-foreground">
                  How should I address you?
                </p>
              </div>
              <button
                onClick={closeWelcome}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields: Preferred Name & Title */}
            <div className="space-y-3 py-3.5">
              <div className="space-y-1">
                <label
                  htmlFor="visitor-name"
                  className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"
                >
                  <User className="w-3 h-3 text-accent" />
                  <span>Preferred Name</span>
                </label>
                <input
                  id="visitor-name"
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah or Alex"
                  className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="visitor-title"
                  className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"
                >
                  <Briefcase className="w-3 h-3 text-accent" />
                  <span>Title</span>
                </label>
                <input
                  id="visitor-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Recruiter, Engineer, Founder"
                  className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                <span>Start Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="px-3 py-2 rounded-xl bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground font-montserrat font-semibold text-xs transition-all cursor-pointer"
              >
                Skip
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
