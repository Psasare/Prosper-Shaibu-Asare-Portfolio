/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { X } from "lucide-react";

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;  // Azimuth angle in degrees
  phi: number;    // Polar angle in degrees
  radius: number; // Distance from center
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
  onSelectImage?: (image: ImageData | null) => void;
  onHoverImage?: (image: ImageData | null) => void;
}

interface MousePosition {
  x: number;
  y: number;
}

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
};

export const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 580,
  sphereRadius = 225,
  dragSensitivity = 0.65,
  momentumDecay = 0.94,
  maxRotationSpeed = 5,
  baseImageScale = 0.13,
  perspective = 1000,
  autoRotate = true,
  autoRotateSpeed = 0.22,
  className = "",
  onSelectImage,
  onHoverImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [responsiveSize, setResponsiveSize] = useState<number>(containerSize);

  // Animation & Physics Tracking in Refs
  const rotationRef = useRef<{ x: number; y: number }>({ x: 12, y: 15 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const isInViewRef = useRef<boolean>(true);
  const isTabVisibleRef = useRef<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const dragStartPos = useRef<MousePosition>({ x: 0, y: 0 });
  const isClickCandidate = useRef<boolean>(true);

  // Modal Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        onSelectImage?.(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelectImage]);

  // Responsive container sizing
  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        const available = Math.min(window.innerWidth - 48, containerSize);
        setResponsiveSize(available > 0 ? available : containerSize);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, [containerSize]);

  const actualSphereRadius = sphereRadius
    ? Math.min(sphereRadius, responsiveSize * 0.42)
    : responsiveSize * 0.44;
  const baseImageSize = Math.round(responsiveSize * baseImageScale);

  // Compute fixed mathematical Fibonacci sphere distribution once
  const imagePositions = useMemo((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const count = images.length;
    if (count === 0) return positions;

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      const theta = (azimuth * (180 / Math.PI)) % 360;

      // Gentle pole adjustment for even spherical visual dispersion
      phi = 16 + (phi / 180) * 148;

      positions.push({
        theta,
        phi,
        radius: actualSphereRadius,
      });
    }

    return positions;
  }, [images.length, actualSphereRadius]);

  // IntersectionObserver: Pause RAF loop entirely when component is scrolled out of viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Tab visibility tracking: Pause when user leaves tab
  useEffect(() => {
    const handleVisibility = () => {
      isTabVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Scroll-linked momentum: Scrolling past section gives the 3D sphere an organic spin
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (!isInViewRef.current) return;
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      lastScroll = currentScroll;

      // Add gentle angular momentum proportional to scroll
      velocityRef.current.y += Math.max(-1.8, Math.min(1.8, delta * 0.025));
      velocityRef.current.x += Math.max(-0.9, Math.min(0.9, -delta * 0.012));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // High-Performance 120 FPS Direct-DOM Animation Loop
  // Updates styles directly on nodeRefs without triggering ANY React re-renders!
  useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);

      // Culling: Skip calculation if scrolled out of view or tab hidden
      if (!isInViewRef.current || !isTabVisibleRef.current) {
        lastTime = now;
        return;
      }

      const delta = Math.min((now - lastTime) / 16.67, 2.0);
      lastTime = now;

      if (!isDraggingRef.current) {
        // Inertial momentum decay
        velocityRef.current.x *= Math.pow(momentumDecay, delta);
        velocityRef.current.y *= Math.pow(momentumDecay, delta);

        if (autoRotate) {
          rotationRef.current.y += autoRotateSpeed * delta;
        }

        rotationRef.current.y +=
          Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, velocityRef.current.y)) * delta;
        rotationRef.current.x +=
          Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, velocityRef.current.x)) * delta;

        // Pitch clamp prevents disorienting flips
        rotationRef.current.x = Math.max(-65, Math.min(65, rotationRef.current.x));
      }

      // Mathematical projections
      const rotXRad = SPHERE_MATH.degreesToRadians(rotationRef.current.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotationRef.current.y);
      const cosY = Math.cos(rotYRad);
      const sinY = Math.sin(rotYRad);
      const cosX = Math.cos(rotXRad);
      const sinX = Math.sin(rotXRad);

      const halfSize = responsiveSize / 2;
      const halfNode = baseImageSize / 2;
      const radius = actualSphereRadius;

      // Update each DOM node directly with sub-millisecond execution
      for (let i = 0; i < imagePositions.length; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;

        const pos = imagePositions[i];
        const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
        const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
        const sinPhi = Math.sin(phiRad);
        const cosPhi = Math.cos(phiRad);

        let x = pos.radius * sinPhi * Math.cos(thetaRad);
        let y = pos.radius * cosPhi;
        let z = pos.radius * sinPhi * Math.sin(thetaRad);

        // Yaw
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        x = x1;
        z = z1;

        // Pitch
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2;
        z = z2;

        const isVisible = z > -radius * 0.95;
        if (!isVisible) {
          el.style.display = "none";
          continue;
        }

        if (el.style.display !== "block") {
          el.style.display = "block";
        }

        const depthRatio = (z + radius) / (2 * radius);
        const scale = 0.65 + 0.55 * depthRatio;

        const fadeOpacity =
          z > -radius * 0.35
            ? 1
            : Math.max(0.18, 0.18 + 0.82 * ((z + radius) / (radius * 0.65)));

        const zIndex = Math.round(1000 + z);
        const posX = halfSize + x - halfNode;
        const posY = halfSize + y - halfNode;

        // Hardware-accelerated GPU transform with zero layout reflow (fixed width/height)
        el.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0px) scale(${scale.toFixed(3)})`;
        el.style.opacity = fadeOpacity.toFixed(2);
        el.style.zIndex = `${zIndex}`;
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [
    imagePositions,
    responsiveSize,
    actualSphereRadius,
    baseImageSize,
    autoRotate,
    autoRotateSpeed,
    momentumDecay,
    maxRotationSpeed,
  ]);

  // Event Handlers for Drag & Interaction
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastMousePos.current = { x: clientX, y: clientY };
    dragStartPos.current = { x: clientX, y: clientY };
    isClickCandidate.current = true;
  };

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;

      const totalDist = Math.hypot(
        clientX - dragStartPos.current.x,
        clientY - dragStartPos.current.y
      );
      if (totalDist > 6) {
        isClickCandidate.current = false;
      }

      const deltaX = clientX - lastMousePos.current.x;
      const deltaY = clientY - lastMousePos.current.y;

      const rotDeltaX = -deltaY * dragSensitivity;
      const rotDeltaY = deltaX * dragSensitivity;

      rotationRef.current.x = Math.max(
        -65,
        Math.min(65, rotationRef.current.x + rotDeltaX)
      );
      rotationRef.current.y += rotDeltaY;

      velocityRef.current = {
        x: rotDeltaX,
        y: rotDeltaY,
      };

      lastMousePos.current = { x: clientX, y: clientY };
    },
    [dragSensitivity]
  );

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Bind Mouse & Touch to Window
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      handlePointerUp();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      handlePointerUp();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [handlePointerMove]);

  const handleSelectImage = useCallback(
    (image: ImageData) => {
      setSelectedImage(image);
      onSelectImage?.(image);
    },
    [onSelectImage]
  );

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        if (e.touches.length === 1) {
          handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{
        width: `${responsiveSize}px`,
        height: `${responsiveSize}px`,
        perspective: `${perspective}px`,
        overflow: "visible",
      }}
    >
      {/* 3D Rotational Node Space */}
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {images.map((image, index) => {
          const onNodeAction = (e: React.SyntheticEvent) => {
            if (isClickCandidate.current) {
              e.stopPropagation();
              handleSelectImage(image);
            }
          };

          return (
            <div
              key={image.id}
              ref={(el) => {
                nodeRefs.current[index] = el;
              }}
              className="absolute cursor-pointer transition-none"
              style={{
                width: `${baseImageSize}px`,
                height: `${baseImageSize}px`,
                top: 0,
                left: 0,
                willChange: "transform, opacity",
              }}
              onMouseEnter={() => {
                onHoverImage?.(image);
              }}
              onPointerUp={onNodeAction}
              onClick={onNodeAction}
            >
              <div
                className="w-full h-full rounded-full shadow-md bg-white border border-neutral-200/90 dark:border-white/30 p-2 sm:p-2.5 flex items-center justify-center transition-all duration-200 ease-out hover:scale-125 hover:border-accent hover:shadow-xl group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain filter drop-shadow-xs pointer-events-none group-hover:scale-105 transition-transform"
                  draggable={false}
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".fallback-monogram")) {
                      const mono = document.createElement("span");
                      mono.className =
                        "fallback-monogram font-montserrat font-bold text-xs text-neutral-900";
                      mono.innerText = image.alt.slice(0, 2).toUpperCase();
                      parent.appendChild(mono);
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tech Detail Modal (High z-index) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={() => {
            setSelectedImage(null);
            onSelectImage?.(null);
          }}
        >
          <div
            className="bg-card text-card-foreground border border-border rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-7 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setSelectedImage(null);
                onSelectImage?.(null);
              }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-muted border border-border text-foreground flex items-center justify-center hover:bg-accent hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="w-20 h-20 mx-auto mb-5 p-3.5 rounded-3xl bg-white border border-neutral-200 shadow-md flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent font-montserrat text-[11px] font-bold uppercase tracking-wider">
                <span>Specialized Engineering Stack</span>
              </div>

              <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-foreground">
                {selectedImage.title || selectedImage.alt}
              </h3>

              <p className="font-dm text-sm sm:text-[14.5px] text-muted-foreground/90 leading-relaxed pt-1">
                {selectedImage.description ||
                  "Core architectural technology used across production platforms and enterprise systems."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SphereImageGrid;
