export interface ArticleComment {
  id: number | string;
  name: string;
  content: string;
  publishedAt: Date;
  source: 'database' | 'legacy';
}
