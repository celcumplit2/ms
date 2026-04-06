import {importArticle} from '@/modules/article/article.action';
import ImportForm from '@/components/dashboard/imports/import-form';
import Page from '@/components/dashboard/pages/page';

export default async function ImportArticlesPage() {
    const importEntitySchema = {
        category: 'string',
        description: 'string',
        image: 'string',
        intro: 'string',
        'meta.description': 'string',
        'meta.title': 'string',
        publishAt: 'string',
        root: 'string',
        status: 'string',
        timeToRead: 'string',
        title: 'string',
    };

    return (
        <Page title="Import Articles from CSV file">
            <ImportForm
                action={importArticle}
                entityImportSchema={JSON.stringify(importEntitySchema, null, 2)}
            />
        </Page>
    );
}
