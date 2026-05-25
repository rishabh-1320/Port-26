import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, Divider, Eyebrow, InlineCode, Section } from "@packages/ui";
import { ScrollSpyToc } from "@/components/case-study/scroll-spy-toc";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { CaseStudyFooter } from "@/components/case-study/case-study-footer";
import { CaseFigurePlaceholder } from "@/components/case-study/case-figure-placeholder";
import { CaseSection } from "@/components/case-study/case-section";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { HeroCard } from "@/components/case-study/hero-card";
import { arksaberCaseStudy } from "@/lib/arksaber-case-study";

export const metadata: Metadata = {
  title: arksaberCaseStudy.metadataTitle,
  description: arksaberCaseStudy.metadataDescription,
};

export default function DesignSystemCaseStudyPage() {
  return (
    <>
      <ScrollProgressBar />

      <Section className="pb-8 pt-12 md:pb-10 md:pt-16">
        <Container>
          <Link href="/" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            ← Back to Home
          </Link>

          <div id="snapshot" className="mt-5 scroll-mt-28">
            <HeroCard
              title={arksaberCaseStudy.title}
              meta={[
                { title: "Role", value: arksaberCaseStudy.role },
                { title: "Type", value: arksaberCaseStudy.type },
                { title: "Stack", value: arksaberCaseStudy.stack },
              ]}
              footer={
                <CaseFigurePlaceholder
                  description="parity proof — Figma Button matrix beside the code-rendered component, under two brands"
                  caption="Same component, designed in Figma and rendered from code — under two brands."
                />
              }
            >
              <p className="content-prose">
                Arksaber is a whitelabel design system I built end to end — designed in Figma, then built as real React and Tailwind components, themeable across brands.
              </p>
              <p className="content-prose mt-3">
                Most design systems stop at Figma and hand off a spec. This one ships as code. Same components, same token names — swap the values, and the whole system re-skins for a new brand.
              </p>
              <p className="content-prose mt-3">
                I built the code with AI, working from my own tokens and designs. It&apos;s a proof of concept: two brands, the core component set, running in Storybook.
              </p>
            </HeroCard>
          </div>
        </Container>
      </Section>

      <Section className="py-2 md:py-4">
        <Container>
          <div className="grid gap-5 md:grid-cols-[220px_minmax(0,860px)] md:gap-10">
            <aside className="md:sticky md:top-28 md:h-fit">
              <Eyebrow className="md:mb-3">On this page</Eyebrow>
              <ScrollSpyToc items={arksaberCaseStudy.toc} />
            </aside>

            <article className="space-y-0">

              <CaseSection id="why" heading="Why I built it">
                <p className="content-prose">
                  I kept hitting the same gap. Design systems live in Figma. Products live in code. And the space between them is where consistency quietly dies — values get re-typed, states get missed, the build drifts from the design.
                </p>
                <p className="content-prose mt-4">
                  So I set a constraint: don&apos;t call it done at handoff. Call it done when it runs.
                </p>
                <p className="content-prose mt-4">
                  Arksaber was my way to prove I could own the whole loop — design the system, define the tokens, and build the actual components — and keep the two in lockstep. Whitelabel made it harder on purpose: if the architecture is right, one system should dress up as many brands without touching a single component.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="tokens" heading="The architecture: tokens that name themselves">
                <p className="content-prose">
                  The system rests on tokens, and the naming is doing the heavy lifting.
                </p>
                <p className="content-prose mt-4">
                  Every token reads as <InlineCode>component / variant / property / state</InlineCode>. So <InlineCode>button/primary/fill/resting</InlineCode> is the fill color of a primary button at rest. <InlineCode>button/secondary/content/disabled</InlineCode> is the text color of a disabled secondary button. You can read a token and know exactly where it lives.
                </p>
                <p className="content-prose mt-4">A few real ones:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-7 font-mono text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>button/primary/fill/resting → #3b82f6</li>
                  <li>button/primary/fill/hover → #2563eb</li>
                  <li>button/secondary/content/resting → #2563eb</li>
                  <li>button/secondary/outline/resting → #e5e5e5</li>
                </ul>
                <p className="content-prose mt-4">
                  It&apos;s not just color. Spacing and type are tokenized too — <InlineCode>spacing/button/gap</InlineCode> (8px), <InlineCode>size/label-md</InlineCode> (14px), <InlineCode>family/label-md</InlineCode> (Inter). Nothing in a component is a magic number; everything points back to a named decision.
                </p>
                <CaseFigurePlaceholder
                  description="token taxonomy — the component/variant/property/state convention with real Button examples"
                  caption="Every value has a name, and the name says exactly where it's used."
                />
                <p className="content-prose mt-4">
                  <strong>Why this matters:</strong> this is the layer that makes whitelabel work. The component never hard-codes a color. It asks for a token. So re-skinning a brand isn&apos;t a redesign — it&apos;s a new set of values behind the same names.
                </p>
                <CaseFigurePlaceholder
                  description="token table — name → value → where used, using the real Button tokens"
                  caption="The tokens that get re-skinned per brand."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="whitelabel" heading="The whitelabel engine">
                <p className="content-prose">
                  Two brands, one system.
                </p>
                <p className="content-prose mt-4">
                  Because every component pulls from tokens, theming a second brand means changing the token <em>values</em> — not the components. The button doesn&apos;t know what brand it&apos;s in. It just knows it needs <InlineCode>button/primary/fill/resting</InlineCode>, whatever that resolves to.
                </p>
                <p className="content-prose mt-4">
                  That&apos;s the whole trick, and it&apos;s why the naming had to be disciplined first. Get the token layer right, and theming becomes a config change instead of a rebuild.
                </p>
                <CaseFigurePlaceholder
                  description="the same components under Brand A vs Brand B, side by side"
                  caption="One system, two brands — only the token values change."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="components" heading="Component anatomy: every state, on purpose">
                <p className="content-prose">
                  I designed components as full state machines, not happy-path snapshots.
                </p>
                <p className="content-prose mt-4">
                  The Button covers two classes — primary and secondary — across resting, hover, active, and focus, plus a disabled treatment for each. The Input Field is more demanding: five states (resting, focus, hover, active, error), each in filled and empty, plus disabled — twelve variants in all. There&apos;s a Hint component for default, error, and success messages, an icon set, and a Modal with its own header and footer.
                </p>
                <p className="content-prose mt-4">
                  Atoms, molecules, organisms — buttons and inputs up through composed pieces like the modal.
                </p>
                <CaseFigurePlaceholder
                  description="component anatomy — the Input Field's 12 states"
                  caption="Every state, accounted for — designed once, coded once."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="figma-to-code" heading="Figma to code: closing the loop">
                <p className="content-prose">
                  Here&apos;s the part most systems skip.
                </p>
                <p className="content-prose mt-4">
                  The Figma components weren&apos;t a spec to interpret later — they were the source the code was built from. The variant structure carried straight across:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>In Figma, the Button has three axes — <strong>Class</strong> (primary/secondary), <strong>State</strong> (resting/hover/active/focus), and <strong>Disable</strong>.</li>
                  <li>In code, those became the React props — <InlineCode>propClass</InlineCode>, <InlineCode>state</InlineCode>, <InlineCode>disable</InlineCode> — plus <InlineCode>icon</InlineCode>, <InlineCode>iconLeft</InlineCode>, <InlineCode>iconRight</InlineCode>, and <InlineCode>text</InlineCode>.</li>
                </ul>
                <p className="content-prose mt-4">
                  One-to-one. The way I structured the component in Figma is the way you call it in React. No translation drift.
                </p>
                <CaseFigurePlaceholder
                  description="Figma → code pipeline: Figma variables/components → token JSON + MCP → AI → CSS tokens + React components → Storybook"
                  caption="How the design became the code."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="ai-workflow" heading="How I worked with AI">
                <p className="content-prose">
                  AI built the codebase. I directed it.
                </p>
                <p className="content-prose mt-4">
                  I fed it two things: my token definitions as JSON, and the Figma designs themselves through Figma&apos;s MCP. From there, AI generated the CSS tokens and wrote the React components to match the designs — variant by variant, state by state.
                </p>
                <p className="content-prose mt-4">
                  My job wasn&apos;t typing the code. It was the architecture and the judgment: naming the tokens so they&apos;d theme cleanly, defining the variant model, and checking the output against the design until it matched. AI moved fast; I decided what &ldquo;correct&rdquo; meant.
                </p>
                <p className="content-prose mt-4">
                  This is the workflow I keep coming back to — AI to accelerate the build, me to own the system it&apos;s building.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="outcome" heading="Where it landed">
                <p className="content-prose">
                  Arksaber runs in Storybook today — the core components, themeable across two brands, as real code.
                </p>
                <p className="content-prose mt-4">
                  It&apos;s a proof of concept, and I&apos;ll call it that honestly: it&apos;s not an enterprise system with adoption metrics. What it proves is the thing I set out to prove — that I can own the full loop from token to component to code, keep design and build in parity, and architect for whitelabel from the ground up.
                </p>
                <p className="content-prose mt-4">
                  The next steps are obvious: more components, a hosted Storybook, and docs. But the spine — the token architecture and the design-to-code parity — is already standing.
                </p>
                <CaseFigurePlaceholder
                  description="Storybook — the components running"
                  caption="The system, running."
                />
              </CaseSection>

            </article>
          </div>
        </Container>
      </Section>

      <CaseStudyNav current="design-system" />
      <CaseStudyFooter />
    </>
  );
}
