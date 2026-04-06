# PROJECT_MAP

## Current State

- Source URL: `https://moldstud.com/`
- Phase-1 baseline: reproduce the public MoldStud site inside our infrastructure with maximum external parity.
- Current objective: use the approved Figma file to deliver the new light-theme runtime in `src/`, cover all required page types, and keep demo data swap-friendly until real content arrives.
- Phase 1 scope: homepage, first-contour pages reachable from header/footer navigation, and 10 article detail pages.
- Active front: `F7 - Figma redesign implementation correction`

Current front status:

- `F1 - Discovery and structure survey`: `verified`
- `F2 - Visual shell reproduction`: `verified`
- `F3 - Page templates`: `verified`
- `F4 - Content and routing`: `verified`
- `F5 - Project infrastructure`: `verified`
- `F6 - QA parity and handover`: `paused`
- `F7 - Figma redesign implementation correction`: `in_progress`

No document was ignored. One requirement could not be applied literally at first: the archive package did not contain the original site URL, so Task 02 remained blocked until the user supplied `https://moldstud.com/` in chat on `2026-03-20`. After that, the blocker was cleared and the discovery/reproduction fronts were reopened.

User direction changed on `2026-03-24`: the mirror phase remains the baseline, but the active workstream is now the Figma-driven redesign track. That user instruction supersedes the earlier no-redesign constraint for new work.

## Document Index

### Governing Documents

- `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
  - Exact reproduction is the primary rule.
  - No redesign, no self-directed UX changes, no invented content.
- `docs/source/MOLDS2_docs_base/base/03_RULES_OF_THE_GAME.md`
  - The original site is the source of truth.
  - Work from structure first, then reproduction.
  - Keep the agreed scope limited to the first contour plus article samples.
- `docs/source/MOLDS2_docs_base/base/02_BRIEF_MOLDS2.md`
  - Defines the business purpose, the use of Playwright, and the phase-1 scope.

### Task-Level Documents

- `docs/source/MOLDS2_docs_tasks/tasks/05_FRONTS_BREAKDOWN.md`
- `docs/source/MOLDS2_docs_tasks/tasks/06_CODEX_TASKFRAME.md`
- `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/01_foundation_and_bootstrap.md`
- `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/02_site_discovery_playwright.md`
- `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/03_design_capture.md`
- `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/04_header_footer_nav.md`
- `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/05_homepage_reproduction.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/06_static_pages_reproduction.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/07_blog_sample_pages.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/08_content_and_assets_capture.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/09_qa_visual_parity.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/10_deploy_and_handover.md`

### Acceptance and Delivery Criteria

- `docs/source/MOLDS2_docs_base/base/04_ACCEPTANCE_CRITERIA.md`
- `docs/source/MOLDS2_docs_tasks/tasks/07_DELIVERABLES_AND_ARTIFACTS.md`
- `docs/source/MOLDS2_docs_tasks/tasks/08_REPO_AND_DEPLOY_BASELINE.md`

### Supplemental Implementation Briefs

- `docs/source/MOLDS2_implementation_briefs/briefs/01_CLOUDFLARE_60K_PUBLISHING_BRIEF.md`
  - Recommended Cloudflare architecture for operating approximately `60,000` pages with separate image storage, hybrid page delivery, and live comments.
- `docs/source/MOLDS2_implementation_briefs/briefs/02_CLOUDFLARE_60K_IMPLEMENTATION_PLAN.md`
  - Sprint-oriented implementation plan and backlog for delivering the `60,000`-page Cloudflare operating model.
- `docs/source/MOLDS2_implementation_briefs/briefs/03_CLOUDFLARE_60K_DEVELOPER_BACKLOG.md`
  - Concrete developer-owned execution backlog for implementing the `60,000`-page Cloudflare architecture.
- `docs/source/MOLDS2_implementation_briefs/briefs/04_CLOUDFLARE_60K_WORKING_DECISIONS.md`
  - Fixed initial execution decisions for hostname strategy and launch comment storage.
- `docs/source/MOLDS2_implementation_briefs/briefs/05_CLOUDFLARE_ENV_AND_DEPLOY_MATRIX.md`
  - Template-level Cloudflare env, binding, and deploy-target matrix for the 60k-page operating model.

### Figma Redesign Task Pack

- `docs/figma/moldstud_figma_codex/00_README.md`
- `docs/figma/moldstud_figma_codex/01_MASTER_PROMPT.md`
- `docs/figma/moldstud_figma_codex/02_FIGMA_AUDIT_TASK.md`
- `docs/figma/moldstud_figma_codex/03_UI_INVENTORY_TASK.md`
- `docs/figma/moldstud_figma_codex/04_DESIGN_SYSTEM_TASK.md`
- `docs/figma/moldstud_figma_codex/05_MAPPING_AND_GAPS_TASK.md`
- `docs/figma/moldstud_figma_codex/06_IMPLEMENTATION_TASK.md`
- `docs/figma/moldstud_figma_codex/07_QA_ACCEPTANCE_TASK.md`

### Figma Redesign Outputs

- `docs/figma/FIGMA_AUDIT.md`
  - Audit of the live Figma file structure, maturity, and production-readiness.
- `docs/figma/UI_INVENTORY.md`
  - Inventory of tokens, primitives, cards, sections, and page templates found in Figma.
- `docs/figma/DESIGN_TOKENS.md`
  - Code-oriented token model inferred from the Figma file and implementation constraints.
- `docs/figma/COMPONENT_MAPPING.md`
  - Mapping between Figma structures, Astro runtime components, and site routes.
- `docs/figma/GAP_REPORT.md`
  - Open design/product gaps, unresolved review items, and implementation blockers.
- `docs/figma/IMPLEMENTATION_PLAN.md`
  - Ordered redesign rollout plan from token layer to route migration.
- `docs/figma/REDESIGN_WORK_PLAN.md`
  - Delivery-mode work plan for the redesign: `light` variant first, all page types implemented, and demo content used where real data is still missing.
- `docs/figma/REPORT.md`
  - PASS/FAIL tracker for the Figma task-pack stages plus implementation and QA completion evidence.

### Constraint and Prohibition Documents

- `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
- `docs/source/MOLDS2_docs_base/base/03_RULES_OF_THE_GAME.md`
- `docs/source/MOLDS2_docs_base/base/04_ACCEPTANCE_CRITERIA.md`
- `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/02_site_discovery_playwright.md`
- `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/05_homepage_reproduction.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/06_static_pages_reproduction.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/08_content_and_assets_capture.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/09_qa_visual_parity.md`
- `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/10_deploy_and_handover.md`

## Conflict Priority

If documents disagree, the project uses this order:

1. Manifest and Rules of the Game
2. Brief
3. Acceptance Criteria
4. Task Files
5. Internal engineering preferences

## Front Map

| Front | Goal | Tasks | Status | Main Evidence |
| :---- | :--- | :---- | :----- | :------------ |
| F1 | Discovery and structure survey | 02, 03 | verified | `artifacts/discovery/`, `artifacts/screenshots/original/`, `artifacts/snapshots/html/original/` |
| F2 | Visual shell reproduction | 04, 05 | verified | `public/index.html`, `artifacts/screenshots/original/home.png`, `artifacts/screenshots/local/home.png` |
| F3 | Page templates | 05, 06, 07 | verified | `artifacts/discovery/page-summaries.json`, `artifacts/data/mirrored-pages.json`, `artifacts/data/page-evidence-summary.json` |
| F4 | Content and routing | 04, 06, 07, 08 | verified | `public/`, `artifacts/data/local-route-check.json`, `artifacts/screenshots/original/`, `artifacts/screenshots/local/` |
| F5 | Infrastructure baseline | 01 | verified | `package.json`, `astro.config.mjs`, `artifacts/data/check-summary.txt`, `artifacts/data/build-summary.txt` |
| F6 | QA parity and handover | 09, 10 | paused | `PARITY_AUDIT.md`, `ARTIFACT_INDEX.md`, `artifacts/data/local-behavior-checks.json`, `artifacts/data/page-evidence-summary.json` |
| F7 | Figma redesign implementation correction | `docs/figma/moldstud_figma_codex/*` | in_progress | `src/`, `docs/figma/REPORT.md`, `docs/figma/REDESIGN_WORK_PLAN.md`, `docs/figma/IMPLEMENTATION_PLAN.md` |

## Repository Map

- `docs/source/`
  - Imported project knowledge base. This is the governing source for scope, priority, acceptance, and execution rules.
- `docs/figma/moldstud_figma_codex/`
  - Task pack for the new Figma-driven redesign track.
- `docs/figma/`
  - Audit, inventory, token, mapping, gap, and rollout artifacts for the redesign track.
- `docs/source/MOLDS2_implementation_briefs/briefs/`
  - Supplemental implementation briefs for scale, deployment, and operating-model decisions beyond the phase-1 mirror.
- `artifacts/reference/mirrored-public-routes/`
  - Archived phase-1 mirrored HTML routes moved out of `public/` so the redesign runtime can own the active route tree without deleting the original reference baseline.
- `scripts/mirror-moldstud.mjs`
  - Main sync engine. Discovers routes, captures HTML snapshots, mirrors assets, rewrites links, and injects minimal local behavior fixes where needed.
- `worker/index.ts`
  - Initial Worker entrypoint skeleton for API health checks, future route resolution, and asset passthrough.
- `wrangler.jsonc.example`
  - Template Wrangler configuration for the future Cloudflare deployment baseline.
- `public/`
  - Mirrored asset reservoir used by the redesign runtime for legacy images, fonts, CSS, and supporting static files. The primary route layer no longer lives here.
- `public/local-enhancements.js`
  - Minimal behavior-restoration layer for static pages where the original client runtime is not present.
- `artifacts/discovery/`
  - Header/footer links, first-contour URLs, selected article pages, page summaries, and page map.
- `artifacts/snapshots/html/original/`
  - Saved original HTML snapshots for all mirrored routes.
- `artifacts/screenshots/original/`
  - Original reference screenshots used for parity checks.
- `artifacts/screenshots/local/`
  - Local implementation screenshots and behavior screenshots.
- `artifacts/data/`
  - Check/build logs, mirrored page index, route checks, behavior checks, git state, and auxiliary proof files.
- `artifacts/data/page-evidence-summary.json`
  - Machine-readable route registry that connects mirrored paths, templates, screenshot pairs, and original snapshots.
- `dist/`
  - Cloudflare-ready static build output produced by `npm run build`.
- `src/`
  - Active Astro redesign runtime containing typed data, layouts, components, styles, and all current route templates.
- `package.json`
  - Project scripts and dependency entry point.
- `astro.config.mjs`
  - Astro static build configuration.

## Scope Actually Mirrored

- Homepage: `/`
- First-contour pages:
  - `/services`
  - `/careers`
  - `/about-us`
  - `/contacts`
  - `/hire-us`
  - `/industries`
  - `/solutions`
  - `/technologies`
  - `/articles`
  - `/privacy-policy`
- Article sample pages:
  - listed in `artifacts/discovery/selected-articles.json`

## Literal Exceptions and Limits

- The original runtime was not carried over literally. The project keeps the rendered HTML/CSS/assets and serves them through our Astro static stack.
- Out-of-scope internal links remain pointed at the original site instead of fake local placeholders.
- Cookie consent overlay and form submission backends were not recreated as guesses. They are documented in `PARITY_AUDIT.md` as near-match gaps or scope limits.
- Visual evidence is now complete for the full mirrored scope, but the final acceptance sweep is still open because all mismatches and behavior limits still need one last consolidated review.
- The redesign runtime intentionally uses structured demo content where final production data is not yet available. That is a tracked delivery choice, not an omission.
