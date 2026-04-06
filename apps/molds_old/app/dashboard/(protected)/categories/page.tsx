import {deleteCategoryAction} from '@/modules/category/category.action';
import AddButton from '@/components/dashboard/pages/add-button';
import DataTable from '@/components/dashboard/pages/data-table';
import DataTableHead from '@/components/dashboard/pages/data-table-head';
import DeleteButton from '@/components/dashboard/pages/delete-button';
import EditButton from '@/components/dashboard/pages/edit-button';
import Page from '@/components/dashboard/pages/page';
import Pagination from '@/components/dashboard/pages/pagination';
import Td from '@/components/dashboard/pages/td';
import SearchForm from '@/components/dashboard/search/search-form';
import {InferNonNullableResultType} from '@/database/schema';
import getPage from '@/hooks/get-page';
import getSearch from '@/hooks/get-search';
import {browseCategories} from '@/modules/category/category.service';
import {PageProps} from '@/types/pages';

export default async function CategoriesPage({searchParams}: PageProps) {
    const awaitedSearchParams = await searchParams;

    const {page, perPage} = getPage({searchParams: awaitedSearchParams});
    const {search} = getSearch({searchParams: awaitedSearchParams});
    const collection = await browseCategories({
        offset: (page - 1) * perPage,
        limit: perPage,
        relations: ['parent'],
        search,
    });
    const columns = ['Name', 'Alias', 'Parent', ''];

    return (
        <Page
            title="Categories"
            buttons={<AddButton href="/dashboard/categories/add"/>}
        >
            <SearchForm action="/dashboard/categories" defaultValue={search} className="mb-4"/>

            <DataTable thead={
                <DataTableHead columns={columns}/>
            }>
                {collection.items.map((category) => (
                    <tr key={`tr-${category.id}`}>
                        <Td>
                            <p className="flex flex-col gap-1">
                                {category.name}
                                <span className="text-xs font-medium">{category.id}</span>
                            </p>
                        </Td>
                        <Td>
                            <a
                                className="underline hover:no-underline"
                                href={`https://moldstud.com/articles/c-${category.alias}`}
                                target="_blank"
                            >
                                {category.alias}
                            </a>
                        </Td>
                        <Td>
                            {category.parentId ? (
                                <p className="flex flex-col gap-1">
                                    <span>{(category as InferNonNullableResultType<'category', { parent: true }>).parent!.name}</span>
                                    <span className="text-xs font-medium">{category.parentId}</span>
                                </p>
                            ) : (
                                <span className="p-2 bg-green-300 text-center rounded-xl">Root</span>
                            )}
                        </Td>
                        <Td>
                            <p className="flex gap-2">
                                <EditButton href={`/dashboard/categories/edit/${category.id}`}/>
                                <DeleteButton id={category.id} action={deleteCategoryAction}/>
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
                rootPath="/dashboard/categories"
            />
        </Page>
    );
}
