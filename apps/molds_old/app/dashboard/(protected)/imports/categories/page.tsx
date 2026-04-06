import {importCategory} from '@/modules/category/category.action';
import ImportForm from '@/components/dashboard/imports/import-form';
import Page from '@/components/dashboard/pages/page';

export default async function ImportCategoriesPage() {
    const importEntitySchema = {
        parent: 'string | null',
        title: 'string',
    };

    return (
        <Page title="Import Categories from CSV file">
            <ImportForm
                action={importCategory}
                entityImportSchema={JSON.stringify(importEntitySchema, null, 2)}
            />
        </Page>
    );
}
