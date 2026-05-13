"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap-utils";

export function HeroMockupWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let cleanup: (() => void) | undefined;

    registerGsap().then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        const el = ref.current;
        if (!el) return;

        const tween = gsap.to(el, {
          y: -80,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        cleanup = () => {
          tween.kill();
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === el) st.kill();
          });
        };
      });
    });

    return () => cleanup?.();
  }, []);

  return <div ref={ref}>{children}</div>;
}
