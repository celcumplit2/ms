import {deleteJobAction} from '@/modules/job/job.action';
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
import {JOB_WORKLOAD_MAP} from '@/helpers/mapping';
import getPage from '@/hooks/get-page';
import getSearch from '@/hooks/get-search';
import {browseJobs} from '@/modules/job/job.service';
import {PageProps} from '@/types/pages';
import {format} from 'date-fns';

export default async function JobsPage({searchParams}: PageProps) {
    const awaitedSearchParams = await searchParams;

    const {page, perPage} = getPage({searchParams: awaitedSearchParams});
    const {search} = getSearch({searchParams: awaitedSearchParams});
    const collection = await browseJobs({
        offset: (page - 1) * perPage,
        limit: perPage,
        search,
    });
    const columns = ['Title', 'Workload', 'Created At', ''];

    return (
        <>
            <Page
                title="Jobs"
                buttons={<AddButton href="/dashboard/jobs/add"/>}
            >
                <SearchForm action="/dashboard/jobs" defaultValue={search} className="mb-4"/>

                <DataTable thead={
                    <DataTableHead columns={columns}/>
                }>
                    {collection.items.map((job) => (
                        <tr key={`tr-${job.id}`}>
                            <Td>{job.title}</Td>
                            <Td>{job.workload.map((workload) => JOB_WORKLOAD_MAP[workload]).join(', ')}</Td>
                            <Td>{format(job.createdAt, 'd/M/yyyy')}</Td>
                            <Td>
                                <DataTableActions>
                                    <EditButton href={`/dashboard/jobs/edit/${job.id}`}/>
                                    <DeleteButton id={job.id} action={deleteJobAction}/>
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
                    rootPath="/dashboard/jobs"
                />
            </Page>
        </>
    );
}
