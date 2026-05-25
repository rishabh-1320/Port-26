# Repository Restructure Plan

Goal: make `ravish-portfolio-platform` clean, well-documented, and immediately navigable by a new contributor when published on GitHub.

---

## Current state assessment

### What's already good
- Monorepo structure (`apps/`, `packages/`, `services/`) is sound
- TypeScript strict mode, CI pipeline, and `.env.example` are in place
- `apps/website` is the most complete app and is production-quality

### What needs fixing

| Issue | Severity | Detail |
|-------|----------|--------|
| Root folder has spaces (`Port 26 AI`) | High | Causes shell escaping issues; fix by renaming the folder after pushing to GitHub |
| Stray markdown files at root | High | `components-inventory.md`, `figma-implementation-plan.md`, `maketokens.md`, `port-26-portfolio-upgrade-implementation-plan.md` should live in `docs/` |
| Mixed package manager | High | Root uses npm (`package-lock.json`); `apps/website` has `pnpm-lock.yaml` — commit to one |
| `.DS_Store` not fully gitignored | Medium | Found in `packages/ui/src/` — update `.gitignore` |
| No `CONTRIBUTING.md` | Medium | Now created at root |
| No per-app `README.md` | Medium | New contributors don't know what each app does |
| No `LICENSE` file | Medium | Public GitHub repo needs an explicit license |
| Dead code: `site-footer.tsx` | Low | Returns `null`; delete it |
| `services/website-api` has no README | Low | Purpose is unclear without docs |
| No `.editorconfig` | Low | Inconsistent indentation across editors |
| No shared ESLint config package | Low | ESLint installed at root but no shared config |

---

## Recommended final structure

```
ravish-portfolio-platform/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml          ← Phase 5
│   │   └── feature_request.yml     ← Phase 5
│   └── PULL_REQUEST_TEMPLATE.md    ✓ done
│
├── apps/
│   ├── website/                    # Portfolio website [ACTIVE]
│   │   └── README.md               ← Phase 3
│   ├── webapp/                     # Web app shell [PLANNED]
│   │   └── README.md               ← Phase 3
│   └── ai-tool/                    # AI tool [PLANNED]
│       └── README.md               ← Phase 3
│
├── packages/
│   └── ui/                         # Shared React components [ACTIVE]
│       └── README.md               ← Phase 3
│
├── services/
│   └── website-api/                # Backend API [ACTIVE]
│       └── README.md               ← Phase 3
│
├── docs/
│   ├── ARCHITECTURE.md             ✓ done
│   ├── RESTRUCTURE_PLAN.md         ✓ this file
│   ├── DEPLOYMENT.md               ← Phase 2 (rename github-vercel-setup.md)
│   ├── design/
│   │   ├── components-inventory.md ← Phase 1 (move from root)
│   │   ├── design-tokens.md        ← Phase 1 (move maketokens.md)
│   │   └── figma-workflow.md       ← Phase 1 (move figma-implementation-plan.md)
│   └── history/
│       └── phase-implementation-notes.md ← Phase 1 (archive port-26-portfolio-upgrade...)
│
├── scripts/
│   └── mirror-framer.sh
│
├── .editorconfig                   ← Phase 4
├── .gitignore                      ← Phase 1 update
├── .env.example
├── .npmrc                          ← Phase 4
├── CONTRIBUTING.md                 ✓ done
├── LICENSE                         ← Phase 2
├── README.md                       ← Phase 2 (rewrite)
├── package.json
└── tsconfig.base.json
```

---

## Phase 1: Root cleanup (30 minutes)

These are file moves and config fixes. Low risk.

### 1.1 Move stray docs off the root

```bash
mkdir -p docs/design docs/history

# Move planning docs
mv components-inventory.md docs/design/
mv figma-implementation-plan.md docs/design/figma-workflow.md
mv maketokens.md docs/design/design-tokens.md
mv port-26-portfolio-upgrade-implementation-plan.md docs/history/phase-implementation-notes.md
```

### 1.2 Update `.gitignore`

Add these lines:

```gitignore
# macOS
**/.DS_Store

# Editor directories
.idea/
*.swp
*.swo

# Local planning notes (not for version control)
Source dump/
```

The current `.gitignore` already has `Source dump/` but not the recursive `.DS_Store` pattern.

### 1.3 Remove committed `.DS_Store` files

```bash
git rm --cached **/.DS_Store
git rm --cached packages/ui/src/.DS_Store
```

### 1.4 Decide: npm or pnpm?

**Recommendation: commit to npm** (already used at root; simpler for a portfolio monorepo).

```bash
# Delete the conflicting lockfile
rm apps/website/pnpm-lock.yaml

# Regenerate from root
npm install
```

If you prefer pnpm:
```bash
# At root: delete npm lockfile, add pnpm workspace config
rm package-lock.json
# Create pnpm-workspace.yaml (see Phase 4.2)
corepack enable
pnpm install
# Update CI to use pnpm
```

---

## Phase 2: Root documentation (1–2 hours)

### 2.1 Rewrite `README.md`

The current README is functional but sparse. Rewrite it to:
- Lead with what the project IS and who it's for
- Show the monorepo structure as an ASCII diagram
- Table of apps with status badges
- Clear getting started section
- Link to `docs/ARCHITECTURE.md` for depth

Template is provided at the end of this document.

### 2.2 Add `LICENSE`

For a public portfolio project, MIT is the standard choice:

```bash
# Create LICENSE file with current year and your name
# Content: MIT License — see https://choosealicense.com/licenses/mit/
```

### 2.3 Rename/consolidate `docs/`

```bash
# Rename the deployment guide to something clearer
mv docs/github-vercel-setup.md docs/DEPLOYMENT.md

# The framer-porting-workflow.md and migration-checklist.md can stay as-is
# or be moved into docs/history/ since the migration is complete
```

---

## Phase 3: Per-app READMEs (1 hour)

Each workspace needs a short `README.md` so someone can understand it in isolation.

### `apps/website/README.md`
Should cover: what it is, local dev command, key directories, how to update content, how to add a case study, deployment.

### `apps/webapp/README.md`
Current status: planned/placeholder. Should say so explicitly with what it will become.

### `apps/ai-tool/README.md`
Current status: planned. Should say so with notes on the planned AI proxy architecture.

### `packages/ui/README.md`
Should cover: what components exist, how to use them (import path, quick examples), how to add new ones.

### `services/website-api/README.md`
Should cover: what it does (health check + runtime content), local dev, environment variables, deployment.

---

## Phase 4: Developer tooling (30 minutes)

### 4.1 Add `.editorconfig`

Ensures consistent formatting across editors before ESLint runs:

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### 4.2 Add `.npmrc` (if staying with npm)

```ini
engine-strict=true
save-exact=false
```

`engine-strict=true` enforces the `engines.node` field in `package.json`, preventing installs on incompatible Node versions.

### 4.3 (Optional) Add shared ESLint config package

If you want consistent linting rules across all apps, create `packages/eslint-config/`:

```
packages/eslint-config/
├── index.js       # Shared base rules
├── next.js        # Next.js specific rules
└── package.json   # name: "@packages/eslint-config"
```

This is optional for a portfolio monorepo but recommended if `apps/webapp` and `apps/ai-tool` grow.

---

## Phase 5: GitHub polish (30 minutes)

### 5.1 Issue templates

Create `.github/ISSUE_TEMPLATE/`:

**`bug_report.yml`** — for tracking visual bugs, build failures, or broken links

**`feature_request.yml`** — for suggesting new sections, case studies, or features

### 5.2 Repository settings (done manually on GitHub)

After pushing:
- **Description**: "Monorepo for Rishabh Choudhary's portfolio platform — website, web app, AI tool, and shared design system"
- **Topics/tags**: `nextjs`, `typescript`, `tailwind`, `portfolio`, `design`, `monorepo`, `gsap`
- **Website**: link to the live portfolio
- **Social preview image**: screenshot of the portfolio homepage
- **Branch protection on `main`**: require PR reviews + CI passing before merge

---

## Phase 6: Code cleanup (ongoing)

These are code-level improvements unrelated to repo structure.

| Item | File | Action |
|------|------|--------|
| Dead component | `apps/website/components/site-footer.tsx` | Delete (returns `null`) |
| Duplicate routes | `apps/website/app/case-study/` | These are intentional redirect pages — keep as-is but add a comment |
| Hidden coupon page | `apps/website/app/therapist-coupon-ops-b7k3m9/` | Do not delete or document publicly |

---

## README.md template

Replace the current `README.md` with this structure:

```markdown
# Rishabh Portfolio Platform

> Design portfolio for Rishabh Choudhary — product designer specialising in B2B enterprise tools.

**Live site**: https://port-26-website.vercel.app

---

## Monorepo overview

\```
.
├── apps/
│   ├── website/        # Portfolio website [active]
│   ├── webapp/         # Web app shell [planned]
│   └── ai-tool/        # AI tool with server-side API proxy [planned]
├── packages/
│   └── ui/             # Shared React UI primitives
├── services/
│   └── website-api/    # Lightweight backend API
└── docs/               # Architecture, deployment, and design docs
\```

| Workspace | Status | Port |
|-----------|--------|------|
| `apps/website` | ✅ Active | 3000 |
| `apps/webapp` | 🔧 Planned | 3002 |
| `apps/ai-tool` | 🔧 Planned | 3003 |
| `services/website-api` | ✅ Active | 3001 |
| `packages/ui` | ✅ Active | — |

---

## Quick start

\`\`\`bash
npm install
npm run dev:website   # → http://localhost:3000
\`\`\`

Requires Node ≥ 20.10. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full setup guide.

---

## Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the codebase is structured |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Setup, conventions, and PR guidelines |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel deployment setup |

---

## Deployment

Each app/service is an independent Vercel project. Deploy order matters:

1. `services/website-api` (get its URL first)
2. `apps/website` (set `WEBSITE_API_BASE_URL` to step 1's URL)
3. `apps/webapp`
4. `apps/ai-tool` (optional, later)

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full setup guide.

---

## License

MIT — see [LICENSE](LICENSE).
```

---

## Execution order

For a clean GitHub publish, execute in this order:

1. **Phase 1** — cleanup + lockfile decision (do first, lowest risk)
2. **Phase 2** — README + LICENSE (do before pushing publicly)
3. **Phase 3** — per-app READMEs (can be done after initial push)
4. **Phase 5** — GitHub settings (after push)
5. **Phase 4** — tooling (nice to have, do when you have time)
6. **Phase 6** — code cleanup (ongoing, doesn't block publishing)
