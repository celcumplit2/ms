import {addCommentAction} from '@/modules/comment/comment.action';
import CommentForm from '@/components/dashboard/comments/comment-form';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';
import {PageProps} from '@/types/pages';
import {notFound} from 'next/navigation';

export default async function AddCategoryPage({params}: PageProps) {
    const articleId = (await params).articleId;

    if (Number.isNaN(articleId)) {
        return notFound();
    }

    const addCommentWithArticleIdAction = addCommentAction.bind(null, Number(articleId));

    return (
        <Page
            title="Add new comment"
            buttons={<BackButton href="/dashboard/comments"/>}
        >
            <CommentForm action={addCommentWithArticleIdAction}/>
        </Page>
    );
}
