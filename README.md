# Rishabh Portfolio Platform

> Design portfolio for Rishabh Choudhary — product designer specialising in B2B enterprise tools.

**Live site**: https://port-26-website.vercel.app

---

## Monorepo overview

```
.
├── apps/
│   ├── website/        # Portfolio website [active]
│   ├── webapp/         # Web app shell [planned]
│   └── ai-tool/        # AI tool with server-side API proxy [planned]
├── packages/
│   └── ui/             # Shared React UI primitives (Heading, Text, Button, Card, …)
├── services/
│   └── website-api/    # Lightweight health-check and runtime content API
└── docs/               # Architecture, deployment, and design docs
```

### Website component layers

The `apps/website` codebase follows atomic-design conventions:

| Layer | Location | Examples |
|-------|----------|----------|
| **Tokens** | `apps/website/app/globals.css` + `tailwind.config.ts` | Type scale (`text-h1` … `text-h4`), shadow scale (`shadow-card-rest` …), color & motion tokens |
| **Atoms** | `packages/ui/src/primitives/` | `Heading`, `Text`, `Eyebrow`, `Badge`, `Divider`, `Button`, `Card`, `InlineCode` |
| **Layout primitives** | `packages/ui/src/layout/` | `Container`, `Section` |
| **Case-study molecules** | `apps/website/components/case-study/` | `HeroCard`, `CaseSection`, `SubCard`, `InfoBlock`, `MetricCard`, `CaseFigurePlaceholder`, `ScrollSpyToc`, `CaseStudyNav`, `CaseStudyFooter` |
| **Homepage sections** | `apps/website/components/home/` | `HeroSection`, `IdeologySection`, `WorksSection`, `AiWorkflowSection`, `AiExplorationsSection`, `AboutSection`, `FooterSection` |
| **Behavior wrappers** | `apps/website/components/` | `GsapReveal`, `MagneticButton`, `SplitTextReveal`, `ScrollProgressBar`, `HeroShaderCanvas`, `HeroMockupWrapper` |

See [CHANGELOG.md](CHANGELOG.md) for recent visual and structural changes.

| Workspace | Status | Dev port | Description |
|-----------|--------|----------|-------------|
| `apps/website` | ✅ Active | 3000 | Main public portfolio site |
| `apps/webapp` | 🔧 Planned | 3002 | Secondary web application |
| `apps/ai-tool` | 🔧 Planned | 3003 | AI tool with secure server-side proxy |
| `services/website-api` | ✅ Active | 3001 | Runtime content and health-check API |
| `packages/ui` | ✅ Active | — | Shared React component primitives |

---

## Quick start

Requires Node ≥ 20.10 and npm ≥ 10.

```bash
# Install all workspace dependencies from the root
npm install

# Start the portfolio website
npm run dev:website
# → http://localhost:3000
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full setup guide and code conventions.

---

## All dev commands

Run from the **repo root**:

```bash
npm run dev:website       # Portfolio site         → :3000
npm run dev:website-api   # Backend API            → :3001
npm run dev:webapp        # Web app shell          → :3002
npm run dev:ai-tool       # AI tool                → :3003

npm run typecheck         # TypeScript check (all workspaces)
npm run build             # Production build (all workspaces)
npm run lint              # ESLint (all workspaces)
```

---

## Documentation

| Document | What it covers |
|----------|----------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the codebase is structured — start here |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Setup, conventions, branching, and PR checklist |
| [docs/github-vercel-setup.md](docs/github-vercel-setup.md) | Vercel deployment guide |
| [docs/RESTRUCTURE_PLAN.md](docs/RESTRUCTURE_PLAN.md) | Repo organisation roadmap |

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Animation | GSAP 3 (scroll-triggered) |
| Package manager | npm workspaces |
| CI | GitHub Actions |
| Hosting | Vercel (per-app projects) |

---

## Deployment

Each app/service is an **independent Vercel project**. Deploy order matters:

1. `services/website-api` — deploy first; copy its production URL
2. `apps/website` — set `WEBSITE_API_BASE_URL` env var to the URL from step 1
3. `apps/webapp`
4. `apps/ai-tool` (optional, phase 3)

Verify after deploying:
- API health: `https://<website-api>.vercel.app/health`
- Website: `https://<website>.vercel.app`

See [docs/github-vercel-setup.md](docs/github-vercel-setup.md) for step-by-step instructions.

---

## License

MIT — see [LICENSE](LICENSE).
