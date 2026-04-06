import JobCard from '@/components/careers/job-card';
import {SelectJob} from '@/modules/job/job.model';
import Link from 'next/link';
import styles from '@/styles/scss/careers/job-category.module.scss';

interface JobCategoryProps {
    category: string;
    description: string;
    jobs: SelectJob[];
}

export default function JobCategory({category, description, jobs}: JobCategoryProps) {
    return jobs.length > 0 ? (
        <section className={styles['category']}>
            <div>
                <h2>{category}</h2>
                <p>{description}</p>
                <p><strong>If you don&apos;t see a position that suits you, send us your CV</strong></p>
                <Link href="/careers/apply-for-job">Apply Now</Link>
            </div>
            <div>
                {jobs.map((job) => (<JobCard key={job.id} job={job}/>))}
            </div>
        </section>
    ) : null;
}
