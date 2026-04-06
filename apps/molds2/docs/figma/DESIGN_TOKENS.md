# Moldstud Design Tokens

## Status

This token set is the implementation baseline inferred from the Figma audit on `2026-03-24`.

Important constraint:

- the file was audited in `view/comment` mode;
- the current inspection path did not expose a formal variable panel or copy-ready style values;
- exact numeric/hex values must be finalized during component implementation while selecting real Figma layers.

Because of that, this document defines the token model and the observed families first. It is intentionally implementation-oriented rather than pretending to be a final Figma export.

## 1. Theme Direction

Observed design direction:

- dark-first product marketing UI;
- deep navy canvas/backgrounds;
- bright cool accents;
- green support accent family;
- red/error accent family;
- blue-grey neutral family;
- light surfaces used selectively inside cards, buttons, and mixed-theme layouts.

## 2. Color Tokens

### Observed Figma Color Families

- `Backgrounds`
- `Green shades`
- `Red shades`
- `Blue grey shades`
- `Blue shades`

### Recommended Semantic Token Model

Base surfaces:

- `--bg-canvas`
- `--bg-page`
- `--bg-section`
- `--bg-surface-1`
- `--bg-surface-2`
- `--bg-elevated`

Text:

- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--text-on-accent`
- `--text-inverse`

Borders and separators:

- `--border-subtle`
- `--border-default`
- `--border-strong`

Brand and accents:

- `--accent-primary`
- `--accent-primary-hover`
- `--accent-primary-active`
- `--accent-success`
- `--accent-danger`
- `--accent-info`

State surfaces:

- `--surface-selected`
- `--surface-hover`
- `--surface-disabled`
- `--surface-tag`

### Token Guidance

- Do not ship raw palette names like `blue-500` as the public API of the system.
- Map Figma swatches to semantic purpose first.
- Preserve enough raw aliases internally to support future theme changes without component rewrites.

## 3. Typography Tokens

### Observed Figma Type Pages

- `Desktop`
- `Mobile`

### Recommended Token Model

Desktop:

- `--font-size-display`
- `--font-size-h1`
- `--font-size-h2`
- `--font-size-h3`
- `--font-size-h4`
- `--font-size-body-lg`
- `--font-size-body`
- `--font-size-body-sm`
- `--font-size-label`
- `--font-size-caption`

Mobile:

- `--font-size-display-mobile`
- `--font-size-h1-mobile`
- `--font-size-h2-mobile`
- `--font-size-h3-mobile`
- `--font-size-body-mobile`
- `--font-size-label-mobile`
- `--font-size-caption-mobile`

Supporting typography:

- `--font-family-base`
- `--font-family-display`
- `--font-weight-regular`
- `--font-weight-medium`
- `--font-weight-semibold`
- `--font-weight-bold`
- `--line-height-tight`
- `--line-height-base`
- `--line-height-relaxed`
- `--letter-spacing-tight`
- `--letter-spacing-normal`

Implementation note:

- Figma clearly distinguishes desktop and mobile systems, so responsive typography should be token-driven, not ad hoc media-query overrides.

## 4. Spacing Tokens

The inspected layout shows repeated card/section spacing and wide gutters. The implementation should normalize spacing into a compact scale.

Recommended spacing scale:

- `--space-2`
- `--space-4`
- `--space-8`
- `--space-12`
- `--space-16`
- `--space-20`
- `--space-24`
- `--space-32`
- `--space-40`
- `--space-48`
- `--space-64`
- `--space-80`
- `--space-96`
- `--space-120`

## 5. Layout Tokens

Recommended layout token model:

- `--container-max`
- `--container-wide-max`
- `--content-max`
- `--section-padding-y`
- `--section-padding-y-lg`
- `--grid-gap`
- `--grid-gap-lg`
- `--card-padding`
- `--card-padding-lg`

Observed implementation need:

- long-form marketing sections;
- dense card grids;
- mixed single-column and multi-column compositions;
- route templates that reuse the same section shell.

## 6. Shape and Depth Tokens

Recommended token model:

- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-xl`
- `--radius-pill`
- `--shadow-soft`
- `--shadow-card`
- `--shadow-focus`

Observed direction:

- rounded UI;
- more border/surface separation than heavy shadow dramatics;
- pills/tags/chips appear throughout the system.

## 7. Motion Tokens

No heavy motion system was explicitly audited in Figma, but the site should still define minimal motion primitives:

- `--duration-fast`
- `--duration-base`
- `--duration-slow`
- `--ease-standard`
- `--ease-emphasized`

Use cases:

- hover transitions
- filter/tag transitions
- theme switch states
- slider/controller transitions

## 8. Component-State Tokens

Buttons and interactive primitives require explicit state handling:

- default
- hover
- active
- focus-visible
- disabled

Labels and tags require:

- base
- selected
- inactive

Cards require:

- default surface
- hover surface
- selected/emphasized variant

## 9. Code Destination

These tokens should be introduced into runtime code in this order:

1. `src/styles/tokens.css`
2. `src/styles/theme.css`
3. component-level CSS modules or co-located styles that consume semantic variables only

## 10. Open Token Work

- extract exact type sizes from the `Typography` page during implementation;
- extract exact hex values from palette swatches during implementation;
- normalize dark/light variants into one semantic token set;
- resolve open palette/accessibility comments before freezing public token names.
