import {Collection} from '@/core/dto/collection';
import {validate} from '@/core/validators';
import {database} from '@/database';
import {SelectAuthor} from '@/modules/author/author.model';
import {AuthorRepository} from '@/modules/author/author.repository';
import {authorSchema} from '@/modules/author/authors.dto';
import {z} from 'zod';

let authorRepository: AuthorRepository | undefined;

function getAuthorRepository(): AuthorRepository {
  if (!authorRepository) {
    authorRepository = new AuthorRepository(database);
  }

  return authorRepository;
}
export async function countAuthors(): Promise<number> {
  return await getAuthorRepository().count({});
}

export async function browseAuthorsTest({offset, limit, search, relations = []}: { offset: number, limit: number, search?: string, relations?: string[] }): Promise<SelectAuthor[]> {
  const repository = getAuthorRepository();

  return await repository.search({offset, limit, search, relations});
}

export async function browseAuthors({offset, limit, search, relations = []}: { offset: number, limit: number, search?: string, relations?: string[] }): Promise<Collection<SelectAuthor>> {
  const repository = getAuthorRepository();
  const total = await repository.count({search});
  const items = await repository.search({offset, limit, search, relations});

  return new Collection({items, total});
}

export async function readAuthor({id}: { id: number }): Promise<SelectAuthor | undefined> {
  return await getAuthorRepository().one({id});
}

export async function readAuthorRandom(): Promise<SelectAuthor | undefined> {
  const authors = await getAuthorRepository().random({limit: 1});

  return authors.length > 0 ? authors[0] : undefined;
}

export async function addAuthor({data}: { data: Record<string, unknown> }): Promise<number> {
  const repository = getAuthorRepository();
  const schema = await authorSchema();
  const {meta, ...payload} = await validate(schema, data) as z.infer<typeof schema>;

  return await repository.save({
    entity: {
      ...payload,
      metaTitle: meta.title,
      metaDescription: meta.description,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });
}

export async function editAuthor({id, data}: { id: number, data: Record<string, unknown> }): Promise<number> {
  const repository = getAuthorRepository();
  const schema = await authorSchema();
  const {meta, ...payload} = await validate(schema, data) as z.infer<typeof schema>;

  return await repository.save({
    id,
    entity: {
      ...payload,
      metaTitle: meta.title,
      metaDescription: meta.description,
      updatedAt: new Date(),
    },
  });
}

export async function deleteAuthor({id}: { id: number }): Promise<void> {
  const repository = new AuthorRepository(database);

  await repository.remove({id});
}
