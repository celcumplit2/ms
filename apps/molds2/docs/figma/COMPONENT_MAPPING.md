# Moldstud Component Mapping

## Current Repo Baseline

The current repo is still the phase-1 mirror:

- public routes are served from static mirrored HTML in `public/`;
- runtime pages are not yet componentized under `src/`;
- the mirror is useful as a content/routing reference, not as the final implementation architecture for the redesign.

That means the Figma migration is not a repaint. It is a shift from mirrored HTML into a reusable Astro component system.

## 1. Route Coverage Mapping

### Direct Figma-to-route matches

- `Home page` -> `/`
- `Lista de servicii` -> `/services`
- `Lista industriilor` -> `/industries`
- `Pagina tipuri de dezvoltare` -> `/solutions`
- `Pagina lista tehnologii` -> `/technologies`

### Route families present in Figma but not fully represented in the phase-1 mirror

- `Detalii servicii` -> service detail pages
- `Pagina industriei` -> industry detail pages
- `Pagina tipului de dezvoltare` -> solution/development-type detail pages
- `Pagina unei tehnologii` -> technology detail pages

### Business routes in the current mirror that are not clearly finalized on `UI Design`

- `/about-us`
- `/contacts`
- `/hire-us`
- `/articles`
- `/articles/[slug]`
- `/privacy-policy`
- `/careers`

These should use `Moodboard` as reference only where no stronger finalized source exists in the main system pages.

## 2. Primitives Mapping

### Figma pages

- `Buttons`
- `Labels`
- `Link`
- `Controllers`
- `Icons`
- `Typography`
- `Collor pallete`

### Astro implementation targets

- `Button`
- `Label`
- `TextLink`
- `Icon`
- `ThemeSwitch`
- `FilterChip`
- `SliderControl`
- `SectionEyebrow`

## 3. Content Component Mapping

### Figma: `Cards`

Map to code components:

- `Technology category card` -> `TechnologyCard`
- `Article card` -> `ArticleCard`
- `Service card` -> `ServiceCard`
- `Candidate card` -> `CandidateCard`
- `Industry card` -> `IndustryCard`
- `Benefits card` -> `BenefitCard`
- `Direction card` -> `DirectionCard`
- `Testimonials card` -> `TestimonialCard`
- `FAQ` -> `FaqItem` and `FaqGroup`

## 4. Section Mapping

### Figma: `Sections`

Map to code components:

- `Hero section` -> `HeroSection`
- `Technologies` -> `TechnologiesSection`
- `Services` -> `ServicesSection`
- `Industries` -> `IndustriesSection`
- `What we offer` -> `WhatWeOfferSection`
- `What we can help with` -> `WhatWeCanHelpSection`
- `How we do it` -> `HowWeDoItSection`
- `How it works` -> `HowItWorksSection`
- `Standards & compliance` -> `StandardsSection`
- `Benefits` -> `BenefitsSection`
- `Directions` -> `DirectionsSection`
- `Testimonials` -> `TestimonialsSection`
- `Blog` -> `BlogSection`
- `Video` -> `VideoSection`
- `Case study` -> `CaseStudySection`
- `FAQ` -> `FaqSection`
- `Careers` -> `CareersSection`
- `Certifications` -> `CertificationsSection`
- `Footer` -> `SiteFooter`

## 5. Shell Mapping

### Figma

- `Navigation bar`
- `Footer`
- `Hero section`

### Astro targets

- `SiteHeader`
- `PrimaryNav`
- `SiteFooter`
- `MarketingLayout`

## 6. Page Template Mapping

Recommended route template layer:

- `MarketingHomePage`
- `MarketingListingPage`
- `MarketingDetailPage`
- `CareersPage`
- `CareerDetailPage`
- `ContactPage`
- `HireUsPage`
- `ArticlesIndexPage`
- `ArticlePage`
- `PolicyPage`

## 7. Data Mapping

The redesign should separate data from presentation:

- mirrored HTML remains source content reference;
- extracted route content becomes structured props/data;
- section components receive normalized content objects instead of raw copied HTML fragments.

## 8. Missing or Partial Mapping Areas

These areas need explicit follow-up before implementation is declared complete:

- final article index/article detail design source
- final about-us page source
- final contacts/hire-us page source
- final privacy-policy styling source
- final careers/job/apply template source

## 9. Implementation Consequence

The correct path is:

1. create a token layer;
2. build primitives;
3. build cards and sections;
4. wire page templates;
5. migrate real routes from mirrored HTML into structured Astro pages.

The wrong path would be:

- rewriting `public/*.html` directly into one-off redesigned static documents.
