import {getArticleImage} from '@/modules/article/article.config';
import {SelectArticle} from '@/modules/article/article.model';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/scss/articles/article-card.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface ArticleCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    article: SelectArticle;
    hideReadMore?: boolean;
}

export function ArticleCard({article, hideReadMore = false, className, ...restProps}: ArticleCardProps) {
    const formatter = new Intl.DateTimeFormat('en', {month: 'long'});
    const publishDate = `${article.publishedAt.getDate()} ${formatter.format(article.publishedAt)} ${article.publishedAt.getFullYear()}`;
    const articleLink = {pathname: `/articles/p-${article.alias}`};

    return (
        <article className={clsx(styles['article-card'], className)} {...restProps}>
            <header>
                <Link href={articleLink}>
                    <Image
                        src={getArticleImage({src: article.image, width: 544, height: 408})}
                        alt={article.title}
                        width="544"
                        height="408"
                        loading="lazy"
                        sizes="(width < 576px) 543w, (min-width: 576px and width < 768px) 360w, (min-wdith: 768px and width < 992px) 472w, (min-width: 992px and width < 1280px) 616w, (min-width: 1280px) 280w"
                    />
                </Link>
                <time dateTime="publishAt" itemProp="datePublished">{publishDate}</time>
            </header>
            <h3><Link href={articleLink}>{article.title}</Link></h3>
            <p>{article.intro}</p>
            {!hideReadMore && (
                <Link href={articleLink}>
                    Read Article
                    <Image src="/images/more-arrow.svg" alt="Arrow Up" width="20" height="20" loading="lazy"/>
                </Link>
            )}
        </article>
    );
}
