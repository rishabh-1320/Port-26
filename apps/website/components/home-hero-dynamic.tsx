"use client";

import { useEffect, useState, useRef } from "react";

const HERO_ROTATION_MS = 3600;
const HERO_STAGGER_MS = 22;
const HERO_EXIT_MS = 420;
const HERO_ENTER_MS = 520;

type HeroPhase = "idle" | "exiting" | "entering";

export function HeroRotator({ phrases }: { phrases: string[] }) {
  const safePhrases = phrases.length > 0 ? phrases : [""];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<HeroPhase>("idle");

  useEffect(() => {
    setCurrentIndex(0);
    setPhase("idle");
  }, [phrases]);

  useEffect(() => {
    if (safePhrases.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setPhase((previousPhase) => (previousPhase === "idle" ? "exiting" : previousPhase));
    }, HERO_ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [safePhrases.length]);

  useEffect(() => {
    if (safePhrases.length < 2 || phase === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (phase === "exiting") {
        setCurrentIndex((previousIndex) => (previousIndex + 1) % safePhrases.length);
        setPhase("entering");
        return;
      }

      setPhase("idle");
    }, phase === "exiting" ? HERO_EXIT_MS : HERO_ENTER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase, safePhrases.length]);

  const currentPhrase = safePhrases[Math.min(currentIndex, safePhrases.length - 1)] || "";
  const phaseClass = phase === "idle" ? "" : `is-${phase}`;

  return (
    <span className={`hero-rotator ${phaseClass}`} aria-live="polite">
      <span className="sr-only">{currentPhrase}</span>
      <HeroLine text={currentPhrase} phase={phase} />
    </span>
  );
}

function HeroLine({ text, phase }: { text: string; phase: HeroPhase }) {
  const words = text.trim().split(/\s+/);
  let charOffset = 0;
  const animationClass = phase === "exiting" ? "hero-char-exit" : phase === "entering" ? "hero-char-enter" : "";

  return (
    <span className="hero-line" aria-hidden="true">
      {words.map((word, wordIndex) => {
        const currentOffset = charOffset;
        charOffset += word.length + 1;

        return (
          <span key={`${text}-word-${wordIndex}`} className="hero-word">
            {Array.from(word).map((character, index) => (
              <span key={`${text}-${wordIndex}-${index}`} className={`hero-char ${animationClass}`} style={{ animationDelay: `${(currentOffset + index) * HERO_STAGGER_MS}ms` }}>
                {character}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

export function HeroGradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const layers = [
      { color: "187,244,81", baseX: 0.18, baseY: 0.72, radius: 0.58, ampX: 0.09, ampY: 0.08, speed: 0.11, alpha: 0.42, phase: 1.4 },
      { color: "79,161,255", baseX: 0.82, baseY: 0.66, radius: 0.54, ampX: 0.09, ampY: 0.1, speed: 0.1, alpha: 0.36, phase: 2.2 },
      { color: "187,244,81", baseX: 0.5, baseY: 0.9, radius: 0.62, ampX: 0.07, ampY: 0.08, speed: 0.09, alpha: 0.28, phase: 0.4 },
      { color: "255,248,154", baseX: 0.48, baseY: 0.78, radius: 0.48, ampX: 0.06, ampY: 0.08, speed: 0.08, alpha: 0.2, phase: 3.1 }
    ];

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let running = false;
    let lastTick = 0;
    let isVisible = true;
    const fpsCap = 24;
    const frameInterval = 1000 / fpsCap;
    const renderScale = 0.45;
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = motionMediaQuery.matches;
    let wasRunningBeforeHidden = false;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width * renderScale));
      height = Math.max(1, Math.round(bounds.height * renderScale));
      canvas.width = width;
      canvas.height = height;
      context.setTransform(1, 0, 0, 1, 0, 0);
    };

    const prepareFrame = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
    };

    const draw = (time: number) => {
      if (!running) {
        return;
      }

      if (time - lastTick < frameInterval) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }
      lastTick = time;

      const t = time * 0.00008;
      prepareFrame();

      layers.forEach((layer) => {
        const wave = t * layer.speed + layer.phase;
        const x = (layer.baseX + Math.sin(wave) * layer.ampX + Math.cos(wave * 0.43) * layer.ampX * 0.45) * width;
        const y = (layer.baseY - Math.sin(wave * 0.67) * 0.06 + Math.cos(wave * 0.52) * layer.ampY) * height;
        const radius = Math.max(width, height) * layer.radius * (0.9 + 0.12 * Math.sin(wave * 0.8));

        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${layer.color}, ${layer.alpha})`);
        gradient.addColorStop(0.58, `rgba(${layer.color}, ${layer.alpha * 0.45})`);
        gradient.addColorStop(1, `rgba(${layer.color}, 0)`);

        context.fillStyle = gradient;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      });

      context.globalCompositeOperation = "source-over";

      if (running) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const drawStill = () => {
      prepareFrame();
      layers.forEach((layer) => {
        const x = layer.baseX * width;
        const y = layer.baseY * height;
        const radius = Math.max(width, height) * layer.radius;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${layer.color}, ${layer.alpha})`);
        gradient.addColorStop(0.58, `rgba(${layer.color}, ${layer.alpha * 0.45})`);
        gradient.addColorStop(1, `rgba(${layer.color}, 0)`);
        context.fillStyle = gradient;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      });
      context.globalCompositeOperation = "source-over";
    };

    const start = () => {
      if (reduceMotion || running || !isVisible) {
        return;
      }
      running = true;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(animationFrame);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        wasRunningBeforeHidden = running;
        stop();
        return;
      }

      if (wasRunningBeforeHidden) {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) {
        drawStill();
      }
    });

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.05 }
    );

    resizeObserver.observe(shell);
    visibilityObserver.observe(shell);
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
    resize();
    if (reduceMotion) {
      drawStill();
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={shellRef} className="hero-gradient-canvas-shell">
      <canvas ref={canvasRef} className="hero-gradient-canvas" aria-hidden="true" />
    </div>
  );
}
