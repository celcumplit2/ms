# Cloudflare Env and Deploy Matrix

## Purpose

Provide the initial configuration skeleton for the `60,000`-page Cloudflare operating model without introducing live secrets or production identifiers into the repository.

## Repository Templates

The repository now includes:

- `wrangler.jsonc.example`
- `.dev.vars.example`
- `worker/index.ts`

These files are templates and skeletons, not live deployment credentials.

## Runtime Bindings

### Assets

- binding:
  - `ASSETS`
- source:
  - `dist/`
- role:
  - serves the static shell and pre-rendered pages

### R2

- binding:
  - `MEDIA_BUCKET`
- role:
  - serves image and media assets

### D1

- binding:
  - `COMMENTS_DB`
- role:
  - stores comments and moderation state

## Environment Variables

### Shared

- `APP_ENV`
- `ROOT_DOMAIN`
- `SITE_HOST`
- `IMAGE_HOST`
- `API_HOST`

### Provisioning-Time Values

- `COMMENTS_DB_ID`
- `COMMENTS_PREVIEW_DB_ID`
- `MEDIA_BUCKET_NAME`
- `MEDIA_PREVIEW_BUCKET_NAME`

## Deploy Targets

### Preview

- app host:
  - `preview-www.<preview-root-domain>`
- image host:
  - `preview-img.<preview-root-domain>`
- api host:
  - `preview-api.<preview-root-domain>`
- purpose:
  - validate routing, media, and API bindings before production deploy

### Production

- app host:
  - `www.<root-domain>`
- image host:
  - `img.<root-domain>`
- api host:
  - `api.<root-domain>`
- purpose:
  - public delivery

## Skeleton Routing Model

### `www`

- serves static assets from `dist`
- serves pre-rendered `Class A` pages
- will later serve worker-routed long-tail pages through the same edge surface

### `img`

- serves `R2` assets
- uses long-lived cache headers

### `api`

- serves comments
- serves forms
- serves moderation endpoints
- serves operational endpoints such as health and purge controls

## Worker Skeleton

The current worker skeleton does only three things:

- returns `/api/health`
- returns `501` for all other `/api/*` routes
- falls through to `ASSETS` for everything else

That is intentional. It creates a safe starting point for:

- route resolver work
- comments API work
- production binding checks

## Next Required Actions

To turn the skeleton into a live baseline:

1. create live Cloudflare resources;
2. copy `wrangler.jsonc.example` into a working config;
3. copy `.dev.vars.example` into local secret-bearing env files;
4. replace placeholder IDs and bucket names;
5. validate `worker/index.ts` with real bindings.
