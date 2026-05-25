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
    <nav
      aria-label="Table of contents"
      className="mt-3 flex gap-2 overflow-x-auto scrollbar-none md:mt-2 md:flex-col md:gap-0 md:overflow-visible"
    >
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
            className={`
              shrink-0 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition
              md:relative md:block md:whitespace-normal md:rounded-none md:border-0 md:border-l-2 md:px-0 md:py-1.5 md:pl-3 md:text-[13px] md:leading-snug
              ${
                isActive
                  ? "border-[var(--color-text)] bg-[var(--color-text)] text-white md:border-[var(--brand-lime)] md:bg-transparent md:font-semibold md:text-[var(--text-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text)] hover:bg-[#f5f5f5] md:border-transparent md:text-[var(--text-muted)] md:hover:bg-transparent md:hover:text-[var(--text-primary)]"
              }
            `}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
