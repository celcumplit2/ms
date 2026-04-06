# Rewritegen Replacement Pipeline Implementation

## What Was Added

### Rewritegen

- Exporter module: `rewritegen/moldstud_payload.py`
- Backfill/export CLI: `rewritegen/cli_export_moldstud_payload.py`
- Automatic payload export hook in `rewritegen/cli_solution.py`

Rewritegen now produces `article.payload.json` next to each `final.solution.html`.

Primary data sources for the payload:

- `final.solution.html`
- `run_meta.json`
- `content.solution.json`

Important rule:

- `payloadCharts` is exported from the final HTML script block, not from the pre-patch content snapshot, so chart IDs stay aligned with the actual rendered chart sections.

### Moldstud old

- Import core: `modules/article/rewritegen-import.service.ts`
- Generic CLI: `console/import-rewritegen-payload.ts`
- Batch wrapper/report generator: `console/import-rewritegen-pages.ts`
- Package scripts:
  - `pnpm rewritegen:import-payload`
  - `pnpm rewritegen:import-pages`

## Payload Behavior

Payload version:

- `moldstud.article-replace.v1`

The payload carries:

- source metadata from Rewritegen
- target alias for Moldstud replacement
- fallback aliases when Rewritegen slug and source URL alias differ
- rendered article body HTML
- runtime JSON needed by the block layer

Replacement mode:

- replace existing only
- no article creation in the new import core
- existing `alias`, `authorId`, `categoryId`, `image`, `publishedAt`, `status` are preserved

Updated fields:

- `title`
- `intro`
- `content`
- `timeToRead`
- `metaTitle`
- `metaDescription`

## Commands

### Rewritegen

Export all payloads from existing solution outputs:

```powershell
python -m rewritegen.cli_export_moldstud_payload --all
```

Export one payload:

```powershell
python -m rewritegen.cli_export_moldstud_payload --slug moldstud-com-articles-c-app-designer-for-intuitive-user-interfaces-cf152137
```

### Moldstud old

Dry-run import from the whole solutions directory:

```powershell
npx pnpm@10.18.3 exec tsx console/import-rewritegen-payload.ts C:\Zenno\Rewritegen\RW\rewritegen_full\out\solutions --dry-run
```

Import from the whole solutions directory:

```powershell
npx pnpm@10.18.3 exec tsx console/import-rewritegen-pages.ts
```

Import one payload file or one solution directory:

```powershell
npx pnpm@10.18.3 exec tsx console/import-rewritegen-payload.ts C:\Zenno\Rewritegen\RW\rewritegen_full\out\solutions\moldstud-com-articles-c-app-designer-for-intuitive-user-interfaces-cf152137
```

## Validation

Validated locally:

- Rewritegen exported `article.payload.json` for all 10 existing solution outputs
- Moldstud `tsc --noEmit` passed
- Dry-run replacement matched all 10 payloads against existing local articles
- Real replacement import updated all 10 local articles
- `/articles` returned `200`
- article pages returned `200`
- Rewritegen runtime still initialized all 4 charts on the tested page after payload-based replacement import

## Current Limitation

The real current Moldstud content database is still missing locally.

What is already ready without it:

- Rewritegen payload export
- Moldstud replacement import core
- dry-run validation
- fallback alias matching
- block CSS/runtime reuse

What still depends on the real current DB:

- replacement against the real production-like set of old Moldstud article aliases
- final verification of which aliases should use source-URL alias vs legacy slug-derived fallback alias
