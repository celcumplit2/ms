import {deleteAuthorAction} from '@/modules/author/author.action';
import AddButton from '@/components/dashboard/pages/add-button';
import DataTable from '@/components/dashboard/pages/data-table';
import DataTableActions from '@/components/dashboard/pages/data-table-actions';
import DataTableHead from '@/components/dashboard/pages/data-table-head';
import DeleteButton from '@/components/dashboard/pages/delete-button';
import EditButton from '@/components/dashboard/pages/edit-button';
import Page from '@/components/dashboard/pages/page';
import Pagination from '@/components/dashboard/pages/pagination';
import Td from '@/components/dashboard/pages/td';
import SearchForm from '@/components/dashboard/search/search-form';
import getPage from '@/hooks/get-page';
import getSearch from '@/hooks/get-search';
import {browseAuthors} from '@/modules/author/author.service';
import {PageProps} from '@/types/pages';
import {format} from 'date-fns';

export default async function AuthorsPage({searchParams}: PageProps) {
    const awaitedSearchParams = await searchParams;

    const {page, perPage} = getPage({searchParams: awaitedSearchParams, defaultPerPage: 20});
    const {search} = getSearch({searchParams: awaitedSearchParams});
    const collection = await browseAuthors({
        offset: (page - 1) * perPage,
        limit: perPage,
        search,
    });
    const columns = ['Name', 'Position', 'Created At', ''];

    return (
        <Page
            title="Authors"
            buttons={<AddButton href="/dashboard/authors/add"/>}
        >
            <SearchForm action="/dashboard/authors" defaultValue={search} className="mb-4"/>

            <DataTable thead={
                <DataTableHead columns={columns}/>
            }>
                {collection.items.map((author) => (
                    <tr key={`tr-${author.id}`}>
                        <Td>{author.fullName}</Td>
                        <Td>{author.position}</Td>
                        <Td>{format(author.createdAt, 'd/M/yyyy')}</Td>
                        <Td>
                            <DataTableActions>
                                <EditButton href={`/dashboard/authors/edit/${author.id}`}/>
                                <DeleteButton id={author.id} action={deleteAuthorAction}/>
                            </DataTableActions>
                        </Td>
                    </tr>
                ))}
            </DataTable>
            <Pagination
                className="mt-3"
                totalRecords={collection.total}
                recordsPerPage={perPage}
                currentPage={page}
                rootPath="/dashboard/authors"
            />
        </Page>
    );
}
