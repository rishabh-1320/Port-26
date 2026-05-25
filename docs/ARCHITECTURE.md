# Architecture

This document explains how the `ravish-portfolio-platform` monorepo is structured, how the pieces connect, and where to find or change anything. Read this before touching code.

---

## Monorepo at a glance

```
ravish-portfolio-platform/
├── apps/
│   ├── website/            # Primary app — Next.js 14 portfolio website (live)
│   ├── webapp/             # Planned secondary app shell
│   └── ai-tool/            # Planned AI interface + proxy API
│
├── services/
│   └── website-api/        # Lightweight health check + runtime content API
│
├── packages/
│   └── ui/                 # Shared React UI primitives used by all apps
│
├── docs/                   # Project documentation (you are here)
├── scripts/                # Repo-level utility scripts
├── .github/workflows/
│   └── ci.yml              # Typecheck + build on every PR and main push
├── tsconfig.base.json      # Shared TypeScript compiler options
└── package.json            # npm workspaces root
```

The monorepo uses **npm workspaces**. Each app and service is its own npm package with its own `package.json`, `tsconfig.json`, and Vercel deployment. The root `package.json` wires the workspace together and exposes top-level scripts.

---

## Apps at a glance

| Package | Path | Status | Port | Purpose |
|---|---|---|---|---|
| `@apps/website` | `apps/website` | Live | 3000 | Public-facing portfolio website |
| `@apps/webapp` | `apps/webapp` | Planned | — | Secondary app shell |
| `@apps/ai-tool` | `apps/ai-tool` | Planned | — | AI interface + proxy API |
| `@services/website-api` | `services/website-api` | Live | 4010 | Health check + runtime content API |
| `@packages/ui` | `packages/ui` | Live | — | Shared React UI primitives (no dev server) |

Run the primary website locally with:

```bash
npm run dev:website          # starts apps/website on :3000
npm run dev:website-api      # starts services/website-api on :4010
```

---

## `apps/website` structure

This is the main application. Everything below is relative to `apps/website/`.

```
apps/website/
├── app/
│   ├── layout.tsx                        # Root layout: fonts, nav, PageTransition wrapper
│   ├── page.tsx                          # Homepage — server component, imports homeContent
│   ├── globals.css                       # Design tokens (CSS custom properties) + base styles
│   ├── robots.ts                         # /robots.txt
│   ├── sitemap.ts                        # /sitemap.xml
│   ├── not-found.tsx                     # 404 page
│   ├── casestudy/
│   │   ├── dashboard/page.tsx            # HRMS attendance dashboard case study
│   │   ├── onboarding/page.tsx           # Lingobase onboarding redesign case study
│   │   └── design-system/page.tsx        # Plasma design system case study
│   ├── case-study/                       # Legacy URL aliases — all redirect to /casestudy/*
│   │   ├── onboarding/page.tsx           #   → redirect("/casestudy/onboarding")
│   │   └── design-system/page.tsx        #   → redirect("/casestudy/design-system")
│   └── therapist-coupon-ops-b7k3m9/      # Internal hidden page — do not modify or link
│
├── components/
│   ├── home-sections.tsx                 # Full homepage layout (~25 KB, imports everything)
│   ├── site-header.tsx                   # Top navigation bar
│   ├── page-transition.tsx               # GSAP page transition wrapper
│   ├── hero-shader-canvas.tsx            # WebGL canvas — animated lime gradient
│   ├── home-hero-dynamic.tsx             # Hero section, mounts HeroShaderCanvas client-side
│   ├── gsap-reveal.tsx                   # Declarative scroll-triggered reveal wrapper
│   ├── magnetic-button.tsx               # Magnetic hover effect button wrapper
│   ├── animated-counter.tsx              # Counts up to a number when scrolled into view
│   ├── scroll-progress-bar.tsx           # Thin lime bar at top tracking read progress
│   ├── split-text-reveal.tsx             # Text split into spans for GSAP character animation
│   ├── hero-mockup-wrapper.tsx           # Positions device mockup in hero section
│   ├── process-lines-reveal.tsx          # Animated connecting lines for the process section
│   ├── redeem-coupon-overlay.tsx         # Overlay UI for the internal coupon page
│   └── case-study/
│       ├── before-after-compare.tsx      # Interactive drag slider: Before (left) / After (right)
│       ├── scroll-spy-toc.tsx            # Sticky table of contents with active-section highlight
│       ├── case-study-footer.tsx         # Dark CTA footer shared by all case study pages
│       └── case-figure.tsx               # Figure wrapper: image + caption
│
├── lib/
│   ├── site-content.ts                   # All homepage content as a typed `homeContent` object
│   ├── onboarding-case-study.ts          # Full Lingobase case study content + types
│   ├── design-system-case-study.ts       # Plasma design system case study content + types
│   ├── types.ts                          # Shared TypeScript types (HomeContent, CaseStudyContent, …)
│   ├── design-tokens.ts                  # Design token constants mirrored from globals.css
│   ├── gsap-utils.ts                     # GSAP lazy loader, animation preset registry, helpers
│   └── shaders/
│       └── hero-gradient.glsl.ts         # GLSL vertex + fragment shaders as TypeScript strings
│
└── hooks/
    ├── use-gsap-reveal.ts                # IntersectionObserver + GSAP hook, used by GsapReveal
    └── use-magnetic.ts                   # Mouse-tracking hook used by MagneticButton
```

### Path aliases

Inside `apps/website`, imports use two aliases defined in `tsconfig.json`:

| Alias | Resolves to |
|---|---|
| `@/*` | `apps/website/*` (root of the app) |
| `@ui/*` | `packages/ui/src/*` |

The shared UI package is also importable as `@packages/ui` (the npm workspace name).

---

## Content architecture

**All site text and structured data lives in `apps/website/lib/` — nothing is hardcoded in components.**

The pattern throughout the codebase is:

1. A `lib/*.ts` file exports a typed `const` object containing all the content for a page or section.
2. The page component (a Next.js server component) imports that object and passes it as props.
3. Client components receive content as props and render it.

This means **changing any text, image URL, or copy = editing one lib file, with zero component changes**.

```
lib/site-content.ts
  └── exports `homeContent: HomeContent`
        └── imported by app/page.tsx
              └── passed as props to <HomeSections content={homeContent} />

lib/onboarding-case-study.ts
  └── exports `onboardingCaseStudy: CaseStudyContent`
        └── imported by app/casestudy/onboarding/page.tsx

lib/design-system-case-study.ts
  └── exports `designSystemCaseStudy: CaseStudyContent`
        └── imported by app/casestudy/design-system/page.tsx
```

All type definitions for these objects live in `lib/types.ts`. When adding new content fields, add the type there first.

---

## How case studies work

Each case study is a standalone static page with no CMS or API dependency. The three-file pattern is:

```
lib/[slug]-case-study.ts          ← all content as a typed data object
app/casestudy/[slug]/page.tsx     ← server component that imports and renders that data
components/case-study/            ← reusable UI components shared by all case studies
```

The current case studies are:

| Slug | Content file | Page |
|---|---|---|
| `onboarding` | `lib/onboarding-case-study.ts` | `app/casestudy/onboarding/page.tsx` |
| `design-system` | `lib/design-system-case-study.ts` | `app/casestudy/design-system/page.tsx` |
| `dashboard` | content inline in page | `app/casestudy/dashboard/page.tsx` |

### Legacy URL aliases

The routes under `app/case-study/` exist only to redirect older URLs. Each file there contains a single `redirect()` call pointing to the canonical `/casestudy/*` path. Do not add new content there.

### Adding a new case study

1. Create `lib/[new-slug]-case-study.ts` exporting a `CaseStudyContent` object.
2. Create `app/casestudy/[new-slug]/page.tsx` that imports and renders it.
3. Reference the shared components from `components/case-study/` for consistent layout pieces (TOC, footer, figures, before/after slider).

### Case study components

| Component | File | Purpose |
|---|---|---|
| `ScrollSpyToc` | `components/case-study/scroll-spy-toc.tsx` | Sticky left-rail TOC, highlights current section |
| `BeforeAfterCompare` | `components/case-study/before-after-compare.tsx` | Drag slider showing before (left) vs after (right) |
| `CaseStudyFooter` | `components/case-study/case-study-footer.tsx` | Dark CTA block at the bottom of every case study |
| `CaseFigure` | `components/case-study/case-figure.tsx` | Image + caption wrapper |

---

## Animation system

All animations use **GSAP 3** with ScrollTrigger. The system is designed to be declarative in JSX and lazy in execution.

### Lazy loading

GSAP is not bundled upfront. `lib/gsap-utils.ts` exports `registerGsap()`, an async function that dynamically imports `gsap` and `gsap/ScrollTrigger` on first call, registers the plugin, and returns the instance. Calling it multiple times is safe — it resolves immediately after the first load.

```ts
// lib/gsap-utils.ts
export async function registerGsap() { … }
```

### Animation presets

Six named presets are exported from `lib/gsap-utils.ts`:

| Preset | Effect |
|---|---|
| `fadeUp` | Fade in + rise 48px from below (primary reveal) |
| `fadeIn` | Opacity-only fade |
| `slideInLeft` | Fade + slide in 64px from the left |
| `slideInRight` | Fade + slide in 64px from the right |
| `scaleUp` | Fade in + scale from 0.92 to 1 |
| `slideAlternate` | Fade + rise — used for process rows with caller-controlled direction |

### Using animations in JSX

Wrap any element with `<GsapReveal>` for a declarative scroll-triggered reveal:

```tsx
import { GsapReveal } from "@/components/gsap-reveal";

// Single element
<GsapReveal preset="fadeUp" delay={0.1}>
  <MyCard />
</GsapReveal>

// Staggered children
<GsapReveal preset="fadeUp" childSelector="article" stagger={0.12}>
  <div>
    <article>…</article>
    <article>…</article>
  </div>
</GsapReveal>
```

`GsapReveal` accepts `preset`, `delay`, `childSelector`, `stagger`, `triggerStart`, `className`, `style`, and `as` props. Internally it delegates to `hooks/use-gsap-reveal.ts`, which attaches an IntersectionObserver and fires the GSAP animation once.

For imperative use (e.g., in complex components), use `revealOnScroll()` or `revealStagger()` from `lib/gsap-utils.ts` directly.

### Reduced motion

Two layers of reduced-motion support:

1. `globals.css` — `@media (prefers-reduced-motion: reduce)` sets `scroll-behavior: auto` and can be extended for CSS transitions.
2. `lib/gsap-utils.ts` — after loading, `registerGsap()` sets `gsap.globalTimeline.timeScale(100)` if the user prefers reduced motion, effectively making all GSAP animations instant.

### WebGL hero gradient

The animated lime gradient behind the hero is a full WebGL 2 canvas rendered by `components/hero-shader-canvas.tsx`. The GLSL shaders (vertex + fragment) live in `lib/shaders/hero-gradient.glsl.ts` as TypeScript string exports. Key implementation details:

- Rendered at 0.5× device resolution (`RENDER_SCALE = 0.5`) for performance.
- Capped at 30 FPS (`FPS_CAP = 30`).
- Falls back gracefully by adding a `hero-shader-fallback` CSS class when WebGL 2 is unavailable.
- Shader uniforms control color, swirl, distortion, rotation, and speed — all configured in the `CONFIG` constant at the top of the file.

---

## Design system

### CSS custom properties (design tokens)

The source of truth for design tokens is `apps/website/app/globals.css`, in the `:root` block. Tokens cover:

| Category | Example variables |
|---|---|
| Surface | `--surface-base`, `--surface-soft`, `--surface-dark` |
| Text | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse` |
| Brand | `--brand-lime` (#BBF451), `--brand-lime-hover` (#A6DB46), `--brand-blue` (#007AFF), `--brand-warm` (#FFF89A) |
| Border | `--border-default`, `--border-strong`, `--border-subtle` |
| Radius | `--radius-sm` (8px) through `--radius-2xl` (30px) |
| Easing | `--ease-out-quart`, `--ease-out-expo`, `--ease-in-out` |
| Duration | `--dur-fast` (200ms) through `--dur-reveal` (900ms) |
| Z-index | `--z-base` through `--z-modal` |

These same values are mirrored in `lib/design-tokens.ts` as TypeScript constants (`COLORS`, `EASE`, `DURATION`) for use in GSAP animations and any runtime JS that needs token values.

**Do not define one-off color or timing values in components.** Use the tokens.

### Typography

- Headings: **Aileron** (custom font, weights 400/600/700), loaded via `@font-face` in `globals.css` from Framer CDN. The 600-weight woff2 is `<link rel="preload">`'d in `app/layout.tsx`.
- Body: system sans stack — `"Aileron", "Inter", "Segoe UI", sans-serif`.

### Tailwind

Tailwind CSS 3.4 is configured in `apps/website/tailwind.config.ts`. The config extends the default theme with the design tokens. Utility classes referencing token values (e.g. `text-[var(--text-muted)]`) are preferred over arbitrary values.

### Shared UI primitives (`packages/ui`)

`packages/ui` contains intentionally minimal, unstyled-or-lightly-styled React primitives. They are the structural building blocks; visual styling happens at the app level via Tailwind classes passed as props.

| Export | File | Purpose |
|---|---|---|
| `Button` | `packages/ui/src/primitives/button.tsx` | Base button element |
| `Card` | `packages/ui/src/primitives/card.tsx` | Surface container |
| `Container` | `packages/ui/src/layout/container.tsx` | Max-width page wrapper |
| `Section` | `packages/ui/src/layout/section.tsx` | Vertical section spacing wrapper |

Import in any app:

```ts
import { Button, Card, Container, Section } from "@packages/ui";
```

`apps/website/next.config.mjs` includes `transpilePackages: ["@packages/ui"]` so Next.js compiles the package from source.

---

## Deployment model

Each app and service is deployed as its own independent Vercel project. There is no shared Vercel config at the monorepo root.

| Vercel project | Root directory | Required env vars |
|---|---|---|
| Website | `apps/website` | `WEBSITE_API_BASE_URL`, `NEXT_PUBLIC_SITE_URL` |
| Website API | `services/website-api` | none |
| Web App | `apps/webapp` | none |
| AI Tool | `apps/ai-tool` | `OPENAI_API_KEY` |

### Deployment order

`services/website-api` must be deployed first. Once deployed, copy its production URL into the `WEBSITE_API_BASE_URL` environment variable on the Website Vercel project before deploying `apps/website`.

### API

`services/website-api` is a minimal Next.js app running on port 4010. Its only active endpoint is:

```
GET /health  →  { ok: true, service: "website-api", timestamp: "…" }
```

---

## CI

`.github/workflows/ci.yml` runs on every pull request and every push to `main`:

1. Install (`npm install --no-audit --no-fund`)
2. Typecheck all workspaces (`npm run typecheck` — runs `tsc --noEmit` in each package)
3. Build all workspaces (`npm run build`)

Both steps must pass before merging. The typecheck step uses the shared `tsconfig.base.json` as the base config for all packages.

---

## Key conventions

### Component and file naming

- React components: `PascalCase` filename, named export (no default exports from component files except Next.js pages/layouts).
- Hooks: `camelCase` with `use-` prefix, e.g. `use-gsap-reveal.ts`.
- Lib files: `kebab-case`, e.g. `site-content.ts`, `onboarding-case-study.ts`.
- Case study content files follow the pattern `[slug]-case-study.ts`.

### Imports

- Prefer `@/` alias over relative paths within `apps/website`.
- Use `@packages/ui` for shared primitives — never a relative path reaching outside the app.
- Do not barrel-re-export components from `components/index.ts`; import the specific file.

### Server vs client components

- Pages (`app/**/page.tsx`, `app/layout.tsx`) are server components by default. Keep data fetching and content imports there.
- Any component using React hooks, browser APIs, GSAP, or event listeners must have `"use client"` at the top.
- `home-sections.tsx` is a client component because it orchestrates GSAP animations. Data is passed into it as props from the server component `app/page.tsx`.

### Content changes

- Homepage text, images, and section order → `lib/site-content.ts`
- A case study's text, steps, and metadata → the corresponding `lib/*-case-study.ts` file
- Design tokens → `app/globals.css` `:root` block (and mirror the value in `lib/design-tokens.ts` if it is used in JS)

### TypeScript

- Strict mode is on (`"strict": true` in `tsconfig.base.json`). No `any` without a comment explaining why.
- All content objects passed between server and client components must be fully typed. Types live in `lib/types.ts`.
- The `@ts-expect-error` directive in `components/gsap-reveal.tsx` is intentional — it suppresses a known limitation of dynamic JSX tag typing.

### What not to touch

- `app/therapist-coupon-ops-b7k3m9/` — internal page, not linked publicly. Do not rename, move, or modify it.
- `app/case-study/*/page.tsx` — these are permanent redirects. Do not add content or change the destination paths.

---

## Where to find things

| What you want to change | Where to look |
|---|---|
| Homepage headline / body copy | `apps/website/lib/site-content.ts` |
| Work cards on the homepage | `apps/website/lib/site-content.ts` → `works` array |
| A case study's text or images | `apps/website/lib/[slug]-case-study.ts` |
| Homepage layout and section order | `apps/website/components/home-sections.tsx` |
| Top navigation links | `apps/website/lib/site-content.ts` → `nav` array |
| Fonts | `apps/website/app/globals.css` → `@font-face` blocks |
| Color tokens | `apps/website/app/globals.css` → `:root` |
| GSAP animation presets | `apps/website/lib/gsap-utils.ts` |
| Hero WebGL shader | `apps/website/lib/shaders/hero-gradient.glsl.ts` |
| Hero gradient colors / speed | `apps/website/components/hero-shader-canvas.tsx` → `CONFIG` |
| Shared Button / Card / Container | `packages/ui/src/` |
| TypeScript types for content | `apps/website/lib/types.ts` |
| Vercel project settings | `docs/vercel-project-matrix.md` |
| CI pipeline | `.github/workflows/ci.yml` |
