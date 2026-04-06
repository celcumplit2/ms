import JobCard from '@/components/careers/job-card';
import {SelectJob} from '@/modules/job/job.model';
import Link from 'next/link';
import styles from '@/styles/scss/common/open-positions.module.scss';

interface OpenPositionsProps {
    jobs: SelectJob[];
}

export default function OpenPositions({jobs}: OpenPositionsProps) {
    return (
        <section className={styles['open-positions']}>
            <hgroup>
                <h2>Open Positions</h2>
                <p><Link href="/careers">View All Positions</Link></p>
            </hgroup>
            {jobs.map((job) => (<JobCard key={job.id} job={job} />))}
        </section>
    );
}
