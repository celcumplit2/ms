import {BASE_URL} from '@/config';
import {getArticleImage} from '@/modules/article/article.config';
import {ARTICLES_MAX_URLS_PER_SITEMAP} from '@/config/sitemap.config';
import {database} from '@/database';
import {ArticleRepository} from '@/modules/article/article.repository';
import {CategoryRepository} from '@/modules/category/category.repository';
import {MetadataRoute} from 'next';
import {notFound} from 'next/navigation';

export async function generateSitemaps() {
  const articleRepository = new ArticleRepository(database);
  const countArticles = await articleRepository.countPublished();
  const articleBatches = Math.ceil(countArticles / ARTICLES_MAX_URLS_PER_SITEMAP);
  const ids = [{id: 'categories'}];

  for (let i = 0; i < articleBatches; i++) {
    ids.push({id: String(i)});
  }

  return ids;
}

export default async function sitemap({id}: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const awaitedId = await id;

  if (awaitedId === 'categories') {
    return getCategories();
  } else if (awaitedId.trim() === '' || Number.isNaN(Number(awaitedId))) {
    return notFound();
  }

  return getArticles(Number(awaitedId));
}

async function getCategories(): Promise<MetadataRoute.Sitemap> {
  const CATEGORY_BATCH_COUNT = 1000;
  const categoryRepository = new CategoryRepository(database);
  const categoryCount = await categoryRepository.count({});
  const categoryBatches = Math.ceil(categoryCount / CATEGORY_BATCH_COUNT);
  const categoryPromises = [];

  for (let i = 0; i < categoryBatches; i++) {
    categoryPromises.push(categoryRepository.sitemap({limit: CATEGORY_BATCH_COUNT, offset: i * CATEGORY_BATCH_COUNT}));
  }

  const categoryResult = await Promise.all(categoryPromises);

  return [
    {
      url: new URL('/articles', BASE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: 'daily',
    },
    ...categoryResult.flatMap((categories) => categories.map((category) => ({
      url: new URL(`/articles/c-${category.alias}`, BASE_URL).toString(),
      lastModified: category.updatedAt,
      changeFrequency: 'daily' as const,
    }))),
  ];
}

async function getArticles(id: number): Promise<MetadataRoute.Sitemap> {
  const articleRepository = new ArticleRepository(database);
  const articles = await articleRepository.sitemap({offset: id * ARTICLES_MAX_URLS_PER_SITEMAP, limit: ARTICLES_MAX_URLS_PER_SITEMAP});

  return articles.map((article) => ({
    url: new URL(`/articles/p-${article.alias}`, BASE_URL).toString(),
    lastModified: article.updatedAt,
    changeFrequency: 'weekly',
    images: article.image ? [getArticleImage({src: article.image})] : [],
    news: {
      publicationName: 'MoldStud',
      publicationLanguage: 'en',
      publicationDate: article.publishedAt,
      title: article.title,
    },
  }));
}
