import {database} from '@/database';
import {ArticleStatus} from '@/modules/article/article.model';
import {AuthorRepository} from '@/modules/author/author.repository';
import {CategoryRepository} from '@/modules/category/category.repository';
import {z} from 'zod';

export async function articleSchema() {
  const authorRepository = new AuthorRepository(database);
  const categoryRepository = new CategoryRepository(database);

  return z.object({
    title: z.string().min(1).max(255),
    alias: z.string().min(1).max(500),
    image: z.string().min(1).max(255),
    authorId: z.coerce.number().min(1).refine(async (authorId: number) => authorRepository.exists({id: authorId})),
    categoryId: z.coerce.number().min(1).refine(async (categoryId: number) => categoryRepository.exists({id: categoryId})),
    intro: z.string().min(1).max(2500),
    content: z.string().min(1),
    meta: z.object({
      title: z.string().min(1).max(120), // TODO: Make it 70 after we switch to fully AI realtime-generated strategy.
      description: z.string().min(1).max(800), // TODO: Make it 500 after we switch to fully AI realtime-generated strategy.
    }),
    publishedAt: z.coerce.date(),
    status: z.enum(ArticleStatus),
    timeToRead: z.coerce.number().min(1),
  })
    .readonly();
}
