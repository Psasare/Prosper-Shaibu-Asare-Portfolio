"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Sparkles, Layers, Box, Compass } from "lucide-react";

// Dynamically load Spline runtime to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineFallback />,
});

function SplineFallback() {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full min-h-[380px] rounded-3xl border border-border/80 bg-gradient-to-br from-card/90 via-card/50 to-primary/5 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group transition-all duration-300 shadow-xl shadow-black/5"
      style={{ perspective: 1000 }}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/20 blur-[90px] group-hover:bg-primary/30 transition-all duration-700 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent/20 blur-[90px] group-hover:bg-accent/30 transition-all duration-700 pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 3D Floating Interactive Cube Container */}
      <div
        className="relative mb-8 transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-primary via-blue-500 to-indigo-500 p-0.5 shadow-2xl shadow-primary/30 animate-pulse [animation-duration:4s]">
          <div className="w-full h-full rounded-[22px] bg-card/95 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden">
            <Box className="w-10 h-10 text-primary transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Orbiting indicators */}
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-primary text-xs">
          <Sparkles className="w-4 h-4 animate-spin [animation-duration:8s]" />
        </div>
        <div className="absolute -bottom-2 -left-3 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-accent text-xs">
          <Layers className="w-4 h-4" />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-xs space-y-2.5 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/25">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive 3D Viewport</span>
        </div>
        <h3 className="font-bold text-foreground text-base tracking-tight">
          Spline Canvas Ready
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Plug in your exported Spline URL to render live real-time 3D objects, keyframe animations, and event triggers.
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
    <div
      className={`w-full h-full relative rounded-3xl overflow-hidden border border-border/80 bg-card/50 shadow-xl ${className}`}
    >
      <Spline scene={sceneUrl} onError={() => setHasError(true)} />
    </div>
  );
}
