import {ArticleCard} from '@/components/articles/article-card';
import {SelectArticle} from '@/modules/article/article.model';

export interface ArticleListProps {
    articles: SelectArticle[];
}

export function ArticleList({articles}: ArticleListProps) {
    return articles.map((article) => (<ArticleCard key={article.id} article={article} />));
}
