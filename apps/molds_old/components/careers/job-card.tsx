import {SelectJob} from '@/modules/job/job.model';
import {JOB_CATEGORY_MAP, JOB_MODE_MAP, JOB_SENIORITY_MAP, JOB_WORKLOAD_MAP} from '@/helpers/mapping';
import styles from '@/styles/scss/careers/job-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface JobCardProps {
    job: SelectJob;
}

export default function JobCard({job}: JobCardProps) {
    return (
        <article className={styles['job-card']}>
            <header>
                <Link href={`/careers/${job.alias}`}>
                    View Job
                    <Image src="/images/more-arrow.svg" alt="Arrow Up" width="20" height="20" loading="lazy"/>
                </Link>
                <hgroup>
                    <h3>
                        <Link href={`/careers/${job.alias}`}>
                            {job.title}
                        </Link>
                    </h3>
                    <p>{JOB_CATEGORY_MAP[job.category]}</p>
                    {job.seniority.map((seniority) => (
                        <p key={`job-seniority-${seniority}`}>{JOB_SENIORITY_MAP[seniority]}</p>
                    ))}
                </hgroup>
            </header>
            <p>{job.intro}</p>
            <footer>
                <p>
                    <Image src="/images/careers/icon-clock.svg" alt="Clock Icon" width="20" height="20" loading="lazy"/>
                    {job.workload.map((workload, key) => (
                        <span key={`job-workload-${workload}`}>{JOB_WORKLOAD_MAP[workload]}{key < job.workload.length - 1 ? ', ' : ''}</span>
                    ))}
                </p>
                <p>
                    <Image src="/images/careers/icon-luggage.svg" alt="Clock Icon" width="20" height="20" loading="lazy"/>
                    {job.mode.map((mode, key) => (
                        <span key={`job-mode-${mode}`}>{JOB_MODE_MAP[mode]}{key < job.mode.length - 1 ? ', ' : ''}</span>
                    ))}
                </p>
            </footer>
        </article>
    );
}
