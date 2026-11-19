"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { InteractiveCanvas3D } from "./interactive-canvas-3d";

// Dynamically load Spline runtime when a URL is supplied
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <InteractiveCanvas3D />,
});

export interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
}

export function SplineScene({ sceneUrl, className = "" }: SplineSceneProps) {
  const [hasError, setHasError] = React.useState(false);

  // If no external Spline URL is provided or an error occurs, render the interactive 3D canvas engine
  if (!sceneUrl || hasError) {
    return (
      <div className={`w-full h-full ${className}`}>
        <InteractiveCanvas3D />
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
