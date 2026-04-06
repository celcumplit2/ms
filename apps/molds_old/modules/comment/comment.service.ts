import {Collection} from '@/core/dto/collection';
import {validate} from '@/core/validators';
import {database} from '@/database';
import {CommentStatus, SelectComment} from '@/modules/comment/comment.model';
import {CommentRepository} from '@/modules/comment/comment.repository';
import {commentSchema} from '@/modules/comment/comments.dto';
import {z} from 'zod';

let commentRepository: CommentRepository | undefined;

function getCommentRepository(): CommentRepository {
  if (!commentRepository) {
    commentRepository = new CommentRepository(database);
  }

  return commentRepository;
}
export async function countComments(): Promise<number> {
  return getCommentRepository().count({});
}

export async function countPublishedComments(): Promise<number> {
  return getCommentRepository().countPublished();
}

export async function countUnpublishedComments(): Promise<number> {
  return getCommentRepository().countUnpublished();
}

export async function browseComments({offset, limit, search, relations = []}: {
  offset: number,
  limit: number,
  relations?: string[],
  search?: string
}): Promise<Collection<SelectComment>> {
  const repository = getCommentRepository();
  const total = await repository.count({search});
  const items = await repository.search({offset, limit, search, relations});

  return new Collection({items, total});
}

export async function readComment({id}: { id: number }): Promise<SelectComment | undefined> {
  return await getCommentRepository().one({id});
}

export async function addComment({data}: { data: Record<string, unknown> }): Promise<number> {
  const repository = getCommentRepository();
  const schema = await commentSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;

  return await repository.save({
    entity: {
      ...payload,
      createdAt: new Date(),
    },
  });
}

export async function addDraftComment({data}: { data: Record<string, unknown> }): Promise<number> {
  const repository = getCommentRepository();
  const schema = await commentSchema();
  const payload = await validate(schema, {...data, status: CommentStatus.draft, publishedAt: new Date()}) as z.infer<typeof schema>;

  return await repository.save({
    entity: {
      ...payload,
      createdAt: new Date(),
    },
  });
}

export async function editComment({id, data}: { id: number, data: Record<string, unknown> }): Promise<number> {
  const repository = getCommentRepository();
  const schema = await commentSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;

  return await repository.save({
    id,
    entity: payload,
  });
}

export async function deleteComment({id}: { id: number }): Promise<void> {
  await getCommentRepository().remove({id});
}
