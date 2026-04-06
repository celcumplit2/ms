import {ArticleLatest} from '@/components/articles/article-latest';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import ScheduleConsultationForm from '@/components/common/schedule-consultation-form';
import {BASE_URL} from '@/config';
import {getAuthorPhoto} from '@/modules/author/author.config';
import {database} from '@/database';
import {ArticleRepository} from '@/modules/article/article.repository';
import {AuthorRepository} from '@/modules/author/author.repository';
import styles from '@/styles/scss/authors/author-page.module.scss';
import {PageProps} from '@/types/pages';
import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {Person, WithContext} from 'schema-dts';

export const dynamic = 'force-static';

export const revalidate = 14400; // 4 hours.

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {alias} = await params;
    const authorRepository = new AuthorRepository(database);
    const author = await authorRepository.oneByAlias({alias});

    return {
        title: author ? author.metaTitle : '',
        description: author ? author.metaDescription : '',
        alternates: {
            canonical: author ? `/authors/${author.alias}` : '',
        },
        openGraph: {
            title: author?.fullName,
            url: `/authors/${author?.alias}`,
            images: author?.photo ? [getAuthorPhoto({src: author.photo})] : [],
            locale: 'en_US',
            type: 'profile',
        },
    };
}

export default async function AuthorPage({params}: PageProps) {
    const {alias} = await params;
    const authorRepository = new AuthorRepository(database);
    const author = await authorRepository.oneByAlias({alias});

    if (!author) {
        notFound();
    }

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Authors', href: `/authors/${author.alias}`},
        {label: author.fullName, href: `/authors/${author.alias}`},
    ];
    const articleRepository = new ArticleRepository(database);
    const latestArticles = await articleRepository.allLatestPublishedByAuthor({authorId: author.id, limit: 4});

    const jsonLd: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.fullName,
        url: new URL(`/authors/${author.alias}`, BASE_URL).toString(),
        image: author.photo ? getAuthorPhoto({src: author.photo}) : undefined,
    };

    return (
        <>
            <section className={styles['head']}>
                <div>
                    <Breadcrumbs links={breadcrumbs}/>
                    <p>Author Page</p>
                    <h1>{author.fullName}</h1>
                    <p>
                        <span>{author.position}</span>
                        {author.socials.map((social) => (
                            <a href={social.url} target="_blank" key={social.url}>
                                <Image src={`/images/socials/${social.type}.svg`} alt={`${social.type} logo`} height="32" width="32" loading="lazy"/>
                            </a>
                        ))}
                    </p>
                </div>
                {author.photo !== null && (
                    <Image src={getAuthorPhoto({src: author.photo})} alt={`${author.fullName} - Photo`} width="592" height="640" loading="lazy"/>)}
            </section>
            <section className={styles['bio']}>
                <h2>Bio</h2>
                <article dangerouslySetInnerHTML={{__html: author.bio}}></article>
            </section>
            <section className={styles['expertise']}>
                <div>
                    <h3>Expertise</h3>
                    <ul>
                        {author.expertise.map((item) => (<li key={item}>{item}</li>))}
                    </ul>
                </div>
                <Image src="/images/authors/expertise.png" alt="Education abstract image" width="560" height="400" loading="lazy"/>
            </section>
            <section className={styles['education']}>
                <div>
                    <h3>Education</h3>
                    {author.education.degree !== null && (<p>{author.education.degree}</p>)}
                    {author.education.field !== null && (<h5>{author.education.field}</h5>)}
                    <h6>{author.education.institution}</h6>
                </div>
                <Image src="/images/authors/education.png" alt="Institution abstract image" width="480" height="448" loading="lazy"/>
            </section>
            <ArticleLatest articles={latestArticles}/>
            <ScheduleConsultationForm className={styles['schedule-consultation-form']}/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}
