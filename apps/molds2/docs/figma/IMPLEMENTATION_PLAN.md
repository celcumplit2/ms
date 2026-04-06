# Moldstud Figma Implementation Plan

## Goal

Translate the Figma file into a production-ready Astro implementation without turning the new site into static screen copies.

## Baseline Assumptions

- The current mirrored site in `public/` remains the content and route reference.
- The Figma file becomes the new visual/system source.
- New implementation work should happen in `src/`, not by hand-editing mirrored HTML as the long-term runtime path.
- The first delivery target is the `light` variant only.
- All required page types must be implemented even where final real data does not exist yet.
- Missing real data should be covered with structured demo content that can later be replaced without changing the component architecture.

## Phase 0. Redesign Bootstrap

### Objectives

- open the redesign track cleanly inside the repo;
- keep the phase-1 mirror intact as fallback/reference;
- define the runtime component architecture.

### Deliverables

- `src/` structure for tokens, components, sections, layouts, and pages
- migration rules for content extraction from mirrored HTML into structured props/data
- theme and token file plan

## Phase 1. Tokens and Primitives

### Order

1. color tokens
2. typography tokens
3. spacing/layout tokens
4. button primitives
5. label/link/icon primitives
6. controllers/theme switch

### Critical path

- no section or page should be implemented before tokens and buttons exist;
- all interactive primitives must share one state model.

## Phase 2. Shared Shell

### Build first

- `SiteHeader`
- `PrimaryNav`
- `SiteFooter`
- `MarketingLayout`
- base container/grid utilities

### Why

- every major route depends on the shell;
- it prevents repeated page-level layout drift.

## Phase 3. Card Library

### Build

- `ArticleCard`
- `ServiceCard`
- `IndustryCard`
- `TechnologyCard`
- `BenefitCard`
- `DirectionCard`
- `TestimonialCard`
- `FaqItem`

### Why

- the section layer depends on the card layer;
- the listing pages cannot be migrated cleanly without card reuse.

## Phase 4. Section Library

### Priority sections

1. `HeroSection`
2. `ServicesSection`
3. `IndustriesSection`
4. `TechnologiesSection`
5. `WhatWeOfferSection`
6. `HowWeDoItSection`
7. `StandardsSection`
8. `BenefitsSection`
9. `TestimonialsSection`
10. `BlogSection`
11. `FaqSection`
12. `SiteFooter`

### Why

- the main home and list templates are section assemblies;
- this gives broad route coverage fast.

## Phase 5. Route Templates

### First wave

- `/`
- `/services`
- `/industries`
- `/solutions`
- `/technologies`

These have the strongest direct Figma mapping.

### Second wave

- `/careers`
- `/about-us`
- `/contacts`
- `/hire-us`
- `/articles`
- `/articles/[slug]`
- `/privacy-policy`

These require either secondary-source mapping or additional clarification because they are not all equally finalized on the main `UI Design` page.

### Third wave

- service detail pages
- industry detail pages
- solution/development-type detail pages
- technology detail pages
- career/job/apply pages
- case-study/person/profile routes if they enter scope

## Phase 6. Content Wiring

### Tasks

- normalize route data sources;
- split content from presentation;
- preserve SEO-critical copy/metadata;
- keep article and listing content migratable at scale.

### Constraints

- do not hand-copy dozens of pages into static one-off components;
- do not lock route rendering to mirrored DOM structure.

## Phase 7. QA

### Required checks

- visual parity against Figma for implemented routes
- responsive behavior
- theme consistency
- contrast/accessibility review
- reusable component coverage
- no raw duplicated page-level CSS drift

## Dependencies

- tokens before primitives
- primitives before cards
- cards before sections
- sections before templates
- templates before route rollout

## Risks

- unresolved Figma comments can create churn if implementation races ahead of design decisions;
- article/careers/contact families may need additional design confirmation;
- current mirrored HTML can slow migration if treated as the long-term view layer instead of content source only.

## Definition of Done

The redesign implementation is not done when the homepage looks similar to Figma. It is done when:

- the token layer exists;
- primitives exist;
- section and card libraries exist;
- route templates are reusable;
- implemented routes render from structured data/content;
- accessibility concerns raised in Figma have been addressed or documented as explicit blockers.
