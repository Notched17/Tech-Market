---
name: Docket
description: Tech work, quoted and accepted. Every job is a numbered work-order ticket.
colors:
  desk: "#e8eaf0"
  stock: "#fbfbf9"
  ink: "#1c2566"
  ink-2: "#4a5183"
  rule: "#cdd1e2"
  rule-strong: "#767ea9"
  canary: "#f4d54a"
  canary-deep: "#e6c21c"
  wash: "#fbf1c0"
  stamp-open: "#1d6a46"
  stamp-progress: "#855400"
  stamp-void: "#a12e28"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 4.2vw + 1.4rem, 5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 68"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 75"
  figure:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 80"
rounded:
  hairline: "2px"
  stamp: "3px"
spacing:
  gutter: "1.25rem"
  ticket-x: "1.75rem"
  ticket-y: "1.5rem"
  field-y: "0.625rem"
  field-x: "0.75rem"
  section: "4rem"
  section-lg: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.canary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0.625rem 1.125rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.canary-deep}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    rounded: "{rounded.hairline}"
    padding: "0.625rem 1.125rem"
    height: "2.75rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0.625rem 1.125rem"
    height: "2.75rem"
  button-quiet-hover:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
  button-sm:
    padding: "0.375rem 0.875rem"
    height: "2.25rem"
  field:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0.625rem 0.75rem"
    height: "2.75rem"
  ticket:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "1.5rem 1.75rem"
  copy-sheet:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "1.25rem 1.5rem"
  stamp:
    backgroundColor: "transparent"
    typography: "{typography.label}"
    rounded: "{rounded.stamp}"
    padding: "0.1875rem 0.5rem 0.1875rem 0.4375rem"
  nav:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink-2}"
    height: "4rem"
---

# Design System: Docket

## Overview

**Creative North Star: "The Work-Order Docket"**

Every job is a numbered work-order ticket printed on bright form stock and laid on a cool blue-grey desk. The ticket carries a stub with its number and state, a perforated tear line, and ruled fields where a printed label sits over the value someone wrote in. Quotes arrive as canary carbon copies stacked beneath the ticket. State is a rubber stamp: a word inside a double-ruled border, set slightly askew. The whole product, landing page and working screens alike, speaks this one office-stationery language.

Density follows the role. The browse and dashboard screens are ruled registers built for scanning category, budget and age; the job ticket and its quotes give more air to reading. Colour is carbon ink on paper. Contrast comes from ink strength, not from greys: secondary text is the same carbon blue at lower strength, and every rule and border is tinted toward the ink. Canary is the one committed field: the primary action, the quotes, the text selection, the closing band.

It refuses the SaaS hero-plus-three-cards arrangement and the rounded, shadowed card grid. Corners are nearly square, borders are hairlines, and depth reads as paper lying on a desk, not as floating cards.

**Key Characteristics:**
- Form-white stock on a cool desk, carbon-blue ink, canary copy sheets.
- One family (Archivo) in two voices: condensed for printed labels and headings, normal width for written values.
- Ticket stub, perforated tear line, ruled fields, stamped state.
- Money and ticket numbers always in tabular figures.
- Hairline borders and 2px corners throughout.

## Colors

A carbon-copy office palette: one blue ink on paper, one canary sheet, and three stamp inks that only ever appear as marked words.

### Primary
- **Carbon Ink** (ink): all headings, body text, rules at full strength, the focus outline, and the solid firm-commit button. The desk, the paper and the canary are all read against it.

### Secondary
- **Canary Copy Sheet** (canary): the primary action button, the active-nav underline, text selection, the skip link, and the full-bleed closing band. **Canary Deep** (canary-deep) is its pressed or hovered state only.
- **Carbon Wash** (wash): the pale canary of a carbon copy. Quote sheets, the quote form, inline status notices, and the hover/focus highlight of a register row.

### Tertiary
- **Stamp Green** (stamp-open): Open and Accepted stamps; the 2px inset ring on an accepted quote; the "within budget" verdict.
- **Stamp Goldenrod** (stamp-progress): In progress stamp; the "under the minimum" verdict.
- **Stamp Red** (stamp-void): Cancelled and Declined stamps; invalid field borders; error text and its rule.

### Neutral
- **Form Stock** (stock): tickets, the nav bar, register tables, fields, and full-width stock bands on the landing page.
- **Desk** (desk): the page ground behind every ticket; also punched through the perforation holes.
- **Faded Ink** (ink-2): secondary text, form labels, placeholders, ticket numbers, the Pending and Completed stamps.
- **Ruling** (rule): row dividers, dl rules, footer border, skeleton base.
- **Strong Ruling** (rule-strong): ticket, field and quiet-button borders; the perforation dash; the empty-state dashed frame.

### Named Rules
**The No Mid-Grey Rule.** There is no neutral grey. Secondary text is carbon ink at lower strength (ink-2); every border and rule is blue-tinted toward the ink. A new neutral must sit on the ink hue.

**The Canary Commit Rule.** Canary means commitment: the one action that moves a ticket forward, the carbon copies quotes live on, and the marks of where you are (active-nav underline, selection, skip link). At most one full canary field per page. Never a second competing canary button on the same view.

**The Stamp Rule.** Status is a mark, never hue alone: the word, in a stamp border, in its stamp ink. Colour may reinforce a sentence (budget verdicts) but the sentence always carries the meaning.

## Typography

**Display Font:** Archivo (variable width axis), with ui-sans-serif, system-ui fallback
**Body Font:** Archivo at normal width
**Label/Mono Font:** Archivo condensed with tabular numerals; no separate mono

**Character:** One grotesque in two voices. The condensed widths are the pre-printed text on a work order; the normal width is what someone wrote in the field.

### Hierarchy
- **Display** (800, clamp(2.75rem, 4.2vw + 1.4rem, 5rem), 0.95, width 68%): the landing headline and the closing canary band only (the band uses a smaller clamp, 2.25rem to 3.75rem).
- **Headline** (700, 2.25rem rising to 3rem at sm, 1.1, width 75%): page titles and major section heads.
- **Title** (700, 1.5rem to 1.875rem, 1.1, width 75%): ticket titles, empty-state heads; register job titles drop to 1.25rem.
- **Body** (400, 1rem, 1.55): running text; long descriptions capped at 65 to 68ch. Ledes use 1.125rem in ink-2.
- **Label** (600, 0.875rem, 0.01em, width 75%, sentence case): printed field labels, table column heads, the footer mark.
- **Figure** (700, 1.25rem to 1.875rem, width 80%, tabular): quote amounts and budgets. Ticket numbers use label width 75% at 0.04em tracking, prefixed "No.".

### Named Rules
**The Two Voices Rule.** Condensed is printed, normal width is written. Labels and headings are condensed; entered values, names and running text never are.

**The Tabular Money Rule.** Every amount, budget and ticket number sets in tabular figures so registers align by column.

## Layout

A single 72rem (max-w-6xl) container with a 1.25rem gutter carries every page, so the left field-column axis lines up from nav to footer. Composition pages use a 12-column grid with a 2.5rem column gap: the landing splits 5/7 (argument / example ticket), the post-a-job form sits in a 12-column split, and the job detail runs a fluid ticket column beside a fixed 22rem quote sidebar. Auth pages narrow to 28 to 36rem.

Registers (open jobs, dashboard) use fixed-track grids on md and up (ticket no. 5.5rem, flexible title, then fixed category, budget and age tracks, gap 1.5rem) and collapse to a two-column title/amount stack on mobile, reordering fields rather than hiding them. Vertical rhythm: pages open with 2.5 to 3.5rem, landing sections step 4rem to 6rem, ruled list rows are 0.875 to 1.25rem tall padding. Full-bleed bands (stock, canary) break the desk ground between landing sections, each with a strong top and bottom rule.

## Elevation & Depth

Nearly flat, read as paper on a desk. Only the ticket lifts: a 1px rule-coloured edge beneath it plus a long, soft, ink-tinted shadow that falls below. Everything else (copy sheets, registers, fields) lies flat and is separated by hairline borders and tone (stock on desk, wash on stock). Carbon copies stack by overlap, slight rotation and z-order, not by shadow.

### Shadow Vocabulary
- **Ticket lift** (`box-shadow: 0 1px 0 var(--rule), 0 10px 24px -18px rgb(28 37 102 / 0.45)`): tickets only.
- **Focus ring on fields** (`box-shadow: 0 0 0 1px var(--ink), 0 0 0 4px var(--canary)`): ink edge plus a canary halo.
- **Accepted ring** (`box-shadow: inset 0 0 0 2px var(--stamp-open)`): the accepted quote sheet.
- **Stamp double rule** (`box-shadow: inset 0 0 0 1px var(--stock), inset 0 0 0 2px currentColor`): inner line of the stamp border.

### Named Rules
**The Paper On A Desk Rule.** One lifted object per group: the ticket. Sheets beneath it and rows inside it stay flat.

## Shapes

Near-square paper. Tickets, sheets, fields, buttons and tables share a 2px corner; the stamp alone gets 3px. Borders are 1px hairlines in strong ruling; 2px ink rules mark table heads and category lists; dashed rules mean a tear or an unfilled space (the perforation line, the lifecycle track, the empty state). The perforation is a row of desk-coloured punched holes (3px radius every 14px) over a dashed line. Stamps rotate -1deg (large stamps -2deg); fanned copy sheets rotate between -1.6deg and 1.2deg. Circles appear only in the custom radio mark and the punched holes.

## Components

### Buttons
Printed and tactile, pressed down 1px on click.
- **Shape:** near-square (2px), 1px border, 2.75rem minimum height, weight 600.
- **Primary:** canary with an ink border and ink text; the one forward action per view.
- **Ink:** solid carbon with stock text; a firm secondary commit such as accepting a quote, or the action on the canary band.
- **Quiet:** transparent with a strong-ruling border; hover sharpens the border to ink and fills with stock.
- **Small:** 2.25rem height for nav and inline row actions.
- **Hover / Focus:** 150ms colour transitions on ease-out (cubic-bezier(0.16, 1, 0.3, 1)); focus is a 2px ink outline, 2px offset. Disabled drops to 55% opacity.

### Cards / Containers
- **Ticket:** stock, strong-ruling border, 2px corner, ticket lift. Optional stub row (ticket number left, stamp right) then the perforation, then a 1.5rem x 1.75rem body.
- **Copy sheet:** wash, strong-ruling border, flat. Holds quotes, the quote form and inline notices.
- **Register:** stock table with a 2px ink rule under a condensed label header; rows divided by hairlines and washed canary on hover or focus-within, whole row clickable.
- **Empty state:** dashed strong-ruling frame on translucent stock; a title, one sentence saying what happens next, and an optional action.

### Inputs / Fields
- **Style:** stock fill, 1px strong-ruling border, 2px corner, 2.75rem minimum; label above in the label voice with "Optional" at the right; hint below in ink-2.
- **Focus:** border goes to ink with the ink-plus-canary ring.
- **Error:** stamp-red border; error message in stamp red above a 2px stamp-red rule.
- **Affix:** currency fields print a "$" inside the left edge.
- **Select:** custom ink chevron, native appearance removed.

### Navigation
Stock bar, 4rem tall, strong-ruling bottom border, wordmark left (a canary tag-ticket glyph drawn in SVG with ink rules, plus "Docket" in extra-bold at 70% width). Links are medium weight in ink-2, turning ink on hover; the current page is ink with a 3px canary underline. Signed-in state shows name over role in the label voice, then a small quiet Sign out. Below sm the links collapse behind a small quiet "Menu" button into a stock drop panel.

### Stamp (signature)
The status mark. Condensed 700 text at 0.875rem (large: 1.0625rem), 2px border in the stamp ink plus an inner double rule, 3px corner, rotated -1deg (large -2deg). Open and Accepted in green, In progress in goldenrod, Cancelled and Declined in red, Pending and Completed in faded ink. Always the word.

### Budget Scale (signature)
A quote measured against the posted range: a hairline track, the budget band as a light ink fill between 2px ink end-stops, and a 3px ink needle at the quote. A sentence beneath carries the verdict in its stamp ink ("Within budget", "$450 over budget").

## Do's and Don'ts

### Do:
- **Do** put every job on a ticket: stub with "No." plus the six-character id, a stamp, the perforation, then ruled label-over-value fields.
- **Do** set labels and headings condensed and written values at normal width.
- **Do** carry state as a stamp word with its border; use colour only to reinforce.
- **Do** keep amounts, budgets and ticket numbers in tabular figures.
- **Do** use canary for the single forward action and for quote sheets; use the ink button for a second firm commit.
- **Do** separate content with hairline rules in blue-tinted ruling, and keep corners at 2px.
- **Do** honour reduced motion: the copy-sheet fan and all transitions collapse to near-instant.

### Don't:
- **Don't** introduce a neutral grey; secondary tones come from the ink hue.
- **Don't** signal status by colour alone or by a coloured dot or pill.
- **Don't** build the hero-plus-three-cards layout or grids of rounded, shadowed cards.
- **Don't** lift anything other than the ticket; copy sheets and rows stay flat.
- **Don't** round rectangular elements past 3px or use pill shapes for buttons, tags or stamps; circles are reserved for the radio mark and punched holes.
- **Don't** show invented activity, logos, stats or testimonials; illustrative content wears a visible "Example" tag.
