import {JOB_ARCHIVE_LIFETIME} from '@/modules/job/job.config';
import {CustomRepository} from '@/core/repositories/custom-repository';
import {InsertJob, job, SelectJob} from '@/modules/job/job.model';
import {subDays} from 'date-fns';
import {and, desc, eq, gte, like, lte, or} from 'drizzle-orm';

export class JobRepository extends CustomRepository {
  async allPublished({offset = 0, limit, relations = []}: {
    offset?: number,
    limit: number,
    relations?: string[],
  }): Promise<SelectJob[]> {
    return this.database
      .query
      .job
      .findMany({
        where: and(lte(job.publishedAt, new Date()), gte(job.publishedAt, subDays(new Date(), JOB_ARCHIVE_LIFETIME))),
        offset,
        limit,
        orderBy: [desc(job.publishedAt)],
        with: relations.length > 0
          ? relations.reduce((previous, relation) => ({...previous, [relation]: true}), {})
          : undefined,
      });
  }

  async search({offset, limit, relations = [], search}: {
    offset: number,
    limit: number,
    relations?: string[],
    search?: string
  }): Promise<SelectJob[]> {
    return this.database
      .query
      .job
      .findMany({
        where: search
          ? or(
            like(job.title, `%${search}%`),
            like(job.alias, `%${search}%`),
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
      job,
      search !== undefined ? or(
        like(job.title, `%${search}%`),
        like(job.alias, `%${search}%`),
      ) : undefined
    );
  }

  async countPublished(): Promise<number> {
    return this.database.$count(
      job,
      lte(job.publishedAt, new Date()),
    );
  }

  async exists({id}: { id: number }): Promise<boolean> {
    return await this.database.$count(job, eq(job.id, id)) > 0;
  }

  async existsByAlias({alias}: { alias: string }): Promise<boolean> {
    return await this.database.$count(job, eq(job.alias, alias)) > 0;
  }

  async one({id}: { id: number }): Promise<SelectJob | undefined> {
    return this.database
      .query
      .job
      .findFirst({
        where: eq(job.id, id),
      });
  }

  async oneByAlias({alias}: { alias: string }): Promise<SelectJob | undefined> {
    return this.database
      .query
      .job
      .findFirst({
        where: eq(job.alias, alias),
      });
  }

  async save({id, entity}: { id?: number; entity: InsertJob }): Promise<number> {
    if (id) {
      await this.database
        .update(job)
        .set(entity)
        .where(eq(job.id, id));

      return id;
    } else {
      const returning = await this.database
        .insert(job)
        .values(entity)
        .$returningId();

      if (returning.length === 0) {
        throw new Error('Failed to insert job');
      }

      return returning[0].id;
    }
  }

  async remove({id}: { id: number }): Promise<void> {
    await this.database
      .delete(job)
      .where(eq(job.id, id));
  }
}
