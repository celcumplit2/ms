import {BASE_URL} from '@/config';
import {database} from '@/database';
import {InferNonNullableResultType} from '@/database/schema';
import {escapeString} from '@/helpers/xml';
import {ArticleRepository} from '@/modules/article/article.repository';
import {formatRFC3339} from 'date-fns';

export async function GET() {
  const articleRepository = new ArticleRepository(database);
  const articles = await articleRepository.allLatestPublished({
    offset: 0,
    limit: 100,
    relations: ['author', 'category'],
  }) as Array<InferNonNullableResultType<'article', { author: true, category: true }>>;
  const entries: string[] = [];

  articles.forEach(article => {
    // language=XML
    entries.push(`
      <entry>
        <title>${escapeString(article.title)}</title>
        <link rel="alternate" type="text/html" href="${(new URL(`/articles/p-${article.alias}`, BASE_URL)).toString()}"/>
        <id>${(new URL(`/articles/p-${article.alias}`, BASE_URL)).toString()}</id>
        <updated>${formatRFC3339(article.updatedAt)}</updated>
        <published>${formatRFC3339(article.publishedAt)}</published>
        ${article.author ? `<author>
          <name>${article.author.fullName}</name>
          <uri>${(new URL(`/authors/${article.author.alias}`, BASE_URL)).toString()}</uri>
        </author>` : ''}
        <contributor>
          <name>MoldStud Research Team</name>
        </contributor>
        <summary type="text">${article.intro}</summary>
      </entry>
    `);
  });

  // language=XML
  const atom = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title type="text">MoldStud Articles</title>
    <updated>${formatRFC3339(articles[0].publishedAt)}</updated>
    <id>${(new URL('/', BASE_URL)).toString()}</id>
    <link rel="alternate" type="text/html" hreflang="en" href="${(new URL('/', BASE_URL)).toString()}"/>
    <link rel="self" type="application/atom+xml" href="${(new URL('/atom.xml', BASE_URL)).toString()}"/>
    ${entries.join('')}
  </feed>`;

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
