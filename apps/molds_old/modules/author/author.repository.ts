import {CustomRepository} from '@/core/repositories/custom-repository';
import {author, type InsertAuthor, type SelectAuthor} from '@/modules/author/author.model';
import {eq, like, or, sql} from 'drizzle-orm';

export class AuthorRepository extends CustomRepository {
  async search({offset = 0, limit = 12, relations, search}: {
    offset?: number,
    limit?: number,
    relations: string[],
    search?: string
  }): Promise<SelectAuthor[]> {
    return this.database
      .query
      .author
      .findMany({
        where: search
          ? or(
            like(author.fullName, `%${search}%`),
            like(author.alias, `%${search}%`),
          )
          : undefined,
        offset,
        limit,
        with: relations.length > 0
          ? relations.reduce((previous, relation) => ({...previous, [relation]: true}), {})
          : undefined,
      });
  }

  async count({search}: { search?: string }): Promise<number> {
    return this.database.$count(
      author,
      search !== undefined ? or(
        like(author.fullName, `%${search}%`),
        like(author.alias, `%${search}%`),
      ) : undefined
    );
  }

  async exists({id}: { id: number }): Promise<boolean> {
    return await this.database.$count(author, eq(author.id, id)) > 0;
  }

  async one({id}: { id: number }): Promise<SelectAuthor | undefined> {
    return this.database
      .query
      .author
      .findFirst({
        where: eq(author.id, id),
      });
  }

  async oneByAlias({alias}: { alias: string }): Promise<SelectAuthor | undefined> {
    return this.database
      .query
      .author
      .findFirst({
        where: eq(author.alias, alias),
      });
  }

  async random({limit}: { limit: number }): Promise<SelectAuthor[]> {
    // TODO: This differ from DOC and from TS definition. For some reason the results are first instead.
    const [result] = await this.database
      .execute(sql`
        SELECT *
        FROM ${author}
        ORDER BY RAND()
        LIMIT ${limit}
      `);

    return result as unknown as SelectAuthor[];
  }

  async save({id, entity}: { id?: number, entity: InsertAuthor }): Promise<number> {
    if (id) {
      await this.database
        .update(author)
        .set(entity)
        .where(eq(author.id, id));

      return id;
    } else {
      const returning = await this.database
        .insert(author)
        .values(entity)
        .$returningId();

      if (returning.length === 0) {
        throw new Error('Failed to insert author');
      }

      return returning[0].id;
    }
  }

  async remove({id}: { id: number }): Promise<void> {
    await this.database
      .delete(author)
      .where(eq(author.id, id));
  }
}
