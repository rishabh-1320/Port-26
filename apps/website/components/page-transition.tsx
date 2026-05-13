"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<"in" | "idle">("idle");
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setStage("in");
      const t = setTimeout(() => setStage("idle"), 400);
      previousPath.current = pathname;
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <div className={`page-transition page-transition--${stage}`}>
      {children}
    </div>
  );
}
