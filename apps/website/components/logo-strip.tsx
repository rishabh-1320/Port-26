import { Container } from "@packages/ui";
import type { LogoItem } from "@/lib/types";

type LogoStripProps = {
  heading: string;
  logos: LogoItem[];
};

export function LogoStrip({ heading, logos }: LogoStripProps) {
  return (
    <div className="border-b border-[var(--border-default)] bg-[var(--surface-soft)] py-8">
      <Container className="max-w-[1600px]">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-medium tracking-[-0.01em] text-[var(--text-muted)]">{heading}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((logo) =>
              logo.src ? (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-6 w-auto object-contain opacity-50 grayscale transition hover:opacity-80"
                />
              ) : (
                <span
                  key={logo.name}
                  className="text-sm font-semibold tracking-tight text-[var(--text-muted)] opacity-60"
                >
                  {logo.name}
                </span>
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
