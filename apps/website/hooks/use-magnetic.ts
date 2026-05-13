"use client";

import { useEffect, useRef } from "react";

interface UseMagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let isInRange = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
        raf = requestAnimationFrame(animate);
      } else {
        el.style.transform = currentX === 0 && currentY === 0 ? "" : `translate(${currentX}px, ${currentY}px)`;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius + Math.max(rect.width, rect.height) / 2) {
        if (!isInRange) {
          isInRange = true;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(animate);
        }
        targetX = dx * strength;
        targetY = dy * strength;
      } else if (isInRange) {
        isInRange = false;
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, radius]);

  return ref;
}
