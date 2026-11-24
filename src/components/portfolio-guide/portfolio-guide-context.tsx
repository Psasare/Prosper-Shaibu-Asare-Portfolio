"use client";

import * as React from "react";
import { VisitorProfile, TourStep } from "./types";
import { TOUR_STEPS } from "./tour-steps";

interface PortfolioGuideContextType {
  profile: VisitorProfile | null;
  saveProfile: (profile: VisitorProfile) => void;
  isWelcomeOpen: boolean;
  openWelcome: () => void;
  closeWelcome: () => void;
  isTourActive: boolean;
  isMinimized: boolean;
  currentStepIndex: number;
  currentStep: TourStep;
  totalSteps: number;
  startTour: (fromStep?: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  toggleMinimize: () => void;
  hasCompletedTour: boolean;
}

const PortfolioGuideContext = React.createContext<PortfolioGuideContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: "psa_visitor_profile",
  WELCOME_SEEN: "psa_welcome_seen",
  TOUR_COMPLETED: "psa_tour_completed",
};

export function PortfolioGuideProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<VisitorProfile | null>(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = React.useState<boolean>(false);
  const [isTourActive, setIsTourActive] = React.useState<boolean>(false);
  const [isMinimized, setIsMinimized] = React.useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [hasCompletedTour, setHasCompletedTour] = React.useState<boolean>(false);

  // Initialize from localStorage on client mount
  React.useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const welcomeSeen = localStorage.getItem(STORAGE_KEYS.WELCOME_SEEN);
      const tourCompleted = localStorage.getItem(STORAGE_KEYS.TOUR_COMPLETED);

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (tourCompleted) {
        setHasCompletedTour(true);
      }

      // If welcome was never seen, open the welcome prompt after initial launch sequence completes
      if (!welcomeSeen) {
        let timer: NodeJS.Timeout;
        const handlePortfolioReady = () => {
          timer = setTimeout(() => {
            setIsWelcomeOpen(true);
          }, 600);
        };

        window.addEventListener("portfolio:ready", handlePortfolioReady, { once: true });

        // Fallback timer if launch screen is skipped or event was missed
        const fallbackTimer = setTimeout(() => {
          setIsWelcomeOpen(true);
        }, 11000);

        return () => {
          window.removeEventListener("portfolio:ready", handlePortfolioReady);
          clearTimeout(timer);
          clearTimeout(fallbackTimer);
        };
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

  // Smooth scroll and spotlight target element
  const scrollToTarget = React.useCallback((stepIndex: number) => {
    const step = TOUR_STEPS[stepIndex];
    if (!step) return;

    // Remove spotlight from previous elements
    document.querySelectorAll("[data-tour-spotlight]").forEach((el) => {
      el.removeAttribute("data-tour-spotlight");
    });

    const targetEl = document.getElementById(step.targetId);
    if (targetEl) {
      targetEl.setAttribute("data-tour-spotlight", "true");
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const startTour = React.useCallback(
    (fromStep: number = 0) => {
      setIsWelcomeOpen(false);
      setIsTourActive(true);
      setIsMinimized(false);
      const safeIndex = Math.max(0, Math.min(fromStep, TOUR_STEPS.length - 1));
      setCurrentStepIndex(safeIndex);
      setTimeout(() => {
        scrollToTarget(safeIndex);
      }, 150);
    },
    [scrollToTarget]
  );

  const nextStep = React.useCallback(() => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      scrollToTarget(nextIdx);
    } else {
      // Completed all steps
      setIsTourActive(false);
      setHasCompletedTour(true);
      try {
        localStorage.setItem(STORAGE_KEYS.TOUR_COMPLETED, "true");
      } catch {
        // Ignore
      }
      // Clean up spotlight
      document.querySelectorAll("[data-tour-spotlight]").forEach((el) => {
        el.removeAttribute("data-tour-spotlight");
      });
    }
  }, [currentStepIndex, scrollToTarget]);

  const prevStep = React.useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      scrollToTarget(prevIdx);
    }
  }, [currentStepIndex, scrollToTarget]);

  const endTour = React.useCallback(() => {
    setIsTourActive(false);
    document.querySelectorAll("[data-tour-spotlight]").forEach((el) => {
      el.removeAttribute("data-tour-spotlight");
    });
  }, []);

  const toggleMinimize = React.useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];

  return (
    <PortfolioGuideContext.Provider
      value={{
        profile,
        saveProfile,
        isWelcomeOpen,
        openWelcome,
        closeWelcome,
        isTourActive,
        isMinimized,
        currentStepIndex,
        currentStep,
        totalSteps: TOUR_STEPS.length,
        startTour,
        nextStep,
        prevStep,
        endTour,
        toggleMinimize,
        hasCompletedTour,
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
