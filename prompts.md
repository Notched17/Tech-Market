# Docket redesign prompts

Two alternative visual directions for Docket, sketched alongside **Field Print**
(built on the `UI_Overhaul_2` branch). Each prompt below is self-contained: paste
it into a fresh Claude Code session at the project root to build that direction
on its own branch off `main`, so the three can be compared side by side.

---

## Prompt A — Signal Room (ops console)

```text
Context:
This is "Docket," a two-sided marketplace (like AirTasker/Upwork, but for
B2B tech services — website builds, IT help desk, networking, databases,
custom app development). Companies post jobs; tech providers bid on them.

Stack: Next.js 16 (App Router, TypeScript), Tailwind v4 (CSS-based theme
in app/globals.css — there's no tailwind.config file), Supabase
(Postgres + Auth), with a browser-only Supabase client (no server
components handling auth).

Pages: app/page.tsx (landing), app/login, app/signup, app/jobs (browse
open jobs), app/jobs/new (post a job), app/jobs/[id] (job detail +
bidding + accept/reject), app/dashboard (role-based "your jobs"/"your
bids"). Shared code: components/NavBar.tsx, lib/useProfile.ts,
lib/types.ts, lib/supabase/.

Skills:
Before writing any code, load and follow all three skills: frontend-design,
ui/ux-pro-max, and impeccable. Treat their design-token, typography,
layout, and craft guidance as authoritative over your own defaults or
training-data habits. The direction below is already chosen — treat it as
a pinned brief (skip any concept roll or direction-picking round), but
still apply the skills' craft floor, accessibility checks and finish review.

Direction — "Signal Room" (the deliberate creative risk):
- Personality: a live network-operations / trading-floor board. Fast,
  glanceable, dense, unmistakably technical. It speaks directly to
  providers, and bets that looking like serious operators earns more
  trust from buyers than looking friendly.
- Colour: deep ink-navy ground (not pure black — around #0A0E1A to
  #0F1524), cool off-white text, and ONE phosphor-amber accent (old
  telecom/avionics panel amber, not hacker green, not neon) reserved for
  live and actionable states. Status colours for open / in progress /
  accepted / declined must pass WCAG AA on the dark ground and always
  pair with a shape or word, never colour alone.
- Type: a technical sans for headlines and body (not Inter, not Space
  Grotesk, not IBM Plex), with tabular figures everywhere numbers appear.
  Monospace only for true data (IDs, amounts, timestamps) — never as a
  "hacker" costume for prose.
- Signature device: every list (open jobs, quotes on a job, dashboard
  rows) works like a live ops board — fixed columns, a status light per
  row drawn as a real indicator (not just coloured text), amounts aligned
  on tabular figures. The landing page opens on a dramatised feed of jobs
  arriving on the board, clearly labelled as an example (no real activity
  exists yet), not a static hero.
- Risk to manage: it can intimidate a non-technical buyer. Mitigate by
  keeping buyer-facing copy plain and warm, giving "post a job" and
  "accept a quote" more space and guidance, and reserving the densest
  console treatment for provider-facing screens (open jobs, provider
  dashboard). Motion: one orchestrated moment (the landing feed), and
  respect prefers-reduced-motion.
- Avoid: glowing edges, scanline gimmicks, gradient text, glassmorphism,
  uniform rounded shadow cards, and the generic "near-black + neon" look.

Scope — redesign all of:
1. app/page.tsx — landing/marketing page
2. app/login/page.tsx and app/signup/page.tsx — auth forms
3. app/jobs/page.tsx — job browsing/list view
4. app/jobs/new/page.tsx — post-a-job form
5. app/jobs/[id]/page.tsx — job detail, bid form, bid list, accept/reject
6. app/dashboard/page.tsx — role-based dashboard
7. components/NavBar.tsx
8. app/globals.css — the full design-token system and shared component
   classes (.field, .btn-primary, .btn-quiet, etc.)

Feel free to extract new shared components (Button, Badge, StatusLight,
EmptyState, etc.) into components/ — plain React/Tailwind only, no new
UI libraries unless a skill specifically calls for one.

Content rules: there are no real users, testimonials, logos or stats yet
(see PRODUCT.md). Any demonstration content must be clearly labelled as
an example. Don't invent commercial claims (pricing, fees, "free").

Hard constraints — do not change:
- Any Supabase query logic, table/column names, or the RLS-dependent
  data-fetching pattern in each page
- The auth flow (email/password via supabase.auth), the role-selection
  logic in signup, or lib/useProfile.ts's behavior
- Route paths and file locations — this is a visual/markup/styling
  pass, not a functional rewrite
- lib/types.ts, lib/supabase/client.ts, lib/supabase/database.types.ts,
  .env.local

If a design idea would require a functional change (a new field, a new
page, a filter, a confirmation step), stop and flag it instead of making
it unilaterally.

Git workflow:
1. Branch off main (not off any other branch) — create a new branch
   named exactly UI_Overhaul_Signal_Room and switch to it before making
   any changes.
2. Make all commits on that branch only — never commit to main/master.
3. Commit in logical chunks (e.g. "design tokens", "landing + nav",
   "auth pages", "jobs browse + detail", "dashboard") with clear
   messages.
4. Do not push or open a pull request — leave the branch local for me
   to review.

Before finishing:
- Run `npx tsc --noEmit`, `npx eslint .`, and `npx next build`, and fix
  anything that breaks. (If `PageProps`/`LayoutProps` are missing, run
  `npx next typegen` first.)
- Screenshot every page at desktop (1440) and mobile (390) widths and
  fix what you find before handing back.
- Give me a short summary per page, the palette/type choices, and
  anything you held back as a functional change rather than a visual one.
```

---

## Prompt B — Chartered (tender / contract document)

```text
Context:
This is "Docket," a two-sided marketplace (like AirTasker/Upwork, but for
B2B tech services — website builds, IT help desk, networking, databases,
custom app development). Companies post jobs; tech providers bid on them.

Stack: Next.js 16 (App Router, TypeScript), Tailwind v4 (CSS-based theme
in app/globals.css — there's no tailwind.config file), Supabase
(Postgres + Auth), with a browser-only Supabase client (no server
components handling auth).

Pages: app/page.tsx (landing), app/login, app/signup, app/jobs (browse
open jobs), app/jobs/new (post a job), app/jobs/[id] (job detail +
bidding + accept/reject), app/dashboard (role-based "your jobs"/"your
bids"). Shared code: components/NavBar.tsx, lib/useProfile.ts,
lib/types.ts, lib/supabase/.

Skills:
Before writing any code, load and follow all three skills: frontend-design,
ui/ux-pro-max, and impeccable. Treat their design-token, typography,
layout, and craft guidance as authoritative over your own defaults or
training-data habits. The direction below is already chosen — treat it as
a pinned brief (skip any concept roll or direction-picking round), but
still apply the skills' craft floor, accessibility checks and finish review.

Direction — "Chartered":
- Personality: official, accountable, bonded — the feel of a notarised
  contract or a government tender. This is a real commitment, not a gig
  app. It exists to reassure a non-technical buyer who is handing over
  money and a vendor decision, while staying scannable for providers.
- Colour: crisp white / very light cool-grey paper (NOT cream, NOT
  parchment, NOT warm off-white), near-black ink for text, and a single
  "authority" blue — notary / ministry blue, not cheerful SaaS blue —
  used only for seals, signatures and the one primary action per screen.
  A restrained red is allowed for declines and errors. No gradients.
- Type: a formal serif for headings — institutional, not literary or
  romantic; no italic accents — paired with a plain grotesque for body
  text, forms and data, with tabular figures for money. Avoid the
  overused defaults (Playfair, Fraunces, Cormorant, Lora, Newsreader,
  Inter, IBM Plex, Space Grotesk).
- Signature devices:
  1. Every job is a numbered "instrument" laid out in clauses —
     1. Scope, 2. Budget, 3. Posted by / category — because a contract
     genuinely is sequential (numbering is earned here, not decorative).
  2. Accepting a bid is shown as countersigning: the chosen quote gains a
     signature line and an impressed seal/stamp, rather than just a
     button changing colour. (This is presentation only — the same
     accept/reject calls happen underneath.)
  3. The owner's bid list reads like reviewing tender submissions side by
     side against the instrument's budget clause.
- Avoid: the broadsheet/editorial cliché (hairline-everything, italic
  display serif, dense newspaper columns), uniform rounded shadow cards,
  and warm cream + serif + terracotta. One quiet orchestrated moment at
  most (e.g. the seal pressing in on accept), respecting reduced motion.

Scope — redesign all of:
1. app/page.tsx — landing/marketing page
2. app/login/page.tsx and app/signup/page.tsx — auth forms
3. app/jobs/page.tsx — job browsing/list view
4. app/jobs/new/page.tsx — post-a-job form
5. app/jobs/[id]/page.tsx — job detail, bid form, bid list, accept/reject
6. app/dashboard/page.tsx — role-based dashboard
7. components/NavBar.tsx
8. app/globals.css — the full design-token system and shared component
   classes (.field, .btn-primary, .btn-quiet, etc.)

Feel free to extract new shared components (Button, Seal, Clause,
EmptyState, etc.) into components/ — plain React/Tailwind only, no new
UI libraries unless a skill specifically calls for one.

Content rules: there are no real users, testimonials, logos or stats yet
(see PRODUCT.md). Any demonstration content must be clearly labelled as
an example. Don't invent commercial claims (pricing, fees, escrow,
guarantees, "free") — payments and escrow don't exist yet, so the
contract metaphor must not imply legal or financial protection the
product doesn't provide.

Hard constraints — do not change:
- Any Supabase query logic, table/column names, or the RLS-dependent
  data-fetching pattern in each page
- The auth flow (email/password via supabase.auth), the role-selection
  logic in signup, or lib/useProfile.ts's behavior
- Route paths and file locations — this is a visual/markup/styling
  pass, not a functional rewrite
- lib/types.ts, lib/supabase/client.ts, lib/supabase/database.types.ts,
  .env.local

If a design idea would require a functional change (a new field, a new
page, a signature capture, a confirmation step), stop and flag it instead
of making it unilaterally.

Git workflow:
1. Branch off main (not off any other branch) — create a new branch
   named exactly UI_Overhaul_Chartered and switch to it before making
   any changes.
2. Make all commits on that branch only — never commit to main/master.
3. Commit in logical chunks (e.g. "design tokens", "landing + nav",
   "auth pages", "jobs browse + detail", "dashboard") with clear
   messages.
4. Do not push or open a pull request — leave the branch local for me
   to review.

Before finishing:
- Run `npx tsc --noEmit`, `npx eslint .`, and `npx next build`, and fix
  anything that breaks. (If `PageProps`/`LayoutProps` are missing, run
  `npx next typegen` first.)
- Screenshot every page at desktop (1440) and mobile (390) widths and
  fix what you find before handing back.
- Give me a short summary per page, the palette/type choices, and
  anything you held back as a functional change rather than a visual one.
```
