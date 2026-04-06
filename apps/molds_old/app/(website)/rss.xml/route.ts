import {BASE_URL} from '@/config';
import {database} from '@/database';
import {InferNonNullableResultType} from '@/database/schema';
import {escapeString} from '@/helpers/xml';
import {ArticleRepository} from '@/modules/article/article.repository';
import {format} from 'date-fns';

export async function GET() {
  const articleRepository = new ArticleRepository(database);
  const articles = await articleRepository.allLatestPublished({
    offset: 0,
    limit: 100,
    relations: ['author', 'category'],
  }) as Array<InferNonNullableResultType<'article', { author: true, category: true }>>;
  const items: string[] = [];

  articles.forEach(article => {
    // language=XML
    items.push(`
      <item>
        <title>${escapeString(article.title)}</title>
        <guid>${(new URL(`/articles/p-${article.alias}`, BASE_URL)).toString()}</guid>
        <link>${(new URL(`/articles/p-${article.alias}`, BASE_URL)).toString()}</link>
        <description>${escapeString(article.intro)}</description>
        <pubDate>${format(article.publishedAt, 'E, dd MMM yyyy HH:mm:ss')} +0300</pubDate>
        ${article.category ? `<category>${article.category.name}</category>` : ''}
      </item>
    `);
  });

  // language=XML
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>MoldStud Articles</title>
      <link>${BASE_URL}</link>
      <description>Dive into the expansive world of custom software development with our comprehensive collection of articles. Here, we delve into a
        wide range of categories, covering everything from the foundational aspects of software engineering to the latest trends and technologies
        shaping the industry. Whether you're a seasoned developer looking for advanced techniques or a business leader seeking strategic advice on
        software solutions, our collection of articles has something for everyone. Explore our categories to discover practical tips, in-depth
        analyses, and expert opinions designed to empower your software development journey. Stay ahead of the curve with our expertly curated
        content, tailored to address the complexities and challenges of custom software development.
      </description>
      <language>en-us</language>
      <atom:link href="${(new URL('/rss.xml', BASE_URL)).toString()}" rel="self" type="application/rss+xml"/>
      ${items.join('')}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
