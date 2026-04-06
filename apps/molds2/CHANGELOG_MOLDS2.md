# CHANGELOG_MOLDS2

## 2026-03-20

- Bootstrapped the MOLDS2 repository on `Node.js + Astro` with Cloudflare Pages compatible static output.
- Imported the document archive into `docs/source/` and created the required reporting base in the project root.
- Accepted `https://moldstud.com/` as the authoritative source URL and removed the discovery blocker.
- Added `scripts/mirror-moldstud.mjs` and the `npm run sync:moldstud` workflow.
- Captured homepage header links, footer links, first-contour URLs, page-template summaries, and 10 article sample routes.
- Mirrored `21` pages and `202` required assets from MoldStud into `public/`.
- Saved original HTML snapshots for every mirrored route under `artifacts/snapshots/html/original/`.
- Replaced the temporary baseline homepage with the mirrored real homepage.
- Added `public/local-enhancements.js` to restore services-page filtering after static mirroring removed the original runtime.
- Captured representative parity screenshots for the homepage, services page, and one article detail page.
- Added local behavior evidence for services filtering and FAQ expansion.
- Captured original/local screenshot pairs for all `21` mirrored routes.
- Verified local shared-template filters on `/industries`, `/solutions`, and `/technologies`.
- Verified contact-form structure on `/contacts` and `/hire-us`.
- Added `artifacts/data/page-evidence-summary.json` as the machine-readable route-to-evidence registry.
- Re-ran `npm run check` and `npm run build` after the audit expansion and refreshed `dist-files` and `git-status` artifacts.
- Refreshed route checks, build logs, dist file list, and reporting documents for handover.
