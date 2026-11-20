"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StrokePath {
  d: string;
  delay: number;
  is_underline?: boolean;
}

/**
 * Animated Monoline Stroke Logo: Prosper Shaibu Asare
 *
 * Faithfully re-engineered from the MoZoo monoline tubular stroke animation:
 * - Centerline tubular geometric paths with round linecaps & round joins
 * - Staggered ripple stroke-drawing animation (0% to 100% pathLength)
 * - Distinct tilted signature underlines beneath PROSPER, SHAIBU, and ASARE
 * - Scalable responsive SVG vector viewBox (0 0 1600 900)
 */
const NAME_PATHS: StrokePath[] = [
  {
    "d": "M 435 385 V 250",
    "delay": 0.2
  },
  {
    "d": "M 435 250 H 474.4 A 35.1 35.1 0 0 1 474.4 320.2 H 435",
    "delay": 0.30000000000000004
  },
  {
    "d": "M 543 385 V 250",
    "delay": 0.28
  },
  {
    "d": "M 543 250 H 582.4 A 35.1 35.1 0 0 1 582.4 320.2 H 543",
    "delay": 0.38
  },
  {
    "d": "M 571.7 320.2 L 620.9 385",
    "delay": 0.43000000000000005
  },
  {
    "d": "M 692.0 277.1 A 37.7 37.7 0 1 1 692.0 352.5 A 37.7 37.7 0 1 1 692.0 277.1",
    "delay": 0.36
  },
  {
    "d": "M 834.4 274.3 C 834.4 241.9 757.4 247.3 759 298.6 C 760.6 328.3 839.4 312.1 841 347.2 C 842.6 387.7 765.6 393.1 765.6 360.7",
    "delay": 0.44
  },
  {
    "d": "M 867 385 V 250",
    "delay": 0.52
  },
  {
    "d": "M 867 250 H 906.4 A 35.1 35.1 0 0 1 906.4 320.2 H 867",
    "delay": 0.62
  },
  {
    "d": "M 975 385 V 250",
    "delay": 0.6000000000000001
  },
  {
    "d": "M 975 250 H 1047.2",
    "delay": 0.68
  },
  {
    "d": "M 975 317.5 H 1030.8",
    "delay": 0.7200000000000001
  },
  {
    "d": "M 975 385 H 1047.2",
    "delay": 0.7600000000000001
  },
  {
    "d": "M 1083 385 V 250",
    "delay": 0.6799999999999999
  },
  {
    "d": "M 1083 250 H 1122.4 A 35.1 35.1 0 0 1 1122.4 320.2 H 1083",
    "delay": 0.7799999999999999
  },
  {
    "d": "M 1111.7 320.2 L 1160.9 385",
    "delay": 0.83
  },
  {
    "d": "M 435 421 L 1165 405",
    "delay": 0.75,
    "is_underline": true
  },
  {
    "d": "M 296.4 514.3 C 296.4 481.9 219.4 487.3 221 538.6 C 222.6 568.3 301.4 552.1 303 587.2 C 304.6 627.7 227.6 633.1 227.6 600.7",
    "delay": 0.4
  },
  {
    "d": "M 329 490 V 625",
    "delay": 0.47000000000000003
  },
  {
    "d": "M 411 490 V 625",
    "delay": 0.55
  },
  {
    "d": "M 329 557.5 H 411",
    "delay": 0.5900000000000001
  },
  {
    "d": "M 437 625 L 478.0 490",
    "delay": 0.54
  },
  {
    "d": "M 478.0 490 L 519 625",
    "delay": 0.62
  },
  {
    "d": "M 455.0 571.0 H 501.0",
    "delay": 0.68
  },
  {
    "d": "M 565.0 490 V 625",
    "delay": 0.61
  },
  {
    "d": "M 611 625 V 490",
    "delay": 0.68
  },
  {
    "d": "M 611 490 H 650.4 A 32.4 32.4 0 0 1 650.4 554.8 H 611",
    "delay": 0.76
  },
  {
    "d": "M 611 554.8 H 650.4 A 35.1 35.1 0 0 1 650.4 625 H 611",
    "delay": 0.8200000000000001
  },
  {
    "d": "M 719 490 V 584.0 A 41.0 41.0 0 0 0 801 584.0 V 490",
    "delay": 0.75
  },
  {
    "d": "M 221 661 L 801 645",
    "delay": 0.8500000000000001,
    "is_underline": true
  },
  {
    "d": "M 865 625 L 906.0 490",
    "delay": 0.55
  },
  {
    "d": "M 906.0 490 L 947 625",
    "delay": 0.63
  },
  {
    "d": "M 883.0 571.0 H 929.0",
    "delay": 0.6900000000000001
  },
  {
    "d": "M 1048.4 514.3 C 1048.4 481.9 971.4 487.3 973 538.6 C 974.6 568.3 1053.4 552.1 1055 587.2 C 1056.6 627.7 979.6 633.1 979.6 600.7",
    "delay": 0.6200000000000001
  },
  {
    "d": "M 1081 625 L 1122.0 490",
    "delay": 0.6900000000000001
  },
  {
    "d": "M 1122.0 490 L 1163 625",
    "delay": 0.77
  },
  {
    "d": "M 1099.0 571.0 H 1145.0",
    "delay": 0.8300000000000001
  },
  {
    "d": "M 1189 625 V 490",
    "delay": 0.76
  },
  {
    "d": "M 1189 490 H 1228.4 A 35.1 35.1 0 0 1 1228.4 560.2 H 1189",
    "delay": 0.86
  },
  {
    "d": "M 1217.7 560.2 L 1266.9 625",
    "delay": 0.91
  },
  {
    "d": "M 1297 625 V 490",
    "delay": 0.8300000000000001
  },
  {
    "d": "M 1297 490 H 1369.2",
    "delay": 0.91
  },
  {
    "d": "M 1297 557.5 H 1352.8",
    "delay": 0.9500000000000001
  },
  {
    "d": "M 1297 625 H 1369.2",
    "delay": 0.9900000000000001
  },
  {
    "d": "M 865 661 L 1379 645",
    "delay": 0.9,
    "is_underline": true
  }
];

export function AnimatedNameLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex flex-col items-center justify-center w-full select-none", className)}>
      {/* Ambient Radial Halo */}
      <div className="absolute w-[80%] h-[80%] bg-accent/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Dynamic Monoline Tubular SVG Vector */}
      <svg
        viewBox="0 0 1600 900"
        className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto overflow-visible filter drop-shadow-[0_0_24px_rgba(255,255,255,0.22)] dark:drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] text-foreground dark:text-white"
        aria-label="Prosper Shaibu Asare"
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {NAME_PATHS.map((path, idx) => (
            <motion.path
              key={idx}
              d={path.d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: path.is_underline ? 0.75 : 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: path.delay,
                },
                opacity: {
                  duration: 0.1,
                  delay: path.delay,
                },
              }}
              strokeWidth={path.is_underline ? 22 : 22}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
