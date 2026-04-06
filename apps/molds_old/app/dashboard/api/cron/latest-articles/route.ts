import {database} from '@/database';
import {ArticleRepository} from '@/modules/article/article.repository';
import {CategoryRepository} from '@/modules/category/category.repository';
import {revalidatePath} from 'next/cache';

export async function POST() {
  const articleRepository = new ArticleRepository(database);
  const categoryRepository = new CategoryRepository(database);

  const categories = await categoryRepository.allRoots({offset: 0, limit: 96});
  const selectPromises = categories.map(category => articleRepository.allPublishedByParentCategory({
    offset: 0,
    limit: 4,
    parentId: category.id,
  }));
  const articles = await Promise.all(selectPromises);

  if (articles.flat().length === 0) {
    return new Response(JSON.stringify({success: true}), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  await articleRepository.removeLatestAll();

  for (const article of articles.flat()) {
    await articleRepository.saveLatest({entity: article});
  }

  const count = await articleRepository.countLatest({});

  revalidatePath('/articles');

  return new Response(JSON.stringify({success: count === 16, count}), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
