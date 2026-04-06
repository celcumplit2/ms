# Moldstud Redesign Work Plan

## Working Baseline

This work plan fixes the current delivery mode for the redesign track.

### Approved assumptions

1. The first implementation target is the `light` variant only.
2. The priority is not content completion. The priority is reproducing the new design system and all page types.
3. Every required page type must exist in code even if real business data is still missing.
4. Where production data is missing, use structured `demo content` that can be swapped later without rebuilding the component architecture.
5. The old mirrored site remains the content and route reference, but not the visual source for the redesign.

## Main Goal

Reproduce the new Figma design as a reusable front-end system and cover all page types needed for the future Moldstud site.

This means:

- build the new light-theme design system;
- implement all page-type templates;
- use demo content where needed;
- keep the code ready for later replacement with real CMS or structured site data.

## Delivery Priorities

### Priority 1

Reproduce the new design faithfully in code.

### Priority 2

Cover all page types, even if some of them launch with placeholder/demo content.

### Priority 3

Prepare every block for later data replacement without rewriting the visual layer.

## Page-Type Scope

The redesign should cover these route/template families.

### Core marketing pages

- Home page
- About us page
- Contact page
- Hire us page
- Privacy policy page

### Listing pages

- Services list
- Industries list
- Solutions / development types list
- Technologies list
- Articles index
- Careers list

### Detail pages

- Service detail page
- Industry detail page
- Solution / development type detail page
- Technology detail page
- Article detail page
- Career / job detail page

### Optional but prepared if kept in scope

- Case study list
- Case study detail
- Candidate / person profile page

If a route family exists in Figma or is expected by business scope, it should not be skipped just because the final data is not ready yet.

## Demo Content Policy

### Use demo content when

- the design requires cards, sections, or detail layouts that do not have final real content yet;
- the route type must be implemented now for layout/system coverage;
- the real source text is missing, incomplete, or not approved yet.

### Demo content rules

- keep it realistic and domain-relevant;
- do not hardcode demo copy directly into components;
- store demo data separately from rendering logic;
- use stable field shapes that can later be replaced with real content;
- mark clearly which routes/blocks are running on demo data.

### Technical requirement

The data contract for demo content and future real content should be the same wherever possible.

That means:

- cards consume typed props;
- sections consume normalized data objects;
- pages consume route-level data objects;
- swapping demo data for real data should not require redesigning components.

## Implementation Streams

## Stream 1. Redesign Runtime Bootstrap

### Tasks

- create the new `src/` runtime structure;
- define layouts, sections, components, and data folders;
- keep the old mirror in `public/` untouched as reference;
- prepare a clean route architecture for the redesign.

### Output

- reusable Astro source tree
- clean separation between old mirror and new runtime

## Stream 2. Light Theme Tokens

### Tasks

- define light-theme color tokens;
- define typography tokens;
- define spacing, radius, border, and shadow tokens;
- define container and grid tokens;
- postpone dark mode entirely for now.

### Output

- one stable light-theme token layer
- no mixed light/dark branching in component implementation

## Stream 3. Primitives

### Tasks

- buttons
- links
- labels
- icons
- chips/tags
- inputs/selects/textarea if needed by contact/hire-us forms
- controller primitives if used by sliders/tabs/filters

### Output

- reusable primitives with consistent states

## Stream 4. Shared Shell

### Tasks

- header
- navigation
- footer
- global section wrapper
- container/grid helpers
- breadcrumbs if needed

### Output

- one reusable site shell for every page type

## Stream 5. Content Components

### Tasks

- article card
- service card
- industry card
- technology card
- testimonial card
- benefit card
- FAQ item/group
- career/job card

### Output

- reusable content-card library for all list/detail templates

## Stream 6. Section Library

### Tasks

- hero
- services
- industries
- technologies
- what we offer
- what we can help with
- how we do it
- standards/compliance
- benefits
- testimonials
- blog
- FAQ
- CTA/contact sections

### Output

- section-level building blocks that can assemble most pages without one-off layout hacks

## Stream 7. Page Templates

### Wave A: highest-confidence pages

- Home
- Services list
- Industries list
- Solutions list
- Technologies list

### Wave B: business-critical secondary pages

- About us
- Contact
- Hire us
- Careers list
- Articles index
- Privacy policy

### Wave C: detail templates

- Service detail
- Industry detail
- Solution detail
- Technology detail
- Article detail
- Career / job detail

### Wave D: optional/supporting templates

- Case study list/detail
- Candidate/person page

## Stream 8. Demo Data Layer

### Tasks

- define data shapes per page type;
- create demo datasets for each listing/detail route family;
- create section-level demo payloads;
- make sure page generation works even before real business content is ready.

### Output

- route-ready demo data library
- swap-friendly content contracts

## Stream 9. QA and Acceptance

### Checks

- visual match to Figma light variant
- responsive behavior
- layout consistency across page families
- component reuse instead of repeated one-off CSS
- clean replacement path from demo content to real content

## Execution Order

1. Bootstrap the redesign runtime in `src/`.
2. Implement the light-theme token layer.
3. Build primitives.
4. Build shared shell.
5. Build cards and content components.
6. Build section library.
7. Build demo-data layer.
8. Ship listing and marketing templates.
9. Ship all detail templates.
10. Run QA and fix drift.

## Done Definition

The redesign work is considered structurally complete when:

- the light-theme system exists in code;
- all required page types are implemented;
- missing real content is covered by demo data rather than omitted pages;
- components are reusable and data-driven;
- replacing demo data with real data later does not require page rewrites.
