import {addAuthorAction} from '@/modules/author/author.action';
import AuthorForm from '@/components/dashboard/authors/author-form';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';

export default async function AddAuthorPage() {
    return (
        <Page
            title="Add new author"
            buttons={<BackButton href="/dashboard/authors"/>}
        >
            <AuthorForm
                action={addAuthorAction}
            />
        </Page>
    );
}
