import {editCategoryAction, getParentSelectOptions} from '@/modules/category/category.action';
import CategoryForm from '@/components/dashboard/categories/category-form';
import AddButton from '@/components/dashboard/pages/add-button';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';
import {readCategory} from '@/modules/category/category.service';
import {PageProps} from '@/types/pages';
import {notFound} from 'next/navigation';

export default async function EditCategoryPage({params}: PageProps) {
    const id = (await params).id;

    if (Number.isNaN(id)) {
        return notFound();
    }

    const category = await readCategory({id: Number(id)});

    if (!category) {
        return notFound();
    }

    const editCategoryActionWithId = editCategoryAction.bind(null, category.id);

    return (
        <Page
            title={`Edit - ${category.name}`}
            buttons={<div className="flex gap-2 justify-end">
                <AddButton href="/dashboard/categories/add"/>
                <BackButton href="/dashboard/categories"/>
            </div>}
        >
            <CategoryForm
                entity={category}
                action={editCategoryActionWithId}
                parentOptions={await getParentSelectOptions()}
            />
        </Page>
    );
}
