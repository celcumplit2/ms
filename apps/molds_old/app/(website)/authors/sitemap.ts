import {BASE_URL} from '@/config';
import {database} from '@/database';
import {Url} from '@/helpers/sitemap/sitemap';
import {AuthorRepository} from '@/modules/author/author.repository';

export default async function sitemap() {
  const urls: Url[] = [{
    url: new URL('/authors', BASE_URL).toString(),
    changeFrequency: 'monthly',
    lastModified: new Date('2025-01-26'),
  }];
  const repository = new AuthorRepository(database);
  const authors = await repository.search({offset: 0, limit: 500, relations: []});

  authors.forEach((author) => {
    urls.push({
      url: new URL(`/authors/${author.alias}`, BASE_URL).toString(),
      changeFrequency: 'weekly',
      lastModified: author.updatedAt,
    });
  });

  return urls;
}
