import {ArticleCard} from '@/components/articles/article-card';
import ArticleCategoryDescription from '@/components/articles/article-category-description';
import ArticleCategoryHeading from '@/components/articles/article-category-heading';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import Pagination from '@/components/common/pagination';
import {BASE_URL} from '@/config';
import {database} from '@/database';
import {InferNonNullableResultType} from '@/database/schema';
import getCursor from '@/hooks/get-cursor';
import {ArticleRepository} from '@/modules/article/article.repository';
import styles from '@/styles/scss/articles/article-category-page.module.scss';
import {Metadata} from 'next';
import {cache} from 'react';
import {Collection, WithContext} from 'schema-dts';

interface ArticleSubcategoryPageProps {
    category: InferNonNullableResultType<'category', { parent: true }>;
    page: number;
}

export async function getMetadata(category: InferNonNullableResultType<'category', { parent: true }>): Promise<Metadata> {
    return {
        title: category.name,
        description: `Explore our articles on ${category.name}.`,
        alternates: {
            canonical: `/articles/c-${category.alias}`,
        },
        category: category?.parent?.name,
    };
}

const ARTICLES_PER_PAGE = 36;

export default async function ArticleSubcategoryPage({page, category}: ArticleSubcategoryPageProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {offset, limit} = getCursor({page, perPage: ARTICLES_PER_PAGE});

    const articleRepository = new ArticleRepository(database);
    const getCachedTotal = cache(async (categoryId: number) => articleRepository.countPublishedByCategory({categoryId}));
    const total = await getCachedTotal(category.id);
    const getCachedArticles = cache(async (categoryId: number, o: number, l: number) => articleRepository.allPublishedByCategory({categoryId, offset: o, limit: l}));
    const articles = await getCachedArticles(category.id, offset, limit);

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Articles', href: '/articles'},
        {label: category.parent!.name, href: `/articles/c-${category.parent!.alias}`},
        {label: category.name, href: `/articles/c-${category.alias}`},
    ];

    const jsonLd: WithContext<Collection> = {
        '@context': 'https://schema.org',
        '@type': 'Collection',
        '@id': new URL(`#article-category-${category.alias}`, BASE_URL).toString(),
        url: new URL(`/articles/c-${category.alias}`, BASE_URL).toString(),
        mainEntityOfPage: new URL(`/articles/c-${category.alias}`, BASE_URL).toString(),
        name: category.name,
        creator: new URL('#organization', BASE_URL).toString(),
        publisher: new URL('#organization', BASE_URL).toString(),
        isPartOf: {
            '@type': 'Blog',
            '@id': new URL('#blog', BASE_URL).toString(),
            mainEntityOfPage: new URL('/articles', BASE_URL).toString(),
            name: 'MoldStud Articles',
            creator: new URL('#organization', BASE_URL).toString(),
            publisher: new URL('#organization', BASE_URL).toString(),
        },
        hasPart: articles.map((item) => ({
            '@type': 'BlogPosting',
            '@id': new URL(`/articles/p-${item.alias}`, BASE_URL).toString(),
            mainEntityOfPage: new URL(`/articles/p-${item.alias}`, BASE_URL).toString(),
            url: new URL(`/articles/p-${item.alias}`, BASE_URL).toString(),
        })),
    };

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <ArticleCategoryHeading
                title={category.name}
                subTitle="Our articles"
            />
            <div className={styles['articles']}>
                {articles.map((article) => (<ArticleCard key={article.id} article={article} className={styles['article-card']}/>))}
            </div>
            <Pagination
                className={styles['pagination']}
                root={`/articles/c-${category.alias}`}
                page={page}
                total={total}
                perPage={ARTICLES_PER_PAGE}
            />

            <ArticleCategoryDescription description={category.description}/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}
