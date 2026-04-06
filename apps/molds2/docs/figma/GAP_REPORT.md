# Moldstud Figma Gap Report

## Scope

This report captures the gaps between:

- the live Figma file state;
- the current mirrored-site baseline in this repo;
- the requirements of a production implementation.

## 1. Design Review Gaps Visible in Figma Comments

### Accessibility and palette quality

- The palette is questioned for WCAG compliance.
- Title contrast is explicitly called out as insufficient.
- Some neutral palette steps appear duplicated and should probably be removed or collapsed.

Implementation consequence:

- color tokens cannot be frozen until contrast is validated in code;
- do not blindly ship all palette stops exposed in Figma;
- prefer semantic tokens and contrast tests over literal swatch copying.

### Dark/light inconsistency

- The dark variant is questioned for inconsistent grid/background treatment.
- A radial gradient is present in one theme and questioned for inconsistency with the light theme.
- One button variant is called out as inconsistent with the light version.
- Labels are called out as inconsistent between light and dark states.

Implementation consequence:

- define one shared semantic token system for both themes;
- do not allow separate ad hoc dark/light component styling branches;
- verify parity of states across theme variants before rollout.

### Component inconsistency

- Transparent buttons are questioned and likely should not remain transparent.
- One repeated icon style across multiple blocks is questioned.
- Card color variation count is called out as too large.
- One element is called out as too small.

Implementation consequence:

- button variants need stricter state rules;
- icon treatment needs a controlled system;
- card variants need consolidation;
- responsive sizing needs explicit minimums.

### Section quality

- One block is explicitly described as too simple, too empty, and too large.
- One background is called out as likely incorrect because it visually contaminates the next block.
- Some mobile/desktop differences are treated as undesirable drift.

Implementation consequence:

- section composition still needs cleanup in at least part of the file;
- section spacing and section boundaries must be treated as a first-class layout system in code;
- mobile/desktop layouts should be controlled by tokens and reusable patterns, not manual deviations.

## 2. Structural Gaps Between Figma and Current Repo

### Repo is still a mirror, not a system

- Current public pages live as mirrored HTML under `public/`.
- There is no reusable runtime component system yet.
- There is no token layer yet.

Impact:

- redesign work requires structural code changes, not just restyling.

### Figma coverage is uneven across route families

Well-covered:

- home
- services list
- industries list
- solutions/development-type list
- technologies list
- core sections/cards/buttons

Partial or reference-only:

- careers/job/apply
- hire us
- blog/article
- case study
- person/profile

Not clearly finalized in the main `UI Design` page:

- about us
- contacts
- hire us
- privacy policy
- articles index/detail

Impact:

- route rollout must be phased;
- pages missing a strong finalized source should not block the component system build, but they cannot be claimed as closed.

## 3. Design-System Gaps

- No explicit Figma variable system was audited through the current access path.
- Typography exists as pages, but exact values still need extraction.
- Palette exists as samples, but semantic token mapping is not yet formalized.

Impact:

- code has to become the first clean semantic token implementation;
- implementation must document every resolved token instead of relying on implicit Figma organization.

## 4. Business and Content Gaps

- The mirrored phase-1 routes reflect the current live site, not the future route expansion implied by the Figma file.
- Figma includes future-facing detail templates that are not yet part of the mirrored public baseline.
- Comments and leads functionality were intentionally left static in the mirror and still need a real implementation path later.

Impact:

- route migration and product capability migration are separate tracks;
- design implementation should not be confused with comments/forms/backoffice work.

## 5. Required Resolution Policy

### Implement now

- token layer
- primitives
- cards
- sections
- home and list-page templates

### Implement after clarification or stronger source confirmation

- article pages
- careers/job/apply
- about-us/contact/hire-us final redesign variants
- case studies and person/profile flows

### Do not improvise

- unresolved palette values
- missing page templates
- inconsistent theme decisions that are still under comment review

## 6. Exit Criteria for Closing These Gaps

- contrast-checked semantic token set exists in code;
- button, label, and card variants are consolidated;
- theme differences are intentional and documented;
- section library maps cleanly to route templates;
- every implemented route is backed by either `UI Design` or an explicitly approved secondary source.
