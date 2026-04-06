'use client';

import {redirect, RedirectType, usePathname} from 'next/navigation';

/*
 * Workaround to unify 404 error handling and improve SEO.
 *
 * Related issue: https://github.com/moldstud/moldstud.com/issues/38
 *
 * Here's how it works:
 * - We use a custom `app/404/page.tsx` page that calls the `notFound()` function to ensure the correct 404 status code.
 * - That triggers the rendering of `app/not-found.tsx`, which is a shared component for all "not found" cases.
 * - Since `not-found.tsx` is a server component and can't access `window.location`, we delegate pathname checking to a client component.
 * - In the client component, if the current pathname is not `/404`, we redirect all other 404s to `/404` for consistent handling.
 *
 * This strategy helps consolidate all broken links into a single SEO-friendly 404 page,
 * reducing error noise in Google Search Console.
 */
export default function ForOhForRedirect() {
    const pathname = usePathname();

    if (pathname !== '/404') {
        redirect('/404', RedirectType.replace);
    }

    return null;
}
