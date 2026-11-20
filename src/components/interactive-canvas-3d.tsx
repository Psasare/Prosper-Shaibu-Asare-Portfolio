"use client";

import * as React from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

/**
 * Interactive 3D Multi-Device Architecture Scene
 *
 * Renders high-fidelity 3D procedural models of a MacBook Pro and iPhone 16 Pro
 * floating completely unboxed directly on the page background.
 *
 * Anti-Clipping Architecture:
 * - True Center of Mass: Both devices are symmetrically centered around (0,0,0)
 *   so rotation never swings off-center or toward viewport edges.
 * - Dynamic Aspect-Ratio Camera Rig: Guarantees at least 4.5 units of visible width
 *   regardless of screen aspect ratio or column size, completely eliminating clipping borders.
 * - 360° Industrial Design: Complete with MacBook metallic chassis & rear logo,
 *   iPhone rear camera island & triple lenses, and dual-sided studio lighting.
 * - 100% Unboxed: Zero cards, zero outlines, zero docks, zero pills.
 */
export function InteractiveCanvas3D() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let width = currentMount.clientWidth;
    let height = currentMount.clientHeight;

    // 1. Scene & Adaptive Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);

    // Compute base distance that guarantees no clipping at any rotation angle
    const computeSafeDistance = (w: number, h: number) => {
      const aspect = w / h;
      const desiredSpan = 4.6; // Units needed to guarantee zero clipping in 360° rotation
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeightAtUnitDist = 2 * Math.tan(fovRad / 2);
      const visibleWidthAtUnitDist = visibleHeightAtUnitDist * aspect;

      // Ensure both horizontal and vertical visible span accommodate desiredSpan
      const distForWidth = desiredSpan / visibleWidthAtUnitDist;
      const distForHeight = 3.6 / visibleHeightAtUnitDist;
      return Math.max(6.2, distForWidth, distForHeight);
    };

    let baseCameraDist = computeSafeDistance(width, height);
    let targetCameraDist = baseCameraDist;
    camera.position.set(0, 0.15, baseCameraDist);

    // 2. Renderer with transparent background (pure alpha)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    const isDark = resolvedTheme === "dark";

    // 3. Multi-Point Studio Lighting (Front, Rim & Back Lighting for 360° Fidelity)
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x1e2433 : 0xffffff,
      isDark ? 2.6 : 2.9
    );
    scene.add(ambientLight);

    // Front Key Light
    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xf1f5f9 : 0xffffff,
      isDark ? 3.2 : 2.6
    );
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Fill Light
    const fillLight = new THREE.PointLight(
      isDark ? 0xd5bdaf : 0x8e5f2e,
      isDark ? 2.6 : 2.0,
      16
    );
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Rim Light (Top-Back)
    const rimLight = new THREE.PointLight(
      isDark ? 0x93c5fd : 0x3b82f6,
      isDark ? 2.2 : 1.6,
      12
    );
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    // Back Studio Light (Ensures metallic sheen and visibility when rotated to rear)
    const backLight = new THREE.DirectionalLight(
      isDark ? 0x64748b : 0xe2e8f0,
      isDark ? 2.2 : 2.0
    );
    backLight.position.set(-3, 3, -5);
    scene.add(backLight);

    // 4. Procedural UI Screen Textures
    // A. Laptop Screen (Full-Stack Next.js 16 Web Architecture)
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
    // Window control dots
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

    // URL address bar
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

    // Graph wave
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

    // Code preview card (Right side of screen)
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

    // B. Smartphone Screen (Mobile Application Development)
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 480;
    phoneCanvas.height = 960;
    const pCtx = phoneCanvas.getContext("2d")!;

    pCtx.fillStyle = isDark ? "#090b11" : "#ffffff";
    pCtx.fillRect(0, 0, 480, 960);

    // Dynamic island / notch
    pCtx.fillStyle = isDark ? "#000000" : "#0f172a";
    pCtx.roundRect(170, 18, 140, 28, 14);
    pCtx.fill();

    // Status bar time
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 14px sans-serif";
    pCtx.fillText("09:41", 40, 38);
    pCtx.fillText("5G • 100%", 380, 38);

    // Mobile App Header
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

    // Progress circle in card
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

    // 5. Assemble 3D Device Models with Symmetrical Center-of-Mass
    const masterGroup = new THREE.Group();
    // Compact scale fits comfortably with abundant margins inside any viewport
    masterGroup.scale.set(0.78, 0.78, 0.78);
    scene.add(masterGroup);

    const deviceStage = new THREE.Group();
    // Offset centers the combined composition at x=0
    deviceStage.position.set(0.18, 0, 0);
    masterGroup.add(deviceStage);

    // Shared Metallic Chassis Materials
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
    // A. 3D LAPTOP MODEL
    // ---------------------------
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.55, -0.08, -0.1);
    laptopGroup.rotation.set(0.16, 0.42, -0.05);

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(2.3, 0.05, 1.5);
    const baseMesh = new THREE.Mesh(baseGeo, chassisMaterial);
    laptopGroup.add(baseMesh);

    // Trackpad
    const trackpadGeo = new THREE.PlaneGeometry(0.7, 0.45);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x222838 : 0xc5cad3,
      metalness: 0.7,
      roughness: 0.4,
    });
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.rotation.x = -Math.PI / 2;
    trackpadMesh.position.set(0, 0.026, 0.42);
    laptopGroup.add(trackpadMesh);

    // Keyboard Area
    const keyboardGeo = new THREE.PlaneGeometry(2.0, 0.75);
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f121a : 0xb8bcc7,
      metalness: 0.6,
      roughness: 0.5,
    });
    const keyboardMesh = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboardMesh.rotation.x = -Math.PI / 2;
    keyboardMesh.position.set(0, 0.026, -0.22);
    laptopGroup.add(keyboardMesh);

    // Laptop Lid (Angled Screen)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.03, -0.72);
    lidGroup.rotation.x = -Math.PI * 0.16;

    const lidGeo = new THREE.BoxGeometry(2.3, 1.45, 0.04);
    const lidMesh = new THREE.Mesh(lidGeo, chassisMaterial);
    lidMesh.position.set(0, 0.725, 0);
    lidGroup.add(lidMesh);

    // Screen Bezel Border
    const bezelGeo = new THREE.BoxGeometry(2.26, 1.41, 0.042);
    const bezelMesh = new THREE.Mesh(bezelGeo, borderMaterial);
    bezelMesh.position.set(0, 0.725, 0.002);
    lidGroup.add(bezelMesh);

    // Screen Display Plane
    const screenGeo = new THREE.PlaneGeometry(2.18, 1.35);
    const screenMat = new THREE.MeshStandardMaterial({
      map: laptopTexture,
      roughness: 0.25,
      metalness: 0.1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.725, 0.024);
    lidGroup.add(screenMesh);

    // Laptop Rear Metallic Emblem (Visible when rotated to the back)
    const logoGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.005, 32);
    const logoMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xffffff : 0x1e293b,
      metalness: 0.95,
      roughness: 0.1,
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.rotation.x = Math.PI / 2;
    logoMesh.position.set(0, 0.725, -0.022);
    lidGroup.add(logoMesh);

    laptopGroup.add(lidGroup);
    deviceStage.add(laptopGroup);

    // ---------------------------
    // B. 3D SMARTPHONE MODEL (Full 360° Industrial Model)
    // ---------------------------
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(0.85, -0.18, 0.55);
    phoneGroup.rotation.set(-0.12, -0.38, 0.06);

    // Phone Body
    const phoneGeo = new THREE.BoxGeometry(0.74, 1.48, 0.04);
    const phoneMesh = new THREE.Mesh(phoneGeo, chassisMaterial);
    phoneGroup.add(phoneMesh);

    // Phone Screen
    const phoneScreenGeo = new THREE.PlaneGeometry(0.7, 1.44);
    const phoneScreenMat = new THREE.MeshStandardMaterial({
      map: phoneTexture,
      roughness: 0.2,
      metalness: 0.1,
    });
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreenMesh.position.set(0, 0, 0.022);
    phoneGroup.add(phoneScreenMesh);

    // Phone Rear Camera Island Bump (Visible when rotated to the back)
    const camBumpGeo = new THREE.BoxGeometry(0.28, 0.30, 0.015);
    const camBumpMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x222736 : 0x9ca3af,
      metalness: 0.85,
      roughness: 0.25,
    });
    const camBumpMesh = new THREE.Mesh(camBumpGeo, camBumpMat);
    camBumpMesh.position.set(-0.16, 0.48, -0.024);
    phoneGroup.add(camBumpMesh);

    // Triple Camera Lenses
    const lensGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.012, 24);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x05070a,
      metalness: 0.9,
      roughness: 0.1,
    });
    const lensPositions: [number, number, number][] = [
      [-0.20, 0.54, -0.034],
      [-0.20, 0.42, -0.034],
      [-0.10, 0.48, -0.034],
    ];
    lensPositions.forEach(([lx, ly, lz]) => {
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(lx, ly, lz);
      phoneGroup.add(lens);
    });

    deviceStage.add(phoneGroup);

    // -------------------------------------------------------------
    // 6. Smooth 360° Drag-to-Orbit, Inertia Physics & Scroll Zoom
    // -------------------------------------------------------------
    const defaultYaw = 0.12;
    const defaultPitch = -0.06;

    let targetYaw = defaultYaw;
    let targetPitch = defaultPitch;
    let currentYaw = defaultYaw;
    let currentPitch = defaultPitch;

    let velocityYaw = 0;
    let velocityPitch = 0;

    let isPointerDown = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPinchDist = 0;

    const handlePointerDown = (clientX: number, clientY: number) => {
      isPointerDown = true;
      lastPointerX = clientX;
      lastPointerY = clientY;
      velocityYaw = 0;
      velocityPitch = 0;
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!isPointerDown) return;
      const deltaX = clientX - lastPointerX;
      const deltaY = clientY - lastPointerY;

      const sensitivity = 0.0065;
      targetYaw += deltaX * sensitivity;
      targetPitch += deltaY * sensitivity;

      velocityYaw = deltaX * sensitivity;
      velocityPitch = deltaY * sensitivity;

      lastPointerX = clientX;
      lastPointerY = clientY;
    };

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    // DOM Mouse Events
    const onMouseDown = (e: MouseEvent) => {
      handlePointerDown(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handlePointerUp();
    };

    // Wheel to Zoom (100% increased zoom depth for close-up inspection)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.004;
      const minDistance = baseCameraDist * 0.48; // 100% more zoom-in capability (2x magnification)
      const maxDistance = baseCameraDist * 1.5;
      targetCameraDist = Math.max(minDistance, Math.min(maxDistance, targetCameraDist + zoomDelta));
    };

    // Touch Events for Mobile / Tablet
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
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (lastPinchDist > 0) {
          const pinchDelta = (lastPinchDist - dist) * 0.009;
          const minDistance = baseCameraDist * 0.48; // 100% more zoom-in range
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

    // Double-click to smoothly reset view to home perspective
    const onDoubleClick = () => {
      targetYaw = defaultYaw;
      targetPitch = defaultPitch;
      targetCameraDist = baseCameraDist;
      velocityYaw = 0;
      velocityPitch = 0;
    };
    domElement.addEventListener("dblclick", onDoubleClick);

    // -------------------------------------------------------------
    // 7. Render Loop with Momentum, Idle Float & Zero Deprecations
    // -------------------------------------------------------------
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;

      // Coasting Momentum & Inertia when released
      if (!isPointerDown) {
        if (Math.abs(velocityYaw) > 0.0001 || Math.abs(velocityPitch) > 0.0001) {
          targetYaw += velocityYaw;
          targetPitch += velocityPitch;
          velocityYaw *= 0.93; // Smooth inertial decay
          velocityPitch *= 0.93;
        } else {
          // Subtle idle ambient rotation
          targetYaw += 0.0018;
        }
      }

      // Safe pitch clamp prevents extreme tilt and keeps models comfortably in frame
      targetPitch = Math.max(-0.42, Math.min(0.42, targetPitch));

      // Silky smooth interpolation (Lerp)
      currentYaw += (targetYaw - currentYaw) * 0.085;
      currentPitch += (targetPitch - currentPitch) * 0.085;

      masterGroup.rotation.y = currentYaw;
      masterGroup.rotation.x = currentPitch;

      // Smooth camera zoom lerp
      camera.position.z += (targetCameraDist - camera.position.z) * 0.08;

      // Organic Zero-Gravity Floating for Devices
      laptopGroup.position.y = -0.08 + Math.sin(elapsedTime * 1.3) * 0.03;
      phoneGroup.position.y = -0.18 + Math.cos(elapsedTime * 1.5) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Dynamic Anti-Clipping Resize Observer
    const handleResize = () => {
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

    // 9. Clean Up
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

      resizeObserver.disconnect();

      laptopTexture.dispose();
      phoneTexture.dispose();
      baseGeo.dispose();
      lidGeo.dispose();
      screenGeo.dispose();
      phoneGeo.dispose();
      phoneScreenGeo.dispose();
      logoGeo.dispose();
      camBumpGeo.dispose();
      lensGeo.dispose();
      chassisMaterial.dispose();
      borderMaterial.dispose();
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
    <div className="relative w-full max-w-[700px] xl:max-w-[760px] h-[520px] sm:h-[580px] lg:h-[640px] xl:h-[680px] flex items-center justify-center select-none overflow-visible pointer-events-auto">
      {/* 3D WebGL Canvas: 100% Unboxed (transparent background, zero borders, zero docks/cards) */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
