import {ArticleCard} from '@/components/articles/article-card';
import ArticleCategoryHeading from '@/components/articles/article-category-heading';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import Pagination from '@/components/common/pagination';
import {BASE_URL} from '@/config';
import getCursor from '@/hooks/get-cursor';
import getPage from '@/hooks/get-page';
import {browseRootCategoriesAndArticles} from '@/modules/category/category.service';
import styles from '@/styles/scss/articles/article-category-list-page.module.scss';
import {PageProps} from '@/types/pages';
import {Metadata} from 'next';
import Link from 'next/link';
import {cache} from 'react';
import {Blog, WithContext} from 'schema-dts';

export const dynamic = 'force-static';

export const revalidate = 14400; // 4 hours.

export const metadata: Metadata = {
    title: 'Articles',
    description: 'Explore our curated articles on custom software development, spanning from basic software engineering to cutting-edge technologies. Ideal for developers and business leaders alike, our content offers practical tips, thorough analyses, and expert opinions to enhance your software projects. Dive in to stay ahead in the industry.',
    alternates: {
        canonical: '/articles',
        types: {
            'application/rss+xml': '/rss.xml',
            'application/atom+xml': '/atom.xml',
        }
    },
};

const ARTICLES_PER_PAGE = 36;

export default async function ArticlesPage({searchParams}: PageProps) {
    const {page} = getPage({searchParams: await searchParams});
    const {offset, limit} = getCursor({page, perPage: ARTICLES_PER_PAGE});
    const getCachedCollection = cache(async (o: number, l: number) => browseRootCategoriesAndArticles({offset: o, limit: l}));
    const collection = await getCachedCollection(offset, limit);

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Articles', href: '/articles'},
    ];

    const description = 'Dive into the expansive world of custom software development with our comprehensive collection of articles. Here, we delve into a wide range of categories, covering everything from the foundational aspects of software engineering to the latest trends and technologies shaping the industry. Whether you\'re a seasoned developer looking for advanced techniques or a business leader seeking strategic advice on software solutions, our collection of articles has something for everyone. Explore our categories to discover practical tips, in-depth analyses, and expert opinions designed to empower your software development journey. Stay ahead of the curve with our expertly curated content, tailored to address the complexities and challenges of custom software development.';

    const jsonLd: WithContext<Blog> = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': new URL('#blog', BASE_URL).toString(),
        mainEntityOfPage: new URL('/articles', BASE_URL).toString(),
        name: 'MoldStud Articles',
        description,
        creator: new URL('#organization', BASE_URL).toString(),
        publisher: new URL('#organization', BASE_URL).toString(),
        hasPart: collection.items.map((item) => ({
            '@type': 'Collection',
            name: item.category.name,
            author: new URL('#organization', BASE_URL).toString(),
            url: new URL(`/articles/c-${item.category.alias}`, BASE_URL).toString(),
            mainEntityOfPage: new URL(`/articles/c-${item.category.alias}`, BASE_URL).toString(),
        })),
    };

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <ArticleCategoryHeading
                title="Articles"
                subTitle="Our articles"
                description={description}
            />
            {collection.items.map((item) => (
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
                root="/articles"
                page={page}
                total={collection.total}
                perPage={ARTICLES_PER_PAGE}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}
