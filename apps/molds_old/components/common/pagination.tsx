import type {UrlObject} from 'url';
import Link from 'next/link';
import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';
import {clsx} from 'clsx';
import styles from '@/styles/scss/layout/pagination.module.scss';

export interface PaginationProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    page: number;
    total: number;
    root: string;
    perPage?: number;
    neighbours?: number;
}

interface PageItem {
    divider?: boolean;
    index?: number;
    label?: number;
    href?: UrlObject;
    active?: boolean;
    first?: boolean;
    last?: boolean;
}

interface GetPagesProps {
    page: number;
    neighbours: number;
    firstPage: number;
    lastPage: number;
    root: string;
}

function getHref({index, firstPage, root}: { index: number; firstPage: number; root: string; }): UrlObject {
    return index === firstPage ? {pathname: root} : {pathname: root, query: `page=${index}`};
}

function getPages({page, neighbours, firstPage, lastPage, root}: GetPagesProps): PageItem[] {
    const pages: PageItem[] = [];

    const startingPage = page - neighbours > firstPage
        ? page - neighbours
        : firstPage;
    const endingPage = page + neighbours < lastPage
        ? page + neighbours
        : lastPage;

    if (startingPage > firstPage) {
        pages.push({
            index: firstPage,
            label: firstPage,
            href: getHref({index: firstPage, firstPage, root}),
            active: false,
            first: true,
            last: false,
        });
    }

    if (startingPage > firstPage + 1) {
        pages.push({divider: true, index: 1});
    }

    for (let index = startingPage; index <= endingPage; index++) {
        pages.push({
            index,
            label: index,
            href: getHref({index, firstPage, root}),
            active: index === page,
            first: firstPage === index,
            last: lastPage === index,
        });
    }

    if (endingPage < lastPage - 1) {
        pages.push({divider: true, index: 2});
    }

    if (endingPage < lastPage) {
        pages.push({
            index: lastPage,
            label: lastPage,
            href: getHref({index: lastPage, firstPage, root}),
            active: false,
            first: false,
            last: true,
        });
    }

    return pages;
}

const arrow: ReactNode = (<svg width="12" height="12" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z"
          fill="currentColor"/>
</svg>);

export default function Pagination({page, total, root, perPage = 36, neighbours = 1, className, ...restProps}: PaginationProps) {
    const firstPage = 1;
    const lastPage = Math.max(firstPage, Math.ceil(total / perPage));
    const hasPrevious = page > firstPage;
    const hasNext = page < lastPage;
    const nextPageHref = hasNext ? getHref({index: page + 1, firstPage, root}) : null;
    const previousPageHref = hasPrevious ? getHref({index: page - 1, firstPage, root}) : null;
    const pages = getPages({page, neighbours, firstPage, lastPage, root});

    return pages.length <= 1
        ? null
        : (
            <nav className={clsx(styles['pagination'], className)} aria-label="Pagination" {...restProps}>
                {previousPageHref ? (
                    <Link href={previousPageHref} aria-label="Previous page">{arrow}</Link>
                ) : (
                    <span>{arrow}</span>
                )}

                {pages.map((item) => {
                    let ariaLabel = `Page ${item.label}`;

                    if (item.first && item.last) {
                        ariaLabel = `Single page, page ${item.label}`;
                    } else if (item.first) {
                        ariaLabel = `First page, page ${item.label}`;
                    } else if (item.last) {
                        ariaLabel = `Last page, page ${item.label}`;
                    }

                    return (
                        item.divider ? (
                            <span key={`pagination-more-${item.index}`} aria-hidden="true">...</span>
                        ) : (item.active ? (
                            <Link key={`${item.href?.pathname}?${item.href?.query}`} href={item.href!} className={styles['active']} aria-label={ariaLabel}
                                  aria-current="page">
                                {item.label}
                            </Link>
                        ) : (
                            <Link key={`${item.href?.pathname}?${item.href?.query}`} href={item.href!} aria-label={ariaLabel}>{item.label}</Link>
                        ))
                    );
                })}

                {nextPageHref ? (
                    <Link href={nextPageHref} aria-label="Next page">{arrow}</Link>
                ) : (
                    <span>{arrow}</span>
                )}
            </nav>
        );
}
