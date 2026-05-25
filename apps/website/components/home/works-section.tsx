import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@packages/ui";
import { GsapReveal } from "@/components/gsap-reveal";
import { CaseCtaLabel } from "@/components/home/case-cta-label";
import { isSvgUrl } from "@/lib/url-utils";
import type { HomeContent } from "@/lib/types";

type WorksSectionProps = {
  heading: string;
  works: HomeContent["works"];
};

export function WorksSection({ heading, works }: WorksSectionProps) {
  return (
    <Section id="features" className="section-deferred bg-[var(--surface-soft)] py-20 md:py-28">
      <Container className="max-w-[1600px]">
        <GsapReveal preset="fadeUp" className="mx-auto mb-16 flex max-w-[640px] flex-col items-center space-y-4 text-center">
          <span className="framer-chip framer-chip-blue">My Work</span>
          <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[48px]">{heading}</h2>
        </GsapReveal>

        <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-10 md:gap-12">
          {works.map((item, index) => (
            <GsapReveal
              key={item.id}
              preset="fadeUp"
              delay={index * 0.08}
              className="w-full xl:sticky"
              as="div"
              style={{
                top: `clamp(${84 + index * 10}px, calc(4vw + ${72 + index * 6}px), ${112 + index * 18}px)`,
                zIndex: 20 + index,
              }}
            >
              <div className="work-card flex w-full flex-col items-stretch gap-2.5 rounded-[30px] border border-black/[0.08] bg-[#f8f8f7] p-2.5 md:min-h-[460px] md:flex-row">
                <WorkTextCard item={item} index={index} />
                <WorkImageCard item={item} />
              </div>
            </GsapReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WorkTextCard({ item, index }: { item: HomeContent["works"][0]; index: number }) {
  const hasMeta = item.role || item.year || item.company;
  return (
    <div className="relative flex min-h-[340px] flex-1 flex-col justify-between overflow-hidden rounded-[24px] border border-black/[0.03] bg-white p-6 md:min-h-[445px] md:basis-[58%] md:p-8">
      <div className="pointer-events-none absolute bottom-2 right-2 select-none text-[132px] font-bold leading-none text-black/[0.035] md:bottom-3 md:right-3 md:text-[176px]">0{index + 1}</div>

      <div className="relative z-10 flex flex-col gap-4">
        {hasMeta && (
          <p className="text-xs font-medium tracking-[-0.01em] text-[var(--text-muted)]">
            {[item.role, item.year, item.company].filter(Boolean).join(" · ")}
          </p>
        )}
        <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[38px]">
          {item.title}
        </h3>
        <p className="max-w-[58ch] text-[16px] leading-7 text-[#686868]" style={{ letterSpacing: "-0.01em" }}>
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={`${item.id}-${tag}`} className="case-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6">
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
  );
}

function WorkImageCard({ item }: { item: HomeContent["works"][0] }) {
  return (
    <div className="group relative flex-1 overflow-hidden rounded-[24px] border border-black/[0.03] bg-white p-2 md:basis-[42%] md:p-2.5">
      <div className="h-full overflow-hidden rounded-[20px] bg-[#f2f2f2]">
        <Image
          src={item.image}
          alt={item.title}
          width={1600}
          height={1200}
          sizes="(max-width: 809px) 100vw, (max-width: 1439px) 50vw, 780px"
          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-slow ease-out-quart group-hover:scale-[1.05]"
          unoptimized={isSvgUrl(item.image)}
        />
      </div>
    </div>
  );
}
