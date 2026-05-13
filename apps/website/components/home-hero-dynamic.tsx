"use client";

import { useEffect, useState } from "react";

const HERO_ROTATION_MS = 3600;
const HERO_STAGGER_MS = 22;
const HERO_EXIT_MS = 420;
const HERO_ENTER_MS = 520;

type HeroPhase = "idle" | "exiting" | "entering";

export function HeroRotator({ phrases, accessibleLabel }: { phrases: string[]; accessibleLabel?: string }) {
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
    <span className={`hero-rotator ${phaseClass}`}>
      <span className="sr-only">{accessibleLabel || currentPhrase}</span>
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

