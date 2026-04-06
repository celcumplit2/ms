import {RECOMMENDED_ARTICLE_LINKS} from '@/modules/article/article.config';
import {CustomRepository} from '@/core/repositories/custom-repository';
import {
  article,
  ArticleStatus,
  InsertArticle,
  InsertLatestArticle,
  latestArticle,
  SelectArticle,
  SelectLatestArticle,
} from '@/modules/article/article.model';
import {category} from '@/modules/category/category.model';
import {comment, CommentStatus} from '@/modules/comment/comment.model';
import {and, asc, desc, eq, gt, inArray, like, lte, ne, or, SQL, type ValueOrArray} from 'drizzle-orm';

export class ArticleRepository extends CustomRepository {
  async all({limit, filter, sort, offset = 0, relations = []}: {
    limit: number,
    offset?: number,
    filter?: SQL<unknown>,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
  }): Promise<SelectArticle[]> {
    return this.database
      .query
      .article
      .findMany({
        where: filter,
        offset,
        limit,
        orderBy: sort,
        with: this.convertRelations(relations),
      });
  }

  async search({limit, search, offset = 0, sort = desc(article.publishedAt), relations = []}: {
    limit: number,
    offset?: number,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
    search?: string,
  }): Promise<SelectArticle[]> {
    return this.all({
      limit,
      offset,
      filter: search
        ? or(
          like(article.title, `%${search}%`),
          like(article.alias, `%${search}%`),
          like(article.intro, `%${search}%`),
          like(article.content, `%${search}%`),
        )
        : undefined,
      sort,
      relations,
    });
  }

  async sitemap({offset, limit}: { offset: number, limit: number }) {
    return this.database
      .select({
        alias: article.alias,
        title: article.title,
        image: article.image,
        status: article.status,
        updatedAt: article.updatedAt,
        publishedAt: article.publishedAt,
      })
      .from(article)
      .where(and(
        eq(article.status, ArticleStatus.published),
        lte(article.publishedAt, new Date()),
      ))
      .orderBy(asc(article.publishedAt))
      .offset(offset)
      .limit(limit);
  }

  async allPublished({offset = 0, limit, sort = asc(article.publishedAt), relations = []}: {
    limit: number,
    offset?: number,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
  }): Promise<SelectLatestArticle[]> {
    return this.all({
      limit,
      offset,
      filter: and(
        eq(latestArticle.status, ArticleStatus.published),
        lte(latestArticle.publishedAt, new Date()),
      ),
      sort,
      relations,
    });
  }

  async allPublishedByCategory({categoryId, limit, offset = 0, sort = desc(article.publishedAt), relations = []}: {
    categoryId: number,
    limit: number,
    offset?: number,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
  }): Promise<SelectArticle[]> {
    return this.all({
      limit,
      offset,
      filter: and(
        eq(article.categoryId, categoryId),
        eq(article.status, ArticleStatus.published),
        lte(article.publishedAt, new Date()),
      ),
      sort,
      relations,
    });
  }

  async allLatestPublished({offset = 0, limit, relations = []}: {
    offset: number,
    limit: number,
    relations?: string[]
  }): Promise<SelectLatestArticle[]> {
    return this.database
      .query
      .latestArticle
      .findMany({
        where: and(
          eq(latestArticle.status, ArticleStatus.published),
          lte(latestArticle.publishedAt, new Date()),
        ),
        offset,
        limit,
        orderBy: desc(latestArticle.publishedAt),
        with: this.convertRelations(relations),
      });
  }

  async allPublishedByParentCategory({parentId, limit, offset = 0}: {
    parentId: number,
    limit: number,
    offset?: number,
  }): Promise<SelectArticle[]> {
    return this.database
      // @ts-expect-error Seems like a Drizzle issue with types.
      .select(article)
      .from(article)
      .leftJoin(category, eq(article.categoryId, category.id))
      .where(
        and(
          eq(category.parentId, parentId),
          eq(article.status, ArticleStatus.published),
          lte(article.publishedAt, new Date()),
        ),
      )
      .orderBy(desc(article.publishedAt))
      .offset(offset)
      .limit(limit) as unknown as SelectArticle[];
  }

  async allLatestPublishedByAuthor({authorId, limit, relations = []}: {
    authorId: number,
    limit: number,
    relations?: string[],
  }): Promise<SelectArticle[]> {
    return this.all({
      limit,
      offset: 0,
      filter: and(
        eq(article.authorId, authorId),
        eq(article.status, ArticleStatus.published),
        lte(article.publishedAt, new Date()),
      ),
      sort: desc(article.publishedAt),
      relations,
    });
  }

  async allLastPublished({limit, relations = []}: {
    limit: number,
    relations?: string[],
  }): Promise<SelectArticle[]> {
    return this.all({
      limit,
      offset: 0,
      filter: and(
        eq(article.status, ArticleStatus.published),
        lte(article.publishedAt, new Date()),
      ),
      sort: desc(article.publishedAt),
      relations,
    });
  }

  async allPublishedRelated({alias, categoryId, limit, relations = []}: {
    alias: string;
    categoryId: number;
    limit: number,
    relations?: string[],
  }): Promise<SelectArticle[]> {
    return this.all({
      limit,
      offset: 0,
      filter: and(
        eq(article.categoryId, categoryId),
        ne(article.alias, alias),
        eq(article.status, ArticleStatus.published),
        lte(article.publishedAt, new Date()),
      ),
      sort: desc(article.publishedAt),
      relations,
    });
  }

  async allPublishedRecommended({limit, relations = []}: {
    limit: number,
    relations?: string[],
  }): Promise<SelectArticle[]> {
    return this.all({
      limit,
      offset: 0,
      filter: and(
        inArray(article.alias, RECOMMENDED_ARTICLE_LINKS),
        eq(article.status, ArticleStatus.published),
        lte(article.publishedAt, new Date()),
      ),
      sort: desc(article.publishedAt),
      relations,
    });
  }

  async count({filter}: { filter?: SQL<unknown> }): Promise<number> {
    return this.database.$count(article, filter);
  }

  async countLatest({filter}: { filter?: SQL<unknown> }): Promise<number> {
    return this.database.$count(latestArticle, filter);
  }

  async countSearch({search}: { search?: string }): Promise<number> {
    return this.count({
      filter: search !== undefined ? or(
        like(article.title, `%${search}%`),
        like(article.alias, `%${search}%`),
        like(article.intro, `%${search}%`),
        like(article.content, `%${search}%`),
      ) : undefined,
    });
  }

  async countByCategory({categoryId}: { categoryId: number }): Promise<number> {
    return this.count({
      filter: eq(article.categoryId, categoryId),
    });
  }

  async countPublished(): Promise<number> {
    return this.count({
      filter: lte(article.publishedAt, new Date()),
    });
  }

  async countUnpublished(): Promise<number> {
    return this.count({
      filter: gt(article.publishedAt, new Date()),
    });
  }

  async countPublishedByCategory({categoryId}: { categoryId: number }): Promise<number> {
    return this.count({
      filter: and(
        eq(article.categoryId, categoryId),
        eq(article.status, ArticleStatus.published),
        lte(article.publishedAt, new Date()),
      ),
    });
  }

  async exists({id}: { id: number }): Promise<boolean> {
    return await this.count({filter: eq(article.id, id)}) > 0;
  }

  async existsByAlias({alias}: { alias: string }): Promise<boolean> {
    return await this.count({filter: eq(article.alias, alias)}) > 0;
  }

  async one({filter, relations = []}: { filter?: SQL<unknown>, relations?: string[] }): Promise<SelectArticle | undefined> {
    return this.database
      .query
      .article
      .findFirst({
        where: filter,
        with: this.convertRelations(relations),
      });
  }

  async oneById({id, relations = []}: { id: number, relations?: string[] }): Promise<SelectArticle | undefined> {
    return this.one({
      filter: eq(article.id, id),
      relations,
    });
  }

  async oneByAlias({alias, relations = []}: { alias: string, relations?: string[] }): Promise<SelectArticle | undefined> {
    return this.one({
      filter: eq(article.alias, alias),
      relations,
    });
  }

  async onePublishedByAlias({alias, relations = []}: { alias: string, relations?: string[] }): Promise<SelectArticle | undefined> {
    return this.one({
      filter: and(
        eq(article.alias, alias),
        eq(article.status, ArticleStatus.published),
      ),
      relations,
    });
  }

  async onePublishedByAliasWithPublishedComments({alias, relations = ['author', 'category.parent', 'category']}: {
    alias: string,
    relations?: string[]
  }): Promise<SelectArticle | undefined> {
    return this.database
      .query
      .article
      .findFirst({
        where: and(
          eq(article.alias, alias),
          eq(article.status, ArticleStatus.published),
        ),
        with: {...this.convertRelations(relations), comments: {where: eq(comment.status, CommentStatus.published)}},
      });
  }

  async onePublishedByAliasWithRelations({alias, relations = ['author', 'category.parent', 'category', 'comments']}: {
    alias: string,
    relations?: string[]
  }): Promise<SelectArticle | undefined> {
    return this.database
      .query
      .article
      .findFirst({
        where: and(
          eq(article.alias, alias),
          eq(article.status, ArticleStatus.published),
        ),
        with: this.convertRelations(relations),
      });
  }

  async save({id, entity}: { id?: number; entity: InsertArticle }): Promise<number> {
    if (id) {
      await this.database
        .update(article)
        .set(entity)
        .where(eq(article.id, id));

      return id;
    } else {
      const returning = await this.database
        .insert(article)
        .values(entity)
        .$returningId();

      if (returning.length === 0) {
        throw new Error('Failed to insert article');
      }

      return returning[0].id;
    }
  }

  async saveLatest({id, entity}: { id?: number; entity: InsertLatestArticle }): Promise<number> {
    if (id) {
      await this.database
        .update(latestArticle)
        .set(entity)
        .where(eq(latestArticle.id, id));

      return id;
    } else {
      const returning = await this.database
        .insert(latestArticle)
        .values(entity)
        .$returningId();

      if (returning.length === 0) {
        throw new Error('Failed to insert article');
      }

      return returning[0].id;
    }
  }

  async remove({id}: { id: number }): Promise<void> {
    await this.database
      .delete(article)
      .where(eq(article.id, id));
  }

  async removeLatestAll(): Promise<void> {
    await this.database
      .delete(latestArticle);
  }
}
