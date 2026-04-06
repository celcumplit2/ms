'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React, {useMemo} from 'react';
import {UrlObject} from 'url';

interface PaginationProps {
    rootPath: string;
    totalRecords: number,
    currentPage: number,
    recordsPerPage: number,
    pageNeighbours?: number,
    className?: string;
}

interface PageItem {
    index?: number,
    label?: number,
    active?: boolean,
    divider?: boolean,
}

export default function Pagination(
    {
        rootPath,
        totalRecords,
        currentPage,
        recordsPerPage,
        pageNeighbours = 3,
        className,
    }: PaginationProps,
) {
    const firstPage = 1;
    const lastPage = useMemo<number>(() => Math.max(
        firstPage,
        Math.ceil(totalRecords / recordsPerPage),
    ), [firstPage, totalRecords, recordsPerPage]);
    const hasOnePage = useMemo<boolean>(() => lastPage === 1, [lastPage]);
    const previousPage = useMemo<number | null>(() => currentPage - 1 >= firstPage ? currentPage - 1 : null, [currentPage, firstPage]);
    const nextPage = useMemo<number | null>(() => currentPage + 1 <= lastPage ? currentPage + 1 : null, [currentPage, lastPage]);
    const pages = useMemo<PageItem[]>(() => {
        const pageArray = [];
        const startingPage = currentPage - pageNeighbours >= firstPage
            ? currentPage - pageNeighbours
            : firstPage;
        const endingPage = currentPage + pageNeighbours < lastPage
            ? currentPage + pageNeighbours
            : lastPage;

        if (startingPage > 1) {
            pageArray.push({
                index: firstPage,
                label: firstPage,
                active: firstPage === currentPage,
            });
        }

        if (startingPage > 2) {
            pageArray.push({divider: true});
        }

        for (let index = startingPage; index <= endingPage; index++) {
            pageArray.push({
                index: index,
                label: index,
                active: index === currentPage,
            });
        }

        if (endingPage < lastPage - 1) {
            pageArray.push({divider: true});
        }

        if (endingPage < lastPage) {
            pageArray.push({
                index: lastPage,
                label: lastPage,
                active: lastPage === currentPage,
            });
        }

        return pageArray;
    }, [firstPage, lastPage, currentPage, pageNeighbours]);

    function getPageUrl(index: number): UrlObject {
        return index === 1 ? {
            pathname: rootPath,
        } : {
            pathname: rootPath,
            search: `page=${index}`,
        };
    }

    return hasOnePage
        ? null
        : (
            <nav className={clsx('flex gap-2 justify-center', className)}>
                {previousPage !== null ? (
                    <Link
                        href={getPageUrl(previousPage)}
                        aria-label="Previous page"
                        className="border border-gray-400 px-2 py-1"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                ) : (
                    <span
                        aria-hidden="true"
                        className="border border-gray-400 px-2 py-1 opacity-50"
                    >&laquo;</span>
                )}

                {pages.map((page, index) => {
                    return page.divider
                        ?
                        <span
                            key={`pagination-item-${index}`}
                            aria-hidden="true"
                            className="py-1"
                        >...</span>
                        : <Link
                            key={`pagination-item-${index}`}
                            href={getPageUrl(page.index!)}
                            aria-label="Previous page"
                            className={clsx('border border-gray-400 px-2 py-1', {
                                'border-blue-700 text-blue-700': page.active,
                            })}
                        >
                            {page.label}
                        </Link>;
                })}

                {nextPage !== null ? (
                    <Link
                        href={getPageUrl(nextPage)}
                        aria-label="Next page"
                        className="border border-gray-400 px-2 py-1"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                ) : (
                    <span
                        aria-hidden="true"
                        className="border border-gray-400 px-2 py-1 opacity-50"
                    >&raquo;</span>
                )}
            </nav>
        );
};
