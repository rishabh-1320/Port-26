"use client";

import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "div" | "span";
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  radius = 80,
  as: Tag = "span"
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLDivElement>({ strength, radius });
  return <Tag ref={ref as React.RefObject<HTMLSpanElement & HTMLDivElement>} className={className} style={{ display: "inline-block", willChange: "transform" }}>{children}</Tag>;
}
