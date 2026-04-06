import {ArticleCard} from '@/components/articles/article-card';
import ArticleCategoryDescription from '@/components/articles/article-category-description';
import ArticleCategoryHeading from '@/components/articles/article-category-heading';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import Pagination from '@/components/common/pagination';
import {BASE_URL} from '@/config';
import {database} from '@/database';
import {InferNonNullableResultType} from '@/database/schema';
import {SelectArticle} from '@/modules/article/article.model';
import {SelectCategory} from '@/modules/category/category.model';
import getCursor from '@/hooks/get-cursor';
import {ArticleRepository} from '@/modules/article/article.repository';
import {CategoryRepository} from '@/modules/category/category.repository';
import styles from '@/styles/scss/articles/article-category-list-page.module.scss';
import {Metadata} from 'next';
import Link from 'next/link';
import {cache} from 'react';
import {Collection, WithContext} from 'schema-dts';

interface ArticleParentPageProps {
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

const CATEGORIES_PER_PAGE = 9;
const ARTICLES_PER_CATEGORY = 4;

export default async function ArticleParentPage({page, category}: ArticleParentPageProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {offset, limit} = getCursor({page, perPage: CATEGORIES_PER_PAGE});
    const articleRepository = new ArticleRepository(database);
    const categoryRepository = new CategoryRepository(database);
    const getCachedTotal = cache(async (parentId: number) => categoryRepository.countByParent({parentId}));
    const total = await getCachedTotal(category.id);
    const getCachedCategories = cache(async (parentId: number, offset: number, limit: number) =>
        categoryRepository.allByParent({parentId, offset, limit})
    );
    const categories = await getCachedCategories(category.id, offset, limit);
    const payload: Array<{ category: SelectCategory, articles: SelectArticle[] }> = [];

    const getCachedArticles = cache(async (categoryId: number, limit: number) =>
        articleRepository.allPublishedByCategory({categoryId, limit})
    );

    for (const item of categories) {
        const articles = await getCachedArticles(item.id, ARTICLES_PER_CATEGORY);
        payload.push({category: item, articles});
    }

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Articles', href: '/articles'},
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
        hasPart: categories.map((item) => ({
            '@type': 'Collection',
            name: item.name,
            author: new URL('#organization', BASE_URL).toString(),
            url: new URL(`/articles/c-${item.alias}`, BASE_URL).toString(),
            mainEntityOfPage: new URL(`/articles/c-${item.alias}`, BASE_URL).toString(),
        })),
    };

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <ArticleCategoryHeading
                title={category.name}
                subTitle="Our articles"
            />
            {payload.map((item) => (
                <section key={item.category.id} className={styles['category']}>
                    <header>
                        <h2><Link href={`/articles/c-${item.category.alias}`}>{item.category.name}</Link></h2>
                        <Link href={`/articles/c-${item.category.alias}`}>View Category</Link>
                    </header>
                    {item.articles.map((article) => (<ArticleCard key={article.id} article={article} className={styles['article-card']}/>))}
                </section>
            ))}
            <Pagination
                className={styles['pagination']}
                root={`/articles/c-${category.alias}`}
                page={page}
                total={total}
                perPage={CATEGORIES_PER_PAGE}
            />

            <ArticleCategoryDescription description={category.description}/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}
