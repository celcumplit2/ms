import {addJobAction} from '@/modules/job/job.action';
import JobForm from '@/components/dashboard/jobs/job-form';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';

export default async function AddJobPage() {
    return (
        <Page
            title="Add new job"
            buttons={<BackButton href="/dashboard/jobs" />}
        >
            <JobForm
                action={addJobAction}
            />
        </Page>
    );
}
