import {addCategoryAction, getParentSelectOptions} from '@/modules/category/category.action';
import CategoryForm from '@/components/dashboard/categories/category-form';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';

export default async function AddCategoryPage() {
    return (
        <Page
            title="Add new category"
            buttons={<BackButton href="/dashboard/categories" />}
        >
            <CategoryForm
                action={addCategoryAction}
                parentOptions={await getParentSelectOptions()}
            />
        </Page>
    );
}
