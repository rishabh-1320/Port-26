"use client";

import Image from "next/image";
import { GsapReveal } from "@/components/gsap-reveal";

interface CaseFigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function CaseFigure({ src, alt, caption, width = 1600, height = 900 }: CaseFigureProps) {
  return (
    <GsapReveal preset="scaleUp">
      <figure className="case-figure">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 860px"
          className="case-figure-image w-full rounded-xl object-cover"
        />
        {caption && <figcaption className="mt-2 text-center text-sm text-[var(--color-muted)]">{caption}</figcaption>}
      </figure>
    </GsapReveal>
  );
}
