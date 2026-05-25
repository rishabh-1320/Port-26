# services/website-api

Lightweight Next.js API for the portfolio website. Provides a health-check endpoint and runtime content delivery.

**Status**: Active  
**Dev port**: 3001

---

## Local development

Run from the **repo root**:

```bash
npm run dev:website-api  # → http://localhost:3001
```

Verify it's running:
```bash
curl http://localhost:3001/health
# → {"status":"ok"}
```

---

## Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/health` | GET | Health check — returns `{"status":"ok"}` |

---

## Environment variables

None required for local development.

For production, set in the Vercel project dashboard.

---

## Deployment

Deployed as a standalone Vercel project with root directory `services/website-api`.  
Deploy this **before** `apps/website` — its production URL is required by the website as `WEBSITE_API_BASE_URL`.

See [`docs/github-vercel-setup.md`](../../docs/github-vercel-setup.md) for full deployment instructions.
