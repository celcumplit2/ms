# UI Revision Audit

Date: 2026-04-03

## Scope

Systemic cleanup of the current MoldStud UI without redesigning the product from scratch:

- normalize container widths and remove unnecessary inner compression
- stabilize vertical rhythm and section spacing
- align colors and surface treatment with the current design direction
- make background zones more legible and consistent
- clean up local layout defects and mobile tap-target issues

## Main Changes

### Global system

- refreshed core surface, text, border, shadow, and spacing tokens in [\_variables.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\_variables.scss)
- tightened typographic scale and paragraph rhythm in [\_typography.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\_typography.scss)
- widened the global desktop container and improved shell spacing in [\_layout.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\_layout.scss)
- normalized button and form control sizing in [\_buttons.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\_buttons.scss), [button.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\forms\button.module.scss), and [\_form-mixins.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\forms\_form-mixins.scss)

### Page width and spacing cleanup

- rebuilt contacts and hire-us intro/form layouts to stop over-narrow shells:
  - [contacts-page.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\contacts-page.module.scss)
  - [hire-us-page.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\hire-us-page.module.scss)
  - [contacts-form.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\common\contacts-form.module.scss)
  - [hire-us-form.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\common\hire-us-form.module.scss)
- tightened structure and spacing on careers and about pages:
  - [careers-page.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\careers\careers-page.module.scss)
  - [about-us-page.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\about-us-page.module.scss)
- normalized section rhythm on home and services:
  - [home-page.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\home\home-page.module.scss)
  - [services-page.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\services\services-page.module.scss)

### Reusable block polish

- upgraded service heading and tag-cloud shells so they use full width more cleanly:
  - [service-heading.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\common\service-heading.module.scss)
  - [tag-cloud.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\common\tag-cloud.module.scss)
- rebuilt consultation and benefit/service cards into a more coherent surface system:
  - [schedule-consultation-form.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\common\schedule-consultation-form.module.scss)
  - [benefits.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\common\benefits.module.scss)
  - [services.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\home\services.module.scss)

### Articles and imported Rewritegen pages

- improved card rhythm, image behavior, and CTA anchoring:
  - [article-card.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\articles\article-card.module.scss)
  - [\_article-mixins.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\articles\_article-mixins.scss)
- kept Rewritegen article styling isolated and aligned with the newer visual direction:
  - [\_rewritegen-blocks.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\articles\_rewritegen-blocks.scss)
  - [article-page.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\articles\article-page.module.scss)

### Interaction cleanup

- fixed mobile tap-target problems in breadcrumbs and inline policy links:
  - [breadcrumbs.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\layout\breadcrumbs.module.scss)
  - [checkbox-label.module.scss](C:\GPT\MS\MOLDS_OLD\styles\scss\forms\checkbox-label.module.scss)
- corrected shell order so the site layout renders `Header -> Main -> Footer` in DOM order:
  - [layout.tsx](C:\GPT\MS\MOLDS_OLD\app\(website)\layout.tsx)

## Verified Routes

Manual browser review:

- `/`
- `/contacts`
- `/hire-us`
- `/services`
- `/about-us`
- `/careers`
- `/articles`
- `/articles/p-staff-augmentation-vs-managed-services-for-project-needs`

Automated checks:

- `npx.cmd pnpm@10.18.3 run check` in `C:\GPT\MS\MOLDS_OLD`
- mobile generic audit with custom routes in `C:\GPT\TEST`

Mobile audit result:

- `/contacts` passed
- `/hire-us` passed
- `/articles` passed
- `/articles/p-staff-augmentation-vs-managed-services-for-project-needs` passed
- `/services` passed
- `/careers` passed
- `/about-us` passed

Desktop generic audit result:

- the custom audited routes above passed
- homepage-specific preset in the tester is not a clean fit for this codebase because it expects another menu/dialog pattern; homepage was reviewed manually after the shell-order fix

## Remaining Non-Critical Gaps

- homepage mobile navigation is still implemented with the legacy checkbox/label pattern rather than a fully accessible dialog-button pattern
- some imported Rewritegen articles still use placeholder cover images; layout is stabilized, but content art direction is not addressed in this pass
- direct Figma-file comparison was not automated in this iteration because no concrete file key or URL was provided; the cleanup followed the supplied design rules and the already implemented newer visual direction

## Outcome

The site now uses width more consistently, forms no longer feel arbitrarily compressed, section spacing is more predictable, color/surface usage is more disciplined, and the most visible mobile interaction defects are cleared. The interface reads as a more coherent system rather than a nearly-finished build with scattered visual debt.
