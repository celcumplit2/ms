import {BASE_URL} from '@/config';
import {ARTICLES_MAX_URLS_PER_SITEMAP} from '@/config/sitemap.config';
import {database} from '@/database';
import {SitemapIndex} from '@/helpers/sitemap/sitemap-index';
import {ArticleRepository} from '@/modules/article/article.repository';

export async function GET() {
  const sitemapIndex = new SitemapIndex();

  sitemapIndex.addSitemap(new URL('/pages.xml', BASE_URL));
  sitemapIndex.addSitemap(new URL('/authors/sitemap.xml', BASE_URL));
  sitemapIndex.addSitemap(new URL('/careers/sitemap.xml', BASE_URL));

  await addArticlesSitemaps(sitemapIndex);

  return new Response(sitemapIndex.toString(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

async function addArticlesSitemaps(sitemapIndex: SitemapIndex): Promise<void> {
  const articleRepository = new ArticleRepository(database);
  const countArticles = await articleRepository.countPublished();
  const articleBatches = Math.ceil(countArticles / ARTICLES_MAX_URLS_PER_SITEMAP);

  sitemapIndex.addSitemap(new URL('/articles/sitemap/categories.xml', BASE_URL));

  for (let i = 0; i < articleBatches; i++) {
    sitemapIndex.addSitemap(new URL(`/articles/sitemap/${i}.xml`, BASE_URL));
  }
}
