"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

type ScrollSpyTocProps = {
  items: TocItem[];
};

export function ScrollSpyToc({ items }: ScrollSpyTocProps) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds.length) {
      return;
    }

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sectionElements.length) {
      return;
    }

    const getCurrentSection = () => {
      const anchorOffset = window.scrollY + 180;
      let current = sectionElements[0]?.id ?? sectionIds[0];

      for (const section of sectionElements) {
        if (section.offsetTop <= anchorOffset) {
          current = section.id;
        }
      }

      return current;
    };

    const syncActiveOnScroll = () => {
      setActiveId((previous) => {
        const current = getCurrentSection();
        return previous === current ? previous : current;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveId(mostVisible.target.id);
          return;
        }

        syncActiveOnScroll();
      },
      {
        rootMargin: "-22% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.65]
      }
    );

    for (const section of sectionElements) {
      observer.observe(section);
    }

    syncActiveOnScroll();
    window.addEventListener("scroll", syncActiveOnScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncActiveOnScroll);
    };
  }, [sectionIds]);

  return (
    <nav className="mt-3 flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", `#${item.id}`);
              setActiveId(item.id);
            }}
            aria-current={isActive ? "location" : undefined}
            className={`whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-medium transition md:text-sm ${
              isActive
                ? "border-[var(--color-text)] bg-[var(--color-text)] text-white"
                : "border-[var(--color-border)] text-[var(--color-text)] hover:bg-[#f5f5f5]"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
