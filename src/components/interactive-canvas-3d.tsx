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

    // 2. Camera: carefully positioned to frame the 3D geometry seamlessly on the page
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    // 3. Renderer with transparent background (no container / no box)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const isDark = resolvedTheme === "dark";

    // 4. Lights: Crisp, clean illumination (zero muddy brown tint)
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x181e29 : 0xffffff,
      isDark ? 1.8 : 2.2
    );
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(
      isDark ? 0xe2e8f0 : 0xffffff,
      isDark ? 3.2 : 2.6,
      20
    );
    pointLight1.position.set(4, 4, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(
      isDark ? 0x94a3b8 : 0xcbd5e1,
      isDark ? 2.4 : 1.8,
      18
    );
    pointLight2.position.set(-4, -3, 2.5);
    scene.add(pointLight2);

    // 5. Main 3D Composition: Floating Geometric Core + Outer Architectural Cage
    const group = new THREE.Group();
    scene.add(group);

    // Inner smooth core: sleek metallic finish
    const coreGeometry = new THREE.TorusKnotGeometry(0.95, 0.26, 128, 32, 2, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1f2737 : 0xd1d5db,
      roughness: isDark ? 0.22 : 0.28,
      metalness: isDark ? 0.85 : 0.72,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Outer geometric wireframe cage: clean architectural facet
    const wireGeometry = new THREE.IcosahedronGeometry(1.75, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x64748b : 0x4b5563,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.16,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    group.add(wireMesh);

    // 6. Floating Particle Field: crisp starlight dots
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 7.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5.5;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x94a3b8 : 0x6b7280,
      size: 0.03,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
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
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp toward mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Group rotation (continuous base rotation + mouse influence)
      group.rotation.x = elapsedTime * 0.22 + mouse.y * 0.55;
      group.rotation.y = elapsedTime * 0.3 + mouse.x * 0.7;

      // Gentle floating breathing oscillation
      group.position.y = Math.sin(elapsedTime * 1.4) * 0.1;

      // Counter-rotating outer wireframe
      wireMesh.rotation.x = -elapsedTime * 0.12;
      wireMesh.rotation.y = -elapsedTime * 0.16;

      // Slow particle field drift
      particleSystem.rotation.y = elapsedTime * 0.04;
      particleSystem.rotation.x = elapsedTime * 0.02;

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

  // Completely uncontained - pure transparent canvas blending seamlessly into the page structure
  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Interactive 3D geometry - drag or move cursor to inspect"
      />
    </div>
  );
}
