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

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const isDark = resolvedTheme === "dark";

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x223355 : 0x6688aa,
      2.0
    );
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(
      isDark ? 0x38bdf8 : 0x2563eb,
      4.0,
      15
    );
    pointLight1.position.set(4, 4, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(
      isDark ? 0x818cf8 : 0x4f46e5,
      3.0,
      15
    );
    pointLight2.position.set(-4, -4, 2);
    scene.add(pointLight2);

    // 5. Main 3D Geometry: Torus Knot with dual-layer Wireframe & Core
    const group = new THREE.Group();
    scene.add(group);

    // Inner smooth core
    const coreGeometry = new THREE.TorusKnotGeometry(1.0, 0.28, 128, 32, 2, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Outer geometric wireframe cage
    const wireGeometry = new THREE.IcosahedronGeometry(1.85, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x60a5fa : 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.2,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    group.add(wireMesh);

    // 6. Floating Particle Field
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x93c5fd : 0x3b82f6,
      size: 0.035,
      transparent: true,
      opacity: isDark ? 0.6 : 0.45,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 7. Mouse tracking with smooth spring inertia
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      mouse.targetX = (clientX / width - 0.5) * 2;
      mouse.targetY = -(clientY / height - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    // 8. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp toward mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Group rotation (continuous base rotation + mouse influence)
      group.rotation.x = elapsedTime * 0.25 + mouse.y * 0.6;
      group.rotation.y = elapsedTime * 0.35 + mouse.x * 0.8;

      // Gentle floating oscillation
      group.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Counter-rotating outer wireframe
      wireMesh.rotation.x = -elapsedTime * 0.15;
      wireMesh.rotation.y = -elapsedTime * 0.2;

      // Slow particle field drift
      particleSystem.rotation.y = elapsedTime * 0.05;
      particleSystem.rotation.x = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize observer
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
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();

      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-3xl border border-border/80 bg-gradient-to-br from-card/85 via-card/50 to-primary/5 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/5 group flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-primary/30" />
      <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-accent/20 blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-accent/30" />

      {/* 3D WebGL Canvas mount */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Bottom overlay badge */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 border border-border/70 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="font-semibold text-foreground/90">Interactive 3D Engine</span>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground hidden sm:inline-block bg-background/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-border/40">
          Move cursor to rotate
        </span>
      </div>
    </div>
  );
}
