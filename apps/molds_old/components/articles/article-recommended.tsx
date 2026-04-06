import {SelectArticle} from '@/modules/article/article.model';
import styles from '@/styles/scss/articles/article-related-recommended.module.scss';
import {ArticleCard} from '@/components/articles/article-card';

interface ArticleRecommendedProps {
    title?: string;
    articles: SelectArticle[];
}

export default function ArticleRecommended({title, articles}: ArticleRecommendedProps) {
    return articles.length > 0 ? (
        <section className={styles['article-recommended']}>
            <header>
                <hgroup>
                    <p>You will enjoy it</p>
                    <h3>{title ?? 'Recommended Articles'}</h3>
                </hgroup>
            </header>
            {articles.map((article) => (<ArticleCard key={article.id} article={article} className={styles['article-card']}/>))}
        </section>
    ) : null;
}
