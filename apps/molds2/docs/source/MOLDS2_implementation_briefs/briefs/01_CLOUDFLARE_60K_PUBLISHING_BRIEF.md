# Cloudflare Brief for 60k Pages

## Purpose

Define the implementation approach for publishing and operating a site with approximately `60,000` pages on Cloudflare, while keeping:

- fast page delivery;
- manageable deployments;
- separate image storage;
- live comment updates without full site rebuilds;
- room for later scale.

## Input Assumptions

- The project target is no longer a small demo slice. The intended operating size is about `60,000` pages.
- The image inventory is large and may grow toward the previously discussed `260,000` files.
- Comments, forms, and other user-generated updates must work independently of static page deploys.
- Cloudflare is the preferred platform family for hosting, caching, and edge delivery.

## Implementation Decision

Do not publish the entire site as one giant static Pages bundle.

Recommended architecture:

- `Cloudflare Pages` or `Workers Static Assets` for the site shell, shared assets, and a limited set of pre-rendered high-value pages.
- `Cloudflare Workers` for routing, long-tail page delivery, cache control, and API endpoints.
- `Cloudflare R2` for image storage and, if needed, content blobs or pre-generated HTML payloads.
- `Cloudflare D1` or external `Postgres` for comments, forms, moderation state, and other live records.

This is a hybrid static-plus-data architecture, not a pure static dump.

## Why Pure Static Is the Wrong Default

Pure static for all `60,000` pages is possible only in a narrow sense, but it creates avoidable operational problems:

- `Cloudflare Pages` has a per-site file limit and build timeout, so large full-site rebuilds become fragile.
- `Workers Static Assets` also has a per-project asset limit, so HTML plus media in one package does not scale cleanly.
- A small content update or comment change should not trigger a rebuild of tens of thousands of pages.
- Large image libraries should not be tied to every deploy artifact.

Practical consequence:

- pages and images must be separated;
- comments and other live data must be separated from page builds;
- only the most important pages should be pre-rendered by default.

## Recommended Cloudflare Topology

### Public Hostnames

- `www.domain.com`
  - main site delivery
- `img.domain.com`
  - image delivery from `R2`
- `api.domain.com`
  - comments, forms, moderation, and operational endpoints

### Core Services

- `Cloudflare Workers Paid`
  - required for routing, hybrid rendering, and APIs
- `Cloudflare R2`
  - required for media storage
- `Cloudflare Pages`
  - optional but useful for the shared frontend shell and core static output
- `Cloudflare D1`
  - acceptable for initial comments/forms if write volume is moderate

### Services to Avoid at Launch

- `Cloudflare Images`
  - not required on day one
  - introduce only if on-the-fly image resizing, variants, or signed delivery become necessary

## Page Delivery Model

Split pages into three classes.

### Class A: Core Revenue and Navigation Pages

Examples:

- homepage;
- service pages;
- main category pages;
- key location or money pages;
- high-authority articles;
- lead-gen landing pages.

Delivery model:

- pre-render to static HTML;
- deploy through `Pages` or static assets;
- cache aggressively at the edge.

Reason:

- these pages need maximum stability, maximum speed, and predictable SEO behavior.

### Class B: Long-Tail Programmatic Pages

Examples:

- large content sets;
- archive pages;
- tag or filtered pages that are useful but not all equally important;
- deep article or support inventory.

Delivery model:

- route through a `Worker`;
- fetch page data from `R2`, `D1`, or external storage;
- render lightweight HTML at request time or serve pre-generated HTML blobs;
- cache final HTML at the edge by URL.

Reason:

- this avoids massive rebuilds and keeps the deploy surface small.

### Class C: Live User Data Blocks

Examples:

- comments;
- form submissions;
- moderation status;
- user interactions.

Delivery model:

- serve through API endpoints;
- do not bake into static page output;
- update independently of deploys.

Reason:

- comments must not require re-publishing the whole site.

## Image Storage Strategy

Store images separately from page deploys.

Recommended setup:

- original images in `R2`;
- custom domain on top of `R2`, for example `img.domain.com`;
- long cache headers for immutable assets;
- normalized naming and folder strategy by content type.

Suggested layout:

- `articles/yyyy/mm/slug/image-name.webp`
- `services/slug/hero.webp`
- `authors/slug/avatar.webp`
- `shared/icons/...`

Why this is the correct default:

- images stop inflating each application deploy;
- publishing new media becomes a storage operation, not a site rebuild;
- CDN caching stays simple and cheap;
- the site can scale without bundling media into one static artifact.

## Comments and Live Updates

Comments must be implemented as a separate system.

### Minimum Viable Design

- page HTML loads normally without waiting on comments;
- comments are fetched from `api.domain.com/comments?slug=...`;
- comment submission posts to API;
- moderation status is stored separately;
- admin tools purge only the relevant page cache when needed.

### Data Store Choice

Use `D1` if:

- comment volume is moderate;
- write traffic is not extreme;
- operational simplicity is more important than advanced relational features.

Use external `Postgres` if:

- comment volume becomes large;
- moderation workflows grow complex;
- you need stronger reporting, joins, tooling, or multi-writer behavior.

### Important Rule

New comments must not trigger a full site deploy.

## Caching Strategy

Caching is what makes `60,000` pages fast.

### HTML

- `Class A` pages:
  - pre-rendered
  - edge cache with long TTL
  - purge by URL when content changes
- `Class B` pages:
  - cache rendered HTML at the edge
  - use stale-while-revalidate where appropriate
  - purge only changed paths

### Images

- serve from `R2` behind Cloudflare CDN;
- use immutable file names when possible;
- set very long cache lifetime.

### Comments API

- short TTL or no-cache for authenticated moderation views;
- small public cache window for anonymous reads if needed;
- never cache write endpoints.

## Content Update Model

### For Static Core Pages

Update flow:

1. content changes;
2. affected static pages are regenerated;
3. deploy shell or static output;
4. purge only changed URLs.

### For Long-Tail Pages

Update flow:

1. content record changes in source storage;
2. background job updates pre-generated payload or render manifest;
3. purge changed URLs only;
4. first next request repopulates edge cache.

### For Comments

Update flow:

1. user submits comment;
2. API writes comment record;
3. moderation state is updated if required;
4. comments endpoint returns fresh data;
5. no page rebuild is required.

## Deploy Pipeline

Recommended pipeline:

1. ingest content source;
2. normalize and validate metadata;
3. classify pages into `Class A` and `Class B`;
4. build static shell and `Class A` pages;
5. upload or sync images to `R2`;
6. upload manifests or content payloads for `Class B`;
7. deploy frontend shell;
8. run targeted cache purge;
9. update sitemap index and sitemap shards;
10. run smoke checks on a route sample.

## Rollout Plan

Do not launch all `60,000` pages at once.

### Phase 1

- launch `500` to `1,000` pages;
- verify speed, logs, cache hit ratio, and crawl behavior;
- validate comments and moderation flow.

### Phase 2

- grow to `5,000` to `10,000` pages;
- verify sitemap ingestion and indexation quality;
- identify duplicate or low-value URL patterns.

### Phase 3

- scale to the full approved inventory;
- keep weak or duplicate patterns out of the index;
- expand only after crawl efficiency is stable.

## SEO and Crawl-Control Requirements

For a site of this size, URL inventory matters as much as hosting.

Implementation rules:

- only index pages with real value;
- block or canonicalize duplicate URL patterns;
- split sitemaps into shards;
- maintain a sitemap index;
- do not expose weak filter combinations as indexable pages by default;
- return real `404` or `410` for removed pages.

## Operational Rules

- deploys must stay small and predictable;
- images must never be bundled into every page deploy;
- comments and forms must remain outside the static build lifecycle;
- cache purge must support per-URL invalidation;
- a content update must not require rebuilding all `60,000` pages.

## Recommended Launch Stack

### Minimum Safe Stack

- `Cloudflare Workers Paid`
- `Cloudflare R2`
- `Cloudflare Pages`
- `Cloudflare D1`

### Preferred Stack if Comments Grow Fast

- `Cloudflare Workers Paid`
- `Cloudflare R2`
- `Cloudflare Pages`
- external `Postgres`

## Risks

- Trying to pre-render all `60,000` pages in one build will create brittle release cycles.
- Bundling images into the same deploy artifact will waste time, storage, and deploy stability.
- Indexing too many low-value URLs will hurt crawl efficiency.
- Using static HTML for comments will create unnecessary rebuild pressure.
- Choosing `D1` for a high-write comment system without monitoring may become a scaling bottleneck.

## Acceptance Criteria

The implementation is considered correct when:

- core pages are served statically and fast;
- long-tail pages are served through a cached hybrid path;
- images are stored and delivered independently from page deploys;
- comments update without full-site rebuilds;
- deploy time stays operationally safe;
- sitemap structure and indexing strategy are controlled;
- cache invalidation can target changed URLs only.

## Final Recommendation

For `60,000` pages, the correct implementation is not "one huge static site".

The correct implementation is:

- static where it matters;
- data-driven where scale demands it;
- images in `R2`;
- comments in API plus database;
- edge cache as the main performance layer.

This architecture gives the project:

- speed;
- manageable updates;
- simpler media handling;
- stable deployment behavior;
- a clear path to grow beyond the current page count.

## References

- Cloudflare Pages Limits:
  - `https://developers.cloudflare.com/pages/platform/limits/`
- Cloudflare Workers Limits:
  - `https://developers.cloudflare.com/workers/platform/limits/`
- Cloudflare Workers Pricing:
  - `https://developers.cloudflare.com/workers/platform/pricing/`
- Cloudflare R2 Limits:
  - `https://developers.cloudflare.com/r2/platform/limits/`
- Cloudflare R2 Pricing:
  - `https://developers.cloudflare.com/r2/pricing/`
- Google Crawl Budget Guidance:
  - `https://developers.google.com/crawling/docs/crawl-budget`
- Google Sitemap Guidance:
  - `https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap`
