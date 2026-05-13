"use client";

import { useEffect, useRef } from "react";

interface SplitTextRevealProps {
  text: string;
  className?: string;
}

export function SplitTextReveal({ text, className }: SplitTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current.querySelectorAll<HTMLElement>(".split-char").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.animationPlayState = "running";
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          ref.current?.querySelectorAll<HTMLElement>(".split-char").forEach((el) => {
            el.style.animationPlayState = "running";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{ animationDelay: `${i * 20}ms` }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
