# TASK_REGISTRY

## Front Status Summary

| Front | Name | Tasks | Status |
| :---- | :--- | :---- | :----- |
| F1 | Discovery and structure survey | 02, 03 | verified |
| F2 | Visual shell reproduction | 04, 05 | verified |
| F3 | Page templates | 05, 06, 07 | verified |
| F4 | Content and routing | 04, 06, 07, 08 | verified |
| F5 | Infrastructure baseline | 01 | verified |
| F6 | QA parity and handover | 09, 10 | in_progress |

## Front Reports

### F1 - Discovery and Structure Survey

- Planned:
  - Inspect the original homepage through Playwright.
  - Capture first-contour routes, header/footer navigation, template families, and 10 article candidates.
- Actual:
  - Captured header and footer links, first-contour URLs, 10 article sample routes, and page-template summaries.
  - Saved original HTML snapshots for all mirrored routes.
  - Captured original screenshot evidence for all 21 mirrored routes.
- Changed files:
  - `scripts/mirror-moldstud.mjs`
  - `artifacts/discovery/*`
  - `artifacts/snapshots/html/original/*`
  - `artifacts/screenshots/original/*`
- Artifacts:
  - `artifacts/discovery/page-map.md`
  - `artifacts/discovery/header-links.json`
  - `artifacts/discovery/footer-links.json`
  - `artifacts/discovery/selected-articles.json`
  - `artifacts/discovery/page-summaries.json`
  - `artifacts/data/page-evidence-summary.json`
- Verification:
  - Discovery outputs match the agreed phase-1 scope and provide a usable route/template map.

### F2 - Visual Shell Reproduction

- Planned:
  - Reproduce header, footer, navigation shell, and homepage composition as closely as possible to the source site.
- Actual:
  - Mirrored the rendered homepage and shell pages into local static HTML.
  - Preserved header/footer navigation and the visible UI structure for the homepage and all first-contour pages.
  - Captured original/local screenshot pairs for every mirrored route.
- Changed files:
  - `public/index.html`
  - `public/services/index.html`
  - `public/careers/index.html`
  - `public/about-us/index.html`
  - `public/contacts/index.html`
  - `public/hire-us/index.html`
  - `public/industries/index.html`
  - `public/solutions/index.html`
  - `public/technologies/index.html`
  - `public/articles/index.html`
  - `public/privacy-policy/index.html`
- Artifacts:
  - `artifacts/screenshots/original/*`
  - `artifacts/screenshots/local/*`
  - `artifacts/data/page-evidence-summary.json`
- Verification:
  - Every mirrored route now has a screenshot pair and a source HTML snapshot.

### F3 - Page Templates

- Planned:
  - Reproduce the homepage template, the first-contour page templates, and an article detail template.
- Actual:
  - Mirrored 8 template families across 21 routes:
    - `homepage`
    - `marketing-listing-with-form`
    - `careers-page`
    - `about-page`
    - `contact-form-page`
    - `articles-index`
    - `policy-page`
    - `article-detail`
  - Added page-level evidence linking each route to its template and screenshot pair.
- Changed files:
  - `public/*.html`
  - `public/articles/*/index.html`
  - `artifacts/discovery/page-summaries.json`
  - `artifacts/data/mirrored-pages.json`
  - `artifacts/data/page-evidence-summary.json`
- Artifacts:
  - `artifacts/discovery/page-summaries.json`
  - `artifacts/data/mirrored-pages.json`
  - `artifacts/data/page-evidence-summary.json`
- Verification:
  - Every mirrored route is classified, screenshot-backed, and stored with a local output file.

### F4 - Content and Routing

- Planned:
  - Preserve visible content and assets without editorial changes.
  - Keep routing coherent inside the agreed scope.
- Actual:
  - Downloaded and rewrote all required assets for the 21 mirrored pages.
  - Preserved local navigation within the mirrored scope.
  - Kept out-of-scope internal links pointed at the original domain to avoid fake routes.
  - Verified local route responses and preserved local content rendering across the full mirrored set.
- Changed files:
  - `public/images/**/*`
  - `public/uploads/**/*`
  - `public/mirror-assets/**/*`
  - `public/favicons/**/*`
  - `public/local-enhancements.js`
- Artifacts:
  - `artifacts/data/mirrored-pages.json`
  - `artifacts/data/local-route-check.json`
  - `artifacts/data/sync-summary.txt`
  - `artifacts/data/page-evidence-summary.json`
- Verification:
  - All 21 mirrored routes returned HTTP `200` in `artifacts/data/local-route-check.json`.

### F5 - Infrastructure Baseline

- Planned:
  - Create a clean Node.js/Git/Cloudflare Pages baseline.
- Actual:
  - Bootstrapped Astro static project settings.
  - Added build, preview, check, and sync scripts.
  - Verified local diagnostics and production build.
- Changed files:
  - `package.json`
  - `package-lock.json`
  - `astro.config.mjs`
  - `README.md`
- Artifacts:
  - `artifacts/data/check-summary.txt`
  - `artifacts/data/build-summary.txt`
  - `artifacts/data/dist-files.txt`
- Verification:
  - `npm run check` passes with 0 errors, 0 warnings, 0 hints.
  - `npm run build` completes and outputs `dist/`.

### F6 - QA Parity and Handover

- Planned:
  - Capture mismatches, verify behavior on key pages, and prepare handover-ready documentation.
- Actual:
  - Expanded parity evidence from representative pairs to full scope coverage: all 21 mirrored routes now have original/local screenshot pairs.
  - Verified behavior for `services`, `industries`, `solutions`, and `technologies` filters.
  - Verified contact-form structure for `/contacts` and `/hire-us`.
  - Generated `artifacts/data/page-evidence-summary.json` and refreshed reporting files to reference the full audit base.
- Changed files:
  - `PARITY_AUDIT.md`
  - `ARTIFACT_INDEX.md`
  - `TASK_REGISTRY.md`
  - `IMPLEMENTATION_LOG.md`
  - `README.md`
  - `PROJECT_MAP.md`
  - `CHANGELOG_MOLDS2.md`
  - `artifacts/data/local-behavior-checks.json`
  - `artifacts/data/page-evidence-summary.json`
  - `artifacts/screenshots/original/*`
  - `artifacts/screenshots/local/*`
- Artifacts:
  - `artifacts/screenshots/original/*`
  - `artifacts/screenshots/local/*`
  - `artifacts/data/local-behavior-checks.json`
  - `artifacts/data/page-evidence-summary.json`
- Verification:
  - Full screenshot coverage exists for the mirrored scope.
  - Final mismatch consolidation and handover sign-off are still open, so this front remains `in_progress`.

## Task Registry

| Task | Source | Goal | Front | Status | Implementation | Verification | Audit |
| :--- | :----- | :--- | :---- | :----- | :------------- | :----------- | :---- |
| 01 Foundation and Bootstrap | `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/01_foundation_and_bootstrap.md` | Build the Node.js/Git/Cloudflare Pages baseline | F5 | verified | `package.json`, `package-lock.json`, `astro.config.mjs`, `README.md` | `artifacts/data/check-summary.txt`, `artifacts/data/build-summary.txt`, `artifacts/data/dist-files.txt` | `PARITY_AUDIT.md` |
| 02 Site Discovery via Playwright | `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/02_site_discovery_playwright.md` | Capture first-contour URLs, reusable structures, and article candidates | F1 | verified | `scripts/mirror-moldstud.mjs`, `artifacts/discovery/*`, `artifacts/snapshots/html/original/*` | `artifacts/discovery/page-map.md`, `artifacts/discovery/header-links.json`, `artifacts/discovery/footer-links.json`, `artifacts/discovery/selected-articles.json`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md` |
| 03 Design Capture | `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/03_design_capture.md` | Capture layout, visual rules, and reusable blocks | F1 | verified | `artifacts/discovery/page-summaries.json`, `artifacts/screenshots/original/*`, `artifacts/screenshots/local/*` | `artifacts/discovery/page-summaries.json`, `artifacts/screenshots/original/*`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md` |
| 04 Header, Footer, Navigation | `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/04_header_footer_nav.md` | Reproduce shell navigation and routing | F2, F4 | verified | `public/index.html`, `public/services/index.html`, `public/about-us/index.html`, `public/contacts/index.html`, `public/hire-us/index.html`, `public/articles/index.html` | `artifacts/discovery/header-links.json`, `artifacts/discovery/footer-links.json`, `artifacts/data/local-route-check.json`, `artifacts/screenshots/original/*`, `artifacts/screenshots/local/*` | `PARITY_AUDIT.md` |
| 05 Homepage Reproduction | `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/05_homepage_reproduction.md` | Reproduce the homepage with maximum visual and structural parity | F2, F3 | verified | `public/index.html`, `public/images/home/*`, `public/videos/home-page-main.mp4`, `public/_next/*` | `artifacts/screenshots/original/home.png`, `artifacts/screenshots/local/home.png`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md` |
| 06 Static Pages Reproduction | `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/06_static_pages_reproduction.md` | Reproduce first-contour static pages | F3, F4 | verified | `public/services/index.html`, `public/careers/index.html`, `public/about-us/index.html`, `public/contacts/index.html`, `public/hire-us/index.html`, `public/industries/index.html`, `public/solutions/index.html`, `public/technologies/index.html`, `public/articles/index.html`, `public/privacy-policy/index.html` | `artifacts/data/local-route-check.json`, `artifacts/discovery/page-summaries.json`, `artifacts/screenshots/original/*`, `artifacts/screenshots/local/*`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md` |
| 07 Blog Sample Pages | `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/07_blog_sample_pages.md` | Reproduce 10 real article pages as template proof | F3, F4 | verified | `public/articles/p-*/index.html` | `artifacts/data/mirrored-pages.json`, `artifacts/screenshots/original/article-*.png`, `artifacts/screenshots/local/article-*.png`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md` |
| 08 Content and Assets Capture | `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/08_content_and_assets_capture.md` | Preserve assets and visible content without substitution | F4 | verified | `public/images/**/*`, `public/uploads/**/*`, `public/mirror-assets/**/*`, `public/videos/**/*`, `public/favicons/**/*` | `artifacts/data/sync-summary.txt`, `artifacts/data/local-route-check.json`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md` |
| 09 QA and Visual Parity | `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/09_qa_visual_parity.md` | Capture mismatches and verify parity of key pages | F6 | in_progress | `PARITY_AUDIT.md`, `artifacts/screenshots/local/*`, `artifacts/data/local-behavior-checks.json`, `artifacts/data/page-evidence-summary.json` | `artifacts/screenshots/original/*`, `artifacts/screenshots/local/*`, `artifacts/data/local-behavior-checks.json`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md` |
| 10 Deploy and Handover | `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/10_deploy_and_handover.md` | Prepare deployment and clean handover package | F6 | in_progress | `README.md`, `PROJECT_MAP.md`, `TASK_REGISTRY.md`, `IMPLEMENTATION_LOG.md`, `DECISIONS.md`, `ARTIFACT_INDEX.md`, `CHANGELOG_MOLDS2.md` | `artifacts/data/build-summary.txt`, `artifacts/data/dist-files.txt`, `artifacts/data/page-evidence-summary.json` | `PARITY_AUDIT.md`, `ARTIFACT_INDEX.md` |

## Status Rules

- `pending` - registered but not started
- `in_progress` - implementation or verification is still active
- `blocked` - cannot proceed literally; reason must be documented
- `done` - implemented, but audit coverage is not yet complete
- `verified` - implemented and backed by explicit artifacts
