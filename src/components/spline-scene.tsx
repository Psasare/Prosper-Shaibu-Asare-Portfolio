"use client";

import * as React from "react";
import { InteractiveCanvas3D } from "./interactive-canvas-3d";

export interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
}

export function SplineScene({ className = "" }: SplineSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <InteractiveCanvas3D />
    </div>
  );
}
