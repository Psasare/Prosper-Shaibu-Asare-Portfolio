"use client";

import * as React from "react";
import {
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Gamepad2,
  Bot,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface TechToken {
  name: string;
  color: string;
  tag: string;
}

const TECH_TOKENS: TechToken[] = [
  { name: "Next.js", color: "#38bdf8", tag: "NEXT" },
  { name: "TypeScript", color: "#60a5fa", tag: "TS" },
  { name: "React", color: "#22d3ee", tag: "REACT" },
  { name: "Node.js", color: "#4ade80", tag: "NODE" },
  { name: "SQL", color: "#fbbf24", tag: "SQL" },
  { name: "Mobile", color: "#c084fc", tag: "APP" },
];

const GRID_SIZE = 20;

export function HeroMiniGame() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Game states
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isAiMode, setIsAiMode] = React.useState(true); // Starts in AI mode for lively animated hero
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const [lastCollected, setLastCollected] = React.useState<string | null>(null);

  // Audio synthesis helper (Web Audio API)
  const playBeep = React.useCallback(
    (freq: number, type: OscillatorType = "sine", duration = 0.08) => {
      if (!soundEnabled || typeof window === "undefined") return;
      try {
        const audioCtx = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch {
        // AudioContext not allowed before user interaction
      }
    },
    [soundEnabled]
  );

  // Mutable game state in ref to avoid re-triggering loops
  const stateRef = React.useRef<{
    snake: Point[];
    direction: Point;
    nextDirection: Point;
    food: Point;
    foodToken: TechToken;
    particles: Particle[];
    speed: number;
  }>({
    snake: [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ],
    direction: { x: 0, y: -1 },
    nextDirection: { x: 0, y: -1 },
    food: { x: 5, y: 5 },
    foodToken: TECH_TOKENS[0],
    particles: [],
    speed: 120,
  });

  // Load high score from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("psa_dev_snake_best");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  // Spawn random food
  const spawnFood = React.useCallback(() => {
    const s = stateRef.current;
    let newFood: Point;
    let collision: boolean;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      collision = s.snake.some(
        (seg) => seg.x === newFood.x && seg.y === newFood.y
      );
    } while (collision);

    s.food = newFood;
    s.foodToken = TECH_TOKENS[Math.floor(Math.random() * TECH_TOKENS.length)];
  }, []);

  // Spawn particle sparks
  const spawnParticles = (x: number, y: number, color: string) => {
    const s = stateRef.current;
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
      const speed = Math.random() * 3 + 1;
      s.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
      });
    }
  };

  // Reset / Start Game
  const startNewGame = React.useCallback(
    (asPlayer = true) => {
      stateRef.current.snake = [
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 },
      ];
      stateRef.current.direction = { x: 0, y: -1 };
      stateRef.current.nextDirection = { x: 0, y: -1 };
      stateRef.current.speed = asPlayer ? 110 : 90;
      spawnFood();
      setScore(0);
      setIsGameOver(false);
      setIsAiMode(!asPlayer);
      setIsPlaying(true);
      playBeep(440, "sine", 0.1);
    },
    [spawnFood, playBeep]
  );

  // Steer snake
  const changeDirection = React.useCallback(
    (dx: number, dy: number) => {
      // Switch from AI to Player mode immediately when user steers
      if (isAiMode) {
        setIsAiMode(false);
      }
      const s = stateRef.current;
      // Prevent reversing into itself
      if (s.direction.x !== 0 && dx === -s.direction.x) return;
      if (s.direction.y !== 0 && dy === -s.direction.y) return;
      s.nextDirection = { x: dx, y: dy };
    },
    [isAiMode]
  );

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only capture arrows if user interacts with game
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          changeDirection(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          changeDirection(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          changeDirection(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          changeDirection(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection]);

  // AI pathfinder for idle demo mode
  const computeAiMove = () => {
    const s = stateRef.current;
    const head = s.snake[0];
    const food = s.food;

    // Potential directions
    const candidates = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    // Filter out moves that reverse or crash into body/walls
    const safeMoves = candidates.filter((dir) => {
      if (dir.x === -s.direction.x && dir.y === -s.direction.y) return false;
      const nx = head.x + dir.x;
      const ny = head.y + dir.y;
      if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return false;
      return !s.snake.some((seg) => seg.x === nx && seg.y === ny);
    });

    if (safeMoves.length === 0) return;

    // Pick safe move closest to food
    safeMoves.sort((a, b) => {
      const distA =
        Math.abs(head.x + a.x - food.x) + Math.abs(head.y + a.y - food.y);
      const distB =
        Math.abs(head.x + b.x - food.x) + Math.abs(head.y + b.y - food.y);
      return distA - distB;
    });

    s.nextDirection = safeMoves[0];
  };

  // Main Game Loop (Canvas rendering & tick)
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let timerId: NodeJS.Timeout;

    const gameTick = () => {
      const s = stateRef.current;

      // In AI mode, compute next move automatically
      if (isAiMode && !isGameOver) {
        computeAiMove();
      }

      s.direction = s.nextDirection;

      // Next head position
      const head = s.snake[0];
      const newHead: Point = {
        x: head.x + s.direction.x,
        y: head.y + s.direction.y,
      };

      // Wall collision check
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        if (isAiMode) {
          // AI wraps or restarts smoothly
          startNewGame(false);
          return;
        } else {
          setIsGameOver(true);
          playBeep(220, "sawtooth", 0.2);
          return;
        }
      }

      // Self collision check
      if (s.snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
        if (isAiMode) {
          startNewGame(false);
          return;
        } else {
          setIsGameOver(true);
          playBeep(220, "sawtooth", 0.2);
          return;
        }
      }

      // Move snake
      s.snake.unshift(newHead);

      // Check food collection
      if (newHead.x === s.food.x && newHead.y === s.food.y) {
        const points = 100;
        setScore((prev) => {
          const nextScore = prev + points;
          if (nextScore > highScore) {
            setHighScore(nextScore);
            try {
              localStorage.setItem("psa_dev_snake_best", String(nextScore));
            } catch {
              // ignore
            }
          }
          return nextScore;
        });

        setLastCollected(s.foodToken.name);
        playBeep(620, "triangle", 0.09);

        // Spawn visual particles on canvas
        const cellSize = canvas.width / GRID_SIZE;
        spawnParticles(
          s.food.x * cellSize + cellSize / 2,
          s.food.y * cellSize + cellSize / 2,
          s.foodToken.color
        );

        spawnFood();
      } else {
        s.snake.pop();
      }

      // Speed up slightly as snake grows
      const nextInterval = Math.max(65, s.speed - Math.floor(s.snake.length * 1.5));
      timerId = setTimeout(gameTick, nextInterval);
    };

    // Animation frame for smooth rendering of canvas + particles
    let animFrame: number;

    const render = () => {
      animFrame = requestAnimationFrame(render);
      const s = stateRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cellSize = w / GRID_SIZE;

      ctx.clearRect(0, 0, w, h);

      // 1. Cyber Grid Background
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(w, i * cellSize);
        ctx.stroke();
      }

      // 2. Food Token (Glowing Tech Stack Badge)
      const fx = s.food.x * cellSize;
      const fy = s.food.y * cellSize;

      ctx.save();
      ctx.shadowColor = s.foodToken.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = s.foodToken.color;
      ctx.beginPath();
      ctx.roundRect(fx + 2, fy + 2, cellSize - 4, cellSize - 4, 4);
      ctx.fill();
      ctx.restore();

      // Tag label inside food
      ctx.fillStyle = "#090b10";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(s.foodToken.tag, fx + cellSize / 2, fy + cellSize / 2);

      // 3. Snake Body (Architecture Pipeline)
      s.snake.forEach((seg, i) => {
        const sx = seg.x * cellSize;
        const sy = seg.y * cellSize;
        const isHead = i === 0;

        ctx.save();
        if (isHead) {
          ctx.fillStyle = isDark ? "#f8fafc" : "#090a0f";
          ctx.shadowColor = isDark ? "#ffffff" : "#000000";
          ctx.shadowBlur = 8;
        } else {
          // Gradient fade along tail
          const alpha = Math.max(0.35, 1 - i / (s.snake.length + 3));
          ctx.fillStyle = isDark
            ? `rgba(213, 189, 175, ${alpha})`
            : `rgba(142, 95, 46, ${alpha})`;
        }

        ctx.beginPath();
        ctx.roundRect(sx + 1.5, sy + 1.5, cellSize - 3, cellSize - 3, isHead ? 6 : 3);
        ctx.fill();
        ctx.restore();

        // Terminal eyes on head
        if (isHead) {
          ctx.fillStyle = isDark ? "#090b10" : "#ffffff";
          const eyeSize = 2;
          ctx.beginPath();
          ctx.arc(sx + cellSize * 0.35, sy + cellSize * 0.35, eyeSize, 0, Math.PI * 2);
          ctx.arc(sx + cellSize * 0.65, sy + cellSize * 0.35, eyeSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Particle Sparks
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;

        if (p.alpha <= 0) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    timerId = setTimeout(gameTick, stateRef.current.speed);
    animFrame = requestAnimationFrame(render);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(animFrame);
    };
  }, [isAiMode, isGameOver, isDark, spawnFood, startNewGame, playBeep]);

  // Touch Swipe Steering
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20) changeDirection(1, 0);
      else if (dx < -20) changeDirection(-1, 0);
    } else {
      if (dy > 20) changeDirection(0, 1);
      else if (dy < -20) changeDirection(0, -1);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-lg relative flex flex-col justify-between">
      {/* Console Top Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isAiMode ? "bg-accent animate-pulse" : "bg-emerald-500 animate-ping"
            }`}
          />
          <div className="flex items-center gap-1.5 font-montserrat font-bold text-xs uppercase tracking-wider text-foreground">
            {isAiMode ? (
              <>
                <Bot className="w-3.5 h-3.5 text-accent" />
                <span>AI Pipeline Demo</span>
              </>
            ) : (
              <>
                <Gamepad2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Dev Pipeline Active</span>
              </>
            )}
          </div>
        </div>

        {/* Score & Trophy */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>BEST: {highScore}</span>
          </div>

          <div className="font-mono text-base font-black text-foreground tabular-nums">
            {score}
          </div>

          {/* Sound & Restart Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title={soundEnabled ? "Mute Game Sound" : "Enable Game Sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-accent" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => startNewGame(true)}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title="Restart Game"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div
        className="relative w-full aspect-square max-h-[340px] rounded-xl overflow-hidden border border-border/80 bg-background/50 flex items-center justify-center cursor-pointer select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          if (isAiMode || isGameOver) {
            startNewGame(true);
          }
        }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />

        {/* AI Demo Overlay Hint */}
        {isAiMode && !isGameOver && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center pointer-events-none">
            <div className="p-3 rounded-full bg-accent/20 border border-accent/40 text-accent mb-2 shadow-xs">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
            <span className="font-montserrat font-bold text-sm uppercase tracking-wider text-foreground mb-1">
              Play Dev Pipeline
            </span>
            <span className="font-sans text-xs text-muted-foreground max-w-xs">
              Click canvas or use Arrow Keys / Swipe to compile tech stacks
            </span>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <span className="font-mono text-xs text-rose-500 font-bold uppercase tracking-widest mb-1">
              RUNTIME EXCEPTION &bull; BUILD FAILED
            </span>
            <h4 className="font-montserrat font-black text-xl sm:text-2xl text-foreground mb-2">
              Pipeline Crashed!
            </h4>
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-5">
              <span>SCORE: {score}</span>
              <span>&bull;</span>
              <span>TOKENS: {Math.floor(score / 100)}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startNewGame(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Deploy Hotfix (Play Again)</span>
            </button>
          </div>
        )}
      </div>

      {/* Console Bottom Bar: Steer Hint / Controls */}
      <div className="mt-3 pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left font-sans text-xs text-muted-foreground flex items-center gap-2">
          {lastCollected ? (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-accent font-semibold animate-pulse">
              Compiled: {lastCollected} (+100)
            </span>
          ) : (
            <span>Use Arrow Keys / Swipe to steer</span>
          )}
        </div>

        {/* Touch D-Pad Controls for mobile / interactive clicking */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => changeDirection(-1, 0)}
            className="w-8 h-8 rounded-lg bg-card border border-border text-foreground hover:bg-muted active:scale-95 flex items-center justify-center cursor-pointer transition-all shadow-xs"
            aria-label="Steer Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => changeDirection(0, -1)}
              className="w-8 h-8 rounded-lg bg-card border border-border text-foreground hover:bg-muted active:scale-95 flex items-center justify-center cursor-pointer transition-all shadow-xs"
              aria-label="Steer Up"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => changeDirection(0, 1)}
              className="w-8 h-8 rounded-lg bg-card border border-border text-foreground hover:bg-muted active:scale-95 flex items-center justify-center cursor-pointer transition-all shadow-xs"
              aria-label="Steer Down"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => changeDirection(1, 0)}
            className="w-8 h-8 rounded-lg bg-card border border-border text-foreground hover:bg-muted active:scale-95 flex items-center justify-center cursor-pointer transition-all shadow-xs"
            aria-label="Steer Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
