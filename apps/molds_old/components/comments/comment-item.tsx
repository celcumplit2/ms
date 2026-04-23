import {ArticleComment} from '@/modules/comment/article-comment';
import {formatDistanceStrict} from 'date-fns';

interface CommentItemProps {
    comment: ArticleComment;
}

export default function CommentItem({comment}: CommentItemProps) {
    return (
        <article>
            <header>
                <strong>{comment.name}</strong>
                <span>{formatDistanceStrict(new Date(), comment.publishedAt)} ago</span>
            </header>
            <p>{comment.content}</p>
        </article>
    );
}
