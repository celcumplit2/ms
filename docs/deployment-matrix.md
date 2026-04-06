# Deployment Matrix

## Repository Model

This repository is a monorepo with two deployable applications:

- `apps/molds2`
- `apps/molds_old`

## GitHub Actions

### MOLDS2

- CI: `.github/workflows/molds2-ci.yml`
- Deploy: `.github/workflows/molds2-deploy.yml`

`molds2` now has a live Cloudflare Pages project:

- project:
  - `molds2-site`
- URL:
  - `https://molds2-site.pages.dev`
- source:
  - `celcumplit2/ms`
- production branch:
  - `main`

The Git integration has already been configured on Cloudflare with monorepo path filters:

- include:
  - `apps/molds2/**`
  - `package.json`
  - `pnpm-lock.yaml`
  - `pnpm-workspace.yaml`
- exclude:
  - `apps/molds_old/**`

The manual deploy workflow now triggers a Cloudflare Pages deployment through the API after local workspace validation. It expects:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### MOLDS_OLD

- CI: `.github/workflows/molds-old-ci.yml`
- Deploy: `.github/workflows/molds-old-deploy.yml`

`molds_old` now deploys via server-side build over SSH. The workflow expects:

- SSH access to the production server
- `DEPLOY_ROOT` pointing at the monorepo root on the server
- production `.env` already present on the server for `apps/molds_old`

The deploy workflow assumes the production checkout uses the same monorepo layout:

- `${DEPLOY_ROOT}/apps/molds_old`

Current production flow:

1. `git pull --ff-only` on the server
2. clear `apps/molds_old/.next` and `apps/molds_old/cron/.build`
3. `pnpm --dir apps/molds_old run prod:install`
4. `pnpm --dir apps/molds_old run prod:build`
5. `pm2 startOrReload ecosystem.config.js --update-env`

Automatic migrations were removed from the GitHub-runner build path because the production database is reachable from the server runtime, not reliably from GitHub-hosted runners. If schema changes are needed later, run migrations from the server context.

## Local Root Commands

- `pnpm run check`
- `pnpm run check:molds2`
- `pnpm run check:molds_old`
- `pnpm run dev:molds2`
- `pnpm run dev:molds_old`
- `pnpm run rewritegen:import-pages`

## Follow-up

Before enabling production deploy from GitHub:

1. align the production server checkout to the new monorepo layout
2. review secret names and deploy-root assumptions once on the server
