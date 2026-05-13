"use client";

import { useEffect } from "react";
import { registerGsap } from "@/lib/gsap-utils";

export function ProcessLinesReveal() {
  useEffect(() => {
    const tracks = document.querySelectorAll<HTMLElement>(".process-line-track");
    if (!tracks.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    registerGsap().then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        const trigger = document.querySelector(".process-lines");
        if (!trigger) return;

        gsap.set(tracks, { scaleY: 0, transformOrigin: "top center" });

        const tween = gsap.to(tracks, {
          scaleY: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });

        cleanup = () => {
          tween.kill();
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === trigger) st.kill();
          });
        };
      });
    });

    return () => cleanup?.();
  }, []);

  return null;
}
