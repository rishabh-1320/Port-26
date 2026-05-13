"use client";

/**
 * useGsapReveal
 * Attach scroll-triggered reveal animations to DOM refs using GSAP.
 *
 * Usage:
 *   const ref = useGsapReveal<HTMLDivElement>({ preset: "fadeUp" });
 *   <div ref={ref}>...</div>
 *
 * Usage (staggered children):
 *   const ref = useGsapReveal<HTMLUListElement>({ preset: "fadeUp", stagger: 0.12, childSelector: "li" });
 *   <ul ref={ref}>...</ul>
 */

import { useEffect, useRef } from "react";
import {
  registerGsap,
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleUp,
  SCROLL_TRIGGER_DEFAULTS
} from "@/lib/gsap-utils";

type Preset = "fadeUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleUp";

const PRESETS = { fadeUp, fadeIn, slideInLeft, slideInRight, scaleUp };

interface UseGsapRevealOptions {
  /** Animation preset to use */
  preset?: Preset;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** If set, animate child elements with this selector instead of the ref itself */
  childSelector?: string;
  /** Stagger delay between children (seconds) */
  stagger?: number;
  /** Custom ScrollTrigger start value e.g. "top 80%" */
  triggerStart?: string;
  /** Disable on reduced-motion — defaults to true (always respects preference) */
  respectReducedMotion?: boolean;
}

export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  options: UseGsapRevealOptions = {}
) {
  const {
    preset = "fadeUp",
    delay = 0,
    childSelector,
    stagger = 0.1,
    triggerStart = SCROLL_TRIGGER_DEFAULTS.start,
    respectReducedMotion = true
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    // SSR guard
    if (typeof window === "undefined") return;

    // Respect reduced motion
    if (
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const selectedPreset = PRESETS[preset];
    let cleanup: (() => void) | undefined;

    registerGsap().then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        const el = ref.current;
        if (!el) return;

        const targets = childSelector
          ? el.querySelectorAll(childSelector)
          : [el];

        if (!targets || targets.length === 0) return;

        const tween = gsap.fromTo(
          targets,
          { ...selectedPreset.from },
          {
            ...selectedPreset.to,
            delay,
            stagger: childSelector ? stagger : 0,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              toggleActions: SCROLL_TRIGGER_DEFAULTS.toggleActions
            }
          }
        );

        cleanup = () => {
          tween.kill();
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === el) st.kill();
          });
        };
      });
    });

    return () => {
      cleanup?.();
    };
  }, [preset, delay, childSelector, stagger, triggerStart, respectReducedMotion]);

  return ref;
}
