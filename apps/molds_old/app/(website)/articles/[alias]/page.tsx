import ArticlePage, {getMetadata as getArticleMetadata} from '@/components/articles/article-page';
import ArticleParentPage, {getMetadata as getParentMetadata} from '@/components/articles/article-parent-page';
import ArticleSubcategoryPage, {getMetadata as getSubcategoryMetadata} from '@/components/articles/article-subcategory-page';
import {InferNonNullableResultType} from '@/database/schema';
import getPage from '@/hooks/get-page';
import {readCategoryByAlias} from '@/modules/category/category.service';
import type {PageProps} from '@/types/pages';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {cache} from 'react';

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {alias} = await params;

    if (alias.startsWith('c-')) {
        const getCachedCategory = cache(async (a: string) => readCategoryByAlias({
            alias: a,
            relations: ['parent'],
        }) as Promise<InferNonNullableResultType<'category', { parent: true }>>);
        const category = await getCachedCategory(alias.substring(2));

        if (!category) {
            notFound();
        }

        return category.parentId !== null ? getSubcategoryMetadata(category) : getParentMetadata(category);
    }

    return getArticleMetadata(alias);
}

export default async function CategoryOrArticlePage({searchParams, params}: PageProps) {
    const {alias} = await params;

    if (alias.startsWith('c-')) {
        const {page} = getPage({searchParams: await searchParams});
        const getCachedCategory = cache(async (a: string) => readCategoryByAlias({alias: a, relations: ['parent']}));
        const category = await getCachedCategory(alias.substring(2));

        if (!category) {
            notFound();
        }

        return category.parentId !== null
            ? <ArticleSubcategoryPage page={page} category={category as InferNonNullableResultType<'category', { parent: true }>}/>
            : (<ArticleParentPage page={page} category={category as InferNonNullableResultType<'category', { parent: true }>}/>);
    }

    return <ArticlePage alias={alias}/>;
}
