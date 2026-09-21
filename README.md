# Docket — tech job marketplace (starter)

A working MVP: companies post tech jobs, providers bid on them, companies
accept a bid. Built on Next.js 16 (App Router) + Supabase (Postgres, Auth).

## What's already wired up

- **Database**: the `tech-marketplace` Supabase project, with tables for
  `profiles`, `jobs`, `bids`, `messages`, `reviews`, and Row Level Security
  policies already applied (`messages`/`reviews` have tables + policies but
  no UI yet — see "Not built yet" below).
- **Auth**: email/password sign-up with a company/provider role choice.
- **Core loop**: post a job → browse open jobs → submit a bid → company
  accepts/rejects → job moves to "in progress".
- **`.env.local`** is already filled in with this project's URL and public
  (anon) key — safe to commit to a private repo, since Row Level Security,
  not key secrecy, is what protects the data.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Sign up once as a company and once as a
provider (two different emails) to try the full loop.

> Supabase projects require email confirmation by default. For local
> testing, turn it off in the Supabase dashboard under
> **Authentication → Providers → Email → Confirm email**, or check the
> confirmation email each time you sign up.

## Project structure

```
app/
  page.tsx            landing page
  login/, signup/      auth
  jobs/page.tsx         browse open jobs
  jobs/new/page.tsx     post a job (company only)
  jobs/[id]/page.tsx    job detail, bidding, accept/reject
  dashboard/page.tsx    "your jobs" or "your bids", by role
lib/
  supabase/client.ts    browser Supabase client
  useProfile.ts         auth session + profile row, as a hook
  types.ts              TypeScript types matching the DB schema
```

Every page that touches user data is a Client Component talking to Supabase
directly from the browser — there's no separate backend API. Row Level
Security on each table is what keeps people from reading or writing data
that isn't theirs, so it's enforced no matter who's asking.

## Not built yet

- **Messaging** — the `messages` table and its RLS policies exist, but
  there's no UI for it on the job detail page yet.
- **Reviews** — same story: table and policies exist, no UI.
- **Payments/escrow** — intentionally last. Add Stripe Connect once the
  free flow above has been tested with real people.

## Deploying

This app is small enough for Vercel's free Hobby tier while you're
building and testing privately. Vercel's terms mark Hobby as non-commercial
— move to Pro ($20/mo) once this is live for real customers. Set the two
environment variables from `.env.local` in the Vercel project settings
before deploying.

## A note on the framework version

This project uses **Next.js 16**, which changed some App Router
conventions from what most tutorials online still show (e.g. `params` in
a page component is always a `Promise`, even in Client Components — see
`app/jobs/[id]/page.tsx` for the pattern). If something you find online
doesn't quite match what's in this repo, that's usually why — the local
docs at `node_modules/next/dist/docs/` are the current source of truth.
