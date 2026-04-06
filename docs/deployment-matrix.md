# Deployment Matrix

## Repository Model

This repository is a monorepo with two deployable applications:

- `apps/molds2`
- `apps/molds_old`

## GitHub Actions

### MOLDS2

- CI: `.github/workflows/molds2-ci.yml`
- Deploy: `.github/workflows/molds2-deploy.yml`

`molds2` deploy is intentionally `workflow_dispatch` only for now. It expects:

- `apps/molds2/wrangler.jsonc`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The repository currently contains only `wrangler.jsonc.example`, so live Cloudflare deployment stays gated until the real config is added.

### MOLDS_OLD

- CI: `.github/workflows/molds-old-ci.yml`
- Deploy: `.github/workflows/molds-old-deploy.yml`

`molds_old` deploy expects:

- app secrets for Next.js/server build
- SSH access to the production server
- `DEPLOY_ROOT` pointing at the monorepo root on the server

Local `prod:build` for `molds_old` also needs the Stack Auth environment variables. Without them, the build stops at `/auth/[...stack]` before page-data collection completes.

The deploy workflow now assumes the production checkout uses the same monorepo layout:

- `${DEPLOY_ROOT}/apps/molds_old`

## Local Root Commands

- `pnpm run check`
- `pnpm run check:molds2`
- `pnpm run check:molds_old`
- `pnpm run dev:molds2`
- `pnpm run dev:molds_old`
- `pnpm run rewritegen:import-pages`

## Follow-up

Before enabling production deploy from GitHub:

1. add the live `apps/molds2/wrangler.jsonc`
2. align the production server checkout to the new monorepo layout
3. review secret names and deploy-root assumptions once on the server
