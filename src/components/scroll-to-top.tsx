"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-card border border-border text-foreground hover:text-accent hover:border-accent shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
