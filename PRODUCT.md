# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two roles, both required for the marketplace to function:

- **Companies**: post tech jobs, review incoming bids, and accept/reject them.
- **Providers**: independent freelancers and small agencies/teams, browsing open jobs and submitting bids. Both individuals and small teams are first-class, not just solo freelancers.

## Product Purpose

Docket ("tech work, bid for it") is a tech-only job marketplace: companies post tech jobs, providers bid, companies accept a bid, and the job moves to in-progress. Success is a completed hire loop (post → bid → accept) without generalist-marketplace noise.

## Positioning

Tech-only focus, deliberately narrower than broad freelance marketplaces (Upwork, Fiverr, Toptal) that mix unrelated gig categories in with tech work. The mechanism competitors can't casually copy is category focus, not price or fee structure — no take-rate/payment model exists yet (see Capabilities and Constraints).

## Operating Context

- Core loop: post a job → browse open jobs → submit a bid → company accepts/rejects → job status becomes "in progress".
- Every page touching user data is a Client Component talking to Supabase directly from the browser; there is no separate backend API. Row Level Security on each table (not key secrecy) is what keeps data scoped to its owner.
- Built on Next.js 16 (App Router) and Supabase (Postgres, Auth). Next.js 16 changed several App Router conventions from most training data/tutorials (e.g. `params` is always a `Promise`, even in Client Components) — `node_modules/next/dist/docs/` is the current source of truth, not general knowledge of Next.js.

## Capabilities and Constraints

- Built: email/password sign-up with a company/provider role choice; job posting; browsing open jobs; bidding; accept/reject; dashboard ("your jobs" / "your bids" by role).
- Database tables exist with RLS policies applied for `profiles`, `jobs`, `bids`, `messages`, `reviews`.
- Not yet built: messaging UI (table/policies exist, no UI), reviews UI (table/policies exist, no UI), payments/escrow (intentionally deferred until the free flow is validated with real people — likely Stripe Connect).
- No monetization/take-rate model exists yet — undecided, not an oversight.

## Evidence on Hand

None. Pre-launch: no real users, testimonials, case studies, or press exist yet. Future work must not fabricate any of these.

## Product Principles

1. Tech-only scope is the differentiator — do not dilute into general gig-work categories.
2. Serve both solo freelancers and small agency/team providers equally; don't design only for one.
3. Ship the free post → bid → accept loop solidly before layering on messaging, reviews, or payments.
4. RLS enforces data boundaries at the database layer — the UI should not be the only thing standing between a user and someone else's data.
