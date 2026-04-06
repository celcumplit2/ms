# MS Monorepo Migration Plan

## Goal

Convert `ms` from a single-app `MOLDS2` repository into a monorepo that holds:

- `apps/molds2` - the new site
- `apps/molds_old` - the legacy blog infrastructure

`Rewritegen/Bella` remains outside this repository and continues to export article payloads into `MOLDS_OLD`.

## Source Projects

- `C:\GPT\MS\MOLDS2`
- `C:\GPT\MS\MOLDS_OLD`

## Target Structure

```text
ms/
  apps/
    molds2/
    molds_old/
  docs/
  package.json
  pnpm-workspace.yaml
  README.md
  .gitignore
```

## Migration Rules

1. Keep `molds2` and `molds_old` as separate applications with separate env/runtime assumptions.
2. Do not merge application source trees together.
3. Do not move `Rewritegen` into this repository.
4. Use the current local projects as source of truth for the migration, not the older static-only snapshot now present in `ms`.
5. Exclude transient directories from the migration:
   - `node_modules`
   - `.next`
   - `.astro`
   - `dist`
   - local logs and runtime caches

## Workspace Layer

Root workspace responsibilities:

- expose top-level scripts for both apps
- provide one root entrypoint for installs/checks
- document boundaries and integration flow
- keep deployment concerns separable per app

## First Implementation Pass

1. Create `apps/`.
2. Copy in current `MOLDS2` as `apps/molds2`.
3. Copy in current `MOLDS_OLD` as `apps/molds_old`.
4. Replace root single-app files with monorepo root files.
5. Add root workspace scripts and ignore rules.
6. Verify both apps remain runnable through their own package manifests.

## Follow-up After Migration

- normalize package-manager strategy across both apps
- add CI split by app path
- add shared integration docs for Rewritegen payload import flow
