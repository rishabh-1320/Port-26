import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, Divider, Eyebrow, Section } from "@packages/ui";
import { ScrollSpyToc } from "@/components/case-study/scroll-spy-toc";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { CaseStudyFooter } from "@/components/case-study/case-study-footer";
import { CaseFigurePlaceholder } from "@/components/case-study/case-figure-placeholder";
import { CaseSection } from "@/components/case-study/case-section";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { HeroCard } from "@/components/case-study/hero-card";
import { SubCard } from "@/components/case-study/sub-card";
import { dashboardCaseStudy } from "@/lib/hrms-dashboard-case-study";

export const metadata: Metadata = {
  title: dashboardCaseStudy.metadataTitle,
  description: dashboardCaseStudy.metadataDescription,
};

export default function HrmsDashboardPage() {
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
              title={dashboardCaseStudy.title}
              meta={[
                { title: "Role", value: dashboardCaseStudy.role },
                { title: "Company", value: `${dashboardCaseStudy.company} · ${dashboardCaseStudy.year}` },
                { title: "Timeline", value: dashboardCaseStudy.timeline },
              ]}
            >
              <p className="content-prose">
                Timelabs is an HRMS used by large enterprises. Its admin dashboard showed plenty of data but didn&apos;t help anyone decide anything. I redesigned it into an attendance and workforce analytics dashboard that surfaces patterns, not just numbers — when people actually show up, who&apos;s likely to take leave when, and how the workforce breaks down across departments, shifts, and branches.
              </p>
              <p className="content-prose">
                It shipped. Leaders use it. And the interesting part wasn&apos;t the charts — it was figuring out which numbers mattered, how to show them, and getting them to actually work in code.
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
              <ScrollSpyToc items={dashboardCaseStudy.toc} />
            </aside>

            <article className="space-y-0">

              <CaseSection id="problem" heading="The problem">
                <p className="content-prose">
                  Timelabs already had an admin dashboard. The data was all there — comprehensive, technically complete. But it was a wall of numbers. Leaders had to sit with it and do the analysis themselves. Nobody opens a dashboard to do homework.
                </p>
                <p className="content-prose mt-4">
                  The company wanted a redesign that did the thinking for the leader. Open it, see what&apos;s happening with your workforce, decide something.
                </p>
                <CaseFigurePlaceholder
                  description="existing dashboard — the 'before'"
                  caption="The old admin dashboard — a wall of numbers, no clear path to a decision."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="stakeholders" heading="Working with stakeholders (and no users)">
                <p className="content-prose">
                  Honest framing: there was no user research on this project. No interviews, no workshops, no card sorting. It was requirements-driven — the CEO, CTO, and PMs knew the HRMS space and brought a list of what they wanted.
                </p>
                <p className="content-prose mt-4">
                  So my evidence base was different. When we disagreed on what a KPI should be or how to show it, we&apos;d look at how comparable products solved it, search for conventions, and pressure-test the logic. Competitive analysis instead of user testing.
                </p>
                <p className="content-prose mt-4">
                  The CEO was the hardest to align with — not because he was wrong, but because he kept changing his mind. We revisited KPIs multiple times before landing on each one.
                </p>
                <p className="content-prose mt-4">
                  Here&apos;s the thing about attendance: people don&apos;t follow their shift times. They have their own rhythms. The real job of this dashboard was to surface those hidden patterns — the gap between the schedule and reality. The CEO pushed for this and he was right to.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="kpis" heading="Picking what to measure">
                <p className="content-prose">
                  The brief was &ldquo;show everything useful.&rdquo; So the initial KPI list was huge — every attendance, workforce, device, and demographic metric you could think of.
                </p>
                <p className="content-prose mt-4">
                  That&apos;s a trap. A dashboard that shows everything helps with nothing. The real work was filtering: which numbers drive a decision, and which are just noise dressed up as insight.
                </p>
                <p className="content-prose mt-4">
                  I narrowed it through iteration — putting KPIs in, seeing if they earned their place, cutting the ones that didn&apos;t. No formal framework. Trial, error, and judgment.
                </p>
                <p className="content-prose mt-4">What survived broke into clear groups:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li><strong>Real-time:</strong> who&apos;s expected, who&apos;s present, who&apos;s absent</li>
                  <li><strong>Workforce:</strong> active, inactive, unmapped, recent joiners and leavers</li>
                  <li><strong>Patterns:</strong> attendance trends, leave patterns, working hours</li>
                  <li><strong>Demographics:</strong> gender, age, experience, employment type</li>
                </ul>
              </CaseSection>

              <Divider />

              <CaseSection id="charts" heading="Choosing the right chart for each number">
                <p className="content-prose">
                  Once I knew what to show, the question became how. A few decisions worth calling out:
                </p>
                <div className="mt-5 space-y-5">
                  <SubCard title="Attendance Trends → a dot plot">
                    <p className="content-prose">
                      Instead of a single arrival time or a simple bar, I plotted every employee&apos;s arrival as a dot, grouped by department, across the morning hours. Now you can see the <em>spread</em> — which departments cluster early, which trickle in, where the late tail sits. That&apos;s the pattern the CEO wanted. A bar chart would&apos;ve flattened it into an average and hidden the truth.
                    </p>
                  </SubCard>
                  <SubCard title="Head Count → a table, not a pie">
                    <p className="content-prose">
                      The obvious choice for &ldquo;employees per branch&rdquo; is a pie chart. But this dashboard was built for large enterprises — 15, 20+ departments and branches. A pie chart falls apart past 9 or 10 slices. So head count became a clean table with numbers you can actually read and compare.
                    </p>
                  </SubCard>
                  <SubCard title="Working Hours → a smoothened area chart">
                    <p className="content-prose">
                      Daily working hours bounce around. A raw line was jagged and hard to read at a glance, so I smoothed it into an area chart that shows the trend without the noise.
                    </p>
                  </SubCard>
                  <SubCard title="Ratios → donuts. Comparisons → bars.">
                    <p className="content-prose">
                      Gender, employment type, worker type — simple part-to-whole, so donuts. Workforce summary and leave status, where you&apos;re comparing groups across departments — grouped and stacked bars.
                    </p>
                  </SubCard>
                </div>
                <CaseFigurePlaceholder
                  description="final dashboard, annotated — the dot plot, the head count table, the smoothened area chart"
                  caption="The decisions that shaped the dashboard — each chart chosen for what it reveals, not what's familiar."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="engineering" heading="Making it real (the part most case studies skip)">
                <p className="content-prose">
                  Designing the dashboard was half the job. Getting it to actually work was the other half — and that meant sitting with two different engineers.
                </p>
                <div className="mt-5 space-y-4">
                  <SubCard title="The data engineer">
                    <p className="content-prose">
                      Most of these KPIs weren&apos;t single numbers sitting in a database. They were combinations — multiple data points processed through SQL to produce one figure. The engineer kept hitting the same wall: which data points to mix, and how. So we worked through it together, KPI by KPI, defining exactly what each number was made of and what got it there.
                    </p>
                  </SubCard>
                  <SubCard title="The frontend developer">
                    <p className="content-prose">
                      The charts were built with the right visualizations, but the interactions and responsiveness were off. So I sat with the developer and walked through how each chart should <em>behave</em> — how it reacts to more data, how it holds up across screen sizes.
                    </p>
                  </SubCard>
                </div>
              </CaseSection>

              <Divider />

              <CaseSection id="qa-bug" heading="The bug I caught in QA">
                <p className="content-prose">
                  One of those behaviors broke in a way that proves the whole point about responsiveness.
                </p>
                <p className="content-prose mt-4">
                  I designed the dashboard for large enterprises with many departments. When the developer loaded dummy data into the Workforce Summary bar chart, a department-heavy dataset made the bars overlap — labels and values turned into an unreadable smear.
                </p>
                <p className="content-prose mt-4">
                  I caught it in QA, sat with the developer, and we fixed it: give each bar a minimum width and spacing, then let the chart scroll horizontally past the fold instead of cramming everything into view. The chart stays readable no matter how many departments you throw at it.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="outcome" heading="Where it landed">
                <p className="content-prose">
                  The dashboard shipped. Leaders use it to read their workforce at a glance instead of doing the analysis themselves.
                </p>
                <p className="content-prose mt-4">
                  I don&apos;t have a clean before/after metric to point to — this was a feature inside a larger HRMS, not a standalone experiment. But it&apos;s live, and there are public reviews that call out the experience.
                </p>
                <CaseFigurePlaceholder
                  description="G2 / software support reviews highlighting the design"
                  caption="Public reviews calling out the dashboard — to be added."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="reflection" heading="What I'd do differently">
                <p className="content-prose">
                  Working with the developers taught me something I&apos;ve carried into every project since: my designs weren&apos;t informational enough.
                </p>
                <p className="content-prose mt-4">
                  What felt obvious to me — how something should behave, why a chart was built a certain way, what the edge cases were — wasn&apos;t obvious to the people building it. I handed off clean screens and assumed the intent came through. It didn&apos;t.
                </p>
                <blockquote className="mt-5 rounded-xl bg-[var(--surface-muted)] px-5 py-4 text-base italic text-[var(--text-primary)]">
                  Now I treat handoff as part of the design, not the end of it. More context, more annotation, more &ldquo;here&apos;s why.&rdquo; Design isn&apos;t done when the Figma file looks right. It&apos;s done when the thing ships the way you meant it to.
                </blockquote>
              </CaseSection>

            </article>
          </div>
        </Container>
      </Section>

      <CaseStudyNav current="dashboard" />
      <CaseStudyFooter />
    </>
  );
}
