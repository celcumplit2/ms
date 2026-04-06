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

## D-012 - Fix the 60k-page hostname structure to www, img, and api subdomains

- Decision:
  - Use the following hostname split for the scaled operating model:
    - apex redirects to `www`
    - `www.<root-domain>` serves the site
    - `img.<root-domain>` serves `R2` media
    - `api.<root-domain>` serves comments, forms, and operational APIs
- Based on:
  - `docs/source/MOLDS2_implementation_briefs/briefs/01_CLOUDFLARE_60K_PUBLISHING_BRIEF.md`
  - `docs/source/MOLDS2_implementation_briefs/briefs/02_CLOUDFLARE_60K_IMPLEMENTATION_PLAN.md`
  - `docs/source/MOLDS2_implementation_briefs/briefs/03_CLOUDFLARE_60K_DEVELOPER_BACKLOG.md`
- Why this is the correct split:
  - Page delivery, media delivery, and live API traffic have different caching and deployment needs.
  - This split keeps media out of page deploy artifacts and keeps comments out of the page-render path.
- Alternatives rejected:
  - Serving images from the main hostname.
  - Mixing page delivery and comment APIs on one operational surface by default.
  - Leaving the hostname structure implicit until later implementation.

## D-013 - Use Cloudflare D1 as the launch comments store and treat Postgres as a migration path

- Decision:
  - Use `Cloudflare D1` for comments and moderation at launch.
  - Treat external `Postgres` as the migration target only if D1 becomes a scaling or workflow bottleneck.
- Based on:
  - `docs/source/MOLDS2_implementation_briefs/briefs/01_CLOUDFLARE_60K_PUBLISHING_BRIEF.md`
  - `docs/source/MOLDS2_implementation_briefs/briefs/02_CLOUDFLARE_60K_IMPLEMENTATION_PLAN.md`
  - Official Cloudflare D1 limits and read-replication guidance
- Why this is the correct launch choice:
  - It keeps the initial stack inside Cloudflare and reduces operational moving parts.
  - Comment writes are expected to be much smaller than anonymous page reads.
  - D1 read replication provides a path to reduce read latency without changing platforms.
  - D1 limitations are acceptable because comments are a live-data sidecar, not the primary page-delivery store.
- Alternatives rejected:
  - Introducing external Postgres immediately without evidence that the added complexity is necessary.
  - Storing comments in static output.
  - Delaying the storage decision and blocking infrastructure work.

## D-014 - Treat the Figma file as the new visual source of truth for the redesign track

- Decision:
  - Keep the phase-1 mirrored site as the content and route reference.
  - Treat the Figma file `https://www.figma.com/design/ZUj7In473NjYDV6JkYCxoX/Moldstud` as the visual and system source of truth for the redesign track opened on `2026-03-24`.
  - Allow redesign work under this track even though the earlier mirror phase was explicitly no-redesign.
- Based on:
  - direct user instruction in chat on `2026-03-24` to move from the mirror task to `Figma` and the transfer of the new design
  - `docs/figma/moldstud_figma_codex/00_README.md`
  - `docs/figma/moldstud_figma_codex/01_MASTER_PROMPT.md`
- Why this is the correct decision:
  - The mirror phase already proved route/content parity and now serves as a stable baseline.
  - The user explicitly changed the work mode from reproduction to redesign implementation.
  - Keeping the old no-redesign rule active would create a false conflict inside the repo and make the current workstream impossible to reason about.
- Alternatives rejected:
  - Pretending the redesign track is still governed by the old mirror-only restriction.
  - Replacing the content/routing baseline with Figma and losing the audited public-site reference.

## D-015 - Deliver the redesign in light mode first

- Decision:
  - The first implementation target for the redesign is the `light` variant only.
  - Dark mode is deferred until the light system is stable and page-type coverage is complete.
- Based on:
  - direct user instruction in chat on `2026-03-24`
  - current Figma implementation planning under `docs/figma/`
- Why this is the correct decision:
  - It reduces theme branching while the core component system is still being built.
  - It keeps effort focused on visual reproduction and page coverage instead of parallel theme maintenance.
- Alternatives rejected:
  - Building light and dark in parallel from the first pass.
  - Leaving the theme target ambiguous.

## D-016 - Use demo content to complete page-type coverage where real data is missing

- Decision:
  - All required page types must be implemented even if final content is not ready.
  - Missing data should be filled with structured demo content that follows the same shape as future real content.
- Based on:
  - direct user instruction in chat on `2026-03-24`
  - `docs/figma/REDESIGN_WORK_PLAN.md`
- Why this is the correct decision:
  - The immediate priority is reproducing the new design and template system.
  - Waiting for final content would block implementation of important route families and component states.
  - A structured demo-data layer keeps future content replacement cheap.
- Alternatives rejected:
  - Skipping unfinished page types.
  - Hardcoding ad hoc placeholder copy directly inside components.
  - Blocking the redesign until all business content is ready.

## D-017 - Archive mirrored route HTML and let the Astro redesign runtime own active routes

- Decision:
  - Move the old mirrored route HTML files out of `public/` into `artifacts/reference/mirrored-public-routes/`.
  - Keep mirrored assets in `public/`.
  - Let `src/pages` become the active route layer for the redesign runtime.
- Based on:
  - direct user instruction on `2026-03-24` to move forward with the new Figma-based design implementation
  - `docs/figma/IMPLEMENTATION_PLAN.md`
  - `docs/figma/REDESIGN_WORK_PLAN.md`
- Why this is the correct decision:
  - Astro route ownership becomes explicit and predictable.
  - It prevents collisions between new Astro pages and legacy mirrored HTML files at the same paths.
  - It preserves the mirrored phase-1 baseline as an auditable reference instead of deleting it.
- Alternatives rejected:
  - Leaving mirrored HTML in `public/` and relying on accidental route precedence.
  - Deleting the old mirrored routes and losing the reference baseline.
