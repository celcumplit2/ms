import {importComment} from '@/modules/comment/comment.action';
import ImportForm from '@/components/dashboard/imports/import-form';
import Page from '@/components/dashboard/pages/page';

export default async function ImportCommentsPage() {
    const importEntitySchema = {
        name: 'string',
        email: 'string',
        content: 'string',
        blog_id: 'string',
        publish_at: 'string',
        status: 'published | unpublished',
    };

    return (
        <Page title="Import Comments from CSV file">
            <ImportForm
                action={importComment}
                entityImportSchema={JSON.stringify(importEntitySchema, null, 2)}
            />
        </Page>
    );
}
