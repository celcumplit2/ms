import ArticleStatistics from '@/components/dashboard/article-statistics';
import AuthorStatistics from '@/components/dashboard/author-statistics';
import CategoryStatistics from '@/components/dashboard/category-statistics';
import CommentStatistics from '@/components/dashboard/comment-statistics';
import Page from '@/components/dashboard/pages/page';

export default async function DashboardPage() {
    return (
        <Page title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <ArticleStatistics />
                <CategoryStatistics />
                <CommentStatistics />
                <AuthorStatistics />
            </div>
        </Page>
    );
}
