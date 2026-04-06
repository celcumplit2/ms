import {importJobAction} from '@/modules/job/job.action';
import ImportForm from '@/components/dashboard/imports/import-form';
import Page from '@/components/dashboard/pages/page';

export default async function ImportJobsPage() {
    const importEntitySchema = {
        alias: 'string',
        title: 'string',
        category: 'backend | frontend',
        intro: 'string',
        seniority: 'Mid-Level | Senior-Level',
        type: 'Full-Time',
        location: 'Remote',
        description: 'string',
        hardSkills: 'string[]',
        softSkills: 'string[]',
        timezone: 'string',
        workingHours: 'string',
        management: 'Scrum',
        timeSize: 'string',
        recruitmentSteps: 'Array<{duration: number, description: string}>',
    };

    return (
        <Page title="Import Jobs from CSV file">
            <ImportForm
                action={importJobAction}
                entityImportSchema={JSON.stringify(importEntitySchema, null, 2)}
            />
        </Page>
    );
}
