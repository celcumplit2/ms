import {Collection} from '@/core/dto/collection';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {validate} from '@/core/validators';
import {database} from '@/database';
import {SelectArticle} from '@/modules/article/article.model';
import {ArticleRepository} from '@/modules/article/article.repository';
import {articleSchema} from '@/modules/article/articles.dto';
import {z} from 'zod';

let articleRepository: ArticleRepository | undefined;

function getArticleRepository(): ArticleRepository {
  if (!articleRepository) {
    articleRepository = new ArticleRepository(database);
  }

  return articleRepository;
}

export async function countArticles(): Promise<number> {
  return await getArticleRepository().countSearch({});
}

export async function countPublishedArticles(): Promise<number> {
  return await getArticleRepository().countPublished();
}

export async function countUnpublishedArticles(): Promise<number> {
  return await getArticleRepository().countUnpublished();
}

export async function browseArticles({offset, limit, search, relations = []}: {
  offset: number,
  limit: number,
  relations?: string[],
  search?: string
}): Promise<Collection<SelectArticle>> {
  const repository = getArticleRepository();
  const total = await repository.countSearch({search});
  const items = await repository.search({offset, limit, search, relations});

  return new Collection({items, total});
}

export async function readArticle({id}: { id: number }): Promise<SelectArticle | undefined> {
  return await getArticleRepository().oneById({id});
}

export async function readArticleByAlias({alias}: { alias: string }): Promise<SelectArticle | undefined> {
  return await getArticleRepository().oneByAlias({alias});
}

export async function addArticle({data}: { data: Record<string, unknown> }): Promise<number> {
  const repository = getArticleRepository();
  const schema = await articleSchema();
  const {meta, ...restPayload} = await validate(schema, data) as z.infer<typeof schema>;

  if (await repository.existsByAlias({alias: restPayload.alias})) {
    throw new UnprocessablePayload({alias: 'An article with such alias already exists.'});
  }

  const now = new Date();

  return await repository.save({
    entity: {
      ...restPayload,
      metaTitle: meta.title,
      metaDescription: meta.description,
      createdAt: now,
      updatedAt: now,
    }
  });
}

export async function editArticle({id, data}: { id: number, data: Record<string, unknown> }): Promise<number> {
  const repository = getArticleRepository();
  const schema = await articleSchema();
  const {meta, ...restPayload} = await validate(schema, data) as z.infer<typeof schema>;

  const article = await repository.oneById({id});

  if (article?.alias !== restPayload.alias && await repository.existsByAlias({alias: restPayload.alias})) {
    throw new UnprocessablePayload({alias: 'An article with such alias already exists.'});
  }

  const now = new Date();

  return await repository.save({
    id,
    entity: {
      ...restPayload,
      metaTitle: meta.title,
      metaDescription: meta.description,
      updatedAt: now,
    }
  });
}

export async function deleteArticle({id}: { id: number }): Promise<void> {
  await getArticleRepository().remove({id});
}
