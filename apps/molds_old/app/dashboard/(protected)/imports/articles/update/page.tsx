import {importUpdateArticle} from '@/modules/article/article.action';
import ImportForm from '@/components/dashboard/imports/import-form';
import Page from '@/components/dashboard/pages/page';

export default async function ImportUpdateArticlesPage() {
    const importEntitySchema = {
        id: 'string',
        description: 'string',
        image: 'string',
        intro: 'string',
        title: 'string',
        'meta.description': 'string',
        'meta.title': 'string',
    };

    return (
        <Page title="Update Articles from CSV file">
            <ImportForm
                action={importUpdateArticle}
                entityImportSchema={JSON.stringify(importEntitySchema, null, 2)}
            />
        </Page>
    );
}
