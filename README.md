# ABAP Mentor OS

Premium mobile-first SAP ABAP + S/4HANA interview preparation platform built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Zustand, TanStack Query, shadcn-style Radix UI primitives, Prisma, PostgreSQL, OpenAI, Jest, RTL, and Playwright.

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

Open `http://localhost:3000`.

## Database

Set `DATABASE_URL` in `.env`, then run:

```bash
npm run prisma:migrate
npm run prisma:seed
```

The UI runs from bundled generated seed content even before Postgres is connected. Prisma schema includes chapters, questions, answers, followups, interview logs, bookmarks, progress, notes, scores, and revision tracking.

## AI Interviewer

Set:

```bash
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4.1-mini"
```

Without a key, the app returns a local deterministic evaluator so the platform remains usable.

## Testing

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Deployment

Deploy to Vercel with `DATABASE_URL`, `OPENAI_API_KEY`, and `OPENAI_MODEL` configured. Run Prisma migrations against your production PostgreSQL database before seeding production content.

## Production Notes

- Replace local-first Zustand persistence with authenticated user sessions for multi-device sync.
- Move OpenAI interview logs to Prisma once auth is connected.
- Add rate limits to `/api/interview`.
- Use Vercel Postgres, Neon, Supabase, or RDS for PostgreSQL.
- Keep the generated content model and seed script as the source of truth for importing any real user-provided question list.
