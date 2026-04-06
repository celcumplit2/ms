import {SearchParams} from '@/types/pages';

export default function getPage({searchParams, defaultPerPage = 20}: { searchParams: Awaited<SearchParams>, defaultPerPage?: number }) {
    const page = searchParams.page && !Number.isNaN(searchParams.page) ? Number(searchParams.page) : 1;
    const perPage = searchParams.perPage && !Number.isNaN(searchParams.perPage) ? Number(searchParams.perPage) : defaultPerPage;

    return {
        page,
        perPage,
    };
}
