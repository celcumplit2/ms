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
import {ArticleRepository} from '@/modules/article/article.repository';
import {author} from '@/modules/author/author.model';
import {category} from '@/modules/category/category.model';
import {comment, CommentStatus} from '@/modules/comment/comment.model';
import styles from '@/styles/scss/articles/article-page.module.scss';
import {and, eq} from 'drizzle-orm';
import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {cache} from 'react';
import {BlogPosting, WithContext} from 'schema-dts';

export async function getMetadata(alias: string): Promise<Metadata> {
    const articleRepository = new ArticleRepository(database);
    const article = await articleRepository.oneByAlias({alias: alias.substring(2)});

    if (!article) {
        return {};
    }

    const articleAuthor = article.authorId
        ? await database.query.author.findFirst({where: eq(author.id, article.authorId)})
        : undefined;
    const articleCategory = article.categoryId
        ? await database.query.category.findFirst({where: eq(category.id, article.categoryId)})
        : undefined;

    return {
        title: article.metaTitle,
        description: article.metaDescription,
        alternates: {
            canonical: `/articles/p-${article.alias}`,
        },
        authors: articleAuthor ? [{name: articleAuthor.fullName, url: new URL(`/authors/${articleAuthor.alias}`, BASE_URL)}] : [],
        publisher: articleAuthor ? articleAuthor.fullName : undefined,
        category: articleCategory?.name,
        openGraph: {
            title: article.title,
            description: article.intro,
            url: `/articles/p-${article.alias}`,
            images: article.image ? [getArticleImage({src: article.image})] : [],
            locale: 'en_US',
            type: 'article',
            publishedTime: article.publishedAt.toISOString(),
            section: articleCategory?.name,
        },
    };
}

const RELATED_ARTICLES = 9;
const RECOMMENDED_ARTICLES = 3;

export default async function ArticlePage({alias}: { alias: string }) {
    const articleRepository = new ArticleRepository(database);
    const getCachedArticle = cache(async (a: string) => articleRepository.onePublishedByAlias({alias: a}));
    const getCachedAuthor = cache(async (id: number) => database.query.author.findFirst({where: eq(author.id, id)}));
    const getCachedCategory = cache(async (id: number) => database.query.category.findFirst({where: eq(category.id, id)}));
    const getCachedComments = cache(async (articleId: number) => database.query.comment.findMany({
        where: and(
            eq(comment.articleId, articleId),
            eq(comment.status, CommentStatus.published),
        ),
    }));
    const article = await getCachedArticle(alias.substring(2));

    if (!article) {
        notFound();
    }

    const articleAuthor = article.authorId ? await getCachedAuthor(article.authorId) : undefined;
    const articleCategory = article.categoryId ? await getCachedCategory(article.categoryId) : undefined;

    if (!articleAuthor || !articleCategory) {
        notFound();
    }

    const parentCategory = articleCategory.parentId ? await getCachedCategory(articleCategory.parentId) : undefined;
    const comments = await getCachedComments(article.id);

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Articles', href: '/articles'},
        ...(parentCategory ? [{label: parentCategory.name, href: `/articles/c-${parentCategory.alias}`}] : []),
        {label: articleCategory.name, href: `/articles/c-${articleCategory.alias}`},
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
    const pageBreadcrumbs = hasRewritegenBlocks ? breadcrumbs.slice(0, -1) : breadcrumbs;
    const articleBodyClassName = hasRewritegenBlocks ? `${styles['article-body']} rg-article-body` : styles['article-body'];
    const articlePostBodyClassName = hasRewritegenBlocks
        ? `${styles['article-post-body']} ${styles['rewritegen-post-body']}`
        : styles['article-post-body'];
    const articleHeroClassName = hasRewritegenBlocks ? styles['rewritegen-hero'] : undefined;
    const articleHeroInnerClassName = hasRewritegenBlocks
        ? `${styles['rewritegen-hero-inner']} ${!article.image ? styles['rewritegen-hero-inner-no-image'] : ''}`.trim()
        : undefined;
    const articlePublishedInfoClassName = hasRewritegenBlocks
        ? `${styles['article-published-info']} ${styles['rewritegen-published-info']}`
        : styles['article-published-info'];
    const articleTitleClassName = hasRewritegenBlocks ? styles['rewritegen-title'] : undefined;
    const articleIntroClassName = hasRewritegenBlocks ? styles['rewritegen-intro'] : undefined;
    const articleCoverShellClassName = hasRewritegenBlocks ? styles['rewritegen-cover-shell'] : undefined;
    const articleHeroContentClassName = hasRewritegenBlocks ? styles['rewritegen-hero-content'] : undefined;
    const articleHeroMediaClassName = hasRewritegenBlocks ? styles['rewritegen-hero-media'] : undefined;
    const articleCoverImageClassName = hasRewritegenBlocks
        ? `${styles['article-cover-image']} ${styles['rewritegen-cover-image']}`
        : styles['article-cover-image'];
    const articlePageShellClassName = hasRewritegenBlocks
        ? `${styles['article-page-shell']} ${styles['rewritegen-page-shell']}`
        : styles['article-page-shell'];

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
            name: articleAuthor.fullName,
            url: new URL(`/authors/${articleAuthor.alias}`, BASE_URL).toString(),
        },
        isPartOf: {
            '@type': 'Blog',
            '@id': new URL('#blog', BASE_URL).toString(),
            mainEntityOfPage: new URL('/articles', BASE_URL).toString(),
            name: 'MoldStud Articles',
            creator: new URL('#organization', BASE_URL).toString(),
            publisher: new URL('#organization', BASE_URL).toString(),
        },
        commentCount: comments.length,
    };

    return (
        <>
            <div className={articlePageShellClassName}>
                <Breadcrumbs links={pageBreadcrumbs}/>

                <section className={articleHeroClassName}>
                    <div className={articleHeroInnerClassName}>
                        <div className={articleHeroContentClassName}>
                            <p className={articlePublishedInfoClassName}>Published on
                                <time dateTime="publishAt" itemProp="datePublished">{publishDate}</time>
                                <span> by <Link href={`/authors/${articleAuthor.alias}`}>{articleAuthor.fullName}</Link> & MoldStud Research Team</span>
                            </p>
                            <h1 className={articleTitleClassName}>{article.title}</h1>
                            <p className={articleIntroClassName}>{article.intro}</p>
                            {RECOMMENDED_ARTICLE_LINKS.includes(article.alias) && (<ArticleCTA/>)}
                        </div>
                        {article.image && (
                            <div className={articleHeroMediaClassName}>
                                <div className={articleCoverShellClassName}>
                                    <Image src={getArticleImage({
                                        src: article.image,
                                        width: 1216,
                                        height: 912,
                                    })} alt={article.title} width="1216" height="912" loading="lazy" className={articleCoverImageClassName}/>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                {hasRewritegenBlocks && <RewritegenRuntime/>}
                <article className={articleBodyClassName} dangerouslySetInnerHTML={{__html: article.content}}></article>
                <div className={articlePostBodyClassName}>
                    {RECOMMENDED_ARTICLE_LINKS.includes(article.alias) && (
                        <div className={styles['article-post-section']}>
                            <ArticleCTAForm/>
                        </div>
                    )}
                    <div className={styles['article-post-section']}>
                        <CommentForm articleId={article.id}/>
                    </div>
                    {comments.length > 0 && (
                        <div className={styles['article-post-section']}>
                            <CommentList comments={comments}/>
                        </div>
                    )}
                    {relatedArticles.length > 0 && (
                        <div className={styles['article-post-section']}>
                            <ArticleRelated
                                category={{name: articleCategory.name, alias: articleCategory.alias}}
                                articles={relatedArticles}
                            />
                        </div>
                    )}
                    {recommendedArticles.length > 0 && (
                        <div className={styles['article-post-section']}>
                            <ArticleRecommended articles={recommendedArticles}/>
                        </div>
                    )}
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}
