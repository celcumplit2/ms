# Rewritegen Replacement Pipeline Plan

## Goal

Build a local integration path where `Rewritegen` exports a rendered article package and `Moldstud old` replaces existing blog articles with that package without using the old CSV/UI import flow.

## Constraints

- Existing Moldstud articles must be updated in place, not recreated.
- Rewritegen remains the only source of layout/block rendering logic.
- Moldstud remains the storage, routing, and presentation layer for article pages.
- The block CSS/runtime layer is shared infrastructure and is connected once per project.
- Current implementation should work even before the real current Moldstud content database is available.

## Target Flow

1. `Rewritegen` generates `final.solution.html` as before.
2. `Rewritegen` exports `article.payload.json` next to the generated solution output.
3. `Moldstud old` imports the payload through a server-side replacement service.
4. The replacement service finds an existing article by alias and updates content/meta in place.
5. The standard Moldstud article page renders the updated article using the existing Rewritegen block CSS/runtime layer.

## Payload Contract v1

The first implementation will use a rendered payload, not raw semantic blocks.

- `version`
- `source`
  - `system`
  - `url`
  - `slug`
  - `run_id`
  - `profile_id`
  - `content_sha256`
  - `final_html_sha256`
- `target`
  - `alias`
- `article`
  - `title`
  - `intro`
  - `meta_title`
  - `meta_description`
  - `time_to_read`
  - `article_body_html`
- `runtime`
  - `payload_charts`
  - `run_meta`
  - `flags`

`article_body_html` is the rendered Rewritegen article fragment that Moldstud will store as article content together with the required JSON payload scripts.

## Replacement Policy v1

Default import mode: `replace_existing_only`

- Find the target article by `target.alias`
- Fail if the target article does not exist
- Update in place:
  - `title`
  - `intro`
  - `content`
  - `timeToRead`
  - `metaTitle`
  - `metaDescription`
- Preserve unless explicitly overridden later:
  - `alias`
  - `authorId`
  - `categoryId`
  - `image`
  - `publishedAt`
  - `status`

## Implementation Steps

### Step 1. Freeze plan and contract

- Save this plan into docs
- Reuse the already prepared Rewritegen runtime/CSS layer in Moldstud

### Step 2. Add Rewritegen payload exporter

- Create a reusable exporter module in Rewritegen
- Build `article.payload.json` from:
  - `final.solution.html`
  - `run_meta.json`
  - `content.solution.json`
- Write the payload into each solution directory
- Add a CLI command for backfilling/exporting payloads for one slug or a whole solutions directory

### Step 3. Add Moldstud replacement import core

- Create a dedicated import service for Rewritegen payloads
- Validate payload version and required fields
- Rebuild stored article content from:
  - `article.article_body_html`
  - `runtime.payload_charts`
  - `runtime.run_meta`
- Replace an existing article by alias
- Sync `LatestArticles`

### Step 4. Add CLI entry points

- Import one payload file
- Import all payload files from a directory
- Support `--dry-run`
- Report missing aliases and replacement results

### Step 5. Validate locally

- Export payloads for the existing 10 Rewritegen pages
- Import them into Moldstud through the new replacement command
- Verify article pages still render block layouts and charts
- Run `pnpm check`

### Step 6. Document usage

- Export command examples
- Import command examples
- Required fields and replacement behavior
- Known limitations before the real Moldstud production-like DB is attached

## Expected Result After This Iteration

- Rewritegen can export stable article packages without CSV
- Moldstud can replace existing articles from those packages
- The current 10 generated pages can be re-imported through the new path
- The system is ready for the next stage: moving Rewritegen from full-page output toward article-only output without changing the Moldstud import contract
