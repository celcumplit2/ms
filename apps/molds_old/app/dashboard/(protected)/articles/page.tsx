import {deleteArticleAction} from '@/modules/article/article.action';
import FlushCache from '@/components/dashboard/articles/flush-cache';
import AddButton from '@/components/dashboard/pages/add-button';
import DataTable from '@/components/dashboard/pages/data-table';
import DataTableHead from '@/components/dashboard/pages/data-table-head';
import DeleteButton from '@/components/dashboard/pages/delete-button';
import EditButton from '@/components/dashboard/pages/edit-button';
import Page from '@/components/dashboard/pages/page';
import Pagination from '@/components/dashboard/pages/pagination';
import Td from '@/components/dashboard/pages/td';
import SearchForm from '@/components/dashboard/search/search-form';
import {Collection} from '@/core/dto/collection';
import {InferNonNullableResultType} from '@/database/schema';
import getPage from '@/hooks/get-page';
import getSearch from '@/hooks/get-search';
import {browseArticles} from '@/modules/article/article.service';
import {PageProps} from '@/types/pages';
import {IconMessagePlus} from '@tabler/icons-react';
import {format} from 'date-fns';
import Link from 'next/link';

export default async function ArticlesPage({searchParams}: PageProps) {
    const awaitedSearchParams = await searchParams;

    const {page, perPage} = getPage({searchParams: awaitedSearchParams});
    const {search} = getSearch({searchParams: awaitedSearchParams});
    const collection = await browseArticles({
        offset: (page - 1) * perPage,
        limit: perPage,
        search,
        relations: ['author', 'category'],
    }) as Collection<InferNonNullableResultType<'article', { category: true, author: true }>>;
    const columns = ['Title', 'Category', 'Author', 'Published At', ''];

    return (
        <Page title="Articles" buttons={<AddButton href="/dashboard/articles/add"/>}>
            <div className="flex gap-x-3 justify-between">
                <SearchForm action="/dashboard/articles" defaultValue={search} className="mb-4"/>
                <FlushCache/>
            </div>

            <DataTable thead={
                <DataTableHead columns={columns}/>
            }>
                {collection.items.map((article) => (
                    <tr key={`tr-${article.id}`}>
                        <Td>
                            <p className="flex flex-col gap-1">
                                <a
                                    className="underline hover:no-underline"
                                    href={`https://moldstud.com/articles/p-${article.alias}`}
                                    target="_blank"
                                >
                                    {article.title}
                                </a>
                                <span className="text-xs font-medium">{article.alias}</span>
                            </p>
                        </Td>
                        <Td>
                            <p className="flex flex-col gap-1">
                                {article.category && (
                                    <span>{article.category.name}</span>
                                )}
                                <span className="text-xs font-medium">Category ID: {article.categoryId}</span>
                            </p>
                        </Td>
                        <Td>{article.author && article.author.fullName}</Td>
                        <Td>{format(article.publishedAt, 'd/M/yyyy')}</Td>
                        <Td>
                            <p className="flex gap-2">
                                <EditButton href={`/dashboard/articles/edit/${article.id}`}/>
                                <DeleteButton id={article.id} action={deleteArticleAction}/>
                                <Link
                                    href={`/dashboard/comments/add/${article.id}`}
                                    className="text-green-600 hover:text-green-900"
                                >
                                    <IconMessagePlus/>
                                </Link>
                            </p>
                        </Td>
                    </tr>
                ))}
            </DataTable>

            <Pagination
                className="mt-3"
                totalRecords={collection.total}
                recordsPerPage={perPage}
                currentPage={page}
                rootPath="/dashboard/articles"
            />
        </Page>
    );
}
