"use client";

import * as React from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function InteractiveCanvas3D() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera: Positioned with generous focal buffer so NO device is ever clipped by canvas edges
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 7.0);

    // 3. Renderer with 100% transparent alpha background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    currentMount.appendChild(renderer.domElement);

    const isDark = resolvedTheme === "dark";

    // 4. Lighting: Crisp studio lights highlighting glass, aluminum, and touchscreens
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x222938 : 0xffffff,
      isDark ? 2.6 : 3.0
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xe2e8f0 : 0xffffff,
      isDark ? 3.4 : 2.6
    );
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(
      isDark ? 0xd5bdaf : 0x8e5f2e,
      isDark ? 2.8 : 2.2,
      16
    );
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Dynamic Cursor Spotlight: casts real specular glints on the laptop and phone as user moves mouse
    const cursorLight = new THREE.PointLight(
      isDark ? 0x93c5fd : 0x2563eb,
      isDark ? 3.8 : 3.0,
      10
    );
    cursorLight.position.set(0, 0, 3.5);
    scene.add(cursorLight);

    // 5. Procedural UI Screen Textures
    // A. Laptop Screen Canvas
    const laptopCanvas = document.createElement("canvas");
    laptopCanvas.width = 1024;
    laptopCanvas.height = 640;
    const lCtx = laptopCanvas.getContext("2d")!;
    const bgDark = isDark ? "#0c0e15" : "#ffffff";
    const cardBg = isDark ? "#141824" : "#f1f5f9";
    const textPri = isDark ? "#f8fafc" : "#0f172a";
    const textSec = isDark ? "#94a3b8" : "#64748b";
    const accentColor = isDark ? "#d5bdaf" : "#8e5f2e";
    const blueColor = isDark ? "#38bdf8" : "#2563eb";

    // Base background
    lCtx.fillStyle = bgDark;
    lCtx.fillRect(0, 0, 1024, 640);

    // Window chrome titlebar
    lCtx.fillStyle = cardBg;
    lCtx.fillRect(0, 0, 1024, 48);
    // Window control dots
    lCtx.fillStyle = "#ef4444";
    lCtx.beginPath();
    lCtx.arc(24, 24, 7, 0, Math.PI * 2);
    lCtx.fill();
    lCtx.fillStyle = "#eab308";
    lCtx.beginPath();
    lCtx.arc(46, 24, 7, 0, Math.PI * 2);
    lCtx.fill();
    lCtx.fillStyle = "#22c55e";
    lCtx.beginPath();
    lCtx.arc(68, 24, 7, 0, Math.PI * 2);
    lCtx.fill();

    // Window address pill
    lCtx.fillStyle = isDark ? "#1e2433" : "#e2e8f0";
    lCtx.roundRect(140, 10, 744, 28, 6);
    lCtx.fill();
    lCtx.fillStyle = textSec;
    lCtx.font = "13px monospace";
    lCtx.fillText("https://prosperasare.dev/architecture-telemetry", 160, 29);

    // Header in screen
    lCtx.fillStyle = textPri;
    lCtx.font = "bold 24px sans-serif";
    lCtx.fillText("Full-Stack Enterprise Architecture", 40, 100);
    lCtx.fillStyle = textSec;
    lCtx.font = "14px sans-serif";
    lCtx.fillText("Next.js 16 • TypeScript • UHAS & Hospital Systems", 40, 125);

    // KPI Cards
    const kpis = [
      { label: "Uptime SLA", val: "99.98%", color: "#22c55e" },
      { label: "API Latency", val: "18ms", color: blueColor },
      { label: "Active Nodes", val: "14 Instances", color: accentColor },
    ];
    kpis.forEach((kpi, idx) => {
      const x = 40 + idx * 308;
      lCtx.fillStyle = cardBg;
      lCtx.roundRect(x, 150, 288, 105, 10);
      lCtx.fill();
      lCtx.fillStyle = textSec;
      lCtx.font = "12px sans-serif";
      lCtx.fillText(kpi.label, x + 20, 182);
      lCtx.fillStyle = kpi.color;
      lCtx.font = "bold 28px sans-serif";
      lCtx.fillText(kpi.val, x + 20, 222);
    });

    // Telemetry Graph Card (Left side of screen)
    lCtx.fillStyle = cardBg;
    lCtx.roundRect(40, 280, 500, 320, 10);
    lCtx.fill();

    lCtx.fillStyle = textPri;
    lCtx.font = "bold 16px sans-serif";
    lCtx.fillText("Production Service Traffic & Latency", 65, 315);

    lCtx.strokeStyle = accentColor;
    lCtx.lineWidth = 4;
    lCtx.beginPath();
    const points = [
      [65, 520],
      [130, 480],
      [195, 510],
      [260, 420],
      [325, 450],
      [390, 380],
      [455, 410],
      [515, 360],
    ];
    lCtx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      lCtx.lineTo(points[i][0], points[i][1]);
    }
    lCtx.stroke();

    // Code panel (Right side of screen)
    lCtx.fillStyle = cardBg;
    lCtx.roundRect(565, 280, 419, 320, 10);
    lCtx.fill();
    lCtx.fillStyle = textSec;
    lCtx.font = "bold 13px monospace";
    lCtx.fillText("API Gateway // auth-middleware.ts", 585, 315);

    const codeLines = [
      "export async function verifySession(req) {",
      "  const token = req.headers.get('auth');",
      "  if (!token) return Unauthorized();",
      "  ",
      "  const claims = await decryptJWT(token);",
      "  return NextResponse.next({",
      "    headers: { 'x-user-id': claims.sub }",
      "  });",
      "}",
    ];
    lCtx.fillStyle = isDark ? "#38bdf8" : "#0284c7";
    lCtx.font = "13px monospace";
    codeLines.forEach((line, i) => {
      lCtx.fillText(line, 585, 355 + i * 25);
    });

    const laptopTexture = new THREE.CanvasTexture(laptopCanvas);
    laptopTexture.anisotropy = 8;

    // B. Smartphone Screen Canvas (React Native Mobile UI)
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 512;
    phoneCanvas.height = 1024;
    const pCtx = phoneCanvas.getContext("2d")!;

    pCtx.fillStyle = isDark ? "#080a0f" : "#ffffff";
    pCtx.fillRect(0, 0, 512, 1024);

    // Status bar
    pCtx.fillStyle = textSec;
    pCtx.font = "14px sans-serif";
    pCtx.fillText("09:41", 36, 40);
    pCtx.fillText("5G • 100%", 410, 40);

    // App Header: MindBridge Mental Health App
    pCtx.fillStyle = accentColor;
    pCtx.font = "bold 14px sans-serif";
    pCtx.fillText("REACT NATIVE • MOBILE", 36, 110);
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 26px sans-serif";
    pCtx.fillText("MindBridge Health", 36, 145);

    // Patient assessment card
    pCtx.fillStyle = cardBg;
    pCtx.roundRect(36, 185, 440, 210, 16);
    pCtx.fill();

    pCtx.fillStyle = textPri;
    pCtx.font = "bold 18px sans-serif";
    pCtx.fillText("Maternal & Wellness Sync", 60, 225);
    pCtx.fillStyle = textSec;
    pCtx.font = "13px sans-serif";
    pCtx.fillText("Offline-first data syncing active", 60, 252);

    // Progress circle in card
    pCtx.strokeStyle = accentColor;
    pCtx.lineWidth = 8;
    pCtx.beginPath();
    pCtx.arc(380, 270, 36, -Math.PI / 2, Math.PI * 0.85);
    pCtx.stroke();

    // App action items
    const actions = [
      { title: "Clinical Log Form", sub: "Ho Teaching Hospital protocol" },
      { title: "Medication Schedule", sub: "Prescription reminder queue" },
      { title: "Biometric Readings", sub: "Pulse, glucose & BP records" },
    ];
    actions.forEach((act, idx) => {
      const y = 425 + idx * 105;
      pCtx.fillStyle = cardBg;
      pCtx.roundRect(36, y, 440, 88, 14);
      pCtx.fill();

      pCtx.fillStyle = textPri;
      pCtx.font = "bold 16px sans-serif";
      pCtx.fillText(act.title, 60, y + 38);

      pCtx.fillStyle = textSec;
      pCtx.font = "12px sans-serif";
      pCtx.fillText(act.sub, 60, y + 62);
    });

    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);
    phoneTexture.anisotropy = 8;

    // 6. Master Scene Group: Sized and centered with ample negative margin
    const mainGroup = new THREE.Group();
    // Scaled to 0.76 so that the devices float comfortably with 25% negative space around all edges
    mainGroup.scale.set(0.76, 0.76, 0.76);
    scene.add(mainGroup);

    // 7. Device Models
    const metalMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x272c3d : 0xd1d5db,
      metalness: 0.85,
      roughness: 0.22,
    });
    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f131c : 0x475569,
      metalness: 0.6,
      roughness: 0.4,
    });

    // A. Laptop Group
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.35, -0.15, 0);
    laptopGroup.rotation.y = 0.28;
    laptopGroup.rotation.x = 0.12;
    mainGroup.add(laptopGroup);

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(2.35, 0.07, 1.55);
    const laptopBase = new THREE.Mesh(baseGeo, metalMat);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    // Keyboard recess
    const kbGeo = new THREE.BoxGeometry(2.1, 0.01, 0.82);
    const kbMesh = new THREE.Mesh(kbGeo, darkTrimMat);
    kbMesh.position.set(0, 0.04, -0.18);
    laptopGroup.add(kbMesh);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.72, 0.005, 0.45);
    const trackpadMesh = new THREE.Mesh(
      trackpadGeo,
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x1f2432 : 0xe2e8f0,
        metalness: 0.4,
        roughness: 0.3,
      })
    );
    trackpadMesh.position.set(0, 0.04, 0.46);
    laptopGroup.add(trackpadMesh);

    // Laptop Lid / Screen Assembly
    const screenAssembly = new THREE.Group();
    screenAssembly.position.set(0, 0.035, -0.77);
    screenAssembly.rotation.x = -Math.PI / 1.7; // ~106 degrees open
    laptopGroup.add(screenAssembly);

    // Lid Backing (Aluminum)
    const lidGeo = new THREE.BoxGeometry(2.35, 1.5, 0.05);
    const lidMesh = new THREE.Mesh(lidGeo, metalMat);
    lidMesh.position.set(0, 0.75, 0);
    screenAssembly.add(lidMesh);

    // Screen Glass / UI Display
    const displayGeo = new THREE.PlaneGeometry(2.26, 1.41);
    const displayMat = new THREE.MeshBasicMaterial({
      map: laptopTexture,
      toneMapped: false,
    });
    const displayMesh = new THREE.Mesh(displayGeo, displayMat);
    displayMesh.position.set(0, 0.75, 0.027);
    screenAssembly.add(displayMesh);

    // B. Smartphone Model (Floating at complementary right angle)
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(1.15, -0.18, 0.6);
    phoneGroup.rotation.y = -0.32;
    phoneGroup.rotation.x = 0.08;
    phoneGroup.rotation.z = -0.05;
    mainGroup.add(phoneGroup);

    // Phone Body Chassis
    const phoneGeo = new THREE.BoxGeometry(0.74, 1.52, 0.055);
    const phoneMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1f2330 : 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.18,
    });
    const phoneMesh = new THREE.Mesh(phoneGeo, phoneMat);
    phoneMesh.castShadow = true;
    phoneGroup.add(phoneMesh);

    // Phone Front Screen
    const phoneDisplayGeo = new THREE.PlaneGeometry(0.7, 1.48);
    const phoneDisplayMat = new THREE.MeshBasicMaterial({
      map: phoneTexture,
      toneMapped: false,
    });
    const phoneDisplayMesh = new THREE.Mesh(phoneDisplayGeo, phoneDisplayMat);
    phoneDisplayMesh.position.set(0, 0, 0.029);
    phoneGroup.add(phoneDisplayMesh);

    // Camera island pill
    const cameraIslandGeo = new THREE.BoxGeometry(0.18, 0.045, 0.005);
    const cameraIslandMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const cameraIsland = new THREE.Mesh(cameraIslandGeo, cameraIslandMat);
    cameraIsland.position.set(0, 0.69, 0.031);
    phoneGroup.add(cameraIsland);

    // C. Floating Holographic Data Card (Spatial architecture depth)
    const waferGroup = new THREE.Group();
    waferGroup.position.set(-1.15, 0.75, -0.4);
    waferGroup.rotation.y = 0.45;
    waferGroup.rotation.x = -0.12;
    mainGroup.add(waferGroup);

    const waferGeo = new THREE.PlaneGeometry(0.85, 0.55);
    const waferMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x38bdf8 : 0x2563eb,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });
    const waferMesh = new THREE.Mesh(waferGeo, waferMat);
    waferGroup.add(waferMesh);

    const wireframeGeo = new THREE.EdgesGeometry(waferGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x93c5fd : 0x8e5f2e,
      linewidth: 1.5,
    });
    const waferWire = new THREE.LineSegments(wireframeGeo, wireframeMat);
    waferGroup.add(waferWire);

    // D. Floating Spatial Dust Particles
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0xd5bdaf : 0x8e5f2e,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 8. Fluid Interactive Physics (Drag & Cursor Tracking)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const dragRotation = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      cursorLight.position.x = mouse.x * 2.5;
      cursorLight.position.y = mouse.y * 2.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        dragRotation.y += deltaX * 0.008;
        dragRotation.x += deltaY * 0.008;
        dragVelocity = { x: deltaY * 0.008, y: deltaX * 0.008 };
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouse.x;
        const deltaY = e.touches[0].clientY - prevMouse.y;
        dragRotation.y += deltaX * 0.008;
        dragRotation.x += deltaY * 0.008;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    currentMount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    currentMount.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 9. Render & Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Inertia decay when not dragging
      if (!isDragging) {
        dragRotation.y += dragVelocity.y;
        dragRotation.x += dragVelocity.x;
        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;
      }

      // Smooth floating inertia
      const targetRotY = mouse.x * 0.35 + Math.sin(elapsedTime * 0.45) * 0.06 + dragRotation.y;
      const targetRotX = -mouse.y * 0.25 + Math.cos(elapsedTime * 0.35) * 0.04 + dragRotation.x;

      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.06;

      // Zero-gravity harmonic breathing for each device
      laptopGroup.position.y = -0.15 + Math.sin(elapsedTime * 1.2) * 0.035;
      phoneGroup.position.y = -0.18 + Math.cos(elapsedTime * 1.4) * 0.04;
      waferGroup.position.y = 0.75 + Math.sin(elapsedTime * 0.9) * 0.045;

      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Responsive Resizing
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // 11. Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      currentMount.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);

      // Dispose resources
      baseGeo.dispose();
      kbGeo.dispose();
      trackpadGeo.dispose();
      lidGeo.dispose();
      displayGeo.dispose();
      phoneGeo.dispose();
      phoneDisplayGeo.dispose();
      cameraIslandGeo.dispose();
      waferGeo.dispose();
      wireframeGeo.dispose();
      particleGeo.dispose();

      laptopTexture.dispose();
      phoneTexture.dispose();
      metalMat.dispose();
      darkTrimMat.dispose();
      displayMat.dispose();
      phoneMat.dispose();
      phoneDisplayMat.dispose();
      cameraIslandMat.dispose();
      waferMat.dispose();
      wireframeMat.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center select-none"
      style={{
        maskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 65%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 65%, transparent 100%)",
      }}
    >
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />
    </div>
  );
}
