import {addArticleAction, getAuthorSelectOptions, getCategorySelectOptions} from '@/modules/article/article.action';
import ArticleForm from '@/components/dashboard/articles/article-form';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';

export default async function AddArticlePage() {
    return (
        <Page
            title="Add new article"
            buttons={<BackButton href="/dashboard/articles" />}
        >
            <ArticleForm
                action={addArticleAction}
                authorOptions={await getAuthorSelectOptions()}
                categoryOptions={await getCategorySelectOptions()}
            />
        </Page>
    );
}
