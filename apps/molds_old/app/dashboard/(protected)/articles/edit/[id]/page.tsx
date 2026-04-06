import {editArticleAction, getAuthorSelectOptions, getCategorySelectOptions} from '@/modules/article/article.action';
import ArticleForm from '@/components/dashboard/articles/article-form';
import AddButton from '@/components/dashboard/pages/add-button';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';
import {readArticle} from '@/modules/article/article.service';
import {PageProps} from '@/types/pages';
import {notFound} from 'next/navigation';

export default async function EditArticlePage({params}: PageProps) {
    const id = (await params).id;

    if (Number.isNaN(id)) {
        return notFound();
    }

    const article = await readArticle({id: Number(id)});

    if (!article) {
        return notFound();
    }

    const editArticleActionWithId = editArticleAction.bind(null, article.id);

    return (
        <Page
            title={`Edit - ${article.title}`}
            buttons={<div className="flex gap-2 justify-end">
                <AddButton href="/dashboard/articles/add"/>
                <BackButton href="/dashboard/articles"/>
            </div>}
        >
            <ArticleForm
                // action={editArticleAction}
                action={editArticleActionWithId}
                entity={article}
                authorOptions={await getAuthorSelectOptions()}
                categoryOptions={await getCategorySelectOptions()}
            />
        </Page>
    );
}
