import {SelectComment} from '@/modules/comment/comment.model';
import {formatDistanceStrict} from 'date-fns';

interface CommentItemProps {
    comment: SelectComment;
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
