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

    const width = currentMount.clientWidth || 540;
    const height = currentMount.clientHeight || 540;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera: Wide, comfortable perspective so all geometry floats freely with zero clipping
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 3. Renderer with transparent alpha background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    currentMount.appendChild(renderer.domElement);

    const isDark = resolvedTheme === "dark";

    // Palette tokens matching portfolio theme
    const coreColor = isDark ? 0x38bdf8 : 0x2563eb;       // Tech blue
    const accentColor = isDark ? 0xd5bdaf : 0x8e5f2e;     // Warm architectural bronze
    const wireColor = isDark ? 0x94a3b8 : 0x334155;       // Crisp metallic graphite
    const goldColor = isDark ? 0xf59e0b : 0xd97706;       // Amber pulse
    const nodeColor = isDark ? 0x10b981 : 0x059669;       // Active green

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 2.2 : 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 3.5 : 2.5);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const accentFill = new THREE.PointLight(accentColor, isDark ? 3.8 : 2.4, 16);
    accentFill.position.set(-5, -3, 3);
    scene.add(accentFill);

    // Dynamic Cursor Spotlight following mouse in 3D
    const cursorLight = new THREE.PointLight(coreColor, isDark ? 4.2 : 3.0, 10);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 5. Master Architecture Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- A. CENTRAL CORE: Crystalline Multi-Faceted Geodesic Core ---
    const coreCluster = new THREE.Group();
    masterGroup.add(coreCluster);

    // Outer Faceted Wireframe Lattice (Icosahedron)
    const icosaGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const icosaWireMat = new THREE.MeshStandardMaterial({
      color: wireColor,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
    });
    const icosaWire = new THREE.Mesh(icosaGeo, icosaWireMat);
    coreCluster.add(icosaWire);

    // Inner Glowing Translucent Octahedral Prism
    const innerGemGeo = new THREE.OctahedronGeometry(0.78, 0);
    const innerGemMat = new THREE.MeshPhysicalMaterial({
      color: coreColor,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.75,
      thickness: 0.9,
      transparent: true,
      opacity: isDark ? 0.9 : 0.8,
      emissive: coreColor,
      emissiveIntensity: isDark ? 0.4 : 0.2,
    });
    const innerGem = new THREE.Mesh(innerGemGeo, innerGemMat);
    coreCluster.add(innerGem);

    // Central Precision Golden Seed
    const seedGeo = new THREE.DodecahedronGeometry(0.36, 0);
    const seedMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.95,
      roughness: 0.15,
      emissive: accentColor,
      emissiveIntensity: 0.35,
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    coreCluster.add(seedMesh);

    // --- B. ORBITAL GYROSCOPIC PRECISION RINGS ---
    // Ring 1: Equatorial Latitude Ring
    const ring1Geo = new THREE.TorusGeometry(1.95, 0.016, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    masterGroup.add(ring1);

    // Ring 2: Tilted Polar Meridian Ring
    const ring2Geo = new THREE.TorusGeometry(2.25, 0.014, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: wireColor,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.75,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 6;
    masterGroup.add(ring2);

    // --- C. PROCEDURAL NODE TEXTURE LABELS (Real CV Disciplines) ---
    const createNodeLabelTexture = (title: string, tag: string) => {
      const c = document.createElement("canvas");
      c.width = 384;
      c.height = 128;
      const ctx = c.getContext("2d")!;

      ctx.fillStyle = isDark ? "rgba(17, 20, 28, 0.92)" : "rgba(255, 255, 255, 0.94)";
      ctx.roundRect(4, 4, 376, 120, 20);
      ctx.fill();

      ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(203, 213, 225, 0.9)";
      ctx.lineWidth = 3;
      ctx.roundRect(4, 4, 376, 120, 20);
      ctx.stroke();

      // Tag pill
      ctx.fillStyle = isDark ? "#38bdf8" : "#2563eb";
      ctx.font = "bold 20px monospace";
      ctx.fillText(tag, 32, 46);

      // Main Title
      ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText(title, 32, 88);

      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 4;
      return tex;
    };

    // --- D. ARCHITECTURE SATELLITE NODES ---
    const nodesConfig = [
      {
        title: "Hospital LAN Systems",
        tag: "LAN // INFRASTRUCTURE",
        pos: new THREE.Vector3(2.35, 1.25, 0.4),
        color: nodeColor,
      },
      {
        title: "Next.js 16 Web Systems",
        tag: "FULL-STACK // REACT 19",
        pos: new THREE.Vector3(-2.25, 1.45, -0.6),
        color: coreColor,
      },
      {
        title: "Cross-Platform Mobile",
        tag: "MOBILE // REACT NATIVE",
        pos: new THREE.Vector3(2.1, -1.35, -0.5),
        color: accentColor,
      },
      {
        title: "Server & Hardware Maint.",
        tag: "CLINICAL // WORKSTATIONS",
        pos: new THREE.Vector3(-2.15, -1.25, 0.8),
        color: goldColor,
      },
    ];

    const satellites: { group: THREE.Group; mesh: THREE.Mesh; pos: THREE.Vector3 }[] = [];
    const splineCurves: THREE.QuadraticBezierCurve3[] = [];
    const packetMeshes: THREE.Mesh[] = [];

    nodesConfig.forEach((cfg) => {
      const satGroup = new THREE.Group();
      satGroup.position.copy(cfg.pos);

      // Node Geometry: Crystalline Octahedron Node
      const nodeGeo = new THREE.OctahedronGeometry(0.24, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        metalness: 0.9,
        roughness: 0.2,
        emissive: cfg.color,
        emissiveIntensity: 0.4,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      satGroup.add(nodeMesh);

      // Node Orbit Halo Ring
      const haloGeo = new THREE.RingGeometry(0.32, 0.36, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      satGroup.add(haloMesh);

      // Billboard Text Label Sprite
      const labelTex = createNodeLabelTexture(cfg.title, cfg.tag);
      const spriteMat = new THREE.SpriteMaterial({
        map: labelTex,
        transparent: true,
        opacity: isDark ? 0.95 : 0.9,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 0.46, 1);
      sprite.position.set(0, 0.52, 0);
      satGroup.add(sprite);

      masterGroup.add(satGroup);
      satellites.push({ group: satGroup, mesh: nodeMesh, pos: cfg.pos });

      // Luminous Bezier Data Arc connecting node to core
      const midPoint = new THREE.Vector3()
        .addVectors(new THREE.Vector3(0, 0, 0), cfg.pos)
        .multiplyScalar(0.5);
      // Lift midpoint outward for beautiful parabolic flare
      midPoint.y += 0.45;
      midPoint.z += 0.35;

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        midPoint,
        cfg.pos
      );
      splineCurves.push(curve);

      const curvePoints = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: isDark ? 0.45 : 0.3,
      });
      const splineLine = new THREE.Line(curveGeo, curveMat);
      masterGroup.add(splineLine);

      // Traveling Data Packet along arc
      const packetGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      masterGroup.add(packetMesh);
      packetMeshes.push(packetMesh);
    });

    // --- E. LUMINOUS CIRCULAR GAUSSIAN PARTICLES (ZERO SQUARE PIXELS) ---
    const createCircularParticleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(213, 189, 175, 0.85)");
      grad.addColorStop(0.7, "rgba(142, 95, 46, 0.25)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const tex = new THREE.CanvasTexture(c);
      return tex;
    };

    const particleTexture = createCircularParticleTexture();
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Golden spiral distribution in sphere
      const radius = 1.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleSystem);

    // --- 6. NATURAL INTERACTION & FLUID INERTIA ---
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const dragRotation = { x: 0.1, y: 0.2 };
    const dragVelocity = { x: 0, y: 0 };
    const mouseNorm = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Move 3D cursor spotlight
      cursorLight.position.x = mouseNorm.x * 3.5;
      cursorLight.position.y = mouseNorm.y * 3.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        dragVelocity.y = deltaX * 0.007;
        dragVelocity.x = deltaY * 0.007;
        dragRotation.y += dragVelocity.y;
        dragRotation.x += dragVelocity.x;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

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
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    currentMount.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // --- 7. ANIMATION TICK LOOP ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Physics damping when released
      if (!isDragging) {
        dragRotation.y += dragVelocity.y;
        dragRotation.x += dragVelocity.x;
        dragVelocity.x *= 0.95;
        dragVelocity.y *= 0.95;
      }

      // Smooth Parallax Target
      const targetY = mouseNorm.x * 0.28 + Math.sin(t * 0.35) * 0.08 + dragRotation.y;
      const targetX = -mouseNorm.y * 0.22 + Math.cos(t * 0.28) * 0.06 + dragRotation.x;

      masterGroup.rotation.y += (targetY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetX - masterGroup.rotation.x) * 0.05;

      // Internal Core Oscillations
      icosaWire.rotation.y = t * 0.18;
      icosaWire.rotation.z = t * 0.12;
      innerGem.rotation.y = -t * 0.28;
      seedMesh.rotation.x = t * 0.4;

      // Counter-rotating precision rings
      ring1.rotation.z = t * 0.22;
      ring2.rotation.z = -t * 0.18;

      // Floating harmonic breathing for satellite nodes
      satellites.forEach((sat, idx) => {
        sat.mesh.rotation.y = t * 0.6 + idx;
        sat.mesh.rotation.x = t * 0.4 + idx;
        sat.group.position.y = sat.pos.y + Math.sin(t * 1.4 + idx * 1.5) * 0.08;
      });

      // Data packets cruising down bezier pathways
      splineCurves.forEach((curve, i) => {
        const speed = 0.45;
        const u = ((t * speed + i * 0.25) % 1.0);
        const pt = curve.getPoint(u);
        packetMeshes[i].position.copy(pt);
      });

      // Ambient particle cloud lazy drift
      particleSystem.rotation.y = t * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. RESIZE LISTENER ---
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    window.addEventListener("resize", handleResize);

    // --- 9. CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      currentMount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      currentMount.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);

      // Dispose Geometries & Materials
      icosaGeo.dispose();
      innerGemGeo.dispose();
      seedGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      particleGeo.dispose();

      icosaWireMat.dispose();
      innerGemMat.dispose();
      seedMat.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      particleMat.dispose();
      particleTexture.dispose();

      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px] flex items-center justify-center select-none"
      style={{
        // Soft feathered radial blend so the 3D scene bleeds seamlessly into the background with ZERO hard box boundary
        maskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, black 72%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, black 72%, transparent 100%)",
      }}
    >
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />
    </div>
  );
}
