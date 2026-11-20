"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

export interface MenuItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
  subtitle?: string;
  period?: string;
  location?: string;
  description?: string[];
  skills?: string[];
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "Gourmet Burgers",
    clipId: "clip-original",
    image: "https://cdn.21st.dev/assets/mirror/53/534bb84332e13a8595670521bdcc71acd40fabbf589c1775f4028df1ca1ea96a.jpg"
  },
  {
    num: "02",
    name: "Fresh Desserts",
    clipId: "clip-hexagons",
    image: "https://cdn.21st.dev/assets/mirror/be/bec9c493cadbcd53fd0e00a0cf98f1dbb7813141c9c461b8c1b7920f6b7fa721.jpg"
  },
  {
    num: "03",
    name: "Artisan Waffles",
    clipId: "clip-pixels",
    image: "https://cdn.21st.dev/assets/mirror/b0/b05848f9ad0d993c69b9c21c3793b3b5507eff7064b01540d196cac068101729.jpg"
  }
];

export const Component = ({
  items = defaultItems,
  className
}: { items?: MenuItem[]; className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = useCallback((index: number) => {
    if (!items[index]) return;
    const item = items[index];
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);
    
    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. IN (Expo Out)
    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
    // 2. IDLE (Sine Breath)
    .to(selector, {
      scale: 1.05,
      duration: 1.5,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
      stagger: { amount: 0.2, from: "center" }
    })
    // 3. OUT (Expo In)
    .to(selector, {
      scale: 0,
      duration: 0.6,
      stagger: { amount: 0.3, from: "edges" },
      ease: "expo.in",
    });

    masterTl.current = tl;
  }, [items]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
  }, [createLoop]);

  const handleItemSelect = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    handleItemSelect(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    handleItemSelect(nextIndex);
  };

  const currentItem = items[activeIndex] || items[0];

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "flex flex-col lg:flex-row items-center justify-between w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-500 rounded-3xl bg-card border border-border",
        className
      )}
    >
      {/* LEFT SIDE: HIGH CONTRAST MENU & DETAILS */}
      <div className="z-20 w-full lg:w-1/2 flex flex-col justify-between">
        <nav className="w-full">
          <ul className="flex flex-col gap-6 sm:gap-10">
            {items.map((item, index) => {
              const nameParts = item.name.split(" ");
              const firstWord = nameParts[0];
              const restWords = nameParts.slice(1).join(" ");

              return (
                <li
                  key={item.num + item.name}
                  onMouseEnter={() => handleItemSelect(index)}
                  onClick={() => handleItemSelect(index)}
                  className="group cursor-pointer select-none"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Numbers: Increased visibility for non-hover state */}
                    <span className={cn(
                      "text-2xl sm:text-3xl font-montserrat font-bold transition-all duration-500 mt-1 sm:mt-2",
                      activeIndex === index 
                        ? "text-accent scale-110" 
                        : "text-muted-foreground/50 hover:text-muted-foreground" 
                    )}>
                      {item.num}
                    </span>
                    
                    {/* Main Text */}
                    <div className="flex-1">
                      <h2 className={cn(
                        "font-montserrat text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] transition-all duration-500",
                        activeIndex === index 
                          ? "text-foreground opacity-100 translate-x-2 sm:translate-x-4" 
                          : "opacity-40 translate-x-0 text-muted-foreground"
                      )}>
                        {firstWord}<br />
                        {restWords}
                      </h2>

                      {/* Subtitle / Role */}
                      {item.subtitle && (
                        <p className={cn(
                          "font-sans text-xs sm:text-sm mt-1 transition-all duration-300",
                          activeIndex === index
                            ? "text-accent font-semibold translate-x-2 sm:translate-x-4 opacity-100"
                            : "text-muted-foreground/60 opacity-0 h-0 overflow-hidden"
                        )}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Selected Item Detail Card & Carousel Controls */}
        <div className="mt-8 pt-6 border-t border-border/80 space-y-4">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
            {currentItem.period && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                {currentItem.period}
              </span>
            )}
            {currentItem.location && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {currentItem.location}
              </span>
            )}
          </div>

          {/* Description bullets */}
          {currentItem.description && currentItem.description.length > 0 && (
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
              {currentItem.description.map((desc, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Carousel Arrow Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {items.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => handleItemSelect(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    activeIndex === dotIdx
                      ? "w-8 bg-accent"
                      : "w-2 bg-border hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous item"
                className="p-2.5 rounded-xl bg-secondary border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next item"
                className="p-2.5 rounded-xl bg-secondary border border-border hover:bg-muted text-foreground transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SQUARE GRID (Sharp Squares with SVG Clip-Paths) */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0">
        <div className="absolute w-[120%] h-[120%] bg-accent/15 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000" />
        
        <svg viewBox="0 0 500 500" className="w-[100%] max-w-[480px] h-auto z-10 drop-shadow-2xl">
          <defs>
            <clipPath id="clip-original">
              <path className="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
              <path className="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
              <path className="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
              <path className="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
              <path className="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
            </clipPath>

            <clipPath id="clip-hexagons">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>

            {/* Grid Squares with rx="4" */}
            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  className="path"
                  x={(i % 3) * 160 + 20}
                  y={Math.floor(i / 3) * 160 + 20}
                  width="140"
                  height="140"
                  rx="4" 
                />
              ))}
            </clipPath>

            {/* Circular Portal Rings */}
            <clipPath id="clip-rings">
              <circle className="path" cx="250" cy="250" r="220" />
              <circle className="path" cx="250" cy="250" r="160" />
              <circle className="path" cx="250" cy="250" r="100" />
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath={`url(#${items[0].clipId})`}>
            <image
              ref={imageRef}
              href={items[0].image}
              width="500"
              height="500"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export const ConnoisseurStackInteractor = Component;
