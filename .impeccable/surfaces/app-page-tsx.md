---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app"]
---

# Docket — app-wide surface brief

Scope: whole product (landing = Persuade; auth, jobs, job detail, post, dashboard = Operate).
Audience: companies (non-technical buyers trusting the platform with money and vendor choice) and providers (technical, scanning and acting fast).
Proof on hand: none. Landing may show one clearly labelled *example* job with example bids; no invented logos, stats, testimonials.
Constraints: visual/markup pass only; Supabase queries, auth flow, routes, lib/types, lib/supabase untouched.

## Direction contract

THESIS: Every job is a work-order ticket. The product owns the "docket" — a numbered job ticket that moves through stamped states and collects bids as carbon copies. Refuses the SaaS hero-plus-three-cards arrangement and the rounded shadow-card grid.

OWN-WORLD: Bright form-white stock (#F7F8F6) with a cooler desk ground; carbon-blue ink (#1F2A6B) for text and rules; canary copy-sheet yellow (#F2D14B) as the committed field for bids and primary action; stamp green / goldenrod / red for status, always with the word and a stamp border. No mid-greys; secondary ink is carbon at reduced strength. Hairline ruled fields, a single left field-column axis, perforated tear edges on tickets, ticket number from the job id. Archivo only: condensed widths for printed form labels and headings, normal width for entered values, tabular numerals for money.

STORY: A buyer sees the ticket and understands at once: write the job on a docket, providers quote on carbon copies, you pick one. A provider sees open tickets as a dense, ruled register they can scan for category, budget and age.

FIRST VIEWPORT: Left 5/12: condensed heavy headline "Write the job down. Let tech providers quote for it.", one short paragraph, primary "Post a job" (canary) and "Find work". Right 7/12: an example work-order ticket (No. from a fixed example id, fields filled, "Open" stamp), with three canary carbon-copy quotes fanned beneath it, one marked accepted; labelled "Example".

FORM: Shop work-order / job docket ticket; position 3 of 7 on the ranked list; seed key f2b8de1c. Raises: Riley — no mid-greys, contrast from ink strength; Versailles — one field-column axis across every page; cutting bench — state is a mark (stamp word + border), never hue alone.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
