"use client";

/**
 * <GsapReveal> — declarative scroll-triggered reveal wrapper.
 *
 * Usage:
 *   <GsapReveal preset="fadeUp">
 *     <MyCard />
 *   </GsapReveal>
 *
 *   // Staggered children:
 *   <GsapReveal preset="fadeUp" childSelector="article" stagger={0.12}>
 *     <div>
 *       <article>...</article>
 *       <article>...</article>
 *     </div>
 *   </GsapReveal>
 */

import { useGsapReveal } from "@/hooks/use-gsap-reveal";

type Preset = "fadeUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleUp";

interface GsapRevealProps {
  children: React.ReactNode;
  preset?: Preset;
  delay?: number;
  childSelector?: string;
  stagger?: number;
  triggerStart?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

export function GsapReveal({
  children,
  preset = "fadeUp",
  delay = 0,
  childSelector,
  stagger = 0.1,
  triggerStart,
  className,
  style,
  as: Tag = "div"
}: GsapRevealProps) {
  const ref = useGsapReveal<HTMLDivElement>({
    preset,
    delay,
    childSelector,
    stagger,
    triggerStart
  });

  return (
    // @ts-expect-error dynamic tag with forwarded ref
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
