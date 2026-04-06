# Cloudflare 60k Developer Backlog

## Purpose

Convert the architecture brief and implementation plan into a concrete execution backlog that can be worked through directly.

This document is written for implementation ownership, not for stakeholder explanation.

## Execution Rules

- Build foundations before scale.
- Keep page delivery, media, and live data separate.
- Avoid any task that forces full-site rebuild dependency for comments or routine content updates.
- Treat SEO controls as launch-critical, not post-launch cleanup.
- Ship in controlled route waves.

## Status Model

- `pending`
- `ready`
- `in_progress`
- `blocked`
- `done`

## Task Groups

### G0 - Access and Environment

#### T-001 - Confirm production domain model

- Status: `done`
- Type: `platform`
- Output:
  - confirmed hostname structure:
    - apex redirects to `www`
    - `www.<root-domain>` for site delivery
    - `img.<root-domain>` for `R2` assets
    - `api.<root-domain>` for comments, forms, and operational endpoints
- Done when:
  - hostname map is fixed and no longer provisional

#### T-002 - Confirm data-store choice for comments

- Status: `done`
- Type: `architecture`
- Options:
  - `D1`
  - external `Postgres`
- Output:
  - approved launch persistence path:
    - `Cloudflare D1` for comments and moderation
    - migrate to external `Postgres` only if D1 becomes an operational bottleneck
- Done when:
  - the comments storage choice is fixed

#### T-003 - Provision Cloudflare resources

- Status: `ready`
- Type: `platform`
- Output:
  - `Worker`
  - `R2` bucket
  - `Pages` project if used
  - `D1` database if chosen
  - environment secrets list
- Done when:
  - preview and production resources exist

### G1 - Repository and Delivery Baseline

#### T-010 - Add deployment configuration skeleton

- Status: `done`
- Type: `repo`
- Output:
  - `wrangler.jsonc.example`
  - `.dev.vars.example`
  - `worker/index.ts`
  - env and deploy matrix documentation
- Done when:
  - repo can target preview and production cleanly

#### T-011 - Add route manifest source format

- Status: `pending`
- Type: `repo`
- Output:
  - machine-readable route manifest format
  - fields for:
    - path
    - page type
    - canonical
    - publication state
    - sitemap state
    - data source key
- Done when:
  - every page can be described by one manifest record

#### T-012 - Add page-classification rules

- Status: `pending`
- Type: `repo`
- Output:
  - explicit logic for:
    - `Class A`
    - `Class B`
    - excluded or noindex pages
- Done when:
  - route classification is deterministic

### G2 - Content Model and SEO Governance

#### T-020 - Define page-type schemas

- Status: `pending`
- Type: `data`
- Output:
  - schema for each major page type
  - required metadata fields
  - optional fields
- Done when:
  - data validation rules exist for every supported page type

#### T-021 - Define canonical and noindex rules

- Status: `pending`
- Type: `seo`
- Output:
  - canonical rules per page type
  - noindex rules for weak pages
  - duplicate suppression rules
- Done when:
  - indexable versus non-indexable behavior is explicit

#### T-022 - Define deletion and redirect policy

- Status: `pending`
- Type: `seo`
- Output:
  - rules for:
    - `404`
    - `410`
    - redirect
- Done when:
  - removed content behavior is standardized

### G3 - Static Core Delivery

#### T-030 - Implement site shell

- Status: `pending`
- Type: `frontend`
- Output:
  - shared layout
  - shared head metadata handling
  - error templates
- Done when:
  - core shell deploys and renders correctly

#### T-031 - Implement `Class A` page generation

- Status: `pending`
- Type: `frontend`
- Output:
  - build path for high-value static pages
- Done when:
  - core pages are produced as static output

#### T-032 - Add cache headers for static pages

- Status: `pending`
- Type: `platform`
- Output:
  - static-page cache policy
- Done when:
  - `Class A` pages have production-ready cache behavior

### G4 - R2 Media Pipeline

#### T-040 - Define image key convention

- Status: `pending`
- Type: `media`
- Output:
  - naming scheme by content type
  - folder strategy
- Done when:
  - image storage is predictable and versionable

#### T-041 - Build image upload pipeline

- Status: `pending`
- Type: `media`
- Output:
  - upload script or sync process into `R2`
  - manifest or mapping output
- Done when:
  - images can be uploaded in batches without manual renaming

#### T-042 - Connect image delivery domain

- Status: `pending`
- Type: `platform`
- Output:
  - `img` domain mapped to `R2`
  - cache policy for immutable assets
- Done when:
  - media is served from the final asset domain

#### T-043 - Replace local image assumptions in page rendering

- Status: `pending`
- Type: `frontend`
- Output:
  - render layer reads image URLs from manifest or storage rules
- Done when:
  - page HTML no longer depends on bundled local media paths

### G5 - Long-Tail Page Delivery

#### T-050 - Implement worker route resolver

- Status: `pending`
- Type: `backend`
- Output:
  - route match and dispatch logic
- Done when:
  - worker can resolve requested URLs into page records

#### T-051 - Implement page data fetch path

- Status: `pending`
- Type: `backend`
- Output:
  - fetch layer for route manifest and content payload
- Done when:
  - worker can fetch page data by route key

#### T-052 - Implement `Class B` HTML renderer

- Status: `pending`
- Type: `backend`
- Output:
  - HTML response generation for long-tail routes
- Done when:
  - worker returns valid HTML for long-tail pages

#### T-053 - Implement per-URL cache and purge strategy

- Status: `pending`
- Type: `platform`
- Output:
  - cache strategy for long-tail HTML
  - purge path for changed URLs only
- Done when:
  - content changes no longer imply global rebuild or full purge

#### T-054 - Add missing-page and invalid-record handling

- Status: `pending`
- Type: `backend`
- Output:
  - stable behavior for invalid routes and removed pages
- Done when:
  - worker returns correct `404`, `410`, or redirect behavior

### G6 - Comments and Live Data

#### T-060 - Define comments schema

- Status: `pending`
- Type: `data`
- Output:
  - fields for:
    - page key
    - author
    - body
    - state
    - timestamps
    - moderation metadata
- Done when:
  - comment persistence structure is fixed

#### T-061 - Implement comments read API

- Status: `pending`
- Type: `backend`
- Output:
  - public comments endpoint
- Done when:
  - page can request comments by page key

#### T-062 - Implement comments write API

- Status: `pending`
- Type: `backend`
- Output:
  - comment submission endpoint
- Done when:
  - a new comment can be stored without affecting page deploys

#### T-063 - Implement moderation workflow

- Status: `pending`
- Type: `backend`
- Output:
  - approval states
  - moderation update path
- Done when:
  - published versus pending comments are controlled

#### T-064 - Add comments UI integration

- Status: `pending`
- Type: `frontend`
- Output:
  - page-level comments loading
  - submit path
- Done when:
  - comments appear as live data, not static build content

#### T-065 - Add spam and abuse controls

- Status: `pending`
- Type: `security`
- Output:
  - rate limiting
  - validation
  - optional challenge logic
- Done when:
  - public comment submission is not completely open to abuse

### G7 - SEO, Sitemaps, and Index Control

#### T-070 - Implement sitemap shard generator

- Status: `pending`
- Type: `seo`
- Output:
  - sitemap shard generation
- Done when:
  - large route sets can be emitted in valid sitemap batches

#### T-071 - Implement sitemap index

- Status: `pending`
- Type: `seo`
- Output:
  - sitemap index file
- Done when:
  - all sitemap shards are referenced from one index

#### T-072 - Implement robots policy

- Status: `pending`
- Type: `seo`
- Output:
  - launch robots rules
- Done when:
  - crawl rules are explicit and environment-safe

#### T-073 - Add route-level canonical output

- Status: `pending`
- Type: `seo`
- Output:
  - canonical tags from route manifest
- Done when:
  - every indexable page emits correct canonical tags

### G8 - QA and Observability

#### T-080 - Add route smoke test suite

- Status: `pending`
- Type: `qa`
- Output:
  - automated route sample checks
- Done when:
  - core and long-tail sample routes are verified on deploy

#### T-081 - Add cache and response logging

- Status: `pending`
- Type: `ops`
- Output:
  - production-level request and error observability
- Done when:
  - cache misses, failures, and invalid routes are inspectable

#### T-082 - Add launch performance checks

- Status: `pending`
- Type: `qa`
- Output:
  - baseline performance report for core pages
- Done when:
  - launch metrics exist for core templates

### G9 - Controlled Rollout

#### T-090 - Publish first controlled route set

- Status: `pending`
- Type: `launch`
- Range:
  - `500` to `1,000` pages
- Done when:
  - first wave is live and observed

#### T-091 - Expand to second route wave

- Status: `pending`
- Type: `launch`
- Range:
  - `5,000` to `10,000` pages
- Done when:
  - second wave is live and crawl behavior is reviewed

#### T-092 - Approve full-scale release

- Status: `pending`
- Type: `launch`
- Done when:
  - indexation, cache behavior, and route stability support final expansion

## Immediate Order of Work

The next tasks to execute in order are:

1. `T-003`
2. `T-011`
3. `T-012`
4. `T-020`
5. `T-021`
6. `T-030`
7. `T-040`
8. `T-050`
9. `T-060`
10. `T-070`

## Hard Blockers

The following items block meaningful implementation if unresolved:

- route manifest format
- page classification rules
- image key strategy

## Definition of Ready

A task is `ready` only when:

- its upstream dependency is done;
- the output is concrete;
- the implementation target is known;
- the acceptance condition is explicit.

## Definition of Done

A task is `done` only when:

- implementation exists;
- the intended output is present;
- the behavior is testable;
- the change does not reintroduce full-site rebuild dependency where it should not exist.
