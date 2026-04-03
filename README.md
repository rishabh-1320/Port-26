# Ravish Portfolio Platform

Monorepo for three products, in priority order:

1. `apps/website` - Main public website (first priority)
2. `apps/webapp` - Secondary web app shell
3. `apps/ai-tool` - AI tool with secure server-side API proxy

Separate backend service:

- `services/website-api` - lightweight API for website runtime content and health checks

Shared package:

- `packages/ui` - shared React UI primitives and tokens

## Quick start

```bash
npm install
npm run dev:website
```

## Deployment model (Vercel)

Create separate Vercel projects with these root directories:

- `apps/website`
- `services/website-api`
- `apps/webapp`
- `apps/ai-tool` (optional, later)

Set `WEBSITE_API_BASE_URL` in `apps/website` to the deployed URL of `services/website-api`.

## Docs

- [Migration checklist](docs/migration-checklist.md)
- [GitHub + Vercel setup](docs/github-vercel-setup.md)
- [Framer porting workflow](docs/framer-porting-workflow.md)
