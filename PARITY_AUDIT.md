# PARITY_AUDIT

## Audit Scope

- Original source: `https://moldstud.com/`
- Local audited preview: `http://127.0.0.1:8800/`
- Mirrored routes: `21`
- Template families reproduced: `8`
- Visual coverage:
  - `21` original page screenshots
  - `21` local page screenshots
  - `6` extra local behavior screenshots
- Machine-readable coverage map:
  - `artifacts/data/page-evidence-summary.json`

## Global Coverage

- Route coverage:
  - `artifacts/data/local-route-check.json` confirms HTTP `200` for all 21 mirrored routes.
- Structure coverage:
  - `artifacts/discovery/page-summaries.json` captures the 8 reusable template families.
  - `artifacts/data/page-evidence-summary.json` maps every mirrored route to its template, screenshot pair, and original HTML snapshot.
- Discovery coverage:
  - `artifacts/discovery/header-links.json`
  - `artifacts/discovery/footer-links.json`
  - `artifacts/discovery/urls-first-contour.json`
  - `artifacts/discovery/selected-articles.json`
  - `artifacts/discovery/page-map.md`
- Behavior coverage:
  - `artifacts/data/local-behavior-checks.json`
  - verified filters on `/services`, `/industries`, `/solutions`, `/technologies`
  - verified local form structure on `/contacts` and `/hire-us`
- Visual coverage:
  - representative top-level screenshot pairs now exist for every mirrored route
  - representative behavior screenshots exist for shared-filter pages and the services FAQ

## Known Cross-Site Differences

- Cookie consent overlay visible in some original sessions is not mirrored locally.
- Original scripts/runtime were removed; the local implementation keeps static rendered output plus mirrored assets.
- Forms and article comments are visual only and have no local submission backend.
- Internal links outside the agreed mirrored scope stay pointed to `https://moldstud.com`.
- Some article screenshots use viewport capture rather than full-page capture because long original pages exceeded browser screenshot limits during `Page.captureScreenshot`. HTML snapshots and route evidence still exist for those pages.

## Template Coverage Summary

| Template | Routes | Status | Evidence |
| :------- | :----- | :----- | :------- |
| `homepage` | `/` | near-match | `artifacts/screenshots/original/home.png`, `artifacts/screenshots/local/home.png` |
| `marketing-listing-with-form` | `/services`, `/industries`, `/solutions`, `/technologies` | near-match | `artifacts/screenshots/original/services.png`, `artifacts/screenshots/original/industries.png`, `artifacts/screenshots/original/solutions.png`, `artifacts/screenshots/original/technologies.png`, `artifacts/data/local-behavior-checks.json` |
| `careers-page` | `/careers` | near-match | `artifacts/screenshots/original/careers.png`, `artifacts/screenshots/local/careers.png` |
| `about-page` | `/about-us` | near-match | `artifacts/screenshots/original/about-us.png`, `artifacts/screenshots/local/about-us.png` |
| `contact-form-page` | `/contacts`, `/hire-us` | near-match | `artifacts/screenshots/original/contacts.png`, `artifacts/screenshots/original/hire-us.png`, `artifacts/data/local-behavior-checks.json` |
| `articles-index` | `/articles` | near-match | `artifacts/screenshots/original/articles-index.png`, `artifacts/screenshots/local/articles-index.png` |
| `policy-page` | `/privacy-policy` | near-match | `artifacts/screenshots/original/privacy-policy.png`, `artifacts/screenshots/local/privacy-policy.png` |
| `article-detail` | 10 selected article pages | near-match | `artifacts/screenshots/original/article-*.png`, `artifacts/screenshots/local/article-*.png`, `artifacts/data/page-evidence-summary.json` |

No template is currently marked `match`, because the project still carries the documented runtime/backend gaps above.

## Per-Page Matrix

This matrix is the page-level registry required by the project rules. Structural details are defined in the template sections below; each route inherits the structural audit of its template family plus its page-specific note here.

| Path | Template | Status | Evidence | Page-specific note |
| :--- | :------- | :----- | :------- | :----------------- |
| `/` | `homepage` | near-match | `home.png` pair | Global cookie/runtime gap only |
| `/services` | `marketing-listing-with-form` | near-match | `services.png` pair + `services-search-cloud.png` + `services-faq-open.png` | Filter and FAQ verified; form remains visual-only |
| `/careers` | `careers-page` | near-match | `careers.png` pair | Global cookie/runtime gap only |
| `/about-us` | `about-page` | near-match | `about-us.png` pair | Global cookie/runtime gap only |
| `/contacts` | `contact-form-page` | near-match | `contacts.png` pair | Form structure verified; no local submit backend |
| `/hire-us` | `contact-form-page` | near-match | `hire-us.png` pair | Form structure verified; no local submit backend |
| `/industries` | `marketing-listing-with-form` | near-match | `industries.png` pair + `industries-filter-automotive.png` | Filter verified; form remains visual-only |
| `/solutions` | `marketing-listing-with-form` | near-match | `solutions.png` pair + `solutions-filter-chatbots.png` | Filter verified; form remains visual-only |
| `/technologies` | `marketing-listing-with-form` | near-match | `technologies.png` pair + `technologies-filter-javascript.png` | Filter verified; form remains visual-only |
| `/articles` | `articles-index` | near-match | `articles-index.png` pair | Selected local article routes preserved; deeper links may leave local scope |
| `/privacy-policy` | `policy-page` | near-match | `privacy-policy.png` pair | Static content mirror; global runtime/cookie gap only |
| `/articles/p-a-beginners-guide-to-api-testing-tools-and-techniques-explained` | `article-detail` | near-match | `article-api-testing.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-the-versatility-of-net-why-it-fits-every-project-for-seamless-development` | `article-detail` | near-match | `article-net.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-maximize-your-on-demand-service-apps-reach-leveraging-influencer-marketing-strategies` | `article-detail` | near-match | `article-influencer.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-harnessing-the-power-of-graph-databases-essential-tips-and-tricks-for-effective-querying` | `article-detail` | near-match | `article-graph-db.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-understanding-modem-specs-what-do-mbps-latency-and-key-terms-mean` | `article-detail` | near-match | `article-modem.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-10-essential-tips-for-seamlessly-integrating-php-with-html-and-css` | `article-detail` | near-match | `article-php-html-css.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-essential-strategies-for-ensuring-network-security-in-infrastructure-management` | `article-detail` | near-match | `article-network-security.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-optimizing-your-job-search-headlines-that-align-software-architecture-trends-with-reader-interests` | `article-detail` | near-match | `article-job-search.png` pair | Leaner original structure preserved as-is; related links may be external |
| `/articles/p-creating-intuitive-app-uis-lessons-from-design-communities` | `article-detail` | near-match | `article-app-uis.png` pair | Comment form visual-only; related links may be external |
| `/articles/p-essential-tips-for-effective-collaboration-with-technology-consultants-in-product-development` | `article-detail` | near-match | `article-consultants.png` pair | Comment form visual-only; related links may be external |

## Template Reference Audit

### Homepage Template

- Covered routes:
  - `/`
- Structure blocks:
  - header navigation with logo and homepage shell
  - hero section with H1, CTA, and media
  - service grid
  - WCAG CTA section
  - benefits/value sections
  - content cards
  - consultation form
  - footer navigation
- Key interface elements:
  - logo
  - top navigation
  - CTA buttons
  - hero media
  - icon/card grids
  - consultation form
  - footer navigation
- Text zones:
  - H1: `Together, We Can Redefine Technology Through Accessible Design and Development`
  - H2 outline stored in `artifacts/discovery/page-summaries.json`
- Media:
  - `public/videos/home-page-main.mp4`
  - `public/images/home/*`
  - mirrored CSS/fonts under `public/_next/`
- Navigation:
  - local header/footer links preserved for mirrored routes
  - deeper out-of-scope links remain on the original domain
- Evidence:
  - `artifacts/screenshots/original/home.png`
  - `artifacts/screenshots/local/home.png`
  - `artifacts/snapshots/html/original/home/index.html`
- Differences:
  - cookie overlay not mirrored
  - original runtime-side effects reduced to static output
- Status:
  - `near-match`

### Marketing Listing with Form Template

- Covered routes:
  - `/services`
  - `/industries`
  - `/solutions`
  - `/technologies`
- Structure blocks:
  - breadcrumb
  - hero and founder/intro block
  - searchable tag cloud
  - case studies or route-specific content cards
  - benefits grid
  - WCAG CTA block
  - FAQ block
  - consultation form
  - footer
- Key interface elements:
  - search field
  - tag cloud
  - case study cards
  - FAQ toggles
  - consultation form
  - shared header/footer shell
- Text zones:
  - route-specific H1/H2 values are stored in `artifacts/discovery/page-summaries.json`
- Media:
  - route-specific images under `public/images/*`
  - consultation and WCAG media blocks
- Navigation:
  - local header/footer links preserved
  - consultation CTA anchors preserved
- Evidence:
  - `artifacts/screenshots/original/services.png`
  - `artifacts/screenshots/local/services.png`
  - `artifacts/screenshots/original/industries.png`
  - `artifacts/screenshots/local/industries.png`
  - `artifacts/screenshots/original/solutions.png`
  - `artifacts/screenshots/local/solutions.png`
  - `artifacts/screenshots/original/technologies.png`
  - `artifacts/screenshots/local/technologies.png`
  - `artifacts/data/local-behavior-checks.json`
- Differences:
  - filter restoration is provided locally by `public/local-enhancements.js`
  - consultation forms are visual only
  - cookie overlay not mirrored
- Status:
  - `near-match`

### Careers Page Template

- Covered routes:
  - `/careers`
- Structure blocks:
  - hero
  - career cards/listing
  - benefits/highlight sections
  - footer shell
- Key interface elements:
  - headline
  - role cards
  - shared navigation
- Text zones:
  - H1: `Do Work That Has An Impact`
- Media:
  - mirrored route assets in `public/images/careers/*`
- Navigation:
  - shared header/footer shell preserved
- Evidence:
  - `artifacts/screenshots/original/careers.png`
  - `artifacts/screenshots/local/careers.png`
  - `artifacts/snapshots/html/original/careers/index.html`
- Differences:
  - global cookie/runtime gap only
- Status:
  - `near-match`

### About Page Template

- Covered routes:
  - `/about-us`
- Structure blocks:
  - hero statement
  - company story / mission sections
  - WCAG CTA
  - footer shell
- Key interface elements:
  - hero copy
  - supporting iconography
  - shared navigation
- Text zones:
  - H1: `MoldStud Is An Innovative IT Consulting And Development Company`
- Media:
  - `public/images/about-us/*`
- Navigation:
  - shared header/footer shell preserved
- Evidence:
  - `artifacts/screenshots/original/about-us.png`
  - `artifacts/screenshots/local/about-us.png`
  - `artifacts/snapshots/html/original/about-us/index.html`
- Differences:
  - global cookie/runtime gap only
- Status:
  - `near-match`

### Contact Form Template

- Covered routes:
  - `/contacts`
  - `/hire-us`
- Structure blocks:
  - hero statement
  - form block
  - privacy acceptance row
  - footer shell
- Key interface elements:
  - text inputs
  - textarea
  - checkbox
  - submit button
- Text zones:
  - `/contacts` H1: `Got a question?`
  - `/hire-us` H1: `Got a project for us?`
- Media:
  - form-led layout with limited decorative media
- Navigation:
  - shared header/footer shell preserved
- Evidence:
  - `artifacts/screenshots/original/contacts.png`
  - `artifacts/screenshots/local/contacts.png`
  - `artifacts/screenshots/original/hire-us.png`
  - `artifacts/screenshots/local/hire-us.png`
  - `artifacts/data/local-behavior-checks.json`
- Differences:
  - no local submit backend
  - `/hire-us` includes service and budget inputs exactly as mirrored from source
- Status:
  - `near-match`

### Articles Index Template

- Covered routes:
  - `/articles`
- Structure blocks:
  - article index title
  - category/group sections
  - article card grid/list
  - shared footer shell
- Key interface elements:
  - article cards
  - grouped content blocks
  - shared navigation
- Text zones:
  - H1: `Articles`
  - H2 outline:
    - `IT careers`
    - `IT services`
    - `IT practices`
    - `Developers FAQ`
- Media:
  - article card thumbnails from mirrored assets
- Navigation:
  - selected mirrored article routes stay local
  - deeper article links can leave the local scope
- Evidence:
  - `artifacts/screenshots/original/articles-index.png`
  - `artifacts/screenshots/local/articles-index.png`
  - `artifacts/snapshots/html/original/articles/index.html`
- Differences:
  - out-of-scope article links remain external
- Status:
  - `near-match`

### Policy Page Template

- Covered routes:
  - `/privacy-policy`
- Structure blocks:
  - policy headline
  - numbered legal text sections
  - shared footer shell
- Key interface elements:
  - legal heading hierarchy
  - dense text layout
- Text zones:
  - H1: `Privacy Policy`
- Media:
  - none beyond shared shell assets
- Navigation:
  - shared header/footer shell preserved
- Evidence:
  - `artifacts/screenshots/original/privacy-policy.png`
  - `artifacts/screenshots/local/privacy-policy.png`
  - `artifacts/snapshots/html/original/privacy-policy/index.html`
- Differences:
  - global cookie/runtime gap only
- Status:
  - `near-match`

### Article Detail Template

- Covered routes:
  - 10 selected article pages listed in `artifacts/discovery/selected-articles.json`
- Structure blocks:
  - breadcrumb
  - article heading and metadata
  - article body with H2/H3 hierarchy
  - add-comment form block when present
  - related reads list
  - footer shell
- Key interface elements:
  - article title
  - section headings
  - related reads cards
  - comment form where present
- Text zones:
  - route-specific H1/H2 values are stored in `artifacts/discovery/page-summaries.json`
  - `/articles/p-optimizing-your-job-search-headlines-that-align-software-architecture-trends-with-reader-interests` is intentionally leaner because the original page is leaner
- Media:
  - thumbnails and content imagery from `public/uploads/images/*` and `public/mirror-assets/*`
- Navigation:
  - breadcrumbs preserved
  - mirrored selected article routes stay local
  - deeper related links remain on the original domain
- Evidence:
  - `artifacts/screenshots/original/article-*.png`
  - `artifacts/screenshots/local/article-*.png`
  - `artifacts/snapshots/html/original/articles/*/index.html`
  - `artifacts/data/page-evidence-summary.json`
- Differences:
  - comment forms are visual only
  - some related links remain external by design because they are outside the mirrored scope
  - cookie overlay not mirrored
- Status:
  - `near-match`

## Overall Status

- Page-level evidence exists for all `21` mirrored routes.
- Current page status distribution:
  - `near-match`: `21`
  - `mismatch`: `0`
- Remaining work:
  - perform the final mismatch sweep against the now-complete screenshot set
  - keep documenting any newly discovered deviations instead of silently normalizing them
  - finish handover-level cleanup and acceptance packaging
