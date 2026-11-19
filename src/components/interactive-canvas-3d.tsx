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

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera: carefully positioned for cinematic perspective
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);

    // 3. Renderer with transparent background
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
      isDark ? 2.2 : 2.6
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0xe2e8f0 : 0xffffff,
      isDark ? 3.0 : 2.4
    );
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(
      isDark ? 0xd5bdaf : 0x8e5f2e,
      isDark ? 2.5 : 2.0,
      15
    );
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(
      isDark ? 0x93c5fd : 0x3b82f6,
      isDark ? 1.8 : 1.2,
      12
    );
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    // 5. Procedural UI Screen Textures (Lightweight, instant, vector-crisp)
    // A. Laptop Screen (Full-Stack & Web Architecture)
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
    lCtx.fillText("Full-Stack Enterprise Telemetry", 40, 100);
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

    // Graph wave
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

    // Code preview card (Right side of screen)
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
    pCtx.fillText("Ho Teaching & Volta Regional Hospital", 60, 490);
    pCtx.fillStyle = accentColor;
    pCtx.font = "bold 14px sans-serif";
    pCtx.fillText("LAN Node: Online • Fast", 60, 525);

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
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Shared Metallic Materials
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
    laptopGroup.position.set(-0.35, -0.15, -0.1);
    laptopGroup.rotation.set(0.18, 0.45, -0.06);

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
    lidGroup.rotation.x = -Math.PI * 0.16; // Tilted screen

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

    laptopGroup.add(lidGroup);
    mainGroup.add(laptopGroup);

    // ---------------------------
    // B. 3D SMARTPHONE MODEL
    // ---------------------------
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(1.05, -0.25, 0.65);
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

    mainGroup.add(phoneGroup);

    // ---------------------------
    // C. FLOATING BACKEND DATA WAFERS (Glass Layers)
    // ---------------------------
    const waferGroup = new THREE.Group();

    // Wafer 1: Database & Relational Schema Glass
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

    // Wireframe edge on wafer 1
    const wafer1Edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(wafer1Geo),
      new THREE.LineBasicMaterial({
        color: isDark ? 0x93c5fd : 0x2563eb,
        transparent: true,
        opacity: 0.6,
      })
    );
    wafer1.add(wafer1Edge);

    // Wafer 2: API Gateway & Security Matrix
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

    // ---------------------------
    // D. CONNECTING DATA STREAM PARTICLES
    // ---------------------------
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

    // 7. Mouse & Scroll Interaction
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
      if (isDragging) {
        const deltaX = event.clientX - prevMousePos.x;
        const deltaY = event.clientY - prevMousePos.y;
        mouse.targetX += deltaX * 0.005;
        mouse.targetY += deltaY * 0.005;
        prevMousePos = { x: event.clientX, y: event.clientY };
      } else {
        const rect = currentMount.getBoundingClientRect();
        const clientX = event.clientX - rect.left;
        const clientY = event.clientY - rect.top;
        mouse.targetX = (clientX / width - 0.5) * 0.8;
        mouse.targetY = -(clientY / height - 0.5) * 0.6;
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 8. Animation Loop with Organic Hovering Physics
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp toward target rotation
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Master Ecosystem Tilt
      mainGroup.rotation.y = mouse.x * 0.45 + Math.sin(elapsedTime * 0.4) * 0.06;
      mainGroup.rotation.x = -mouse.y * 0.35 + Math.cos(elapsedTime * 0.35) * 0.04;
      mainGroup.rotation.z = scrollY * 0.0003;

      // Individual Device Zero-Gravity Breathing
      laptopGroup.position.y = -0.15 + Math.sin(elapsedTime * 1.2) * 0.04;
      phoneGroup.position.y = -0.25 + Math.cos(elapsedTime * 1.4) * 0.05;
      waferGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.05;

      // Pulse floating data particles
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
    <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[550px] flex items-center justify-center">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Interactive Full-Stack Web & Mobile 3D Architecture - Drag to inspect"
      />
    </div>
  );
}
