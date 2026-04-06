import {CustomRepository} from '@/core/repositories/custom-repository';
import {category, InsertCategory, SelectCategory} from '@/modules/category/category.model';
import {asc, desc, eq, isNotNull, isNull, like, or, SQL, type ValueOrArray} from 'drizzle-orm';

export class CategoryRepository extends CustomRepository {
  async all({limit, filter, sort, offset = 0, relations = []}: {
    limit: number,
    offset?: number,
    filter?: SQL<unknown>,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
  }): Promise<SelectCategory[]> {
    return this.database
      .query
      .category
      .findMany({
        where: filter,
        offset,
        limit,
        orderBy: sort,
        with: this.convertRelations(relations),
      });
  }

  async search({limit, search, offset = 0, sort = desc(category.createdAt), relations = []}: {
    limit: number,
    offset?: number,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
    search?: string,
  }): Promise<SelectCategory[]> {
    return this.all({
      limit,
      offset,
      filter: search
        ? or(
          like(category.name, `%${search}%`),
          like(category.alias, `%${search}%`),
        )
        : undefined,
      sort,
      relations,
    });
  }

  async sitemap({offset, limit}: { offset: number, limit: number }) {
    return this.database
      .select({
        alias: category.alias,
        updatedAt: category.updatedAt,
      })
      .from(category)
      .orderBy(asc(category.createdAt))
      .offset(offset)
      .limit(limit);
  }

  async allByParent({parentId, limit, offset = 0, sort = desc(category.createdAt), relations = []}: {
    parentId: number,
    limit: number,
    offset?: number,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
  }): Promise<SelectCategory[]> {
    return this.all({
      limit,
      offset,
      filter: eq(category.parentId, parentId),
      sort,
      relations,
    });
  }

  async count({filter}: { filter?: SQL<unknown> }): Promise<number> {
    return this.database.$count(category, filter);
  }

  async countSearch({search}: { search?: string }): Promise<number> {
    return this.count({
      filter: search !== undefined ? or(
        like(category.name, `%${search}%`),
        like(category.alias, `%${search}%`),
      ) : undefined
    });
  }

  async countByParent({parentId}: { parentId: number }): Promise<number> {
    return this.count({
      filter: eq(category.parentId, parentId),
    });
  }

  async countRoots(): Promise<number> {
    return this.count({
      filter: isNull(category.parentId),
    });
  }

  async countSubCategories(): Promise<number> {
    return this.count({
      filter: isNotNull(category.parentId),
    });
  }

  async exists({id}: { id: number }): Promise<boolean> {
    return await this.count({filter: eq(category.id, id)}) > 0;
  }

  async existsByAlias({alias}: { alias: string }): Promise<boolean> {
    return await this.count({filter: eq(category.alias, alias)}) > 0;
  }

  async one({filter, relations = []}: { filter?: SQL<unknown>, relations?: string[] }): Promise<SelectCategory | undefined> {
    return this.database
      .query
      .category
      .findFirst({
        where: filter,
        with: this.convertRelations(relations),
      });
  }

  async oneById({id, relations = []}: { id: number, relations?: string[] }): Promise<SelectCategory | undefined> {
    return this.one({
      filter: eq(category.id, id),
      relations,
    });
  }

  async oneByAlias({alias, relations = []}: { alias: string, relations?: string[] }): Promise<SelectCategory | undefined> {
    return this.one({
      filter: eq(category.alias, alias),
      relations,
    });
  }

  async allRoots({limit, offset = 0, sort = desc(category.createdAt), relations = []}: {
    limit: number,
    offset?: number,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
  }): Promise<SelectCategory[]> {
    return this.all({
      filter: isNull(category.parentId),
      sort,
      offset,
      limit,
      relations,
    });
  }

  async allSubCategories({limit, offset = 0, sort = desc(category.createdAt), relations = []}: {
    limit: number,
    offset?: number,
    sort?: ValueOrArray<SQL<unknown>>,
    relations?: string[],
  }): Promise<SelectCategory[]> {
    return this.all({
      filter: isNotNull(category.parentId),
      sort,
      offset,
      limit,
      relations,
    });
  }

  async save({id, entity}: { id?: number; entity: InsertCategory }): Promise<number> {
    if (id) {
      await this.database
        .update(category)
        .set(entity)
        .where(eq(category.id, id));

      return id;
    } else {
      const returning = await this.database
        .insert(category)
        .values(entity)
        .$returningId();

      if (returning.length === 0) {
        throw new Error('Failed to insert category');
      }

      return returning[0].id;
    }
  }

  async remove({id}: { id: number }): Promise<void> {
    await this.database
      .delete(category)
      .where(eq(category.id, id));
  }
}
