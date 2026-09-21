---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app"]
---

# Docket — app-wide surface brief (Field Print)

Scope: whole product. Landing = Persuade; auth, jobs, job detail, post, dashboard = Operate.
Audience: companies (non-technical buyers spending real money) and providers (technical, scanning fast).
Proof on hand: none. Landing may show one clearly labelled example job; no invented logos, stats, testimonials.
Constraints: visual/markup pass only; Supabase queries, auth flow, routes, lib/types, lib/supabase untouched.
Direction chosen by the user from three written concepts (Field Print over Signal Room and Chartered).

## Direction contract

THESIS: Every job is a spec drawing. A job reads like an engineering sheet: scope in the drawing field, a title block holding its number and state, and the budget drawn as a dimension line that quotes get plotted against. Refuses the SaaS hero-plus-card-grid and the uniform rounded shadow card.

OWN-WORLD: Blueline print — cool white sheet stock on a faint engineering-grid ground; blueprint blue (#1A4E9E) for linework, links and the primary action; near-black blue ink for text; drafter's redline (#B7331C) for errors, declines and over-budget marks. Square corners, 1px rules, sheet frames with a heavier inner border. State is a legend symbol (open ring, half-filled, filled, cross) plus its word. Chivo for all text, with tabular figures for money and dates; Chivo Mono only for sheet numbers (identifiers). Amended during build: mono comma spacing split amounts, and mono on money read as costume per the craft floor. Sentence case throughout.

STORY: A buyer sees a job drawn up like a professional spec and understands: describe the work, set a range, quotes land on your budget line, pick one. A provider sees a drawing register they can scan for category, budget and age.

FIRST VIEWPORT: Left: headline, one paragraph, "Post a job" (blue) and "Find work". Right: an example spec sheet (labelled Example) with title block, scope, and the budget dimension line with three quote markers plotted on it; annotation leaders explain the parts on wide screens. One motion moment: the dimension line draws and the markers settle.

FORM: Blueline engineering drawing / spec sheet. User-selected from three presented directions (no concept roll; brief-pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
