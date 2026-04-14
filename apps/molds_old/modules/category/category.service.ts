import {Collection} from '@/core/dto/collection';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {validate} from '@/core/validators';
import {database} from '@/database';
import {SelectLatestArticle} from '@/modules/article/article.model';
import {category, SelectCategory} from '@/modules/category/category.model';
import {ArticleRepository} from '@/modules/article/article.repository';
import {CategoryRepository} from '@/modules/category/category.repository';
import {categorySchema} from '@/modules/category/categories.dto';
import {inArray} from 'drizzle-orm';
import {z} from 'zod';

let categoryRepository: CategoryRepository | undefined;
let articleRepository: ArticleRepository | undefined;

function getCategoryRepository(): CategoryRepository {
  if (!categoryRepository) {
    categoryRepository = new CategoryRepository(database);
  }

  return categoryRepository;
}
function getArticleRepository(): ArticleRepository {
  if (!articleRepository) {
    articleRepository = new ArticleRepository(database);
  }

  return articleRepository;
}

export async function countCategories() {
  return await getCategoryRepository().count({});
}

export async function countRootCategories() {
  return await getCategoryRepository().countRoots();
}

export async function countSubCategories() {
  return await getCategoryRepository().countSubCategories();
}

export async function browseCategories({offset, limit, search, relations = []}: {
  offset: number,
  limit: number,
  search?: string,
  relations?: string[]
}): Promise<Collection<SelectCategory>> {
  const repository = getCategoryRepository();
  const total = await repository.countSearch({search});
  const items = await repository.search({offset, limit, relations, search});

  return new Collection({items, total});
}

export async function browseCategoriesByParent({parentId, offset, limit, relations = []}: {
  parentId: number,
  offset: number,
  limit: number,
  relations?: string[]
}): Promise<Collection<SelectCategory>> {
  const repository = getCategoryRepository();
  const total = await repository.countByParent({parentId});
  const items = await repository.allByParent({offset, limit, relations, parentId});

  return new Collection({items, total});
}

export async function browseRootCategories({offset, limit}: { offset: number, limit: number }): Promise<Collection<SelectCategory>> {
  const repository = getCategoryRepository();
  const total = await repository.countRoots();
  const items = await repository.allRoots({offset, limit});

  return new Collection({items, total});
}

export async function browseSubCategories({offset, limit}: { offset: number, limit: number }): Promise<Collection<SelectCategory>> {
  const repository = getCategoryRepository();
  const total = await repository.countSubCategories();
  const items = await repository.allSubCategories({offset, limit});

  return new Collection({items, total});
}

export async function browseRootCategoriesAndArticles({offset, limit}: {
  offset: number,
  limit: number,
}): Promise<Collection<{ category: SelectCategory, articles: SelectLatestArticle[] }>> {
  const aRepository = getArticleRepository();
  const articles = await aRepository.allLatestPublished({
    offset: offset,
    limit: limit,
  });

  const categoryIds = Array.from(new Set(
    articles
      .map((item) => item.categoryId)
      .filter((item): item is number => item !== null),
  ));

  if (categoryIds.length === 0) {
    return new Collection({items: [], total: 0});
  }

  const categories = await database.query.category.findMany({
    where: inArray(category.id, categoryIds),
  });
  const parentIds = Array.from(new Set(
    categories
      .map((item) => item.parentId)
      .filter((item): item is number => item !== null),
  ));
  const parents = parentIds.length > 0
    ? await database.query.category.findMany({
      where: inArray(category.id, parentIds),
    })
    : [];
  const categoriesById = new Map(categories.map((item) => [item.id, item]));
  const parentsById = new Map(parents.map((item) => [item.id, item]));
  const grouped = new Map<number, { category: SelectCategory, articles: SelectLatestArticle[] }>();

  articles.forEach((item) => {
    if (!item.categoryId) {
      return;
    }

    const currentCategory = categoriesById.get(item.categoryId);

    if (!currentCategory?.parentId) {
      return;
    }

    const parentCategory = parentsById.get(currentCategory.parentId);

    if (!parentCategory) {
      return;
    }

    const existing = grouped.get(parentCategory.id);

    if (existing) {
      existing.articles.push(item);
    } else {
      grouped.set(parentCategory.id, {
        category: parentCategory,
        articles: [item],
      });
    }
  });

  const items = Array.from(grouped.values());

  return new Collection({items, total: items.length});
}

export async function readCategory({id}: { id: number }): Promise<SelectCategory | undefined> {
  return await getCategoryRepository().oneById({id});
}

export async function readCategoryByAlias({alias, relations = []}: { alias: string, relations?: string[] }): Promise<SelectCategory | undefined> {
  const repository = getCategoryRepository();
  const item = await repository.oneByAlias({alias});

  if (!item) {
    return undefined;
  }

  if (!relations.includes('parent') || item.parentId === null) {
    return item;
  }

  const parent = await repository.oneById({id: item.parentId});

  return {...item, parent} as SelectCategory;
}

export async function addCategory({data}: { data: Record<string, unknown> }): Promise<number> {
  const repository = getCategoryRepository();
  const schema = await categorySchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;

  if (await repository.existsByAlias({alias: payload.alias})) {
    throw new UnprocessablePayload({alias: 'A category with such alias already exists.'});
  }

  return await repository.save({
    entity: payload,
  });
}

export async function editCategory({id, data}: { id: number, data: Record<string, unknown> }): Promise<number> {
  const repository = getCategoryRepository();
  const schema = await categorySchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;
  const category = await repository.oneById({id});

  if (category?.alias !== payload.alias && await repository.existsByAlias({alias: payload.alias})) {
    throw new UnprocessablePayload({link: 'A category with such alias already exists.'});
  }

  return await repository.save({
    id,
    entity: payload,
  });
}

export async function deleteCategory({id}: { id: number }): Promise<void> {
  await getCategoryRepository().remove({id});
}
