"use client";

import * as React from "react";
import { VisitorProfile } from "./types";

interface PortfolioGuideContextType {
  profile: VisitorProfile | null;
  saveProfile: (profile: VisitorProfile) => void;
  isWelcomeOpen: boolean;
  openWelcome: () => void;
  closeWelcome: () => void;
}

const PortfolioGuideContext = React.createContext<PortfolioGuideContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: "psa_visitor_profile",
  WELCOME_SEEN: "psa_welcome_seen",
};

export function PortfolioGuideProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<VisitorProfile | null>(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = React.useState<boolean>(false);

  // Initialize from localStorage on client mount
  React.useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const welcomeSeen = localStorage.getItem(STORAGE_KEYS.WELCOME_SEEN);

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }

      // If welcome was never seen, open the welcome prompt after initial launch sequence
      if (!welcomeSeen) {
        const timer = setTimeout(() => {
          setIsWelcomeOpen(true);
        }, 2200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors in private browsing modes
    }
  }, []);

  const saveProfile = React.useCallback((newProfile: VisitorProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
      localStorage.setItem(STORAGE_KEYS.WELCOME_SEEN, "true");
    } catch {
      // Ignore storage quota
    }
  }, []);

  const openWelcome = React.useCallback(() => {
    setIsWelcomeOpen(true);
  }, []);

  const closeWelcome = React.useCallback(() => {
    setIsWelcomeOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.WELCOME_SEEN, "true");
    } catch {
      // Ignore
    }
  }, []);

  return (
    <PortfolioGuideContext.Provider
      value={{
        profile,
        saveProfile,
        isWelcomeOpen,
        openWelcome,
        closeWelcome,
      }}
    >
      {children}
    </PortfolioGuideContext.Provider>
  );
}

export function usePortfolioGuide() {
  const context = React.useContext(PortfolioGuideContext);
  if (!context) {
    throw new Error("usePortfolioGuide must be used within a PortfolioGuideProvider");
  }
  return context;
}
