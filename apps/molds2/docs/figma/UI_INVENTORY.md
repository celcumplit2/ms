# Moldstud UI Inventory

## Inventory Rules

- Source: `https://www.figma.com/design/ZUj7In473NjYDV6JkYCxoX/Moldstud`
- Inventory date: `2026-03-24`
- Goal: identify reusable UI building blocks before implementation starts.

## 1. Foundations

### Typography

- `Desktop`
- `Mobile`

Expected implementation output:

- desktop heading scale
- mobile heading scale
- body sizes
- label/caption/supporting text sizes

### Color System

- `Backgrounds`
- `Green shades`
- `Red shades`
- `Blue grey shades`
- `Blue shades`

Expected implementation output:

- semantic background tokens
- semantic text tokens
- semantic accent/status tokens
- border/surface states

### Iconography

- `Remix icons`
- `All the flags`

Expected implementation output:

- unified icon wrapper
- normalized stroke/size behavior
- flag asset handling strategy

## 2. Interaction Primitives

### Buttons

- `Primary Button - Desktop`
- `Primary Button - Mobile`
- `Primary Extra Button - Desktop`
- `Secondary Button - Desktop`
- `Secondary Button - Mobile`
- `Tertiary Button - Desktop`
- `Tertiary Button - Mobile`
- `Play Button`
- `Link`

### Labels

- `Label`
- `Section label`

### Links

- `Title link`

### Controllers

- `Slider button`
- `Slider controller`
- `Filter`
- `Switcher Theme`
- `Theme Btn`
- `Skill tag - Desktop`

### Navigation

- `Navigation bar`

## 3. Content Components

### Card Families

- `Technology category card`
- `Article card`
- `Service card`
- `Candidate card`
- `FAQ`
- `Industry card`
- `Benefits card`
- `Direction card`
- `Testimonials card`

## 4. Section Components

### Marketing Sections

- `Hero section`
- `Technologies`
- `Services`
- `What we offer`
- `What we can help with`
- `How we do it`
- `How it works`
- `Industries`
- `Standards & compliance`
- `Benefits`
- `Directions`
- `Testimonials`
- `Blog`
- `Video`
- `Case study`
- `FAQ`
- `Careers`
- `Certifications`
- `Footer`

## 5. Page Templates

### Main Template Page: `UI Design`

- `Home page`
- `Lista de servicii`
- `Detalii servicii`
- `Lista industriilor`
- `Pagina industriei`
- `Pagina lista tehnologii`
- `Pagina unei tehnologii`
- `Pagina tipuri de dezvoltare`
- `Pagina tipului de dezvoltare`

### Reference/Moodboard Page

- `Blog`
- `Blog: Article page`
- `Cariere: pagina principala`
- `Job page`
- `Job page: Apply`
- `Hire us page`
- `Case studies list`
- `Case study - page -- de mai lucrat`
- `Person page`
- `Request More Profiles`
- `Talents -> Designers`

## 6. Inventory-to-Code Translation

### Should become primitives

- buttons
- labels
- links
- icons
- theme switch
- filter controls

### Should become reusable components

- cards
- FAQ item/group
- testimonial units
- section headers
- navigation/header/footer

### Should become section blocks

- hero
- services
- industries
- technologies
- blog
- benefits
- standards/compliance
- case study
- testimonials

### Should become route templates

- home
- listing pages
- detail pages
- careers/job
- blog/article
- contact/hire-us

## 7. Immediate Inventory Conclusions

1. The Figma file is structured well enough to support a real design-system implementation.
2. The new codebase should be assembled bottom-up: `tokens -> primitives -> cards/sections -> page templates`.
3. The current repo does not yet expose this structure in runtime code, so the redesign requires componentization work, not just CSS repainting.
