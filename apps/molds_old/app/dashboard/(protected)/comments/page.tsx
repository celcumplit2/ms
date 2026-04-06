import {deleteCommentAction} from '@/modules/comment/comment.action';
import DataTable from '@/components/dashboard/pages/data-table';
import DataTableHead from '@/components/dashboard/pages/data-table-head';
import DeleteButton from '@/components/dashboard/pages/delete-button';
import EditButton from '@/components/dashboard/pages/edit-button';
import Page from '@/components/dashboard/pages/page';
import Pagination from '@/components/dashboard/pages/pagination';
import Td from '@/components/dashboard/pages/td';
import SearchForm from '@/components/dashboard/search/search-form';
import {CommentStatus} from '@/modules/comment/comment.model';
import getPage from '@/hooks/get-page';
import getSearch from '@/hooks/get-search';
import {browseComments} from '@/modules/comment/comment.service';
import {PageProps} from '@/types/pages';
import clsx from 'clsx';
import {format} from 'date-fns';

export default async function CommentsPage({searchParams}: PageProps) {
    const awaitedSearchParams = await searchParams;

    const {page, perPage} = getPage({searchParams: awaitedSearchParams, defaultPerPage: 50});
    const {search} = getSearch({searchParams: awaitedSearchParams});
    const collection = await browseComments({
        offset: (page - 1) * perPage,
        limit: perPage,
        search,
    });
    const columns = ['Name', 'Email', 'Status', 'Publish At', 'Created At', ''];

    return (
        <Page title="Comments">
            <SearchForm action="/dashboard/comments" defaultValue={search} className="mb-4"/>

            <DataTable thead={
                <DataTableHead columns={columns}/>
            }>
                {collection.items.map((comment) => (
                    <tr key={`tr-${comment.id}`}>
                        <Td>{comment.name}</Td>
                        <Td>{comment.email}</Td>
                        <Td className={clsx({
                            'text-green-600': comment.status === CommentStatus.published,
                            'text-red-600': comment.status === CommentStatus.unpublished,
                            'text-yellow-600': comment.status === CommentStatus.draft,
                        })}>
                            {comment.status}
                        </Td>
                        <Td>{format(comment.publishedAt, 'd/M/yyyy')}</Td>
                        <Td>{format(comment.createdAt, 'd/M/yyyy')}</Td>
                        <Td>
                            <p className="flex gap-2">
                                <EditButton href={`/dashboard/comments/edit/${comment.id}`}/>
                                <DeleteButton id={comment.id} action={deleteCommentAction}/>
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
                rootPath="/dashboard/comments"
            />
        </Page>
    );
}
