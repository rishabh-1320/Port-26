# GitHub + Vercel Setup

## 1) Push to GitHub

```bash
git init
git add .
git commit -m "chore: initial migration scaffold"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 2) Import to Vercel (one project per root)

Create projects with these root directories:

- `apps/website`
- `services/website-api`
- `apps/webapp`
- `apps/ai-tool` (later)

Set production branch to `main` in each project.

## 3) Environment variables

### Website project

- `WEBSITE_API_BASE_URL=https://<website-api-project>.vercel.app`

### AI Tool project

- `OPENAI_API_KEY=<your-key>`
- `OPENAI_MODEL=gpt-5-mini`
- `AI_RATE_LIMIT_WINDOW_MS=60000`
- `AI_RATE_LIMIT_MAX=20`

## 4) Deploy order

1. `services/website-api`
2. `apps/website`
3. `apps/webapp`
4. `apps/ai-tool` (optional)

## 5) Verify deployments

- API: `https://<api>.vercel.app/health`
- Website: homepage loads and route links work
- Web app: shell loads
- AI tool: `/api/ai/chat` responds with key configured
