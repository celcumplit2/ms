import {SelectArticle} from '@/modules/article/article.model';
import styles from '@/styles/scss/articles/article-related-recommended.module.scss';
import {ArticleCard} from '@/components/articles/article-card';
import Link from 'next/link';

interface ArticleRelatedProps {
    title?: string;
    description?: string;
    category: { name: string; alias: string };
    articles: SelectArticle[];
}

const DefaultTitle = ({category}: { category: { name: string; alias: string } }) => {
    return (
        <>
            Related Reads on <Link href={`/articles/c-${category.alias}`}>{category.name}</Link>
        </>
    );
};

export default function ArticleRelated({title, description, category, articles}: ArticleRelatedProps) {
    return articles.length > 0 ? (
        <section className={styles['article-related']}>
            <header>
                <hgroup>
                    <p>Related articles</p>
                    <h3>{title ?? (<DefaultTitle category={category}/>)}</h3>
                </hgroup>
                {description ? (
                    <p>{description}</p>
                ) : (
                    <>
                        <p>Dive into our selected range of articles and case studies, emphasizing our dedication to fostering inclusivity within
                            software
                            development. Crafted by seasoned professionals, each publication explores groundbreaking approaches and innovations in
                            creating more accessible software solutions.</p>
                        <p>Perfect for both industry veterans and those passionate about making a difference through technology, our collection
                            provides essential insights and knowledge. Embark with us on a mission to shape a more inclusive future in the realm of
                            software development.</p>
                    </>
                )}
            </header>
            {articles.map((article) => (<ArticleCard key={article.id} article={article} className={styles['article-card']} hideReadMore/>))}
        </section>
    ) : null;
}
