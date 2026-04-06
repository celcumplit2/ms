import Link from 'next/link';
import {ArticleRepository} from '@/modules/article/article.repository';
import {database} from '@/database';
import styles from '@/styles/scss/home/latest-4-articles.module.scss';
import {ArticleCard} from '@/components/articles/article-card';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

type Latest4ArticlesProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export default async function Latest4Articles({className, ...restProps}: Latest4ArticlesProps) {
    const repository = new ArticleRepository(database);
    const articles = await repository.allLastPublished({limit: 4, relations: []});

    return (
        <section className={clsx(styles['latest-4-articles'], className)} {...restProps}>
            <hgroup>
                <p>Articles</p>
                <h2>MoldStud Publications on Accessible Design and Development</h2>
                <p>Explore our curated collection of insights and breakthroughs in the field of accessible design and development. Each
                    publication is a testament to MoldStud&apos;s commitment to driving innovation and inclusivity in the digital realm.</p>
                <p>Our expert-authored articles and case studies offer a deep dive into the transformative power of accessibility, providing
                    valuable knowledge for industry professionals and enthusiasts alike. Join us in our journey to make technology universally
                    accessible and impactful.</p>
                <p><Link href="/articles">View All Articles</Link></p>
            </hgroup>
            {articles.map((article) => (<ArticleCard key={article.id} article={article} className={styles['article-card']}/>))}
        </section>
    );
}
