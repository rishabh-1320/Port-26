import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@packages/ui";
import { GsapReveal } from "@/components/gsap-reveal";
import { CaseCtaLabel } from "@/components/home/case-cta-label";
import { isSvgUrl } from "@/lib/url-utils";
import type { HomeContent } from "@/lib/types";

type AiExplorationsSectionProps = {
  heading: string;
  intro: string;
  explorations: HomeContent["aiExplorations"];
};

export function AiExplorationsSection({ heading, intro, explorations }: AiExplorationsSectionProps) {
  if (explorations.length === 0) return null;

  return (
    <Section id="ai-exploration" className="section-deferred bg-white py-20 md:py-28">
      <Container className="max-w-[1600px]">
        <GsapReveal preset="fadeUp" className="mx-auto mb-10 flex w-full max-w-[1000px] flex-col items-center gap-2 text-center md:mb-12">
          <span className="framer-chip framer-chip-blue">Pet Projects</span>
          <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[48px]">{heading}</h2>
          <p className="max-w-[740px] text-[18px] leading-[26px] text-[#181818] md:text-[20px] md:leading-[30px]" style={{ letterSpacing: "-0.01em" }}>
            {intro}
          </p>
        </GsapReveal>

        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 md:flex-row md:flex-wrap">
          {explorations.map((item) => (
            <AiExplorationCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function AiExplorationCard({ item }: { item: HomeContent["aiExplorations"][0] }) {
  const statusColors: Record<string, string> = {
    Live: "bg-[#e8fcd4] text-[#3a7d00]",
    Prototype: "bg-[#e8f0ff] text-[#1a4aad]",
    Archived: "bg-[#f2f2f2] text-[#8e8e8e]",
  };

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-[26px] border border-black/[0.08] bg-[#fafafa] p-2.5 md:basis-[calc(50%-8px)]">
      <div className="overflow-hidden rounded-[18px]">
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={750}
          sizes="(max-width: 809px) 100vw, (max-width: 1439px) 50vw, 780px"
          className="aspect-[4/3] h-full w-full object-cover"
          unoptimized={isSvgUrl(item.image)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 rounded-[18px] bg-white p-5 md:p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[26px]">{item.title}</h3>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[item.status] ?? statusColors.Archived}`}>
            {item.status}
          </span>
        </div>

        <p className="text-[15px] leading-7 text-[#6f6f6f]" style={{ letterSpacing: "-0.01em" }}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={`${item.id}-${tag}`} className="case-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {item.builtWith.map((tool) => (
              <span key={tool} className="rounded-md bg-[#f5f5f5] px-2 py-0.5 text-xs font-medium text-[#5f5f5f]">
                {tool}
              </span>
            ))}
          </div>
          <span className="shrink-0 text-xs text-[var(--text-muted)]">{item.year}</span>
        </div>

        <div className="mt-auto pt-2">
          {item.active && item.href ? (
            <Link href={item.href} className="case-cta w-fit">
              <CaseCtaLabel label={item.ctaLabel} />
            </Link>
          ) : (
            <span className="case-cta-disabled w-fit" aria-disabled="true">
              <CaseCtaLabel label={item.ctaLabel} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
