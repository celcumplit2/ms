import {editJobAction} from '@/modules/job/job.action';
import JobForm from '@/components/dashboard/jobs/job-form';
import AddButton from '@/components/dashboard/pages/add-button';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';
import {readJob} from '@/modules/job/job.service';
import {PageProps} from '@/types/pages';
import {notFound} from 'next/navigation';

export default async function EditCategoryPage({params}: PageProps) {
    const id = (await params).id;

    if (Number.isNaN(id)) {
        return notFound();
    }

    const job = await readJob({id: Number(id)});

    if (!job) {
        return notFound();
    }

    const editJobActionWithId = editJobAction.bind(null, job.id);

    return (
        <Page
            title={`Edit - ${job.title}`}
            buttons={<div className="flex gap-2 justify-end">
                <AddButton href="/dashboard/jobs/add"/>
                <BackButton href="/dashboard/jobs"/>
            </div>}
        >
            <JobForm
                entity={job}
                action={editJobActionWithId}
            />
        </Page>
    );
}
