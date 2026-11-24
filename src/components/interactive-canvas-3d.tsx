"use client";

import * as React from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

/**
 * Safe WebGL Support Check
 * Prevents WebKit / iOS Safari crashes like:
 * "Uncaught TypeError: null is not an object (evaluating 'glVersion.indexOf')"
 */
function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    const version = (gl as WebGLRenderingContext).getParameter(
      (gl as WebGLRenderingContext).VERSION
    );
    return typeof version === "string" && version.length > 0;
  } catch {
    return false;
  }
}

/**
 * Ultra-crisp 2D Dual-Device Showcase (MacBook Pro + iPhone 16 Pro)
 * Renders on mobile devices (<768px) and environments where WebGL is unavailable or fails.
 * Guarantees 0ms lag, 0 GPU crashes, seamless touch scrolling, and 100% retina clarity.
 */
function DualDeviceShowcase2D({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full max-w-[540px] mx-auto py-2 px-1 flex flex-col items-center justify-center select-none">
      {/* 1. MacBook Pro Chassis */}
      <div className="relative w-full rounded-2xl bg-[#0f172a] dark:bg-[#0a0e17] border border-slate-700/80 dark:border-white/10 shadow-2xl p-2 sm:p-2.5 transition-all">
        {/* Screen Bezel & Camera Notch */}
        <div className="relative w-full aspect-[16/10] rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden flex flex-col">
          {/* Top Bar with traffic light dots & address */}
          <div className="h-7 sm:h-8 bg-slate-900/90 border-b border-slate-800/80 px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
            </div>
            <div className="px-3 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 font-mono text-[9px] sm:text-[10px] text-slate-400">
              prosperasare.dev/architecture-gateway
            </div>
            <div className="w-8" />
          </div>

          {/* Screen Content: Telemetry Dashboard & Architecture */}
          <div className="flex-1 p-3 sm:p-4 bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-montserrat font-bold text-xs sm:text-sm text-white">
                    Full-Stack Enterprise Telemetry
                  </h4>
                  <p className="font-mono text-[8.5px] sm:text-[10px] text-slate-400">
                    Next.js 16 • TypeScript • UG Legon &amp; Clinical Systems
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[8.5px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Metric Cards Row */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-[7.5px] sm:text-[8.5px] text-slate-400 block">SYSTEM UPTIME</span>
                  <span className="font-montserrat font-bold text-[10px] sm:text-xs text-amber-400">99.98% / RELIABLE</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-[7.5px] sm:text-[8.5px] text-slate-400 block">API THROUGHPUT</span>
                  <span className="font-montserrat font-bold text-[10px] sm:text-xs text-sky-400">4.2k req / sec</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-[7.5px] sm:text-[8.5px] text-slate-400 block">DATABASE HEALTH</span>
                  <span className="font-montserrat font-bold text-[10px] sm:text-xs text-emerald-400">OPTIMIZED / SQL</span>
                </div>
              </div>
            </div>

            {/* Split: Wave Traffic Graph + Code Snippet */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80">
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] text-slate-400">Production Traffic</span>
                <svg className="w-full h-8 sm:h-10 text-amber-500/90" viewBox="0 0 100 35" fill="none" stroke="currentColor">
                  <path d="M0 25 Q 15 10, 30 20 T 60 12 T 85 5 T 100 15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 font-mono text-[7.5px] sm:text-[9px] text-slate-300 leading-snug">
                <span className="text-amber-400 font-semibold">export interface Stack</span> {"{"}
                <br />
                &nbsp;&nbsp;web: <span className="text-emerald-400">&apos;Next.js 16&apos;</span>;
                <br />
                &nbsp;&nbsp;mobile: <span className="text-emerald-400">&apos;React Native&apos;</span>;
                <br />
                &nbsp;&nbsp;database: <span className="text-emerald-400">&apos;PostgreSQL&apos;</span>;
                <br />
                {"}"}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base Lip & Trackpad */}
        <div className="w-full h-2.5 sm:h-3 bg-gradient-to-b from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-b-xl flex items-center justify-center mt-0.5">
          <div className="w-16 h-1 rounded-full bg-slate-600/70 dark:bg-slate-700" />
        </div>
      </div>

      {/* 2. iPhone 16 Pro Mockup (Floating slightly overlapping in bottom-right corner) */}
      <div className="absolute -bottom-2 -right-1 sm:right-2 w-[135px] sm:w-[165px] rounded-[24px] bg-[#0f172a] dark:bg-[#0a0e17] border-2 border-slate-700 dark:border-white/15 shadow-2xl p-1.5 sm:p-2 transition-transform duration-300 hover:scale-105">
        <div className="relative w-full aspect-[9/18] rounded-[18px] bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-2">
          {/* Dynamic Island Pill */}
          <div className="flex items-center justify-center pt-0.5">
            <div className="w-12 sm:w-14 h-3 rounded-full bg-black border border-white/10 flex items-center justify-end px-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Mobile App View */}
          <div className="space-y-1.5 text-center my-auto">
            <span className="font-mono text-[7px] sm:text-[8px] text-amber-400 uppercase tracking-widest font-bold">
              REACT NATIVE
            </span>
            <h5 className="font-montserrat font-bold text-[9px] sm:text-[11px] text-white">
              MindBridge Health
            </h5>
            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left">
              <span className="font-mono text-[6.5px] sm:text-[7.5px] text-slate-400 block">CLINICAL SYNC</span>
              <span className="font-montserrat font-bold text-[8.5px] sm:text-[10px] text-emerald-400">82% Verified</span>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-0.5">
            <div className="w-10 h-0.5 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive 3D Multi-Device Architecture Scene
 *
 * Renders high-fidelity 3D procedural models of a MacBook Pro and iPhone 16 Pro
 * floating completely unboxed directly on the page background.
 *
 * Includes bulletproof WebGL safety checks and seamless fallback to the 2D showcase
 * on mobile devices or whenever WebGL context fails.
 */
export function InteractiveCanvas3D() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isFallback, setIsFallback] = React.useState(false);

  React.useEffect(() => {
    // 1. Mobile & WebGL Support Verification
    const isMobile = window.innerWidth < 768;
    if (isMobile || !checkWebGLSupport()) {
      setIsFallback(true);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    let width = currentMount.clientWidth;
    let height = currentMount.clientHeight;

    if (width === 0 || height === 0) {
      width = 600;
      height = 500;
    }

    // 2. Safe WebGLRenderer instantiation wrapped in try / catch
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "default",
      });
      if (!renderer.domElement) {
        throw new Error("WebGL domElement is undefined");
      }
    } catch (err) {
      console.warn("Could not instantiate WebGLRenderer:", err);
      setIsFallback(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.outline = "none";
    renderer.domElement.style.border = "none";
    renderer.domElement.style.background = "transparent";
    renderer.domElement.style.touchAction = "pan-y";
    currentMount.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setIsFallback(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);

    // 3. Scene & Adaptive Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);

    const computeSafeDistance = (w: number, h: number) => {
      const aspect = w / h;
      const desiredSpan = 5.2;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeightAtUnitDist = 2 * Math.tan(fovRad / 2);
      const visibleWidthAtUnitDist = visibleHeightAtUnitDist * aspect;

      const distForWidth = desiredSpan / visibleWidthAtUnitDist;
      const distForHeight = 4.0 / visibleHeightAtUnitDist;
      return Math.max(6.8, distForWidth, distForHeight);
    };

    let baseCameraDist = computeSafeDistance(width, height);
    let targetCameraDist = baseCameraDist;
    camera.position.set(0, 0.15, baseCameraDist);

    const isDark = resolvedTheme === "dark";

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x0c101a : 0xffffff,
      isDark ? 2.0 : 2.9
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xf1f5f9 : 0xffffff,
      isDark ? 3.0 : 2.6
    );
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(
      isDark ? 0xe2a365 : 0x8e5f2e,
      isDark ? 2.2 : 2.0,
      16
    );
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(
      isDark ? 0x93c5fd : 0x3b82f6,
      isDark ? 2.2 : 1.6,
      12
    );
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    const backLight = new THREE.DirectionalLight(
      isDark ? 0x64748b : 0xe2e8f0,
      isDark ? 2.2 : 2.0
    );
    backLight.position.set(-3, 3, -5);
    scene.add(backLight);

    // 5. Procedural UI Screen Textures
    const laptopCanvas = document.createElement("canvas");
    laptopCanvas.width = 1024;
    laptopCanvas.height = 640;
    const lCtx = laptopCanvas.getContext("2d")!;
    const bgDark = isDark ? "#0c0e15" : "#ffffff";
    const cardBg = isDark ? "#141824" : "#f1f5f9";
    const textPri = isDark ? "#f8fafc" : "#0f172a";
    const textSec = isDark ? "#94a3b8" : "#64748b";
    const accentColor = isDark ? "#d5bdaf" : "#8e5f2e";

    lCtx.fillStyle = bgDark;
    lCtx.fillRect(0, 0, 1024, 640);

    // Window top bar
    lCtx.fillStyle = isDark ? "#10131d" : "#e2e8f0";
    lCtx.fillRect(0, 0, 1024, 48);
    lCtx.fillStyle = "#ef4444";
    lCtx.beginPath();
    lCtx.arc(28, 24, 6, 0, Math.PI * 2);
    lCtx.fill();
    lCtx.fillStyle = "#f59e0b";
    lCtx.beginPath();
    lCtx.arc(48, 24, 6, 0, Math.PI * 2);
    lCtx.fill();
    lCtx.fillStyle = "#10b981";
    lCtx.beginPath();
    lCtx.arc(68, 24, 6, 0, Math.PI * 2);
    lCtx.fill();

    // URL bar
    lCtx.fillStyle = cardBg;
    lCtx.roundRect(110, 12, 440, 24, 6);
    lCtx.fill();
    lCtx.fillStyle = textSec;
    lCtx.font = "bold 11px monospace";
    lCtx.fillText("prosperasare.dev/architecture-gateway", 125, 28);

    // Header in screen
    lCtx.fillStyle = textPri;
    lCtx.font = "bold 24px sans-serif";
    lCtx.fillText("Full-Stack Enterprise Telemetry", 40, 96);
    lCtx.fillStyle = textSec;
    lCtx.font = "14px sans-serif";
    lCtx.fillText("Next.js 16 • TypeScript • UG Legon & Clinical Systems", 40, 122);

    // Metrics cards
    const cardW = 280;
    const cardH = 92;
    const metricsData = [
      { title: "SYSTEM UPTIME", val: "99.98% / RELIABLE" },
      { title: "API THROUGHPUT", val: "4.2k req / sec" },
      { title: "DATABASE HEALTH", val: "OPTIMIZED / SQL" },
    ];
    for (let c = 0; c < 3; c++) {
      const x = 40 + c * (cardW + 30);
      lCtx.fillStyle = cardBg;
      lCtx.roundRect(x, 146, cardW, cardH, 12);
      lCtx.fill();

      lCtx.fillStyle = textSec;
      lCtx.font = "bold 11px sans-serif";
      lCtx.fillText(metricsData[c].title, x + 18, 174);

      lCtx.fillStyle = accentColor;
      lCtx.font = "bold 20px sans-serif";
      lCtx.fillText(metricsData[c].val, x + 18, 210);
    }

    // Main graph area
    lCtx.fillStyle = cardBg;
    lCtx.roundRect(40, 265, 590, 335, 14);
    lCtx.fill();
    lCtx.fillStyle = textPri;
    lCtx.font = "bold 16px sans-serif";
    lCtx.fillText("Production Service Traffic & Latency", 65, 305);

    lCtx.strokeStyle = accentColor;
    lCtx.lineWidth = 4;
    lCtx.beginPath();
    const pts = [
      [65, 510],
      [140, 470],
      [220, 490],
      [310, 400],
      [400, 430],
      [490, 350],
      [580, 370],
    ];
    lCtx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      lCtx.lineTo(pts[i][0], pts[i][1]);
    }
    lCtx.stroke();

    // Code preview card
    lCtx.fillStyle = cardBg;
    lCtx.roundRect(660, 265, 324, 335, 14);
    lCtx.fill();
    lCtx.fillStyle = accentColor;
    lCtx.font = "bold 13px monospace";
    lCtx.fillText("export interface Stack {", 685, 310);
    lCtx.fillStyle = textSec;
    lCtx.font = "12px monospace";
    lCtx.fillText("  web: 'Next.js 16';", 705, 345);
    lCtx.fillText("  mobile: 'React Native';", 705, 375);
    lCtx.fillText("  database: 'PostgreSQL';", 705, 405);
    lCtx.fillText("  infrastructure: 'LANs';", 705, 435);
    lCtx.fillText("  uptime: '99.98%';", 705, 465);
    lCtx.fillStyle = accentColor;
    lCtx.fillText("}", 685, 500);

    const laptopTexture = new THREE.CanvasTexture(laptopCanvas);

    // Smartphone Screen
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 480;
    phoneCanvas.height = 960;
    const pCtx = phoneCanvas.getContext("2d")!;

    pCtx.fillStyle = isDark ? "#090b11" : "#ffffff";
    pCtx.fillRect(0, 0, 480, 960);

    // Dynamic island
    pCtx.fillStyle = isDark ? "#000000" : "#0f172a";
    pCtx.roundRect(170, 18, 140, 28, 14);
    pCtx.fill();

    // Status bar
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 14px sans-serif";
    pCtx.fillText("09:41", 40, 38);
    pCtx.fillText("5G • 100%", 380, 38);

    // Mobile Header
    pCtx.fillStyle = accentColor;
    pCtx.font = "bold 12px sans-serif";
    pCtx.fillText("REACT NATIVE • MOBILE", 36, 105);
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 26px sans-serif";
    pCtx.fillText("MindBridge Health", 36, 140);

    // Mobile Hero Card
    pCtx.fillStyle = cardBg;
    pCtx.roundRect(36, 175, 408, 220, 20);
    pCtx.fill();
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 18px sans-serif";
    pCtx.fillText("Maternal & Wellness Sync", 60, 220);
    pCtx.fillStyle = textSec;
    pCtx.font = "13px sans-serif";
    pCtx.fillText("Offline-first data caching active", 60, 248);

    // Progress circle
    pCtx.strokeStyle = accentColor;
    pCtx.lineWidth = 10;
    pCtx.beginPath();
    pCtx.arc(240, 320, 40, 0, Math.PI * 1.6);
    pCtx.stroke();
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 16px sans-serif";
    pCtx.fillText("82%", 225, 326);

    // Card 2
    pCtx.fillStyle = cardBg;
    pCtx.roundRect(36, 420, 408, 150, 20);
    pCtx.fill();
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 16px sans-serif";
    pCtx.fillText("Clinical Telemetry Station", 60, 460);
    pCtx.fillStyle = textSec;
    pCtx.font = "12px sans-serif";
    pCtx.fillText("Ho Teaching (Trafalgar) & Volta Hosp.", 60, 490);
    pCtx.fillStyle = accentColor;
    pCtx.font = "bold 14px sans-serif";
    pCtx.fillText("LAN Node: Online • Gigabit", 60, 525);

    // Bottom Navigation Bar
    pCtx.fillStyle = isDark ? "#11141c" : "#e2e8f0";
    pCtx.roundRect(40, 840, 400, 60, 30);
    pCtx.fill();
    pCtx.fillStyle = accentColor;
    pCtx.beginPath();
    pCtx.arc(120, 870, 8, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.fillStyle = textSec;
    pCtx.beginPath();
    pCtx.arc(240, 870, 8, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.beginPath();
    pCtx.arc(360, 870, 8, 0, Math.PI * 2);
    pCtx.fill();

    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);

    // 6. Assemble 3D Device Models
    const masterGroup = new THREE.Group();
    masterGroup.scale.set(0.78, 0.78, 0.78);
    scene.add(masterGroup);

    const deviceStage = new THREE.Group();
    deviceStage.position.set(0.18, 0, 0);
    masterGroup.add(deviceStage);

    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x181c26 : 0xd1d5db,
      metalness: 0.88,
      roughness: 0.22,
    });

    const borderMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x2d3748 : 0x9ca3af,
      metalness: 0.9,
      roughness: 0.2,
    });

    // ---------------------------
    // LAPTOP MODEL
    // ---------------------------
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.55, -0.08, -0.1);
    laptopGroup.rotation.set(0.16, 0.42, -0.05);

    const baseGeo = new THREE.BoxGeometry(2.3, 0.05, 1.5);
    const baseMesh = new THREE.Mesh(baseGeo, chassisMaterial);
    laptopGroup.add(baseMesh);

    const trackpadGeo = new THREE.PlaneGeometry(0.7, 0.45);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x222838 : 0xc5cad3,
      roughness: 0.4,
    });
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.rotation.x = -Math.PI / 2;
    trackpadMesh.position.set(0, 0.026, 0.45);
    laptopGroup.add(trackpadMesh);

    // Screen Lid
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.025, -0.73);
    lidGroup.rotation.x = -1.82;

    const lidGeo = new THREE.BoxGeometry(2.3, 1.5, 0.04);
    const lidMesh = new THREE.Mesh(lidGeo, chassisMaterial);
    lidMesh.position.set(0, 0.75, 0);
    lidGroup.add(lidMesh);

    const screenGeo = new THREE.PlaneGeometry(2.2, 1.4);
    const screenMat = new THREE.MeshBasicMaterial({ map: laptopTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.75, 0.021);
    lidGroup.add(screenMesh);

    const logoGeo = new THREE.CircleGeometry(0.1, 32);
    const logoMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x94a3b8 : 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, 0.75, -0.021);
    logoMesh.rotation.y = Math.PI;
    lidGroup.add(logoMesh);

    laptopGroup.add(lidGroup);
    deviceStage.add(laptopGroup);

    // ---------------------------
    // SMARTPHONE MODEL (iPhone 16 Pro)
    // ---------------------------
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(1.05, -0.18, 0.35);
    phoneGroup.rotation.set(-0.12, -0.38, 0.08);

    const phoneGeo = new THREE.BoxGeometry(0.75, 1.52, 0.06);
    const phoneMesh = new THREE.Mesh(phoneGeo, borderMaterial);
    phoneGroup.add(phoneMesh);

    const phoneScreenGeo = new THREE.PlaneGeometry(0.71, 1.47);
    const phoneScreenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreenMesh.position.set(0, 0, 0.031);
    phoneGroup.add(phoneScreenMesh);

    const camBumpGeo = new THREE.BoxGeometry(0.34, 0.36, 0.03);
    const camBumpMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1f293d : 0xb0b7c3,
      metalness: 0.85,
      roughness: 0.25,
    });
    const camBumpMesh = new THREE.Mesh(camBumpGeo, camBumpMat);
    camBumpMesh.position.set(-0.16, 0.52, -0.045);
    phoneGroup.add(camBumpMesh);

    const lensGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.02, 24);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      metalness: 0.9,
      roughness: 0.1,
    });
    const lens1 = new THREE.Mesh(lensGeo, lensMat);
    lens1.rotation.x = Math.PI / 2;
    lens1.position.set(-0.21, 0.58, -0.062);
    phoneGroup.add(lens1);

    const lens2 = new THREE.Mesh(lensGeo, lensMat);
    lens2.rotation.x = Math.PI / 2;
    lens2.position.set(-0.21, 0.44, -0.062);
    phoneGroup.add(lens2);

    const lens3 = new THREE.Mesh(lensGeo, lensMat);
    lens3.rotation.x = Math.PI / 2;
    lens3.position.set(-0.09, 0.51, -0.062);
    phoneGroup.add(lens3);

    deviceStage.add(phoneGroup);

    // 7. Interaction & Motion Controls
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const defaultYaw = -0.15;
    const defaultPitch = 0.08;
    let currentYaw = defaultYaw;
    let currentPitch = defaultPitch;
    let targetYaw = defaultYaw;
    let targetPitch = defaultPitch;

    let velocityYaw = 0;
    let velocityPitch = 0;
    let lastPinchDist = 0;

    const handlePointerDown = (clientX: number, clientY: number) => {
      isPointerDown = true;
      prevPointerX = clientX;
      prevPointerY = clientY;
      velocityYaw = 0;
      velocityPitch = 0;
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!isPointerDown) return;
      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;
      prevPointerX = clientX;
      prevPointerY = clientY;

      velocityYaw = deltaX * 0.0055;
      velocityPitch = deltaY * 0.0055;

      targetYaw += velocityYaw;
      targetPitch += velocityPitch;
    };

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      handlePointerDown(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handlePointerUp();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0035;
      const minDistance = baseCameraDist * 0.72;
      const maxDistance = baseCameraDist * 1.35;
      targetCameraDist = Math.max(minDistance, Math.min(maxDistance, targetCameraDist + zoomDelta));
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isPointerDown && e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (lastPinchDist > 0) {
          const pinchDelta = (lastPinchDist - dist) * 0.009;
          const minDistance = baseCameraDist * 0.65;
          const maxDistance = baseCameraDist * 1.5;
          targetCameraDist = Math.max(minDistance, Math.min(maxDistance, targetCameraDist + pinchDelta));
        }
        lastPinchDist = dist;
      }
    };

    const onTouchEnd = () => {
      handlePointerUp();
      lastPinchDist = 0;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("wheel", onWheel, { passive: false });

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const onDoubleClick = () => {
      targetYaw = defaultYaw;
      targetPitch = defaultPitch;
      targetCameraDist = baseCameraDist;
      velocityYaw = 0;
      velocityPitch = 0;
    };
    domElement.addEventListener("dblclick", onDoubleClick);

    let animationFrameId: number;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(currentMount);

    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || !isTabVisible) return;

      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;

      if (!isPointerDown) {
        if (Math.abs(velocityYaw) > 0.0001 || Math.abs(velocityPitch) > 0.0001) {
          targetYaw += velocityYaw;
          targetPitch += velocityPitch;
          velocityYaw *= 0.93;
          velocityPitch *= 0.93;
        } else {
          targetYaw += 0.0018;
        }
      }

      targetPitch = Math.max(-0.42, Math.min(0.42, targetPitch));
      currentYaw += (targetYaw - currentYaw) * 0.085;
      currentPitch += (targetPitch - currentPitch) * 0.085;

      masterGroup.rotation.y = currentYaw;
      masterGroup.rotation.x = currentPitch;
      camera.position.z += (targetCameraDist - camera.position.z) * 0.08;

      laptopGroup.position.y = -0.08 + Math.sin(elapsedTime * 1.3) * 0.03;
      phoneGroup.position.y = -0.18 + Math.cos(elapsedTime * 1.5) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsFallback(true);
        return;
      }
      if (!currentMount) return;
      width = currentMount.clientWidth;
      height = currentMount.clientHeight;
      camera.aspect = width / height;

      baseCameraDist = computeSafeDistance(width, height);
      if (!isPointerDown) {
        targetCameraDist = baseCameraDist;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentMount);

    return () => {
      cancelAnimationFrame(animationFrameId);

      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("wheel", onWheel);

      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      domElement.removeEventListener("dblclick", onDoubleClick);
      domElement.removeEventListener("webglcontextlost", handleContextLost);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      laptopTexture.dispose();
      phoneTexture.dispose();
      baseGeo.dispose();
      trackpadGeo.dispose();
      lidGeo.dispose();
      screenGeo.dispose();
      phoneGeo.dispose();
      phoneScreenGeo.dispose();
      logoGeo.dispose();
      camBumpGeo.dispose();
      lensGeo.dispose();
      chassisMaterial.dispose();
      borderMaterial.dispose();
      trackpadMat.dispose();
      screenMat.dispose();
      phoneScreenMat.dispose();
      logoMat.dispose();
      camBumpMat.dispose();
      lensMat.dispose();
      renderer.dispose();

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div className="relative w-full max-w-[700px] xl:max-w-[760px] min-h-[300px] sm:min-h-[420px] lg:h-[600px] xl:h-[640px] flex items-center justify-center select-none overflow-visible pointer-events-auto">
      {isFallback ? (
        <DualDeviceShowcase2D isDark={resolvedTheme === "dark"} />
      ) : (
        <div
          ref={mountRef}
          style={{ touchAction: "pan-y" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />
      )}
    </div>
  );
}
