/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';

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

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
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

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

export const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 580,
  sphereRadius = 225,
  dragSensitivity = 0.65,
  momentumDecay = 0.94,
  maxRotationSpeed = 6,
  baseImageScale = 0.13,
  hoverScale = 1.25,
  perspective = 1000,
  autoRotate = true,
  autoRotateSpeed = 0.22,
  className = '',
  onSelectImage,
  onHoverImage,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 12, y: 15, z: 0 });
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [responsiveSize, setResponsiveSize] = useState<number>(containerSize);

  // Animation & Physics Tracking in Refs (Guarantees zero frame drops or effect restarts)
  const rotationRef = useRef<RotationState>({ x: 12, y: 15, z: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const dragStartPos = useRef<MousePosition>({ x: 0, y: 0 });
  const isClickCandidate = useRef<boolean>(true);

  // Mounting effect (defers state update cleanly to avoid cascading render lint error)
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Modal Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        onSelectImage?.(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectImage]);

  // Responsive container sizing
  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== 'undefined') {
        const available = Math.min(window.innerWidth - 48, containerSize);
        setResponsiveSize(available > 0 ? available : containerSize);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [containerSize]);

  const actualSphereRadius = sphereRadius
    ? Math.min(sphereRadius, responsiveSize * 0.42)
    : responsiveSize * 0.44;
  const baseImageSize = responsiveSize * baseImageScale;

  // Compute fixed mathematical Fibonacci sphere distribution once
  const imagePositions = useMemo((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;
    if (imageCount === 0) return positions;

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      const theta = (azimuth * (180 / Math.PI)) % 360;

      // Gentle pole adjustment for even coverage
      phi = 18 + (phi / 180) * 144;

      positions.push({
        theta,
        phi,
        radius: actualSphereRadius,
      });
    }

    return positions;
  }, [images.length, actualSphereRadius]);

  // Buttery-smooth mathematical world positions projection
  const worldPositions = useMemo((): WorldPosition[] => {
    const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
    const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

    const cosY = Math.cos(rotYRad);
    const sinY = Math.sin(rotYRad);
    const cosX = Math.cos(rotXRad);
    const sinX = Math.sin(rotXRad);

    return imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);

      const sinPhi = Math.sin(phiRad);
      const cosPhi = Math.cos(phiRad);

      // Base spherical coordinates
      let x = pos.radius * sinPhi * Math.cos(thetaRad);
      let y = pos.radius * cosPhi;
      let z = pos.radius * sinPhi * Math.sin(thetaRad);

      // 3D Yaw Rotation (around Y axis)
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      x = x1;
      z = z1;

      // 3D Pitch Rotation (around X axis)
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      y = y2;
      z = z2;

      // Smooth, continuous depth scaling (never stammers or glitches)
      const depthRatio = (z + actualSphereRadius) / (2 * actualSphereRadius); // 0 (back) to 1 (front)
      const scale = 0.65 + 0.55 * depthRatio;

      // Smooth depth opacity: front nodes 100%, rear nodes gently fade
      const fadeOpacity = z > -actualSphereRadius * 0.35
        ? 1
        : Math.max(0.18, 0.18 + 0.82 * ((z + actualSphereRadius) / (actualSphereRadius * 0.65)));

      return {
        x,
        y,
        z,
        scale,
        zIndex: Math.round(1000 + z),
        isVisible: z > -actualSphereRadius * 0.95,
        fadeOpacity,
        originalIndex: index,
      };
    });
  }, [imagePositions, rotation, actualSphereRadius]);

  // Single Continuous 60-120 FPS Animation Loop (Immune to React re-render lag)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = Math.min((now - lastTime) / 16.67, 2.0); // Normalize to 60fps delta
      lastTime = now;

      if (!isDraggingRef.current) {
        // Smooth inertial momentum decay
        velocityRef.current.x *= Math.pow(momentumDecay, delta);
        velocityRef.current.y *= Math.pow(momentumDecay, delta);

        if (autoRotate) {
          rotationRef.current.y += autoRotateSpeed * delta;
        }

        rotationRef.current.y += Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, velocityRef.current.y)) * delta;
        rotationRef.current.x += Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, velocityRef.current.x)) * delta;

        // Pitch clamp prevents disorienting upside-down flip
        rotationRef.current.x = Math.max(-65, Math.min(65, rotationRef.current.x));
      }

      setRotation({
        x: rotationRef.current.x,
        y: rotationRef.current.y,
        z: 0,
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoRotate, autoRotateSpeed, momentumDecay, maxRotationSpeed]);

  // Event Handlers for Drag & Interaction
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastMousePos.current = { x: clientX, y: clientY };
    dragStartPos.current = { x: clientX, y: clientY };
    isClickCandidate.current = true;
  };

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
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

    rotationRef.current.x = Math.max(-65, Math.min(65, rotationRef.current.x + rotDeltaX));
    rotationRef.current.y += rotDeltaY;

    velocityRef.current = {
      x: rotDeltaX,
      y: rotDeltaY,
    };

    lastMousePos.current = { x: clientX, y: clientY };
  }, [dragSensitivity]);

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Bind Mouse & Touch to Container and Document
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

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [handlePointerMove]);

  const handleSelectImage = useCallback((image: ImageData) => {
    setSelectedImage(image);
    onSelectImage?.(image);
  }, [onSelectImage]);

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
        overflow: 'visible',
      }}
    >
      {/* 3D Rotational Node Space */}
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {isMounted && images.map((image, index) => {
          const position = worldPositions[index];
          if (!position || !position.isVisible) return null;

          const isHovered = hoveredIndex === index;
          const nodeSize = baseImageSize * position.scale;

          const onNodeAction = (e: React.SyntheticEvent) => {
            if (isClickCandidate.current) {
              e.stopPropagation();
              handleSelectImage(image);
            }
          };

          return (
            <div
              key={image.id}
              className="absolute cursor-pointer will-change-transform"
              style={{
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
                opacity: position.fadeOpacity,
                zIndex: position.zIndex,
                // GPU-accelerated hardware transform (ZERO CSS transition fighting)
                transform: `translate3d(${responsiveSize / 2 + position.x - nodeSize / 2}px, ${responsiveSize / 2 + position.y - nodeSize / 2}px, 0px)`,
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onHoverImage?.(image);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onHoverImage?.(null);
              }}
              onPointerUp={onNodeAction}
              onClick={onNodeAction}
            >
              <div
                className={`w-full h-full rounded-full shadow-md bg-white border border-neutral-200/90 dark:border-white/30 p-2 sm:p-2.5 flex items-center justify-center transition-all duration-200 ease-out ${
                  isHovered ? 'border-accent shadow-xl' : ''
                }`}
                style={{
                  transform: isHovered ? `scale(${hoverScale})` : 'scale(1)',
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain filter drop-shadow-xs pointer-events-none"
                  draggable={false}
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-monogram')) {
                      const mono = document.createElement('span');
                      mono.className = 'fallback-monogram font-montserrat font-bold text-xs text-neutral-900';
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
                {selectedImage.description || "Core architectural technology used across production platforms and enterprise systems."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SphereImageGrid;
