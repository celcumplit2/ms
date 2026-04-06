# Rewritegen to MOLDS2 Style Adaptation

Date: 2026-04-03

## Goal

Adapt the scoped Rewritegen article layer in `Moldstud old` to the visual language of `C:\GPT\MS\MOLDS2` without changing `MOLDS2` itself and without breaking the legacy blog theme for non-Rewritegen articles.

## Read-only design sources used

- `C:\GPT\MS\MOLDS2\src\styles\global.css`
- `C:\GPT\MS\MOLDS2\src\components\ArticlePage.astro`
- `C:\GPT\MS\MOLDS2\src\components\ArticlesListPage.astro`
- `C:\GPT\MS\MOLDS2\src\components\SectionLabel.astro`
- `C:\GPT\MS\MOLDS2\docs\figma\DESIGN_TOKENS.md`
- `C:\GPT\MS\MOLDS2\public\figma-pages\article-detail.png`

## Patterns transferred into Moldstud old

### Design tokens

- Light page/canvas surfaces: `#fdfdff`, `#f6f6fb`, `#f2f2fa`
- Text pair: dark `#26283b` and muted `#8386a1`
- Accent palette: blue `#2d36ff`, green `#2fcb73`
- Soft border and shadow system based on low-opacity dark strokes
- Large rounded containers with occasional chamfered corners

### Typography

- Display/headings: `IBM Plex Sans Condensed`
- Body copy: `Onest`
- Rewritegen section titles, chart titles, micro-headings and article hero title now use the new display language

### Component language

- Light article shells with soft gradients and subtle borders
- Small black uppercase tags inspired by `SectionLabel`
- Blue clipped CTA/button styling
- Dark feature cards and chamfered accent panels
- Softer table/chart/checklist/widget containers matching the new card system

## Scope of changes in Moldstud old

### Main scoped block layer

Updated:

- `styles/scss/articles/_rewritegen-blocks.scss`

This file now restyles:

- `solution-section`
- `rg-b*` block layouts
- `rg-bv-*` block variants
- chart sections
- matrix/checklist/faq/proscons/widgets/textblocks
- decision simulator UI

All rules remain scoped under `.rg-article-body`.

### Rewritegen-specific article shell

Updated:

- `components/articles/article-page.tsx`
- `styles/scss/articles/article-page.module.scss`

Rewritegen articles now get a separate hero shell:

- restyled published info
- MOLDS2-like display title
- muted intro block
- contained/chamfered cover image shell

These overrides are only applied when Rewritegen blocks are detected in article content.

## Diversity preserved

The adaptation intentionally did not flatten block variety into one repeated card style.

Preserved:

- different `rg-bv-*` visual variants
- dark vs light contrast blocks
- multi-column plans and comparison boards
- charts as separate content beats
- checklist/decision/fact-note blocks with distinct visual rhythm

The system now uses one common design language, but still lets different Rewritegen articles feel structurally different.

## Validation

Checked locally on imported Rewritegen pages in `Moldstud old`, including:

- `p-app-designer-for-intuitive-user-interfaces`
- `p-staff-augmentation-vs-managed-services-for-project-needs`
- `p-zoom-sdk-features-for-windows-developers-an-in-depth-gui`

Confirmed:

- Rewritegen article body renders with MOLDS2-like surfaces and typography
- block/runtime behavior still works
- TypeScript check passes: `pnpm check`

## Remaining intentional limits

- The legacy site header/footer and non-Rewritegen article pages still use the old theme
- Imported placeholder covers are still legacy assets; only their presentation was adapted
- No changes were made in `C:\GPT\MS\MOLDS2`
