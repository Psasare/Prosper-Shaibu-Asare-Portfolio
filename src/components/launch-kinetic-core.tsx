"use client";

import * as React from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function LaunchKineticCore() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 380;
    const height = currentMount.clientHeight || 220;

    const isDark = resolvedTheme === "dark";

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // 3. Renderer with transparent alpha (no background, floats freely)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // 4. Lighting: Crisp studio lights that highlight geometric wireframes & facets
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x334155 : 0xffffff,
      isDark ? 2.5 : 3.0
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0x93c5fd : 0x0f172a,
      isDark ? 3.0 : 2.5
    );
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(
      isDark ? 0xd5bdaf : 0x2563eb,
      isDark ? 2.5 : 2.0,
      12
    );
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    // Dynamic mouse spotlight
    const mouseLight = new THREE.PointLight(
      isDark ? 0x60a5fa : 0x1d4ed8,
      isDark ? 3.5 : 2.8,
      8
    );
    mouseLight.position.set(0, 0, 3);
    scene.add(mouseLight);

    // 5. Kinetic Gyroscopic Geometries
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Color definitions based on theme
    const wireframeColor = isDark ? 0x94a3b8 : 0x1e293b;
    const innerGemColor = isDark ? 0x38bdf8 : 0x2563eb;
    const ringOuterColor = isDark ? 0xcbd5e1 : 0x334155;
    const ringInnerColor = isDark ? 0xd5bdaf : 0x64748b;

    // A. Outer Orbital Reticle Ring (Large Gyro Ring)
    const outerRingGeo = new THREE.TorusGeometry(1.5, 0.016, 16, 100);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: ringOuterColor,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    coreGroup.add(outerRing);

    // B. Middle Inclined Gimbal Ring
    const middleRingGeo = new THREE.TorusGeometry(1.22, 0.014, 16, 80);
    const middleRingMat = new THREE.MeshStandardMaterial({
      color: ringInnerColor,
      metalness: 0.75,
      roughness: 0.25,
      wireframe: false,
    });
    const middleRing = new THREE.Mesh(middleRingGeo, middleRingMat);
    middleRing.rotation.x = Math.PI / 3;
    middleRing.rotation.y = Math.PI / 6;
    coreGroup.add(middleRing);

    // C. Central Faceted Polyhedral Core (Icosahedron Wireframe & Inner Core)
    const icosaGeo = new THREE.IcosahedronGeometry(0.72, 1);
    const icosaWireMat = new THREE.MeshStandardMaterial({
      color: wireframeColor,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: true,
    });
    const icosaWire = new THREE.Mesh(icosaGeo, icosaWireMat);
    coreGroup.add(icosaWire);

    // Inner glowing solid gem
    const innerGemGeo = new THREE.OctahedronGeometry(0.38, 0);
    const innerGemMat = new THREE.MeshStandardMaterial({
      color: innerGemColor,
      metalness: 0.3,
      roughness: 0.2,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
    });
    const innerGem = new THREE.Mesh(innerGemGeo, innerGemMat);
    coreGroup.add(innerGem);

    // D. Constellation Nodes (Floating Data Particles in 3D Space)
    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.35 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0x93c5fd : 0x2563eb,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 6. Interactive Mouse Physics with Silky Lerping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = Math.max(-1.5, Math.min(1.5, x));
      mouse.targetY = Math.max(-1.5, Math.min(1.5, y));
    };

    window.addEventListener("mousemove", onMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update cursor spotlight position
      mouseLight.position.x = mouse.x * 2.5;
      mouseLight.position.y = mouse.y * 2.5;

      // Gyroscopic Counter-Rotations
      outerRing.rotation.z = elapsedTime * 0.35;
      outerRing.rotation.y = elapsedTime * 0.2;

      middleRing.rotation.x = elapsedTime * -0.45;
      middleRing.rotation.z = elapsedTime * 0.3;

      icosaWire.rotation.y = elapsedTime * 0.5;
      icosaWire.rotation.x = elapsedTime * 0.25;

      innerGem.rotation.y = elapsedTime * -0.8;
      innerGem.rotation.z = elapsedTime * 0.6;

      // Subtle breathing scale pulse
      const breathe = 1 + Math.sin(elapsedTime * 2.2) * 0.04;
      icosaWire.scale.set(breathe, breathe, breathe);
      innerGem.scale.set(breathe * 1.05, breathe * 1.05, breathe * 1.05);

      // Particle constellation spin
      particles.rotation.y = elapsedTime * 0.15;
      particles.rotation.x = elapsedTime * 0.08;

      // Whole group reacts smoothly to cursor position
      coreGroup.rotation.y = mouse.x * 0.45;
      coreGroup.rotation.x = -mouse.y * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const onResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener("resize", onResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      outerRingGeo.dispose();
      outerRingMat.dispose();
      middleRingGeo.dispose();
      middleRingMat.dispose();
      icosaGeo.dispose();
      icosaWireMat.dispose();
      innerGemGeo.dispose();
      innerGemMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[180px] sm:h-[220px] md:h-[240px] flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
