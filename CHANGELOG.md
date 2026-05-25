# Changelog

All notable changes to the portfolio platform. Latest at the top.

The format roughly follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — grouped by *Added* / *Changed* / *Fixed* / *Removed*, with focused commits underneath.

---

## [Unreleased]

### Added — atomic design system and case-study primitives

- **Type and shadow tokens** in `globals.css` and `tailwind.config.ts`
  - Type scale: `display` / `h1` / `h2` / `h3` / `h4` / `body` / `body-sm` / `caption` / `eyebrow`
  - Mobile overrides: `display-sm` / `h1-sm` / `h2-sm` / `h3-sm`
  - Shadow scale: `card-rest`, `card-hover`, `card-feature`, `nav-card`, `btn-primary[-hover]`, `btn-secondary[-hover]`, `chip-blue`, `chip-lime`, `glass-card`
- **New atomic primitives in `packages/ui`** — `Heading`, `Text`, `Eyebrow`, `Badge`, `Divider`, `InlineCode`
- **Case-study molecules** — `HeroCard`, `InfoBlock`, `CaseSection`, `SubCard`, `MetricCard`, `CaseFigurePlaceholder`
- **Homepage sections extracted** from the 520-line `HomeSections` god-component into `apps/website/components/home/` — one file per section (`HeroSection`, `IdeologySection`, `WorksSection`, `AiWorkflowSection`, `AiExplorationsSection`, `AboutSection`, `FooterSection`)
- **New case-study route** at `/casestudy/chestnut` (Standardizing Chestnut, Tcules) — two-part narrative including the in-context variable creation feature deep-dive
- **CaseStudyNav** — horizontal scrollable "more case studies" strip with thumbnails sourced from the homepage work card images

### Changed — visual coherence pass

- **Unified section backgrounds** to one warm off-white (`--surface-soft` #f8f8f7) — every previous gray (`#f5f5f5`, `#f8f8f7`, `#fafafa`) collapsed to a single token, eliminating the hard transitions between sections
- **Section heading sizes normalized** — every section H2 now 36px mobile / 48px desktop (was 4 different sizes across 5 sections)
- **AI Workflow redesigned** with a centered vertical axis: tool names right-aligned to the line, lime dot at each tool, descriptions left-aligned — replaces the fixed-120px label + baseline-aligned grid that broke on multi-line descriptions
- **About timeline** rebuilt with a continuous vertical spine + lime dots at each company entry (was a flat list with only the projects sub-section having any visual rail)
- **Sticky TOC sidebar** widened to 220px and redesigned for desktop: vertical text list with a left lime tick on the active item (was bordered pills that cramped longer labels like "Part 2 — Creating a variable")
- **Case study Part A → Part 2 break** in Chestnut now uses a chapter divider (lines flanking a "PART 02" label + large centered chapter title) instead of a thin `<Divider />`
- **Chestnut Step 1-4 cards** redesigned with numbered lime badges and a connecting rail — reads as a sequential flow, not four identical SubCards
- **Image placeholder** (`CaseFigurePlaceholder`) redesigned: subtle gradient + faint grid + icon-in-circle + "VISUAL PENDING" eyebrow + dashed border (was a flat gray box reading as "broken")
- **Hero card metadata grid** swapped from a recessed gray panel to a top-divider + 3-column grid with eyebrow-styled labels (better contrast against the white-frosted parent card)
- **Body bullet lists** across all case studies: text color from `--text-muted` → `--text-secondary` for proper visual weight
- **InlineCode** padding thinned so it no longer pushes line-height
- **Footer text** brightened from `#8e8e8e` → `#a3a3a3` for WCAG AA contrast on the dark footer
- **CaseStudyNav cards** strengthened — wider (288 → 320px), brighter title, stronger hover (border colors to text, shadow lifts)
- **Chestnut homepage work card** activated — `active: true`, `href: /casestudy/chestnut`, title aligned to the new content framing

### Added — case-study content from the locked drafts

- **Chestnut (CS2)** — full Part A (standardization + Bonsai design system shipped in code) + Part 2 (in-context variable creation feature) sourced from `Content dump/Case-Study-2-Insurance-SaaS-Redesign.md`
- **HR Analytics Dashboard (CS3)** — rewritten with the narrative format from `Content dump/Case-Study-3-HRMS-Attendance-Dashboard.md`, replacing the old step-based structure
- **HRMS Candidate Onboarding (CS4)** — rewritten with the clarity-and-self-service narrative from `Content dump/Case-Study-4-HRMS-Onboarding-Redesign.md`
- **Arksaber Design System (CS5)** — rewritten with the real Figma token data and architecture depth from `Content dump/Case-Study-5-Multi-Brand-Design-System.md`

### Fixed

- **Tailwind misreading `text-[var(--token)]` as a color utility** — adding explicit `*-sm` font-size tokens fixed H1/H2/H3 rendering at 16px when the arbitrary-value `text-[var(--text-h1-size-sm)]` was being applied as `color: var(...)` instead of `font-size: var(...)`
- **Ideology section excess vertical whitespace** — `.process-section` and `.process-content` padding trimmed from 80px to 48px so the section no longer eats ~240px of empty space
- **Mobile heading hierarchy** — H3 mobile size override (19px) added so the H2→H3 size gap is visible (was only 17% on mobile, now ~32%)

### Removed

- **`onboarding-case-study.ts` Lingobase data** is now unused (kept in repo for reference) — the `/casestudy/onboarding` route renders HRMS Candidate Onboarding content directly via JSX
- **`design-system-case-study.ts` Plasma data** unused for the same reason — `/casestudy/design-system` renders Arksaber content directly

---

## [Pre-Unreleased] — earlier carried-forward work

These changes were authored in prior sessions and ship in the same commit.

### Added

- **Hero WebGL2 shader** — exact replication of the Framer "Animated Gradient Background" used on the source site (value noise + swirl distortion, three-color blending, 13 uniforms baked from the original bundle config)
- **Hero gradient masking** with `-80px` overflow extension so the lime bleed fades cleanly into the section below (radial side-blobs + linear vertical fade composited with `mask-composite: add`)
- **Per-workspace READMEs** for `apps/website`, `apps/webapp`, `apps/ai-tool`, `packages/ui`, `services/website-api`
- **Repo-level docs** — `CONTRIBUTING.md`, `LICENSE`, `.editorconfig`, `.github/PULL_REQUEST_TEMPLATE.md`, `docs/ARCHITECTURE.md`, `docs/RESTRUCTURE_PLAN.md`

### Changed

- **Hero shader speed** normalized (was 25× too fast — fix: `totalTime += delta * (speed / 100)`)
- **Hero shader context** switched from WebGL1 to WebGL2 to match the Framer source

### Removed

- **Planning-only files at repo root** — `components-inventory.md`, `figma-implementation-plan.md`, `maketokens.md` (work tracked elsewhere)
