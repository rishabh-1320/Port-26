import Link from "next/link";
import { Container, Section } from "@packages/ui";
import { MagneticButton } from "@/components/magnetic-button";
import { SplitTextReveal } from "@/components/split-text-reveal";
import { GsapReveal } from "@/components/gsap-reveal";
import type { HomeContent } from "@/lib/types";

type FooterSectionProps = {
  footer: HomeContent["footer"];
  resumeUrl: string;
  footerNote: string;
};

export function FooterSection({ footer, resumeUrl, footerNote }: FooterSectionProps) {
  return (
    <Section className="section-deferred bg-[#181818] py-20">
      <Container className="max-w-[900px]">
        <div className="flex flex-col items-center gap-16 text-center">
          <GsapReveal preset="fadeUp" className="flex flex-col items-center gap-6">
            <h2 className="text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-5xl xl:text-6xl">
              <SplitTextReveal text={footer.closingLine} />
            </h2>
            <Link href={`mailto:${footer.email}`} className="w-fit">
              <MagneticButton>
                <span className="framer-btn-primary">Send an email</span>
              </MagneticButton>
            </Link>
          </GsapReveal>

          <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:items-start md:text-left">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <Link
                href={`mailto:${footer.email}`}
                className="text-sm leading-6 tracking-[-0.01em] text-[#e0e0e0] transition hover:text-white"
              >
                {footer.email}
              </Link>
              <Link
                href={footer.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm leading-6 tracking-[-0.01em] text-[#e0e0e0] transition hover:text-white"
              >
                LinkedIn
              </Link>
              <span className="text-sm leading-6 tracking-[-0.01em] text-[#a3a3a3]">{footer.location}</span>
            </div>

            <Link href={resumeUrl} target="_blank" rel="noreferrer">
              <span className="framer-btn-secondary text-sm">Download Resume</span>
            </Link>
          </div>

          <div className="h-px w-full bg-white/10" />

          <span className="text-sm text-[#a3a3a3]" style={{ letterSpacing: "-0.01em" }}>
            {footerNote}
          </span>
        </div>
      </Container>
    </Section>
  );
}
