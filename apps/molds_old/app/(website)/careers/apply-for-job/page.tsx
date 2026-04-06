import ApplyForJobForm from '@/components/careers/apply-for-job-form';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import {Metadata} from 'next';
import styles from '@/styles/scss/careers/apply-for-job-page.module.scss';

export const metadata: Metadata = {
    title: 'Apply for a Job',
    description: 'Interested in joining MoldStud but don\'t see a job opening that fits? Apply now to express your interest! Submit your resume and cover letter to be considered for future opportunities.',
    alternates: {
        canonical: '/apply-for-job',
    },
};

export default async function ApplyForJobPage() {
    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Careers', href: '/careers'},
        {label: 'Apply for a Job', href: '/apply-for-job'},
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <hgroup className={styles['heading']}>
                <p>Join MoldStud</p>
                <h1>Apply For Job Opening</h1>
                <p>Submit your application here to express your interest in future opportunities at MoldStud. Even if there are no current openings
                    that match your skills, we&apos;d love to hear from you!</p>
            </hgroup>
            <ApplyForJobForm/>
        </>
    );
}
