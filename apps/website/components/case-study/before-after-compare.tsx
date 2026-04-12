"use client";

import { useId, useState } from "react";

type BeforeAfterCompareProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
};

export function BeforeAfterCompare({ beforeSrc, afterSrc, beforeLabel, afterLabel, alt }: BeforeAfterCompareProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <figure className="space-y-2">
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
        <img
          src={beforeSrc}
          alt={`${alt} (before)`}
          className="h-auto max-h-[500px] w-full select-none bg-[#fafafa] object-contain"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={afterSrc}
            alt={`${alt} (after)`}
            className="h-full w-full select-none bg-[#fafafa] object-contain"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `calc(${position}% - 1px)` }}>
          <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/70 text-white">
            <span className="text-xs">⇆</span>
          </div>
        </div>

        <label htmlFor={id} className="sr-only">
          Compare before and after design
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Before and after comparison slider"
        />

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">{beforeLabel}</div>
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">{afterLabel}</div>
      </div>
      <figcaption className="text-center text-xs text-[var(--color-muted)] md:text-sm">{alt}</figcaption>
    </figure>
  );
}
