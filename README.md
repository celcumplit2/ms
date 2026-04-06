# MS Monorepo

This repository now holds the two website codebases that make up the current MoldStud stack:

- `apps/molds2` - the new site
- `apps/molds_old` - the legacy blog infrastructure

`Rewritegen/Bella` stays outside this repository and continues to generate article payloads for import into `apps/molds_old`.

## Layout

```text
ms/
  apps/
    molds2/
    molds_old/
  docs/
  package.json
  pnpm-workspace.yaml
```

## App Boundaries

### `apps/molds2`

- Astro / Node.js app
- source of the new-site design language and frontend direction

### `apps/molds_old`

- Next.js / Node.js app
- keeps the blog infrastructure and imported Rewritegen article content

## Root Commands

Run from the repository root.

| Command | Purpose |
| :------ | :------ |
| `pnpm install` | Install workspace dependencies |
| `pnpm run check` | Run checks for both apps |
| `pnpm run check:molds2` | Run Astro checks for the new site |
| `pnpm run check:molds_old` | Run TypeScript checks for the blog |
| `pnpm run dev:molds2` | Start `molds2` locally |
| `pnpm run dev:molds_old` | Start `molds_old` locally |
| `pnpm run rewritegen:import-pages` | Run Rewritegen import inside `molds_old` |

## Migration Note

This monorepo was assembled from the current local source trees:

- `C:\GPT\MS\MOLDS2`
- `C:\GPT\MS\MOLDS_OLD`

The migration plan is recorded in `docs/monorepo-migration-plan.md`.
