# ARTIFACT_INDEX

## Required Evidence Coverage

| Requirement | Artifact |
| :---------- | :------- |
| List of researched URLs | `artifacts/discovery/urls-first-contour.json` |
| Map of pages found from the homepage | `artifacts/discovery/page-map.md` |
| Header links | `artifacts/discovery/header-links.json` |
| Footer links | `artifacts/discovery/footer-links.json` |
| Reproduced template list | `artifacts/discovery/page-summaries.json` |
| Page-to-evidence registry | `artifacts/data/page-evidence-summary.json` |
| Original screenshots | `artifacts/screenshots/original/*.png` |
| Local screenshots | `artifacts/screenshots/local/*.png` |
| Recorded mismatches | `PARITY_AUDIT.md` |
| Adaptation decisions for our stack | `DECISIONS.md` |

## Discovery Artifacts

- `artifacts/discovery/header-links.json`
  - Header link inventory from the original homepage.
- `artifacts/discovery/footer-links.json`
  - Footer link inventory from the original homepage.
- `artifacts/discovery/urls-first-contour.json`
  - First-contour route list used for the phase-1 mirror.
- `artifacts/discovery/selected-articles.json`
  - 10 selected article detail routes for the phase-1 article sample set.
- `artifacts/discovery/page-summaries.json`
  - Template classification, titles, headings, section counts, and form counts for all mirrored pages.
- `artifacts/discovery/page-map.md`
  - Human-readable page map of the homepage shell, first contour, articles, and template families.

## Original HTML Snapshots

- `artifacts/snapshots/html/original/home/index.html`
- `artifacts/snapshots/html/original/services/index.html`
- `artifacts/snapshots/html/original/careers/index.html`
- `artifacts/snapshots/html/original/about-us/index.html`
- `artifacts/snapshots/html/original/contacts/index.html`
- `artifacts/snapshots/html/original/hire-us/index.html`
- `artifacts/snapshots/html/original/industries/index.html`
- `artifacts/snapshots/html/original/solutions/index.html`
- `artifacts/snapshots/html/original/technologies/index.html`
- `artifacts/snapshots/html/original/articles/index.html`
- `artifacts/snapshots/html/original/privacy-policy/index.html`
- `artifacts/snapshots/html/original/articles/*/index.html`

Status:

- `21` original route snapshots are stored.

## Local Mirrored Output

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
- `public/articles/*/index.html`
- `public/local-enhancements.js`
- `public/_next/**/*`
- `public/images/**/*`
- `public/uploads/**/*`
- `public/mirror-assets/**/*`
- `public/videos/**/*`
- `public/favicons/**/*`

Status:

- `224` local files currently exist under `public/`.

## Screenshot Artifacts

### Page Screenshot Coverage

- `artifacts/screenshots/original/*.png`
  - `21` original screenshots covering every mirrored route.
- `artifacts/screenshots/local/*.png`
  - `21` local screenshots covering every mirrored route.
- `artifacts/data/page-evidence-summary.json`
  - Exact mapping between route, template, original screenshot, local screenshot, and original HTML snapshot.

### Extra Local Behavior Screenshots

- `artifacts/screenshots/local/services-search-cloud.png`
- `artifacts/screenshots/local/services-faq-open.png`
- `artifacts/screenshots/local/industries-filter-automotive.png`
- `artifacts/screenshots/local/solutions-filter-chatbots.png`
- `artifacts/screenshots/local/technologies-filter-javascript.png`
- `artifacts/screenshots/local/molds2-bootstrap-home.png`

Notes:

- `molds2-bootstrap-home.png` is preserved as historical evidence of the pre-source-url baseline and is no longer the current homepage state.
- Local screenshot count is currently `27` because it includes the 21 page mirrors plus 6 extra behavior/history captures.

## Verification Logs and Data

- `artifacts/data/moldstud-discovery.json`
  - Consolidated discovery export.
- `artifacts/data/mirrored-pages.json`
  - Local route-to-file mapping for all mirrored pages.
- `artifacts/data/page-evidence-summary.json`
  - Compact route registry connecting templates, screenshot pairs, and source snapshots.
- `artifacts/data/local-route-check.json`
  - HTTP `200` verification for all mirrored routes on the local preview server.
- `artifacts/data/local-behavior-checks.json`
  - Verified filters for `services / industries / solutions / technologies` and verified contact-form structure for `contacts / hire-us`.
- `artifacts/data/sync-summary.txt`
  - Latest sync run summary. Current result: `21` pages mirrored, `202` assets downloaded.
- `artifacts/data/check-summary.txt`
  - Latest `npm run check` output. Current result: `0` errors, `0` warnings, `0` hints.
- `artifacts/data/build-summary.txt`
  - Latest `npm run build` output. Build succeeds.
- `artifacts/data/dist-files.txt`
  - Output file list for `dist/`.
- `artifacts/data/git-status.txt`
  - Saved git working tree state.
- `artifacts/data/preview-server.pid`
  - Local preview server process id used during route and browser checks.

## Externalized Project Knowledge and Audit Docs

- `PROJECT_MAP.md`
- `TASK_REGISTRY.md`
- `IMPLEMENTATION_LOG.md`
- `DECISIONS.md`
- `PARITY_AUDIT.md`
- `CHANGELOG_MOLDS2.md`

## Notes

- `artifacts/data/build-summary.txt` contains one upstream Astro/Vite warning about unused imports from `@astrojs/internal-helpers/remote`. The build still completes successfully and the warning is treated as non-blocking.
