import Link from "next/link";
import { Button, Card, Container, Section } from "@packages/ui";
import type { SiteConfig } from "@/lib/types";

type HomeSectionsProps = {
  config: SiteConfig;
};

export function HomeSections({ config }: HomeSectionsProps) {
  return (
    <>
      <Section className="pb-10 pt-20 md:pb-16 md:pt-28">
        <Container>
          <p className="mb-4 inline-flex rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] ring-1 ring-[var(--color-border)]">
            Framer-to-code migration complete
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight opacity-0 [animation-delay:100ms] animate-fade-up md:text-6xl">
            {config.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[var(--color-muted)] opacity-0 [animation-delay:220ms] animate-fade-up md:text-lg">
            This website is now code-owned, versioned on GitHub, and ready for independent deployment without Framer lock-in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 opacity-0 [animation-delay:320ms] animate-fade-up">
            <Link href="/work">
              <Button>View Work</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section id="highlights" className="pt-2">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {config.highlights.map((item) => (
              <Card key={item} className="bg-white/80 backdrop-blur-sm">
                <p className="text-sm font-medium text-[var(--color-text)]">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
