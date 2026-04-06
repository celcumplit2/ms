import CommentItem from '@/components/comments/comment-item';
import {SelectComment} from '@/modules/comment/comment.model';
import styles from '@/styles/scss/comments/comment-list.module.scss';

interface CommentListProps {
    comments: SelectComment[];
}

export default function CommentList({comments}: CommentListProps) {
    return comments.length > 0 ? (
        <section id={styles['comment-list']}>
            <h3>Comments ({comments.length})</h3>
            {comments.map((comment) => (<CommentItem key={comment.id} comment={comment}/>))}
        </section>
    ) : null;
}
