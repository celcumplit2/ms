import {SearchParams} from '@/types/pages';

export default function getSearch({searchParams}: { searchParams: Awaited<SearchParams> }) {
  const search = searchParams.search && typeof searchParams.search === 'string' ? searchParams.search.trim() : undefined;

  return {
    search,
  };
}
