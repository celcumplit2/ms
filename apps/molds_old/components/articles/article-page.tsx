import ArticleCTA from '@/components/articles/article-cta';
import ArticleCTAForm from '@/components/articles/article-cta-form';
import ArticleRecommended from '@/components/articles/article-recommended';
import ArticleRelated from '@/components/articles/article-related';
import RewritegenRuntime from '@/components/articles/rewritegen-runtime';
import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import {BASE_URL} from '@/config';
import {getArticleImage, RECOMMENDED_ARTICLE_LINKS} from '@/modules/article/article.config';
import {database} from '@/database';
import {InferNonNullableResultType} from '@/database/schema';
import {ArticleRepository} from '@/modules/article/article.repository';
import styles from '@/styles/scss/articles/article-page.module.scss';
import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {cache} from 'react';
import {BlogPosting, WithContext} from 'schema-dts';

export async function getMetadata(alias: string): Promise<Metadata> {
    const articleRepository = new ArticleRepository(database);
    const article = await articleRepository.oneByAlias({alias: alias.substring(2), relations: ['author', 'category']}) as InferNonNullableResultType<'article', {
        author: true,
        category: true,
    }>;

    return {
        title: article?.metaTitle,
        description: article?.metaDescription,
        alternates: {
            canonical: `/articles/p-${article?.alias}`,
        },
        authors: article?.author ? [{name: article.author.fullName, url: new URL(`/authors/${article.author.alias}`, BASE_URL)}] : [],
        publisher: article?.author ? article.author.fullName : undefined,
        category: article?.category?.name,
        openGraph: {
            title: article?.title,
            description: article?.intro,
            url: `/articles/p-${article?.alias}`,
            images: article?.image ? [getArticleImage({src: article.image})] : [],
            locale: 'en_US',
            type: 'article',
            publishedTime: article?.publishedAt.toISOString(),
            section: article?.category?.name,
        },
    };
}

const RELATED_ARTICLES = 9;
const RECOMMENDED_ARTICLES = 3;

export default async function ArticlePage({alias}: { alias: string }) {
    const articleRepository = new ArticleRepository(database);
    const getCachedArticle = cache(async (a: string) => articleRepository.onePublishedByAliasWithPublishedComments({
        alias: a,
        relations: ['author', 'category', 'category.parent', 'comments'],
    }) as Promise<InferNonNullableResultType<'article', { author: true, category: true, comments: true }>>);
    const article = await getCachedArticle(alias.substring(2));

    if (!article) {
        notFound();
    }

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Articles', href: '/articles'},
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        {label: article.category?.parent?.name, href: `/articles/c-${article.category?.parent?.alias}`},
        {label: article.category?.name, href: `/articles/c-${article.category?.alias}`},
        {label: article.title, href: `/articles/p-${article.alias}`},
    ];
    const formatter = new Intl.DateTimeFormat('en', {month: 'long'});
    const publishDate = `${article.publishedAt.getDate()} ${formatter.format(article.publishedAt)} ${article.publishedAt.getFullYear()}`;

    const getCachedRelatedArticles = cache(async (a: string, categoryId: number, l: number) => articleRepository.allPublishedRelated({
        alias: a,
        categoryId,
        limit: l,
    }));
    const relatedArticles = await getCachedRelatedArticles(article.alias, article.categoryId!, RELATED_ARTICLES);
    const getCachedRecommendedArticles = cache(async (l: number) => articleRepository.allPublishedRecommended({limit: l}));
    const recommendedArticles = await getCachedRecommendedArticles(RECOMMENDED_ARTICLES);
    const hasRewritegenBlocks = /\bsolution-section\b|\bdata-kind=(["'])(?:chart|checklist|decision-simulator|faq|matrix|proscons|textblocks|widgets)\1/i.test(article.content);
    const articleBodyClassName = hasRewritegenBlocks ? `${styles['article-body']} rg-article-body` : styles['article-body'];
    const articleHeroClassName = hasRewritegenBlocks ? styles['rewritegen-hero'] : undefined;
    const articlePublishedInfoClassName = hasRewritegenBlocks
        ? `${styles['article-published-info']} ${styles['rewritegen-published-info']}`
        : styles['article-published-info'];
    const articleTitleClassName = hasRewritegenBlocks ? styles['rewritegen-title'] : undefined;
    const articleIntroClassName = hasRewritegenBlocks ? styles['rewritegen-intro'] : undefined;
    const articleCoverShellClassName = hasRewritegenBlocks ? styles['rewritegen-cover-shell'] : undefined;
    const articleCoverImageClassName = hasRewritegenBlocks
        ? `${styles['article-cover-image']} ${styles['rewritegen-cover-image']}`
        : styles['article-cover-image'];

    const jsonLd: WithContext<BlogPosting> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': new URL(`/articles/p-${article.alias}`, BASE_URL).toString(),
        mainEntityOfPage: new URL(`/articles/p-${article.alias}`, BASE_URL).toString(),
        headline: article.title,
        name: article.title,
        url: new URL(`/articles/p-${article.alias}`, BASE_URL).toString(),
        description: article.intro,
        image: article.image ? getArticleImage({src: article.image}) : undefined,
        datePublished: article.publishedAt.toISOString(),
        dateModified: article.publishedAt.toISOString(),
        publisher: '#ogranization',
        author: {
            '@type': 'Person',
            name: article.author!.fullName,
            url: new URL(`/authors/${article.author!.alias}`, BASE_URL).toString(),
        },
        isPartOf: {
            '@type': 'Blog',
            '@id': new URL('#blog', BASE_URL).toString(),
            mainEntityOfPage: new URL('/articles', BASE_URL).toString(),
            name: 'MoldStud Articles',
            creator: new URL('#organization', BASE_URL).toString(),
            publisher: new URL('#organization', BASE_URL).toString(),
        },
        commentCount: article.comments.length,
    };

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>

            <section className={articleHeroClassName}>
                <p className={articlePublishedInfoClassName}>Published on
                    <time dateTime="publishAt" itemProp="datePublished">{publishDate}</time>
                    <span> by <Link href={`/authors/${article.author?.alias}`}>{article.author?.fullName}</Link> & MoldStud Research Team</span>
                </p>
                <h1 className={articleTitleClassName}>{article.title}</h1>
                {RECOMMENDED_ARTICLE_LINKS.includes(article.alias) && (<ArticleCTA/>)}
                <p className={articleIntroClassName}>{article.intro}</p>
                {article.image && (
                    <div className={articleCoverShellClassName}>
                        <Image src={getArticleImage({
                            src: article.image,
                            width: 1216,
                            height: 912,
                        })} alt={article.title} width="1216" height="912" loading="lazy" className={articleCoverImageClassName}/>
                    </div>
                )}
            </section>
            {hasRewritegenBlocks && <RewritegenRuntime/>}
            <article className={articleBodyClassName} dangerouslySetInnerHTML={{__html: article.content}}></article>
            {RECOMMENDED_ARTICLE_LINKS.includes(article.alias) && (<ArticleCTAForm/>)}
            <CommentForm articleId={article.id}/>
            <CommentList comments={article.comments || []}/>
            <ArticleRelated
                category={{name: article.category!.name, alias: article.category!.alias}}
                articles={relatedArticles}
            />
            <ArticleRecommended articles={recommendedArticles}/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}
