# DECISIONS

## D-001 - Use Astro static output as the phase-1 baseline

- Decision:
  - Keep the project on `Node.js + Astro static output`.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/02_BRIEF_MOLDS2.md`
  - `docs/source/MOLDS2_docs_tasks/tasks/08_REPO_AND_DEPLOY_BASELINE.md`
  - `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/01_foundation_and_bootstrap.md`
- Why this does not violate identity:
  - The documents allow internal implementation freedom as long as the external result matches the original.
  - Astro is used only as the local build/deploy shell around mirrored public output.
- Alternatives rejected:
  - Ad hoc static folder without a build pipeline.
  - A custom SSR stack not required by the phase scope.

## D-002 - Accept the user-supplied MoldStud URL as the authoritative source

- Decision:
  - Use `https://moldstud.com/` as the original site URL.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/02_BRIEF_MOLDS2.md`
  - `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/02_site_discovery_playwright.md`
  - User input on `2026-03-20`
- Why this does not violate identity:
  - The brief requires a provided homepage URL. Using the explicit URL is more faithful than guessing.
- Alternatives rejected:
  - Inferring the source site from the document names.
  - Staying blocked after the real URL was available.

## D-003 - Keep the phase scope limited to the homepage, first contour, and 10 article pages

- Decision:
  - Mirror only the agreed phase-1 route set.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/02_BRIEF_MOLDS2.md`
  - `docs/source/MOLDS2_docs_base/base/03_RULES_OF_THE_GAME.md`
  - `docs/source/MOLDS2_docs_base/base/04_ACCEPTANCE_CRITERIA.md`
  - `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/07_blog_sample_pages.md`
- Why this does not violate identity:
  - The rules explicitly say not to explode the scope toward the full site.
  - A faithful phase-1 slice is more honest than a shallow crawl of a much larger surface.
- Alternatives rejected:
  - Crawling the whole site.
  - Expanding into unplanned sections without audit coverage.

## D-004 - Use an automated discovery and mirroring script

- Decision:
  - Capture the route map, original HTML, and required assets through `scripts/mirror-moldstud.mjs`.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
  - `docs/source/MOLDS2_docs_base/base/03_RULES_OF_THE_GAME.md`
  - `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/02_site_discovery_playwright.md`
  - `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/08_content_and_assets_capture.md`
- Why this does not violate identity:
  - Automated mirroring preserves text, structure, and assets more accurately than rewriting pages by hand from memory.
- Alternatives rejected:
  - Manual copy-paste page authoring.
  - Rebuilding pages from screenshots alone.

## D-005 - Store the mirrored site in public/ and let Astro wrap it

- Decision:
  - Save mirrored HTML and assets under `public/` and let Astro build the final static package.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
  - `docs/source/MOLDS2_codex_tasks_part1/MOLDS2_task_pack_codex/01_foundation_and_bootstrap.md`
- Why this does not violate identity:
  - The external result stays the same, while the internal delivery stack remains ours.
- Alternatives rejected:
  - Keeping the old temporary Astro homepage after real mirrored pages existed.
  - Reimplementing every page as hand-written Astro components before establishing parity.

## D-006 - Strip the original runtime scripts and keep rendered HTML/CSS/assets

- Decision:
  - Remove original scripts and serve the rendered static output plus mirrored assets.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
  - `docs/source/MOLDS2_docs_base/base/02_BRIEF_MOLDS2.md`
  - `docs/source/MOLDS2_docs_base/base/03_RULES_OF_THE_GAME.md`
- Why this does not violate identity:
  - The brief prioritizes external parity, structure, and scalability inside our own stack.
  - Shipping the foreign runtime would not improve the audit trail and would reduce reproducibility.
- Alternatives rejected:
  - Embedding the original runtime as a black box.
  - Rewriting all client behavior without first proving the static mirror.

## D-007 - Keep out-of-scope internal links pointed to the original site

- Decision:
  - Rewrite internal links locally only for mirrored routes. Keep all deeper links on `https://moldstud.com`.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/03_RULES_OF_THE_GAME.md`
  - `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/06_static_pages_reproduction.md`
  - `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/07_blog_sample_pages.md`
- Why this does not violate identity:
  - The agreed local scope is limited. Pointing missing routes back to the original is more honest than inventing empty local pages.
- Alternatives rejected:
  - Creating placeholder routes with no source-backed content.
  - Leaving broken local links.

## D-008 - Do not invent local submission backends

- Decision:
  - Preserve forms visually, but do not create fake local submission or comment APIs.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
  - `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/08_content_and_assets_capture.md`
- Why this does not violate identity:
  - The visible UI is preserved, and the missing live backend is documented as a scope limit instead of being guessed.
- Alternatives rejected:
  - Mock success popups with invented behavior.
  - Dummy APIs unrelated to the original site.

## D-009 - Add minimal local behavior restoration only where parity is visibly broken

- Decision:
  - Add `public/local-enhancements.js` only for behavior that is clearly present in the source and clearly broken after static mirroring.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
  - `docs/source/MOLDS2_docs_base/base/02_BRIEF_MOLDS2.md`
  - `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/09_qa_visual_parity.md`
- Why this does not violate identity:
  - The enhancement restores observed behavior without redesigning or expanding the product.
- Alternatives rejected:
  - Leaving broken interaction states unaddressed.
  - Large client-side rewrites unrelated to the specific parity gap.

## D-010 - Treat the cookie consent overlay as a documented near-match gap

- Decision:
  - Record the cookie overlay difference in the audit instead of hardcoding a guessed local banner.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/01_MANIFEST_MOLDS2.md`
  - `docs/source/MOLDS2_docs_base/base/03_RULES_OF_THE_GAME.md`
  - `docs/source/MOLDS2_docs_base/base/04_ACCEPTANCE_CRITERIA.md`
- Why this does not violate identity:
  - The overlay is session-dependent and not a stable structural page block in the mirrored scope.
  - Hardcoding it locally would create a new guessed entity.
- Alternatives rejected:
  - Ignoring the difference.
  - Inventing a permanent local cookie banner without source-backed state logic.

## D-011 - Allow viewport screenshots when full-page capture fails on very long article pages

- Decision:
  - Use viewport screenshots for some article pages when Chromium fails to produce a stable full-page capture.
- Based on:
  - `docs/source/MOLDS2_docs_base/base/04_ACCEPTANCE_CRITERIA.md`
  - `docs/source/MOLDS2_codex_tasks_part2/MOLDS2_task_pack_codex/09_qa_visual_parity.md`
- Why this does not violate identity:
  - The route still has a mirrored local page, original HTML snapshot, page summary, and route-level screenshot evidence.
  - The fallback changes only the capture method for the artifact, not the reproduced page itself.
- Alternatives rejected:
  - Leaving the page without any screenshot evidence.
  - Claiming full-page screenshot parity where the tooling could not capture it reliably.
