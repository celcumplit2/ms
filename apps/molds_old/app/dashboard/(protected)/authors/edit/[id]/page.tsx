import {editAuthorAction} from '@/modules/author/author.action';
import AuthorForm from '@/components/dashboard/authors/author-form';
import AddButton from '@/components/dashboard/pages/add-button';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';
import {readAuthor} from '@/modules/author/author.service';
import {PageProps} from '@/types/pages';
import {notFound} from 'next/navigation';

export default async function EditAuthorPage({params}: PageProps) {
    const id = (await params).id;

    if (Number.isNaN(id)) {
        return notFound();
    }

    const author = await readAuthor({id: Number(id)});

    if (!author) {
        return notFound();
    }

    const editAuthorWithIdAction = editAuthorAction.bind(null, Number(id));

    return (
        <Page
            title={`Edit - ${author.fullName}`}
            buttons={<div className="flex gap-2 justify-end">
                <AddButton href="/dashboard/authors/add"/>
                <BackButton href="/dashboard/authors"/>
            </div>}
        >
            <AuthorForm
                entity={author}
                action={editAuthorWithIdAction}
            />
        </Page>
    );
}
