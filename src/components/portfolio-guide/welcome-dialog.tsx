"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioGuide } from "./portfolio-guide-context";
import { Sparkles, User, ArrowRight, X, Bot, Compass } from "lucide-react";

const ROLE_OPTIONS = [
  { id: "Recruiter", label: "Recruiter", emoji: "💼" },
  { id: "Hiring Manager", label: "Hiring Manager", emoji: "🎯" },
  { id: "Software Engineer", label: "Fellow Engineer", emoji: "⚡" },
  { id: "Client / Founder", label: "Client / Founder", emoji: "🤝" },
  { id: "Guest", label: "Tech Explorer", emoji: "🔭" },
];

export function WelcomeDialog() {
  const { isWelcomeOpen, closeWelcome, saveProfile, startTour, profile } = usePortfolioGuide();
  const [name, setName] = React.useState(profile?.name || "");
  const [selectedRole, setSelectedRole] = React.useState(profile?.role || "Recruiter");

  React.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setSelectedRole(profile.role);
    }
  }, [profile]);

  const handleSubmit = (withTour: boolean) => {
    const trimmedName = name.trim();
    const finalName = trimmedName || selectedRole || "Distinguished Guest";
    const addressedAs = trimmedName ? trimmedName : selectedRole;

    saveProfile({
      name: finalName,
      role: selectedRole,
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
          aria-modal="true"
          aria-labelledby="welcome-title"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWelcome}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onKeyDown={handleKeyDown}
            className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Ambient Background Aura */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={closeWelcome}
              className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
              aria-label="Close welcome prompt"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Mini Instructor Mascot Icon */}
            <div className="flex items-start gap-4 pb-5">
              <div className="relative flex-shrink-0 w-13 h-13 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-xs">
                <Bot className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                </span>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>Personalized Walkthrough</span>
                </div>
                <h2 id="welcome-title" className="font-montserrat text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  How should I address you?
                </h2>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed pb-5">
              Select your perspective or enter your name so our mini guide, <strong className="text-foreground font-semibold">Byte</strong>, can curate a personalized walkthrough of Prosper&apos;s systems and engineering builds.
            </p>

            {/* Role Chips */}
            <div className="space-y-2 pb-5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                Your Role or Perspective
              </label>
              <div className="flex flex-wrap gap-2">
                {ROLE_OPTIONS.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-accent text-accent-foreground border-accent font-semibold shadow-xs"
                          : "bg-muted/40 border-border text-foreground hover:bg-muted/80"
                      }`}
                    >
                      <span>{role.emoji}</span>
                      <span>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name / Handle Input */}
            <div className="space-y-2 pb-6">
              <label htmlFor="visitor-name-input" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                Preferred Name or Title <span className="text-muted-foreground/60 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="visitor-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`E.g. Sarah, Alex, Dr. Mensah, or leave blank for ${selectedRole}`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/40 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Start Guided Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 font-montserrat font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore on My Own</span>
              </button>
            </div>

            {/* Keyboard hint */}
            <div className="pt-4 text-center">
              <span className="font-mono text-[10px] text-muted-foreground/70 tracking-wide">
                Press [Enter] to launch tour • [Esc] to skip
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
