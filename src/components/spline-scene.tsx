"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

// Dynamically import Spline to ensure SSR compatibility
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineFallback />,
});

function SplineFallback() {
  return (
    <div className="w-full h-full min-h-[380px] rounded-3xl border border-border/60 bg-gradient-to-br from-card/60 via-card/30 to-primary/5 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl group-hover:bg-primary/25 transition-all duration-700 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      {/* Decorative 3D-like floating elements */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary to-accent p-0.5 shadow-2xl shadow-primary/25 animate-bounce [animation-duration:3.5s]">
          <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-xs space-y-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          Spline 3D Ready
        </div>
        <h3 className="font-semibold text-foreground text-base">
          Interactive 3D Canvas
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Provide your Spline scene export URL to instantly render live interactive 3D assets and animations.
        </p>
      </div>
    </div>
  );
}

interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
}

export function SplineScene({ sceneUrl, className = "" }: SplineSceneProps) {
  const [hasError, setHasError] = React.useState(false);

  if (!sceneUrl || hasError) {
    return (
      <div className={`w-full h-full ${className}`}>
        <SplineFallback />
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative rounded-3xl overflow-hidden ${className}`}>
      <Spline
        scene={sceneUrl}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
