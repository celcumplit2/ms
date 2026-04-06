import * as articleSchema from '@/modules/article/article.model';
import * as authorSchema from '@/modules/author/author.model';
import * as categorySchema from '@/modules/category/category.model';
import * as commentSchema from '@/modules/comment/comment.model';
import * as jobSchema from '@/modules/job/job.model';
import * as userSchema from '@/modules/user/user.model';
import type {BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations} from 'drizzle-orm';

export const schema = {...authorSchema, ...categorySchema, ...articleSchema, ...commentSchema, ...userSchema, ...jobSchema};

type TSchema = ExtractTablesWithRelations<typeof schema>;

export type IncludeRelations<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>['with'];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelations<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

export type InferNonNullableResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelations<TableName> | undefined = undefined
> = NonNullable<InferResultType<TableName, With>>;
