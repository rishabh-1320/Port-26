import Link from "next/link";
import { Container } from "@packages/ui";
import type { SiteConfig } from "@/lib/types";

type SiteHeaderProps = {
  config: SiteConfig;
};

export function SiteHeader({ config }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[color:rgba(247,248,243,0.85)] backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {config.siteName}
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {config.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[var(--color-muted)] transition hover:text-[var(--color-text)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
