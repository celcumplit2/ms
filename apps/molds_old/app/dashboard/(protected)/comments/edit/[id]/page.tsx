import {editCommentAction} from '@/modules/comment/comment.action';
import CommentForm from '@/components/dashboard/comments/comment-form';
import BackButton from '@/components/dashboard/pages/back-button';
import Page from '@/components/dashboard/pages/page';
import {readComment} from '@/modules/comment/comment.service';
import {PageProps} from '@/types/pages';
import {notFound} from 'next/navigation';

export default async function EditCategoryPage({params}: PageProps) {
    const id = (await params).id;

    if (Number.isNaN(id)) {
        return notFound();
    }

    const comment = await readComment({id: Number(id)});

    if (!comment) {
        return notFound();
    }

    const editCommentWithArticleIdAction = editCommentAction.bind(null, Number(id));

    return (
        <Page
            title={`Edit - Comment from ${comment.name}`}
            buttons={<BackButton href="/dashboard/comments"/>}
        >
            <CommentForm
                entity={comment}
                action={editCommentWithArticleIdAction}
            />
        </Page>
    );
}
