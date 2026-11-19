"use client";

import * as React from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { Globe, Smartphone, Layers, RotateCcw } from "lucide-react";

type FocusMode = "all" | "web" | "mobile";

export function InteractiveCanvas3D() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [activeMode, setActiveMode] = React.useState<FocusMode>("all");

  const targetCameraPos = React.useRef({ x: 0, y: 0.2, z: 5.2 });
  const targetCameraLookAt = React.useRef({ x: 0, y: 0, z: 0 });

  // Update target camera position when mode changes
  React.useEffect(() => {
    if (activeMode === "web") {
      targetCameraPos.current = { x: -0.35, y: 0.35, z: 3.2 };
      targetCameraLookAt.current = { x: -0.35, y: 0.1, z: 0 };
    } else if (activeMode === "mobile") {
      targetCameraPos.current = { x: 1.05, y: -0.15, z: 2.6 };
      targetCameraLookAt.current = { x: 1.05, y: -0.25, z: 0.65 };
    } else {
      targetCameraPos.current = { x: 0, y: 0.2, z: 5.2 };
      targetCameraLookAt.current = { x: 0, y: 0, z: 0 };
    }
  }, [activeMode]);

  React.useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(
      targetCameraPos.current.x,
      targetCameraPos.current.y,
      targetCameraPos.current.z
    );

    // 3. Renderer with transparent background (100% uncontained, no box)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    const isDark = resolvedTheme === "dark";

    // 4. Studio Lighting: Crisp highlights on glass and metallic chassis
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x1e2433 : 0xffffff,
      isDark ? 2.4 : 2.8
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xe2e8f0 : 0xffffff,
      isDark ? 3.2 : 2.5
    );
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(
      isDark ? 0xd5bdaf : 0x8e5f2e,
      isDark ? 2.8 : 2.2,
      15
    );
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Dynamic Cursor Spotlight: casts real specular glints on the laptop and phone as user moves mouse
    const cursorLight = new THREE.PointLight(
      isDark ? 0xd5bdaf : 0x8e5f2e,
      isDark ? 3.5 : 2.8,
      9
    );
    cursorLight.position.set(0, 0, 3);
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

    lCtx.fillStyle = bgDark;
    lCtx.fillRect(0, 0, 1024, 640);

    // Window top bar
    lCtx.fillStyle = isDark ? "#10131d" : "#e2e8f0";
    lCtx.fillRect(0, 0, 1024, 48);
    // Dots
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
    lCtx.roundRect(110, 12, 420, 24, 6);
    lCtx.fill();
    lCtx.fillStyle = textSec;
    lCtx.font = "bold 11px monospace";
    lCtx.fillText("psasare.dev/architecture-gateway", 125, 28);

    // Header in screen
    lCtx.fillStyle = textPri;
    lCtx.font = "bold 24px sans-serif";
    lCtx.fillText("Full-Stack Enterprise Architecture", 40, 100);
    lCtx.fillStyle = textSec;
    lCtx.font = "14px sans-serif";
    lCtx.fillText("Next.js 16 • TypeScript • UHAS & Hospital Systems", 40, 125);

    // Metrics cards
    const cardW = 280;
    const cardH = 95;
    for (let c = 0; c < 3; c++) {
      const x = 40 + c * (cardW + 30);
      lCtx.fillStyle = cardBg;
      lCtx.roundRect(x, 150, cardW, cardH, 12);
      lCtx.fill();

      lCtx.fillStyle = textSec;
      lCtx.font = "bold 11px sans-serif";
      const titles = ["SYSTEM UPTIME", "API THROUGHPUT", "DATABASE HEALTH"];
      lCtx.fillText(titles[c], x + 18, 178);

      lCtx.fillStyle = accentColor;
      lCtx.font = "bold 22px sans-serif";
      const values = ["99.98% / RELIABLE", "4.2k req / sec", "OPTIMIZED / SQL"];
      lCtx.fillText(values[c], x + 18, 215);
    }

    // Main graph area
    lCtx.fillStyle = cardBg;
    lCtx.roundRect(40, 275, 590, 320, 14);
    lCtx.fill();
    lCtx.fillStyle = textPri;
    lCtx.font = "bold 16px sans-serif";
    lCtx.fillText("Production Service Traffic & Latency", 65, 315);

    lCtx.strokeStyle = accentColor;
    lCtx.lineWidth = 4;
    lCtx.beginPath();
    const pts = [
      [65, 520],
      [140, 480],
      [220, 500],
      [310, 410],
      [400, 440],
      [490, 360],
      [580, 380],
    ];
    lCtx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      lCtx.lineTo(pts[i][0], pts[i][1]);
    }
    lCtx.stroke();

    // Code panel
    lCtx.fillStyle = cardBg;
    lCtx.roundRect(660, 275, 324, 320, 14);
    lCtx.fill();
    lCtx.fillStyle = accentColor;
    lCtx.font = "bold 13px monospace";
    lCtx.fillText("export interface Architecture {", 685, 320);
    lCtx.fillStyle = textSec;
    lCtx.font = "12px monospace";
    lCtx.fillText("  stack: 'Next.js' | 'Node';", 705, 355);
    lCtx.fillText("  mobile: 'React Native';", 705, 385);
    lCtx.fillText("  database: 'PostgreSQL';", 705, 415);
    lCtx.fillText("  uptime: 'High-Availability';", 705, 445);
    lCtx.fillText("  hospitalLAN: 'Active';", 705, 475);
    lCtx.fillStyle = accentColor;
    lCtx.fillText("}", 685, 510);

    const laptopTexture = new THREE.CanvasTexture(laptopCanvas);

    // B. Smartphone Screen Canvas
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 480;
    phoneCanvas.height = 960;
    const pCtx = phoneCanvas.getContext("2d")!;

    pCtx.fillStyle = isDark ? "#090b11" : "#ffffff";
    pCtx.fillRect(0, 0, 480, 960);

    // Notch
    pCtx.fillStyle = isDark ? "#000000" : "#0f172a";
    pCtx.roundRect(170, 18, 140, 28, 14);
    pCtx.fill();

    pCtx.fillStyle = textPri;
    pCtx.font = "bold 14px sans-serif";
    pCtx.fillText("09:41", 40, 38);
    pCtx.fillText("5G • 100%", 380, 38);

    pCtx.fillStyle = accentColor;
    pCtx.font = "bold 12px sans-serif";
    pCtx.fillText("REACT NATIVE • MOBILE", 36, 105);
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 26px sans-serif";
    pCtx.fillText("MindBridge Health", 36, 140);

    pCtx.fillStyle = cardBg;
    pCtx.roundRect(36, 175, 408, 220, 20);
    pCtx.fill();
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 18px sans-serif";
    pCtx.fillText("Maternal & Wellness Sync", 60, 220);
    pCtx.fillStyle = textSec;
    pCtx.font = "13px sans-serif";
    pCtx.fillText("Offline-first data caching active", 60, 248);

    pCtx.strokeStyle = accentColor;
    pCtx.lineWidth = 10;
    pCtx.beginPath();
    pCtx.arc(240, 320, 40, 0, Math.PI * 1.6);
    pCtx.stroke();
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 16px sans-serif";
    pCtx.fillText("82%", 225, 326);

    pCtx.fillStyle = cardBg;
    pCtx.roundRect(36, 420, 408, 150, 20);
    pCtx.fill();
    pCtx.fillStyle = textPri;
    pCtx.font = "bold 16px sans-serif";
    pCtx.fillText("Clinical Telemetry Station", 60, 460);
    pCtx.fillStyle = textSec;
    pCtx.font = "12px sans-serif";
    pCtx.fillText("Ho Teaching & Volta Regional Hospital", 60, 490);
    pCtx.fillStyle = accentColor;
    pCtx.font = "bold 14px sans-serif";
    pCtx.fillText("LAN Node: Online • Fast", 60, 525);

    // Nav bar
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

    // 6. 3D Model Assembly
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

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
    laptopGroup.position.set(-0.35, -0.15, -0.1);
    laptopGroup.rotation.set(0.18, 0.45, -0.06);

    const baseGeo = new THREE.BoxGeometry(2.3, 0.05, 1.5);
    const baseMesh = new THREE.Mesh(baseGeo, chassisMaterial);
    laptopGroup.add(baseMesh);

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

    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.03, -0.72);
    lidGroup.rotation.x = -Math.PI * 0.16;

    const lidGeo = new THREE.BoxGeometry(2.3, 1.45, 0.04);
    const lidMesh = new THREE.Mesh(lidGeo, chassisMaterial);
    lidMesh.position.set(0, 0.725, 0);
    lidGroup.add(lidMesh);

    const bezelGeo = new THREE.BoxGeometry(2.26, 1.41, 0.042);
    const bezelMesh = new THREE.Mesh(bezelGeo, borderMaterial);
    bezelMesh.position.set(0, 0.725, 0.002);
    lidGroup.add(bezelMesh);

    const screenGeo = new THREE.PlaneGeometry(2.18, 1.35);
    const screenMat = new THREE.MeshStandardMaterial({
      map: laptopTexture,
      roughness: 0.25,
      metalness: 0.1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.725, 0.024);
    lidGroup.add(screenMesh);

    laptopGroup.add(lidGroup);
    mainGroup.add(laptopGroup);

    // ---------------------------
    // SMARTPHONE MODEL
    // ---------------------------
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(1.05, -0.25, 0.65);
    phoneGroup.rotation.set(-0.12, -0.38, 0.06);

    const phoneGeo = new THREE.BoxGeometry(0.74, 1.48, 0.04);
    const phoneMesh = new THREE.Mesh(phoneGeo, chassisMaterial);
    phoneGroup.add(phoneMesh);

    const phoneScreenGeo = new THREE.PlaneGeometry(0.7, 1.44);
    const phoneScreenMat = new THREE.MeshStandardMaterial({
      map: phoneTexture,
      roughness: 0.2,
      metalness: 0.1,
    });
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreenMesh.position.set(0, 0, 0.022);
    phoneGroup.add(phoneScreenMesh);

    mainGroup.add(phoneGroup);

    // ---------------------------
    // BACKEND DATA WAFERS
    // ---------------------------
    const waferGroup = new THREE.Group();

    const wafer1Geo = new THREE.BoxGeometry(1.1, 0.75, 0.015);
    const waferMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x2563eb : 0x3b82f6,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
      roughness: 0.1,
      metalness: 0.3,
      transmission: 0.6,
    });
    const wafer1 = new THREE.Mesh(wafer1Geo, waferMat);
    wafer1.position.set(-1.25, 0.85, 0.1);
    wafer1.rotation.set(0.15, 0.35, -0.12);
    waferGroup.add(wafer1);

    const wafer1Edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(wafer1Geo),
      new THREE.LineBasicMaterial({
        color: isDark ? 0x93c5fd : 0x2563eb,
        transparent: true,
        opacity: 0.6,
      })
    );
    wafer1.add(wafer1Edge);

    const wafer2Geo = new THREE.BoxGeometry(0.9, 0.6, 0.015);
    const wafer2 = new THREE.Mesh(wafer2Geo, waferMat);
    wafer2.position.set(0.5, 1.05, -0.4);
    wafer2.rotation.set(-0.1, -0.25, 0.08);
    waferGroup.add(wafer2);

    const wafer2Edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(wafer2Geo),
      new THREE.LineBasicMaterial({
        color: isDark ? 0xd5bdaf : 0x8e5f2e,
        transparent: true,
        opacity: 0.6,
      })
    );
    wafer2.add(wafer2Edge);

    mainGroup.add(waferGroup);

    // Data stream particles
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4.2;
      particlePositions[i + 1] = (Math.random() - 0.5) * 2.8 + 0.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 2.5;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0xd5bdaf : 0x8e5f2e,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // 7. Raycasting & Tactile Click Interactions
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouseCoord.x = ((event.clientX - rect.left) / currentMount.clientWidth) * 2 - 1;
      mouseCoord.y = -((event.clientY - rect.top) / currentMount.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouseCoord, camera);

      const phoneHits = raycaster.intersectObjects(phoneGroup.children, true);
      if (phoneHits.length > 0) {
        setActiveMode((prev) => (prev === "mobile" ? "all" : "mobile"));
        phoneGroup.position.y += 0.06; // Tactile spring bounce
        return;
      }

      const laptopHits = raycaster.intersectObjects(laptopGroup.children, true);
      if (laptopHits.length > 0) {
        setActiveMode((prev) => (prev === "web" ? "all" : "web"));
        laptopGroup.position.y += 0.06; // Tactile spring bounce
        return;
      }
    };

    currentMount.addEventListener("click", onClick);

    // Mouse Tracking with Dynamic Light Glints
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      if (isDragging) {
        const deltaX = event.clientX - prevMousePos.x;
        const deltaY = event.clientY - prevMousePos.y;
        mouse.targetX += deltaX * 0.005;
        mouse.targetY += deltaY * 0.005;
        prevMousePos = { x: event.clientX, y: event.clientY };
      } else {
        mouse.targetX = (clientX / width - 0.5) * 0.8;
        mouse.targetY = -(clientY / height - 0.5) * 0.6;
      }

      // Move specular cursor light across device surfaces
      const normX = (clientX / width - 0.5) * 4.5;
      const normY = -(clientY / height - 0.5) * 3.5;
      cursorLight.position.x = normX;
      cursorLight.position.y = normY + 0.5;
      cursorLight.position.z = 2.6;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation to target focus mode
      camera.position.x += (targetCameraPos.current.x - camera.position.x) * 0.06;
      camera.position.y += (targetCameraPos.current.y - camera.position.y) * 0.06;
      camera.position.z += (targetCameraPos.current.z - camera.position.z) * 0.06;

      // Mouse inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Master ecosystem rotation
      mainGroup.rotation.y = mouse.x * 0.45 + Math.sin(elapsedTime * 0.4) * 0.05;
      mainGroup.rotation.x = -mouse.y * 0.35 + Math.cos(elapsedTime * 0.35) * 0.04;
      mainGroup.rotation.z = scrollY * 0.0003;

      // Individual device zero-gravity breathing
      laptopGroup.position.y += (-0.15 + Math.sin(elapsedTime * 1.2) * 0.04 - laptopGroup.position.y) * 0.1;
      phoneGroup.position.y += (-0.25 + Math.cos(elapsedTime * 1.4) * 0.05 - phoneGroup.position.y) * 0.1;
      waferGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.05;

      particles.rotation.y = elapsedTime * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentMount);

    // 10. Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener("click", onClick);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();

      laptopTexture.dispose();
      phoneTexture.dispose();
      baseGeo.dispose();
      lidGeo.dispose();
      screenGeo.dispose();
      phoneGeo.dispose();
      phoneScreenGeo.dispose();
      wafer1Geo.dispose();
      wafer2Geo.dispose();
      particleGeometry.dispose();
      chassisMaterial.dispose();
      borderMaterial.dispose();
      screenMat.dispose();
      phoneScreenMat.dispose();
      waferMat.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div className="relative w-full lg:w-[130%] lg:-mr-[15%] xl:w-[140%] xl:-mr-[20%] flex flex-col items-center justify-center select-none">
      {/* 100% Uncontained Transparent 3D Stage */}
      <div
        ref={mountRef}
        className="w-full h-[520px] sm:h-[600px] lg:h-[680px] cursor-grab active:cursor-grabbing"
        title="Interactive 3D Multi-Device Architecture - Click device or drag to inspect"
      />

      {/* Floating Interactive UI Control Dock: Connects 3D Scene directly to the Page UI */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-card/85 backdrop-blur-md border border-border shadow-md">
        <button
          type="button"
          onClick={() => setActiveMode("all")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-montserrat text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeMode === "all"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="View Full Architecture Ecosystem"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Ecosystem</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("web")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-montserrat text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeMode === "web"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="Zoom to Web Architecture Laptop"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Web Stack</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("mobile")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-montserrat text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeMode === "mobile"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="Zoom to Mobile App Smartphone"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile App</span>
        </button>

        {activeMode !== "all" && (
          <button
            type="button"
            onClick={() => setActiveMode("all")}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
            title="Reset to Full View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Subtle Interaction Pill Hint */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-card/75 backdrop-blur-md border border-border/80 text-[11px] font-montserrat font-bold text-foreground/80 shadow-xs pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        <span>Click devices or drag to inspect 360°</span>
      </div>
    </div>
  );
}
