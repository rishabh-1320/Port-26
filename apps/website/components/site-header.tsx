"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@packages/ui";
import type { HomeContent } from "@/lib/types";

type SiteHeaderProps = {
  content: HomeContent;
};

export function SiteHeader({ content }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleViewportChange() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    const onScroll = () => setIsScrolled(window.scrollY > 40);

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-[400ms] ease-[var(--ease-out-quart)] ${isScrolled ? "border-b border-[var(--border-default)] bg-white/85 backdrop-blur-[12px]" : "border-b border-transparent bg-white/40 backdrop-blur-[6px]"}`}>
      <Container className="max-w-[1600px] px-4 md:px-6">
        <div className="flex h-[88px] items-center justify-between gap-4 md:h-[92px]">
          <Link href="/" className="flex min-w-fit items-center gap-3" onClick={() => setMenuOpen(false)}>
            <Image src={content.logo} alt="Design Port logo" width={1969} height={1969} sizes="36px" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <p className="text-base font-bold leading-none tracking-tight md:text-[28px] md:leading-8" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.02em" }}>
                {content.siteName}
              </p>
              <p className="text-[11px] text-[#8e8e8e] md:text-xs" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.02em", fontWeight: 600 }}>
                {content.byline}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {content.nav.map((item, index) => (
              <div key={item.href} className="flex items-center gap-6">
                <Link href={item.href} className="group inline-flex text-base leading-6 text-[#181818]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}>
                  <RollingNavText text={item.label} />
                </Link>
                {index < content.nav.length - 1 && <span className="select-none text-[#d2d2d2]">/</span>}
              </div>
            ))}
          </nav>

          <Link href={content.resumeUrl} target="_blank" rel="noreferrer" className="hidden min-w-fit md:inline-flex">
            <span className="framer-btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 fill-[#181818]" aria-hidden="true">
                <path d="M 8 12 L 3 7 L 4.4 5.55 L 7 8.15 L 7 0 L 9 0 L 9 8.15 L 11.6 5.55 L 13 7 Z M 2 16 C 1.45 16 0.979 15.804 0.588 15.413 C 0.197 15.022 0.001 14.551 0 14 L 0 11 L 2 11 L 2 14 L 14 14 L 14 11 L 16 11 L 16 14 C 16 14.55 15.804 15.021 15.413 15.413 C 15.022 15.805 14.551 16.001 14 16 Z" />
              </svg>
              Download Resume
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white text-[var(--color-text)] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="relative h-4 w-5">
              <span className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        {menuOpen ? (
          <div id="mobile-site-menu" className="border-t border-[var(--color-border)] py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {content.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[#f5f5f5]"
                  style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={content.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-[#bbf451] px-4 py-3 text-base font-semibold text-[#181818] transition hover:bg-[#a6db46]"
                style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}
                onClick={() => setMenuOpen(false)}
              >
                Download Resume
              </Link>
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}

function RollingNavText({ text }: { text: string }) {
  return (
    <span className="relative inline-flex h-6 overflow-hidden">
      <span className="transition-transform duration-300 group-hover:-translate-y-6">
        <span className="block">{text}</span>
        <span className="block">{text}</span>
      </span>
    </span>
  );
}
