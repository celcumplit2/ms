# Cloudflare 60k Working Decisions

## Purpose

Record the first fixed execution decisions for the `60,000`-page operating model so that infrastructure and repository work can proceed without ambiguity.

## Decision Set

### WD-001 - Hostname Model

The hostname structure is fixed as follows:

- apex domain:
  - redirect to `https://www.<root-domain>`
- `www.<root-domain>`:
  - main site delivery
  - static core pages
  - long-tail page responses
- `img.<root-domain>`:
  - public image delivery from `R2`
- `api.<root-domain>`:
  - comments API
  - form endpoints
  - moderation endpoints
  - operational purge or background-control endpoints

Notes:

- the exact root domain string is still deployment-specific;
- the subdomain strategy is no longer provisional;
- media is intentionally split away from the main site host;
- API traffic is intentionally split away from page delivery.

### WD-002 - Comment Storage at Launch

The launch data store for comments is fixed as `Cloudflare D1`.

The comment system will be implemented with:

- one primary comments database at launch;
- indexed read paths for page-level comment fetches;
- write operations through API endpoints only;
- read replication enabled when comment reads move to production traffic;
- Sessions API for read-replica usage when replication is enabled.

Why `D1` is the correct launch choice:

- it keeps the launch stack inside Cloudflare;
- operational complexity is lower than introducing a second vendor immediately;
- comment writes are expected to be materially lower than anonymous page reads;
- read replication can reduce latency for comment reads without changing the stack.

Known limits that are accepted at launch:

- each individual `D1` database is single-threaded;
- each `D1` database has a `10 GB` size limit on paid plans;
- writes still serialize through the primary.

That is acceptable for launch because comments are a live-data sidecar, not the primary page-delivery store.

### WD-003 - Migration Trigger Away from D1

The project stays on `D1` unless one or more of the following become true:

- the comments database begins returning overload behavior under normal traffic;
- moderation and reporting requirements become meaningfully more complex;
- the data model needs heavier relational querying than the initial scope;
- storage growth approaches the practical comfort zone of a single `D1` database;
- write volume becomes high enough that serialized writes are an operational bottleneck.

When one of those conditions is reached, the next storage target is external `Postgres`.

## Resulting Task State

The following backlog tasks are now considered resolved:

- `T-001 - Confirm production domain model`
- `T-002 - Confirm data-store choice for comments`

The following task is now unblocked:

- `T-003 - Provision Cloudflare resources`

## Immediate Next Steps

Execution should now move to:

1. provision Cloudflare resources;
2. add deployment configuration skeleton;
3. add route manifest format;
4. define page classification rules.

## References

- Cloudflare D1 Limits:
  - `https://developers.cloudflare.com/d1/platform/limits/`
- Cloudflare D1 Read Replication:
  - `https://developers.cloudflare.com/d1/best-practices/read-replication/`
- Cloudflare Pages Limits:
  - `https://developers.cloudflare.com/pages/platform/limits/`
- Cloudflare Workers Limits:
  - `https://developers.cloudflare.com/workers/platform/limits/`
