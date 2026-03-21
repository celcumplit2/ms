# MOLDS2

MOLDS2 mirrors the public MoldStud website inside our Node.js/Astro/Cloudflare Pages stack. The source of truth for the current phase is `https://moldstud.com/`.

Phase 1 scope is intentionally limited to:

- the homepage;
- every first-contour page reachable from the homepage header/footer navigation;
- 10 representative article detail pages;
- the assets required to render that scope locally.

## Current Status

- Source site accepted and audited: `https://moldstud.com/`
- Mirrored pages: `21`
- Mirrored asset files in `public/`: `224`
- Template families captured: `8`
- Build status: `npm run check` and `npm run build` pass
- QA status: original/local screenshot pairs are captured for all `21` mirrored routes; mismatch consolidation and final handover are still in progress, see `PARITY_AUDIT.md`

## Commands

Run all commands from the project root.

| Command | Purpose |
| :------ | :------ |
| `npm install` | Install dependencies |
| `npm run sync:moldstud` | Re-discover MoldStud, mirror the agreed scope, and refresh local assets |
| `npm run dev` | Start Astro dev server |
| `npm run check` | Run Astro and TypeScript diagnostics |
| `npm run build` | Build the static output to `dist/` |
| `npm run preview` | Preview the built output |

## Mirroring Workflow

1. Run `npm run sync:moldstud`.
2. The sync script fetches the source pages, captures discovery data, saves original HTML snapshots, mirrors assets, and rewrites local links for the agreed scope.
3. Run `npm run check`.
4. Run `npm run build`.
5. Review `artifacts/`, `PARITY_AUDIT.md`, and the root reporting files before handover.

Core implementation files:

- `scripts/mirror-moldstud.mjs` - discovery, snapshot, mirroring, asset rewrite, and minimal local behavior restoration
- `public/` - mirrored local site
- `artifacts/` - evidence, screenshots, snapshots, route checks, and build logs
- `artifacts/data/page-evidence-summary.json` - compact route-to-template-to-evidence map for the full mirrored scope
- `docs/source/` - imported project documents that govern the work

## Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `>=22.12.0`

## Reporting Base

The required reporting base lives in the repository root:

- `PROJECT_MAP.md`
- `TASK_REGISTRY.md`
- `IMPLEMENTATION_LOG.md`
- `DECISIONS.md`
- `PARITY_AUDIT.md`
- `ARTIFACT_INDEX.md`
- `CHANGELOG_MOLDS2.md`

## Known Gaps

- The cookie consent overlay visible in some original sessions is not mirrored locally. It is treated as a documented near-match gap rather than a guessed static recreation.
- Forms and article comments remain visual only. No local submission backend was invented.
- Internal links outside the agreed mirrored scope stay pointed at `https://moldstud.com` to avoid fake local routes.
- Full screenshot coverage already exists for every mirrored page. The remaining work is the final mismatch sweep, deeper behavior review, and handover cleanup.
