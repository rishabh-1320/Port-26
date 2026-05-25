# Contributing to ravish-portfolio-platform

Thank you for your interest in contributing. This document covers everything you need to get up and running.

---

## Prerequisites

| Tool | Version | Why |
|------|---------|-----|
| Node.js | `>=20.10.0` | Required by all apps |
| npm | `>=10` | Workspace manager |
| Git | any | Version control |

Optional but recommended:
- VS Code with the ESLint and Tailwind CSS IntelliSense extensions

---

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/<you>/ravish-portfolio-platform.git
cd ravish-portfolio-platform

# 2. Install all workspace dependencies from the root
npm install

# 3. Start the website (primary app)
npm run dev:website
# → http://localhost:3000
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for a full walkthrough of how the codebase is structured.

---

## Development commands

Run these from the **repo root**:

| Command | What it does |
|---------|-------------|
| `npm run dev:website` | Start the portfolio website on :3000 |
| `npm run dev:website-api` | Start the backend API on :3001 |
| `npm run dev:webapp` | Start the web app shell on :3002 |
| `npm run typecheck` | TypeScript check across all workspaces |
| `npm run build` | Production build across all workspaces |
| `npm run lint` | ESLint across all workspaces |

---

## Branch conventions

| Branch type | Format | Example |
|-------------|--------|---------|
| Feature | `feat/<short-description>` | `feat/contact-form` |
| Bug fix | `fix/<short-description>` | `fix/hero-flicker-on-mobile` |
| Content | `content/<short-description>` | `content/add-chestnut-case-study` |
| Docs | `docs/<short-description>` | `docs/update-architecture` |
| Chore | `chore/<short-description>` | `chore/bump-gsap-version` |

Branch from `main`. Keep branches short-lived.

---

## Commit messages

Use conventional commits format:

```
<type>(<scope>): <short summary>

<optional body>
```

**Types:** `feat`, `fix`, `content`, `docs`, `chore`, `refactor`, `style`, `test`

**Scope (optional):** `website`, `ui`, `api`, `webapp`, `ai-tool`

**Examples:**
```
feat(website): add Plasma design system case study
fix(website): correct before/after slider label positions
content(website): update Timelabs experience description
docs: add ARCHITECTURE.md
chore: bump next.js to 14.2.5
```

---

## Code conventions

These are enforced by TypeScript strict mode and reviewed in PRs:

- **No `any`** — always type explicitly
- **Server components by default** — only add `"use client"` when the component genuinely needs browser APIs or state
- **Content in `lib/`** — all site text, images, and structured data live in `apps/website/lib/`. Never hardcode strings in component JSX that should be editable content
- **Tailwind only** — no CSS modules, no styled-components, no inline `style={}` except for dynamic values that can't be expressed as Tailwind classes
- **No `console.log`** left in PRs
- **Accessibility** — interactive elements need accessible labels, images need descriptive `alt` text

See [`docs/ARCHITECTURE.md#key-conventions`](docs/ARCHITECTURE.md#key-conventions) for the full list.

---

## Adding a case study

See ["How case studies work"](docs/ARCHITECTURE.md#how-case-studies-work) in the architecture doc for the step-by-step guide. The short version:

1. Add assets to `apps/website/public/case-study/<slug>/`
2. Create `apps/website/lib/<slug>-case-study.ts` with typed content
3. Create `apps/website/app/casestudy/<slug>/page.tsx`
4. Add the work card to `homeContent.works` in `apps/website/lib/site-content.ts`

---

## Pull request checklist

Before opening a PR:

- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run build` succeeds locally
- [ ] No `.DS_Store`, `*.log`, or `node_modules` files accidentally staged
- [ ] Content changes are in `lib/` files, not hardcoded in components
- [ ] New `"use client"` components have a comment explaining why they need client-side rendering
- [ ] Images use `next/image` with correct `sizes` prop
- [ ] New interactive components have keyboard support and accessible labels

---

## Do not touch

Two paths in `apps/website` are intentionally untouched unless you own them:

- `app/therapist-coupon-ops-b7k3m9/` — internal operational page
- `components/redeem-coupon-overlay.tsx` — tied to the above

---

## Questions?

Open an issue or reach out via [rishabh1320@gmail.com](mailto:rishabh1320@gmail.com).
