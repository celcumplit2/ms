import {updateCategoryDescription} from '@/modules/category/category.action';
import ImportForm from '@/components/dashboard/imports/import-form';
import Page from '@/components/dashboard/pages/page';

export default async function UpdateCategoryDescriptionPage() {
    const importEntitySchema = {
        Category: 'string',
        Content: 'string',
    };

    return (
        <Page title="Update Category Descriptions from CSV file">
            <ImportForm
                action={updateCategoryDescription}
                entityImportSchema={JSON.stringify(importEntitySchema, null, 2)}
            />
        </Page>
    );
}
