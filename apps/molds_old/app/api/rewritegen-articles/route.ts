import {database} from '@/database';
import {article} from '@/modules/article/article.model';
import {like, or} from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const rows = await database
    .select({alias: article.alias})
    .from(article)
    .where(or(like(article.content, '%class="rg-%'), like(article.content, '%class="card %')));

  return Response.json(
    rows.map((r) => `/articles/p-${r.alias}`),
    {headers: {'cache-control': 'no-store'}},
  );
}
