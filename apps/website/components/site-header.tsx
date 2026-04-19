import Image from "next/image";
import Link from "next/link";
import { Container } from "@packages/ui";
import type { HomeContent } from "@/lib/types";

type SiteHeaderProps = {
  content: HomeContent;
};

export function SiteHeader({ content }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white bg-white/80 backdrop-blur-[10px]">
      <Container className="flex h-[88px] max-w-[1600px] items-center justify-between gap-4 md:h-[92px]">
        <Link href="/" className="flex min-w-fit items-center gap-3">
          <Image src={content.logo} alt="Design Port logo" width={1969} height={1969} sizes="36px" className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-base font-bold leading-none tracking-tight md:text-[28px] md:leading-8" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.02em' }}>
              {content.siteName}
            </p>
            <p className="text-[11px] text-[#8e8e8e] md:text-xs" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.02em', fontWeight: 600 }}>
              {content.byline}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {content.nav.map((item, index) => (
            <div key={item.href} className="flex items-center gap-6">
              <Link href={item.href} className="group inline-flex text-base leading-6 text-[#181818]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                <RollingNavText text={item.label} />
              </Link>
              {index < content.nav.length - 1 && <span className="select-none text-[#d2d2d2]">/</span>}
            </div>
          ))}
        </nav>

        <Link href={content.resumeUrl} target="_blank" rel="noreferrer" className="min-w-fit">
          <span className="framer-btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 fill-[#181818]" aria-hidden="true">
              <path d="M 8 12 L 3 7 L 4.4 5.55 L 7 8.15 L 7 0 L 9 0 L 9 8.15 L 11.6 5.55 L 13 7 Z M 2 16 C 1.45 16 0.979 15.804 0.588 15.413 C 0.197 15.022 0.001 14.551 0 14 L 0 11 L 2 11 L 2 14 L 14 14 L 14 11 L 16 11 L 16 14 C 16 14.55 15.804 15.021 15.413 15.413 C 15.022 15.805 14.551 16.001 14 16 Z" />
            </svg>
            Download Resume
          </span>
        </Link>
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
