---
name: Docket
description: Field Print — tech jobs drawn up as blueline spec sheets on an engineering grid.
colors:
  ground: "#eef3f9"
  sheet: "#fbfcfe"
  tint: "#e3ecf7"
  ink: "#12213a"
  ink-2: "#475872"
  blue: "#1a4e9e"
  blue-deep: "#133c7b"
  on-blue: "#ffffff"
  grid: "#d9e4f2"
  rule: "#c3d2e6"
  rule-strong: "#7f93b3"
  paleline: "#a9c1e4"
  redline: "#b7331c"
  redline-wash: "#fbeeeb"
  approved: "#1e6a45"
  hold: "#8a5500"
typography:
  display:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.625rem, 3.6vw + 1.35rem, 4.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
  measure:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    fontFeature: "\"tnum\" 1"
  sheet-number:
    fontFamily: "Chivo Mono, ui-monospace, SF Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "0"
rounded:
  none: "0px"
spacing:
  grid-fine: "8px"
  grid-major: "40px"
  gutter: "20px"
  control-y: "10px"
  control-x: "20px"
  cell: "8px 12px"
  sheet-pad: "28px"
  sheet-pad-wide: "36px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.on-blue}"
  button-quiet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
    height: "44px"
  button-quiet-hover:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.blue}"
  button-danger:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.redline}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
    height: "44px"
  button-danger-hover:
    backgroundColor: "{colors.redline-wash}"
    textColor: "{colors.redline}"
  button-sm:
    padding: "6px 14px"
    height: "36px"
  field:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
    height: "44px"
  sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sheet-pad}"
  title-block-cell:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.cell}"
  register-row-hover:
    backgroundColor: "{colors.tint}"
  state-mark:
    typography: "{typography.label}"
    textColor: "{colors.blue}"
---

# Design System: Docket

## Overview

**Creative North Star: "The Blueline Spec Sheet"**

Every job is an engineering drawing. Pages sit on a faint engineering-grid ground, and the things people act on are drawing sheets: cool white stock framed by a hairline and an inner border, with a ruled title block in the corner holding the sheet number, category and state. The budget is drawn as a dimension line with extension lines and arrowheads, and quotes are plotted against it as markers. Lists are drawing registers: a heavy ink header rule, hairline row dividers, a whole-row link.

The world is drafted, not decorated. Linework carries structure: 1px rules for division, 1.5px ink rules for anything that holds a record (title blocks, register headers, the category index). Blueprint blue is the drafting pen and the action colour; redline is the checker's pen and marks only what is wrong or refused. Corners are square everywhere. Depth is a sheet lying on a table, not a card floating off a screen.

Type is one family, Chivo, in sentence case throughout. Figures that get compared (money, counts) are set in Chivo's tabular figures so columns align; Chivo Mono is reserved for sheet numbers, the one identifier a drawing sets like a drawing number. The system refuses the SaaS hero-plus-card-grid and the uniform rounded shadow card.

**Key Characteristics:**
- Engineering-grid ground (8px fine, 40px major) with drawing sheets laid on it.
- Blueprint blue for linework, links and the primary action; redline only for errors, declines, cancellations and over-budget marks.
- Square corners, hairline rules, a heavier 1.5px ink rule for record-holding structures.
- State shown as a drawing-legend symbol plus its word.
- One typeface family; tabular Chivo for money, mono only for sheet numbers.
- One motion moment per surface at most: a line that draws, markers that settle.

## Colors

A cool blueline palette: pale blue-white stock, near-black blue ink, one saturated drafting blue, and three state pens used sparingly.

### Primary
- **Blueprint Blue** (blue): Linework (dimension lines, extension lines, arrowheads, the lifecycle rail), links, the primary action, the focus ring, text selection, the open state, and the full-bleed blueprint band that closes the landing page.
- **Deep Blueprint** (blue-deep): Hover and pressed fill for primary actions only.
- **Blueprint White** (on-blue): Text and linework on blue.

### Tertiary (state pens)
- **Drafter's Redline** (redline): Errors, declines, cancelled jobs, over-budget quote verdicts, the danger button. **Redline Wash** (redline-wash) is its hover ground and nothing else.
- **Approved Green** (approved): Accepted quotes and within-budget verdicts.
- **Hold Amber** (hold): In-progress jobs and under-minimum verdicts.

### Neutral
- **Grid Ground** (ground): Page background under the engineering grid.
- **Sheet Stock** (sheet): Drawing sheets, nav bar, footer, fields, title-block cells, quiet buttons.
- **Blue Tint** (tint): Row hover in registers, the accepted-quote row, selected option cards, the outer halo of the field focus ring, skeleton base.
- **Blueline Ink** (ink): All primary text; the 1.5px record rules.
- **Faded Ink** (ink-2): Secondary text, annotation notes, placeholders, sheet numbers in registers.
- **Grid Line** (grid): Engineering-grid lines on the ground; skeleton shimmer.
- **Hairline Rule** (rule): Row dividers and the inner frame line of a sheet.
- **Strong Rule** (rule-strong): Sheet outer border, field and quiet-button borders, nav and footer rules, scrollbar thumb.
- **Pale Line** (paleline): Resting underline on inline links; it darkens to blue on hover.

### Named Rules
**The Drafting Pen Rule.** Blue is the pen that draws the sheet and the button that moves a job forward. It does not become a fill for surfaces other than primary buttons, selection, and the single closing blueprint band.

**The Redline Rule.** Redline marks only what is wrong, refused, cancelled or over budget. It is never decoration, never emphasis, never a brand accent.

## Typography

**Display Font:** Chivo (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Chivo
**Label/Mono Font:** Chivo Mono (with ui-monospace, SF Mono, monospace), sheet numbers only

**Character:** A sturdy grotesque with an engineering accent: extra-bold and tightly tracked at display size, plain and even for reading, with tabular figures that line up like dimensions.

### Hierarchy
- **Display** (800, clamp(2.625rem → 4.5rem), line-height 1, -0.035em): The landing headline and the closing blueprint-band headline only.
- **Headline** (700, 2.25rem stepping to 3rem from sm, ~1.1, -0.02em): Page titles, notice titles, and job titles (which cap at 2.625rem).
- **Title** (700, 1.25rem–1.875rem, 1.12–1.25, -0.02em): Section heads, example-sheet title, register row titles (1.125–1.25rem, snug).
- **Body** (400, 1rem, 1.55): Running text; descriptions capped at 65–68ch (max-w-prose / 68ch). Lead paragraphs step up to 1.125rem in faded ink.
- **Label / Note** (500, 0.875rem, 1.3, faded ink): Annotation text on the drawing: field hints, register column heads, region labels ("What needs doing", "Budget"), meta lines. Title-block labels and plotted-quote labels drop to 0.8125rem. Sentence case, no tracking.
- **Measure** (Chivo, 600, tabular figures): Money and counts wherever they appear: budgets, quote amounts, bid counts, lowest quote, and amount inputs.
- **Sheet number** (Chivo Mono, 400, 0 tracking): "No. 7C41E2" in registers, title blocks and breadcrumbs.

### Named Rules
**The Measure Rule.** Money and counts are set in Chivo with tabular figures (`tnum`); Chivo Mono is used only for sheet numbers. Reason: in the build, mono's comma spacing split amounts apart, and mono on money read as costume rather than as a drawing. Dates are not set in mono either: they render as relative words ("3 days ago") in note style inside a `<time>` element, with the full date in its title.

**The Sentence Case Rule.** Every label, column head, title-block label and button is sentence case with default tracking. The world's native all-caps drafting lettering was deliberately not adopted.

## Layout

Pages sit in a 72rem (max-w-6xl) container with a 20px gutter; auth and notice pages narrow to 28–36rem. Vertical rhythm per page is 40px top/bottom on mobile, 56px from sm up; landing sections run 64px → 96px. The engineering grid on the ground is the spatial reference: 8px fine lines, a heavier line every 40px, and spacing sticks to Tailwind's 4px steps that fall on or halve that grid.

The landing first viewport is a 12-column split (5 text / 7 example sheet). The job detail page is a sheet with a 22rem sidebar from lg. Registers (open jobs, dashboard) are single sheets whose rows become a column grid at md and a stacked two-column arrangement below it, with sheet number, title, category, budget and age reordered for small screens. Annotation callouts with dashed leader lines appear only at xl, where there is margin to write in. The nav collapses to a quiet "Menu" button below sm.

## Elevation & Depth

Depth is paper on a table. Surfaces are flat; the only shadow is a single, very soft drop under a drawing sheet, tuned to be felt rather than seen, and the sheet frame itself is drawn with inset shadows. Everything else separates by rule lines and tonal ground (grid ground, sheet stock, tint).

### Shadow Vocabulary
- **Sheet frame and lay** (`box-shadow: inset 0 0 0 5px var(--sheet), inset 0 0 0 6px var(--rule), 0 12px 28px -22px rgb(18 33 58 / 0.55)`): Every drawing sheet. The insets draw the inner border 5px inside the outer hairline; the drop settles the sheet on the grid.
- **Field focus** (`box-shadow: 0 0 0 1px var(--blue), 0 0 0 4px var(--tint)`): Focused inputs, selects and textareas.
- **Selected option** (`box-shadow: inset 0 0 0 1px var(--blue)`): A checked option card (account type), doubling its blue border.

### Named Rules
**The Paper Rule.** A sheet may cast one soft drop and nothing else lifts. No hover elevation, no stacked shadows, no hard offset shadows.

## Shapes

Square corners (0px) on everything: sheets, buttons, fields, option cards, title blocks, empty states. Form is drawn with lines. 1px rules divide; the sheet's double frame (outer strong rule, inner hairline 5px in) marks a document; a 1.5px ink rule marks a record structure (title block, register header, category index table). Empty states are drawn as dashed-border sheets, like an unissued drawing. Small geometry comes from drafting: filled triangular arrowheads, diamond quote markers, circular legend symbols, and a triangle revision delta for errors.

## Components

### Buttons
Squared, confident, drafted.
- **Shape:** Square corners (0px), 44px minimum height, 1px border in the button's own colour, 600 weight at 1rem.
- **Primary:** Blueprint blue fill, white text, 10px 20px padding. Reserved for the action that moves a job forward (post, quote, accept, create account).
- **Hover / Focus / Active:** Primary deepens to blue-deep; quiet turns border and text blue; danger fills with redline wash. 150ms colour transitions on the ease-out curve. Active presses down 1px. Focus is the global 2px blue outline offset 3px. Disabled drops to 55% opacity with a not-allowed cursor.
- **Quiet:** Sheet fill, ink text, strong-rule border. The second choice beside a primary, and Menu / Sign out.
- **Danger:** Sheet fill, redline text and border. Decline only.
- **Small:** 36px minimum height, 6px 14px padding, 0.9375rem. Used in the nav and in per-quote Accept/Decline pairs.

### Inputs / Fields
- **Style:** Sheet fill, 1px strong-rule border, square, 44px minimum height, 10px 12px padding, 1rem text; blue caret. Textareas start at 7rem and resize vertically. Selects carry a drawn blue chevron. Currency fields take a "$" affix inset 12px.
- **Hover / Focus:** Hover darkens the border to faded ink; focus turns it blue with a 1px blue ring and a 4px tint halo.
- **Labels and errors:** Label above in 600 weight, "Optional" as a note on the right, hint below as a note. Errors are redline, medium weight, led by an outlined triangle revision delta, announced with role="alert".

### Option cards
Radio choices drawn as bordered cells: strong-rule border on sheet at rest, blue border with an inset blue line and tint fill when checked, a drawn circle marker that fills when selected, and a note line beneath.

### Navigation
Sheet-coloured bar, 64px tall, strong rule beneath. The wordmark is "Docket" in 800 weight over a small dimension line. Links are 500 weight ink, turn blue on hover; the current page is blue with a 2px blue underline bar. Account name and role sit behind a hairline divider with a small quiet Sign out button. Below sm the links drop into a full-width sheet panel toggled by a quiet "Menu" button.

### Sheet (signature)
The document surface. Sheet stock, strong-rule outer border, inner hairline frame, one soft drop (see Elevation). Padding 28px, 36px on wide screens. Holds job detail, the landing example, auth forms, notices and registers.

### Title block (signature)
The ruled box in a drawing's corner: a two-column grid of cells separated by 1px ink gaps inside a 1.5px ink border. Each cell is sheet-filled with 8px 12px padding, a 0.8125rem note label over a 600-weight value. Carries sheet number, state, category, and on the landing example an "Issue" cell stating it is not a live job.

### Dimension line (signature)
The budget drawn to scale: the range written above in tabular blue 600, blue extension lines at each end, a blue line with filled arrowheads over a faint full-scale hairline, and quotes plotted below as a vertical tick with a diamond marker coloured by verdict (redline over, hold under, approved within; filled when emphasised). Labels hang from a leader and flip to the left past 60% of the width. Always accompanied by a sentence verdict in text; the drawing itself is aria-hidden.

### State mark
A 12px drawing-legend symbol plus its word, 0.875rem 600: open ring (open, blue), half-filled (in progress, hold), filled (completed in faded ink, accepted in approved), crossed ring (cancelled, declined, redline), dashed ring (awaiting decision, faded ink). Shape and word carry the state; colour only reinforces it.

### Drawing register
Lists of jobs and quotes are one sheet: column heads as semibold notes above a 1.5px ink rule (md up), rows divided by hairlines, 20–24px padding. The whole row is the link target; hover and focus-within wash the row in tint and underline the title in blue. Sheet number leads each row in mono; budget right-aligned in tabular figures; age in note style.

### Loading and empty
Loading is a skeleton sheet of hairline-divided rows shimmering tint → grid over 1.4s. Empty is a dashed strong-rule sheet with a title, one sentence of what to do next, and an action.

### Motion
One drawing moment per surface: the landing dimension line draws from the left over 900ms and quote markers settle down 10px over 500ms, staggered 140ms after a 650ms delay. State transitions are 150ms on `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced motion collapses all animation and transitions to instant.

## Do's and Don'ts

### Do:
- **Do** put the things people act on inside a sheet: stock fill, strong outer rule, inner hairline frame 5px in, one soft drop.
- **Do** give every job a title block with its sheet number (mono, "No. XXXXXX") and its state mark.
- **Do** draw budgets as a dimension line and plot quotes against it, with the verdict also stated in words.
- **Do** set money and counts in Chivo with tabular figures; keep Chivo Mono for sheet numbers only.
- **Do** show state with a legend symbol plus its word, using the fixed symbol-to-state mapping.
- **Do** use 1px rules to divide and a 1.5px ink rule for record structures (title blocks, register headers, index tables).
- **Do** keep every label, head and button in sentence case with default tracking.
- **Do** keep controls at 44px minimum height (36px for the small button) with the 2px blue focus outline offset 3px.

### Don't:
- **Don't** round corners on any surface or control; the radius is 0px everywhere.
- **Don't** build a SaaS hero-plus-card-grid or use uniform rounded shadow cards.
- **Don't** set money or dates in Chivo Mono; mono's comma spacing splits amounts and reads as costume.
- **Don't** use redline for anything but errors, declines, cancellations and over-budget marks.
- **Don't** let colour alone carry a state; the symbol and the word must be present.
- **Don't** add shadows beyond the sheet's single soft drop, and never a hard offset shadow.
- **Don't** add small uppercase or tracked labels above headlines.
- **Don't** add more than one motion moment to a surface.
