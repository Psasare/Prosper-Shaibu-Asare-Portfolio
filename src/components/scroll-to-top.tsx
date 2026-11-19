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
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-card/90 border border-border/80 text-foreground hover:text-primary hover:border-primary/50 backdrop-blur-md shadow-lg shadow-black/10 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
