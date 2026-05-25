import { LogoStrip } from "@/components/logo-strip";
import { HeroSection } from "@/components/home/hero-section";
import { IdeologySection } from "@/components/home/ideology-section";
import { WorksSection } from "@/components/home/works-section";
import { AiWorkflowSection } from "@/components/home/ai-workflow-section";
import { AiExplorationsSection } from "@/components/home/ai-explorations-section";
import { AboutSection } from "@/components/home/about-section";
import { FooterSection } from "@/components/home/footer-section";
import type { HomeContent } from "@/lib/types";

export function HomeSections({ content }: { content: HomeContent }) {
  return (
    <>
      <HeroSection hero={content.hero} />
      <LogoStrip heading={content.logoStrip.heading} logos={content.logoStrip.logos} />
      <IdeologySection heading={content.ideologyHeading} principles={content.ideologyPrinciples} />
      <WorksSection heading={content.worksHeading} works={content.works} />
      <AiWorkflowSection aiWorkflow={content.aiWorkflow} />
      <AiExplorationsSection
        heading={content.aiExplorationsHeading}
        intro={content.aiExplorationsIntro}
        explorations={content.aiExplorations}
      />
      <AboutSection about={content.about} />
      <FooterSection footer={content.footer} resumeUrl={content.resumeUrl} footerNote={content.footerNote} />
    </>
  );
}
