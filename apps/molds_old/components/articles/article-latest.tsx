import {SelectArticle} from '@/modules/article/article.model';
import Link from 'next/link';
import styles from '@/styles/scss/articles/article-latest.module.scss';
import {ArticleCard} from '@/components/articles/article-card';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface ArticleLatestProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    articles: SelectArticle[];
}

export function ArticleLatest({articles, className, ...restProps}: ArticleLatestProps) {
    return articles.length > 0 ? (
        <section className={clsx(styles['article-latest'], className)} {...restProps}>
            <header>
                <h3>Latest Articles</h3>
                <Link href="/articles">View All Articles</Link>
            </header>
            {articles.map((article) => (<ArticleCard key={article.id} article={article} className={styles['article-card']} />))}
        </section>
    ) : null;
}
