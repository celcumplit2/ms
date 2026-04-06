import {CustomRepository} from '@/core/repositories/custom-repository';
import {comment, InsertComment, SelectComment} from '@/modules/comment/comment.model';
import {desc, eq, gt, like, lte, or} from 'drizzle-orm';

export class CommentRepository extends CustomRepository {
  async search({offset, limit, relations, search}: {
    offset: number,
    limit: number,
    relations: string[],
    search?: string
  }): Promise<SelectComment[]> {
    return this.database
      .query
      .comment
      .findMany({
        where: search
          ? or(
            like(comment.name, `%${search}%`),
            like(comment.email, `%${search}%`),
            like(comment.content, `%${search}%`),
          )
          : undefined,
        offset,
        limit,
        orderBy: [desc(comment.publishedAt)],
        with: relations.length > 0
          ? relations.reduce((previous, relation) => ({...previous, [relation]: true}), {})
          : undefined,
      });
  }

  async count({search}: { search?: string }): Promise<number> {
    return this.database.$count(
      comment,
      search
        ? or(
          like(comment.name, `%${search}%`),
          like(comment.email, `%${search}%`),
          like(comment.content, `%${search}%`),
        )
        : undefined,
    );
  }

  async countPublished(): Promise<number> {
    return this.database.$count(comment, lte(comment.publishedAt, new Date()));
  }

  async countUnpublished(): Promise<number> {
    return this.database.$count(comment, gt(comment.publishedAt, new Date()));
  }

  async one({id}: { id: number }): Promise<SelectComment | undefined> {
    return this.database
      .query
      .comment
      .findFirst({
        where: eq(comment.id, id),
      });
  }

  async save({id, entity}: { id?: number; entity: InsertComment }): Promise<number> {
    if (id) {
      await this.database
        .update(comment)
        .set(entity)
        .where(eq(comment.id, id));

      return id;
    } else {
      const returning = await this.database
        .insert(comment)
        .values(entity)
        .$returningId();

      if (returning.length === 0) {
        throw new Error('Failed to insert comment');
      }

      return returning[0].id;
    }
  }

  async remove({id}: { id: number }): Promise<void> {
    await this.database
      .delete(comment)
      .where(eq(comment.id, id));
  }
}
