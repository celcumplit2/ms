import JobCard from '@/components/careers/job-card';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import Pagination from '@/components/common/pagination';
import getCursor from '@/hooks/get-cursor';
import getPage from '@/hooks/get-page';
import {browsePublishedJobs} from '@/modules/job/job.service';
import styles from '@/styles/scss/careers/careers-page.module.scss';
import {PageProps} from '@/types/pages';
import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {cache} from 'react';

export const metadata: Metadata = {
    title: 'Careers',
    description: 'We are always looking for creative, talented self-starters to join the MoldStud family.',
    alternates: {
        canonical: '/careers',
    },
};

const JOBS_PER_PAGE = 24;

export default async function CareersPage({searchParams}: PageProps) {
    const {page} = getPage({searchParams: await searchParams});
    const {offset, limit} = getCursor({page, perPage: JOBS_PER_PAGE});

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Careers', href: '/careers'},
    ];
    const getCachedJobs  = cache(async (o: number, l: number) => browsePublishedJobs({offset: o, limit: l}));
    const collection = await getCachedJobs(offset, limit);

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <hgroup className={styles['heading']}>
                <p>Careers</p>
                <h1>Do Work That Has An Impact</h1>
                <p>We’re redefining technology. No matter how long it takes, we’ll ensure that everyone has an equal opportunity to innovation; one
                    website, one application at a time.</p>
            </hgroup>

            <div className={styles['jobs']}>
                {collection.items.map((job) => (<JobCard key={job.id} job={job}/>))}
            </div>

            <Pagination
                className={styles['pagination']}
                root="/careers"
                page={page}
                total={collection.total}
                perPage={JOBS_PER_PAGE}
            />

            <div className={styles['apply-for-job']}>
                <p><strong>If you don&apos;t see a position that suits you, send us your CV</strong></p>
                <Link href="/careers/apply-for-job">Apply Now</Link>
            </div>

            <Image
                className={styles['image']}
                src="/images/careers/careers.png"
                alt="Office snapshot with two people holding hands and one female looking at them."
                width="1216"
                height="480"
                loading="lazy"
                sizes="(width < 576px) 543w, (min-width: 576px and width < 768px) 735w, (min-wdith: 768px and width < 992px) 959w, (min-width: 992px) 1216w"
            />
        </>
    );
};
