import {database} from '@/database';
import {CommentStatus} from '@/modules/comment/comment.model';
import {ArticleRepository} from '@/modules/article/article.repository';
import {z} from 'zod';

export async function commentSchema() {
  const repository = new ArticleRepository(database);

  return z.object({
    articleId: z.coerce
      .number()
      .min(1)
      .refine(async (id: number) => await repository.exists({id})),
    name: z.string().min(1).max(150),
    email: z.email().min(1).max(254),
    status: z.enum(CommentStatus).default(CommentStatus.draft),
    content: z.string().min(1).max(4000),
    publishedAt: z.coerce.date().default(new Date()),
  })
    .readonly();
}
