# Moldstud Figma Audit

## Scope

- Audit date: `2026-03-24`
- Figma file: `Moldstud`
- File URL: `https://www.figma.com/design/ZUj7In473NjYDV6JkYCxoX/Moldstud`
- Access mode during audit: `view/comment`
- Audit basis: live Figma inspection through Playwright, current repository structure, and the mirrored MoldStud route inventory already present in this repo.

## Executive Summary

The Figma file is structured as a real design workspace, not as a single landing-page mock. It separates page templates, section components, cards, buttons, labels, controllers, typography, icons, and palette work into dedicated Figma pages. That is good enough to use the file as the source for a production design-system migration.

The file is not fully frozen. The visible comments show unresolved design-review items around accessibility, palette quality, dark/light consistency, card variation sprawl, and a few weak sections. Because of that, implementation should treat Figma as the new design source, but not as a sign-off artifact for every detail yet.

## File Structure

Observed top-level Figma pages:

1. `Upwork`
2. `Moodboard`
3. `UI Design`
4. `Archive`
5. `Typography`
6. `Icons`
7. `Collor pallete`
8. `Buttons`
9. `Labels`
10. `Link`
11. `Controllers`
12. `Cards`
13. `Sections`
14. `Navigation bar`
15. `Card`

## Page-Level Findings

### `UI Design`

This is the primary page-template page. It contains the clearest implementation targets for the new marketing site.

Observed top-level screens:

- `Pagina lista tehnologii`
- `Pagina unei tehnologii`
- `Pagina tipului de dezvoltare`
- `Pagina tipuri de dezvoltare`
- `Pagina industriei`
- `Lista industriilor`
- `Detalii servicii`
- `Lista de servicii`
- `Home page`
- `Hero Section v2 - Light mode`

Implication:

- This page should be treated as the main source for the route/template migration.
- The template set extends beyond the currently mirrored phase-1 public routes and includes detail-page shapes that were not implemented in the first static mirror.

### `Sections`

This page acts as the section library for the marketing site.

Observed section components:

- `Technologies`
- `How we do it`
- `Blog`
- `What we offer`
- `Standards & compliance`
- `Hero section`
- `Footer`
- `FAQ`
- `Careers`
- `Certifications`
- `Industries`
- `What we can help with`
- `Case study`
- `Benefits`
- `Video`
- `How it works`
- `Directions`
- `Testimonials`
- `Services`

Implication:

- The implementation should be section-driven, not page-by-page hardcoded.
- The section page is strong enough to define a reusable Astro component system.

### `Cards`

This page acts as the card/component family inventory for content and marketing blocks.

Observed card components:

- `Technology category card`
- `Article card`
- `Service card`
- `Candidate card`
- `FAQ`
- `Industry card`
- `Benefits card`
- `Direction card`
- `Testimonials card`

Implication:

- The current repo should not keep cards embedded inside raw mirrored HTML.
- The redesign should introduce explicit reusable card components.

### `Buttons`

This page is detailed enough to define an interaction primitive system.

Observed button variants:

- `Primary Button - Desktop`
- `Primary Button - Mobile`
- `Primary Extra Button - Desktop`
- `Secondary Button - Desktop`
- `Secondary Button - Mobile`
- `Tertiary Button - Desktop`
- `Tertiary Button - Mobile`
- `Play Button`
- `Link`

Implication:

- Button tokens should be implemented centrally.
- Mobile and desktop sizing/states should be explicit, not accidental CSS drift.

### `Typography`

Observed typography groups:

- `Desktop`
- `Mobile`

Implication:

- The file clearly expects a dual-type scale.
- Exact numeric values still need extraction during implementation because view-only access does not expose a full variable/style handoff in the current audit path.

### `Icons`

Observed icon sources:

- `Remix icons`
- `All the flags`

Implication:

- The system is built around a mixed icon strategy rather than fully custom iconography.
- Implementation should normalize icon wrappers instead of copying raw SVG markup ad hoc.

### `Collor pallete`

Observed palette families:

- `Backgrounds`
- `Green shades`
- `Red shades`
- `Blue grey shades`
- `Blue shades`

Implication:

- The design is dark-first, with multiple semantic color families.
- The current palette is still under review and should be translated into explicit semantic tokens in code rather than copied blindly as raw swatch names.

### `Moodboard`

Observed exploratory/reference screens:

- `Cariere: pagina principala`
- `Job page`
- `Blog: Article page`
- `Blog`
- `Case study - page -- de mai lucrat`
- `Case studies list`
- `Job page: Apply`
- `Hire us page`
- `Person page`
- `Request More Profiles`
- `Talents -> Designers`

Implication:

- `Moodboard` contains valuable reference material for pages that are either missing from `UI Design` or not finalized there.
- These screens should be treated as secondary input, not as the first implementation source.

## Visual Direction

Observed direction from the inspected frames:

- dark-first canvas and section backgrounds;
- strong contrast between deep navy backgrounds and bright accent colors;
- mixed dark/light component variants inside the same system;
- grid/card-heavy B2B marketing composition;
- explicit section modularity rather than one-off landing layouts.

## Design Maturity

The file is mature enough to start implementation work, but not mature enough to assume every detail is approved.

Evidence:

- live comments are still active;
- multiple comments question accessibility and consistency;
- one Figma page is literally named `Archive`;
- one case-study reference is marked `de mai lucrat`;
- some page families exist only as moodboard/reference, not as final section-driven screens.

## Implementation Consequences

1. Use `UI Design`, `Sections`, `Cards`, `Buttons`, `Typography`, and `Collor pallete` as the production source.
2. Use `Moodboard` only when a route exists in the business scope but has no finalized equivalent in the main system pages yet.
3. Build a component system first. Do not replace the current site with static one-off screen copies.
4. Treat visible review comments as open design debt and track them in `GAP_REPORT.md`.
5. Keep the current mirrored site as the content and route reference while the new UI system is introduced in code.
